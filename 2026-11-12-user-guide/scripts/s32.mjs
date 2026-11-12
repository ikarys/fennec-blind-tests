import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/');await p.waitForTimeout(2000);
await p.getByText('todo',{exact:true}).first().click();await p.waitForTimeout(2000);
await shot(p,'pj1');console.log(p.url());
console.log((await p.locator('button,a').evaluateAll(e=>e.map(x=>(x.title||x.ariaLabel||x.innerText||'').trim().slice(0,40)).filter(x=>x))).join('|'));
await b.close();
