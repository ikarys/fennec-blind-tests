import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/new/18e7377b3a265eb5-292474-0');
await p.locator('button[title="Workflows"]').click(); await p.waitForTimeout(1500);
console.log(p.url()); await shot(p,'22-workflows'); console.log(await text(p));
await b.close();
