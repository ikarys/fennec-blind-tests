import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/settings');
console.log(await p.locator('a,button').evaluateAll(e=>e.map(x=>x.innerText.trim()).filter(Boolean)).then(a=>a.join(' | ')));
await b.close();
