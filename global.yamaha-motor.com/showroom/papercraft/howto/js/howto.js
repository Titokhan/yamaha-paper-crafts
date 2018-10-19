window.onload = function(){
  
  var video = {
    
    obj : [],
    
    makeObj : function(){
      for( var i=1; i<=$('.video-wrapper').length; i++){
        video['obj'][i] = document.getElementById('video'+i);
      }
    },
    pauseAll : function(){
      for( var i=1; i<=$('.video-wrapper').length; i++){
        video['obj'][i].pause();
      }
    },
    pause : function( pauseID ){
      video['obj'][ parseInt(pauseID.replace('video','')) ].pause();
    },
    play : function( playID ){
      var num = parseInt(playID.replace('video',''));
      var obj = video['obj'][num];
      obj.play();
    },
    onPlayEvent : function(){
      for( var i=1; i<=$('.video-wrapper').length; i++){
        video['obj'][i].addEventListener("play",function(e){
          var me = String( e.target.id );
          var me2 = parseInt( me.match(/\d+/) );
          for( var j=1; j<=$('.video-wrapper').length; j++){
            if( j!=me2 ){
              video.pause( 'video'+j );
            }
          }
        }, false);
      }
    }
  };
  
  video.makeObj();
  
  video.onPlayEvent();
  
  $('.video-bg-box img, .video-bg-box span').click(function(e){
    $(this).parent('.video-bg-box').find('img, span').css({'opacity':'0','left':'-5000px'})
    video.pauseAll();
    video.play( $(this).parents('.video-wrapper').find('video').attr('id') );
  });
  
};
