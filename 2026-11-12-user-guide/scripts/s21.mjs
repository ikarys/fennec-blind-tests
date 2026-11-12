import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE);await p.waitForTimeout(1000);
await p.getByRole('button',{name:/New session/}).first().click();await p.waitForTimeout(500);
await p.getByText('todo',{exact:true}).last().click();await p.waitForTimeout(2000);
await p.getByRole('button',{name:'Workflow',exact:true}).click();await p.getByText('No workflow').click();
await p.locator('textarea').fill('Add a remove_todo(title) function to src/main.py that removes the first matching to-do. Keep it short and do not write tests.');
await p.locator('textarea').press('Enter');
for(let i=0;i<60;i++){await p.waitForTimeout(5000);if(/Complete|Error|Stopped|Awaiting/.test(await p.innerText('body').then(t=>t.slice(0,400))))break;}
await p.waitForTimeout(2000);
await shot(p,'ag1');console.log(p.url());console.log((await p.innerText('body')).slice(-1500));
await b.close();
