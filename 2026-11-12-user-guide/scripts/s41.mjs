import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/project/18e7244b27ad7621-22ae47-0');await p.waitForTimeout(1500);
await p.getByText('Tasks',{exact:true}).first().click();await p.waitForTimeout(1000);
await p.getByText(/^Drafts/).first().click();await p.waitForTimeout(1500);await shot(p,'t7');
console.log(await p.locator('button[title]').evaluateAll(e=>e.map(x=>x.title).slice(12)));
await b.close();
