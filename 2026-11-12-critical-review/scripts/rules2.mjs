import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/settings');
await p.getByText('Rules',{exact:true}).first().click(); await p.waitForTimeout(1500);
await shot(p,'88-rules'); const t=await text(p); console.log(t.slice(t.indexOf('Rules',200)).slice(0,1800));
await p.getByText('Sandbox & network').first().click(); await p.waitForTimeout(1500);
await shot(p,'89-sandbox'); const s=await text(p); console.log('=====SANDBOX\n'+s.slice(s.indexOf('Sandbox',300)).slice(0,1800));
await b.close();
