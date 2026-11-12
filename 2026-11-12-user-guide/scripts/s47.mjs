import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e7264f15f32b28-22ae47-d6');await p.waitForTimeout(2500);
const t=await p.innerText('body');console.log(t.replace(/\n+/g,' | ').slice(-1500));
await b.close();
