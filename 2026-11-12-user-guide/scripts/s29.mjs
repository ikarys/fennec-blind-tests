import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e724b7c42191c6-22ae47-88');await p.waitForTimeout(2500);
await p.getByText('Plugins',{exact:true}).last().click();await p.waitForTimeout(2000);await shot(p,'pl3');
console.log((await p.innerText('body')).slice(-500));
await b.close();
