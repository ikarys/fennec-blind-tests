import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/settings/providers');await p.waitForTimeout(1500);
await p.mouse.click(354,394);await p.waitForTimeout(500);await p.mouse.click(382,394);await p.waitForTimeout(800);
await shot(p,'prov3');
await p.goto(BASE);await p.waitForTimeout(1500);await shot(p,'home1');
console.log((await p.innerText('body')).slice(0,700));
await b.close();
