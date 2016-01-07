/**
 * 覆盖层组件
 * @module Overlay
 * @author liweitao
 */

PP.define('overlay', function () {
  'use strict';

  /**
   * @class Overlay
   * @classdesc 遮罩层类
   * @alias module:Overlay
   */
  var Overlay = _.Class.extend({

    /**
     * @description 静态成员
     */
    statics: {
      /**
       * @static
       * @description 渐入进入之前的状态
       */
      BEFORE_FADE_IN: 0,
      /**
       * @static
       * @description 正在展现时的状态
       */
      ONSHOW: 1,
      /**
       * @static
       * @description 渐隐消失之后的状态
       */
      AFTER_FADE_OUT: 2
    },

    /**
     * overlay.
     * @constructor
     * @param {Object} options
     * @param {String|HTMLElement|Zepto} [options.content] - 遮罩层要包含的内容
     * @param {Boolen} [options.mask] - 是否展现遮罩
     * @param {Boolean} [options.modal] - 是否是模态的
     */
    construct: function (options) {
      this.conf = $.extend({
        content: '',
        mask: true,
        modal: true
      }, options);

      this.$overlayContainer = $('<div class="overlay_container before_fade_in"></div>');
      this.$overlayContentContainer = $('<div class="overlay_content_container"></div>');
      this.$overlayContent = $('<div class="overlay_content"></div>');

      var conf = this.conf;
      this.$overlayContainer.on('webkitTransitionEnd.overlay', $.proxy(function() {
        if (this.status === Overlay.AFTER_FADE_OUT) {
          this.status = Overlay.BEFORE_FADE_IN;
          this.$overlayContainer.hide().removeClass('after_fade_out').addClass('before_fade_in');
        }
      }, this));
      if (!conf.mask) {
        this.$overlayContainer.addClass('unmask');
      } else {
        this.$overlayContainer.on('touchmove', function (e) {
          e.preventDefault();
        });
      }

      if (!conf.modal) {
        this.$overlayContainer.on('touchend', $.proxy(function (e) {
          var $target = $(e.target);
          if (!$target.is('.overlay_content')) {
            this.destroy();
          }
        }, this));
      }

      this.content(conf.content);
      this.$overlayContainer.append(this.$overlayContentContainer.append(this.$overlayContent)).appendTo($('body'));
      this.status = Overlay.BEFORE_FADE_IN;
      this.show();
    },

    /**
     * @description 展示遮罩层
     * @return {Object} this - 实例本身，方便链式调用
     */
    show: function () {
      this.status = Overlay.ONSHOW;
      this.$overlayContainer.show().removeClass('before_fade_in');
      return this;
    },

    /**
     * @description 隐藏遮罩层
     * @return {Object} this - 实例本身，方便链式调用
     */
    hide: function () {
      if (this.status === Overlay.ONSHOW) {
        this.status = Overlay.AFTER_FADE_OUT;
        this.$overlayContainer.addClass('after_fade_out');
      } else {
        this.status = Overlay.BEFORE_FADE_IN;
      }
      return this;
    },

    /**
     * @description 给遮罩层内容绑定事件
     * @return {Object} this - 实例本身，方便链式调用
     */
    on: function () {
      $.fn.on.apply(this.$overlayContent, arguments);
      return this;
    },

    /**
     * @description 清除遮罩层内容事件绑定
     * @return {Object} this - 实例本身，方便链式调用
     */
    off: function () {
      $.fn.off.apply(this.$overlayContent, arguments);
      return this;
    },

    /**
     * @description 销毁遮罩层
     */
    destroy: function () {
      this.off();
      if (this.status !== Overlay.ONSHOW) {
        this.$overlayContainer.remove();
      } else {
        this.hide();
        this.$overlayContainer.off('webkitTransitionEnd.overlay')
          .on('webkitTransitionEnd', $.proxy(function () {
            this.$overlayContainer.off('webkitTransitionEnd').remove();
        }, this));
      }
    },

    /**
     * @description 获取/填充内容
     * @param {String|HTMLElement|Zepto} [content] - 当conten为空时是获取，否则是填充内容
     */
    content: function (content) {
      if (content === undefined) {
        return this.$overlayContent.children();
      } else {
        this.$overlayContent.html(content);
        return this;
      }
    }
  });

  return Overlay;
});
