import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const {b,p}=await go();
await p.getByRole('button',{name:'Projects'}).click(); await p.waitForTimeout(800);
await p.getByText('proj',{exact:true}).first().click(); await p.waitForTimeout(800);
await p.getByText('Tasks',{exact:true}).last().click(); await p.waitForTimeout(1000);
console.log(p.url()); await shot(p,'10-tasks');
await p.getByText('New idea').first().click(); await p.waitForTimeout(600); await shot(p,'11-newidea'); await dump(p);
await b.close();
