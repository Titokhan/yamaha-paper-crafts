
// ------------------------------
// 
//  ペーパークラフト MT-01, VMAX
//  共通ファンクション。
// 
// ------------------------------

$(function(){
  
  // ------------------------------
  // 完成写真の数が多い場合、SPではアコーディオン風に
  // ------------------------------
  
  $('#complete-area .more').click(function(){
    
    var hiddenItems = $('#complete-area a.rwd-grid-item.rwd-sp-none').length;
    var moreSrc = $('#complete-area .more img').attr('src');
    
    // open ボタンクリックの場合
    if( moreSrc.indexOf('open') >= 0 ){
      if( hiddenItems > 0 ){
        $('#complete-area a.rwd-grid-item.rwd-sp-none:eq(0),#complete-area a.rwd-grid-item.rwd-sp-none:eq(1),#complete-area a.rwd-grid-item.rwd-sp-none:eq(2)').removeClass('rwd-sp-none');
        if( hiddenItems <= 3 ){
          moreSrc = moreSrc.replace('open','close');
          $('#complete-area .more img').attr('src',moreSrc);
          $('#complete-area .more span').text('Display only 3 pictures.');
        }
      }
    }
    
    // close ボタンクリックの場合
    else {
      $('#complete-area a.rwd-grid-item').addClass('rwd-sp-none');
      $('#complete-area a.rwd-grid-item.rwd-sp-none:eq(0),#complete-area a.rwd-grid-item.rwd-sp-none:eq(1),#complete-area a.rwd-grid-item.rwd-sp-none:eq(2)').removeClass('rwd-sp-none');
      moreSrc = moreSrc.replace('close','open');
      $('#complete-area .more img').attr('src',moreSrc);
      $('#complete-area .more span').text('See more pictures...');
      window.scroll( 0 , $('#complete-area').offset().top );
    }
    
    return false;
  });
  
});