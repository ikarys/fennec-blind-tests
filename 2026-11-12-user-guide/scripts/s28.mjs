import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e724b7c42191c6-22ae47-88');await p.waitForTimeout(2500);
console.log((await p.getByRole('button').allInnerTexts()).map(x=>x.trim()).filter(x=>x).join('|'));
await shot(p,'d2a');
await b.close();
