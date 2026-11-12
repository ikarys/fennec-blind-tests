import {open,shot,text} from './lib.mjs';
const [,, sid, name, wait]=process.argv;
const {b,p}=await open('/#/s/'+sid);
await p.waitForTimeout(+(wait||0)*1000);
await shot(p,name); console.log((await text(p)).slice(-3500));
await b.close();
