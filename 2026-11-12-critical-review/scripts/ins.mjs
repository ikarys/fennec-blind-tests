import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/insight');
await p.waitForTimeout(2000); await shot(p,'98-insight'); console.log((await text(p)).slice(0,1800)); await b.close();
