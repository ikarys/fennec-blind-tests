import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/s/'+process.argv[2]);
await p.getByRole('button',{name:'Never',exact:true}).click(); await p.waitForTimeout(4000);
await shot(p,'84-never'); console.log((await text(p)).slice(-1200)); await b.close();
