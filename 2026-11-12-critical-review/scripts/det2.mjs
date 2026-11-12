import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/s/'+process.argv[2]);
await p.getByText('Details',{exact:true}).last().click(); await p.waitForTimeout(1500);
await shot(p,'97-shell-details'); const t=await text(p); console.log(t.slice(t.indexOf('Run the tests')).slice(0,1500));
await b.close();
