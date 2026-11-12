import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/new/18e7244b27ad7621-22ae47-0');await p.waitForTimeout(1500);
await p.locator('textarea').fill('Add an add_todo(title) function to src/main.py that stores the to-do in an in-memory list, and make list_todos return that list.');
await p.locator('textarea').press('Enter');
for(let i=0;i<40;i++){await p.waitForTimeout(10000);const t=await p.innerText('body');if(/Go with this plan/.test(t))break;}
await shot(p,'fs2');console.log(p.url());console.log(await p.innerText('body'));
await b.close();
