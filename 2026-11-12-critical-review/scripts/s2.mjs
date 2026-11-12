import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/');
await p.getByText('Fix in Settings').first().click(); await p.waitForTimeout(1000);
await p.locator('input').nth(0).fill('local');
await p.locator('input').nth(1).fill('http://127.0.0.1:8000/v1');
await p.locator('body').click({position:{x:5,y:300}}); await p.waitForTimeout(3000);
await shot(p,'03-models');
await b.close();
