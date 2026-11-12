import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const id=process.argv[2], tag=process.argv[3], msg=process.argv[4];
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/s/'+id); await p.waitForTimeout(2500);
await p.getByRole('button',{name:/Review and integrate/}).first().click(); await p.waitForTimeout(2500);
if(msg){ const t=p.locator('textarea').last(); await t.fill(msg); }
await shot(p,'42-before-integrate-'+tag);
await p.getByRole('button',{name:'Integrate',exact:true}).click(); await p.waitForTimeout(4000);
await shot(p,'43-integrated-'+tag); await dump(p);
await b.close();
