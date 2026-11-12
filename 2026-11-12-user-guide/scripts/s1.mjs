import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE);await p.waitForTimeout(1500);await shot(p,'home0');
console.log(await p.innerText('body'));
await b.close();
