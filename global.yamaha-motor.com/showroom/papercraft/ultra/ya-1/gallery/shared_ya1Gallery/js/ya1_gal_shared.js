
// ‰æ‘œ‚ÌPC/SP Ž©“®•ÏŠ·
$(function(){
  
  var imgExchange = function(){
    $('.img-exchange').each(function(){
      var thisSrc = $(this).attr('src');
      if( window.innerWidth < 768 && thisSrc.indexOf('_sp') == -1 ){
        thisSrc = thisSrc.replace('.png','_sp.png');
        thisSrc = thisSrc.replace('.jpg','_sp.jpg');
      }
      else if( window.innerWidth >= 768 && thisSrc.indexOf('_sp') >= 0 ){
        thisSrc = thisSrc.replace('_sp.png','.png');
        thisSrc = thisSrc.replace('_sp.jpg','.jpg');
      }
      $(this).attr('src',thisSrc).css('visibility','visible');
    });
  };
  
  imgExchange();
  
  $(window).resize(function(){
    imgExchange();
  });
  
});