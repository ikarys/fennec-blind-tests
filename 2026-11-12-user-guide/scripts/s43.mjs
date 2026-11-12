import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/insight');await p.waitForTimeout(2500);await shot(p,'in1');
console.log(p.url(),(await p.innerText('body')).replace(/\n+/g,' | ').slice(60,900));
await p.goto(BASE+'/#/settings/providers');await p.waitForTimeout(2000);
console.log(await p.locator('button[title],button[aria-label]').evaluateAll(e=>e.map(x=>x.title||x.ariaLabel).slice(10)));
await shot(p,'pr1');
await b.close();
