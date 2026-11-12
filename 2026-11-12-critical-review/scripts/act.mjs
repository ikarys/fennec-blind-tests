import {open,shot,text} from './lib.mjs';
// usage: act.mjs sid shotname comment button
const [,, sid,name,comment,btn]=process.argv;
const {b,p}=await open('/#/s/'+sid);
if(comment) await p.getByPlaceholder('Comment (optional)…').fill(comment);
await p.getByRole('button',{name:btn,exact:true}).last().click(); await p.waitForTimeout(3000);
await shot(p,name); await b.close();
