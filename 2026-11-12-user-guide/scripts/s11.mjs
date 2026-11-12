import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e72454ac863dc8-22ae47-1');await p.waitForTimeout(2500);
await p.getByRole('button',{name:'Discard this work'}).click();await p.waitForTimeout(1000);await shot(p,'disc1');
console.log((await p.innerText('body')).slice(-600));
await b.close();
