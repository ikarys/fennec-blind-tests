import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/s/18e72454ac863dc8-22ae47-1');await p.waitForTimeout(2500);
const bs=await p.getByRole('button').allInnerTexts();console.log(bs.filter(x=>x.trim()));
console.log(await p.getByText(/Review and integrate/).count(),await p.getByText(/Try it/).count(),await p.getByText(/Changes/).count());
for(const l of await p.getByRole('button').all()){const t=await l.getAttribute('aria-label')||await l.getAttribute('title');if(t)console.log('L',t);}
await b.close();
