"use strict";PP.define("home/page/index",function(t,n,i){var e=t("tab"),o=_.Class.extend({construct:function(t){this.conf=$.extend({$el:null},t),this.init()},init:function(){this.initTab()},initTab:function(){this.tab=new e({container:$(".tab"),head:$(".tab_head"),content:$(".tab_content"),startAt:0,hash:!0,onBeforeSwitch:function(){},onAfterSwitch:function(){},onFirstShow:function(){}})}});i.exports=o});