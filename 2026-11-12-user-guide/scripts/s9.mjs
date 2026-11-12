import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e72454ac863dc8-22ae47-1');await p.waitForTimeout(2000);
await p.getByRole('button',{name:'Validate',exact:true}).click();
for(let i=0;i<60;i++){await p.waitForTimeout(10000);const t=await p.innerText('body');if(/Review and integrate/.test(t)||/Finished/.test(t))break;}
await shot(p,'fs4');console.log((await p.innerText('body')).slice(-2500));
await b.close();
