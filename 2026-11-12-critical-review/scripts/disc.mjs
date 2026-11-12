import {open,shot,text} from './lib.mjs';
const [,, sid]=process.argv;
const {b,p}=await open('/#/s/'+sid);
await p.locator('button:has(svg)').filter({hasText:/^$/}).evaluateAll(e=>e.length);
const t=p.locator('[title*="iscard"],[title*="elete"]').first();
console.log(await t.getAttribute('title')); await t.click(); await p.waitForTimeout(1000);
await shot(p,'52-discard'); await p.getByRole('button',{name:/^Discard/}).last().click(); await p.waitForTimeout(2500); await shot(p,'53-discarded'); console.log((await text(p)).slice(-700)); await b.close();
