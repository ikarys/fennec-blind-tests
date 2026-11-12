import { chromium } from '/home/tony/workspace/fennec-wt/release-docs/web/node_modules/playwright/index.mjs';
export const URL='http://127.0.0.1:7802';
export async function open(path='/'){
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
  await p.goto(URL+path); await p.waitForTimeout(1500); return {b,p};
}
export const shot=(p,n)=>p.screenshot({path:`/tmp/blind2/shots/${n}.png`});
export async function text(p){return (await p.locator('body').innerText());}
