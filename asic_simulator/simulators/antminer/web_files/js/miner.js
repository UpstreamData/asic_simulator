!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=68)}({0:function(e,n,t){"use strict";t.d(n,"a",(function(){return r}));const r={loadProperties:function(){var e=window.localStorage.getItem("lang")||this.getBrowSerLang();$.i18n&&$.i18n.properties({name:"strings",path:"../i18n/",mode:"map",language:e,callback:function(){$("[data-locale]").each((function(){$(this).html($.i18n.prop($(this).data("locale")))})),$("[data-i18n-placeholder]").each((function(){$(this).attr("placeholder",$.i18n.prop($(this).data("i18n-placeholder")))})),$("[data-i18n-value]").each((function(){$(this).attr("value",$.i18n.prop($(this).data("i18n-value")))})),$("[data-i18n-text]").each((function(){var e=$(this).html(),n=/<(.*)>/;if(n.test(e)){var t=n.exec(e)[0];$(this).html(t+$.i18n.prop($(this).data("i18n-text")))}else $(this).text($.i18n.prop($(this).data("i18n-text")))}))}})},selfCheckFun:function(){$(".selfecheckbox").off("click").on("click",(function(e){$(this).hasClass("checked")?$(this).removeClass("checked"):$(this).addClass("checked")}))},switchFun:function(){$(".switch").on("click",(function(e){$(this).hasClass("on")?$(this).removeClass("on"):$(this).addClass("on")}))},dropDownFun:function(e){$("."+e).on("click",(function(n){n.stopPropagation(),"user-info"===e?$(".langDrop").hide():"lang"===e&&$(".userDrop").hide();var t=$(n.currentTarget).find(".h-d-icon"),r=$(n.currentTarget).find(".dropdown-box");t.toggleClass("open"),r.fadeToggle(500,"linear")}))},getBrowSerLang:function(){if(navigator.userLanguage)var e=navigator.userLanguage.substring(0,2).toLowerCase();else e=navigator.language.substring(0,2).toLowerCase();return e},loadInner:function(e){var n=e+".html";$("#content").load(n)},showWarn:function(e,n){$(".message."+e+" .text").attr("data-locale",n).text($.i18n.prop(n)),$(".message."+e).addClass("show"),setTimeout((function(){$(".message."+e).removeClass("show")}),1e4)},doElapsed:function(e){return{day:parseInt(e/60/60/24),hour:parseInt(e%86400/60/60),min:parseInt(e%86400%3600/60),sec:parseInt(e%86400%3600%60)}},getAsicTpl:function(e){var n={};return"AntminerS19Pro"===e.replace(/\s+/g,"")||"AntminerS19ProA"===e.replace(/\s+/g,"")||"AntminerS19LPro"===e.replace(/\s+/g,"")||"AntminerS19LProA"===e.replace(/\s+/g,"")?n[e]={tpl:[12,10],tplArr:[0,1,6,7,12,13,18,19,24,25,0,2,5,8,11,14,17,20,23,26,0,3,4,9,10,15,16,21,22,27,57,52,51,46,45,40,39,34,33,28,56,53,50,47,44,41,38,35,32,29,55,54,49,48,43,42,37,36,31,30,60,61,66,67,72,73,78,79,84,85,59,62,65,68,71,74,77,80,83,86,58,63,64,69,70,75,76,81,82,87,0,112,111,106,105,100,99,94,93,88,0,113,110,107,104,101,98,95,92,89,0,114,109,108,103,102,97,96,91,90]}:"AntminerS19"===e.replace(/\s+/g,"")||"AntminerT19"===e.replace(/\s+/g,"")||"AntminerS19L"===e.replace(/\s+/g,"")||"AntminerS19LW"===e.replace(/\s+/g,"")||"AntminerS19k"===e.replace(/\s+/g,"")||"AntminerS18"===e.replace(/\s+/g,"")?n[e]={tpl:[8,10],tplArr:[0,1,4,5,8,9,12,13,16,17,0,2,3,6,7,10,11,14,15,18,38,35,34,31,30,27,26,23,22,19,37,36,33,32,29,28,25,24,21,20,40,41,44,45,48,49,52,53,56,57,39,42,43,46,47,50,51,54,55,58,0,75,74,71,70,67,66,63,62,59,0,76,73,72,69,68,65,64,61,60]}:"AntminerS19Hydro"===e.replace(/\s+/g,"")?n[e]={tpl:[8,13],tplArr:[1,4,5,8,9,12,13,16,17,20,21,24,25,2,3,6,7,10,11,14,15,18,19,22,23,26,51,50,47,46,43,42,39,38,35,34,31,30,27,52,49,48,45,44,41,40,37,36,33,32,29,28,53,56,57,60,61,64,65,68,69,72,73,76,77,54,55,58,59,62,63,66,67,70,71,74,75,78,103,102,99,98,95,94,91,90,87,86,83,82,79,104,101,100,97,96,93,92,89,88,85,84,81,80]}:"AntminerS19+"===e.replace(/\s+/g,"")?n[e]={tpl:[10,8],tplArr:[1,2,3,4,5,6,7,8,16,15,14,13,12,11,10,9,17,18,19,20,21,22,23,24,32,31,30,29,28,27,26,25,33,34,35,36,37,38,39,40,48,47,46,45,44,43,42,41,49,50,51,52,53,54,55,56,64,63,62,61,60,59,58,57,65,66,67,68,69,70,71,72,80,79,78,77,76,75,74,73]}:"AntminerT19k"===e.replace(/\s+/g,"")||"AntminerS19i"===e.replace(/\s+/g,"")?n[e]={tpl:[8,10],tplArr:[2,3,6,7,10,11,14,15,18,19,1,4,5,8,9,12,13,16,17,20,40,37,36,33,32,29,28,25,24,21,39,38,35,34,31,30,27,26,23,22,42,43,46,47,50,51,54,55,58,59,41,44,45,48,49,52,53,56,57,60,80,77,76,73,72,69,68,65,64,61,79,78,75,74,71,70,67,66,63,62]}:"AntminerS18Pro"===e.replace(/\s+/g,"")?n[e]={tpl:[12,10],tplArr:[3,4,9,10,15,16,21,22,27,28,2,5,8,11,14,17,20,23,26,29,1,6,7,12,13,18,19,24,25,30,60,55,54,49,48,43,42,37,36,31,59,56,53,50,47,44,41,38,35,32,58,57,52,51,46,45,40,39,34,33,63,64,69,70,75,76,81,82,87,88,62,65,68,71,74,77,80,83,86,89,61,66,67,72,73,78,79,84,85,90,120,115,114,109,108,103,102,97,96,91,119,116,113,110,107,104,101,98,95,92,118,117,112,111,106,105,100,99,94,93]}:"AntminerNBT2006"===e.replace(/\s+/g,"")?n[e]={tpl:[8,9],tplArr:[1,4,5,8,9,12,13,16,17,2,3,6,7,10,11,14,15,18,35,34,31,30,27,26,23,22,19,36,33,32,29,28,25,24,21,20,37,40,41,44,45,48,49,52,53,38,39,42,43,46,47,50,51,54,71,70,67,66,63,62,59,58,55,72,69,68,65,64,61,60,57,56]}:"AntminerS19jPro"===e.replace(/\s+/g,"")||"AntminerS19jPro-A"===e.replace(/\s+/g,"")?n[e]={tpl:[12,11],tplArr:[0,3,4,9,10,15,16,21,22,27,28,0,2,5,8,11,14,17,20,23,26,29,0,1,6,7,12,13,18,19,24,25,30,61,60,55,54,49,48,43,42,37,36,31,62,59,56,53,50,47,44,41,38,35,32,63,58,57,52,51,46,45,40,39,34,33,64,69,70,75,76,81,82,87,88,93,94,65,68,71,74,77,80,83,86,89,92,95,66,67,72,73,78,79,84,85,90,91,96,0,126,121,120,115,114,109,108,103,102,97,0,125,122,119,116,113,110,107,104,101,98,0,124,123,118,117,112,111,106,105,100,99]}:"AntminerS19j+"===e.replace(/\s+/g,"")?n[e]={tpl:[12,9],tplArr:[1,6,7,12,13,18,19,24,25,2,5,8,11,14,17,20,23,26,3,4,9,10,15,16,21,22,27,52,51,46,45,40,39,34,33,28,53,50,47,44,41,38,35,32,29,54,49,48,43,42,37,36,31,30,55,60,61,66,67,72,73,78,79,56,59,62,65,68,71,74,77,80,57,58,63,64,69,70,75,76,81,106,105,100,99,94,93,88,87,82,107,104,101,98,95,92,89,86,83,108,103,102,97,96,91,90,85,84]}:"AntminerS19a"===e.replace(/\s+/g,"")?n[e]={tpl:[9,8],tplArr:[1,2,3,4,5,6,7,8,16,15,14,13,12,11,10,9,17,18,19,20,21,22,23,24,32,31,30,29,28,27,26,25,33,34,35,36,37,38,39,40,48,47,46,45,44,43,43,41,49,50,51,52,53,54,55,56,64,63,62,61,60,59,58,57,65,66,67,68,69,70,71,72]}:"AntminerS19aPro"===e.replace(/\s+/g,"")?n[e]={tpl:[10,10],tplArr:[1,2,3,4,5,6,7,8,9,10,20,19,18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,29,30,40,39,38,37,36,35,34,33,32,31,41,42,43,44,45,46,47,48,49,50,60,59,58,57,56,55,54,53,52,51,61,62,63,64,65,66,67,68,69,70,80,79,78,77,76,75,74,73,72,71,81,82,83,84,85,86,87,88,89,90,100,99,98,97,96,95,94,93,92,91]}:"AntminerBHB42801"===e.replace(/\s+/g,"")||"AntminerS19jL"===e.replace(/\s+/g,"")?n[e]={tpl:[8,11],tplArr:[1,4,5,8,9,12,13,16,17,20,21,2,3,6,7,10,11,14,15,18,19,22,43,42,39,38,35,34,31,30,27,26,23,44,41,40,37,36,33,32,29,28,25,24,45,48,49,52,53,56,57,60,61,64,65,46,47,50,51,54,55,58,59,62,63,66,87,86,83,82,79,78,75,74,71,70,67,88,85,84,81,80,77,76,73,72,69,68]}:"AntminerBHB42602"===e.replace(/\s+/g,"")?n[e]={tpl:[12,13],tplArr:[0,3,4,9,10,15,16,21,22,27,28,33,34,0,2,5,8,11,14,17,20,23,26,29,32,35,0,1,6,7,12,13,18,19,24,25,30,31,36,73,72,67,66,61,60,55,54,49,48,43,42,37,74,71,68,65,62,59,56,53,50,47,44,41,38,75,70,69,64,63,58,57,52,51,46,45,40,39,76,81,82,87,88,93,94,99,100,105,106,111,112,77,80,83,86,89,92,95,98,101,104,107,110,113,78,79,84,85,90,91,96,97,102,103,108,109,114,0,150,145,144,139,138,133,132,127,126,121,120,115,0,149,146,143,140,137,134,131,128,125,122,119,116,0,148,147,142,141,136,135,130,129,124,123,118,117]}:"AntminerBHB42803"===e.replace(/\s+/g,"")?n[e]={tpl:[12,7],tplArr:[1,4,5,8,9,12,13,2,3,6,7,10,11,14,27,26,23,22,19,18,15,28,25,24,21,20,17,16,29,32,33,36,37,40,41,30,31,34,35,38,39,42,55,54,51,50,47,46,43,56,53,52,49,48,45,44,57,60,61,64,65,68,69,58,59,62,63,66,67,70,83,82,79,78,75,74,71,84,81,80,77,76,73,72]}:"AntminerL7"===e.replace(/\s+/g,"")?n[e]={tpl:[10,12],tplArr:[5,6,15,16,25,26,35,36,45,46,55,56,4,7,14,17,24,27,34,37,44,47,54,57,3,8,13,18,23,28,33,38,43,48,53,58,2,9,12,19,22,29,32,39,42,49,52,59,1,10,11,20,21,30,31,40,41,50,51,60,120,111,110,101,100,91,90,81,80,71,70,61,119,112,109,102,99,92,89,82,79,72,69,62,118,113,108,103,98,93,88,83,78,73,68,63,117,114,107,104,97,94,87,84,77,74,67,64,116,115,106,105,96,95,86,85,76,75,66,65]}:"AntminerD7"===e.replace(/\s+/g,"")||"AntminerD7e"===e.replace(/\s+/g,"")?n[e]={tpl:[8,9],tplArr:[1,4,5,8,9,12,13,16,17,2,3,6,7,10,11,14,15,18,35,34,31,30,27,26,23,22,19,36,33,32,29,28,25,24,21,20,37,40,41,44,45,48,49,52,53,38,39,42,43,46,47,50,51,54,0,70,67,66,63,62,59,58,55,0,69,68,65,64,61,60,57,56]}:n[e]={tpl:[1,1],tplArr:[1]},n[e]},getCurrentTime:function(){var e=new Date,n=e.getFullYear(),t=e.getMonth()+1,r=e.getDate(),o=e.getHours(),i=e.getMinutes(),a=e.getSeconds();return n+"-"+(t<10?"0"+t:t)+"-"+(r<10?"0"+r:r)+" "+(o<10?"0"+o:o)+":"+(i<10?"0"+i:i)+":"+(a<10?"0"+a:a)},uniqueArr:function(e){for(var n=[],t=0;t<e.length;t++){for(var r=t+1;r<e.length;r++)e[t]==e[r]&&++t;n.push(e[t])}return n},crtColor:function(e){for(var n=[],t=e+6,r=0;r<t;r++){let e="#"+Math.random().toString(16).slice(-6);n.push(e)}return n}}},1:function(e,n,t){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),a=[];function s(e){for(var n=-1,t=0;t<a.length;t++)if(a[t].identifier===e){n=t;break}return n}function l(e,n){for(var t={},r=[],o=0;o<e.length;o++){var i=e[o],l=n.base?i[0]+n.base:i[0],c=t[l]||0,p="".concat(l," ").concat(c);t[l]=c+1;var u=s(p),d={css:i[1],media:i[2],sourceMap:i[3]};-1!==u?(a[u].references++,a[u].updater(d)):a.push({identifier:p,updater:h(d,n),references:1}),r.push(p)}return r}function c(e){var n=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=t.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){n.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(n);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var p,u=(p=[],function(e,n){return p[e]=n,p.filter(Boolean).join("\n")});function d(e,n,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=u(n,o);else{var i=document.createTextNode(o),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(i,a[n]):e.appendChild(i)}}function f(e,n,t){var r=t.css,o=t.media,i=t.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var m=null,g=0;function h(e,n){var t,r,o;if(n.singleton){var i=g++;t=m||(m=c(n)),r=d.bind(null,t,i,!1),o=d.bind(null,t,i,!0)}else t=c(n),r=f.bind(null,t,n),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else o()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=o());var t=l(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<t.length;r++){var o=s(t[r]);a[o].references--}for(var i=l(e,n),c=0;c<t.length;c++){var p=s(t[c]);0===a[p].references&&(a[p].updater(),a.splice(p,1))}t=i}}}},2:function(e,n,t){"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=function(e,n){var t=e[1]||"",r=e[3];if(!r)return t;if(n&&"function"==typeof btoa){var o=(a=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[t].concat(i).concat([o]).join("\n")}var a,s,l;return[t].join("\n")}(n,e);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var l=[].concat(e[s]);r&&o[l[0]]||(t&&(l[2]?l[2]="".concat(t," and ").concat(l[2]):l[2]=t),n.push(l))}},n}},3:function(e,n,t){var r=t(1),o=t(4);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},4:function(e,n,t){(n=t(2)(!1)).push([e.i,".common-spt-line{\n\tbackground: #f2f3f7;\n    border:1px solid #e8e9ed;\n    height: 5px;\n    margin: 0 24px;\n}\n.blog-content{\n\tpadding:20px 0;\n}\n.blog-content,\n.list-content{\n\t/*min-height: 640px;*/\n\tpadding-bottom:100px;\n\tfont-size: 14px;\n\tline-height: 24px;\n}\n.main-content {\n    min-width: auto;\n}\n.miner-machine-form {\n    margin-top: 20px;\n}\n.forms-content {\n    min-height: auto;\n    padding: 24px 0;\n}\n.forms-content form {\n    border: 1px solid #eee;\n}\n.table-title {\n    text-align: left;\n    padding: 10px;\n    background-color: #eee;\n}\n.table-form {\n    width: 98%;\n    margin-top: 0 !important;\n    padding: 10px 0;\n}\n.table-form td {\n    text-align: left;\n}\n.table-form td:first-child {\n    width: 200px;\n    text-align: right;\n}\n.table-form thead td {\n    padding: 10px;\n    background-color: #fafafa;\n}",""]),e.exports=n},5:function(e,n,t){var r=t(1),o=t(6);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},6:function(e,n,t){(n=t(2)(!1)).push([e.i,'.loading-box {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 1;\n    background-color: rgba(0, 0, 0, .3);\n}\n.loading-box .loading-circle {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin-top: -15px;\n    margin-left: -15px;\n}\n.loading-circle {\n    display: inline-block;\n    width: 30px;\n    height: 30px;\n    font-size: 30px;\n    color: #fff;\n    vertical-align: middle;\n    pointer-events: none;\n    border: 4px solid transparent;\n    border-top-color: currentcolor;\n    border-radius: 50%;\n    -webkit-animation: 1s loader-01 linear infinite;\n    animation: 1s loader-01 linear infinite;\n    position: relative;\n}\n.loading-circle:before {\n    content: \'\';\n    display: block;\n    width: inherit;\n    height: inherit;\n    position: absolute;\n    top: -4px;\n    left: -4px;\n    border: 4px solid currentcolor;\n    border-radius: 50%;\n    opacity: .5;\n}\n.upload-text-div{\n    text-align:center;\n    line-height:300px; \n    height:40px;\n    font-size:35px;\n    color: #fff;\n    font-family: PingFang SC, Roboto, "Helvetica Neue", Helvetica, "Hiragino Sans GB", STHeitiSC-Light, "Microsoft YaHei", "微软雅黑", Arial, sans-serif;\n    } \n@-webkit-keyframes loader-01 {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n    }\n}\n@keyframes loader-01 {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n    }\n}',""]),e.exports=n},68:function(e,n,t){"use strict";t.r(n);var r=t(0),o=(t(5),t(3),r.a);o.loadProperties(),new Vue({el:"#MinerSet",data:()=>({showLoading:!1,minerForm:{"bitmain-fan-ctrl":!1,"bitmain-fan-pwm":"100","miner-mode":0,"freq-level":100,pools:[{url:"",user:"",pass:""},{url:"",user:"",pass:""},{url:"",user:"",pass:""}]},modeList:[{text:"",id:0},{text:"",id:1}]}),created(){this.initData();let e=window.ee;e&&(e.removeEvent("lang-changed"),e.addListener("lang-changed",this.updateModeList))},mounted(){this.doMinerType()},computed:{trShow(){return 2===this.minerForm["miner-mode"]}},methods:{doMinerType(){$.ajax({url:"/cgi-bin/get_system_info.cgi",dataType:"json",type:"GET",timeout:3e3,async:!0,processData:!1,contentType:!1,success:function(e){-1!=e.minertype.indexOf("Hydro")&&(document.querySelector(".miner-machine-form table.table-form tbody tr:first-of-type").style.display="none")}})},initData(){var e=this;this.updateModeList(),$.ajax({url:"/cgi-bin/get_miner_conf.cgi",dataType:"json",type:"GET",async:!1,processData:!1,contentType:!1,success:function(n){if(n){for(i=0;i<3;i++)e.minerForm.pools[i].url=n.pools[i].url,e.minerForm.pools[i].user=n.pools[i].user,e.minerForm.pools[i].pass=n.pools[i].pass;e.minerForm["bitmain-fan-ctrl"]=n["bitmain-fan-ctrl"],e.minerForm["bitmain-fan-pwm"]=n["bitmain-fan-pwm"],e.minerForm["miner-mode"]=n["bitmain-work-mode"],e.minerForm["freq-level"]=n["bitmain-freq-level"]}},error:function(){o.showWarn("error","commonCode")}})},updateModeList(){this.modeList[0].text=$.i18n.prop("modeNormal"),this.modeList[1].text=$.i18n.prop("modeSleep")},modeSelectChange(e){this.minerForm["miner-mode"]=e},checkFun(e){this.$set(this.minerForm,e,!this.minerForm[e])},saveMineSet(){var e=JSON.stringify(this.minerForm),n=this;n.showLoading=!0,$.ajax({url:"/cgi-bin/set_miner_conf.cgi",dataType:"json",type:"POST",async:!0,data:e,processData:!1,contentType:!1,success:function(e){n.showLoading=!1;var t=e;"success"===t.stats?o.showWarn("success",t.code):o.showWarn("error",t.code),r.a.loadInner("miner")},error:function(e){n.showLoading=!1,o.showWarn("error","commonCode"),r.a.loadInner("miner")}})}}})}});