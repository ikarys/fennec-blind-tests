import {open,shot,BASE} from './lib.mjs';
export async function drive(p,prompt,tag,maxMin=15){
  await p.locator('textarea').fill(prompt);await p.locator('textarea').press('Enter');
  const end=Date.now()+maxMin*60000;
  while(Date.now()<end){await p.waitForTimeout(5000);
    for(const n of ['Go','Validate']){const bt=p.getByRole('button',{name:n,exact:true});if(await bt.count()){console.log('click',n);await bt.first().click();await p.waitForTimeout(2000);}}
    const t=await p.innerText('body');
    if(/Workflow finished|Workflow errored|Workflow blocked|Workflow stopped/.test(t))break;}
  await shot(p,tag);
}
