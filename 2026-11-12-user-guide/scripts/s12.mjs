import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e72454ac863dc8-22ae47-1');await p.waitForTimeout(2500);
await p.getByRole('button',{name:'Discard this work'}).click();await p.getByRole('button',{name:'Discard',exact:true}).click();await p.waitForTimeout(1500);await shot(p,'disc2');
console.log(p.url());
console.log((await p.innerText('body')).slice(-500));
await b.close();
