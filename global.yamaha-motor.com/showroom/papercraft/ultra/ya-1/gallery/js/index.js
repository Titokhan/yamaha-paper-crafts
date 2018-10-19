var ya1 = ya1 || {

  // ------------------------------
  // data
  // ------------------------------
  
  data : {
    bodyHeight : 0,
    bodyWidth : 0,
    scrollTop : 0,
    scrollBottom : 0,
    scrollCenter : 0,
    windowInnerWidth : 0,
    windowInnerHeight : 0,
    
    breakpoint : 768,
    viewport : '', // 'PC' or 'SP'
    
    pos : {
      main : 0,
      detail : 0,
      story : 0,
      meet : 0
    }
  },

  // ------------------------------
  // getBasicData
  // ------------------------------

  getBasicData : function(){
    ya1.data.bodyHeight = ( $('body').height() > 0 ) ? $('body').height() : 0;
    ya1.data.bodyWidth = ( $('body').width() > 0 ) ? $('body').width() : 0;
    var st1 = ( $('html').scrollTop() > 0 ) ? $('html').scrollTop() : 0;
    var st2 = ( $('body').scrollTop() > 0 ) ? $('body').scrollTop() : 0;
    ya1.data.scrollTop = ( st1 > st2 ) ? st1 : st2;
    var sl1 = ( $('html').scrollLeft() > 0 ) ? $('html').scrollLeft() : 0;
    var sl2 = ( $('body').scrollLeft() > 0 ) ? $('body').scrollLeft() : 0;
    ya1.data.scrollLeft = ( sl1 > sl2 ) ? sl1 : sl2;
    ya1.data.windowInnerWidth = ( window.innerWidth > 0 ) ? window.innerWidth : 0;
    ya1.data.windowInnerHeight = ( window.innerHeight > 0 ) ? window.innerHeight : 0;
    ya1.data.scrollCenter = ya1.data.scrollTop + (ya1.data.windowInnerHeight/2);
    ya1.data.scrollBottom = ya1.data.scrollTop + ya1.data.windowInnerHeight;
    
    ya1.data.viewport = (ya1.data.windowInnerWidth >= ya1.data.breakpoint ) ? 'PC' : 'SP';
  },

  // ------------------------------
  // getBlockTopPos
  // ------------------------------

  getBlockTopPos : function(){
    ya1.data.pos.main = $('#main-pic-area .image-area').offset().top;
    ya1.data.pos.detail = $('#detail-area').offset().top;
    ya1.data.pos.story = $('#story-area').offset().top;
    ya1.data.pos.meet = $('#meet-area').offset().top;
  },

  // ------------------------------
  // コンテンツアニメーション
  // ------------------------------
  
  contAnim : function(){
    
    if( ya1.data.scrollCenter >= ya1.data.pos.main ){
       $('#main-pic-area .image-area').addClass('on');
    }
    else {
      $('#main-pic-area .image-area').removeClass('on');
    }
    
    if( ya1.data.scrollCenter >= ya1.data.pos.detail ){
       $('#detail-area').addClass('on');
    }
    else {
      $('#detail-area').removeClass('on');
    }
    
    if( ya1.data.scrollCenter >= ya1.data.pos.story+100 ){
       $('#story-area').addClass('on');
    }
    else {
      $('#story-area').removeClass('on');
    }
    
    if( ya1.data.scrollCenter >= ya1.data.pos.meet+100 ){
       $('#meet-area').addClass('on');
    }
    else {
      $('#meet-area').removeClass('on');
    }
  }
};

$(window).load(function(){
  
  ya1.getBasicData();
  ya1.getBlockTopPos();
  ya1.contAnim();
  
  $(window).scroll(function(){
    ya1.getBasicData();
    ya1.getBlockTopPos();
    ya1.contAnim();
  });
  
  $(window).resize(function(){
    ya1.getBasicData();
    ya1.getBlockTopPos();
    ya1.contAnim();
  });

});
