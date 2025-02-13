// shim layer with setTimeout fallback
window.requestAnimationFrame = window.requestAnimationFrame || (function(){
  return  window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

