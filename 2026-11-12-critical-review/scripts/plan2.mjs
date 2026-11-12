import {open,shot,text} from './lib.mjs';
const [,, sid,name]=process.argv;
const {b,p}=await open('/#/s/'+sid);
const l=p.locator('text=check command (optional)');
console.log(await l.count());
for (let i=0;i<await l.count();i++){ await l.nth(i).scrollIntoViewIfNeeded(); await l.nth(i).click(); }
await p.waitForTimeout(500);
await l.first().scrollIntoViewIfNeeded();
await shot(p,name);
console.log(await p.locator('pre, code').allInnerTexts());
await b.close();
