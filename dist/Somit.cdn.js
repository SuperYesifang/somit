(()=>{"use strict";function t(r){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(r)}function r(t,r){for(var i=0;i<r.length;i++){var o=r[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,e(o.key),o)}}function e(r){var e=function(r,e){if("object"!=t(r)||!r)return r;var i=r[Symbol.toPrimitive];if(void 0!==i){var o=i.call(r,"string");if("object"!=t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(r)}(r);return"symbol"==t(e)?e:String(e)}const i=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.ignoreError,i=void 0!==r&&r,o=t.lazyTime,n=void 0===o?1500:o,u=t.debug,l=void 0!==u&&u;!function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e),this.ignoreError=null!=i&&i,this.lazyTime=null!=n?n:1500,this.mittGroup={},this.lazyGroup={},this.debug=l}var i,o;return i=e,o=[{key:"on",value:function(r,e){var i=this;if(this.debug&&console.log("【Somit】debug::call on(event, callback)",r,back),e)if("string"==typeof r||"symbol"===t(r)){if(this.mittGroup[r])return this.mittGroup[r].push(e);this.mittGroup[r]=[e]}else if(Array.isArray(r))return r.reduce((function(t,r){return t.push(i.on(r,e)),t}),[])}},{key:"off",value:function(r,e){var i=this;if(this.debug&&console.log("【Somit】debug::call off(event, callback)",r,back),"string"==typeof r||"symbol"===t(r)){if(this.mittGroup[r])if(void 0!==e){var o=this.mittGroup[r].findIndex((function(t){return t===e}));if(-1!==o)return this.mittGroup[r].splice(o,1),!0}else delete this.mittGroup[r];else if(!this.ignoreError)throw new Error("event '".concat(String(r),"' it doesn't exist"))}else if(Array.isArray(r))return r.reduce((function(t,r){return t.push(i.off(r,e)),t}),[])}},{key:"emit",value:function(r){for(var e,i=this,o=arguments.length,n=new Array(o>1?o-1:0),u=1;u<o;u++)n[u-1]=arguments[u];if(this.debug&&(e=console).log.apply(e,["【Somit】debug::call emit(event, args...)",r].concat(n)),"string"==typeof r||"symbol"===t(r)){if(this.mittGroup[r]){var l=this.mittGroup[r].map((function(t){return t.apply(void 0,n)}));return l.length>1?l:l[0]}if(!this.ignoreError)throw new Error("event '".concat(String(r),"' it doesn't exist"))}else if(Array.isArray(r))return r.reduce((function(t,r){return t.push(i.emit.apply(i,[r].concat(n))),t}),[])}},{key:"lazyEmit",value:function(t){for(var r,e=this,i=arguments.length,o=new Array(i>1?i-1:0),n=1;n<i;n++)o[n-1]=arguments[n];return this.debug&&(r=console).log.apply(r,["【Somit】debug::call lazyEmit(event, args...)",t].concat(o)),new Promise((function(r){var i;if(e.lazyGroup[t]&&(clearTimeout(e.lazyGroup[t].timer),e.lazyGroup[t]=null),e.mittGroup[t])e.lazyGroup[t]={fn:(i=e.emit).bind.apply(i,[e,t].concat(o))},e.lazyGroup[t].timer=setTimeout((function(){return r(e.lazyGroup[t].fn())}),e.lazyTime);else if(!e.ignoreError)throw new Error("event '".concat(String(t),"' it doesn't exist"))}))}}],o&&r(i.prototype,o),Object.defineProperty(i,"prototype",{writable:!1}),e}();window.Somit=i})();