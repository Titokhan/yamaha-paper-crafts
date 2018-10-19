
$(function(){
  
  var localNavTop = $('#mt10-local-nav-wrapper').offset().top;
  
  var st1, st2, scrollTop, flag, windowInnerWidth;
  
  var scrollfunc = function(){
    st1 = ( $('html').scrollTop() > 0 ) ? $('html').scrollTop() : 0;
    st2 = ( $('body').scrollTop() > 0 ) ? $('body').scrollTop() : 0;
    scrollTop = ( st1 > st2 ) ? st1 : st2;
    
    if( scrollTop >= localNavTop && !flag ){
      flag = true;
      $('#mt10-local-nav').addClass('fixed');
    }
    else if( scrollTop < localNavTop && flag ){
      flag = false;
      $('#mt10-local-nav').removeClass('fixed');
    }
  };
  
  $(window).scroll(function(){
    scrollfunc();
  });
  
  $(window).resize(function(){
    localNavTop = $('#mt10-local-nav-wrapper').offset().top;
    scrollfunc();
  });
  
});