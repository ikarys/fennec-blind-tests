import {open} from './lib.mjs';
const {b,p}=await open('/#/s/'+process.argv[2]);
const l=p.locator('text=check command (optional)').first();
console.log(await l.evaluate(e=>e.parentElement.outerHTML.slice(0,800)));
await l.click(); await p.waitForTimeout(500);
console.log(await l.evaluate(e=>e.parentElement.parentElement.outerHTML.slice(0,1500)));
await b.close();
