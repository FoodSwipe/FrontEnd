(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e02e9940"],{"0299":function(t,e,s){"use strict";var i=s("d797");function r(t="value",e="change"){return i["a"].extend({name:"proxyable",model:{prop:t,event:e},props:{[t]:{required:!1}},data(){return{internalLazyValue:this[t]}},computed:{internalValue:{get(){return this.internalLazyValue},set(t){t!==this.internalLazyValue&&(this.internalLazyValue=t,this.$emit(e,t))}}},watch:{[t](t){this.internalLazyValue=t}}})}const a=r();e["a"]=a},"07f1":function(t,e,s){},1534:function(t,e,s){"use strict";var i=s("d797");e["a"]=i["a"].extend({name:"elevatable",props:{elevation:[Number,String]},computed:{computedElevation(){return this.elevation},elevationClasses(){const t=this.computedElevation;return null==t||isNaN(parseInt(t))?{}:{["elevation-"+this.elevation]:!0}}}})},2286:function(t,e,s){},"23e0":function(t,e,s){"use strict";function i(t,e,s){if("undefined"===typeof window||!("IntersectionObserver"in window))return;const i=e.modifiers||{},a=e.value,{handler:n,options:o}="object"===typeof a?a:{handler:a,options:{}},c=new IntersectionObserver((a=[],o)=>{var c;const l=null===(c=t._observe)||void 0===c?void 0:c[s.context._uid];if(!l)return;const d=a.some(t=>t.isIntersecting);!n||i.quiet&&!l.init||i.once&&!d&&!l.init||n(a,o,d),d&&i.once?r(t,e,s):l.init=!0},o);t._observe=Object(t._observe),t._observe[s.context._uid]={init:!1,observer:c},c.observe(t)}function r(t,e,s){var i;const r=null===(i=t._observe)||void 0===i?void 0:i[s.context._uid];r&&(r.observer.unobserve(t),delete t._observe[s.context._uid])}const a={inserted:i,unbind:r};e["a"]=a},2445:function(t,e,s){"use strict";s.r(e);var i=s("8498"),r=s("dd35"),a=s("f5f6"),n=s("a632"),o=s("949d"),c=function(){var t=this,e=t._self._c;return e(i["a"],{staticClass:"pa-4 d-flex justify-center align-center",staticStyle:{position:"relative"},attrs:{flat:"",tile:"",width:"100vw","min-height":"100vh",color:"#ececec"}},[e("div",{staticClass:"custom-shape-divider-top-1626805149"},[e("svg",{attrs:{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 120",preserveAspectRatio:"none"}},[e("path",{staticClass:"shape-fill",attrs:{d:"M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",opacity:".25"}}),e("path",{staticClass:"shape-fill",attrs:{d:"M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z",opacity:".5"}}),e("path",{staticClass:"shape-fill",attrs:{d:"M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"}})])]),e(i["a"],{attrs:{color:"transparent"}},[e(o["a"],{staticClass:"ma-0 pa-0",staticStyle:{"max-width":"1000px"},attrs:{justify:"center","align-content":"center"}},[e(a["a"],{staticClass:"text-center",attrs:{cols:"12"}},[e("p",{staticClass:"mb-0 section-header"},[t._v(" How we deliver? ")]),e("p",{staticClass:"mb-0 subtitle"},[t._v(" Ordering food online has never been this easy ")])]),e(a["a"],{attrs:{cols:"12"}},[e("div",{staticClass:"py-4"})]),e(a["a"],{staticClass:"text-center",attrs:{cols:"12",xl:"4",lg:"4",md:"4",sm:"4"}},[e(i["a"],{staticClass:"mx-auto",attrs:{color:"#fddadb","max-width":"400"}},[e(n["a"],{attrs:{"max-width":"400",height:"140",src:"https://mir-s3-cdn-cf.behance.net/project_modules/fs/6a6fd549558457.58b8217c4d619.gif"}}),e(r["d"],[t._v("Just click, add and get your order")])],1)],1),e(a["a"],{staticClass:"text-center",attrs:{cols:"12",xl:"4",lg:"4",md:"4",sm:"4"}},[e(i["a"],{staticClass:"mx-auto",attrs:{color:"#b9d7d9","max-width":"400"}},[e(n["a"],{attrs:{"max-width":"400",contain:"",src:"https://i.gifer.com/EnnH.gif",height:"140"}}),e(r["d"],[t._v(" Pay your order at your doorstep ")])],1)],1),e(a["a"],{staticClass:"text-center",attrs:{cols:"12",xl:"4",lg:"4",md:"4",sm:"4"}},[e(i["a"],{staticClass:"mx-auto",attrs:{color:"rgb(122 205 223)","max-width":"400"}},[e(n["a"],{attrs:{"max-width":"400",contain:"",src:"https://goingdigitalx.files.wordpress.com/2020/08/mp.gif",height:"140"}}),e(r["d"],[t._v("Secure online payment system")])],1)],1)],1)],1)],1)},l=[],d={name:"HowWeServeView"},h=d,u=(s("d52f"),s("33bb"),s("4a4e")),g=Object(u["a"])(h,c,l,!1,null,"6470522f",null);e["default"]=g.exports},"33bb":function(t,e,s){"use strict";s("b2c5")},6626:function(t,e,s){"use strict";var i=s("b24c");e["a"]=i["a"]},"66e0":function(t,e,s){},"6e17":function(t,e,s){"use strict";s.d(e,"b",(function(){return n}));var i=s("d797"),r=s("e30b");const a={absolute:Boolean,bottom:Boolean,fixed:Boolean,left:Boolean,right:Boolean,top:Boolean};function n(t=[]){return i["a"].extend({name:"positionable",props:t.length?Object(r["n"])(a,t):a})}e["a"]=n()},7681:function(t,e,s){},"76c3":function(t,e,s){},8498:function(t,e,s){"use strict";s("2286");var i=s("6626"),r=s("cf20"),a=s("4a60"),n=s("5246");e["a"]=Object(n["a"])(r["a"],a["a"],i["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes(){return{"v-card":!0,...a["a"].options.computed.classes.call(this),"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised,...i["a"].options.computed.classes.call(this)}},styles(){const t={...i["a"].options.computed.styles.call(this)};return this.img&&(t.background=`url("${this.img}") center center / cover no-repeat`),t}},methods:{genProgress(){const t=r["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render(t){const{tag:e,data:s}=this.generateRouteLink();return s.style=this.styles,this.isClickable&&(s.attrs=s.attrs||{},s.attrs.tabindex=0),t(e,this.setBackgroundColor(this.color,s),[this.genProgress(),this.$slots.default])}})},"86b5":function(t,e,s){},9168:function(t,e,s){"use strict";s("e104");var i=s("d797");e["a"]=i["a"].extend({name:"roundable",props:{rounded:[Boolean,String],tile:Boolean},computed:{roundedClasses(){const t=[],e="string"===typeof this.rounded?String(this.rounded):!0===this.rounded;if(this.tile)t.push("rounded-0");else if("string"===typeof e){const s=e.split(" ");for(const e of s)t.push("rounded-"+e)}else e&&t.push("rounded");return t.length>0?{[t.join(" ")]:!0}:{}}}})},"949d":function(t,e,s){"use strict";s("19e2"),s("e104"),s("76c3");var i=s("d797"),r=s("d469"),a=s("e30b");const n=["sm","md","lg","xl"],o=["start","end","center"];function c(t,e){return n.reduce((s,i)=>(s[t+Object(a["G"])(i)]=e(),s),{})}const l=t=>[...o,"baseline","stretch"].includes(t),d=c("align",()=>({type:String,default:null,validator:l})),h=t=>[...o,"space-between","space-around"].includes(t),u=c("justify",()=>({type:String,default:null,validator:h})),g=t=>[...o,"space-between","space-around","stretch"].includes(t),m=c("alignContent",()=>({type:String,default:null,validator:g})),p={align:Object.keys(d),justify:Object.keys(u),alignContent:Object.keys(m)},f={align:"align",justify:"justify",alignContent:"align-content"};function v(t,e,s){let i=f[t];if(null!=s){if(e){const s=e.replace(t,"");i+="-"+s}return i+="-"+s,i.toLowerCase()}}const b=new Map;e["a"]=i["a"].extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:l},...d,justify:{type:String,default:null,validator:h},...u,alignContent:{type:String,default:null,validator:g},...m},render(t,{props:e,data:s,children:i}){let a="";for(const r in e)a+=String(e[r]);let n=b.get(a);if(!n){let t;for(t in n=[],p)p[t].forEach(s=>{const i=e[s],r=v(t,s,i);r&&n.push(r)});n.push({"no-gutters":e.noGutters,"row--dense":e.dense,["align-"+e.align]:e.align,["justify-"+e.justify]:e.justify,["align-content-"+e.alignContent]:e.alignContent}),b.set(a,n)}return t(e.tag,Object(r["a"])(s,{staticClass:"row",class:n}),i)}})},a632:function(t,e,s){"use strict";s("e104"),s("07f1");var i=s("23e0"),r=(s("d7de"),s("e80e")),a=s("5246"),n=s("e30b"),o=Object(a["a"])(r["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number],contentClass:String},computed:{computedAspectRatio(){return Number(this.aspectRatio)},aspectStyle(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-responsive__content",class:this.contentClass},Object(n["s"])(this))}},render(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),c=o,l=s("5116"),d=s("d469"),h=s("68da");const u="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=Object(a["a"])(c,l["a"]).extend({name:"v-img",directives:{intersect:i["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc(){return this.src&&"object"===typeof this.src?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];const t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push(`linear-gradient(${this.gradient})`),e&&t.push(`url("${e}")`);const s=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[s]):s}},watch:{src(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted(){this.init()},methods:{init(t,e,s){if(!u||s||this.eager){if(this.normalisedSrc.lazySrc){const t=new Image;t.src=this.normalisedSrc.lazySrc,this.pollForSize(t,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError(){this.hasError=!0,this.$emit("error",this.src)},getSrc(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage(){const t=new Image;this.image=t,t.onload=()=>{t.decode?t.decode().catch(t=>{Object(h["c"])("Failed to decode image, trying to render anyway\n\nsrc: "+this.normalisedSrc.src+(t.message?"\nOriginal error: "+t.message:""),this)}).then(this.onLoad):this.onLoad()},t.onerror=this.onError,this.hasError=!1,this.sizes&&(t.sizes=this.sizes),this.normalisedSrc.srcset&&(t.srcset=this.normalisedSrc.srcset),t.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(t),this.getSrc()},pollForSize(t,e=100){const s=()=>{const{naturalHeight:i,naturalWidth:r}=t;i||r?(this.naturalWidth=r,this.calculatedAspectRatio=r/i):t.complete||!this.isLoading||this.hasError||null==e||setTimeout(s,e)};s()},genContent(){const t=c.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:this.naturalWidth+"px"}}),t},__genPlaceholder(){const t=Object(n["s"])(this,"placeholder");if(t){const e=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},t)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},e):e[0]}}},render(t){const e=c.options.render.call(this,t),s=Object(d["a"])(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:u?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,s,e.children)}})},b24c:function(t,e,s){"use strict";s("7681");var i=s("c510"),r=s("2f58"),a=s("1534"),n=s("e80e"),o=s("9168"),c=s("5116"),l=s("5246");e["a"]=Object(l["a"])(i["a"],r["a"],a["a"],n["a"],o["a"],c["a"]).extend({name:"v-sheet",props:{outlined:Boolean,shaped:Boolean,tag:{type:String,default:"div"}},computed:{classes(){return{"v-sheet":!0,"v-sheet--outlined":this.outlined,"v-sheet--shaped":this.shaped,...this.themeClasses,...this.elevationClasses,...this.roundedClasses}},styles(){return this.measurableStyles}},render(t){const e={class:this.classes,style:this.styles,on:this.listeners$};return t(this.tag,this.setBackgroundColor(this.color,e),this.$slots.default)}})},b2c5:function(t,e,s){},cf20:function(t,e,s){"use strict";var i=s("d797"),r=s("d1df");e["a"]=i["a"].extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress(){return!1===this.loading?null:this.$slots.progress||this.$createElement(r["a"],{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},d1df:function(t,e,s){"use strict";var i=s("d7fe");e["a"]=i["a"]},d52f:function(t,e,s){"use strict";s("66e0")},d7de:function(t,e,s){},d7fe:function(t,e,s){"use strict";s("86b5");var i=s("a926"),r=s("23e0"),a=s("2f58"),n=s("6e17"),o=s("0299"),c=s("5116"),l=s("e30b"),d=s("5246");const h=Object(d["a"])(a["a"],Object(n["b"])(["absolute","fixed","top","bottom"]),o["a"],c["a"]);e["a"]=h.extend({name:"v-progress-linear",directives:{intersect:r["a"]},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:Object(l["h"])(this.normalizedValue,"%")}}))},__cachedIndeterminate(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:Object(l["h"])(100-this.normalizedBuffer,"%")}})):null},backgroundStyle(){const t=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return{opacity:t,[this.isReversed?"right":"left"]:Object(l["h"])(this.normalizedValue,"%"),width:Object(l["h"])(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")}},classes(){return{"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible,...this.themeClasses}},computedTransition(){return this.indeterminate?i["d"]:i["f"]},isReversed(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer(){return this.normalize(this.bufferValue)},normalizedValue(){return this.normalize(this.internalLazyValue)},reactive(){return Boolean(this.$listeners.change)},styles(){const t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=Object(l["h"])(this.normalizedBuffer,"%")),t}},methods:{genContent(){const t=Object(l["s"])(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners(){const t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:{[t]:!0}}))},onClick(t){if(!this.reactive)return;const{width:e}=this.$el.getBoundingClientRect();this.internalValue=t.offsetX/e*100},onObserve(t,e,s){this.isVisible=s},normalize(t){return t<0?0:t>100?100:parseFloat(t)}},render(t){const e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?Object(l["h"])(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}})},dd35:function(t,e,s){"use strict";s.d(e,"a",(function(){return a})),s.d(e,"b",(function(){return n})),s.d(e,"c",(function(){return o})),s.d(e,"d",(function(){return c}));var i=s("8498"),r=s("e30b");const a=Object(r["j"])("v-card__actions"),n=Object(r["j"])("v-card__subtitle"),o=Object(r["j"])("v-card__text"),c=Object(r["j"])("v-card__title");i["a"]},e80e:function(t,e,s){"use strict";var i=s("e30b"),r=s("d797");e["a"]=r["a"].extend({name:"measurable",props:{height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},computed:{measurableStyles(){const t={},e=Object(i["h"])(this.height),s=Object(i["h"])(this.minHeight),r=Object(i["h"])(this.minWidth),a=Object(i["h"])(this.maxHeight),n=Object(i["h"])(this.maxWidth),o=Object(i["h"])(this.width);return e&&(t.height=e),s&&(t.minHeight=s),r&&(t.minWidth=r),a&&(t.maxHeight=a),n&&(t.maxWidth=n),o&&(t.width=o),t}}})},f5f6:function(t,e,s){"use strict";s("19e2"),s("e104"),s("76c3");var i=s("d797"),r=s("d469"),a=s("e30b");const n=["sm","md","lg","xl"],o=(()=>n.reduce((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t),{}))(),c=(()=>n.reduce((t,e)=>(t["offset"+Object(a["G"])(e)]={type:[String,Number],default:null},t),{}))(),l=(()=>n.reduce((t,e)=>(t["order"+Object(a["G"])(e)]={type:[String,Number],default:null},t),{}))(),d={col:Object.keys(o),offset:Object.keys(c),order:Object.keys(l)};function h(t,e,s){let i=t;if(null!=s&&!1!==s){if(e){const s=e.replace(t,"");i+="-"+s}return"col"!==t||""!==s&&!0!==s?(i+="-"+s,i.toLowerCase()):i.toLowerCase()}}const u=new Map;e["a"]=i["a"].extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...o,offset:{type:[String,Number],default:null},...c,order:{type:[String,Number],default:null},...l,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:s,children:i,parent:a}){let n="";for(const r in e)n+=String(e[r]);let o=u.get(n);if(!o){let t;for(t in o=[],d)d[t].forEach(s=>{const i=e[s],r=h(t,s,i);r&&o.push(r)});const s=o.some(t=>t.startsWith("col-"));o.push({col:!s||!e.cols,["col-"+e.cols]:e.cols,["offset-"+e.offset]:e.offset,["order-"+e.order]:e.order,["align-self-"+e.alignSelf]:e.alignSelf}),u.set(n,o)}return t(e.tag,Object(r["a"])(s,{class:o}),i)}})}}]);
//# sourceMappingURL=chunk-e02e9940.4e990ca9.js.map