/*
	修正履歴
*/
//2017.02.22 IE9,10 対応 Author Yoshida
//2017.03.16 IE9,10 対応再修正 Author Yoshida
//2017.04.21 一元化修正 Author Yoshida
//2017.05.23 demo52,53と一元化修正 Author Yoshida
//2017.08.09 スマホでメニュー三階層目でアンカー付リンクしない対応(#2097) Author Yoshida
//2017.11.02 タッチスクリーンPCで、hoverが効かなくなる問題を対応(#2672) Author Yoshida
//2017.11.14 もっとみるボタンの挙動の修正(#2769) Author Yoshida
//2018.07.03 モーダル＋youtube＋IE11 の組み合わせで、youtubeのフルスクリーンが機能しない対応(#4564) Author Yoshida
//2018.07.04 スマホメニューでアンカーリンクをクリックした際にメニューが閉じない不具合対応(#4562) Author Yoshida
//2018.07.17 スマホメニューでアンカーリンクをクリックした際にメニューが閉じない不具合対応-SSL(#4562#12) Author Yoshida

var hasTouchEvent;

var ua = navigator.userAgent;	//2017.11.02 
var isPC = false;	//2017.11.02 

var locationAddr = location.href; //2018.07.04 (#4562)
locationAddr = locationAddr.replace(/#.+$/,"");

if(locationAddr.search(/^https:/) !== -1){	//2018.07.17 (#4562#12)
	locationAddr = locationAddr.replace(/^https:\/\//,"");
} else {
	locationAddr = locationAddr.replace(/^http:\/\//,"");
}

var domain = locationAddr.replace(/\/(.+$)/,"");
locationAddr = locationAddr.replace(domain ,"");

// breakpoint cssのmediaクエリと同じ値にすること
var breakpoint_sp = 767;
var breakpoint_media_sp = '(max-width:' + breakpoint_sp + 'px)';

//appVersion 2017.02.22 IE9,10 対応 Yoshida
var appVersion = navigator.appVersion.toLowerCase();

// Layoutチェックは下記の変数使うこと
// 今のところPC,SPの2パターンだが今後判定かわる可能性あるのでそれぞれ定義
var isLayoutPC;
var isLayoutSP;
var isLayoutChange = false;

var viewWidth;
var contentHeight;

// カルーセルインスタンス、リサイズの際に破棄するため
var swiper_carousel_instance = [];

// 以降使いまわすエレメントはキャッシュしておく
var $window;
var $html_body;
var $root;
var $modal_bg;
var $rwd_content;
var $rwd_globalnav;
var $scroll_button;
var $search_triger; // 検索のToggle用
var $search_box; // 検索のフォーム

var $product_menu_trigger;
var $product_menu;
var $accordion_toggle;
var $shrink_open;
var $shrink_close;

var $global_nav;
var $global_nav_item;
var $global_nav_item_pageLink;  //#4562
var $global_nav_item_has_child;

var $megamenus;

var $menu_trigger;
var $submenu_link;
var $main_header;

var $relation_link; // 関連リンクの開閉用

var $slider_wide;
var $slider_thunbnail_wrap;
var $swiper_carousel01;

var $shlink_more_button;
var $shrink_wrapper;
var $shrink_content;

var $load_more_button;
var load_more_tpl;
var is_loading;

var $anchor;
var $global_nav_item_anchor;
var $swiper_carousel_filelist;

// for slide group
var $slideGroup;

// Layoutチェック
//2017.02.22 IE9,10 対応 Yoshida
//2017.03.16 IE9,10 対応再修正 Yoshida
function checkLayout() {
	if ((appVersion.search(/msie 9\./) !== -1) || (appVersion.search(/msie 10\./) !== -1)) {
		isLayoutChange = false;
		isLayoutSP = false;
		isLayoutPC = true;
	} else {
		if (window.matchMedia(breakpoint_media_sp).matches) {
			// SP Layout
			isLayoutChange = isLayoutPC;
			isLayoutSP = true;
			isLayoutPC = false;
		} else {
			isLayoutChange = isLayoutSP;
			isLayoutSP = false;
			isLayoutPC = true;
		}

	}
	//console.log('Layout PC:'+ isLayoutPC);
	//console.log('Layout SP:'+ isLayoutSP);
}

// JQuery
(function ($) {
	$window = $(window);
	viewWidth = window.innerWidth;
	$html_body = $('html,body');

	hasTouchEvent = ('ontouchstart' in window);
	is_loading = false;

	$modal_bg = $('#rwd-control-modal-bg');
	$rwd_content = $('#rwd-content');

	contentHeight = $rwd_content.height();

	$rwd_globalnav = $('#rwd-control-global-nav ul.rwd-global-nav');
	$scroll_button = $('#rwd-control-scroll-button');

	$product_menu_trigger = $('#rwd-control-product-header-menu-trigger');
	$product_menu = $('#rwd-control-product-header-menu');

	$accordion_toggle = $('.rwd-accordion:not(.fix-open) >.rwd-toggle-accordion');

	$shrink_open = $('#rwd-main-content .rwd-text-shrink-more');
	$shrink_close = $('#rwd-main-content .rwd-text-shrink-close');

	$search_triger = $('#rwd-control-serch-trigger, #rwd-control-serch-closer');
	$search_box = $('#rwd-control-serch-box');

	$global_nav = $('#rwd-control-global-nav');
	// $global_nav_item = $('#rwd-control-global-nav li.rwd-global-nav-item, ul.rwd-global-subnav:not(.rwd-megadrop-menu) li');
	$global_nav_item = $('#rwd-control-global-nav li.rwd-global-nav-item');
	$global_nav_item_has_child = $('#rwd-control-global-nav li.rwd-global-nav-has-child');

	$megamenus = $('#rwd-control-global-nav ul.rwd-global-subnav.rwd-megadrop-menu ul.rwd-global-subnav-two');

	$menu_trigger = $('#rwd-menu-trigger');
	$submenu_link = $('#rwd-control-global-nav .rwd-submenu-link');
	$main_header = $('#rwd-control-main-header');

	$slider_wide = $('#rwd-content .rwd-slider-wide .swiper-container');
	$slider_thunbnail_wrap = $('#rwd-content .rwd-slider-wide.pagination-tumbnail');
	
	$swiper_carousel01 = $('#rwd-content .rwd-slider-carousel01 .swiper-container');
	$swiper_carousel_filelist = $('#rwd-content .rwd-filelist-gallery01');

	$slideGroup = $("#rwd-content .rwd-slide-group");

	$shlink_more_button = $('#rwd-content .rwd-shrink-more-button');

	$load_more_button = $('#rwd-content .rwd-load-more-button');
	load_more_tpl = [];

	//2017.11.02
	if((ua.match(/Windows/i) !== -1)||(ua.match(/Mac/i) !== -1)){	//for PC
		isPC = true;
	}
    
	//2018.07.04 #4562
    $global_nav_item_pageLink = $("#rwd-control-global-nav a[href^='"  + locationAddr + "#'], #rwd-control-global-nav a[href^='#']");
    if(locationAddr.indexOf('.html')===-1){
        $global_nav_item_pageLink = $("#rwd-control-global-nav a[href^='"  + locationAddr + ".index.html#'], #rwd-control-global-nav a[href^='"  + locationAddr + "#'], #rwd-control-global-nav a[href^='#']");        
    }    
    
	//2017.08.09 スマホでメニュー三階層目でアンカー付リンクしない対応(#2097) [href*='#'] -> [href^='#']
	$global_nav_item_anchor = $("#rwd-control-global-nav li.rwd-global-nav-item a:not(.rwd-submenu-link)[href^='#']");

	// タッチデバイスなら #rwd-content に .rwd-touch-enable をつけるタッチデバイスでhover効かせたくない部分用
	if (hasTouchEvent) {
		if(!isPC){	//2017.11.02 
	
			$rwd_content.addClass('rwd-touch-enable');
			// タップデバイスの場合は直接aタグのリンク飛ばないのでデータ属性に退避
			$submenu_link.each(function (index, el) {
				var $this = $(this);
				var href = $this.attr('href');
				if (href) {
					$this[0].dataset.href = href;
					$this.attr('href', 'javascript:void(0);');
				}
			});
		
		}
	}

	initSliderFileList(); // ファイルリストcarousel作成
	checkLayout(); // レイアウトチェック PC or SP
	caluselGenerate(); // カルーセル構築
	sliderlGenerate(); // スライダー構築

	//-------------------------------------------------------------------------------------------
	// 各種イベント内容定義
	//-------------------------------------------------------------------------------------------

	// 関連リンクの開閉
	var menuToggleRelation = function ($target, eventObject) {
		$target.siblings('.toggle-relation-link').toggleClass('active');
		$target.parent('.rwd-relation-link-area').toggleClass('show');
	};

	// 検索のToggle
	var menuToggleSearch = function ($target, eventObject) {
		$search_box.toggleClass('active');
		$modal_bg.toggleClass('active-search');
		$search_box.find('input').focus();

	};

	// 全てのメニュー関連クローズ
	var menuCloseAll = function ($target, eventObject) {
		// SPグローバルナビ
		if ($menu_trigger.length > 0) {
			$menu_trigger.removeClass('active');
			$main_header.removeClass('show-nav');
			$submenu_link.removeClass('open');
			$modal_bg.removeClass('active');
		}
		if ($submenu_link.length > 0) {
			// $global_nav_item_has_child.removeClass('active');
			$submenu_link.parent().removeClass('active');
			$modal_bg.removeClass('active');
		}

		// // サーチボックス関連リセット
		if ($search_box.length > 0) {
			$search_box.removeClass('active');
			$modal_bg.removeClass('active-search');
		}
		// // 製品メニュー関連リセット
		if ($product_menu_trigger.length > 0) {
			$product_menu_trigger.removeClass('active');
			$product_menu.removeClass('show');
			$modal_bg.removeClass('active-product');
		}
		eventObject.preventDefault(); // 要素のデフォルト動作無効(aタグリンク無効にするため)
	};

	// グロナビのanchor関連クローズ
	var menuCloseAnchor = function ($target, eventObject) {
	
		// SPグローバルナビ
		if ($menu_trigger.length > 0) {
			$menu_trigger.removeClass('active');
			$main_header.removeClass('show-nav');
			$submenu_link.removeClass('open');
			$modal_bg.removeClass('active');
		}
		if ($submenu_link.length > 0) {
			// $global_nav_item_has_child.removeClass('active');
			$submenu_link.parent().removeClass('active');
			$modal_bg.removeClass('active');
		}

		var sprit = $target.attr('href').split('#');

		if (sprit.length === 2) {
			$anchor = $('#' + sprit[1]);
			$html_body.animate({
				scrollTop: $anchor.offset().top
			}, 0);
		}
		eventObject.preventDefault(); // 要素のデフォルト動作無効(aタグリンク無効にするため)
	}

	var menuToggleProduct = function ($target, eventObject) {
		$product_menu_trigger.toggleClass('active');
		$product_menu.toggleClass('show');
		$modal_bg.toggleClass('active-product');
	};

	var accordionToggle = function ($target, eventObject) {
		if ($target.parent('.rwd-accordion').hasClass('second-level')) {
			if ($target.hasClass('sub-top')) {
				$target.next().toggleClass('active');
			} else if ($target.hasClass('sub-bottom')) {
				$target.prev().toggleClass('active');
			}
		}
		$target.toggleClass('active');
		$target.parent('.rwd-accordion').toggleClass('open');
	};

	/* --------------------------------------------------------------------------------------
	      for readmore button on product feature page
	  -------------------------------------------------------------------------------------- */
	var shrinkOpen = function ($target, eventObject) {
		$shrink_wrapper = $target.parents('.rwd-text-shrink-wrapper');
		$shrink_wrapper.addClass('show');
	};
	var shrinkClose = function ($target, eventObject) {
		$shrink_wrapper = $target.parents('.rwd-text-shrink-wrapper');
		$shrink_wrapper.removeClass('show');
	};

	// グローバルナビのアコーディオンメニューが画面外にはみ出る場合にコンテンツの高さを調整
	var heightAdjust = function () {
		var menu_height = $rwd_globalnav.innerHeight() + $main_header.innerHeight();
		if (menu_height > contentHeight) {
			$rwd_content.height(menu_height);
		} else {
			$rwd_content.height('auto');
		}
		// console.log('contentHeight:'+contentHeight +'  menu_height:'+ menu_height );
	};

	//  SPのメニューボタンをクリックした際のイベント内容
	var menuToggle = function ($target, eventObject) {
		if (isLayoutSP) {
			$menu_trigger.toggleClass('active');
			$main_header.toggleClass('show-nav');
			$modal_bg.toggleClass('active');
			if (!$menu_trigger.hasClass('active')) {
				$submenu_link.removeClass('open');
			}
			heightAdjust();
		}
	};

	//  SPのサブメニューをクリックした際のイベント内容
	var submenuToggle = function ($target, eventObject) {
		if (isLayoutSP) {
			$target.toggleClass('open');
			eventObject.preventDefault(); // 要素のデフォルト動作無効(aタグリンク無効にするため)

			heightAdjust();
		}
	};

	//  もっと見るボタンをクリックした際のイベント内容
	var shrink_area_toggle = function ($target, eventObject) {
		$shrink_content = $target.parent().siblings('.rwd-shrink-content');
		if ($target.hasClass('.content-open')) {
			$html_body.animate({
				scrollTop: $('#' + $target.parent().parent().data('scroll-anchor-id')).offset().top
			});
		}
		$shrink_content.slideToggle('slow', 'swing', function () {
			if ($target.hasClass('.content-open')) {
				$target.removeClass('direction-up').addClass('direction-down').removeClass('.content-open');
				$inner.text($inner.data('caption-open'));
			} else {
				$target.removeClass('direction-down').addClass('direction-up').addClass('.content-open');
				$inner = $target.find('.rwd-button-inner');
				if ($inner.data('caption-open').length === 0) {
					$inner.data('caption-open', $inner.text());
				}
				$inner.text($inner.data('caption-close'));
			}
		});
	};

	//  もっと見るボタン(ajax)をクリックした際のイベント内容
	var load_area_toggle = function ($target, eventObject) {
		if (!is_loading) {
			is_loading = true;
			var $content_area;
			var tpl = $target.data('tpl-file');
			var next = $target.data('next-file');
			var content_area = $target.data('content-id');
			if (!content_area) {
				return false;
			} else {
				$content_area = $('#' + content_area);
			}

			// 対応するテンプレートが読み込まれていない場合はテンプレート読み込む
			if (!load_more_tpl[tpl]) {
				$.ajax({
					type: "GET",
					url: tpl,
					cache: false,
					timeout: 10000
				}).then(function (data) {
					// テンプレートをセット
					load_more_tpl[tpl] = data;
					// json読み込み
					_load_next(next, load_more_tpl[tpl], $content_area, $target);
				}, function (xhr) {
					console.log("Template Load Error");
					is_loading = false;
				});
			} else {
				// json読み込み
				_load_next(next, load_more_tpl[tpl], $content_area, $target);
			}

		}
	};

	// 次のjson読み込み処理
	function _load_next(next, tpldata, $content_area, $target) {
		// console.log("loadnext");
		$.ajax({
			type: "GET",
			url: next,
			cache: false,
			dataType: 'json',
			timeout: 10000
		}).then(function (data) {
			var content = "";
			//  console.log("loaded");
			//  console.log(data);
			if (data['next-file']) {
				$target.data('next-file', data['next-file']);
			} else {
				$target.data('next-file', "");
				$target.hide();
			}
			$.each(data['items'], function (index, value) {
				var map = value;
				// 置換用データ作成 {{キー}}を置き換える
				$.each(value, function (index2, value2) {
					map['\{\{' + index2 + '\}\}'] = value2;
				});
				// テンプレートの変数を置換
				var reg = new RegExp('(' + Object.keys(map).join('|') + ')', 'g');
				var result = tpldata.replace(reg, function (match) {
					return map[match];
				});
				// コンテンツに置換後データ追加
				content += result;
			});
			$content_area.append(content);
			is_loading = false;
		}, function (xhr) {
			console.log("json Load Error");
			is_loading = false;
		});
	}

	// ここまでajaxローダー

	// グローバルナビでサブメニューがあるものはモーダル背景を表示する
	var globalNavMouseEnter = function ($target, eventObject) {
		// console.log("enter");
		if (isLayoutPC) {
			// サブメニューがあるもののみモーダルを表示
			if ($target.hasClass('rwd-global-nav-has-child')) {
				// メガドロップはmenu-aimを使用しているので別処理
				if ($target.parent(".rwd-megadrop-menu").length === 0) {
					if (!$target.hasClass('active')) {
						$target.addClass('active');
					}
					if (!$modal_bg.hasClass('active')) {
						$modal_bg.addClass('active');
					}
				}
			}
		}
	};
	var globalNavMouseLleave = function ($target, eventObject) {
		// console.log("leave");
		if (isLayoutPC) {
			if ($target.parent(".rwd-megadrop-menu").length === 0) {
				if ($target.hasClass('active')) {
					$target.removeClass('active');
				}
				if ($modal_bg.hasClass('active')) {
					$modal_bg.removeClass('active');
				}
			}
			// メガドロップの領域を離脱した時にdeactivateが実行されない(activeの寸前に実行される) そのため前回のカレントが残ってしまう問題への対策。
			if ($megamenus.length > 0) {
				$megamenus.removeClass('show').parent().removeClass('active').siblings().removeClass('active');
			}
		}
	};

	// タブレットではhoverがないのでタップした際にサブメニューを表示
	var globalNavTouch = function ($target, eventObject) {

		$navItem = $target.parent();
		// $(this).data("category");
		if (isLayoutPC) {
			if ($navItem.hasClass('active')) {

				if ($navItem.hasClass('rwd-global-nav-item')) {
					// $navItem.data('href');
					var href = $target.data('href');
					if (href) {
						location.href = href;
					} else {
						$submenu_link.parent().removeClass('active');
						$modal_bg.removeClass('active');
						// 表示終了後メガドロップ要素の場合はtop位置をクリア
						if ($navItem.attr("data-submenu-id") !== 'undefined') {
							submenuId = $navItem.data('submenuId');
							$submenu = $('#' + submenuId);
							$navItem.css('top', "");
						}
					}
				}
			} else {
				// 表示する前にメガドロップ要素の場合はtop位置をグロナビの下に合わせる
				if ($navItem.attr("data-submenu-id") !== 'undefined') {
					submenuId = $navItem.data('submenuId');
					$submenu = $('#' + submenuId);
					megaDropAdjustHeight($submenu);
				}
				$navItem.addClass('active');

				if ($navItem.hasClass('rwd-global-nav-item')) {
					if (!$modal_bg.hasClass('active')) {
						$modal_bg.addClass('active');
					}
				}
				$navItem.siblings('.rwd-global-nav-has-child').removeClass('active');
				$navItem.find('.rwd-global-nav-has-child').removeClass('active');
			}
			eventObject.preventDefault(); // 要素のデフォルト動作無効(aタグリンク無効にするため)

		}
	};

	//-------------------------------------------------------------------------------------------
	// 各種イベントの割当共通化
	//-------------------------------------------------------------------------------------------

	// Touch or Clickのどちらをサポートしているかによってイベント登録振り分け、タップしたままスクロール対策はここで行う
	var bindToggleEvent = function ($target, eventFunc) {
	
		if (hasTouchEvent) {
			$target.on({
				'touchstart': function () {
					this.isTouch = true;
				},
				'touchmove': function () {
					this.isTouch = false;
				},
				'touchend': function (eventObject) {
					if (this.isTouch === true) {
						// eventObject.preventDefault(); // 要素のデフォルト動作無効(aタグリンク無効にするため)
						eventObject.stopPropagation(); // 要素のデフォルト動作無効(aタグリンク無効にするため)

						// console.log($(this));
						eventFunc($(this), eventObject);

						return false;
					}
				}
			});

			if(isPC){	//2017.11.02

				$target.on({
					'mouseover': function (eventObject) {
						console.log($(this));
						eventFunc($(this), eventObject);
					}
				});
			}

		} else {
			$target.on({
				'click': function (eventObject) {
					eventFunc($(this), eventObject);
				}
			});
		}

	};

	//-------------------------------------------------------------------------------------------
	// 各種イベント登録
	//-------------------------------------------------------------------------------------------

	bindToggleEvent($modal_bg, menuCloseAll); // メニューをすべて閉じてモーダル解除

	bindToggleEvent($search_triger, menuToggleSearch); // Searchボタンをクリック、タッチした際のイベント

	bindToggleEvent($product_menu_trigger, menuToggleProduct); //  商品メニューボタンをクリック、タッチした際のイベント

	bindToggleEvent($accordion_toggle, accordionToggle); //  アコーディオンをクリック、タッチした際のイベント

	bindToggleEvent($shrink_open, shrinkOpen); //  続きを読むボタンをクリック、タッチした際のイベント

	bindToggleEvent($shrink_close, shrinkClose); //  続きを読むに対応するCloseボタンをクリック、タッチした際のイベント

	bindToggleEvent($shlink_more_button, shrink_area_toggle); //  もっと見るボタンをクリック、タッチした際のイベント

	bindToggleEvent($load_more_button, load_area_toggle); //  もっと見るボタン(ajax)をクリック、タッチした際のイベント

	bindToggleEvent($menu_trigger, menuToggle); //  SPメニューをクリック、タッチした際のイベント

	bindToggleEvent($submenu_link, submenuToggle); //  SPサブメニューをクリック、タッチした際のイベント

	bindToggleEvent($('#control-relation-link').find('.rwd-relation-link-title'), menuToggleRelation);

	bindToggleEvent($global_nav_item_anchor, menuCloseAnchor); // anchor押したらモーダル解除
    
    bindToggleEvent($global_nav_item_pageLink, menuCloseAnchor); // anchor押したらモーダル解除 2018.07.04 #4562

	if (!hasTouchEvent) {
		$global_nav_item.on({
			'mouseenter': function (eventObject) {
				globalNavMouseEnter($(this), eventObject);
			},
			'mouseleave': function (eventObject) {
				globalNavMouseLleave($(this), eventObject);
			}
		});
	} else {
		bindToggleEvent($submenu_link, globalNavTouch); //  SPサブメニューをクリック、タッチした際のイベント

		if(isPC){	//2017.11.02
			$global_nav_item.on({
				'mouseenter': function (eventObject) {
					globalNavMouseEnter($(this), eventObject);
				},
				'mouseleave': function (eventObject) {
					globalNavMouseLleave($(this), eventObject);
				}
			});
		}

	}

	$window.on('scroll', function () {
		if ($window.scrollTop() > 10) {
			if (!$scroll_button.hasClass('show')) {
				$scroll_button.addClass('show');
			}
		} else {
			if ($scroll_button.hasClass('show')) {
				$scroll_button.removeClass('show');
			}
		}
	});

	// スライダー構築
	function sliderlGenerate() {
		$slider_wide.each(function (index, el) {
			$this = $(this);
			var slideItems = $this.find('.swiper-slide');
			// スライドが2枚以上あればスライダー生成 ない場合はキービジュアル固定
			if (slideItems.length > 1) {
				var paginationRender = null;
				// サムネイル付きであれば現在のスライドからサムネイルの描画関数を生成
				if ($this.parent().hasClass('pagination-tumbnail')) {

					$swiper_container = $this.parent();
					sliderCenteringNav($swiper_container);

					var slideThumbnails = [];
					slideItems.each(function (index, el) {
						slideThumbnails.push($(this).html());
					});
					paginationRender = function (index, className) {
						return '<span class="' + className + '">' + slideThumbnails[index] + '</span>';
					};
				}
				// スライド生成
				new Swiper($this, {
					pagination: $this.find('.swiper-pagination'),
					paginationBulletRender: paginationRender,
					slidesPerView: 1,
					loop: true,
					autoplay: 5000,
					speed: 600,
					nextButton: $this.parent().find('.swiper-button-next'),
					prevButton: $this.parent().find('.swiper-button-prev'),
					paginationClickable: true
				});
			}
		});
	}

	function sliderCenteringNav($swiper_container) {
		// console.log($swiper_container);
		// console.log($swiper_container.height());
		$button_next = $swiper_container.find('.swiper-button-next');
		$button_prev = $swiper_container.find('.swiper-button-prev');
		var mt = parseInt($button_next.css('margin-top'));
		var offset = $button_next.innerHeight() / 2;
		var position = $swiper_container.height() / 2 - offset + mt;
		// console.log(offset);
		// console.log(position);
		$button_prev.css('top', position + 'px');
		$button_next.css('top', position + 'px');
	}

	function initSliderFileList() {
		$.each($swiper_carousel_filelist, function () {
			sliderDir = $(this).data('dir');
			modalGroup = $(this).data('modal-group');
			sub_initSliderFileList($(this), sliderDir, modalGroup);
		});

	}

	function sub_initSliderFileList($target, sliderDir, modalGroup) {
		$slider_filelist_content = $target.find('.swiper-wrapper');
		$slider_filelist_content.html("");
		// sliderDir = $target.data('dir');
		// console.log(sliderDir);
		var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
		req.open("get", sliderDir + "/list.txt", true); // アクセスするファイルを指定
		req.send(null); // HTTPリクエストの発行

		req.onload = function () {

			if (req.status === 200) {
				$target_content = $target.find('.swiper-wrapper');
				$target_container = $target.find('.swiper-container');

				var textLines = req.responseText.split(/\r\n|\r|\n/);
				$.each(textLines, function () {
					// 空行は無視
					if (this.length !== 0) {
						// console.log(this);
						var image_path = location.pathname + sliderDir + '/' + this;
						$target_content.append('<div class="swiper-slide rwd-grid-item"><div><a href="' + image_path + '" class="pickup-item rwd-modal-link" rel="' + modalGroup + '"><figure><img src="' + image_path + '" alt=""></figure></a></div></div>');
					}
				});
				// スライド生成
				caluselInit($target_container);

			} else {
				console.log('slider Directroy [' + sliderDir + ']: list.txt not found');
			}
		};
	}


	// カルーセル構築
	function caluselGenerate() {
		// カルーセル毎に処理
		$swiper_carousel01.each(function () {
			caluselInit($(this));
		});
		// console.log(swiper_carousel_instance);
	}
	
	function caluselInit($target) {
		// console.log($target);

		var active_class = 'carousel-active';
		var $swiper_wrapper = $target.find('.swiper-wrapper');
		var $swiper_container = $swiper_wrapper.parent().parent();

		var item_count = $swiper_wrapper.find('.swiper-slide').length;

		var carousel_division;

		// クラス名に応じたカルーセル分割数を設定
		if (isLayoutSP) {
			carousel_division = 2;
			if ($swiper_wrapper.hasClass('sp-grid1of4')) {
				carousel_division = 4;
			} else if ($swiper_wrapper.hasClass('sp-grid4of4')) {
				carousel_division = 1;
			}
		} else {
			carousel_division = 6;
			if ($swiper_wrapper.hasClass('pc-grid1of12')) {
				carousel_division = 12;
			} else if ($swiper_wrapper.hasClass('pc-grid3of12')) {
				carousel_division = 4;
			} else if ($swiper_wrapper.hasClass('pc-grid4of12')) {
				carousel_division = 3;
			} else if ($swiper_wrapper.hasClass('pc-grid6of12')) {
				carousel_division = 2;
			} else if ($swiper_wrapper.hasClass('pc-grid12of12')) {
				carousel_division = 1;
			}
		}

		// カルーセルの分割数よりアイテム数が多い場合 スライド生成
		if (item_count > carousel_division) {

			var instance = new Swiper($target, {
				pagination: $target.find('.swiper-pagination'),
				slidesPerView: carousel_division,
				loop: false,
				nextButton: $target.parent().find('.swiper-button-next'),
				prevButton: $target.parent().find('.swiper-button-prev'),
				paginationClickable: true
			});
			var instance_item = [];
			instance_item['instance'] = instance;
			instance_item['is_gallery'] = false;
			instance_item['target'] = $target;

			if ($target.parent().hasClass('rwd-filelist-gallery01')) {
				instance_item['is_gallery'] = true;
			}

			swiper_carousel_instance.push(instance_item);
			if (!$swiper_container.hasClass(active_class)) {
				$swiper_container.addClass(active_class);
			}
		} else {
			if ($swiper_container.hasClass(active_class)) {
				$swiper_container.removeClass(active_class);
			}
		}
		if ($target.parent().hasClass('rwd-filelist-gallery01')) {
			var $modal_links = $target.find('a.rwd-modal-link');
			if ($modal_links.length !== 0) {
				$modal_links.colorbox({
					opacity: 0.8,
					loop: false,
					reposition: false,
					maxWidth: '90.62500%',
					maxHeight: '90%'
				});

			}
		}

	}

	// カルーセル破棄
	function caluselDestroy() {
		swiper_carousel_instance.forEach(function (val) {
			val['instance'].destroy(false, true);
			// console.log('destroy');
		});
		swiper_carousel_instance = []; // 参照を切る
	}

	// isLayoutChange

	// スムーススクロールライブラリ使用
	smoothScroll.init({
		selector: '[data-scroll]', // スムーススクロールが有効なリンクに付ける属性
		selectorHeader: '[data-scroll-header]', // 固定ナビに付ける属性
		speed: 500, // 到達するまでの総時間(ミリ秒)
		easing: 'easeInOutCubic', // スピードの種類
		offset: 0, // 到達場所からずらすピクセル数
		updateURL: false, // URLを[#〜]に変更するか？
		callback: function () {}, // コールバック関数 (到達時に実行される関数)
	});

	// IR FontResize
	$root = $(':root');
	$('#rwd-control-font-small').on('click', function () {
		$root.css('fontSize', '9.33333px');
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
	});

	$('#rwd-control-font-medium').on('click', function () {
		$root.removeAttr('style');
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
	});

	$('#rwd-control-font-large').on('click', function () {
		$root.css('fontSize', '13.333px');
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
	});

	var m_count = 0;
	// メガドロップ要素のtop位置をグロナビの下に合わせる
	// min-heightにメニュー全体の高さを持たせる
	function megaDropAdjustHeight($submenu) {
		// console.log('megaDropAdjustHeight()');

		var parents = $submenu.parent().prevAll(":not(.rwd-nav-item-toplink)");
		var height = 0;
		parents.each(function (index, el) {
			height += $(el).innerHeight();
		});
		var parents_all = $submenu.parent().siblings(":not(.rwd-nav-item-toplink)");
		var height_all = 0;
		parents_all.each(function (index, el) {
			height_all += $(el).innerHeight();
		});
		height_all += $submenu.parent().innerHeight();
		$submenu.css({
			"top": -height,
			"min-height": height_all
		});
	}

	// Mega Drop Menu 領域を離脱した時にdeactivateが実行されないので前回のカレントが残ってしまうのでグロナビにmouseenterイベントを追加して後処理。
	function activateSubmenu(row) {
		if (isLayoutPC) {
			var $row = $(row);
			submenuId = $row.data('submenuId');
			$row.addClass('active');
			if (submenuId) {
				$submenu = $('#' + submenuId);
				megaDropAdjustHeight($submenu);
				$submenu.addClass('show');
			}
		}
	}

	var $megamenu_default = $('#rwd-control-global-nav .rwd-global-nav-item:not(.nav-direction-left) .rwd-megadrop-menu');
	var $megamenu_left = $('#rwd-control-global-nav .rwd-global-nav-item.nav-direction-left .rwd-megadrop-menu');

	function deactivateSubmenu(row) {
		if (isLayoutPC) {
			var $row = $(row);
			$row.removeClass('active');
			$submenu = $('#' + $row.data('submenuId'));
			$submenu.removeClass('show').css("top", "").parent().removeClass('active');
		}
	}

	viewWidth = window.innerWidth;
	if (!hasTouchEvent || isPC) {	//2017.11.02

		if ($megamenu_default.length > 0) {
			// console.log("right");
			$megamenu_default.menuAim({
				activate: activateSubmenu,
				deactivate: deactivateSubmenu
			});
			if ($megamenu_left.length > 0) {
				// console.log("left");
				$megamenu_left.menuAim({
					activate: activateSubmenu,
					deactivate: deactivateSubmenu,
					submenuDirection: "left"
				});
			}
		}

	}

	// for modal
	$('a.rwd-modal-link').colorbox({
		opacity: 0.8,
		maxWidth: '90.62500%',
		maxHeight: '90%'
	});

	$('a.rwd-modal-link-inline').colorbox({
		opacity: 0.8,
		inline: true,
		maxWidth: '90.62500%',
		maxHeight: '90%'
	});

	$('a.rwd-modal-link-youtube').colorbox({
		iframe: true,
		opacity: 0.8,
		maxWidth: '90.62500%',
		maxHeight: '90%',
		innerWidth: 640,
		innerHeight: 390,
		onComplete:function(){	//#4564
    		$('.cboxIframe').attr({
        		webkitAllowFullScreen : true,
        		mozallowfullscreen : true,
        		allowFullScreen : true
    		});			

			if(document.msFullscreenEnabled) {
				document.addEventListener("MSFullscreenChange", function(event) {
					if(document.msFullscreenElement === undefined || document.msFullscreenElement === null) {
						setTimeout(function(){
							$.colorbox.position(0);
							setTimeout(function(){
								$.colorbox.position(0);
								setTimeout(function(){
									$.colorbox.position(0);
									setTimeout(function(){
										$.colorbox.position(0);
										setTimeout(function(){
											$.colorbox.position(0);
										},1000);
									},1000);
								},1000);
							},1000);
						},2000);
					}
				});
			}
		}
	});

	// for Tabs
	// news一覧用
	$(".rwd-tab-group__tab li span").click(function () {
		var $target = $(this).parent(); // タブの要素
		// タブが切り替わったか判定
		if (!$target.hasClass('current')) {
			var $group__tab = $target.parent(); // タブ
			var $tab_wrap = $group__tab.parent().find('.rwd-tab-group__month');
			var $tab_content = $tab_wrap.find(' > ul');
			// 古いカレント削除
			$target.siblings().each(function () {
				$(this).removeClass("current");
			});
			$target.addClass("current");
			// タブのインデックスを取得
			var index = $group__tab.children().index($(this).parent());
			$tab_content.hide();
			$tab_content.eq(index).show();
		}
	});
	// 検索メニュー用
	$(".rwd-tab-group__search dd span").click(function () {
		var $target = $(this).parent(); // タブの要素
		// タブが切り替わったか判定
		if (!$target.hasClass('current')) {
			var $group__tab = $target.parent(); // タブ
			var $tab_wrap = $group__tab.parent().find('.rwd-tab-group__collection');
			var $tab_content = $tab_wrap.find(' > ul');
			// 古いカレント削除
			$target.siblings().each(function () {
				$(this).removeClass("current");
			});
			$target.addClass("current");
			// タブのインデックスを取得 dtの分オフセットを設定
			var index = $group__tab.children().index($(this).parent()) - 1;
			$tab_content.hide();
			$tab_content.eq(index).show();
		}
	});

	slideResize($slideGroup);

	// 対象要素がクリックされた場合は対象要素のみ高さ調整、リサイズ時にはすべての要素を変更したいのでセレクタオブジェクトを呼び出し側で渡すよう変更
	function slideResize($target) {
		var biggestHeight = "0";
		$target.find(".current + .slide-group-content").each(function () {
			if ($(this).height() > biggestHeight) {
				biggestHeight = $(this).height();
			}
		});

		$target.css('padding-bottom', biggestHeight);
	}

	$(".rwd-slide-group > p").click(function () {
		$(this).toggleClass("sp-open");
		$(this).parent().find(' > p').each(function () {
			$(this).removeClass("current");
		});
		$(this).addClass("current");
		slideResize($(this).parent());
	});

	$(".slide-group-content .sp-close").click(function () {
		$(this).parent().parent().prev().toggleClass("sp-open");
	});

	//グローバルメニュー用別ウィンアイコン画像切り替え
	$(".rwd-global-subnav-item a").hover(function () {
		if (isLayoutPC) {
			var $icon_newwin = $(this).find('.rwd-icon-newwin');
			if ($icon_newwin.length !== 0) {
				var src = $icon_newwin.attr('src');
				// console.log(src);
				if (src.indexOf('_newwin_white') !== -1) {
					$icon_newwin.attr('src', src.replace('_newwin_white', '_newwin'));
				} else {
					$icon_newwin.attr('src', src.replace('_newwin', '_newwin_white'));
				}
			}
		}
	});

	/* --------------------------------------------------------------------------------------
	  	class = rwd-table-type01
	  -------------------------------------------------------------------------------------- */
	function tableData() {
		var index = '';
		var headTxt = '';
		$('.rwd-table-type01').each(function () {
			$(this).find('thead tr th').each(function () {

				// theadの位置やテキストを取得
				index = $(this).index() - 1;
				headTxt = $(this).text();

				// tbodyのセルにdata属性を追加
				$(this).parents('table').find('tr').each(function () {
					$(this).find('td').eq(index).attr('data-th', headTxt);
				});
			});
		});
		$('.rwd-table-type01 td').wrapInner("<span></span>");
	}
	tableData();

	/* --------------------------------------------------------------------------------------
	  	class = rwd-table-type02
	  -------------------------------------------------------------------------------------- */
	var switched = false;
	var updateTables = function () {
		// console.log('updateTables');
		if (isLayoutSP && !switched) {
			switched = true;
			$("table.rwd-table-type02").each(function (i, element) {
				splitTable($(element));
			});
			return true;
		} else if (switched && isLayoutPC) {
			switched = false;
			$("table.rwd-table-type02").each(function (i, element) {
				unsplitTable($(element));
			});
		}
	};

	$(window).load(updateTables);

	function splitTable(original) {
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("rwd-table-type02");
		original.closest(".rwd-table-type02-wrapper").append(copy);
		copy.wrap("<div class='rwd-table-pinned' />");
	}

	function unsplitTable(original) {
		original.closest(".rwd-table-type02-wrapper").find(".rwd-table-pinned").remove();
		original.unwrap();
	}

	/* --------------------------------------------------------------------------------------
	  	for swipe btn
	  -------------------------------------------------------------------------------------- */
	var smpScrollWrap02 = $('.rwd-table-type02-scrollable');
	var smpScrollWrap03 = $('.rwd-table-type03-wrapper');

	//for .rwd-table-type02
	if (smpScrollWrap02.length !== 0) {
		smpScrollWrap02.append('<p class="rwd-table-btn"><img src="/shared/img/rwd_icon_swipe01.svg" width="34" height="38" alt="スワイプ"></p>');
		smpScrollTab02();

	}

	function smpScrollTab02() {
		if (isLayoutSP) {
			smpScrollWrap02.find('.rwd-table-btn').show();

			smpScrollWrap02.on('scroll', function () {
				var obj = $(this).find('.rwd-table-btn');
				var scrollLeft = $(this).scrollLeft();
				if (scrollLeft > 0) {
					obj.fadeOut('fast');
				} else {
					obj.fadeIn('fast');
				}
			});

		} else {
			smpScrollWrap02.off('scroll');
			smpScrollWrap02.find('.rwd-table-btn').hide();
		}
	}

	//for .rwd-table-type03
	if (smpScrollWrap03.length !== 0) {
		smpScrollWrap03.append('<p class="rwd-table-btn"><img src="/shared/img/rwd_icon_swipe01.svg" width="34" height="38" alt="スワイプ"></p>');
		smpScrollTab03();

	}

	function smpScrollTab03() {
		if (isLayoutSP) {
			smpScrollWrap03.find('.rwd-table-btn').show();

			smpScrollWrap03.on('scroll', function () {
				var obj = $(this).find('.rwd-table-btn');
				var scrollLeft = $(this).scrollLeft();
				if (scrollLeft > 0) {
					obj.fadeOut('fast');
				} else {
					obj.fadeIn('fast');
				}
			});

		} else {
			smpScrollWrap03.off('scroll');
			smpScrollWrap03.find('.rwd-table-btn').hide();
		}
	}

	// リサイズ処理
	var timer = false;
	var viewWidthCurrent = 0;
	$(window).on('resize orientationchange', function () {

		if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {


			// fb リサイズ
			boxWidth = $('#rwd-control-fb_box').width();
			currentWidth = $('#rwd-control-fb_box .fb-page').attr('data-width');
			if (boxWidth !== currentWidth) {
				$('#rwd-control-fb_box .fb-page').attr('data-width', boxWidth);
				if (typeof (FB) !== "undefined") {
					FB.XFBML.parse(document.getElementById('rwd-control-fb_box'));
				}
			}

			// IOS8以降ではスクロールの際にリサイズイベントが起こるので幅が変わった時のみ実行
			viewWidthCurrent = window.innerWidth;
			if (viewWidth !== viewWidthCurrent) {
				// 幅を更新
				// console.log("resize");
				viewWidth = viewWidthCurrent;

				// Layoutチェック
				checkLayout();
				// カルーセルリサイズ処理 レイアウト変更あればカルーセル破棄して再構築
				if (isLayoutChange) {
					// console.log('carousel destroy');
					caluselDestroy();
					caluselGenerate();
				}

				sliderCenteringNav($slider_thunbnail_wrap);

				// SPレイアウトから切り替わった際にSPのメニュー状態クリア PCの時にhoverが残ってしまう問題対策
				if ($menu_trigger.length > 0) {
					$menu_trigger.removeClass('active');
					$main_header.removeClass('show-nav');
					$submenu_link.removeClass('open');
					$modal_bg.removeClass('active');
				}
				//タブをリサイズ
				slideResize($slideGroup);

				//テーブルをリサイズ
				updateTables();
				smpScrollTab02();
				smpScrollTab03();
			}
		}, 200); // リサイズされて200ミリ秒たったらイベント実行、リサイズのたびに実行すると重くなるので
	});

})(jQuery);
