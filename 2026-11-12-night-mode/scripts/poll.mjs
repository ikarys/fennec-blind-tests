import {go} from './lib2.mjs'; import {shot} from './lib.mjs';
const n=process.argv[2];
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/project/18e73a834b4f480d-2aa8be-0/tasks'); await p.waitForTimeout(1500);
await shot(p,'poll-'+n);
const t=await p.evaluate(()=>document.body.innerText);
console.log(new Date().toISOString(), n, t.split('Overview').slice(-1)[0].replace(/\n+/g,' | ').slice(0,700));
await b.close();
