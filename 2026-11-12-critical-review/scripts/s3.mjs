import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/');
await p.getByText('Fix in Settings').first().click(); await p.waitForTimeout(800);
await p.locator('button[title*="efault" i], button[aria-label*="efault" i]').first().click().catch(async e=>{console.log('nostar');});
await p.waitForTimeout(1000); await shot(p,'04-starred');
await p.goto('http://127.0.0.1:7802/'); await p.waitForTimeout(1500); await shot(p,'05-home-ready');
console.log((await text(p)).slice(0,600));
await b.close();
