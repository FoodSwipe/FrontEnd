(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-809f0606"],{"0299":function(t,e,s){"use strict";var i=s("d797");function a(t="value",e="change"){return i["a"].extend({name:"proxyable",model:{prop:t,event:e},props:{[t]:{required:!1}},data(){return{internalLazyValue:this[t]}},computed:{internalValue:{get(){return this.internalLazyValue},set(t){t!==this.internalLazyValue&&(this.internalLazyValue=t,this.$emit(e,t))}}},watch:{[t](t){this.internalLazyValue=t}}})}const r=a();e["a"]=r},"0350":function(t,e,s){t.exports=s.p+"img/social_networking.0dea0299.jpg"},"07f1":function(t,e,s){},"14d2":function(t,e,s){},1534:function(t,e,s){"use strict";var i=s("d797");e["a"]=i["a"].extend({name:"elevatable",props:{elevation:[Number,String]},computed:{computedElevation(){return this.elevation},elevationClasses(){const t=this.computedElevation;return null==t||isNaN(parseInt(t))?{}:{["elevation-"+this.elevation]:!0}}}})},"1a26":function(t,e,s){},2286:function(t,e,s){},"23e0":function(t,e,s){"use strict";function i(t,e,s){if("undefined"===typeof window||!("IntersectionObserver"in window))return;const i=e.modifiers||{},r=e.value,{handler:n,options:o}="object"===typeof r?r:{handler:r,options:{}},c=new IntersectionObserver((r=[],o)=>{var c;const l=null===(c=t._observe)||void 0===c?void 0:c[s.context._uid];if(!l)return;const h=r.some(t=>t.isIntersecting);!n||i.quiet&&!l.init||i.once&&!h&&!l.init||n(r,o,h),h&&i.once?a(t,e,s):l.init=!0},o);t._observe=Object(t._observe),t._observe[s.context._uid]={init:!1,observer:c},c.observe(t)}function a(t,e,s){var i;const a=null===(i=t._observe)||void 0===i?void 0:i[s.context._uid];a&&(a.observer.unobserve(t),delete t._observe[s.context._uid])}const r={inserted:i,unbind:a};e["a"]=r},"2acf":function(t,e,s){t.exports=s.p+"img/fb_splash_logo.a726b789.png"},6626:function(t,e,s){"use strict";var i=s("b24c");e["a"]=i["a"]},6886:function(t,e,s){"use strict";s("debe")},"6e17":function(t,e,s){"use strict";s.d(e,"b",(function(){return n}));var i=s("d797"),a=s("e30b");const r={absolute:Boolean,bottom:Boolean,fixed:Boolean,left:Boolean,right:Boolean,top:Boolean};function n(t=[]){return i["a"].extend({name:"positionable",props:t.length?Object(a["n"])(r,t):r})}e["a"]=n()},7681:function(t,e,s){},8303:function(t,e,s){"use strict";s.r(e);var i=s("e453"),a=s("8498"),r=s("dd35"),n=s("a644"),o=s("1120"),c=s("a632"),l=function(){var t=this,e=t._self._c;return e(a["a"],{staticClass:"pa-4 d-flex justify-center align-center",staticStyle:{position:"relative"},attrs:{width:"100vw",flat:"",tile:"","min-height":"100vh",color:"#fff7df"}},[e("div",{staticClass:"custom-shape-divider-top"},[e("svg",{attrs:{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 120",preserveAspectRatio:"none"}},[e("path",{staticClass:"shape-fill",attrs:{d:"M1200 0L0 0 598.97 114.72 1200 0z"}})])]),e("div",{staticClass:"custom-shape-divider-bottom"},[e("svg",{attrs:{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 120",preserveAspectRatio:"none"}},[e("path",{staticClass:"shape-fill",attrs:{d:"M1200 0L0 0 598.97 114.72 1200 0z"}})])]),e(a["a"],{staticClass:"mx-auto d-flex justify-center align-center flex-wrap",attrs:{flat:"",tile:"",color:"transparent","max-width":"1000"}},[e(a["a"],{attrs:{width:t.fbCardWidth,height:"450"}}),t.$vuetify.breakpoint.width>900?e("div",{staticClass:"px-12"}):t._e(),e(a["a"],{attrs:{flat:"",color:"transparent",rounded:"","max-width":"600"}},[e(r["c"],{staticClass:"text-center py-0"},[e("div",{staticClass:"text-uppercase"},[t._v(" Contact us here ")])]),e(r["c"],{staticClass:"text-center"},[e(n["a"],{staticClass:"ma-1"},[e(o["a"],{attrs:{small:"",left:"",color:"primary"}},[t._v(" call ")]),e("a",{staticClass:"phone",attrs:{href:"tel:98xxxxxxxx"}},[t._v(" 98xxxxxxxx ")])],1),e(n["a"],{staticClass:"ma-1"},[e(o["a"],{attrs:{small:"",left:"",color:"primary"}},[t._v(" call ")]),e("a",{staticClass:"phone",attrs:{href:"tel:98xxxxxxxx"}},[t._v(" 98xxxxxxxx ")])],1)],1),e(r["d"],{staticClass:"text-center d-flex justify-center align-center"},[e("div",{staticClass:"section-sub-header"},[t._v(" Stay connected with us! ")])]),e(a["a"],{staticClass:"mx-auto",attrs:{height:"250",width:t.$vuetify.breakpoint.width>900?"400":"60vw"}},[e(c["a"],{attrs:{width:t.$vuetify.breakpoint.width>900?"400":"60vw",contain:"",src:s("0350"),height:"250"}})],1),e("div",{staticClass:"text-center"},[e(r["d"],{staticClass:"text-uppercase d-flex justify-center reach-us"},[t._v(" Reach us on social media ")]),e(r["b"],[e(i["a"],{staticClass:"elevation-4 mx-1 cursor",attrs:{size:"40",color:"transparent"},on:{click:function(e){return t.routeToFoodSwipeFacebookPage()}}},[e(c["a"],{attrs:{src:s("2acf")}})],1),e(i["a"],{staticClass:"elevation-4 mx-1 cursor",attrs:{size:"40",color:"transparent"},on:{click:function(e){return t.routeToFoodSwipeInstaPage()}}},[e(c["a"],{attrs:{contain:"",src:s("8abc")}})],1)],1)],1)],1)],1)],1)},h=[],d={computed:{fbCardWidth(){return this.$vuetify.breakpoint.width>900||this.$vuetify.breakpoint.width>500?400:"80vw"}},methods:{routeToFoodSwipeFacebookPage(){},routeToFoodSwipeInstaPage(){}}},u=d,g=(s("6886"),s("b853"),s("4a4e")),m=Object(g["a"])(u,l,h,!1,null,"54c2212e",null);e["default"]=m.exports},8498:function(t,e,s){"use strict";s("2286");var i=s("6626"),a=s("cf20"),r=s("4a60"),n=s("5246");e["a"]=Object(n["a"])(a["a"],r["a"],i["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes(){return{"v-card":!0,...r["a"].options.computed.classes.call(this),"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised,...i["a"].options.computed.classes.call(this)}},styles(){const t={...i["a"].options.computed.styles.call(this)};return this.img&&(t.background=`url("${this.img}") center center / cover no-repeat`),t}},methods:{genProgress(){const t=a["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render(t){const{tag:e,data:s}=this.generateRouteLink();return s.style=this.styles,this.isClickable&&(s.attrs=s.attrs||{},s.attrs.tabindex=0),t(e,this.setBackgroundColor(this.color,s),[this.genProgress(),this.$slots.default])}})},"86b5":function(t,e,s){},"8abc":function(t,e,s){t.exports=s.p+"img/insta_splash_logo.c2471c2b.jpg"},9168:function(t,e,s){"use strict";s("e104");var i=s("d797");e["a"]=i["a"].extend({name:"roundable",props:{rounded:[Boolean,String],tile:Boolean},computed:{roundedClasses(){const t=[],e="string"===typeof this.rounded?String(this.rounded):!0===this.rounded;if(this.tile)t.push("rounded-0");else if("string"===typeof e){const s=e.split(" ");for(const e of s)t.push("rounded-"+e)}else e&&t.push("rounded");return t.length>0?{[t.join(" ")]:!0}:{}}}})},a632:function(t,e,s){"use strict";s("e104"),s("07f1");var i=s("23e0"),a=(s("d7de"),s("e80e")),r=s("5246"),n=s("e30b"),o=Object(r["a"])(a["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number],contentClass:String},computed:{computedAspectRatio(){return Number(this.aspectRatio)},aspectStyle(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-responsive__content",class:this.contentClass},Object(n["s"])(this))}},render(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),c=o,l=s("5116"),h=s("d469"),d=s("68da");const u="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=Object(r["a"])(c,l["a"]).extend({name:"v-img",directives:{intersect:i["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc(){return this.src&&"object"===typeof this.src?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];const t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push(`linear-gradient(${this.gradient})`),e&&t.push(`url("${e}")`);const s=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[s]):s}},watch:{src(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted(){this.init()},methods:{init(t,e,s){if(!u||s||this.eager){if(this.normalisedSrc.lazySrc){const t=new Image;t.src=this.normalisedSrc.lazySrc,this.pollForSize(t,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError(){this.hasError=!0,this.$emit("error",this.src)},getSrc(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage(){const t=new Image;this.image=t,t.onload=()=>{t.decode?t.decode().catch(t=>{Object(d["c"])("Failed to decode image, trying to render anyway\n\nsrc: "+this.normalisedSrc.src+(t.message?"\nOriginal error: "+t.message:""),this)}).then(this.onLoad):this.onLoad()},t.onerror=this.onError,this.hasError=!1,this.sizes&&(t.sizes=this.sizes),this.normalisedSrc.srcset&&(t.srcset=this.normalisedSrc.srcset),t.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(t),this.getSrc()},pollForSize(t,e=100){const s=()=>{const{naturalHeight:i,naturalWidth:a}=t;i||a?(this.naturalWidth=a,this.calculatedAspectRatio=a/i):t.complete||!this.isLoading||this.hasError||null==e||setTimeout(s,e)};s()},genContent(){const t=c.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:this.naturalWidth+"px"}}),t},__genPlaceholder(){const t=Object(n["s"])(this,"placeholder");if(t){const e=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},t)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},e):e[0]}}},render(t){const e=c.options.render.call(this,t),s=Object(h["a"])(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:u?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,s,e.children)}})},b24c:function(t,e,s){"use strict";s("7681");var i=s("c510"),a=s("2f58"),r=s("1534"),n=s("e80e"),o=s("9168"),c=s("5116"),l=s("5246");e["a"]=Object(l["a"])(i["a"],a["a"],r["a"],n["a"],o["a"],c["a"]).extend({name:"v-sheet",props:{outlined:Boolean,shaped:Boolean,tag:{type:String,default:"div"}},computed:{classes(){return{"v-sheet":!0,"v-sheet--outlined":this.outlined,"v-sheet--shaped":this.shaped,...this.themeClasses,...this.elevationClasses,...this.roundedClasses}},styles(){return this.measurableStyles}},render(t){const e={class:this.classes,style:this.styles,on:this.listeners$};return t(this.tag,this.setBackgroundColor(this.color,e),this.$slots.default)}})},b853:function(t,e,s){"use strict";s("14d2")},cf20:function(t,e,s){"use strict";var i=s("d797"),a=s("d1df");e["a"]=i["a"].extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress(){return!1===this.loading?null:this.$slots.progress||this.$createElement(a["a"],{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},d1df:function(t,e,s){"use strict";var i=s("d7fe");e["a"]=i["a"]},d7de:function(t,e,s){},d7fe:function(t,e,s){"use strict";s("86b5");var i=s("a926"),a=s("23e0"),r=s("2f58"),n=s("6e17"),o=s("0299"),c=s("5116"),l=s("e30b"),h=s("5246");const d=Object(h["a"])(r["a"],Object(n["b"])(["absolute","fixed","top","bottom"]),o["a"],c["a"]);e["a"]=d.extend({name:"v-progress-linear",directives:{intersect:a["a"]},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:Object(l["h"])(this.normalizedValue,"%")}}))},__cachedIndeterminate(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:Object(l["h"])(100-this.normalizedBuffer,"%")}})):null},backgroundStyle(){const t=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return{opacity:t,[this.isReversed?"right":"left"]:Object(l["h"])(this.normalizedValue,"%"),width:Object(l["h"])(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")}},classes(){return{"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible,...this.themeClasses}},computedTransition(){return this.indeterminate?i["d"]:i["f"]},isReversed(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer(){return this.normalize(this.bufferValue)},normalizedValue(){return this.normalize(this.internalLazyValue)},reactive(){return Boolean(this.$listeners.change)},styles(){const t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=Object(l["h"])(this.normalizedBuffer,"%")),t}},methods:{genContent(){const t=Object(l["s"])(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners(){const t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:{[t]:!0}}))},onClick(t){if(!this.reactive)return;const{width:e}=this.$el.getBoundingClientRect();this.internalValue=t.offsetX/e*100},onObserve(t,e,s){this.isVisible=s},normalize(t){return t<0?0:t>100?100:parseFloat(t)}},render(t){const e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?Object(l["h"])(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}})},dd35:function(t,e,s){"use strict";s.d(e,"a",(function(){return r})),s.d(e,"b",(function(){return n})),s.d(e,"c",(function(){return o})),s.d(e,"d",(function(){return c}));var i=s("8498"),a=s("e30b");const r=Object(a["j"])("v-card__actions"),n=Object(a["j"])("v-card__subtitle"),o=Object(a["j"])("v-card__text"),c=Object(a["j"])("v-card__title");i["a"]},debe:function(t,e,s){},e453:function(t,e,s){"use strict";s("1a26");var i=s("2f58"),a=s("e80e"),r=s("9168"),n=s("e30b"),o=s("5246");e["a"]=Object(o["a"])(i["a"],a["a"],r["a"]).extend({name:"v-avatar",props:{left:Boolean,right:Boolean,size:{type:[Number,String],default:48}},computed:{classes(){return{"v-avatar--left":this.left,"v-avatar--right":this.right,...this.roundedClasses}},styles(){return{height:Object(n["h"])(this.size),minWidth:Object(n["h"])(this.size),width:Object(n["h"])(this.size),...this.measurableStyles}}},render(t){const e={staticClass:"v-avatar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),this.$slots.default)}})},e80e:function(t,e,s){"use strict";var i=s("e30b"),a=s("d797");e["a"]=a["a"].extend({name:"measurable",props:{height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},computed:{measurableStyles(){const t={},e=Object(i["h"])(this.height),s=Object(i["h"])(this.minHeight),a=Object(i["h"])(this.minWidth),r=Object(i["h"])(this.maxHeight),n=Object(i["h"])(this.maxWidth),o=Object(i["h"])(this.width);return e&&(t.height=e),s&&(t.minHeight=s),a&&(t.minWidth=a),r&&(t.maxHeight=r),n&&(t.maxWidth=n),o&&(t.width=o),t}}})}}]);
//# sourceMappingURL=chunk-809f0606.8691a9ea.js.map