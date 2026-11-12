import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/workflows');
await p.getByText('build-and-test').first().click(); await p.waitForTimeout(2000);
await p.locator('button[title*="step by step"]').click(); await p.waitForTimeout(2000);
await p.locator('textarea').fill('Add a `count` command to the todo CLI that prints the number of items (and a test for it).');
await p.keyboard.press('Enter'); await p.waitForTimeout(5000);
console.log(p.url()); await shot(p,'80-custom-start'); console.log((await text(p)).slice(-600)); await b.close();
