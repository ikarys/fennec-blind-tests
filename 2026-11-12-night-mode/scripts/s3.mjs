import {open,shot,dump,URL} from './lib.mjs';
const {b,p}=await open();
await p.goto(URL); await p.waitForTimeout(1500);
await shot(p,'05-home'); 
await p.getByText('Open a project').first().click(); await p.waitForTimeout(1000);
await p.locator('input').first().fill('/tmp/blind3/proj'); await p.keyboard.press('Enter'); await p.waitForTimeout(1000);
await shot(p,'06-browser'); await dump(p);
await p.getByText('Open this folder').click(); await p.waitForTimeout(1500); await shot(p,'07-project'); await dump(p); await b.close();
