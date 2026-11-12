import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/workflows');
console.log(await p.locator('input:visible').evaluateAll(e=>e.map(x=>x.placeholder+'|'+x.value)));
await p.locator('input[placeholder="new-workflow"]').fill('build-and-test').catch(e=>console.log('fill fail'));
await p.getByRole('button',{name:/New workflow/}).click(); await p.waitForTimeout(1500);
await shot(p,'70-new-wf'); console.log(await text(p));
await b.close();
