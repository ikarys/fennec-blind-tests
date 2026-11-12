import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/s/'+process.argv[2]);
const l=p.locator('text=check command (optional)').first();
await l.scrollIntoViewIfNeeded(); const bb=await l.boundingBox(); console.log(bb);
await p.mouse.click(bb.x+5,bb.y+5); await p.waitForTimeout(600);
await shot(p,process.argv[3]);
console.log(await p.locator('textarea:visible,input:visible').evaluateAll(e=>e.map(x=>x.value||x.placeholder)));
await b.close();
