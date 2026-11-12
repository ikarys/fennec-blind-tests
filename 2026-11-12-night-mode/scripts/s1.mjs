import {open,shot,dump,URL} from './lib.mjs';
const {b,p}=await open();
await p.goto(URL); await p.waitForTimeout(1500);
await p.getByText('Fix in Settings').first().click();
await p.waitForTimeout(1000);
await shot(p,'02b'); console.log(await p.locator('input').count()); await p.locator('input').nth(1).fill('http://127.0.0.1:8000/v1');
await p.getByText('Where models come from').click(); await p.waitForTimeout(3000);
await shot(p,'03-models'); await dump(p);
await b.close();
