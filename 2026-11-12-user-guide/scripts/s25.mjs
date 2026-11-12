import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e724b7c42191c6-22ae47-88');await p.waitForTimeout(2500);
for(let i=0;i<70;i++){
 const a=p.getByRole('button',{name:'Accept',exact:true});if(await a.count()){await a.last().click();console.log('accept');await p.waitForTimeout(3000);}
 const v=p.getByRole('button',{name:'Validate',exact:true});if(await v.count()&&/Validate these/.test(await p.innerText('body'))){await v.last().click();}
 const t=await p.innerText('body');if(/Review and integrate/.test(t)||/Workflow (errored|blocked|stopped)/.test(t.slice(0,600)))break;
 await p.waitForTimeout(7000);}
await shot(p,'la4');console.log((await p.innerText('body')).slice(0,200));
await b.close();
