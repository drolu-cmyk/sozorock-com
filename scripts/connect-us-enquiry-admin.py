#!/usr/bin/env python3
"""Connect only the existing US enquiry table to existing staff access. No code upload."""
import argparse
import json
import re
import uuid
import urllib.request

import boto3

ACCOUNT = '791860731989'
REGION = 'us-east-1'
APP_STACK = 'sozorock-us-applications'
CONTACT_STACK = 'sozorock-school-enquiries'
ORIGIN = 'https://www.sozorock.com'


def require(condition, message):
    if not condition:
        raise RuntimeError('Stopped: ' + message)


def outputs(stack):
    return {value['OutputKey']: value['OutputValue'] for value in stack.get('Outputs', [])}


def validate_changes(changes):
    require(bool(changes), 'no resource update was proposed.')
    require(all(change.get('Action') == 'Modify' and change.get('Replacement') == 'False'
                and change.get('LogicalResourceId') in {'Handler', 'ExecutionRole'} for change in changes),
            'change set includes an unexpected resource or replacement; left unexecuted for inspection.')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply', action='store_true', help='Execute only a verified, non-replacing parameter update.')
    args = parser.parse_args()
    session = boto3.Session(region_name=REGION)
    require(session.client('sts').get_caller_identity()['Account'] == ACCOUNT,
            'open CloudShell in US hosting account 791860731989.')
    cf = session.client('cloudformation')
    app = cf.describe_stacks(StackName=APP_STACK)['Stacks'][0]
    contact = cf.describe_stacks(StackName=CONTACT_STACK)['Stacks'][0]
    for stack in (app, contact):
        require(stack['StackStatus'] in {'CREATE_COMPLETE', 'UPDATE_COMPLETE'}, 'existing stack is not healthy.')
    contact_outputs = outputs(contact)
    table = contact_outputs.get('EnquiriesTable', '')
    require(table.startswith(CONTACT_STACK + '-'), 'unexpected enquiry table output.')
    session.client('dynamodb').describe_table(TableName=table)
    with urllib.request.urlopen(ORIGIN + '/engagement-config.js', timeout=20) as response:
        served = response.read().decode()
    match = re.search(r'Object\.freeze\((\{.*\})\)', served)
    require(bool(match), 'unexpected live contact configuration.')
    require(json.loads(match.group(1)).get('apiEndpoint') == contact_outputs.get('ApiEndpoint'),
            'contact stack does not match the live website endpoint.')
    resources = cf.describe_stack_resources(StackName=CONTACT_STACK)['StackResources']
    handlers = [resource for resource in resources if resource['LogicalResourceId'] == 'Handler'
                and resource['ResourceType'] == 'AWS::Lambda::Function']
    require(len(handlers) == 1, 'existing contact handler was not identified.')
    contact_function = session.client('lambda').get_function_configuration(
        FunctionName=handlers[0]['PhysicalResourceId'])
    require(contact_function.get('Environment', {}).get('Variables', {}).get('TABLE_NAME') == table,
            'contact handler does not use the verified enquiry table.')
    template = cf.get_template(StackName=APP_STACK, TemplateStage='Original')['TemplateBody']
    if isinstance(template, str):
        template = json.loads(template)
    require('EnquiriesTableName' in template.get('Parameters', {}),
            'deployed application template lacks the scoped enquiry parameter; a separate reviewed template update is required.')
    definitions = template.get('Resources', {})
    handler = definitions.get('Handler', {})
    require(handler.get('Type') == 'AWS::Lambda::Function', 'application handler identity differs from the reviewed template.')
    require(handler.get('Properties', {}).get('Environment', {}).get('Variables', {}).get('ENQUIRIES_TABLE_NAME')
            == {'Ref': 'EnquiriesTableName'}, 'handler does not use the scoped enquiry parameter.')
    route = definitions.get('EnquiriesAdminRoute', {}).get('Properties', {})
    require(route.get('RouteKey') == 'GET /admin/enquiries' and route.get('AuthorizationType') == 'JWT'
            and route.get('AuthorizerId') == {'Ref': 'Authorizer'}, 'protected enquiry route is not configured as reviewed.')
    policy = definitions.get('ExecutionRole', {}).get('Properties', {}).get('Policies', [])
    expected_resource = {'Fn::Sub': 'arn:${AWS::Partition}:dynamodb:${AWS::Region}:${AWS::AccountId}:table/${EnquiriesTableName}'}
    statements = [statement for entry in policy for statement in entry.get('PolicyDocument', {}).get('Statement', [])]
    require(any(statement.get('Fn::If', []) == ['ReadEnquiries',
        {'Effect': 'Allow', 'Action': ['dynamodb:Scan'], 'Resource': expected_resource}, {'Ref': 'AWS::NoValue'}]
        for statement in statements), 'scoped read-only enquiry permission is not configured as reviewed.')
    require(template.get('Conditions', {}).get('ReadEnquiries') ==
            {'Fn::Not': [{'Fn::Equals': [{'Ref': 'EnquiriesTableName'}, '']}]},
            'enquiry permission condition differs from the reviewed template.')
    previous = {entry['ParameterKey']: entry['ParameterValue'] for entry in app.get('Parameters', [])}
    configured = previous.get('EnquiriesTableName', '')
    require(configured in {'', table}, 'staff service is connected to a different table; no overwrite performed.')
    if configured == table:
        print('ALREADY CONNECTED: the existing enquiry table parameter matches. Investigate handler/IAM errors before further changes.')
        return
    parameters = [{'ParameterKey': name, 'ParameterValue': table} if name == 'EnquiriesTableName'
                  else {'ParameterKey': name, 'UsePreviousValue': True} for name in previous]
    name = 'us-enquiry-admin-' + uuid.uuid4().hex[:12]
    cf.create_change_set(StackName=APP_STACK, ChangeSetName=name, ChangeSetType='UPDATE',
                         UsePreviousTemplate=True, Parameters=parameters, Capabilities=['CAPABILITY_IAM'],
                         Description='Connect the existing verified US corporate enquiry table to existing MFA staff read access; preserve all other parameters and code.')
    cf.get_waiter('change_set_create_complete').wait(StackName=APP_STACK, ChangeSetName=name)
    change_set = cf.describe_change_set(StackName=APP_STACK, ChangeSetName=name)
    changes = [change['ResourceChange'] for change in change_set.get('Changes', [])]
    validate_changes(changes)
    print(json.dumps({'account': ACCOUNT, 'region': REGION, 'stack': APP_STACK, 'enquiryTable': table,
        'changeSet': name, 'changes': [{key: value[key] for key in ('LogicalResourceId', 'Action', 'Replacement')}
                                    for value in changes], 'intakePreserved': True, 'codeUnchanged': True,
        'cognitoUnchanged': True, 'websiteAndDnsUnchanged': True}, indent=2))
    if not args.apply:
        print('REVIEW ONLY: no change set was executed. Run with --apply to revalidate and execute a fresh matching update.')
        return
    cf.execute_change_set(StackName=APP_STACK, ChangeSetName=name)
    cf.get_waiter('stack_update_complete').wait(StackName=APP_STACK)
    updated = cf.describe_stacks(StackName=APP_STACK)['Stacks'][0]
    current = {value['ParameterKey']: value['ParameterValue'] for value in updated.get('Parameters', [])}
    require(current.get('EnquiriesTableName') == table and all(current.get(key) == value for key, value in previous.items()
            if key != 'EnquiriesTableName'), 'post-update parameters did not match the expected isolated change.')
    print('CONNECTED: scoped US staff enquiry access configured. Refresh the existing staff portal and read back synthetic enquiry d6b750fd-bce9-480c-8fc4-72a7401197a3. Website release acceptance has not been renewed.')


if __name__ == '__main__':
    main()
