
(function(){
const KEY='arvique_cart_v1';
function cart(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}}
function save(c){localStorage.setItem(KEY,JSON.stringify(c));window.dispatchEvent(new Event('arvique-cart-updated'))}
async function add(p){try{const api=(window.ARVIQUE_CONFIG&&window.ARVIQUE_CONFIG.API)||'https://arvique-store-api.elarioglobal.workers.dev';if(p&&p.slug){const r=await fetch(api+'/api/products',{cache:'no-store'});if(r.ok){const d=await r.json();const fresh=(d.products||[]).find(x=>x.slug===p.slug);if(fresh)p={...p,...fresh};}}}catch(e){}const c=cart();const x=c.find(i=>i.slug===p.slug);if(x){x.qty++;x.price=p.price;}else c.push({...p,qty:1});save(c);toast('Added to cart');}
function setQty(slug,qty){let c=cart();const x=c.find(i=>i.slug===slug);if(!x)return;if(qty<=0)c=c.filter(i=>i.slug!==slug);else x.qty=qty;save(c);}
function remove(slug){save(cart().filter(i=>i.slug!==slug))}
function total(c){return c.reduce((s,i)=>s+i.price*i.qty,0)}
function money(n){return '₹'+Number(n).toLocaleString('en-IN')}
function count(){return cart().reduce((s,i)=>s+i.qty,0)}
function toast(t){let e=document.getElementById('arvique-toast');if(!e){e=document.createElement('div');e.id='arvique-toast';Object.assign(e.style,{position:'fixed',right:'18px',bottom:'18px',background:'#0D1B2A',color:'#fff',padding:'12px 16px',borderRadius:'999px',zIndex:9999,fontWeight:800});document.body.appendChild(e)}e.textContent=t;e.hidden=false;clearTimeout(e._t);e._t=setTimeout(()=>e.hidden=true,1800)}
window.ARVIQUEStore={cart,add,setQty,remove,total,money,count};
window.ARVIQUEStore.refreshBadges=function(){document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=count())};
window.addEventListener('arvique-cart-updated',()=>window.ARVIQUEStore.refreshBadges());
document.addEventListener('DOMContentLoaded',()=>window.ARVIQUEStore.refreshBadges());
})();
