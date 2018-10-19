(function($) {

    //企業サイト（global.yamaha-motor.com）用チェックキー
    var mixi_check_key = 'f685870a346227aa6dfd406f04c38b16629ed570';

    // シェアボタン
    var current_url = window.location.href;
    var current_url_encoded = encodeURI(current_url);
    var current_title_encoded = encodeURIComponent(document.title);
    var url_facebook = '//www.facebook.com/sharer.php?u=' + current_url_encoded;
    var url_twitter = '//twitter.com/share?url=' + current_url_encoded + '&text=' + current_title_encoded;
    var url_googleplus = '//plus.google.com/share?url=' + current_url_encoded;
    var url_line = '//line.me/R/msg/text/?' + current_url_encoded;
    var url_mixi = '//mixi.jp/share.pl?u=' + current_url_encoded + '&k=' + mixi_check_key;
    var url_linkedin = "//www.linkedin.com/shareArticle?mini=true&url=" + current_url_encoded + "&title=" + current_title_encoded;


    $('#rwd-content .rwd-sns-facebook a').on("click", function() {
        window.open(url_facebook, "facebook", "width=632,height=480,resizable=no,scrollbars=no");
        return false;
    });

    $('#rwd-content .rwd-sns-twitter a').on("click", function() {
        window.open(url_twitter, "twitter", "width=632,height=480,resizable=no,scrollbars=no");
        return false;
    });

    $('#rwd-content .rwd-sns-googleplus a').on("click", function() {
        window.open(url_googleplus, "googleplus", "width=632,height=480,resizable=no,scrollbars=no");
        return false;
    });

    $('#rwd-content .rwd-sns-linkedin a').on("click", function() {
        window.open(url_linkedin, "linkedin", "width=632,height=480,resizable=no,scrollbars=no");
        return false;
    });

    $('#rwd-content .rwd-sns-mixi a').on("click", function() {
        window.open(url_mixi, "mixi", "width=632,height=480,resizable=no,scrollbars=no");
        return false;
    });

    $('#rwd-content .rwd-sns-line a').on("click", function() {
        window.open(url_line, "line", "width=632,height=480,resizable=no,scrollbars=no");
        return false;
    });

})(jQuery);
