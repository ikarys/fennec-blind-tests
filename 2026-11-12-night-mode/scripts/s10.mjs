import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/project/18e73a834b4f480d-2aa8be-0/tasks'); await p.waitForTimeout(1200);
await shot(p,'18-overview');
await p.locator('button:right-of(:text("Night mode"))').first().click(); await p.waitForTimeout(1000);
await shot(p,'19-autonomy'); await dump(p);
console.log(await p.locator('input').evaluateAll(l=>l.map(e=>e.type+':'+e.value+':'+(e.getAttribute('aria-label')||'')).join('\n')));
await b.close();
