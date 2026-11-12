import {open,shot,text} from './lib.mjs';
const [,, sid]=process.argv;
const {b,p}=await open('/#/s/'+sid);
for (const l of await p.getByText('check command (optional)').all()) { await l.click().catch(()=>{}); }
await p.waitForTimeout(800); await shot(p,'59-checks');
console.log((await text(p)).split('DONE WHEN')[1]?.slice(0,1800)); await b.close();
