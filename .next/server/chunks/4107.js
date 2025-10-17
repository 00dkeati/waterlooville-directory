"use strict";exports.id=4107,exports.ids=[4107],exports.modules={12125:(e,r,t)=>{t.d(r,{Z:()=>createLucideIcon});var a=t(9885);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let toKebabCase=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),toCamelCase=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,t)=>t?t.toUpperCase():r.toLowerCase()),toPascalCase=e=>{let r=toCamelCase(e);return r.charAt(0).toUpperCase()+r.slice(1)},mergeClasses=(...e)=>e.filter((e,r,t)=>!!e&&""!==e.trim()&&t.indexOf(e)===r).join(" ").trim(),hasA11yProp=e=>{for(let r in e)if(r.startsWith("aria-")||"role"===r||"title"===r)return!0};/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,a.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:t=2,absoluteStrokeWidth:o,className:l="",children:i,iconNode:d,...c},h)=>(0,a.createElement)("svg",{ref:h,...s,width:r,height:r,stroke:e,strokeWidth:o?24*Number(t)/Number(r):t,className:mergeClasses("lucide",l),...!i&&!hasA11yProp(c)&&{"aria-hidden":"true"},...c},[...d.map(([e,r])=>(0,a.createElement)(e,r)),...Array.isArray(i)?i:[i]])),createLucideIcon=(e,r)=>{let t=(0,a.forwardRef)(({className:t,...s},l)=>(0,a.createElement)(o,{ref:l,iconNode:r,className:mergeClasses(`lucide-${toKebabCase(toPascalCase(e))}`,`lucide-${e}`,t),...s}));return t.displayName=toPascalCase(e),t}},7382:(e,r,t)=>{t.d(r,{Z:()=>s});var a=t(12125);let s=(0,a.Z)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]])},69518:(e,r,t)=>{t.d(r,{Z:()=>s});var a=t(12125);let s=(0,a.Z)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]])},56206:(e,r,t)=>{t.d(r,{Z:()=>s});var a=t(12125);let s=(0,a.Z)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])}};