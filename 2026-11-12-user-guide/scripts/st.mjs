import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/'+process.argv[2]);await p.waitForTimeout(2500);
await shot(p,process.argv[3]);console.log((await p.innerText('body')).slice(0,300));
await b.close();
