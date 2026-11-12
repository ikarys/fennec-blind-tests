import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/new/18e7377b3a265eb5-292474-0');
await p.getByText('Plan, build, verify').first().click(); await p.waitForTimeout(800);
await p.getByText('Quick build').first().click(); await p.waitForTimeout(800);
await p.locator('textarea').fill('Refactor: in todo/cli.py the argument parsing for add/list/done/delete is one long if-chain. Split each command into its own small function, same behaviour, tests must stay green.');
await p.keyboard.press('Enter'); await p.waitForTimeout(5000);
console.log(p.url()); await shot(p,'40-quick-start'); console.log((await text(p)).slice(-800)); await b.close();
