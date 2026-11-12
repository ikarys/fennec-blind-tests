import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/s/'+process.argv[2]);
const l=p.locator('text=check command (optional)').first();
await l.scrollIntoViewIfNeeded(); await l.click(); await p.waitForTimeout(600);
await shot(p,process.argv[3]);
await b.close();
