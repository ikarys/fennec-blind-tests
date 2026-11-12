import {open,shot,dump,URL} from './lib.mjs';
export async function go(){
  const {b,p}=await open();
  await p.goto(URL); await p.waitForTimeout(1200);
  return {b,p};
}
