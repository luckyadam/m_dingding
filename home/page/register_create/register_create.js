'use strict';

/**
 * @author luckyadam
 * @date 2016-1-6
 * @desc 创建账户全民叮叮
 */
PP.define('home/page/register_create', function (require) {
  $('.rc_form_confirm').on('click', function (e) {
    $(this).find('.rc_form_confirm_checkbox').toggleClass('checked');
  });
});
