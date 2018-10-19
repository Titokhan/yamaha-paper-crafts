
$(function(){
  
  if( window.innerWidth < 768 ){
    $('a.rwd-modal-link').colorbox.remove();
    $('a.rwd-modal-link').click(function(){ return false; });
  }
  
  $('#gallery .item').each(function(){
    
    var num = $(this).find('img').attr('src').match(/0(\d\d)/)[1];
    $(this).find('.num').text(num);
    
    var indicator = [];
    var num2 = parseInt( num.replace(/^0/,'') );
    for( var i=1; i<=$('#gallery .item').length; i++){
      indicator.push('<span class="'+ ((i==num2)?'current':'') +'"></span>');
    }
    $(this).find('.indicator').html( indicator.join('') );
  });
  
});