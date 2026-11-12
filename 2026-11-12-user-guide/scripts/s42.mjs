import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/project/18e7244b27ad7621-22ae47-0');await p.waitForTimeout(1500);
await p.getByText('Tasks',{exact:true}).first().click();await p.waitForTimeout(1000);
await p.getByRole('button',{name:'Start the queue'}).click();await p.waitForTimeout(4000);await shot(p,'q1');
console.log((await p.innerText('body')).replace(/\n+/g,' | ').slice(150,600));
await b.close();
