'use strict';

/**
 * @author luckyadam
 * @date 2016-1-11
 * @desc 首页
 */

PP.define('home/page/index', function (require, exports, module) {
  var Tab = require('tab');
  var Index = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);
      this.init();
    },

    init: function () {
      this.initTab();
    },

    initTab: function () {
      this.tab = new Tab({
        container: $('.tab'),
        head: $('.tab_head'),
        content: $('.tab_content'),
        startAt: 0,
        hash: true,
        onBeforeSwitch: function () {},
        onAfterSwitch: function () {},
        onFirstShow: function () {}
      });
    }
  });

  module.exports = Index;
});
