(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3cb83f90"],{"0350":function(t,e,i){t.exports=i.p+"img/social_networking.0dea0299.jpg"},"0481":function(t,e,i){"use strict";var a=i("23e7"),s=i("a2bf"),r=i("7b0b"),n=i("50c4"),o=i("a691"),c=i("65f0");a({target:"Array",proto:!0},{flat:function(){var t=arguments.length?arguments[0]:void 0,e=r(this),i=n(e.length),a=c(e,0);return a.length=s(a,e,e,i,0,void 0===t?1:o(t)),a}})},"10d2":function(t,e,i){"use strict";var a=i("8dd9");e["a"]=a["a"]},"24b2":function(t,e,i){"use strict";i("a9e3");var a=i("80d2"),s=i("2b0e");e["a"]=s["a"].extend({name:"measurable",props:{height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},computed:{measurableStyles:function(){var t={},e=Object(a["g"])(this.height),i=Object(a["g"])(this.minHeight),s=Object(a["g"])(this.minWidth),r=Object(a["g"])(this.maxHeight),n=Object(a["g"])(this.maxWidth),o=Object(a["g"])(this.width);return e&&(t.height=e),i&&(t.minHeight=i),s&&(t.minWidth=s),r&&(t.maxHeight=r),n&&(t.maxWidth=n),o&&(t.width=o),t}}})},"25a8":function(t,e,i){},"297c":function(t,e,i){"use strict";i("a9e3");var a=i("2b0e"),s=i("37c6");e["a"]=a["a"].extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress:function(){return!1===this.loading?null:this.$slots.progress||this.$createElement(s["a"],{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},"2acf":function(t,e,i){t.exports=i.p+"img/fb_splash_logo.a726b789.png"},3408:function(t,e,i){},"36a7":function(t,e,i){},"37c6":function(t,e,i){"use strict";var a=i("8e36");e["a"]=a["a"]},4069:function(t,e,i){var a=i("44d2");a("flat")},"4cc8":function(t,e,i){},"615b":function(t,e,i){},"6a64":function(t,e,i){"use strict";i("4cc8")},"6ece":function(t,e,i){},"7a20":function(t,e,i){},8212:function(t,e,i){"use strict";i("a9e3");var a=i("5530"),s=(i("3408"),i("a9ad")),r=i("24b2"),n=i("a236"),o=i("80d2"),c=i("58df");e["a"]=Object(c["a"])(s["a"],r["a"],n["a"]).extend({name:"v-avatar",props:{left:Boolean,right:Boolean,size:{type:[Number,String],default:48}},computed:{classes:function(){return Object(a["a"])({"v-avatar--left":this.left,"v-avatar--right":this.right},this.roundedClasses)},styles:function(){return Object(a["a"])({height:Object(o["g"])(this.size),minWidth:Object(o["g"])(this.size),width:Object(o["g"])(this.size)},this.measurableStyles)}},render:function(t){var e={staticClass:"v-avatar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),this.$slots.default)}})},8303:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"pa-4 d-flex justify-center align-center",staticStyle:{position:"relative"},attrs:{width:"100vw",flat:"",tile:"","min-height":"100vh",color:"#fff7df"}},[a("div",{staticClass:"custom-shape-divider-top"},[a("svg",{attrs:{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 120",preserveAspectRatio:"none"}},[a("path",{staticClass:"shape-fill",attrs:{d:"M1200 0L0 0 598.97 114.72 1200 0z"}})])]),a("div",{staticClass:"custom-shape-divider-bottom"},[a("svg",{attrs:{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 120",preserveAspectRatio:"none"}},[a("path",{staticClass:"shape-fill",attrs:{d:"M1200 0L0 0 598.97 114.72 1200 0z"}})])]),a("v-card",{staticClass:"mx-auto d-flex justify-center align-center flex-wrap",attrs:{flat:"",tile:"",color:"transparent","max-width":"1000"}},[a("v-card",{attrs:{width:t.fbCardWidth}},[a("div",{staticClass:"fb-page",attrs:{"data-href":"https://www.facebook.com/foodswipeonline","data-tabs":"timeline","data-width":"400","data-height":"","data-small-header":"false","data-adapt-container-width":"true","data-hide-cover":"false","data-show-facepile":"true"}},[a("blockquote",{staticClass:"fb-xfbml-parse-ignore",attrs:{cite:"https://www.facebook.com/foodswipeonline"}},[a("a",{attrs:{href:"https://www.facebook.com/foodswipeonline"}},[t._v("Food Swipe Food Delivery")])])])]),t.$vuetify.breakpoint.width>900?a("div",{staticClass:"px-12"}):t._e(),a("v-card",{attrs:{flat:"",color:"transparent",rounded:"","max-width":"600"}},[a("v-card-text",{staticClass:"text-center py-0"},[a("div",{staticClass:"text-uppercase"},[t._v(" Contact us here ")])]),a("v-card-text",{staticClass:"text-center"},[a("v-chip",{staticClass:"ma-1"},[a("v-icon",{attrs:{small:"",left:"",color:"primary"}},[t._v(" call ")]),a("a",{staticClass:"phone",attrs:{href:"tel:9802801073"}},[t._v(" 9802801073 ")])],1),a("v-chip",{staticClass:"ma-1"},[a("v-icon",{attrs:{small:"",left:"",color:"primary"}},[t._v(" call ")]),a("a",{staticClass:"phone",attrs:{href:"tel:9802801073"}},[t._v(" 980-6742220 ")])],1)],1),a("v-card-title",{staticClass:"text-center d-flex justify-center align-center"},[a("div",{staticClass:"section-sub-header"},[t._v(" Stay connected with us! ")])]),a("v-card",{staticClass:"mx-auto",attrs:{height:"250",width:t.$vuetify.breakpoint.width>900?"400":"60vw"}},[a("v-img",{attrs:{width:t.$vuetify.breakpoint.width>900?"400":"60vw",contain:"",src:i("0350"),height:"250"}})],1),a("div",{staticClass:"text-center"},[a("v-card-title",{staticClass:"text-uppercase d-flex justify-center reach-us"},[t._v(" Reach us on social media ")]),a("v-card-subtitle",[a("v-avatar",{staticClass:"elevation-4 mx-1 cursor",attrs:{size:"40",color:"transparent"},on:{click:function(e){return t.routeToFoodSwipeFacebookPage()}}},[a("v-img",{attrs:{src:i("2acf")}})],1),a("v-avatar",{staticClass:"elevation-4 mx-1 cursor",attrs:{size:"40",color:"transparent"},on:{click:function(e){return t.routeToFoodSwipeInstaPage()}}},[a("v-img",{attrs:{contain:"",src:i("8abc")}})],1)],1)],1)],1)],1)],1)},s=[],r={computed:{fbCardWidth:function(){return this.$vuetify.breakpoint.width>900||this.$vuetify.breakpoint.width>500?400:"80vw"}},methods:{routeToFoodSwipeFacebookPage:function(){window.open(this.$constants.facebookUrl,"_blank")},routeToFoodSwipeInstaPage:function(){window.open(this.$constants.facebookUrl,"_blank")}}},n=r,o=(i("a5bc"),i("6a64"),i("2877")),c=i("6544"),l=i.n(c),d=i("8212"),h=i("b0af"),u=i("99d9"),v=i("cc20"),f=i("132d"),g=i("adda"),p=Object(o["a"])(n,a,s,!1,null,"89d89076",null);e["default"]=p.exports;l()(p,{VAvatar:d["a"],VCard:h["a"],VCardSubtitle:u["b"],VCardText:u["c"],VCardTitle:u["d"],VChip:v["a"],VIcon:f["a"],VImg:g["a"]})},"8a79":function(t,e,i){"use strict";var a=i("23e7"),s=i("06cf").f,r=i("50c4"),n=i("5a34"),o=i("1d80"),c=i("ab13"),l=i("c430"),d="".endsWith,h=Math.min,u=c("endsWith"),v=!l&&!u&&!!function(){var t=s(String.prototype,"endsWith");return t&&!t.writable}();a({target:"String",proto:!0,forced:!v&&!u},{endsWith:function(t){var e=String(o(this));n(t);var i=arguments.length>1?arguments[1]:void 0,a=r(e.length),s=void 0===i?a:h(r(i),a),c=String(t);return d?d.call(e,c,s):e.slice(s-c.length,s)===c}})},"8abc":function(t,e,i){t.exports=i.p+"img/insta_splash_logo.c2471c2b.jpg"},"8dd9":function(t,e,i){"use strict";var a=i("5530"),s=(i("25a8"),i("7e2b")),r=i("a9ad"),n=i("c995"),o=i("24b2"),c=i("a236"),l=i("7560"),d=i("58df");e["a"]=Object(d["a"])(s["a"],r["a"],n["a"],o["a"],c["a"],l["a"]).extend({name:"v-sheet",props:{outlined:Boolean,shaped:Boolean,tag:{type:String,default:"div"}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])(Object(a["a"])({"v-sheet":!0,"v-sheet--outlined":this.outlined,"v-sheet--shaped":this.shaped},this.themeClasses),this.elevationClasses),this.roundedClasses)},styles:function(){return this.measurableStyles}},render:function(t){var e={class:this.classes,style:this.styles,on:this.listeners$};return t(this.tag,this.setBackgroundColor(this.color,e),this.$slots.default)}})},"8e36":function(t,e,i){"use strict";i("a9e3"),i("c7cd");var a=i("5530"),s=i("ade3"),r=(i("6ece"),i("0789")),n=i("90a2"),o=i("a9ad"),c=i("fe6c"),l=i("a452"),d=i("7560"),h=i("80d2"),u=i("58df"),v=Object(u["a"])(o["a"],Object(c["b"])(["absolute","fixed","top","bottom"]),l["a"],d["a"]);e["a"]=v.extend({name:"v-progress-linear",directives:{intersect:n["a"]},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data:function(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground:function(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar:function(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType:function(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer:function(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate:function(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:Object(h["g"])(this.normalizedValue,"%")}}))},__cachedIndeterminate:function(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream:function(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:Object(h["g"])(100-this.normalizedBuffer,"%")}})):null},backgroundStyle:function(){var t,e=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return t={opacity:e},Object(s["a"])(t,this.isReversed?"right":"left",Object(h["g"])(this.normalizedValue,"%")),Object(s["a"])(t,"width",Object(h["g"])(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")),t},classes:function(){return Object(a["a"])({"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible},this.themeClasses)},computedTransition:function(){return this.indeterminate?r["d"]:r["f"]},isReversed:function(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer:function(){return this.normalize(this.bufferValue)},normalizedValue:function(){return this.normalize(this.internalLazyValue)},reactive:function(){return Boolean(this.$listeners.change)},styles:function(){var t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=Object(h["g"])(this.normalizedBuffer,"%")),t}},methods:{genContent:function(){var t=Object(h["s"])(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners:function(){var t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar:function(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:Object(s["a"])({},t,!0)}))},onClick:function(t){if(this.reactive){var e=this.$el.getBoundingClientRect(),i=e.width;this.internalValue=t.offsetX/i*100}},onObserve:function(t,e,i){this.isVisible=i},normalize:function(t){return t<0?0:t>100?100:parseFloat(t)}},render:function(t){var e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?Object(h["g"])(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}})},"8efc":function(t,e,i){},"90a2":function(t,e,i){"use strict";i("45fc");var a=i("53ca");function s(t,e){if("undefined"!==typeof window&&"IntersectionObserver"in window){var i=e.modifiers||{},s=e.value,n="object"===Object(a["a"])(s)?s:{handler:s,options:{}},o=n.handler,c=n.options,l=new IntersectionObserver((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1?arguments[1]:void 0;if(t._observe){var s=e.some((function(t){return t.isIntersecting}));!o||i.quiet&&!t._observe.init||i.once&&!s&&t._observe.init||o(e,a,s),s&&i.once?r(t):t._observe.init=!0}}),c);t._observe={init:!1,observer:l},l.observe(t)}}function r(t){t._observe&&(t._observe.observer.unobserve(t),delete t._observe)}var n={inserted:s,unbind:r};e["a"]=n},"99d9":function(t,e,i){"use strict";i.d(e,"a",(function(){return r})),i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"d",(function(){return c}));var a=i("b0af"),s=i("80d2"),r=Object(s["i"])("v-card__actions"),n=Object(s["i"])("v-card__subtitle"),o=Object(s["i"])("v-card__text"),c=Object(s["i"])("v-card__title");a["a"]},a236:function(t,e,i){"use strict";i("a15b"),i("ac1f"),i("1276");var a=i("ade3"),s=i("b85c"),r=i("2b0e");e["a"]=r["a"].extend({name:"roundable",props:{rounded:[Boolean,String],tile:Boolean},computed:{roundedClasses:function(){var t=[],e="string"===typeof this.rounded?String(this.rounded):!0===this.rounded;if(this.tile)t.push("rounded-0");else if("string"===typeof e){var i,r=e.split(" "),n=Object(s["a"])(r);try{for(n.s();!(i=n.n()).done;){var o=i.value;t.push("rounded-".concat(o))}}catch(c){n.e(c)}finally{n.f()}}else e&&t.push("rounded");return t.length>0?Object(a["a"])({},t.join(" "),!0):{}}}})},a2bf:function(t,e,i){"use strict";var a=i("e8b5"),s=i("50c4"),r=i("0366"),n=function(t,e,i,o,c,l,d,h){var u,v=c,f=0,g=!!d&&r(d,h,3);while(f<o){if(f in i){if(u=g?g(i[f],f,e):i[f],l>0&&a(u))v=n(t,e,u,s(u.length),v,l-1)-1;else{if(v>=9007199254740991)throw TypeError("Exceed the acceptable array length");t[v]=u}v++}f++}return v};t.exports=n},a452:function(t,e,i){"use strict";var a=i("ade3"),s=i("2b0e");function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"value",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"change";return s["a"].extend({name:"proxyable",model:{prop:t,event:e},props:Object(a["a"])({},t,{required:!1}),data:function(){return{internalLazyValue:this[t]}},computed:{internalValue:{get:function(){return this.internalLazyValue},set:function(t){t!==this.internalLazyValue&&(this.internalLazyValue=t,this.$emit(e,t))}}},watch:Object(a["a"])({},t,(function(t){this.internalLazyValue=t}))})}var n=r();e["a"]=n},a5bc:function(t,e,i){"use strict";i("7a20")},adda:function(t,e,i){"use strict";i("a15b"),i("a9e3"),i("8a79"),i("2ca0");var a=i("53ca"),s=(i("8efc"),i("90a2")),r=(i("36a7"),i("24b2")),n=i("58df"),o=Object(n["a"])(r["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number],contentClass:String},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content",class:this.contentClass},this.$slots.default)}},render:function(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),c=o,l=i("7560"),d=i("d9f7"),h=i("d9bd"),u="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=Object(n["a"])(c,l["a"]).extend({name:"v-img",directives:{intersect:s["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:function(){return{root:void 0,rootMargin:void 0,threshold:void 0}}},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio:function(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc:function(){return this.src&&"object"===Object(a["a"])(this.src)?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage:function(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient(".concat(this.gradient,")")),e&&t.push('url("'.concat(e,'")'));var i=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[i]):i}},watch:{src:function(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(t,e,i){if(!u||i||this.eager){if(this.normalisedSrc.lazySrc){var a=new Image;a.src=this.normalisedSrc.lazySrc,this.pollForSize(a,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError:function(){this.hasError=!0,this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,e=new Image;this.image=e,e.onload=function(){e.decode?e.decode().catch((function(e){Object(h["c"])("Failed to decode image, trying to render anyway\n\n"+"src: ".concat(t.normalisedSrc.src)+(e.message?"\nOriginal error: ".concat(e.message):""),t)})).then(t.onLoad):t.onLoad()},e.onerror=this.onError,this.hasError=!1,this.sizes&&(e.sizes=this.sizes),this.normalisedSrc.srcset&&(e.srcset=this.normalisedSrc.srcset),e.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(e),this.getSrc()},pollForSize:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,a=function a(){var s=t.naturalHeight,r=t.naturalWidth;s||r?(e.naturalWidth=r,e.calculatedAspectRatio=r/s):t.complete||!e.isLoading||e.hasError||null==i||setTimeout(a,i)};a()},genContent:function(){var t=c.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:"".concat(this.naturalWidth,"px")}}),t},__genPlaceholder:function(){if(this.$slots.placeholder){var t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},t):t[0]}}},render:function(t){var e=c.options.render.call(this,t),i=Object(d["a"])(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:u?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,i,e.children)}})},b0af:function(t,e,i){"use strict";i("0481"),i("4069"),i("a9e3");var a=i("5530"),s=(i("615b"),i("10d2")),r=i("297c"),n=i("1c87"),o=i("58df");e["a"]=Object(o["a"])(r["a"],n["a"],s["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({"v-card":!0},n["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},s["a"].options.computed.classes.call(this))},styles:function(){var t=Object(a["a"])({},s["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=r["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),i=e.tag,a=e.data;return a.style=this.styles,this.isClickable&&(a.attrs=a.attrs||{},a.attrs.tabindex=0),t(i,this.setBackgroundColor(this.color,a),[this.genProgress(),this.$slots.default])}})},c7cd:function(t,e,i){"use strict";var a=i("23e7"),s=i("857a"),r=i("af03");a({target:"String",proto:!0,forced:r("fixed")},{fixed:function(){return s(this,"tt","","")}})},c995:function(t,e,i){"use strict";i("a9e3");var a=i("ade3"),s=i("2b0e");e["a"]=s["a"].extend({name:"elevatable",props:{elevation:[Number,String]},computed:{computedElevation:function(){return this.elevation},elevationClasses:function(){var t=this.computedElevation;return null==t||isNaN(parseInt(t))?{}:Object(a["a"])({},"elevation-".concat(this.elevation),!0)}}})},fe6c:function(t,e,i){"use strict";i.d(e,"b",(function(){return n}));var a=i("2b0e"),s=i("80d2"),r={absolute:Boolean,bottom:Boolean,fixed:Boolean,left:Boolean,right:Boolean,top:Boolean};function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return a["a"].extend({name:"positionable",props:t.length?Object(s["n"])(r,t):r})}e["a"]=n()}}]);
//# sourceMappingURL=chunk-3cb83f90.2b9bb51a.js.map