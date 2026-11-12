import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e72482d5c76028-22ae47-49');await p.waitForTimeout(2500);
await p.getByText('See the changes').click();await p.waitForTimeout(2000);await shot(p,'ch1');console.log(p.url());console.log((await p.innerText('body')).slice(0,900));
await p.goBack();await p.waitForTimeout(1500);
await p.getByRole('button',{name:/Review and integrate/}).last().click();await p.waitForTimeout(2500);await shot(p,'int1');
console.log('-----');console.log((await p.locator('dialog[open]').innerText()));
await b.close();
