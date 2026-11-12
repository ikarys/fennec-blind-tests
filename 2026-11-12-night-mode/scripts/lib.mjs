import { chromium } from '/home/tony/workspace/fennec-wt/release-docs/web/node_modules/playwright/index.mjs';
export const URL='http://127.0.0.1:7803';
export async function open(){
  const b=await chromium.launch({headless:true});
  const p=await b.newPage({viewport:{width:1440,height:900}});
  return {b,p};
}
export const shot=(p,n)=>p.screenshot({path:`/tmp/blind3/shots/${n}.png`,fullPage:false});
export async function dump(p){ console.log(await p.evaluate(()=>document.body.innerText.slice(0,3000))); }
