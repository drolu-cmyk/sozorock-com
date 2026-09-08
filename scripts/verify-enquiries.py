"""Verify only synthetic enquiry records; delete only matching test receipts."""
import argparse,json,os,ssl,time,uuid,urllib.request,urllib.error
from pathlib import Path
import boto3
from botocore.httpsession import URLLib3Session
from botocore.awsrequest import AWSRequest

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--endpoint',required=True);parser.add_argument('--table',required=True);parser.add_argument('--output',type=Path,required=True);args=parser.parse_args()
    session=boto3.Session(region_name='us-east-1')
    if session.client('sts').get_caller_identity()['Account']!='791860731989':raise RuntimeError('Wrong account')
    if not args.table.startswith('sozorock-school-enquiries-'):raise RuntimeError('Unexpected table')
    if not args.endpoint.startswith('https://') or not args.endpoint.endswith('.execute-api.us-east-1.amazonaws.com'):raise RuntimeError('Unexpected endpoint')
    table=session.resource('dynamodb').Table(args.table);http=URLLib3Session(verify=os.environ.get('AWS_CA_BUNDLE') or True,timeout=20)
    def post(payload,origin='https://www.sozorock.com'):
        time.sleep(.3)
        response=http.send(AWSRequest(method='POST',url=args.endpoint+'/enquiries',data=json.dumps(payload).encode(),headers={'Content-Type':'application/json','Origin':origin}).prepare())
        return response.status_code,json.loads(response.content)
    records=[];results=[]
    try:
        for kind in ['corporate','school']:
            rid=str(uuid.uuid4());payload={'requestId':rid,'name':'Synthetic release verification','email':'release-check@example.invalid','message':'Synthetic service verification. Do not respond. This record will be deleted after readback.','intent':'general','context':kind,'organization':'Release QA' if kind=='corporate' else ''}
            records.append(rid)
            status,body=post(payload);assert status==200 and body['id']==rid,(status,body)
            item=table.get_item(Key={'id':rid},ConsistentRead=True)['Item'];assert all(item[k]==v for k,v in payload.items() if k!='requestId')
            assert item['expiresAt']-item['createdAt']==30*86400
            status,body=post(payload);assert status==200 and body['id']==rid
            status,body=post(dict(payload,message=payload['message']+' changed'));assert status==409
            status,body=post(payload,'https://untrusted.example');assert status==403
            results.append({'context':kind,'durableReceipt':True,'authorizedReadback':True,'idempotentReplay':True,'conflictRejected':True,'originRejected':True,'ttlDays':30})
        status,body=post({'website':'synthetic-honeypot'});assert status==400
    finally:
        for rid in records:
            item=table.get_item(Key={'id':rid},ConsistentRead=True).get('Item')
            if item and item.get('email')=='release-check@example.invalid':
                table.delete_item(Key={'id':rid},ConditionExpression='#email = :email',ExpressionAttributeNames={'#email':'email'},ExpressionAttributeValues={':email':'release-check@example.invalid'})
                assert 'Item' not in table.get_item(Key={'id':rid},ConsistentRead=True)
    args.output.parent.mkdir(parents=True,exist_ok=True)
    args.output.write_text(json.dumps({'passed':True,'endpoint':args.endpoint,'table':args.table,'checkedAt':int(time.time()),'results':results,'syntheticRecordsDeleted':True,'emailOrMarketingSent':False},indent=2))
    print('PASS: durable contact receipts, authorized readback, replay, conflict and origin rejection; synthetic records removed.')
if __name__=='__main__':main()
