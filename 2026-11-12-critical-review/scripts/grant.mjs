import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/s/'+process.argv[2]);
await p.getByRole('button',{name:'Grant',exact:true}).click(); await p.waitForTimeout(3000);
await shot(p,'87-granted'); await b.close();
