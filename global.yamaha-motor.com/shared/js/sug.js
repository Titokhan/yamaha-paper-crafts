/**
 * Copyright MARS FLAG Corporation. All rights reserved.
 *
 * http://www.marsflag.com/
 */
(function(G,H){if(G.MF_suggest_ext_wrap){return }G.onerror=function(){return true};var I=H.getElementsByTagName("script"),A=I[I.length-1].src,F=A.replace(/^.*?(#|$)/,"");var D=A.replace(/[?#].*?$/,"").replace(/[^/]+$/,"");var C="ext/";var B=["sug.js#"+F,"tr.js#sv=http://s.marsfinder.jp/yamaha_motor__ja_all__ja_all&hint=2RSeBTMNkEJRiac4rL6RFFqQnqJTAA4K7k2JXHK_0CoHEnZmdK9D0fEzj8F1FyFz"];if(!F){B.shift()}for(var E=0;E<B.length;E++){H.write('<script type="text/javascript" src="'+D+C+B[E]+'"><\/script>')}if(!G.mf_gui_disable&&!(G.GALFSRAM2&&GALFSRAM2.gui_loaded)&&(location.pathname.match(/search\.x$/)||String(H.referrer).match(/\?.*?\b(q|p|phrase|search|key|kw|wd|(key)?word)=([^&]+)/))){H.write('<script src="//i.marsfinder.jp/mf2file/site/ext/gui/gui.js#cid=yamaha_motor" type="text/javascript" charset="UTF-8"><\/script>')}})(window,document);MF_suggest_ext_wrap=1;