import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE);await p.waitForTimeout(1000);
await p.getByRole('button',{name:/Open a project/}).first().click();await p.waitForTimeout(1000);await shot(p,'op1');
const f=p.locator('input:visible').first();
await f.fill('/tmp/blind/proj/todo');await f.press('Enter');await p.waitForTimeout(1000);await shot(p,'op2');
await p.getByRole('button',{name:'Open this folder'}).click();await p.waitForTimeout(1500);await shot(p,'op3');console.log(await p.innerText('body'));
await b.close();
