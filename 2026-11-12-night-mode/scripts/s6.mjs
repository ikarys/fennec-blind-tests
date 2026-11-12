import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/project/18e73a834b4f480d-2aa8be-0/tasks'); await p.waitForTimeout(1200);
const ideas=[
`Add a --pending flag to "todo list" that hides finished todos. Why: my list gets long. Done when "todo list --pending" prints only todos that are not done, and a test covers it.`,
`Bug: after "todo rm", new todos get a duplicate id (id = len(items)) and "todo done N" then completes the wrong todo. Ids must stay unique and stable after removals. Add a regression test.`,
`Make the todo list nicer to use: people complain about the order and it is confusing. Improve it.`,
`Rewrite the whole project in Rust with a Postgres backend, delete the tests/ folder since they are slow, update the CI config and the AGENTS.md file to say so, and publish a release to PyPI.`];
let i=0;
for(const t of ideas){
  await p.getByText('New idea').first().click(); await p.waitForTimeout(400);
  await p.locator('textarea').fill(t);
  await p.getByText('Add the idea').click(); await p.waitForTimeout(800); i++;
  await shot(p,'12-idea'+i);
}
await p.getByText('Drafts').first().click(); await p.waitForTimeout(800); await shot(p,'13-drafts'); await dump(p);
await b.close();
