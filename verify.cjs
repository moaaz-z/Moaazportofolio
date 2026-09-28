const fs=require('fs');const h=fs.readFileSync('portfolio/dist/index.html','utf8');
const ids=[...h.matchAll(/id="([^"]+)"/g)].map(x=>x[1]);
if([...h.matchAll(/href="#([^"]+)"/g)].some(x=>!ids.includes(x[1])))throw Error('Broken anchor');
if(!fs.existsSync('portfolio/dist/portrait.png'))throw Error('Missing portrait');
if(/student|coursework|\[cite:/i.test(h))throw Error('Student reference remains');
const stack=[];const voids=new Set(['meta','link','img','br','hr','input']);for(const m of h.matchAll(/<(\/?)([a-z][a-z0-9]*)\b[^>]*>/gi)){const t=m[2].toLowerCase();if(voids.has(t))continue;if(m[1]){if(stack.pop()!==t)throw Error('Unbalanced '+t)}else stack.push(t)}if(stack.length)throw Error('Unclosed tags');
console.log('Verified HTML structure, section links, portrait asset, and removal of student references.');
