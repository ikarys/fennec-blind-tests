import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/s/'+process.argv[2]);
await p.getByRole('button',{name:/Review and integrate/}).first().click(); await p.waitForTimeout(2000);
await shot(p,'91-dialog');
await p.getByRole('button',{name:'Narrate'}).click(); await p.waitForTimeout(25000);
await shot(p,'92-narrate'); const t=await text(p); console.log(t.slice(t.indexOf('Narrate'),t.indexOf('Narrate')+2500));
await b.close();
