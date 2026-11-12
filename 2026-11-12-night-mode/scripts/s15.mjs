import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
import fs from 'fs';
const {b,p}=await go();
for(let i=0;i<4;i++){
 await p.goto('http://127.0.0.1:7803/#/project/18e73a834b4f480d-2aa8be-0/tasks'); await p.waitForTimeout(1000);
 await p.getByText('To decide').first().click(); await p.waitForTimeout(600);
 await p.getByRole('button',{name:'Answer'}).nth(i).click(); await p.waitForTimeout(2500);
 await shot(p,'25-session'+i);
 fs.writeFileSync('/tmp/blind3/sess'+i+'.txt', await p.evaluate(()=>document.body.innerText));
}
await b.close();
