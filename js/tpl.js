"use strict";!function(n){n.runQueue=function(t){n.each(t,(function(u){var e=t[u];n.isFunction(e)&&e.call(t)}))}}(jQuery),function(n,t){var u={queue:{},init:function(){n((function(){n.runQueue(u.queue)}))}};u.queue={rating:function(){n("form .tpl-stars").each((function(){var t=n(this),u=null,e=t.children("span"),i=t.children("input");function c(t){t=n(t),e.removeClass("tpl-active"),t.addClass("tpl-active").prevAll().addClass("tpl-active")}t.on({click:function(t){u=t.target,i.val(n(u).index()+1)},mousemove:function(n){c(n.target)},mouseleave:function(n){c(u)}})}))}},u.init(),t.tpl=u}(jQuery,window);