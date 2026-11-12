import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE);await p.waitForTimeout(1000);
await p.getByText('Fix in Settings').first().click();await p.waitForTimeout(1000);await shot(p,'prov1');
console.log(p.url());console.log(await p.innerText('body'));
await b.close();
