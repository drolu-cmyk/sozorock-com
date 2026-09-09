import {spawnSync} from 'node:child_process';
const windows=process.platform==='win32';
const result=spawnSync(process.env.PYTHON||(windows?'py':'python3'),[...(windows&&!process.env.PYTHON?['-3']:[]),'-m','unittest','discover','-s','tests','-p','test_*.py'],{stdio:'inherit'});
process.exit(result.status??1);
