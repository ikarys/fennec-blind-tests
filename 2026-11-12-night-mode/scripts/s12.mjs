import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/project/18e73a834b4f480d-2aa8be-0/tasks'); await p.waitForTimeout(1200);
await p.getByText('Night mode').first().click(); await p.waitForTimeout(500);
await shot(p,'21-night-ticked');
await p.getByRole('button',{name:'Start the queue'}).click(); await p.waitForTimeout(2500);
await shot(p,'22-started'); await dump(p);
await b.close();
