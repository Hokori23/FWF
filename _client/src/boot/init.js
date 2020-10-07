import Vue from 'vue';
import markdownIt from 'markdown-it';

Vue.prototype.$markdownIt = markdownIt({
  html: true,
  breaks: true,
  linkify: true
});
