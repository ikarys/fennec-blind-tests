import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/new/18e7377b3a265eb5-292474-0');
await p.getByText('Plan, build, verify').first().click(); await p.waitForTimeout(800);
await shot(p,'21-picker'); console.log(await text(p));
await b.close();
