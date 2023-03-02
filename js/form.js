/*
 Copyright (c) 2008 Yii Software LLC
 @license http://www.yiiframework.com/license/
 @author Qiang Xue <qiang.xue@gmail.com>
 @since 2.0
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(c,k,g){c instanceof String&&(c=String(c));for(var f=c.length,a=0;a<f;a++){var e=c[a];if(k.call(g,e,a,c))return{i:a,v:e}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(c,k,g){c!=Array.prototype&&c!=Object.prototype&&(c[k]=g.value)};$jscomp.getGlobal=function(c){return"undefined"!=typeof window&&window===c?c:"undefined"!=typeof global&&null!=global?global:c};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(c,k,g,f){if(k){g=$jscomp.global;c=c.split(".");for(f=0;f<c.length-1;f++){var a=c[f];a in g||(g[a]={});g=g[a]}c=c[c.length-1];f=g[c];k=k(f);k!=f&&null!=k&&$jscomp.defineProperty(g,c,{configurable:!0,writable:!0,value:k})}};$jscomp.polyfill("Array.prototype.find",function(c){return c?c:function(c,g){return $jscomp.findInternal(this,c,g).v}},"es6","es3");$jscomp.arrayIteratorImpl=function(c){var k=0;return function(){return k<c.length?{done:!1,value:c[k++]}:{done:!0}}};
$jscomp.arrayIterator=function(c){return{next:$jscomp.arrayIteratorImpl(c)}};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.SymbolClass=function(c,k){this.$jscomp$symbol$id_=c;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:k})};$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};
$jscomp.Symbol=function(){function c(g){if(this instanceof c)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(g||"")+"_"+k++,g)}var k=0;return c}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var c=$jscomp.global.Symbol.iterator;c||(c=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[c]&&$jscomp.defineProperty(Array.prototype,c,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var c=$jscomp.global.Symbol.asyncIterator;c||(c=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(c){$jscomp.initSymbolIterator();c={next:c};c[$jscomp.global.Symbol.iterator]=function(){return this};return c};
$jscomp.iteratorFromArray=function(c,k){$jscomp.initSymbolIterator();c instanceof String&&(c+="");var g=0,f={next:function(){if(g<c.length){var a=g++;return{value:k(a,c[a]),done:!1}}f.next=function(){return{done:!0,value:void 0}};return f.next()}};f[Symbol.iterator]=function(){return f};return f};$jscomp.polyfill("Array.prototype.keys",function(c){return c?c:function(){return $jscomp.iteratorFromArray(this,function(c){return c})}},"es6","es3");
window.yii=function(c){function k(){c.ajaxPrefilter(function(c,a,b){!c.crossDomain&&d.getCsrfParam()&&b.setRequestHeader("X-CSRF-Token",d.getCsrfToken())});d.refreshCsrfToken()}function g(){c(document).ajaxComplete(function(c,a){(c=a&&a.getResponseHeader("X-Redirect"))&&window.location.assign(c)})}function f(){var a={};c("script[src]").each(function(){var c=b(this.src);a[c]=!0});c.ajaxPrefilter("script",function(c,d,h){if("jsonp"!=c.dataType){c=b(c.url);d=!0===a[c]&&!e(c);var q=void 0!==a[c]&&!0===
a[c].xhrDone;if(d||q)h.abort();else{if(void 0===a[c]||!0===a[c])a[c]={xhrList:[],xhrDone:!1};h.done(function(c,b,d){if(!0!==a[d.yiiUrl].xhrDone){a[d.yiiUrl].xhrDone=!0;c=0;for(b=a[d.yiiUrl].xhrList.length;c<b;c++){var h=a[d.yiiUrl].xhrList[c];h&&h.readyState!==XMLHttpRequest.DONE&&h.abort()}a[d.yiiUrl]=!0}}).fail(function(c,b){if("abort"!==b){delete a[c.yiiUrl].xhrList[c.yiiIndex];b=!0;for(var d=0,h=a[c.yiiUrl].xhrList.length;d<h;d++)a[c.yiiUrl].xhrList[d]&&(b=!1);b&&delete a[c.yiiUrl]}});h.yiiIndex=
a[c].xhrList.length;h.yiiUrl=c;a[c].xhrList[h.yiiIndex]=h}}});c(document).ajaxComplete(function(){var a=[];c("link[rel=stylesheet]").each(function(){var d=b(this.href);e(d)||(-1===c.inArray(d,a)?a.push(d):c(this).remove())})})}function a(){var a=function(a){var b=c(this),h=b.data("method"),e=b.data("confirm"),f=b.data("form");if(void 0===h&&void 0===e&&void 0===f)return!0;void 0!==e&&!1!==e&&""!==e?c.proxy(d.confirm,this)(e,function(){d.handleAction(b,a)}):d.handleAction(b,a);a.stopImmediatePropagation();
return!1};c(document).on("click.yii",d.clickableSelector,a).on("change.yii",d.changeableSelector,a)}function e(c){for(var a=0;a<d.reloadableScripts.length;a++){var h=b(d.reloadableScripts[a]);if(!0===(new RegExp("^"+h.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&").split("\\*").join(".+")+"$")).test(c))return!0}return!1}function b(a){return"/"===a.charAt(0)?d.getBaseCurrentUrl()+a:a}var d={reloadableScripts:[],clickableSelector:'a, button, input[type="submit"], input[type="button"], input[type="reset"], input[type="image"]',
changeableSelector:"select, input, textarea",getCsrfParam:function(){return c("meta[name=csrf-param]").attr("content")},getCsrfToken:function(){return c("meta[name=csrf-token]").attr("content")},setCsrfToken:function(a,b){c("meta[name=csrf-param]").attr("content",a);c("meta[name=csrf-token]").attr("content",b)},refreshCsrfToken:function(){var a=d.getCsrfToken();a&&c('form input[name="'+d.getCsrfParam()+'"]').val(a)},confirm:function(a,c,b){window.confirm(a)?!c||c():!b||b()},handleAction:function(a,
b){var e=a.attr("data-form")?c("#"+a.attr("data-form")):a.closest("form"),h=!a.data("method")&&e?e.attr("method"):a.data("method"),f=a.attr("href"),q=f&&"#"!==f,g=a.data("params"),k=g&&c.isPlainObject(g),r=a.data("pjax");r=void 0!==r&&0!==r&&c.support.pjax;var u={};c.each("submit reset elements length name acceptCharset action enctype method target".split(" "),function(a,c){k&&g.hasOwnProperty(c)&&console.error("Parameter name '"+c+"' conflicts with a same named form property. Please use another name.")});
if(r){var n=a.data("pjax-container");void 0!==n&&n.length||(n=a.closest("[data-pjax-container]").attr("id")?"#"+a.closest("[data-pjax-container]").attr("id"):"");n.length||(n="body");u={container:n,push:!!a.data("pjax-push-state"),replace:!!a.data("pjax-replace-state"),scrollTo:a.data("pjax-scrollto"),pushRedirect:a.data("pjax-push-redirect"),replaceRedirect:a.data("pjax-replace-redirect"),skipOuterContainers:a.data("pjax-skip-outer-containers"),timeout:a.data("pjax-timeout"),originalEvent:b,originalTarget:a}}if(void 0===
h)if(q)r?c.pjax.click(b,u):window.location.assign(f);else{if(a.is(":submit")&&e.length){if(r)e.on("submit",function(a){c.pjax.submit(a,u)});e.trigger("submit")}}else{var p=!e.length;if(p)q||(f=d.getCurrentUrl()),e=c("<form/>",{method:h,action:f}),(b=a.attr("target"))&&e.attr("target",b),/(get|post)/i.test(h)||(e.append(c("<input/>",{name:"_method",value:h,type:"hidden"})),h="post",e.attr("method",h)),/post/i.test(h)&&(h=d.getCsrfParam())&&e.append(c("<input/>",{name:h,value:d.getCsrfToken(),type:"hidden"})),
e.hide().appendTo("body");else{var l=e.attr("method");e.attr("method",h);if(q){var m=e.attr("action");e.attr("action",f)}}if(h=e.data("yiiActiveForm"))h.submitObject=a;k&&c.each(g,function(a,b){e.append(c("<input/>").attr({name:a,value:b,type:"hidden"}))});if(r)e.on("submit",function(a){c.pjax.submit(a,u)});e.trigger("submit");c.when(e.data("yiiSubmitFinalizePromise")).done(function(){p?e.remove():(void 0!==m&&e.attr("action",m),e.attr("method",l),k&&c.each(g,function(a){c('input[name="'+a+'"]',e).remove()}))})}},
getQueryParams:function(a){var b=a.indexOf("?");if(0>b)return{};a=c.grep(a.substring(b+1).split("#")[0].split("&"),function(a){return""!==a});b={};for(var d=0,e=a.length;d<e;d++){var h=a[d].split("="),f=decodeURIComponent(h[0].replace(/\+/g,"%20"));h=decodeURIComponent(h[1].replace(/\+/g,"%20"));f.length&&(void 0===b[f]?b[f]=h||"":(c.isArray(b[f])||(b[f]=[b[f]]),b[f].push(h||"")))}return b},initModule:function(a){if(void 0===a.isActive||a.isActive)c.isFunction(a.init)&&a.init(),c.each(a,function(){c.isPlainObject(this)&&
d.initModule(this)})},init:function(){k();g();f();a()},getBaseCurrentUrl:function(){return window.location.protocol+"//"+window.location.host},getCurrentUrl:function(){return window.location.href}};return d}(window.jQuery);window.jQuery(function(){window.yii.initModule(window.yii)});
(function(c){c.fn.yiiActiveForm=function(a){return e[a]?e[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!==typeof a&&a?(c.error("Method "+a+" does not exist on jQuery.yiiActiveForm"),!1):e.init.apply(this,arguments)};var k={encodeErrorSummary:!0,errorSummary:".error-summary",validateOnSubmit:!0,errorCssClass:"has-error",successCssClass:"has-success",validatingCssClass:"validating",ajaxParam:"ajax",ajaxDataType:"json",validationUrl:void 0,scrollToError:!0,scrollToErrorOffset:0,validationStateOn:"container"},
g={id:void 0,name:void 0,container:void 0,input:void 0,error:".help-block",encodeError:!0,validateOnChange:!0,validateOnBlur:!0,validateOnType:!1,validationDelay:500,enableAjaxValidation:!1,validate:void 0,status:0,cancelled:!1,value:void 0,updateAriaInvalid:!0},f,a=function(a){f&&(f.resolve(),f=void 0,a.removeData("yiiSubmitFinalizePromise"))},e={init:function(a,m){return this.each(function(){var d=c(this);if(!d.data("yiiActiveForm")){var l=c.extend({},k,m||{});void 0===l.validationUrl&&(l.validationUrl=
d.attr("action"));c.each(a,function(m){a[m]=c.extend({value:n(d,this)},g,this);b(d,a[m])});d.data("yiiActiveForm",{settings:l,attributes:a,submitting:!1,validated:!1,options:x(d)});d.on("reset.yiiActiveForm",e.resetForm);l.validateOnSubmit&&(d.on("mouseup.yiiActiveForm keyup.yiiActiveForm",":submit",function(){d.data("yiiActiveForm").submitObject=c(this)}),d.on("submit.yiiActiveForm",e.submitForm));l=c.Event("afterInit");d.trigger(l)}})},add:function(a){var d=c(this);a=c.extend({value:n(d,a)},g,a);
d.data("yiiActiveForm").attributes.push(a);b(d,a)},remove:function(a){var b=c(this),d=b.data("yiiActiveForm").attributes,l=-1,e=void 0;c.each(d,function(c){if(d[c].id==a)return l=c,e=d[c],!1});0<=l&&(d.splice(l,1),p(b,e).off(".yiiActiveForm"));return e},validateAttribute:function(a){a=e.find.call(this,a);void 0!=a&&d(c(this),a,!0)},find:function(a){var b=c(this).data("yiiActiveForm").attributes,d=void 0;c.each(b,function(c){if(b[c].id==a)return d=b[c],!1});return d},destroy:function(){return this.each(function(){c(this).off(".yiiActiveForm");
c(this).removeData("yiiActiveForm")})},data:function(){return this.data("yiiActiveForm")},validate:function(b){b&&(c(this).data("yiiActiveForm").submitting=!0);var d=c(this),e=d.data("yiiActiveForm"),l=!1,f={},h=q(),g=e.submitting;if(g&&(b=c.Event("beforeValidate"),d.trigger(b,[f,h]),!1===b.result)){e.submitting=!1;a(d);return}c.each(e.attributes,function(){this.$form=d;var a=p(d,this);if(a.is(":disabled")||a.length&&"select"===a[0].tagName.toLowerCase()&&(!a[0].options.length||1===a[0].options.length&&
""===a[0].options[0].value))return!0;this.cancelled=!1;if(e.submitting||2===this.status||3===this.status){a=f[this.id];void 0===a&&(a=[],f[this.id]=a);var b=c.Event("beforeValidateAttribute");d.trigger(b,[this,a,h]);!1!==b.result?(this.validate&&this.validate(this,n(d,this),a,h,d),this.enableAjaxValidation&&(l=!0)):this.cancelled=!0}});c.when.apply(this,h).always(function(){for(var b in f)0===f[b].length&&delete f[b];if(l&&(c.isEmptyObject(f)||e.submitting)){b=e.submitObject;var m="&"+e.settings.ajaxParam+
"="+d.attr("id");b&&b.length&&b.attr("name")&&(m+="&"+b.attr("name")+"="+b.attr("value"));c.ajax({url:e.settings.validationUrl,type:d.attr("method"),data:d.serialize()+m,dataType:e.settings.ajaxDataType,complete:function(a,b){d.trigger("ajaxComplete",[a,b])},beforeSend:function(a,b){d.trigger("ajaxBeforeSend",[a,b])},success:function(a){null!==a&&"object"===typeof a?(c.each(e.attributes,function(){this.enableAjaxValidation&&!this.cancelled||delete a[this.id]}),v(d,c.extend(f,a),g)):v(d,f,g)},error:function(){e.submitting=
!1;a(d)}})}else e.submitting?window.setTimeout(function(){v(d,f,g)},200):v(d,f,g)})},submitForm:function(){var b=c(this),d=b.data("yiiActiveForm");if(d.validated){d.submitting=!1;var h=c.Event("beforeSubmit");b.trigger(h);if(!1===h.result)return d.validated=!1,a(b),!1;d=b.data("yiiActiveForm").submitObject||b.find(":submit:first");d.length&&"submit"==d.attr("type")&&d.attr("name")&&(h=c('input[type="hidden"][name="'+d.attr("name")+'"]',b),h.length?h.attr("value",d.attr("value")):c("<input>").attr({type:"hidden",
name:d.attr("name"),value:d.attr("value")}).appendTo(b));return!0}f=c.Deferred();b.data("yiiSubmitFinalizePromise",f.promise());void 0!==d.settings.timer&&clearTimeout(d.settings.timer);d.submitting=!0;e.validate.call(b);return!1},resetForm:function(){var a=c(this),b=a.data("yiiActiveForm");window.setTimeout(function(){c.each(b.attributes,function(){this.value=n(a,this);this.status=0;var c=a.find(this.container),d=p(a,this);("input"===b.settings.validationStateOn?d:c).removeClass(b.settings.validatingCssClass+
" "+b.settings.errorCssClass+" "+b.settings.successCssClass);c.find(this.error).html("")});a.find(b.settings.errorSummary).hide().find("ul").html("")},1)},updateMessages:function(a,b){var d=c(this),e=d.data("yiiActiveForm");c.each(e.attributes,function(){w(d,this,a)});b&&u(d,a)},updateAttribute:function(a,b){var d=e.find.call(this,a);if(void 0!=d){var f={};f[a]=b;w(c(this),d,f)}}},b=function(a,b){var e=p(a,b);if(b.validateOnChange)e.on("change.yiiActiveForm",function(){d(a,b,!1)});if(b.validateOnBlur)e.on("blur.yiiActiveForm",
function(){0!=b.status&&1!=b.status||d(a,b,!0)});if(b.validateOnType)e.on("keyup.yiiActiveForm",function(e){-1===c.inArray(e.which,[16,17,18,37,38,39,40])&&b.value!==n(a,b)&&d(a,b,!1,b.validationDelay)})},d=function(a,b,d,f){var l=a.data("yiiActiveForm");d&&(b.status=2);c.each(l.attributes,function(){var b=this.value,c=n(a,this);if(b instanceof Object)b=h(b,c);else if(Array.isArray(b))b:if(Array.isArray(b)&&Array.isArray(c)&&b.length===c.length){for(var e=0;e<b.length;e+=1)if(b[e]!==c[e]){b=!1;break b}b=
!0}else b=!1;else b=b===c;b||(this.status=2,d=!0)});d&&(void 0!==l.settings.timer&&clearTimeout(l.settings.timer),l.settings.timer=window.setTimeout(function(){l.submitting||a.is(":hidden")||(c.each(l.attributes,function(){2===this.status&&(this.status=3,a.find(this.container).addClass(l.settings.validatingCssClass))}),e.validate.call(a))},f?f:200))},h=function(a,b){if(!(a instanceof Object&&b instanceof Object))return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=
0;d<c.length;d+=1)if(!b.hasOwnProperty(c[d])||a[c[d]]!==b[c[d]])return!1;return!0},q=function(){var a=[];a.add=function(a){this.push(new c.Deferred(a))};return a},t=["action","target","method","enctype"],x=function(a){for(var b={},c=0;c<t.length;c++)b[t[c]]=a.attr(t[c]);return b},y=function(a,b){for(var c=0;c<t.length;c++){var d=b.attr("form"+t[c]);d&&a.attr(t[c],d)}},z=function(a){for(var b=a.data("yiiActiveForm"),c=0;c<t.length;c++)a.attr(t[c],b.options[t[c]]||null)},v=function(b,d,e){var f=b.data("yiiActiveForm");
if(void 0===f)return!1;var h=[],l;c.each(f.attributes,function(){var a=e&&w(b,this,d)||!e&&r(b,this,d);l=p(b,this);l.is(":disabled")||this.cancelled||!a||h.push(this)});b.trigger("afterValidate",[d,h]);if(e)if(u(b,d),h.length){if(f.settings.scrollToError){var m=b.find(c.map(h,function(a){return a.input}).join(",")).first().closest(":visible").offset().top-f.settings.scrollToErrorOffset;0>m?m=0:m>c(document).height()&&(m=c(document).height());var g=c(window).scrollTop();(m<g||m>g+c(window).height())&&
c(window).scrollTop(m)}f.submitting=!1}else f.validated=!0,f.submitObject&&y(b,f.submitObject),b.submit(),f.submitObject&&z(b);else c.each(f.attributes,function(){this.cancelled||2!==this.status&&3!==this.status||w(b,this,d)});a(b)},w=function(a,b,d){var e=a.data("yiiActiveForm"),f=p(a,b),h=r(a,b,d);c.isArray(d[b.id])||(d[b.id]=[]);b.status=1;if(f.length){var l=a.find(b.container),g=l.find(b.error);b.updateAriaInvalid&&a.find(b.input).attr("aria-invalid",h?"true":"false");f="input"===e.settings.validationStateOn?
f:l;h?(b.encodeError?g.text(d[b.id][0]):g.html(d[b.id][0]),f.removeClass(e.settings.validatingCssClass+" "+e.settings.successCssClass).addClass(e.settings.errorCssClass)):(g.empty(),f.removeClass(e.settings.validatingCssClass+" "+e.settings.errorCssClass+" ").addClass(e.settings.successCssClass));b.value=n(a,b)}a.trigger("afterValidateAttribute",[b,d[b.id]]);return h},r=function(a,b,d){a=p(a,b);var e=!1;c.isArray(d[b.id])||(d[b.id]=[]);a.length&&(e=0<d[b.id].length);return e},u=function(a,b){var d=
a.data("yiiActiveForm");a=a.find(d.settings.errorSummary);var e=a.find("ul").empty();a.length&&b&&(c.each(d.attributes,function(){if(c.isArray(b[this.id])&&b[this.id].length){var a=c("<li/>");d.settings.encodeErrorSummary?a.text(b[this.id][0]):a.html(b[this.id][0]);e.append(a)}}),a.toggle(0<e.find("li").length))},n=function(a,b){b=p(a,b);var c=b.attr("type");return"checkbox"===c||"radio"===c?(c=b.filter(":checked"),c.length||(c=a.find('input[type=hidden][name="'+b.attr("name")+'"]')),c.val()):b.val()},
p=function(a,b){a=a.find(b.input);return a.length&&"div"===a[0].tagName.toLowerCase()?a.find("input"):a}})(window.jQuery);
yii.validation=function(c){function k(a,e,b){if("undefined"===typeof File)return[];a=c(a.input,a.$form).get(0);if("undefined"===typeof a)return[];a=a.files;return a?0===a.length?(b.skipOnEmpty||e.push(b.uploadRequired),[]):b.maxFiles&&b.maxFiles<a.length?(e.push(b.tooMany),[]):a:(e.push(b.message),[])}function g(a,c,b){if(b.extensions&&0<b.extensions.length){var d=a.name.lastIndexOf(".");d=~d?a.name.substr(d+1,a.name.length).toLowerCase():"";~b.extensions.indexOf(d)||c.push(b.wrongExtension.replace(/\{file\}/g,
a.name))}if(b.mimeTypes&&0<b.mimeTypes.length){a:{d=b.mimeTypes;for(var e=a.type,f=0,g=d.length;f<g;f++)if((new RegExp(d[f])).test(e)){d=!0;break a}d=!1}d||c.push(b.wrongMimeType.replace(/\{file\}/g,a.name))}b.maxSize&&b.maxSize<a.size&&c.push(b.tooBig.replace(/\{file\}/g,a.name));b.minSize&&b.minSize>a.size&&c.push(b.tooSmall.replace(/\{file\}/g,a.name))}var f={isEmpty:function(a){return null===a||void 0===a||c.isArray(a)&&0===a.length||""===a},addMessage:function(a,c,b){a.push(c.replace(/\{value\}/g,
b))},required:function(a,e,b){var d=!1;if(void 0===b.requiredValue){var h="string"==typeof a||a instanceof String;if(b.strict&&void 0!==a||!b.strict&&!f.isEmpty(h?c.trim(a):a))d=!0}else if(!b.strict&&a==b.requiredValue||b.strict&&a===b.requiredValue)d=!0;d||f.addMessage(e,b.message,a)},"boolean":function(a,c,b){b.skipOnEmpty&&f.isEmpty(a)||(b.strict||a!=b.trueValue&&a!=b.falseValue)&&(!b.strict||a!==b.trueValue&&a!==b.falseValue)&&f.addMessage(c,b.message,a)},string:function(a,c,b){b.skipOnEmpty&&
f.isEmpty(a)||("string"!==typeof a?f.addMessage(c,b.message,a):void 0!==b.is&&a.length!=b.is?f.addMessage(c,b.notEqual,a):(void 0!==b.min&&a.length<b.min&&f.addMessage(c,b.tooShort,a),void 0!==b.max&&a.length>b.max&&f.addMessage(c,b.tooLong,a)))},file:function(a,e,b){a=k(a,e,b);c.each(a,function(a,c){g(c,e,b)})},image:function(a,e,b,d){a=k(a,e,b);c.each(a,function(a,q){g(q,e,b);"undefined"!==typeof FileReader&&(a=c.Deferred(),f.validateImage(q,e,b,a,new FileReader,new Image),d.push(a))})},validateImage:function(a,
c,b,d,f,g){g.onload=function(){b.minWidth&&g.width<b.minWidth&&c.push(b.underWidth.replace(/\{file\}/g,a.name));b.maxWidth&&g.width>b.maxWidth&&c.push(b.overWidth.replace(/\{file\}/g,a.name));b.minHeight&&g.height<b.minHeight&&c.push(b.underHeight.replace(/\{file\}/g,a.name));b.maxHeight&&g.height>b.maxHeight&&c.push(b.overHeight.replace(/\{file\}/g,a.name));d.resolve()};g.onerror=function(){c.push(b.notImage.replace(/\{file\}/g,a.name));d.resolve()};f.onload=function(){g.src=this.result};f.onerror=
function(){d.resolve()};f.readAsDataURL(a)},number:function(a,c,b){b.skipOnEmpty&&f.isEmpty(a)||("string"!==typeof a||b.pattern.test(a)?(void 0!==b.min&&a<b.min&&f.addMessage(c,b.tooSmall,a),void 0!==b.max&&a>b.max&&f.addMessage(c,b.tooBig,a)):f.addMessage(c,b.message,a))},range:function(a,e,b){if(!b.skipOnEmpty||!f.isEmpty(a))if(!b.allowArray&&c.isArray(a))f.addMessage(e,b.message,a);else{var d=!0;c.each(c.isArray(a)?a:[a],function(a,e){return-1==c.inArray(e,b.range)?d=!1:!0});void 0===b.not&&(b.not=
!1);b.not===d&&f.addMessage(e,b.message,a)}},regularExpression:function(a,c,b){b.skipOnEmpty&&f.isEmpty(a)||(!b.not&&!b.pattern.test(a)||b.not&&b.pattern.test(a))&&f.addMessage(c,b.message,a)},email:function(a,c,b){if(!b.skipOnEmpty||!f.isEmpty(a)){var d=/^((?:"?([^"]*)"?\s)?)(?:\s+)?(?:(<?)((.+)@([^>]+))(>?))$/.exec(a);if(null===d)d=!1;else{var e=d[5],g=d[6];b.enableIDN&&(e=punycode.toASCII(e),g=punycode.toASCII(g),a=d[1]+d[3]+e+"@"+g+d[7]);d=64<e.length?!1:254<(e+"@"+g).length?!1:b.pattern.test(a)||
b.allowName&&b.fullPattern.test(a)}d||f.addMessage(c,b.message,a)}},url:function(a,c,b){if(!b.skipOnEmpty||!f.isEmpty(a)){b.defaultScheme&&!/:\/\//.test(a)&&(a=b.defaultScheme+"://"+a);var d=!0;if(b.enableIDN){var e=/^([^:]+):\/\/([^\/]+)(.*)$/.exec(a);null===e?d=!1:a=e[1]+"://"+punycode.toASCII(e[2])+e[3]}d&&b.pattern.test(a)||f.addMessage(c,b.message,a)}},trim:function(a,e,b,d){a=a.find(e.input);if(a.is(":checkbox, :radio"))return d;d=a.val();b.skipOnEmpty&&f.isEmpty(d)||(d=c.trim(d),a.val(d));
return d},captcha:function(a,e,b){if(!b.skipOnEmpty||!f.isEmpty(a)){var d=c("body").data(b.hashKey);d=null==d?b.hash:d[b.caseSensitive?0:1];for(var h=b.caseSensitive?a:a.toLowerCase(),g=h.length-1,k=0;0<=g;--g)k+=h.charCodeAt(g);k!=d&&f.addMessage(e,b.message,a)}},compare:function(a,e,b,d){if(!b.skipOnEmpty||!f.isEmpty(a)){if(void 0===b.compareAttribute)d=b.compareValue;else{var h=c("#"+b.compareAttribute);h.length||(h=d.find('[name="'+b.compareAttributeName+'"]'));d=h.val()}"number"===b.type&&(a=
a?parseFloat(a):0,d=d?parseFloat(d):0);switch(b.operator){case "==":d=a==d;break;case "===":d=a===d;break;case "!=":d=a!=d;break;case "!==":d=a!==d;break;case ">":d=a>d;break;case ">=":d=a>=d;break;case "<":d=a<d;break;case "<=":d=a<=d;break;default:d=!1}d||f.addMessage(e,b.message,a)}},ip:function(a,c,b){if(!b.skipOnEmpty||!f.isEmpty(a)){var d=null,e=null,g=(new RegExp(b.ipParsePattern)).exec(a);g&&(d=g[1]||null,a=g[2],e=g[4]||null);!0===b.subnet&&null===e?f.addMessage(c,b.messages.noSubnet,a):!1===
b.subnet&&null!==e?f.addMessage(c,b.messages.hasSubnet,a):!1===b.negation&&null!==d?f.addMessage(c,b.messages.message,a):6==(-1===a.indexOf(":")?4:6)?((new RegExp(b.ipv6Pattern)).test(a)||f.addMessage(c,b.messages.message,a),b.ipv6||f.addMessage(c,b.messages.ipv6NotAllowed,a)):((new RegExp(b.ipv4Pattern)).test(a)||f.addMessage(c,b.messages.message,a),b.ipv4||f.addMessage(c,b.messages.ipv4NotAllowed,a))}}};return f}(jQuery);
