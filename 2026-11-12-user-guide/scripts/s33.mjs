import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/');await p.waitForTimeout(2000);
await p.getByRole('button',{name:'Projects',exact:true}).click();await p.waitForTimeout(1500);await shot(p,'pj2');
console.log((await p.innerText('body')).slice(0,500));
await b.close();
