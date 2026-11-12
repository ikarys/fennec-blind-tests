import {open,shot,text} from './lib.mjs';
// drive.mjs sid prefix maxsec  -- clicks Continue/Go/Validate, logs the decision titles
const [,, sid,pre,max]=process.argv;
const {b,p}=await open('/#/s/'+sid);
const t0=Date.now(); let n=0;
while((Date.now()-t0)<(+max)*1000){
  const t=await text(p);
  if(/Workflow finished|Run\s*\n?\s*\d+\/\d+\s*\n?.*Finished/.test(t)&&t.includes('Review and integrate')) {console.log('FINISHED');break;}
  if(/Blocked|Stuck/.test(t.slice(0,600))) console.log('maybe blocked');
  let clicked=null;
  for(const name of ['Continue','Go','Validate']){
    await p.keyboard.press('Escape');
    const btn=p.locator('button:text-is("'+name+'")').filter({has:p.locator('xpath=self::*')}).last();
    const bb=(await btn.count())?await btn.boundingBox():null;
    if(bb && bb.y>650 && bb.x>350){
      const title=await p.locator('text=/Paused before|Go with this plan|Validate these/').last().innerText().catch(()=>'?');
      n++; await shot(p,`${pre}-stop${n}-${name}`); console.log('STOP',n,name,'|',title.slice(0,80));
      await btn.click(); clicked=name; await p.waitForTimeout(2500); break;
    }
  }
  if(!clicked) await p.waitForTimeout(4000);
}
await shot(p,pre+'-end'); await b.close();
