import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE);await p.waitForTimeout(1000);
await p.getByRole('button',{name:/New chat/}).first().click();await p.waitForTimeout(2000);await shot(p,'chat0');
console.log(p.url());
await p.locator('textarea').fill('In one sentence, what does Python\'s enumerate do?');await p.locator('textarea').press('Enter');
for(let i=0;i<30;i++){await p.waitForTimeout(4000);if(/Complete/.test(await p.innerText('body')))break;}
await shot(p,'chat1');console.log((await p.innerText('body')).slice(0,1500));
await b.close();
