import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e724b7c42191c6-22ae47-88');await p.waitForTimeout(2500);
await p.getByRole('button',{name:'Validate',exact:true}).last().click();
for(let i=0;i<90;i++){await p.waitForTimeout(8000);const t=await p.innerText('body');if(/Workflow (finished|errored|blocked|stopped)/.test(t.slice(0,600)))break;}
await shot(p,'la3');console.log((await p.innerText('body')).slice(0,300));console.log((await p.innerText('body')).slice(-900));
await b.close();
