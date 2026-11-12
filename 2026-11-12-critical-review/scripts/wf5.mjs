import {open,shot,text} from './lib.mjs';
const {b,p}=await open('/#/workflows');
await p.locator('input[placeholder="new-workflow"]').fill('build-and-test');
await p.getByRole('button',{name:/New workflow/}).click(); await p.waitForTimeout(1500);
const cv=p.locator('.react-flow__pane');
await p.getByText('Agent',{exact:true}).first().dragTo(cv,{targetPosition:{x:520,y:160}}); await p.waitForTimeout(400);
await p.getByText('Shell',{exact:true}).first().dragTo(cv,{targetPosition:{x:520,y:380}}); await p.waitForTimeout(400);
await p.getByText('End',{exact:true}).first().dragTo(cv,{targetPosition:{x:150,y:520}}); await p.waitForTimeout(400);
async function wire(srcNode,srcHandle,dstNode){
  const s=await p.locator(`.react-flow__handle.source[data-nodeid]`).evaluateAll((e,[n,h])=>{const x=e.find(y=>y.dataset.nodeid.startsWith(n)&&y.dataset.handleid===h);if(!x)return null;const r=x.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]},[srcNode,srcHandle]);
  const t=await p.locator(`.react-flow__handle.target[data-nodeid]`).evaluateAll((e,n)=>{const x=e.find(y=>y.dataset.nodeid.startsWith(n));if(!x)return null;const r=x.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]},dstNode);
  console.log(srcNode,srcHandle,dstNode,s,t); if(!s||!t) return;
  await p.mouse.move(s[0],s[1]); await p.mouse.down(); await p.mouse.move((s[0]+t[0])/2,(s[1]+t[1])/2,{steps:8}); await p.mouse.move(t[0],t[1],{steps:8}); await p.mouse.up(); await p.waitForTimeout(400);
}
const ids=await p.locator('.react-flow__node').evaluateAll(e=>e.map(x=>x.dataset.id));
console.log(ids);
await shot(p,'72-pre-wire'); 

await wire('start','next','agent');
await wire('agent','done','shell');
await wire('shell','success','done');
await wire('shell','failure','agent');
await wire('start','next','agent');
await shot(p,'73-wired'); console.log((await text(p)).split('Issues')[1]);


await p.locator('.react-flow__node[data-id="agent"]').click({position:{x:40,y:20}}); await p.waitForTimeout(300);
await p.locator('input:visible').nth(3).fill('Build');
await p.locator('.react-flow__node[data-id="shell"]').click({position:{x:40,y:20}}); await p.waitForTimeout(300);
await p.locator('input:visible').nth(3).fill('Run the tests');
await p.locator('textarea:visible').first().fill('.venv/bin/python -m pytest -q');
await p.locator('.react-flow__controls-fitview').click(); await p.waitForTimeout(800);
const edges=await p.locator('.react-flow__edge').evaluateAll(e=>e.map(x=>x.dataset.testid||x.id));
console.log(edges);
const fe=p.locator('.react-flow__edge').filter({has:p.locator('path.react-flow__edge-interaction')});
for (const e of await p.locator('.react-flow__edge-interaction').all()) {}
const ed=await p.locator('.react-flow__edge-interaction').evaluateAll(e=>e.map(x=>{const l=x.getTotalLength();const pt=x.getPointAtLength(l/2);const m=x.getScreenCTM();return [x.closest('.react-flow__edge').id, pt.x*m.a+m.e, pt.y*m.d+m.f]}));
console.log(ed);
const loop=ed[2];
await p.mouse.click(loop[1],loop[2]); await p.waitForTimeout(500);
await shot(p,'75-edge');

await p.locator('input:visible').nth(2).fill('3'); await p.waitForTimeout(500);
await shot(p,'76-cap');
await wire('shell','exhausted','end');
await p.locator('.react-flow__node[data-id="end"]').click({position:{x:30,y:20}}); await p.waitForTimeout(400);
console.log(await p.locator('input:visible, textarea:visible, select:visible').evaluateAll(e=>e.map(x=>x.tagName+':'+(x.placeholder||x.name||'')+'='+x.value+'['+[...(x.options||[])].map(o=>o.value).join(',')+']')));
await p.locator('input:visible').nth(3).fill('Stuck');
await p.locator('select:visible').nth(1).selectOption('blocked');
await shot(p,'77-end');
console.log((await text(p)).includes('issue'), await p.locator('button:has-text("Save")').isEnabled());
await p.getByRole('button',{name:'Save',exact:true}).click(); await p.waitForTimeout(1500);
await shot(p,'78-saved'); console.log(await p.locator('button[title]:visible').evaluateAll(e=>e.map(x=>x.title+':'+x.disabled).slice(-8)));

await b.close();
