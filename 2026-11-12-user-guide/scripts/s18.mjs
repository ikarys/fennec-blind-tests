import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e72482d5c76028-22ae47-49');await p.waitForTimeout(2500);
await p.getByRole('button',{name:/Review and integrate/}).last().click();await p.waitForTimeout(2000);
await p.getByLabel('I accept it').check();
await p.getByRole('button',{name:'Integrate',exact:true}).click();await p.waitForTimeout(4000);await shot(p,'int2');
console.log((await p.locator('dialog[open]').innerText()));
await b.close();
