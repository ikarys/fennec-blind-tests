import {go} from './lib2.mjs'; import {shot} from './lib.mjs';
const id=process.argv[2], tag=process.argv[3], btn=process.argv[4];
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/s/'+id); await p.waitForTimeout(2500);
await p.getByRole('button',{name:btn,exact:true}).first().click(); await p.waitForTimeout(2500);
await shot(p,'32-'+tag);
await b.close();
