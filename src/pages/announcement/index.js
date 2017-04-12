var common = require('common');
var coala = require('coala');
var loading = require('components/loading.html');
var tpl = require('./index.html');

require('./index.css');

coala.mount({
  tpl: tpl,
  refs: common.refs,
  listen: {
    mount: function () {
      this.$('#loadingCont').html(loading());
      var _this = this;
      setTimeout(function() {
        require.ensure([], function () {
        var component = coala.component(require('./content.html'));
        component.parent = _this;
        component.mount('.content');
      });
      }, 2000);
    }
  }
}, '#app');