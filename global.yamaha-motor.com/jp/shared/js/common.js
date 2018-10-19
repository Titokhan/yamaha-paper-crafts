//onLoad event add
if (window.addEventListener) { //for W3C DOM
	window.addEventListener("load", YMonloadFunction, false);
} else if (window.attachEvent) { //for IE
	window.attachEvent("onload", YMonloadFunction);
} else  {
	window.onload = onloadFunction2;
}

//Initialize setting
function YMonloadFunction() {
	if (document.getElementById('MF_form_phrase')) {
		YMsearchText = document.getElementById('MF_form_phrase');
		YMsearchTextValue= YMsearchText.value;
		YMsearchTextCol = YMsearchText.style.color;
		YMsearchText.onfocus = YMsitesearchClear;
		YMsearchText.onblur = YMsitesearchSet; 
	}
	if(document.getElementById("YMLocalNavigationArea") && document.getElementById("ContentsArea")){
		var lnaviH = document.getElementById("YMLocalNavigationArea").offsetHeight;
		var contH = document.getElementById("ContentsArea").offsetHeight;
		if(contH<lnaviH) {
			document.getElementById("ContentsArea").style.height = lnaviH+"px";
		}
	}
}

//Search Display
function YMsitesearchClear() {
	if(YMsearchText.value==YMsearchTextValue) {
		YMsearchText.value ="";
	}
	YMsearchText.style.color = '#000000';
	return;
}
function YMsitesearchSet() {
	if(YMsearchText.value=="") {
		YMsearchText.value =YMsearchTextValue;
		YMsearchText.style.color = YMsearchTextCol;
	}
	return;
}

//common Function : WIindow Open
var detect = navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;
function checkIt(string){
	place = detect.indexOf(string) + 1;
	thestring = string;
	return place;
}
if (checkIt('safari')) { 
	function YMopenWindow (theURL,winName,features) {
		window.open(theURL, winName, features);
		return false;
	}
} else {
	function YMopenWindow (theURL,winName,features) {
//		features.replace(/height/i, $1);
		window.open(theURL, winName, features);
		return false;
	}
}




function YMoutJump(tagobj) {
	YMOJurl = tagobj.href;
	YMOJnw = window.open("");
	YMOJnw.document.open();
	YMOJnw.document.write('\
<!DOCTYPE html>\
<html lang="ja" dir="ltr">\
<head>\
<meta charset="UTF-8" />\
<title>外部ウェブサイトへ移動します | ヤマハ発動機製品サイト</title>\
<meta name="robots" content="noindex,nofollow">\
<link rel="stylesheet" href="/jp/shared/css/style.css" media="all">\
</head>\
<body id="top">\
<div class="container">\
<div id="YMHeaderArea" class="clearfix">\
<p><a href="/"><img src="/jp/shared/img/identity.png" alt="ヤマハ発動機株式会社" /></a></p>\
<div class="close">\
<a href="javascript: window.close();"><span>とじる</span></a>\
</div>\
</div>\
<div id="YMContentsWrap" class="type-top">\
<div id="ContentsArea">\
<!-- Contents Area -->\
<p class="title"><strong>ここから先は、外部ウェブサイトへ移動します。</strong></p>\
<p class="explain">表示される内容はヤマハ発動機が管理するものではございません。<br />\
外部ウェブサイトにおけるトラブルに関して、当社は一切責任を負えませんのであらかじめご了承ください。</p>\
<p class="url">URL: '+YMOJurl+'</p>\
<p class="button"><a href="'+YMOJurl+'"><img src="/jp/shared/img/btn_001.png" alt="外部サイトへ移動します" width="146" height="21" /></a></p>\
<!-- /Contents Area -->\
</div>\
<!-- /YMContentsWrap --></div>\
<div id="YMFooterArea">\
<p class="copyright"><small>&copy; Yamaha Motor Co., Ltd.</small></p>\
<!-- /.information --></div>\
<!-- /#YMFooterArea --></div>\
<!-- /.container --></div>\
<script src="http://www.yamaha-motor.co.jp/shared/js/ga_code.js" charset="utf-8"></script>\
</body>\
</html>\
');
	YMOJnw.document.close();
	return false;
}
