import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e72482d5c76028-22ae47-49');await p.waitForTimeout(2500);await shot(p,'fs5a');
await b.close();
