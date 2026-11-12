import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/s/'+process.argv[2]);
await p.getByRole('button',{name:/Review and integrate/}).first().click(); await p.waitForTimeout(2000);
console.log(await p.locator('button:visible').allInnerTexts());
await p.getByRole('button',{name:'Resolve with the agent'}).last().click(); await p.waitForTimeout(4000);
await shot(p,'34-resolving'); console.log((await text(p)).slice(-1200));
await b.close();
