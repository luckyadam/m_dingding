'use strict';

module.exports = {
  app: 'm_dingding', // 项目英文名
  appId: '057c1680-b2f8-11e5-a2a8-97e89861aefe', // 项目ID
  description: '叮叮导游移动端',
  common: 'gb', // 公共模块名称
  moduleList: ['gb', 'home'],
  tmpId: 'default', // 选用模板
  deploy: { //项目部署配置，可自己增加另外的需要进行ftp上传的机器
    local: { // 本地预览配置
      fdPath: '/'
    },
    preview: { // 目的预览机的配置，字段名固定
      host: 'labs.qiang.it',
      user: '',
      pass: '',
      port: 22,
      fdPath: '/h5/',
      domain: 'labs.qiang.it',
      remotePath: '/usr/share/nginx/html/public/labs/h5/m_dingding'
    },
    jdTest: { // 目的京东测试机器的配置，字段名固定
      host: '192.168.193.32',
      user: '',
      pass: '',
      port: 22,
      fdPath: '/fd/h5/',
      domain: 's.paipaiimg.com',
      remotePath: '/export/paipai/resource/static/fd/h5/m_dingding',
      cssi: '/export/paipai/resource/sinclude/cssi/fd/h5/m_dingding',
      assestPrefix: '/static/fd/h5/m_dingding',
      shtmlPrefix: '/sinclude/cssi/fd/h5/m_dingding'
    },
    tencent: { // 目的腾讯测试机器的配置，字段名固定
      host: '172.25.34.21',
      user: '',
      pass: '',
      port: 21,
      fdPath: '/fd/h5/',
      domain: 'static.paipaiimg.com',
      remotePath: '/newforward/static/fd/h5/m_dingding',
      cssi: '/newforward/static/sinclude/cssi/fd/h5/m_dingding',
      assestPrefix: '/static/fd/h5/m_dingding',
      shtmlPrefix: '/static/sinclude/cssi/fd/h5/m_dingding'
    }
  }
};
