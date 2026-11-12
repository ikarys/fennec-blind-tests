import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e724b7c42191c6-22ae47-88');await p.waitForTimeout(2500);
await p.getByRole('button',{name:/Launch/}).last().click();await p.waitForTimeout(3000);await shot(p,'la1');
console.log((await p.innerText('body')).slice(-700));
await b.close();
