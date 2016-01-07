/**
 * 基础对话框组件
 * @module Dialog
 * @author liweitao
 */

PP.define('dialog', function (require) {
  'use strict';

  /** 遮罩层组件 */
  var Overlay = require('overlay');

  /**
   * @class DialogBtn
   * @classdesc 按钮类
   * @alias module:DialogBtn
   */
  var DialogBtn = _.Class.extend({
    /**
     * dialogBtn.
     * @constructor
     * @param {Object} options
     * @param {String} [options.text] - 按钮文案
     * @param {Function} [options.onClick] - 按钮点击后的动作
     * @param {Boolean} [options.isDefault] - 是否是默认按钮，默认按钮将有额外的样式展现
     * @param {Boolean} [options.isDisabled] - 是否禁用
     * @param {Boolean} [options.destroyOnClick] - 点击后是否销毁
     */
    construct: function (options) {
      this.conf = $.extend({
        text: '',
        onClick: function () {},
        isDefault: false,
        isDisabled: false,
        destroyOnClick: true
      }, options);
      var conf = this.conf;
      // 按钮的dom元素
      this.$content = $('<button class="dialog_btn"></button>').addClass({
        true: 'default'
      }[conf.isDefault]);
      this.setText(conf.text);
      if (conf.isDisabled) {
        this.disable();
      }
      if (typeof conf.onClick === 'function') {
        this.$content.on('click', $.proxy(function () {
          // 如果点击后需要销毁组件，则在此先解绑事件
          if (conf.destroyOnClick) {
            this.unbind();
          }
          conf.onClick();
        }, this));
      }
    },

    /**
     * @description 获取按钮dom，最后能不要直接通过访问属性来拿到dom
     * @return {Object} this - 实例本身，方便链式调用
     */
    getDom: function () {
      return this.$content;
    },

    /**
     * @description 禁用掉按钮
     * @return {Object} this - 实例本身，方便链式调用
     */
    disable: function () {
      this.$content.attr('disabled', 'disabled');
      return this;
    },

    /**
     * @description 启用按钮
     * @return {Object} this - 实例本身，方便链式调用
     */
    enable: function () {
      this.$content.removeAttr('disabled');
      return this;
    },

    /**
     * @description 设置按钮文案
     * @param {String} text - 按钮文案，只接受String类型
     * @return {Object} this - 实例本身，方便链式调用
     */
    setText: function (text) {
      if (typeof text === 'string') {
        if (text.length) {
          this.$content.text(text);
        } else {
          this.$content.text('');
        }
      }
      return this;
    },

    /**
     * @description 解绑事件
     * @return {Object} this - 实例本身，方便链式调用
     */
    unbind: function () {
      this.$content.off();
      return this;
    }
  });

  /**
   * @class Dialog
   * @classdesc 对话框类
   * @alias module:Dialog
   */
  var Dialog = _.Class.extend({
    /**
     * dialog.
     * @constructor
     * @param {Object} options
     * @param {String} [options.title] - 标题
     * @param {String} [options.message] - 简单信息
     * @param {String|HtmlElement|Zepto} [options.content] - 对话框主体内容
     * @param {Boolen} [options.mask] - 是否展现遮罩
     * @param {Boolean} [options.modal] - 是否是模态的
     */
    construct: function (options) {
      this.conf = $.extend({
        title: '',
        message: '',
        content: '',
        mask: true,
        modal: true
      }, options);
      var conf = this.conf;
      // 一些容器
      this.$dialogContainer = $('<div class="dialog"></div>');
      this.$dialogTitle = $('<div class="dialog_title"></div>');
      this.$dialogMessage = $('<div class="dialog_message"></div>');
      this.$dialogContent = $('<div class="dialog_content"></div>').append(conf.content);
      this.$dialogBtnContainer = $('<div class="dialog_btn_container"></div>');

      if (conf.title) {
        this.$dialogContainer.append(this.$dialogTitle);
        this.setTitle(conf.title);
      }
      if (conf.message) {
        this.$dialogContainer.append(this.$dialogMessage);
        this.setTitle(conf.message);
      }
      this.$dialogContainer.append(this.$dialogContent);
      var content = this.$dialogContainer;
      this.btns = [];
      // 将对话框组件的内容塞入遮罩层中
      this.overlay = new Overlay({
        content: content,
        mask: conf.mask,
        modal: conf.modal
      });
    },

    /**
     * @description 展示对话框
     * @return {Object} this - 实例本身，方便链式调用
     */
    show: function () {
      this.overlay.show();
      return this;
    },

    /**
     * @description 隐藏对话框
     * @return {Object} this - 实例本身，方便链式调用
     */
    hide: function () {
      this.overlay.hide();
      return this;
    },

    /**
     * @description 为对话框增加按钮
     * @param {Object} options
     * @param {String} [options.text] - 按钮文案
     * @param {Function} [options.onClick] - 按钮点击后的动作
     * @param {Boolean} [options.isDefault] - 是否是默认按钮，默认按钮将有额外的样式展现
     * @param {Boolean} [options.isDisabled] - 是否禁用
     * @param {Boolean} [options.destroyOnClick] - 点击后是否销毁
     * @return {Object} this - 实例本身，方便链式调用
     */
    addBtn: function (options) {
      var onClick = options.onClick;
      var _this = this;
      options = $.extend({
        destroyOnClick: true
      }, options);
      // 若需要点击按钮后销毁对话框，则在执行完传入的回调后销毁对话框
      if (options.destroyOnClick) {
        options.onClick = function() {
          if (typeof onClick === 'function') {
            onClick();
          }
          _this.destroy();
        };
      }
      var btn = new DialogBtn(options);
      if (!this.$dialogContainer.find('.dialog_btn_container').length) {
        this.$dialogContainer.append(this.$dialogBtnContainer);
      }
      this.$dialogBtnContainer.append(btn.getDom());
      this.btns.push(btn);
      return this;
    },

    /**
     * @description 销毁对话框
     * @return {Object} this - 实例本身，方便链式调用
     */
    destroy: function () {
      this.off();
      this.overlay.destroy();
      return this;
    },

    /**
     * @description 给对话框绑定事件
     * @return {Object} this - 实例本身，方便链式调用
     */
    on: function () {
      $.fn.on.apply(this.$dialogContainer, arguments);
      return this;
    },

    /**
     * @description 解绑对话框事件
     * @return {Object} this - 实例本身，方便链式调用
     */
    off: function () {
      $.fn.off.apply(this.$dialogContainer, arguments);
      return this;
    },

    /**
     * @description 设置标题
     * @param {String} title - 标题
     * @return {Object} this - 实例本身，方便链式调用
     */
    setTitle: function (title) {
      if (typeof title === 'string' && title.length) {
          this.$dialogTitle.show().html(title);
      } else {
        this.$dialogTitle.hide();
      }
      return this;
    },

    /**
     * @description 设置简单信息内容
     * @param {String} message - 简单信息
     * @return {Object} this - 实例本身，方便链式调用
     */
    setMessage: function (message) {
      if (typeof message === 'string' && message.length) {
          this.$dialogMessage.show().html(message);
      } else {
        this.$dialogMessage.hide();
      }
      return this;
    },

    /**
     * @description 设置主体内容，若不传，则为获取对话框内容
     * @param {String|HtmlElement|Zepto} [content] - 主体内容
     * @return {Object} this - 实例本身，方便链式调用
     */
    content: function (content) {
      if (content === undefined) {
        return this.$dialogContent.html();
      } else {
        this.$dialogContent.html(content);
        return this;
      }
    }
  });

  return Dialog;
});

/**
 * 警告框组件
 * @module Alert
 * @author liweitao
 */

PP.define('alert', function (require) {
  'use strict';

  var Dialog = require('dialog');

  /**
   * @class Alert
   * @classdesc 警告框类
   * @alias module:Alert
   */
  var Alert = _.Class.extend({
    /**
     * alert.
     * @constructor
     * @param {Object} options
     * @param {String} [options.title] - 标题
     * @param {String} [options.message] - 简单信息
     * @param {String} [options.okBtnText] - ok按钮的文案
     * @param {Function} [options.onOk] - 点击ok按钮要做的操作
     */
    construct: function (options) {
      if (typeof options === 'string') {
        options = {
          title: options
        };
      }
      this.conf = $.extend({
        title: '',
        message: '',
        okBtnText: '确定',
        onOk: function () {},
      }, options);
      var conf = this.conf;
      var dialog = new Dialog({
        title: conf.title,
        message: conf.message
      });
      // 增加一个ok按钮就好
      dialog.addBtn({
        text: conf.okBtnText,
        onClick: conf.onOk
      });
    }
  });

  return Alert;
});

/**
 * 确认框组件
 * @module Confirm
 * @author liweitao
 */

PP.define('confirm', function (require) {
  'use strict';

  var Dialog = require('dialog');

  /**
   * @class Confirm
   * @classdesc 确认框类
   * @alias module:Confirm
   */
  var Confirm = _.Class.extend({
    /**
     * Confirm.
     * @constructor
     * @param {Object} options
     * @param {String} [options.title] - 标题
     * @param {String} [options.message] - 简单信息
     * @param {String} [options.okBtnText] - ok按钮的文案
     * @param {String} [options.cancelBtnText] - cancel按钮的文案
     * @param {Function} [options.onOk] - 点击ok按钮要做的操作
     * @param {Function} [options.onCancel] - 点击cancel按钮要做的操作
     */
    construct: function (options) {
      if (typeof options === 'string') {
        options = {
          title: options
        };
      }
      this.conf = $.extend({
        title: '',
        message: '',
        okBtnText: '确定',
        cancelBtnText: '取消',
        onOk: function () {},
        onCancel: function () {}
      }, options);

      var conf = this.conf;
      var dialog = new Dialog({
        title: conf.title,
        message: conf.message
      });
      // 确认对话框需要增加两个按钮
      dialog.addBtn({
        text: conf.cancelBtnText,
        onClick: conf.onCancel
      }).addBtn({
        text: conf.okBtnText,
        isDefault: true,
        onClick: conf.onOk
      });
    }
  });
  return Confirm;
});
