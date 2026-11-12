import {open,shot,text} from './lib.mjs';
const [,, sid,txt]=process.argv;
const {b,p}=await open('/#/s/'+sid);
await p.getByText(txt).first().click(); await p.waitForTimeout(3000);
await shot(p,'56-answered'); await b.close();
