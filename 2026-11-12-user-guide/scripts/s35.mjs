import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/edit/18e7244b27ad7621-22ae47-0');await p.waitForTimeout(2000);
const m=p.getByPlaceholder(/message/i).or(p.locator('input').last());await m.first().fill('docs: mention add_todo');
await p.getByRole('checkbox').first().check();await p.waitForTimeout(500);await p.getByRole('button',{name:'Commit',exact:true}).click();await p.waitForTimeout(2500);await shot(p,'ed4');
console.log((await p.innerText('body')).slice(-200));
await b.close();
