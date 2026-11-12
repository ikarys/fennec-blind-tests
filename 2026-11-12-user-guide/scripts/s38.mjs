import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/project/18e7244b27ad7621-22ae47-0');await p.waitForTimeout(1500);
await p.getByText('Tasks',{exact:true}).first().click();await p.waitForTimeout(1000);
await p.getByText(/^Drafts/).first().click();await p.waitForTimeout(800);
await p.getByTitle('Turn into a task').click();await p.waitForTimeout(1500);await shot(p,'t4');
console.log((await p.innerText('body')).replace(/\n+/g,' | ').slice(300,1100));
console.log(await p.locator('textarea,input').evaluateAll(e=>e.map(x=>x.placeholder||x.ariaLabel||x.name)));
await b.close();
