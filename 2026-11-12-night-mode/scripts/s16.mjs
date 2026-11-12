import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const {b,p}=await go();
await p.goto('http://127.0.0.1:7803/#/project/18e73a834b4f480d-2aa8be-0/tasks'); await p.waitForTimeout(1200);
await p.getByRole('button',{name:'Reread'}).first().click(); await p.waitForTimeout(2000);
await shot(p,'26-report-detail'); console.log(p.url());
await b.close();
