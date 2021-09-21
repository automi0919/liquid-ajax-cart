var t={d:(e,o)=>{for(var s in o)t.o(o,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:o[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{j:()=>b});const o=[],s=(t,e)=>{const s=(t=>{switch(t){case"add":return"/cart/add.js";case"change":return"/cart/change.js";case"get":return"/cart.js";default:return}})(t),r="get"===t?void 0:{...e},a="get"===t?"GET":"POST";o.forEach((e=>{try{e({requestType:t,endpoint:s,requestBody:r})}catch{}}));const n={method:a,headers:{"Content-Type":"application/json"}};return"get"!==t&&(n.body=JSON.stringify(r)),fetch(s,n).then((t=>t.json().then((e=>({ok:t.ok,status:t.status,body:e}))))).then((e=>(o.forEach((o=>{try{o({requestType:t,endpoint:s,requestBody:r,responseData:e})}catch{}})),e))).catch((t=>{console.log(t)}))},r=t=>{o.push(t)},a={all:0},n=[];let i={},c={requestInProgress:!1,cartStateSet:!1};r((t=>{"responseData"in t?d(t):u(t),l(),y()}));const u=t=>{a.all++},d=t=>{a.all--,t.responseData.ok&&("add"!==t.requestType?i=t.responseData.body:s("get"))},l=()=>{c.requestInProgress=a.all>0,c.cartStateSet="item_count"in i},p=t=>{try{t({cart:i,status:c}),n.push(t)}catch{}},m=()=>({cart:i,status:c}),y=()=>{n.forEach((t=>{try{t({cart:i,status:c})}catch{}}))},f={dataAttributePrefix:"data-ajax-cart",cssClassesPrefix:"js-ajax-cart",productFormsFilter:t=>!0,requestInProgressBodyClass:"js-ajax-cart-request-in-progress",cartStateSetBodyClass:"js-ajax-cart-set",emptyCartBodyClass:"js-ajax-cart-empty",productFormsIgnoreSubmitOnProcessing:!0,productFormsProcessingClass:"js-ajax-cart-form-in-progress",productFormsButtonProcessingClass:"js-ajax-cart-button-in-progress",productFormsButtonProcessingDisabledAttribute:!1};let g={};const b=(t={})=>{g={...f,...t},g.computed={productFormsErrorsAttribute:`${g.dataAttributePrefix}-form-error`,sectionsAttribute:`${g.dataAttributePrefix}-section`,binderAttribute:`${g.dataAttributePrefix}-bind-state`,quantityButtonAttribute:`${g.dataAttributePrefix}-quantity-button`,toggleClassButtonAttribute:`${g.dataAttributePrefix}-toggle-class-button`,toggleClassPrefix:`${g.cssClassesPrefix}-toggle-`}};b();const h=g.computed.binderAttribute;p((t=>{t.status.cartStateSet&&document.querySelectorAll(`[${h}]`).forEach((t=>{const e=t.getAttribute(h),o=S(e);void 0!==o&&(t.innerText=o)}))}));const S=t=>{const[e,...o]=t.split("|");let s=P(e);return o.forEach((t=>{const e=t.trim();""!==e&&e in A&&(s=A[e](s))})),s};function P(t,e=m()){m();const o=t.split("."),s=o.shift().trim();return s in e&&o.length>0?P(o.join("."),e[s]):e[s]}const A={amount:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount }}")},amount_no_decimals:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_no_decimals }}")},amount_with_comma_separator:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_with_comma_separator }}")},amount_no_decimals_with_comma_separator:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_no_decimals_with_comma_separator }}")},amount_with_apostrophe_separator:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_with_apostrophe_separator }}")}};function _(t){const{quantityButtonAttribute:e}=g.computed;if(!m().status.requestInProgress){const[t,r]=this.getAttribute(e).split("|");o={id:t.trim(),quantity:parseInt(r.trim())},s("change",o)}var o}function q(t){const{toggleClassButtonAttribute:e,toggleClassPrefix:o}=g.computed;let s=this.getAttribute(e).trim();s&&(s=o+s,t.preventDefault(),document.body.classList.toggle(s))}r((t=>{if("responseData"in t){if(t.responseData.ok&&"sections"in t.responseData.body){const e=t.responseData.body.sections;for(let t in e)document.querySelectorAll(`#shopify-section-${t}`).forEach((o=>{o.outerHTML=e[t]}))}}else if("requestBody"in t){const e=[];document.querySelectorAll(`[${g.computed.sectionsAttribute}]`).forEach((t=>{let o=t.parentElement.id;if(0===o.indexOf("shopify-section-")){const t=o.replace("shopify-section-","");-1===e.indexOf(t)&&e.push(t)}})),e.length&&(t.requestBody.sections=e.join(","))}})),document.addEventListener("click",(function(t){const{quantityButtonAttribute:e,toggleClassButtonAttribute:o}=g.computed;for(var s=t.target;s&&s!=this;s=s.parentNode){if(s.matches(`[${e}]`)){_.call(s,t);break}if(s.matches(`[${o}]`)){q.call(s,t);break}}}),!1);const B=new WeakMap;function C(t,e=""){t.querySelectorAll(`[${g.computed.productFormsErrorsAttribute}]`).forEach((t=>{t.innerText=e||""})),t.querySelectorAll("input[type=submit], button[type=submit]");const o=B.get(t);g.productFormsProcessingClass&&(o>0?t.classList.add(g.productFormsProcessingClass):t.classList.remove(g.productFormsProcessingClass)),(g.productFormsButtonProcessingClass||g.productFormsButtonProcessingDisabledAttribute)&&t.querySelectorAll("input[type=submit], button[type=submit]").forEach((t=>{o>0?(g.productFormsButtonProcessingClass&&t.classList.add(g.productFormsButtonProcessingClass),g.productFormsButtonProcessingDisabledAttribute&&(t.disabled=!0)):(g.productFormsButtonProcessingClass&&t.classList.remove(g.productFormsButtonProcessingClass),g.productFormsButtonProcessingDisabledAttribute&&(t.disabled=!1))}))}document.addEventListener("submit",(t=>{const e=t.target;let o,r="";if("/cart/add"!==new URL(t.target.action).pathname)return;if("productFormsFilter"in g&&!g.productFormsFilter(e))return;if(t.preventDefault(),o=B.get(e),o>0||(o=0),g.productFormsIgnoreSubmitOnProcessing&&o>0)return;const a=new FormData(e),n={};for(let t of a){const e=t[0],o=t[1];["quantity","id","selling_plan"].includes(e)&&(n[e]=o),0===e.indexOf("properties[")&&"]"===e.slice(-1)&&("properties"in n||(n.properties={}),n.properties[e.slice(11,-1)]=o)}var i;"id"in n&&("quantity"in n||(n.quantity=1),B.set(e,o+1),C(e),(i={items:[n]},s("add",i)).then((t=>{t.ok||(r="description"in t.body?t.body.description:"message"in t.body?t.body.message:`Error ${t.status}`)})).finally((()=>{const t=B.get(e);t>0&&B.set(e,t-1),C(e,r)})))})),p((t=>{const{cartStateSetBodyClass:e,requestInProgressBodyClass:o,emptyCartBodyClass:s}=g;e&&(t.status.cartStateSet?document.body.classList.add(e):document.body.classList.remove(e)),o&&(t.status.requestInProgress?document.body.classList.add(o):document.body.classList.remove(o)),s&&(t.status.cartStateSet&&0===t.cart.item_count?document.body.classList.add(s):document.body.classList.remove(s))}));var F=e.j;export{F as configure};