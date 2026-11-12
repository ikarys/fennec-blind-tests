import {go} from './lib2.mjs'; import {shot} from './lib.mjs';
const id=process.argv[2], tag=process.argv[3];
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/s/'+id); await p.waitForTimeout(2500);
await shot(p,'31-'+tag);
const t=await p.evaluate(()=>document.body.innerText);
console.log(t.slice(0,700).replace(/\n+/g,' | '));
await b.close();
