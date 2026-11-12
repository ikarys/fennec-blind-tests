import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE);await p.waitForTimeout(1000);
await p.getByRole('button',{name:/New session/}).first().click();await p.waitForTimeout(500);
await p.getByText('todo',{exact:true}).last().click();await p.waitForTimeout(2000);
console.log(p.url());
await p.getByRole('button',{name:'Workflow',exact:true}).click();await p.waitForTimeout(800);await shot(p,'wf0');
console.log((await p.innerText('body')).slice(-500));
await b.close();
