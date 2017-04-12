
require('css/base.css'); 
require('vendors/iconfont/iconfont.css'); 

var coala = require('coala');
var top = require('components/top');
var leftNav = require('components/left-nav');

module.exports =  {
  refs: {
    top: {
      component: top,
      el: '#topNav'
    },

    leftNav: {
      component: leftNav,
      el: '#leftNav'
    }
  }
} 