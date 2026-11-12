import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const id=process.argv[2], tag=process.argv[3];
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/s/'+id); await p.waitForTimeout(2500);
await p.getByRole('button',{name:/Review and integrate/}).first().click(); await p.waitForTimeout(3000);
await shot(p,'40-gate-'+tag); await dump(p);
await b.close();
