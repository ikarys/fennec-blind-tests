import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/s/'+process.argv[2]);
const d=p.locator('text=Details'); const n=await d.count(); console.log(n);
for(const i of [n-2,n-1]){ await d.nth(i).scrollIntoViewIfNeeded(); await d.nth(i).click(); await p.waitForTimeout(800); await shot(p,process.argv[3]+'-'+i); }
console.log((await text(p)).slice(-3500));
await b.close();
