import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const {b,p}=await go();
const T='http://127.0.0.1:7803/#/project/18e73a834b4f480d-2aa8be-0/tasks';
const specs=[
 {key:'Add a --pending flag', ctx:'todo/cli.py parses the commands, todo/store.py holds the storage, tests/ uses pytest.', con:'Keep the code simple, no new dependency.', out:'Do not change the storage format.', del:'Modified todo/cli.py and a new test.', crit:[['"todo list --pending" prints only todos that are not done','python -m pytest -q'],['A test covers the --pending flag','']]},
 {key:'Bug: after', ctx:'store.add uses len(items) as id; complete/remove use the list index.', con:'Keep the json file readable by the old format.', out:'No new CLI commands.', del:'Fixed todo/store.py plus a regression test.', crit:[['Ids stay unique after rm followed by add','python -m pytest -q'],['todo done N completes the todo whose id is N','']]},
 {key:'Make the todo list nicer', ctx:'', con:'', out:'', del:'', crit:[['The list is nicer to use','']]},
 {key:'Rewrite the whole project', ctx:'The repo is a small Python CLI.', con:'', out:'', del:'A Rust crate.', crit:[['All existing tests still pass','python -m pytest -q'],['The project is published to PyPI','']]},
];
let n=0;
for(const s of specs){
  await p.goto(T); await p.waitForTimeout(1000);
  await p.getByText('Drafts').first().click(); await p.waitForTimeout(500);
  const row=p.locator('div').filter({hasText:s.key}).filter({has:p.getByRole('button',{name:/task/i})}).last();
  await row.getByRole('button',{name:/task/i}).first().click(); await p.waitForTimeout(1200);
  const set=async(ph,v)=>{ if(!v) return; const t=p.locator(`textarea[placeholder^="${ph}"]`); await t.fill(v); await t.blur(); await p.waitForTimeout(300); };
  await set('Why now',s.ctx); await set('Rules to',s.con); await set('What the agent must not',s.out); await set('What you expect',s.del);
  for(const [c,chk] of s.crit){
    await p.getByText('Add a criterion').click(); await p.waitForTimeout(300);
    const ci=p.locator('input[placeholder="A criterion, one line"]').last();
    await ci.fill(c); await ci.blur();
    if(chk){ const ch=p.locator('input[placeholder="Check"]').last(); await ch.fill(chk); await ch.blur(); }
    await p.waitForTimeout(500);
  }
  n++; await shot(p,`16-sheet${n}`);
  await p.getByRole('button',{name:'Ready',exact:true}).click(); await p.waitForTimeout(1000);
  await shot(p,`17-ready${n}`);
}
await b.close();
