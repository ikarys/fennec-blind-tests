import {open,shot,text} from './lib.mjs';
const {b,p}=await open();
await shot(p,'01-home');
console.log(await text(p));
const btns=await p.locator('button,a').allInnerTexts(); console.log(btns.filter(x=>x.trim()).join(' | '));
await b.close();
