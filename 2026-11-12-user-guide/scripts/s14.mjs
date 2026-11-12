import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE);await p.waitForTimeout(1500);
console.log((await p.innerText('body')).slice(0,900));
await b.close();
