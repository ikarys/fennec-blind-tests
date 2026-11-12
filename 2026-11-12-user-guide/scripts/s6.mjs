import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE);await p.waitForTimeout(1000);
await p.getByRole('button',{name:/New session/}).first().click();await p.waitForTimeout(500);
await p.getByText('todo',{exact:true}).last().click();await p.waitForTimeout(2000);await shot(p,'fs1');
console.log(p.url());console.log(await p.innerText('body'));
await b.close();
