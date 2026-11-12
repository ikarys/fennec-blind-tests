import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e724b7c42191c6-22ae47-88');await p.waitForTimeout(2500);
for(let i=0;i<60;i++){const bt=p.getByRole('button',{name:'Validate',exact:true});if(await bt.count())break;await p.waitForTimeout(5000);}
await shot(p,'la2');console.log((await p.innerText('body')).slice(-500));
await b.close();
