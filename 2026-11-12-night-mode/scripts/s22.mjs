import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const id=process.argv[2], msg=process.argv[3];
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/s/'+id); await p.waitForTimeout(2500);
const t=p.locator('textarea').last(); await t.fill(msg); await t.press('Enter'); await p.waitForTimeout(3000);
await shot(p,'41-msg-'+id.slice(-2));
await b.close();
