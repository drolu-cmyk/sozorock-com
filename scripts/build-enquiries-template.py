"""Use one enquiry handler source; preserve the existing service architecture."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
template=json.loads((root/'infra/aws/school-platform.json').read_text())
for resource in template['Resources'].values():
    if resource['Type']=='AWS::Lambda::Function':
        resource['Properties']['Code']['ZipFile']=(root/'infra/aws/enquiries.py').read_text()
        resource['Properties'].pop('ReservedConcurrentExecutions',None)
    if resource['Type']=='AWS::DynamoDB::Table':
        resource['DeletionPolicy']='Retain';resource['UpdateReplacePolicy']='Retain'
print(json.dumps(template,indent=2))
