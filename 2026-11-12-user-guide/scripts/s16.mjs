import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e72482d5c76028-22ae47-49');await p.waitForTimeout(2500);
await p.getByRole('button',{name:'Validate',exact:true}).last().click();
for(let i=0;i<80;i++){await p.waitForTimeout(8000);const t=await p.innerText('body');if(/Workflow finished|errored|blocked/.test(t)&&/Review and integrate/.test(t))break;}
await shot(p,'fs6');console.log((await p.innerText('body')).slice(-1200));
await b.close();
