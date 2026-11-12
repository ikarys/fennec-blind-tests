import {open,shot,text} from './lib.mjs';
const [,, sid,pre]=process.argv;
const {b,p}=await open('/#/s/'+sid);
await p.getByText('See the changes').click(); await p.waitForTimeout(2000);
await shot(p,pre+'-changes'); console.log((await text(p)).slice(0,1500));
await p.goBack(); await p.waitForTimeout(1500);
await p.getByRole('button',{name:/Review and integrate/}).first().click(); await p.waitForTimeout(2500);
await shot(p,pre+'-dialog'); console.log('-----DIALOG'); console.log(await text(p));
await b.close();
