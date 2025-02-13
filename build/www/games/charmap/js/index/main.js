var menu = document.getElementById('theme-select');
var css = document.getElementById('linkedcss');
menu.addEventListener('change', function(e) {
  css.setAttribute('href', 'css/' + e.target.value)
}, false);
