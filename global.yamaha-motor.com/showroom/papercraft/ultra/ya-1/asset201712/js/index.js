
$(function(){
  
  // 画像のPC/SP 自動変換
  
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
  
  var youtubeSizeFix = function(){
    var r =315 / 560;
    $('.youtube-size-fix').each(function(){
      var thisW = $(this).width();
      $(this).height( Math.ceil(thisW * r) );
    });
  };
  
  var innerLink = function(){
    $('a.inner-link').click(function(){
      var targetHref = $(this).attr('href');
      if( $('body').hasClass('page-top') && targetHref.match(/^\/#/) ){
        targetHref = targetHref.replace('/#','#');
      }
      var targetTop = $(targetHref).offset().top;
      if( targetTop!=0 && !targetTop ){ return false; }
      $('html,body').animate( { scrollTop : targetTop+'px' }, 500, 'swing');
      return false;
    });
  };
  
  var pageNav = {
    flag : 'abs',
    action : function(){
      var st1 = ( $('html').scrollTop() > 0 ) ? $('html').scrollTop() : 0;
      var st2 = ( $('body').scrollTop() > 0 ) ? $('body').scrollTop() : 0;
      var scrollTop = ( st1 > st2 ) ? st1 : st2;
      var keyPoint = $('#main-pic-area').offset().top + 200;
      if( scrollTop >= keyPoint && pageNav.flag!='fix' ){  
        pageNav.flag = 'fix';
        $('#page-nav').addClass('fix');
        setTimeout(function(){ $('#page-nav').addClass('anim'); }, 200);
      }
      else if( scrollTop < keyPoint && pageNav.flag!='abs' ){
        pageNav.flag = 'abs';
        $('#page-nav').removeClass('fix').removeClass('anim');
      }
    }
  };
  
  var pageNavSp = {
    flag : 'static',
    action : function(){
      var st1 = ( $('html').scrollTop() > 0 ) ? $('html').scrollTop() : 0;
      var st2 = ( $('body').scrollTop() > 0 ) ? $('body').scrollTop() : 0;
      var scrollTop = ( st1 > st2 ) ? st1 : st2;
      var keyPoint = $('#page-nav-sp').offset().top;
      if( scrollTop >= keyPoint && pageNavSp.flag!='fix' ){
        pageNavSp.flag = 'fix';
        $('#page-nav-sp').addClass('fix');
        setTimeout(function(){ $('#page-nav').addClass('anim'); }, 200);
      }
      else if( scrollTop < keyPoint && pageNavSp.flag!='static' ){
        pageNavSp.flag = 'static';
        $('#page-nav-sp').removeClass('fix');
      }
    }
  };
  
  var specFade = {
    flag1 : null,
    flag2 : null,
    action : function(){
      var st1 = ( $('html').scrollTop() > 0 ) ? $('html').scrollTop() : 0;
      var st2 = ( $('body').scrollTop() > 0 ) ? $('body').scrollTop() : 0;
      var scrollTop = ( st1 > st2 ) ? st1 : st2;
      var windowInnerHeight = ( window.innerHeight > 0 ) ? window.innerHeight : 0;
      var scrollTop2 = scrollTop + (windowInnerHeight/1.5);
      var keyPoint1 = $('#spec .two-col').offset().top;
      var keyPoint2 = $('#spec .three-col').offset().top;
      
      if( scrollTop2 >= keyPoint1 && specFade.flag1!='active' ){
        specFade.flag1 = 'active';
        $('#spec .two-col').addClass('active');
      }
      else if( scrollTop2 < keyPoint1 && specFade.flag1!='no-active' ){
        specFade.flag1 = 'no-active';
        $('#spec .two-col').removeClass('active');
      }
      
      if( scrollTop2 >= keyPoint2 && specFade.flag2!='active' ){
        specFade.flag2 = 'active';
        $('#spec .three-col').addClass('active');
      }
      else if( scrollTop2 < keyPoint2 && specFade.flag2!='no-active' ){
        specFade.flag2 = 'no-active';
        $('#spec .three-col').removeClass('active');
      }
    }
  };
  
  // main
  
  imgExchange();
  youtubeSizeFix();
  innerLink();
  pageNav.action();
  pageNavSp.action();
  specFade.action();
  
  // スクロール
  $(window).scroll(function(){
    pageNav.action();
    pageNavSp.action();
    specFade.action();
  });
  
  // リサイズ
  $(window).resize(function(){
    imgExchange();
    youtubeSizeFix();
    pageNav.action();
    pageNavSp.action();
    specFade.action();
  });
  
});