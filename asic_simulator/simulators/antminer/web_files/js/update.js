!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=71)}({0:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));const r={loadProperties:function(){var e=window.localStorage.getItem("lang")||this.getBrowSerLang();$.i18n&&$.i18n.properties({name:"strings",path:"../i18n/",mode:"map",language:e,callback:function(){$("[data-locale]").each((function(){$(this).html($.i18n.prop($(this).data("locale")))})),$("[data-i18n-placeholder]").each((function(){$(this).attr("placeholder",$.i18n.prop($(this).data("i18n-placeholder")))})),$("[data-i18n-value]").each((function(){$(this).attr("value",$.i18n.prop($(this).data("i18n-value")))})),$("[data-i18n-text]").each((function(){var e=$(this).html(),t=/<(.*)>/;if(t.test(e)){var n=t.exec(e)[0];$(this).html(n+$.i18n.prop($(this).data("i18n-text")))}else $(this).text($.i18n.prop($(this).data("i18n-text")))}))}})},selfCheckFun:function(){$(".selfecheckbox").off("click").on("click",(function(e){$(this).hasClass("checked")?$(this).removeClass("checked"):$(this).addClass("checked")}))},switchFun:function(){$(".switch").on("click",(function(e){$(this).hasClass("on")?$(this).removeClass("on"):$(this).addClass("on")}))},dropDownFun:function(e){$("."+e).on("click",(function(t){t.stopPropagation(),"user-info"===e?$(".langDrop").hide():"lang"===e&&$(".userDrop").hide();var n=$(t.currentTarget).find(".h-d-icon"),r=$(t.currentTarget).find(".dropdown-box");n.toggleClass("open"),r.fadeToggle(500,"linear")}))},getBrowSerLang:function(){if(navigator.userLanguage)var e=navigator.userLanguage.substring(0,2).toLowerCase();else e=navigator.language.substring(0,2).toLowerCase();return e},loadInner:function(e){var t=e+".html";$("#content").load(t)},showWarn:function(e,t){$(".message."+e+" .text").attr("data-locale",t).text($.i18n.prop(t)),$(".message."+e).addClass("show"),setTimeout((function(){$(".message."+e).removeClass("show")}),1e4)},doElapsed:function(e){return{day:parseInt(e/60/60/24),hour:parseInt(e%86400/60/60),min:parseInt(e%86400%3600/60),sec:parseInt(e%86400%3600%60)}},getAsicTpl:function(e){var t={};return"AntminerS19Pro"===e.replace(/\s+/g,"")||"AntminerS19ProA"===e.replace(/\s+/g,"")||"AntminerS19LPro"===e.replace(/\s+/g,"")||"AntminerS19LProA"===e.replace(/\s+/g,"")?t[e]={tpl:[12,10],tplArr:[0,1,6,7,12,13,18,19,24,25,0,2,5,8,11,14,17,20,23,26,0,3,4,9,10,15,16,21,22,27,57,52,51,46,45,40,39,34,33,28,56,53,50,47,44,41,38,35,32,29,55,54,49,48,43,42,37,36,31,30,60,61,66,67,72,73,78,79,84,85,59,62,65,68,71,74,77,80,83,86,58,63,64,69,70,75,76,81,82,87,0,112,111,106,105,100,99,94,93,88,0,113,110,107,104,101,98,95,92,89,0,114,109,108,103,102,97,96,91,90]}:"AntminerS19"===e.replace(/\s+/g,"")||"AntminerT19"===e.replace(/\s+/g,"")||"AntminerS19L"===e.replace(/\s+/g,"")||"AntminerS19LW"===e.replace(/\s+/g,"")||"AntminerS19k"===e.replace(/\s+/g,"")||"AntminerS18"===e.replace(/\s+/g,"")?t[e]={tpl:[8,10],tplArr:[0,1,4,5,8,9,12,13,16,17,0,2,3,6,7,10,11,14,15,18,38,35,34,31,30,27,26,23,22,19,37,36,33,32,29,28,25,24,21,20,40,41,44,45,48,49,52,53,56,57,39,42,43,46,47,50,51,54,55,58,0,75,74,71,70,67,66,63,62,59,0,76,73,72,69,68,65,64,61,60]}:"AntminerS19Hydro"===e.replace(/\s+/g,"")?t[e]={tpl:[8,13],tplArr:[1,4,5,8,9,12,13,16,17,20,21,24,25,2,3,6,7,10,11,14,15,18,19,22,23,26,51,50,47,46,43,42,39,38,35,34,31,30,27,52,49,48,45,44,41,40,37,36,33,32,29,28,53,56,57,60,61,64,65,68,69,72,73,76,77,54,55,58,59,62,63,66,67,70,71,74,75,78,103,102,99,98,95,94,91,90,87,86,83,82,79,104,101,100,97,96,93,92,89,88,85,84,81,80]}:"AntminerS19+"===e.replace(/\s+/g,"")?t[e]={tpl:[10,8],tplArr:[1,2,3,4,5,6,7,8,16,15,14,13,12,11,10,9,17,18,19,20,21,22,23,24,32,31,30,29,28,27,26,25,33,34,35,36,37,38,39,40,48,47,46,45,44,43,42,41,49,50,51,52,53,54,55,56,64,63,62,61,60,59,58,57,65,66,67,68,69,70,71,72,80,79,78,77,76,75,74,73]}:"AntminerT19k"===e.replace(/\s+/g,"")||"AntminerS19i"===e.replace(/\s+/g,"")?t[e]={tpl:[8,10],tplArr:[2,3,6,7,10,11,14,15,18,19,1,4,5,8,9,12,13,16,17,20,40,37,36,33,32,29,28,25,24,21,39,38,35,34,31,30,27,26,23,22,42,43,46,47,50,51,54,55,58,59,41,44,45,48,49,52,53,56,57,60,80,77,76,73,72,69,68,65,64,61,79,78,75,74,71,70,67,66,63,62]}:"AntminerS18Pro"===e.replace(/\s+/g,"")?t[e]={tpl:[12,10],tplArr:[3,4,9,10,15,16,21,22,27,28,2,5,8,11,14,17,20,23,26,29,1,6,7,12,13,18,19,24,25,30,60,55,54,49,48,43,42,37,36,31,59,56,53,50,47,44,41,38,35,32,58,57,52,51,46,45,40,39,34,33,63,64,69,70,75,76,81,82,87,88,62,65,68,71,74,77,80,83,86,89,61,66,67,72,73,78,79,84,85,90,120,115,114,109,108,103,102,97,96,91,119,116,113,110,107,104,101,98,95,92,118,117,112,111,106,105,100,99,94,93]}:"AntminerNBT2006"===e.replace(/\s+/g,"")?t[e]={tpl:[8,9],tplArr:[1,4,5,8,9,12,13,16,17,2,3,6,7,10,11,14,15,18,35,34,31,30,27,26,23,22,19,36,33,32,29,28,25,24,21,20,37,40,41,44,45,48,49,52,53,38,39,42,43,46,47,50,51,54,71,70,67,66,63,62,59,58,55,72,69,68,65,64,61,60,57,56]}:"AntminerS19jPro"===e.replace(/\s+/g,"")||"AntminerS19jPro-A"===e.replace(/\s+/g,"")?t[e]={tpl:[12,11],tplArr:[0,3,4,9,10,15,16,21,22,27,28,0,2,5,8,11,14,17,20,23,26,29,0,1,6,7,12,13,18,19,24,25,30,61,60,55,54,49,48,43,42,37,36,31,62,59,56,53,50,47,44,41,38,35,32,63,58,57,52,51,46,45,40,39,34,33,64,69,70,75,76,81,82,87,88,93,94,65,68,71,74,77,80,83,86,89,92,95,66,67,72,73,78,79,84,85,90,91,96,0,126,121,120,115,114,109,108,103,102,97,0,125,122,119,116,113,110,107,104,101,98,0,124,123,118,117,112,111,106,105,100,99]}:"AntminerS19j+"===e.replace(/\s+/g,"")?t[e]={tpl:[12,9],tplArr:[1,6,7,12,13,18,19,24,25,2,5,8,11,14,17,20,23,26,3,4,9,10,15,16,21,22,27,52,51,46,45,40,39,34,33,28,53,50,47,44,41,38,35,32,29,54,49,48,43,42,37,36,31,30,55,60,61,66,67,72,73,78,79,56,59,62,65,68,71,74,77,80,57,58,63,64,69,70,75,76,81,106,105,100,99,94,93,88,87,82,107,104,101,98,95,92,89,86,83,108,103,102,97,96,91,90,85,84]}:"AntminerS19a"===e.replace(/\s+/g,"")?t[e]={tpl:[9,8],tplArr:[1,2,3,4,5,6,7,8,16,15,14,13,12,11,10,9,17,18,19,20,21,22,23,24,32,31,30,29,28,27,26,25,33,34,35,36,37,38,39,40,48,47,46,45,44,43,43,41,49,50,51,52,53,54,55,56,64,63,62,61,60,59,58,57,65,66,67,68,69,70,71,72]}:"AntminerS19aPro"===e.replace(/\s+/g,"")?t[e]={tpl:[10,10],tplArr:[1,2,3,4,5,6,7,8,9,10,20,19,18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,29,30,40,39,38,37,36,35,34,33,32,31,41,42,43,44,45,46,47,48,49,50,60,59,58,57,56,55,54,53,52,51,61,62,63,64,65,66,67,68,69,70,80,79,78,77,76,75,74,73,72,71,81,82,83,84,85,86,87,88,89,90,100,99,98,97,96,95,94,93,92,91]}:"AntminerBHB42801"===e.replace(/\s+/g,"")||"AntminerS19jL"===e.replace(/\s+/g,"")?t[e]={tpl:[8,11],tplArr:[1,4,5,8,9,12,13,16,17,20,21,2,3,6,7,10,11,14,15,18,19,22,43,42,39,38,35,34,31,30,27,26,23,44,41,40,37,36,33,32,29,28,25,24,45,48,49,52,53,56,57,60,61,64,65,46,47,50,51,54,55,58,59,62,63,66,87,86,83,82,79,78,75,74,71,70,67,88,85,84,81,80,77,76,73,72,69,68]}:"AntminerBHB42602"===e.replace(/\s+/g,"")?t[e]={tpl:[12,13],tplArr:[0,3,4,9,10,15,16,21,22,27,28,33,34,0,2,5,8,11,14,17,20,23,26,29,32,35,0,1,6,7,12,13,18,19,24,25,30,31,36,73,72,67,66,61,60,55,54,49,48,43,42,37,74,71,68,65,62,59,56,53,50,47,44,41,38,75,70,69,64,63,58,57,52,51,46,45,40,39,76,81,82,87,88,93,94,99,100,105,106,111,112,77,80,83,86,89,92,95,98,101,104,107,110,113,78,79,84,85,90,91,96,97,102,103,108,109,114,0,150,145,144,139,138,133,132,127,126,121,120,115,0,149,146,143,140,137,134,131,128,125,122,119,116,0,148,147,142,141,136,135,130,129,124,123,118,117]}:"AntminerBHB42803"===e.replace(/\s+/g,"")?t[e]={tpl:[12,7],tplArr:[1,4,5,8,9,12,13,2,3,6,7,10,11,14,27,26,23,22,19,18,15,28,25,24,21,20,17,16,29,32,33,36,37,40,41,30,31,34,35,38,39,42,55,54,51,50,47,46,43,56,53,52,49,48,45,44,57,60,61,64,65,68,69,58,59,62,63,66,67,70,83,82,79,78,75,74,71,84,81,80,77,76,73,72]}:"AntminerL7"===e.replace(/\s+/g,"")?t[e]={tpl:[10,12],tplArr:[5,6,15,16,25,26,35,36,45,46,55,56,4,7,14,17,24,27,34,37,44,47,54,57,3,8,13,18,23,28,33,38,43,48,53,58,2,9,12,19,22,29,32,39,42,49,52,59,1,10,11,20,21,30,31,40,41,50,51,60,120,111,110,101,100,91,90,81,80,71,70,61,119,112,109,102,99,92,89,82,79,72,69,62,118,113,108,103,98,93,88,83,78,73,68,63,117,114,107,104,97,94,87,84,77,74,67,64,116,115,106,105,96,95,86,85,76,75,66,65]}:"AntminerD7"===e.replace(/\s+/g,"")||"AntminerD7e"===e.replace(/\s+/g,"")?t[e]={tpl:[8,9],tplArr:[1,4,5,8,9,12,13,16,17,2,3,6,7,10,11,14,15,18,35,34,31,30,27,26,23,22,19,36,33,32,29,28,25,24,21,20,37,40,41,44,45,48,49,52,53,38,39,42,43,46,47,50,51,54,0,70,67,66,63,62,59,58,55,0,69,68,65,64,61,60,57,56]}:t[e]={tpl:[1,1],tplArr:[1]},t[e]},getCurrentTime:function(){var e=new Date,t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),i=e.getHours(),o=e.getMinutes(),a=e.getSeconds();return t+"-"+(n<10?"0"+n:n)+"-"+(r<10?"0"+r:r)+" "+(i<10?"0"+i:i)+":"+(o<10?"0"+o:o)+":"+(a<10?"0"+a:a)},uniqueArr:function(e){for(var t=[],n=0;n<e.length;n++){for(var r=n+1;r<e.length;r++)e[n]==e[r]&&++n;t.push(e[n])}return t},crtColor:function(e){for(var t=[],n=e+6,r=0;r<n;r++){let e="#"+Math.random().toString(16).slice(-6);t.push(e)}return t}}},1:function(e,t,n){"use strict";var r,i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},o=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function s(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function l(e,t){for(var n={},r=[],i=0;i<e.length;i++){var o=e[i],l=t.base?o[0]+t.base:o[0],c=n[l]||0,d="".concat(l," ").concat(c);n[l]=c+1;var u=s(d),f={css:o[1],media:o[2],sourceMap:o[3]};-1!==u?(a[u].references++,a[u].updater(f)):a.push({identifier:d,updater:m(f,t),references:1}),r.push(d)}return r}function c(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var i=n.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var a=o(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var d,u=(d=[],function(e,t){return d[e]=t,d.filter(Boolean).join("\n")});function f(e,t,n,r){var i=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=u(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function h(e,t,n){var r=n.css,i=n.media,o=n.sourceMap;if(i?e.setAttribute("media",i):e.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var p=null,g=0;function m(e,t){var n,r,i;if(t.singleton){var o=g++;n=p||(p=c(t)),r=f.bind(null,n,o,!1),i=f.bind(null,n,o,!0)}else n=c(t),r=h.bind(null,n,t),i=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=i());var n=l(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var i=s(n[r]);a[i].references--}for(var o=l(e,t),c=0;c<n.length;c++){var d=s(n[c]);0===a[d].references&&(a[d].updater(),a.splice(d,1))}n=o}}}},2:function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var i=(a=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),o=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(o).concat([i]).join("\n")}var a,s,l;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var i={};if(r)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(i[a]=!0)}for(var s=0;s<e.length;s++){var l=[].concat(e[s]);r&&i[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},3:function(e,t,n){var r=n(1),i=n(4);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var o={insert:"head",singleton:!1};r(i,o);e.exports=i.locals||{}},4:function(e,t,n){(t=n(2)(!1)).push([e.i,".common-spt-line{\n\tbackground: #f2f3f7;\n    border:1px solid #e8e9ed;\n    height: 5px;\n    margin: 0 24px;\n}\n.blog-content{\n\tpadding:20px 0;\n}\n.blog-content,\n.list-content{\n\t/*min-height: 640px;*/\n\tpadding-bottom:100px;\n\tfont-size: 14px;\n\tline-height: 24px;\n}\n.main-content {\n    min-width: auto;\n}\n.miner-machine-form {\n    margin-top: 20px;\n}\n.forms-content {\n    min-height: auto;\n    padding: 24px 0;\n}\n.forms-content form {\n    border: 1px solid #eee;\n}\n.table-title {\n    text-align: left;\n    padding: 10px;\n    background-color: #eee;\n}\n.table-form {\n    width: 98%;\n    margin-top: 0 !important;\n    padding: 10px 0;\n}\n.table-form td {\n    text-align: left;\n}\n.table-form td:first-child {\n    width: 200px;\n    text-align: right;\n}\n.table-form thead td {\n    padding: 10px;\n    background-color: #fafafa;\n}",""]),e.exports=t},5:function(e,t,n){var r=n(1),i=n(6);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var o={insert:"head",singleton:!1};r(i,o);e.exports=i.locals||{}},6:function(e,t,n){(t=n(2)(!1)).push([e.i,'.loading-box {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 1;\n    background-color: rgba(0, 0, 0, .3);\n}\n.loading-box .loading-circle {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin-top: -15px;\n    margin-left: -15px;\n}\n.loading-circle {\n    display: inline-block;\n    width: 30px;\n    height: 30px;\n    font-size: 30px;\n    color: #fff;\n    vertical-align: middle;\n    pointer-events: none;\n    border: 4px solid transparent;\n    border-top-color: currentcolor;\n    border-radius: 50%;\n    -webkit-animation: 1s loader-01 linear infinite;\n    animation: 1s loader-01 linear infinite;\n    position: relative;\n}\n.loading-circle:before {\n    content: \'\';\n    display: block;\n    width: inherit;\n    height: inherit;\n    position: absolute;\n    top: -4px;\n    left: -4px;\n    border: 4px solid currentcolor;\n    border-radius: 50%;\n    opacity: .5;\n}\n.upload-text-div{\n    text-align:center;\n    line-height:300px; \n    height:40px;\n    font-size:35px;\n    color: #fff;\n    font-family: PingFang SC, Roboto, "Helvetica Neue", Helvetica, "Hiragino Sans GB", STHeitiSC-Light, "Microsoft YaHei", "微软雅黑", Arial, sans-serif;\n    } \n@-webkit-keyframes loader-01 {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n    }\n}\n@keyframes loader-01 {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n    }\n}',""]),e.exports=t},71:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(8);n(5),n(3);$((function(){r.a.loadProperties(),r.a.selfCheckFun();var e="",t="",n="";$.ajax({url:"/cgi-bin/miner_type.cgi",dataType:"json",type:"GET",timeout:3e3,async:!0,processData:!1,contentType:!1,success:function(r){e=r.miner_type,t=r.subtype,n=r.fw_version,console.log("get minertype: ",e," subtype:",t," fw_version:",n)}}),$("#submitBtn").off("click").on("click",(function(e){e.stopPropagation(),$("#file").trigger("click")})),$("#file").off("change").on("change",(function(){$("#fileInput").val("");var e=$("#file")[0];if(null!==e){var t=e.files[0].name;$("#fileInput").val(t)}})),$("#updateFile").off("click").on("click",(function(){var n=new FormData,o=$("#file")[0].files[0],a="",s=new i.default,l=!1;if(void 0===o)return r.a.showWarn("error","noFile"),$("#fileInput").val(""),void $("#file").val("");$("#updateLoading").show(),a=$("#updateCheck").hasClass("checked")?"/cgi-bin/upgrade.cgi":"/cgi-bin/upgrade_clear.cgi";var c=function(e,t){$.ajax({url:t,dataType:"json",type:"POST",async:!0,data:e,timeout:7e4,processData:!1,contentType:!1,success:function(e){"success"===e.stats?setTimeout((function(){location.reload()}),65e3):$("#updateLoading").hide()},error:function(e){$("#updateLoading").hide(),location.reload()}}),$("#fileInput").val(""),$("#file").val("")},d=new i.default;!async function(){await d.checkHeader(o,(function(r,i){l=r,console.log("check:",r,"->",l," context:",i),l?(console.log("use new container file to upgrade"),s.readAsArrayBuffer(o,(function(r,i=!1){if(console.log("callback len:"+r.byteLength,"matched:",i),!i)return console.log("can not match file please select invalid file, miner_type:",e," subtype:",t),$("#updateLoading").hide(),void location.reload();var o=new Blob([r]);n.append("firmware",o),c(n,a)}),16384,e,t)):(console.log("use old upgrade!"),n.append("firmware",$("#file")[0].files[0]),c(n,a))}))}()}))}))},8:function(e,t,n){"use strict";n.r(t);function r(e){var t=new Uint32Array(1);return t[0]=(255&e[3])<<24,t[0]=t[0]|(255&e[2])<<16,t[0]=t[0]|(255&e[1])<<8,t[0]=t[0]|255&e[0],t[0]}class i{constructor(){this.Magic=0,this.Versoin=0,this.HdrSize=0,this.ItemCount=0,this.ItemSize=0,this.DataOffset=0,this.Crc32=0,this.Reserve0=0,this.Reserve1=0}parseHdr(e){this.Magic=r(e.subarray(0,4)),this.Versoin=r(e.subarray(4,8)),this.HdrSize=r(e.subarray(8,12)),this.ItemCount=r(e.subarray(12,16)),this.ItemSize=r(e.subarray(16,20)),this.DataOffset=r(e.subarray(20,24)),this.Crc32=r(e.subarray(24,28)),this.Reserve0=r(e.subarray(28,32)),this.Reserve1=r(e.subarray(32,36))}printfHdr(){console.log("read header:"),console.log("magic 0x"+this.Magic.toString(16)),console.log("version 0x"+this.Versoin.toString(16)),console.log("hdrsize 0x"+this.HdrSize.toString(16)),console.log("itemcount 0x"+this.ItemCount.toString(16)),console.log("itemsize 0x"+this.ItemSize.toString(16)),console.log("dataoffset 0x"+this.DataOffset.toString(16)),console.log("crc32 0x"+this.Crc32.toString(16)),console.log("reserve0 0x"+this.Reserve0.toString(16)),console.log("reserve1 0x"+this.Reserve1.toString(16))}}class o{constructor(){this.NameLen=0,this.ChipModelLen=0,this.CtrlBoardModelLen=0,this.MinerModelLen=0,this.Name="",this.ChipModel="",this.CtrlBoardModel="",this.MinerModel="",this.DataOffset=0,this.DataSize=0}parseItem(e){this.NameLen=e.subarray(0,1),this.ChipModelLen=e.subarray(1,2),this.CtrlBoardModelLen=e.subarray(2,3),this.MinerModelLen=e.subarray(3,4),this.Name=a(e.subarray(4,68),this.NameLen),this.ChipModel=a(e.subarray(68,100),this.ChipModelLen),this.CtrlBoardModel=a(e.subarray(100,132),this.CtrlBoardModelLen),this.MinerModel=a(e.subarray(132,164),this.MinerModelLen),this.DataOffset=r(e.subarray(164,168)),this.DataSize=r(e.subarray(168,172))}printfItem(){console.log("read item:"),console.log("namelen 0x"+this.NameLen.toString(16)),console.log("chipmodellen 0x"+this.ChipModelLen.toString(16)),console.log("ctrlboardmodellen 0x"+this.CtrlBoardModelLen.toString(16)),console.log("minermodellen 0x"+this.MinerModelLen.toString(16)),console.log("name "+this.Name),console.log("chipmodel "+this.ChipModel),console.log("ctrlboardmodel "+this.CtrlBoardModel),console.log("minermodel "+this.MinerModel),console.log("dataoffset 0x"+this.DataOffset.toString(16)),console.log("datasize 0x"+this.DataSize.toString(16))}}function a(e,t=256){var n="",r=e.length;t<e.length&&(r=t);for(var i=0;i<r;i++)n+=String.fromCharCode(e[i]);return n}t.default=class{constructor(){this.READ_AS_TEXT=1,this.READ_AS_BINARY_STRING=2,this.READ_AS_ARRAY_BUFFER=3,this.READ_AS_DATA_URL=4,this.reader=[],this.flag=[],this.sizeMap=[],this.fileCount=0,this.loadedMap=[],this.totalLoaded=0,this.loaded=0,this.total=0,this.progress=0,this.allProgress=[],this.hdr=new i,this.items=[],this.status=0,this.sum=0,this.oldsum=0,this.matched=!1,this.table=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117]}readAsText(e,t,n,r="utf-8"){this.allProgress[++this.fileCount]=[],this.flag[this.fileCount]=[],this.loadedMap[this.fileCount]=[],this.total+=e.size,this.reader[this.fileCount]=new FileReader,this.sizeMap[this.fileCount]=e.size,console.log("read as text ~"),this.initReader(this.READ_AS_TEXT,this.fileCount,n,e,t),this.reader[this.fileCount].readAsText(0===n?e:this.blobSlice(e,0,n),r)}readAsBinaryString(e,t,n){this.allProgress[++this.fileCount]=[],this.flag[this.fileCount]=[],this.loadedMap[this.fileCount]=[],this.total+=e.size,this.reader[this.fileCount]=new FileReader,this.sizeMap[this.fileCount]=e.size,this.initReader(this.READ_AS_BINARY_STRING,this.fileCount,n,e,t),this.reader[this.fileCount].readAsBinaryString(0===n?e:this.blobSlice(e,0,n))}readAsArrayBuffer(e,t,n,r,i){this.allProgress[++this.fileCount]=[],this.flag[this.fileCount]=[],this.loadedMap[this.fileCount]=[],this.total+=e.size,this.reader[this.fileCount]=new FileReader,this.sizeMap[this.fileCount]=e.size,console.log("read as array buffer ~ filesize:"+e.size+" type:"+this.READ_AS_ARRAY_BUFFER),this.initReader(this.READ_AS_ARRAY_BUFFER,this.fileCount,n,e,t,r,i),this.reader[this.fileCount].readAsArrayBuffer(0===n?e:this.blobSlice(e,0,n))}checkHeader(e,t){var n=new FileReader,i=e.size,o=0,a=this;n.onload=function(s){var l=function(e,t,n){t==window.undefined&&(t=0);t=(-1^t)>>>0;for(var r=0,i=e.byteLength;r<i;r++)t=t>>>8^n[255&(t^e[r])];return(-1^t)>>>0};if(0===o){var c=new Uint8Array(s.target.result).subarray(0,36);a.oldsum=r(c.subarray(24,28)),c[24]=0,c[25]=0,c[26]=0,c[27]=0,a.sum=l(c,0,a.table),a.sum=l(new Uint8Array(s.target.result).subarray(36,16384),a.sum,a.table),console.log("start read result len:",s.target.result.byteLength)}else a.sum=l(new Uint8Array(s.target.result).subarray(16*o*1024,s.loaded),a.sum,a.table),console.log("crc32 read result len:",s.target.result.byteLength,"sum:0x"+a.sum.toString(16));if(console.log("result.load:",s.loaded,"filesize:",i),s.loaded>=i){var d=Boolean(!1);return a.sum===a.oldsum&&0!=a.sum&&(d=Boolean(!0)),t(d,a.sum.toString(16)+"->"+a.oldsum.toString(16)),void console.log("read end sum=0x",a.sum.toString(16),"->oldsum:",a.oldsum.toString(16),"checked:",d)}o++,n.readAsArrayBuffer(e,16*o*1024,16*(o+1)*1024)},n.readAsArrayBuffer(this.blobSlice(e,0,16384))}readAsDataURL(e,t){var n=this,r=this.reader[++this.fileCount]=new FileReader;r.onload=function(e){t(e.target.result),delete n.reader[n.fileCount],n.fileCount--},r.readAsDataURL(e)}initReader(e,t,n,r,i,a="",s=""){var l=0,c=this,d=function(e){c.loadedMap[t]=n*l+e.loaded-n,c.loaded=0,c.loadedMap.forEach((function(e){c.loaded+=e}),this),c.allProgress[t]=(c.loadedMap[t]/c.sizeMap[t]*100).toFixed(2),c.progress=(c.loaded/c.total*100).toFixed(2),console.log("total: "+c.total),console.log("loaded: "+c.loaded),console.log(t+": "+c.allProgress[t]+"%"),console.log("\n")};console.log("initreader type:",e),c.reader[t].onload=function(u){var f=null;if(e===this.READ_AS_TEXT){console.log("======================"+e+" this:"+this.READ_AS_TEXT);for(var h=u.target.result,p=0,g=0;g<h.length;++g)"\n"!==h[g]&&"\r"!==h[g]&&g!==h.length-1||(i(h.slice(p,g)),p=g)}else if(console.log("---------------------"),e===c.READ_AS_ARRAY_BUFFER)if(0===l){var m=new Uint8Array(u.target.result).subarray(0,36);c.hdr.parseHdr(m);var A=new Uint8Array(u.target.result).subarray(36,c.hdr.ItemSize*c.hdr.ItemCount+36);for(g=0;g<c.hdr.ItemCount;g++){var b=new o;b.parseItem(A.subarray(g*c.hdr.ItemSize,(g+1)*c.hdr.ItemSize)),c.items[g]=b}var v=-1;if(""!=a)for(g=0;g<c.hdr.ItemCount;g++)if(c.items[g].MinerModel===a&&c.items[g].CtrlBoardModel===s){console.log("find file miner_type:",a," subtype:",s),v=g;break}if(-1===v)return console.log("can not find minertype file,minertype:",a),c.matched=!1,void i(u.target.result,c.matched);c.matched=!0,f=c.items[v],c.total=f.DataSize,c.sizeMap[t]=f.DataSize,c.loadedMap[t]=0,c.loaded=0}else console.log("call back data length:",u.target.result.byteLength),i(u.target.result,c.matched);else i(u.target.result);if(null!==f||0!=l){if(console.log("start :",l,"step:",n),0!=l&&d(u),0!==n){if(console.log("loadmap: "+c.loadedMap[t]+" sizemap: "+c.sizeMap[t]),!(c.loadedMap[t]<c.sizeMap[t]))return delete c.reader[t],void c.fileCount--;l++,console.log("read blob targetItem offset:"+f.DataOffset+" size:"+f.DataSize),function(e,n,r,i){var o=c.blobSlice(i,n,n+r);e===c.READ_AS_TEXT?c.reader[t].readAsText(o):e===c.READ_AS_BINARY_STRING?c.reader[t].readAsBinaryString(o):e===c.READ_AS_ARRAY_BUFFER&&c.reader[t].readAsArrayBuffer(o)}(e,f.DataOffset,f.DataSize,r)}}else console.log("can not get invalid file in container")},c.reader[t].onprogress=function(e){0!=l&&d(e)}}read(e,t,n,r){if(this.allProgress[++this.fileCount]=[],this.flag[this.fileCount]=[],this.loadedMap[this.fileCount]=[],this.total+=t.size,this.reader[this.fileCount]=new FileReader,this.sizeMap[this.fileCount]=t.size,e===this.READ_AS_TEXT)this.initReader(this.READ_AS_TEXT,this.fileCount,r,t,n),this.reader[this.fileCount].readAsText(0===r?t:i.blobSlice(t,0,1024*r));else if(e===this.READ_AS_BINARY_STRING)this.initReader(this.READ_AS_BINARY_STRING,this.fileCount,r,t,n),this.reader[this.fileCount].readAsBinaryString(0===r?t:i.blobSlice(t,0,1024*r));else if(e===this.READ_AS_ARRAY_BUFFER)this.initReader(this.READ_AS_ARRAY_BUFFER,this.fileCount,r,t,n),this.reader[this.fileCount].readAsArrayBuffer(0===r?t:i.blobSlice(t,0,1024*r));else if(e===this.READ_AS_DATA_URL){var i=this;i.reader[i.fileCount].onload=function(e){n(e.target.result),delete i.reader[i.fileCount],i.fileCount--},i.reader[i.fileCount].readAsDataURL(t)}}blobSlice(e,t,n){return e.slice?e.slice(t,n):e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):null}createProcessBar(){var e=document.createElement("progress");return e.max=100,e}getProgress(){return this.progress}getOneProgress(e){return this.allProgress[e]}getProgressBar(){return this.progressBar}getKums(e){e(this.sum.toString(16))}}}});
