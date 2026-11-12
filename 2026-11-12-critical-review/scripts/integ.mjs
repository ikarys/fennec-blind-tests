import {open,shot,text} from './lib.mjs';
const [,, sid,pre]=process.argv;
const {b,p}=await open('/#/s/'+sid);
await p.getByRole('button',{name:/Review and integrate/}).first().click(); await p.waitForTimeout(2000);
await p.getByRole('button',{name:'Integrate',exact:true}).click(); await p.waitForTimeout(4000);
await shot(p,pre+'-integrated'); await b.close();
