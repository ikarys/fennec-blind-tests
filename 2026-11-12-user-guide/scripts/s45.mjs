import {open,shot,BASE} from './lib.mjs';
const {b,p}=await open();
for(const [k,n] of [['sandbox','sb'],['appearance','ap'],['autonomy','au'],['rules','ru'],['scanners','sc'],['mcp','mc'],['web-search','ws'],['shortcuts','sh'],['about','ab'],['instructions','in'],['agents','ag'],['skills','sk'],['workflows','wf']]){
 await p.goto(BASE+'/#/settings/'+k);await p.waitForTimeout(1500);await shot(p,'set-'+n);
 console.log('==',k,(await p.innerText('body')).replace(/\n+/g,' | ').slice(300,520));
}
await b.close();
