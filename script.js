
function toggleDark(){
  const el = document.documentElement;
  const isDark = el.classList.toggle('dark');
  try{ localStorage.setItem('cyberx-theme','' + (isDark ? 'dark' : 'light')); }catch(e){}
}

// Apply saved theme on load (default: dark)
(function applySavedTheme(){
  try{
    const saved = localStorage.getItem('cyberx-theme');
    if(saved === 'dark') document.documentElement.classList.add('dark');
    else if(saved === 'light') document.documentElement.classList.remove('dark');
  }catch(e){}
})();

// Toggle between login and register cards on the auth page
function showAuthView(view){
  const login = document.getElementById('login-card');
  const register = document.getElementById('register-card');
  if(!login || !register) return;
  if(view === 'register'){
    login.classList.add('hidden');
    register.classList.remove('hidden');
    register.scrollIntoView({behavior:'smooth', block:'center'});
  } else {
    register.classList.add('hidden');
    login.classList.remove('hidden');
    login.scrollIntoView({behavior:'smooth', block:'center'});
  }
}

function showFeature(id){
  const details = document.querySelectorAll('.feature-detail');
  details.forEach(d=> d.classList.add('hidden'));
  const el = document.getElementById(id);
  if(el){
    el.classList.remove('hidden');
    el.scrollIntoView({behavior:'smooth', block:'center'});
  }
}
