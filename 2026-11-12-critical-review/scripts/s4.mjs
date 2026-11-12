import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/');
await p.getByRole('button',{name:'Open a project'}).first().click(); await p.waitForTimeout(1000);
await shot(p,'06-browser');
const inp=p.locator('input:visible').first();
await inp.fill('/tmp/blind2/proj'); await inp.press('Enter'); await p.waitForTimeout(1000);
await shot(p,'07-browser-typed');
await p.getByRole("button",{name:"Open this folder"}).click(); await p.waitForTimeout(1500); await shot(p,"08-project"); console.log(p.url()); console.log((await text(p)).slice(0,800));
await b.close();
