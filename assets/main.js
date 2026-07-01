/* onlinebca.in */
document.addEventListener('DOMContentLoaded', function () {
  var ham = document.querySelector('.nav-ham');
  var links = document.querySelector('.nav-links');
  if (ham && links) {
    ham.addEventListener('click', function () {
      var open = links.classList.toggle('nav-open');
      Object.assign(links.style, open ? {
        display:'flex',flexDirection:'column',position:'absolute',
        top:'62px',left:'0',right:'0',background:'#FFFFFF',
        padding:'1rem 4%',gap:'.75rem',zIndex:'298',
        borderBottom:'1px solid #E0E7FF'
      } : {display:'none'});
    });
  }
  var p = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function(a){
    var href = a.getAttribute('href') || '';
    if (href !== '/' && href !== '' && p.startsWith(href.replace(/\/index\.html$/, ''))) {
      a.classList.add('on');
    }
  });
});
function toggleFaq(btn) {
  var item = btn.closest('.faq-item');
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(i){i.classList.remove('open');});
  if (!isOpen) item.classList.add('open');
}
function filterCards(type, btn) {
  document.querySelectorAll('.fpill').forEach(function(b){b.classList.remove('on');});
  btn.classList.add('on');
  document.querySelectorAll('[data-card]').forEach(function(c){
    var show = type === 'all' || (c.dataset.type||'').includes(type) || (c.dataset.tag||'').includes(type);
    c.style.display = show ? '' : 'none';
  });
}
function submitLead(e, formId, successId) {
  e.preventDefault();
  var wrapper = document.getElementById(formId);
  if (!wrapper) return;
  var btn = wrapper.querySelector('button[type="submit"]');
  if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
  var d = {};
  wrapper.querySelectorAll('input[name], select[name]').forEach(function(el){ d[el.name] = el.value; });
  var params = new URLSearchParams(window.location.search);
  d.sourceDomain = window.location.hostname;
  d.sourcePage   = window.location.pathname;
  d.utmSource    = params.get('utm_source')   || '';
  d.utmMedium    = params.get('utm_medium')   || '';
  d.utmCampaign  = params.get('utm_campaign') || '';
  fetch('/api/lead', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(d)
  })
  .then(function(r){ return r.text().then(function(t){ if(!r.ok) throw new Error('HTTP '+r.status+': '+t); return t; }); })
  .then(function(){ wrapper.style.display='none'; var s=document.getElementById(successId); if(s) s.style.display='block'; if(btn){btn.textContent='Done';btn.disabled=false;} })
  .catch(function(err){ console.error(err); alert('Something went wrong: '+err.message+'\n\nCall us: +91 80800 89898'); if(btn){btn.textContent='Submit';btn.disabled=false;} });
}
