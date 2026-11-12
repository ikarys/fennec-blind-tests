import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
await p.goto(BASE+'/#/project/18e7244b27ad7621-22ae47-0');await p.waitForTimeout(1500);
for(const n of ['Module map','Risks','Decisions','Analyses']){
 await p.getByText(n,{exact:true}).first().click();await p.waitForTimeout(2500);await shot(p,'u-'+n.replace(' ',''));
 console.log('==',n,'\n',(await p.innerText('body')).replace(/\n+/g,' | ').slice(150,700));
}
await b.close();
