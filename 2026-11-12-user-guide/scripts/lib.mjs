import {createRequire} from 'module'; const {chromium}=createRequire('/home/tony/workspace/fennec-wt/release-docs/web/package.json')('playwright');
export async function open(){const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:900}});p.setDefaultTimeout(15000);return {b,p};}
export const shot=(p,n)=>p.screenshot({path:`/tmp/blind/shots/${n}.png`});
export const BASE='http://127.0.0.1:7801';
