#!/usr/bin/env python3
"""Emit deployable CloudFormation; applications.py is the only handler source."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ref = lambda name: {'Ref': name}
sub = lambda value: {'Fn::Sub': value}
arn = lambda name: {'Fn::GetAtt': [name, 'Arn']}
resources = {}
def resource(name, kind, properties, **extra):
    resources[name] = {'Type': kind, 'Properties': properties, **extra}
resource('Applications', 'AWS::DynamoDB::Table', {
    'BillingMode': 'PAY_PER_REQUEST', 'AttributeDefinitions': [{'AttributeName': 'id', 'AttributeType': 'S'}],
    'KeySchema': [{'AttributeName': 'id', 'KeyType': 'HASH'}],
    'SSESpecification': {'SSEEnabled': True},
    'PointInTimeRecoverySpecification': {'PointInTimeRecoveryEnabled': True},
    'TimeToLiveSpecification': {'AttributeName': 'expiresAt', 'Enabled': True}},
    DeletionPolicy='Retain', UpdateReplacePolicy='Retain')
resource('Admins', 'AWS::Cognito::UserPool', {
    'AdminCreateUserConfig': {'AllowAdminCreateUserOnly': True},
    'UsernameAttributes': ['email'], 'AutoVerifiedAttributes': ['email'],
    'UsernameConfiguration': {'CaseSensitive': False},
    'MfaConfiguration': 'ON', 'EnabledMfas': ['SOFTWARE_TOKEN_MFA'],
    'AccountRecoverySetting': {'RecoveryMechanisms': [{'Name': 'admin_only', 'Priority': 1}]},
    'Policies': {'PasswordPolicy': {'MinimumLength': 14, 'RequireLowercase': True,
        'RequireUppercase': True, 'RequireNumbers': True, 'RequireSymbols': True,
        'TemporaryPasswordValidityDays': 1}}}, DeletionPolicy='Retain', UpdateReplacePolicy='Retain')
resource('AdminGroup', 'AWS::Cognito::UserPoolGroup', {'UserPoolId': ref('Admins'), 'GroupName': 'Admins'})
resource('AdminClient', 'AWS::Cognito::UserPoolClient', {
    'UserPoolId': ref('Admins'), 'GenerateSecret': False,
    'ExplicitAuthFlows': ['ALLOW_USER_SRP_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH'],
    'PreventUserExistenceErrors': 'ENABLED', 'EnableTokenRevocation': True,
    'AccessTokenValidity': 15, 'IdTokenValidity': 15, 'RefreshTokenValidity': 1,
    'TokenValidityUnits': {'AccessToken': 'minutes', 'IdToken': 'minutes', 'RefreshToken': 'days'},
    'AllowedOAuthFlowsUserPoolClient': True, 'AllowedOAuthFlows': ['code'],
    'AllowedOAuthScopes': ['openid', 'email', 'aws.cognito.signin.user.admin'],
    'SupportedIdentityProviders': ['COGNITO'],
    'CallbackURLs': ['https://www.sozorock.com/admin.html'],
    'LogoutURLs': ['https://www.sozorock.com/']})
resource('AdminDomain', 'AWS::Cognito::UserPoolDomain', {'UserPoolId': ref('Admins'),
    'Domain': sub('sozorock-us-admin-${AWS::AccountId}')})
resource('ApplicationLogs', 'AWS::Logs::LogGroup', {
    'LogGroupName': sub('/aws/lambda/${AWS::StackName}-handler'), 'RetentionInDays': 14})
resource('ExecutionRole', 'AWS::IAM::Role', {
    'AssumeRolePolicyDocument': {'Version': '2012-10-17', 'Statement': [{'Effect': 'Allow',
        'Principal': {'Service': 'lambda.amazonaws.com'}, 'Action': 'sts:AssumeRole'}]},
    'Policies': [{'PolicyName': 'applications-only', 'PolicyDocument': {'Version': '2012-10-17', 'Statement': [
        {'Effect': 'Allow', 'Action': ['dynamodb:PutItem', 'dynamodb:GetItem', 'dynamodb:Scan'], 'Resource': arn('Applications')},
        {'Effect': 'Allow', 'Action': ['logs:CreateLogStream', 'logs:PutLogEvents'],
         'Resource': arn('ApplicationLogs')}]}}]})
resource('Handler', 'AWS::Lambda::Function', {
    'FunctionName': sub('${AWS::StackName}-handler'), 'Runtime': 'python3.12',
    'Handler': 'index.handler', 'Role': arn('ExecutionRole'), 'Timeout': 10, 'MemorySize': 128,
    'ReservedConcurrentExecutions': {'Fn::If': ['ReserveCapacity', 5, ref('AWS::NoValue')]},
    'Environment': {'Variables': {'TABLE_NAME': ref('Applications'), 'ADMIN_CLIENT_ID': ref('AdminClient'),
        'INTAKE_ENABLED': ref('IntakeEnabled')}},
    'Code': {'ZipFile': (ROOT / 'infra/aws/applications.py').read_text()}})
resource('Api', 'AWS::ApiGatewayV2::Api', {'Name': sub('${AWS::StackName}-api'), 'ProtocolType': 'HTTP',
    'CorsConfiguration': {'AllowOrigins': ['https://www.sozorock.com'], 'AllowMethods': ['GET', 'POST'],
        'AllowHeaders': ['content-type', 'authorization'], 'MaxAge': 300}})
resource('Integration', 'AWS::ApiGatewayV2::Integration', {'ApiId': ref('Api'), 'IntegrationType': 'AWS_PROXY',
    'IntegrationUri': arn('Handler'), 'PayloadFormatVersion': '2.0'})
resource('Authorizer', 'AWS::ApiGatewayV2::Authorizer', {'ApiId': ref('Api'), 'Name': 'CognitoAdmins',
    'AuthorizerType': 'JWT', 'IdentitySource': ['$request.header.Authorization'],
    'JwtConfiguration': {'Audience': [ref('AdminClient')],
        'Issuer': sub('https://cognito-idp.${AWS::Region}.amazonaws.com/${Admins}')}})
for name, route in [('SubmitRoute', 'POST /applications'), ('AdminRoute', 'GET /admin/applications')]:
    props = {'ApiId': ref('Api'), 'RouteKey': route, 'Target': sub('integrations/${Integration}')}
    if name == 'AdminRoute':
        props.update(AuthorizationType='JWT', AuthorizerId=ref('Authorizer'),
                     AuthorizationScopes=['aws.cognito.signin.user.admin'])
    resource(name, 'AWS::ApiGatewayV2::Route', props)
resource('Stage', 'AWS::ApiGatewayV2::Stage', {'ApiId': ref('Api'), 'StageName': '$default', 'AutoDeploy': True,
    'DefaultRouteSettings': {'ThrottlingBurstLimit': 10, 'ThrottlingRateLimit': 5}})
resource('InvokePermission', 'AWS::Lambda::Permission', {'FunctionName': ref('Handler'),
    'Action': 'lambda:InvokeFunction', 'Principal': 'apigateway.amazonaws.com',
    'SourceAccount': ref('AWS::AccountId'),
    'SourceArn': sub('arn:${AWS::Partition}:execute-api:${AWS::Region}:${AWS::AccountId}:${Api}/*/*/*')})
template = {'AWSTemplateFormatVersion': '2010-09-09', 'Description': 'Independent US applications and private administrator API. No website activation.',
    'Parameters': {'IntakeEnabled': {'Type': 'String', 'Default': 'false', 'AllowedValues': ['false', 'true']},
        'ReserveFunctionCapacity': {'Type': 'String', 'Default': 'false', 'AllowedValues': ['false', 'true'],
            'Description': 'Reserve five executions only after verifying sufficient regional account capacity.'}},
    'Conditions': {'ReserveCapacity': {'Fn::Equals': [ref('ReserveFunctionCapacity'), 'true']}},
    'Rules': {'USBoundary': {'Assertions': [
        {'Assert': {'Fn::Equals': [ref('AWS::AccountId'), '791860731989']}, 'AssertDescription': 'US hosting account only'},
        {'Assert': {'Fn::Equals': [ref('AWS::Region'), 'us-east-1']}, 'AssertDescription': 'US East only'}]}},
    'Resources': resources, 'Outputs': {
        'ApiEndpoint': {'Value': {'Fn::GetAtt': ['Api', 'ApiEndpoint']}},
        'UserPoolId': {'Value': ref('Admins')}, 'AdminClientId': {'Value': ref('AdminClient')},
        'AdminLoginOrigin': {'Value': sub('https://${AdminDomain}.auth.${AWS::Region}.amazoncognito.com')},
        'ApplicationsTable': {'Value': ref('Applications')}}}
print(json.dumps(template, indent=2))
