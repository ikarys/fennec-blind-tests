import {open,shot,dump,URL} from './lib.mjs';
const {b,p}=await open();
await p.goto(URL); await p.waitForTimeout(1500);
await p.getByText('Fix in Settings').first().click().catch(()=>{});
await p.waitForTimeout(1000);
await p.locator('button[aria-label="Default model"]').click();
await p.waitForTimeout(800); await shot(p,'04-star');
await p.goto(URL); await p.waitForTimeout(1500); await shot(p,'05-home');
await b.close();
