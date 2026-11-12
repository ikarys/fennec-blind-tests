import {open,shot,text} from './lib.mjs';
const P='/#/project/18e7377b3a265eb5-292474-0';
const {b,p}=await open(P);
await p.locator('button:text-is("New session")').click(); await p.waitForTimeout(1500);
await shot(p,'09-new-session');
console.log(p.url());
console.log(await p.locator('textarea:visible, button:visible').evaluateAll(e=>e.map(x=>x.tagName+':'+(x.innerText||x.title||x.getAttribute('aria-label')||'')).filter(x=>x.length>7)));
await b.close();
