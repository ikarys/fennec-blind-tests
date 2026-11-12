import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/project/18e73a834b4f480d-2aa8be-0/tasks'); await p.waitForTimeout(1200);
await p.getByText('Drafts').first().click(); await p.waitForTimeout(600);
await p.getByRole('button',{name:/task/i}).last().click(); await p.waitForTimeout(1500);
await p.getByText('Add a criterion').click(); await p.waitForTimeout(600);
await shot(p,'15-crit');
console.log(await p.locator('input,textarea').evaluateAll(l=>l.map(e=>e.tagName+':'+(e.placeholder||e.getAttribute('aria-label')||'')).join('\n')));
await b.close();
