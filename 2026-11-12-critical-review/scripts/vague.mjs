import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/new/18e7377b3a265eb5-292474-0');
await p.getByText('Plan, build, verify').first().click(); await p.waitForTimeout(800);
await p.locator('textarea').fill('Improve the todo app.');
await p.keyboard.press('Enter'); await p.waitForTimeout(5000);
console.log(p.url()); await shot(p,'54-vague'); console.log((await text(p)).slice(-800)); await b.close();
