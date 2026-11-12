import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e724b7c42191c6-22ae47-88');await p.waitForTimeout(2500);
const t=p.locator('button[title*="iscard" i],button[aria-label*="iscard" i]');console.log(await t.count());
await t.first().click();await p.waitForTimeout(1000);await shot(p,'disc3');
await p.getByRole('button',{name:'Discard',exact:true}).click();await p.waitForTimeout(2500);await shot(p,'disc4');console.log((await p.innerText('body')).slice(-300));
await b.close();
