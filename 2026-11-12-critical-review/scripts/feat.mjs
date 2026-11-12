import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/new/18e7377b3a265eb5-292474-0');
await p.locator('textarea').fill('Add a "delete" command to the todo CLI (python -m todo.cli delete <index>) backed by a store.remove(index) function that raises IndexError on a bad index. The CLI should print an error and return 3 for a bad index instead of crashing.');
await p.keyboard.press('Enter'); await p.waitForTimeout(4000);
console.log(p.url()); await shot(p,'10-feat-start');
await b.close();
