import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/project/18e73a834b4f480d-2aa8be-0/tasks'); await p.waitForTimeout(1200);
await p.getByText('To decide').first().click(); await p.waitForTimeout(800);
await p.getByRole('button',{name:'Answer'}).last().click(); await p.waitForTimeout(2500);
await shot(p,'24-session-feature'); console.log(p.url()); await dump(p);
await b.close();
