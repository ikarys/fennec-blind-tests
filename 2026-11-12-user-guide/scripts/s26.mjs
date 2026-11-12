import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/settings/plugins');await p.waitForTimeout(2000);await shot(p,'pl1');
console.log((await p.innerText('main').catch(()=>'')) || (await p.innerText('body')));
await b.close();
