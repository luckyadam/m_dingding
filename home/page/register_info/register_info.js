'use strict';

/**
 * @author luckyadam
 * @date 2016-1-7
 * @desc 补全信息
 */

PP.define('home/page/register_info', function (require) {
  var Dialog = require('dialog');
  var ConfirmDialog = require('confirm');
  var RegisterInfo = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);
      this.init();
    },

    init: function () {
      this.initEvent();
    },

    initEvent: function () {
      this.conf.$el.on('click', '.ri_sexual', $.proxy(this.selectSexual, this))
        .on('click', '.ri_education', $.proxy(this.selectEducation, this))
        .on('click', '.ri_language', $.proxy(this.selectLanguage, this))
        .on('click', '.ri_car', $.proxy(this.selectCar, this))
        .on('click', '.ri_guidesid', $.proxy(this.inputGuidesId, this));
    },

    // 选择性别
    selectSexual: function (ev) {
      var $el = this.conf.$el;
      var $riSexual = $(ev.target);
      var sexualLayerHtml = '<div class="sexual_select">';
      sexualLayerHtml += '<a href="javascript:;" class="sexual_select_item sexual_select_male">男</a>';
      sexualLayerHtml += '<a href="javascript:;" class="sexual_select_item sexual_select_female">女</a>';
      sexualLayerHtml += '</div>';
      this.sexualLayer = new Dialog({
        content: sexualLayerHtml
      });
      this.sexualLayer.on('click', '.sexual_select_male', $.proxy(function (e) {
        e.preventDefault();
        this.sexualLayer.destroy();
        $riSexual.text('男');
        alert('选择了男');
      }, this)).on('click', '.sexual_select_female', $.proxy(function (e) {
        e.preventDefault();
        this.sexualLayer.destroy();
        $riSexual.text('女');
        alert('选择了女');
      }, this));
    },

    // 选择学历
    selectEducation: function (ev) {
      var $el = this.conf.$el;
      var $riEducation = $(ev.target);
      var education = null;
      var educationDialogHtml = '<div class="education_select">';
      educationDialogHtml += '<ul class="education_list select_list">';
      educationDialogHtml += '<li class="education_list_item select_list_item">';
      educationDialogHtml += '<a href="javascript:;" class="education_list_choose select_list_choose">大专</a>';
      educationDialogHtml += '</li>';
      educationDialogHtml += '<li class="education_list_item select_list_item">';
      educationDialogHtml += '<a href="javascript:;" class="education_list_choose select_list_choose">本科</a>';
      educationDialogHtml += '</li>';
      educationDialogHtml += '<li class="education_list_item select_list_item">';
      educationDialogHtml += '<a href="javascript:;" class="education_list_choose select_list_choose">研究生</a>';
      educationDialogHtml += '</li>';
      educationDialogHtml += '</ul>';
      educationDialogHtml += '</div>';
      this.educationDialog = new Dialog({
        title: '选择学历',
        content: educationDialogHtml
      });
      this.educationDialog.addBtn({
        text: '取消'
      }).addBtn({
        text: '确定',
        isDefault: true,
        onClick: function () {
          if (education) {
            alert('选择了' + education);
            $el.find('.ri_education').text(education);
          } else {
            alert('没有选择');
          }
        }
      }).on('click', '.education_list_choose', function (e) {
        var $this = $(e.target);
        $this.closest('.education_list_item').siblings().find('.education_list_choose').removeClass('choosed');
        education = $this.text();
        $this.addClass('choosed');
      });
    },

    // 选择语言
    selectLanguage: function (ev) {
      var $el = this.conf.$el;
      var $riLanguage = $(ev.target);
      var languages = [];
      var languageDialogHtml = '<div class="language_select">';
      languageDialogHtml += '<ul class="language_list select_list">';
      languageDialogHtml += '<li class="language_list_item select_list_item">';
      languageDialogHtml += '<a href="javascript:;" class="language_list_choose select_list_choose">普通话</a>';
      languageDialogHtml += '</li>';
      languageDialogHtml += '<li class="language_list_item select_list_item">';
      languageDialogHtml += '<a href="javascript:;" class="language_list_choose select_list_choose">粤语</a>';
      languageDialogHtml += '</li>';
      languageDialogHtml += '<li class="language_list_item select_list_item">';
      languageDialogHtml += '<a href="javascript:;" class="language_list_choose select_list_choose">汉语</a>';
      languageDialogHtml += '</li>';
      languageDialogHtml += '<li class="language_list_item select_list_item">';
      languageDialogHtml += '<a href="javascript:;" class="language_list_choose select_list_choose">韩语</a>';
      languageDialogHtml += '</li>';
      languageDialogHtml += '<li class="language_list_item select_list_item">';
      languageDialogHtml += '<a href="javascript:;" class="language_list_choose select_list_choose">日语</a>';
      languageDialogHtml += '</li>';
      languageDialogHtml += '<li class="language_list_item select_list_item">';
      languageDialogHtml += '<a href="javascript:;" class="language_list_choose select_list_choose">英语</a>';
      languageDialogHtml += '</li>';
      languageDialogHtml += '</ul>';
      languageDialogHtml += '</div>';
      this.languageDialog = new Dialog({
        title: '选择学历',
        content: languageDialogHtml
      });
      new IScroll('.language_select', {
        click: true
      });
      this.languageDialog.addBtn({
        text: '取消'
      }).addBtn({
        text: '确定',
        isDefault: true,
        onClick: function () {
          if (languages.length > 0) {
            alert('选择了' + languages.join(','));
          } else {
            alert('没有选择');
          }
        }
      }).on('click', '.language_list_choose', function (e) {
        var $this = $(e.target);
        if (!$this.hasClass('choosed')) {
          $this.addClass('choosed');
          languages.push($this.text());
        }
      });
    },

    // 选择是否有车
    selectCar: function (ev) {
      var $el = this.conf.$el;
      var $riCar = $(ev.target);
      var car = null;
      var carDialogHtml = '<div class="car_select">';
      carDialogHtml += '<ul class="select_list">';
      carDialogHtml += '<li class="select_list_item car_list_item">';
      carDialogHtml += '<a href="javascript:;" class="car_list_choose select_list_choose">没车</a>';
      carDialogHtml += '</li>';
      carDialogHtml += '<li class="select_list_item car_list_item display_flex">';
      carDialogHtml += '<span>有车</span>';
      carDialogHtml += '<input type="text" class="select_input car_list_item_carnum" placeholder="输入车牌号" >';
      carDialogHtml += '<input type="text" class="select_input car_list_item_carseats" placeholder="00" >';
      carDialogHtml += '<span>座</span>';
      carDialogHtml += '</li>';
      carDialogHtml += '</ul>';
      carDialogHtml += '</div>';
      this.carDialog = new Dialog({
        content: carDialogHtml
      });
      this.carDialog.addBtn({
        text: '取消'
      }).addBtn({
        text: '确定',
        isDefault: true,
        onClick: function () {

        }
      }).on('click', '.car_list_choose', function (e) {
        var $this = $(e.target);
        if (!$this.hasClass('choosed')) {
          $this.addClass('choosed');
        }
      });
    },

    // 输入导游证号
    inputGuidesId: function (ev) {
      var $el = this.conf.$el;
      var $riGuidesId = $(ev.target);
      var guidesId = null;
      var guidesIdDialogHtml = '<div class="input_guidesid">';
      guidesIdDialogHtml += '<p class="display_flex input_guidesid_p">';
      guidesIdDialogHtml += '<input type="text" class="select_input input_guidesid_first" placeholder="A" >';
      guidesIdDialogHtml += '-';
      guidesIdDialogHtml += '<input type="text" class="select_input input_guidesid_second" placeholder="0000" >';
      guidesIdDialogHtml += '-';
      guidesIdDialogHtml += '<input type="text" class="select_input input_guidesid_third" placeholder="000000" >';
      guidesIdDialogHtml +='</p>';
      guidesIdDialogHtml += '</div>';
      this.guidesIdDialog = new Dialog({
        title: '导游证编号',
        content: guidesIdDialogHtml
      });
      this.guidesIdDialog.addBtn({
        text: '取消'
      }).addBtn({
        text: '确定',
        isDefault: true,
        onClick: function () {

        }
      });
    }
  });

  return RegisterInfo;
});
