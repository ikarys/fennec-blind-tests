import {go} from './lib2.mjs'; import {shot,dump} from './lib.mjs';
const {b,p}=await go();
await p.getByRole('button',{name:'Projects'}).click(); await p.waitForTimeout(800);
await p.getByText('proj',{exact:true}).first().click(); await p.waitForTimeout(1000);
await shot(p,'09-proj');
console.log(await p.getByRole('link').evaluateAll(l=>l.map(e=>e.innerText+'->'+e.getAttribute('href')).join('\n')));
console.log(await p.getByRole('button').evaluateAll(l=>l.map(e=>e.getAttribute('aria-label')||e.innerText).join('|')));
await b.close();
