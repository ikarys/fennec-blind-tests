import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/settings/plugins');await p.waitForTimeout(2000);
await p.getByText('turnstats').first().click();await p.waitForTimeout(800);await shot(p,'pl1b');
console.log((await p.getByRole('button').allInnerTexts()).filter(x=>x.trim()).join('|'));
await p.getByRole('button',{name:'Enable',exact:true}).first().click();await p.waitForTimeout(3000);await shot(p,'pl2');
console.log((await p.innerText('body')).slice(-400));
await b.close();
