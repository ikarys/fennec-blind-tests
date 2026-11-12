import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/workflows');
await p.getByText('Quick build').first().click(); await p.waitForTimeout(2000);
console.log(p.url()); await shot(p,'23-wf-quick');
console.log(await p.locator('button:visible').evaluateAll(e=>e.map(x=>(x.innerText||x.title||x.getAttribute('aria-label')||'').trim()).filter(Boolean)));
await b.close();
