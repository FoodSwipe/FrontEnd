(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-415fa8e4"],{"0bc6":function(t,e,i){},"132d":function(t,e,i){"use strict";i("7db0"),i("caad"),i("c975"),i("fb6a"),i("45fc"),i("a9e3"),i("2532"),i("498a"),i("c96a");var s,a=i("5530"),n=(i("4804"),i("7e2b")),r=i("a9ad"),o=i("af2b"),c=i("7560"),l=i("80d2"),u=i("2b0e"),h=i("58df");function d(t){return["fas","far","fal","fab","fad","fak"].some((function(e){return t.includes(e)}))}function f(t){return/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(t)&&/[\dz]$/i.test(t)&&t.length>4}(function(t){t["xSmall"]="12px",t["small"]="16px",t["default"]="24px",t["medium"]="28px",t["large"]="36px",t["xLarge"]="40px"})(s||(s={}));var v=Object(h["a"])(n["a"],r["a"],o["a"],c["a"]).extend({name:"v-icon",props:{dense:Boolean,disabled:Boolean,left:Boolean,right:Boolean,size:[Number,String],tag:{type:String,required:!1,default:"i"}},computed:{medium:function(){return!1},hasClickListener:function(){return Boolean(this.listeners$.click||this.listeners$["!click"])}},methods:{getIcon:function(){var t="";return this.$slots.default&&(t=this.$slots.default[0].text.trim()),Object(l["C"])(this,t)},getSize:function(){var t={xSmall:this.xSmall,small:this.small,medium:this.medium,large:this.large,xLarge:this.xLarge},e=Object(l["z"])(t).find((function(e){return t[e]}));return e&&s[e]||Object(l["g"])(this.size)},getDefaultData:function(){return{staticClass:"v-icon notranslate",class:{"v-icon--disabled":this.disabled,"v-icon--left":this.left,"v-icon--link":this.hasClickListener,"v-icon--right":this.right,"v-icon--dense":this.dense},attrs:Object(a["a"])({"aria-hidden":!this.hasClickListener,disabled:this.hasClickListener&&this.disabled,type:this.hasClickListener?"button":void 0},this.attrs$),on:this.listeners$}},getSvgWrapperData:function(){var t=this.getSize(),e=Object(a["a"])(Object(a["a"])({},this.getDefaultData()),{},{style:t?{fontSize:t,height:t,width:t}:void 0});return this.applyColors(e),e},applyColors:function(t){t.class=Object(a["a"])(Object(a["a"])({},t.class),this.themeClasses),this.setTextColor(this.color,t)},renderFontIcon:function(t,e){var i=[],s=this.getDefaultData(),a="material-icons",n=t.indexOf("-"),r=n<=-1;r?i.push(t):(a=t.slice(0,n),d(a)&&(a="")),s.class[a]=!0,s.class[t]=!r;var o=this.getSize();return o&&(s.style={fontSize:o}),this.applyColors(s),e(this.hasClickListener?"button":this.tag,s,i)},renderSvgIcon:function(t,e){var i={class:"v-icon__svg",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":!0}},s=this.getSize();return s&&(i.style={fontSize:s,height:s,width:s}),e(this.hasClickListener?"button":"span",this.getSvgWrapperData(),[e("svg",i,[e("path",{attrs:{d:t}})])])},renderSvgIconComponent:function(t,e){var i={class:{"v-icon__component":!0}},s=this.getSize();s&&(i.style={fontSize:s,height:s,width:s}),this.applyColors(i);var a=t.component;return i.props=t.props,i.nativeOn=i.on,e(this.hasClickListener?"button":"span",this.getSvgWrapperData(),[e(a,i)])}},render:function(t){var e=this.getIcon();return"string"===typeof e?f(e)?this.renderSvgIcon(e,t):this.renderFontIcon(e,t):this.renderSvgIconComponent(e,t)}});e["a"]=u["a"].extend({name:"v-icon",$_wrapperFor:v,functional:!0,render:function(t,e){var i=e.data,s=e.children,a="";return i.domProps&&(a=i.domProps.textContent||i.domProps.innerHTML||a,delete i.domProps.textContent,delete i.domProps.innerHTML),t(v,i,a?[a]:s)}})},"20f6":function(t,e,i){},"22da":function(t,e,i){"use strict";var s=i("490a");e["a"]=s["a"]},"270c":function(t,e,i){"use strict";i("cf2b")},"2fa4":function(t,e,i){"use strict";i("20f6");var s=i("80d2");e["a"]=Object(s["i"])("spacer","div","v-spacer")},3206:function(t,e,i){"use strict";i.d(e,"a",(function(){return o})),i.d(e,"b",(function(){return c}));i("99af");var s=i("ade3"),a=i("2b0e"),n=i("d9bd");function r(t,e){return function(){return Object(n["c"])("The ".concat(t," component must be used inside a ").concat(e))}}function o(t,e,i){var n=e&&i?{register:r(e,i),unregister:r(e,i)}:null;return a["a"].extend({name:"registrable-inject",inject:Object(s["a"])({},t,{default:n})})}function c(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].extend({name:"registrable-provide",provide:function(){return Object(s["a"])({},t,e?this:{register:this.register,unregister:this.unregister})}})}},3408:function(t,e,i){},"36a7":function(t,e,i){},4804:function(t,e,i){},"489f":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-card",{attrs:{flat:"",tile:"",color:"transparent"}},[s("v-card",{staticStyle:{"background-color":"#fcf8f2!important"},attrs:{flat:"",tile:"",color:"orange",loading:t.loading,width:"100vw"}},[t.itemTypes?s("v-card",{staticClass:"py-4 px-2 d-flex justify-start align-center flex-wrap mx-auto",attrs:{flat:"","max-width":"1200",color:"transparent"}},[s("v-chip",{staticClass:"ma-1 py-5",attrs:{label:""},on:{click:function(e){return t.clearFilterMode()}}},[s("v-icon",[t._v(" "+t._s(t.filterMode?"clear":"filter_list")+" ")]),s("span",{staticClass:"pl-2 filter-text"},[t._v(" "+t._s(t.filterMode?"CLEAR FILTER":"FILTER")+" ")])],1),t._l(t.itemTypes["results"],(function(e){return s("v-chip",{key:e.id,staticClass:"ma-1 py-5",attrs:{label:"",color:"grey lighten-3"},on:{click:function(i){return t.filter({item_type:e.id})}}},[s("v-avatar",[s("v-img",{attrs:{src:e.badge}})],1),s("span",{staticClass:"pl-2 font-weight-bold filter-text"},[t._v(" "+t._s(e.name.toUpperCase())+" ")])],1)})),s("v-spacer"),s("v-chip",{staticClass:"ma-1",attrs:{label:""},on:{click:function(e){return t.filter({is_veg:!0})}}},[s("v-avatar",[s("v-img",{attrs:{src:i("cd33"),contain:""}})],1),s("span",{staticClass:"pl-1 filter-text"},[t._v("VEG")])],1),s("v-chip",{staticClass:"ma-1",attrs:{label:""},on:{click:function(e){return t.filter({is_veg:!1})}}},[s("v-avatar",[s("v-img",{attrs:{src:i("d38f"),contain:""}})],1),s("span",{staticClass:"pl-1 filter-text"},[t._v("NON VEG")])],1),s("v-chip",{staticClass:"ma-1",attrs:{label:""},on:{click:function(e){return t.filter({is_bar_item:!0})}}},[s("v-avatar",[s("v-img",{attrs:{src:i("6b89"),contain:""}})],1),s("span",{staticClass:"pl-1 filter-text"},[t._v("BAR")])],1)],2):t._e()],1),s("div",{staticStyle:{height:"2px","background-color":"darkorange"}}),s("v-card",{staticClass:"mx-auto",attrs:{"max-width":"1200",flat:"",color:"transparent","min-height":"80vh"}},[s("v-row",{staticClass:"ma-0 pa-0",attrs:{"no-gutters":""}},[s("v-col",{attrs:{xl:"3",lg:"3",md:"3",sm:"3"}},[s("v-list",{staticClass:"rounded ma-2 mt-3",attrs:{color:"rgb(255 251 246)"}},[s("v-subheader",[t._v("Menu Item Groups")]),s("v-divider"),s("v-list-item-group",{staticClass:"pa-1",model:{value:t.selection,callback:function(e){t.selection=e},expression:"selection"}},t._l(t.storeItemGroups["results"],(function(e){return s("v-list-item",{key:e.id,staticClass:"rounded",class:{"menu-item-group-active":t.activeGroup[e.id]},attrs:{"active-class":"menu-item-group-active","exact-active-class":"menu-item-group-active"},on:{click:function(i){return t.filterMenuItemGroup(e)}}},[s("v-list-item-avatar",[s("v-img",{attrs:{src:e.image}})],1),s("v-list-item-title",[t._v(" "+t._s(e.name)+" ")])],1)})),1)],1)],1),s("v-col",{attrs:{cols:"12",xl:"9",lg:"9",md:"9",sm:"9"}},[t.storeItems.length?s("v-row",{staticClass:"ma-0 pa-0",attrs:{"no-gutters":""}},t._l(t.storeItems,(function(t,e){return s("v-col",{key:e,staticClass:"pa-2",attrs:{cols:"12",xl:"3",lg:"3",md:"4",sm:"6"}},[s("store-item-card",{attrs:{item:t}})],1)})),1):s("v-card",{staticClass:"ma-4",attrs:{outlined:""}},[s("v-card-title",{staticClass:"grey lighten-3 d-flex justify-center subtitle-2"},[t._v(" No results found. ")]),s("v-card-actions",{staticClass:"justify-center"},[s("v-btn",{on:{click:t.initialize}},[t._v(" Reset ")])],1)],1)],1)],1)],1)],1)},a=[],n=(i("4de4"),i("4160"),i("caad"),i("d3b7"),i("ac1f"),i("2532"),i("841c"),i("1276"),i("159b"),i("96cf"),i("1da1")),r=i("5530"),o=i("2f62"),c={name:"StoreItemGroupView",components:{StoreItemCard:function(){return i.e("chunk-4d4c3cef").then(i.bind(null,"83b8"))}},data:function(){return{selection:null,loading:!1,menuItemType:null,filterMode:!1,menuItemGroupNav:!0}},computed:Object(r["a"])(Object(r["a"])({},Object(o["b"])({storeItemGroups:"menuItemGroup/allMenuItemGroups",storeItems:"menuItem/allMenuItems",itemTypes:"itemType/allItemTypes"})),{},{activeGroup:function(){var t={},e=this.$route.params.filter;return e&&this.storeItemGroups?(this.storeItemGroups.results.forEach((function(i){var s=e.split("=")[1];t[i.id]=parseInt(s)===i.id})),t):t}}),watch:{"$route.params.filter":{handler:function(){this.initialize()},deep:!0,immediate:!0}},created:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.$helper.getCookingOrderId()){e.next=3;break}return e.next=3,t.$store.dispatch("order/withCartItems",{id:t.$helper.getCookingOrderId()});case 3:return t.$bus.on("search-menu-item",t.search),e.next=6,t.initialize();case 6:case"end":return e.stop()}}),e)})))()},beforeUnmount:function(){this.$bus.off("search-menu-item")},methods:{filterMenuItemGroup:function(t){var e="/store/menu_item_group="+t.id;this.$route.params.filter!==e&&this.$router.push(e)},initialize:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i={},t.loading=!0,s=t.$route.params.filter,s&&s.includes("menu_item_group=")&&(t.filterMode=!0,i["menu_item_group"]=s.split("=")[1]),e.next=6,t.$store.dispatch("menuItem/fetchAll",i);case 6:t.loading=!1;case 7:case"end":return e.stop()}}),e)})))()},search:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,e.filter(t);case 2:case"end":return i.stop()}}),i)})))()},filter:function(){var t=arguments,e=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var s;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=t.length>0&&void 0!==t[0]?t[0]:null,e.loading=!0,i.next=4,e.$store.dispatch("menuItem/fetchAll",s);case 4:e.filterMode=!0,e.loading=!1;case 6:case"end":return i.stop()}}),i)})))()},clearFilterMode:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.filterMode){e.next=8;break}if(!t.$route.params.filter){e.next=4;break}return e.next=4,t.$router.push("/store");case 4:return t.selection=null,t.filterMode=!1,e.next=8,t.$store.dispatch("menuItem/fetchAll");case 8:case"end":return e.stop()}}),e)})))()}}},l=c,u=(i("270c"),i("2877")),h=i("6544"),d=i.n(h),f=i("8212"),v=i("8336"),p=i("b0af"),m=i("99d9"),g=i("cc20"),b=i("62ad"),C=i("ce7e"),S=i("132d"),x=i("adda"),y=i("8860"),_=i("da13"),O=i("8270"),j=i("1baa"),w=i("5d23"),k=i("0fd9"),$=i("2fa4"),z=i("e0c7"),B=Object(u["a"])(l,s,a,!1,null,"26cfcd1a",null);e["default"]=B.exports;d()(B,{VAvatar:f["a"],VBtn:v["a"],VCard:p["a"],VCardActions:m["a"],VCardTitle:m["d"],VChip:g["a"],VCol:b["a"],VDivider:C["a"],VIcon:S["a"],VImg:x["a"],VList:y["a"],VListItem:_["a"],VListItemAvatar:O["a"],VListItemGroup:j["a"],VListItemTitle:w["d"],VRow:k["a"],VSpacer:$["a"],VSubheader:z["a"]})},"490a":function(t,e,i){"use strict";i("99af"),i("a9e3"),i("8d4f");var s=i("90a2"),a=i("a9ad"),n=i("80d2");e["a"]=a["a"].extend({name:"v-progress-circular",directives:{intersect:s["a"]},props:{button:Boolean,indeterminate:Boolean,rotate:{type:[Number,String],default:0},size:{type:[Number,String],default:32},width:{type:[Number,String],default:4},value:{type:[Number,String],default:0}},data:function(){return{radius:20,isVisible:!0}},computed:{calculatedSize:function(){return Number(this.size)+(this.button?8:0)},circumference:function(){return 2*Math.PI*this.radius},classes:function(){return{"v-progress-circular--visible":this.isVisible,"v-progress-circular--indeterminate":this.indeterminate,"v-progress-circular--button":this.button}},normalizedValue:function(){return this.value<0?0:this.value>100?100:parseFloat(this.value)},strokeDashArray:function(){return Math.round(1e3*this.circumference)/1e3},strokeDashOffset:function(){return(100-this.normalizedValue)/100*this.circumference+"px"},strokeWidth:function(){return Number(this.width)/+this.size*this.viewBoxSize*2},styles:function(){return{height:Object(n["g"])(this.calculatedSize),width:Object(n["g"])(this.calculatedSize)}},svgStyles:function(){return{transform:"rotate(".concat(Number(this.rotate),"deg)")}},viewBoxSize:function(){return this.radius/(1-Number(this.width)/+this.size)}},methods:{genCircle:function(t,e){return this.$createElement("circle",{class:"v-progress-circular__".concat(t),attrs:{fill:"transparent",cx:2*this.viewBoxSize,cy:2*this.viewBoxSize,r:this.radius,"stroke-width":this.strokeWidth,"stroke-dasharray":this.strokeDashArray,"stroke-dashoffset":e}})},genSvg:function(){var t=[this.indeterminate||this.genCircle("underlay",0),this.genCircle("overlay",this.strokeDashOffset)];return this.$createElement("svg",{style:this.svgStyles,attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"".concat(this.viewBoxSize," ").concat(this.viewBoxSize," ").concat(2*this.viewBoxSize," ").concat(2*this.viewBoxSize)}},t)},genInfo:function(){return this.$createElement("div",{staticClass:"v-progress-circular__info"},this.$slots.default)},onObserve:function(t,e,i){this.isVisible=i}},render:function(t){return t("div",this.setTextColor(this.color,{staticClass:"v-progress-circular",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:this.styles,on:this.$listeners}),[this.genSvg(),this.genInfo()])}})},"4e82":function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var s=i("ade3"),a=i("3206");function n(t,e,i){return Object(a["a"])(t,e,i).extend({name:"groupable",props:{activeClass:{type:String,default:function(){if(this[t])return this[t].activeClass}},disabled:Boolean},data:function(){return{isActive:!1}},computed:{groupClasses:function(){return this.activeClass?Object(s["a"])({},this.activeClass,this.isActive):{}}},created:function(){this[t]&&this[t].register(this)},beforeDestroy:function(){this[t]&&this[t].unregister(this)},methods:{toggle:function(){this.$emit("change")}}})}n("itemGroup")},"6b89":function(t,e,i){t.exports=i.p+"img/bar_item_png.f227b51a.png"},8212:function(t,e,i){"use strict";i("a9e3");var s=i("5530"),a=(i("3408"),i("a9ad")),n=i("24b2"),r=i("a236"),o=i("80d2"),c=i("58df");e["a"]=Object(c["a"])(a["a"],n["a"],r["a"]).extend({name:"v-avatar",props:{left:Boolean,right:Boolean,size:{type:[Number,String],default:48}},computed:{classes:function(){return Object(s["a"])({"v-avatar--left":this.left,"v-avatar--right":this.right},this.roundedClasses)},styles:function(){return Object(s["a"])({height:Object(o["g"])(this.size),minWidth:Object(o["g"])(this.size),width:Object(o["g"])(this.size)},this.measurableStyles)}},render:function(t){var e={staticClass:"v-avatar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),this.$slots.default)}})},8336:function(t,e,i){"use strict";i("4160"),i("caad"),i("a9e3"),i("c7cd");var s=i("53ca"),a=i("3835"),n=i("5530"),r=(i("86cc"),i("10d2")),o=i("22da"),c=i("4e82"),l=i("f2e7"),u=i("c995"),h=i("fe6c"),d=i("1c87"),f=i("af2b"),v=i("58df"),p=i("d9bd"),m=Object(v["a"])(r["a"],d["a"],h["a"],f["a"],Object(c["a"])("btnToggle"),Object(l["b"])("inputValue"));e["a"]=m.extend().extend({name:"v-btn",props:{activeClass:{type:String,default:function(){return this.btnToggle?this.btnToggle.activeClass:""}},block:Boolean,depressed:Boolean,fab:Boolean,icon:Boolean,loading:Boolean,outlined:Boolean,plain:Boolean,retainFocusOnClick:Boolean,rounded:Boolean,tag:{type:String,default:"button"},text:Boolean,tile:Boolean,type:{type:String,default:"button"},value:null},data:function(){return{proxyClass:"v-btn--active"}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])(Object(n["a"])(Object(n["a"])(Object(n["a"])({"v-btn":!0},d["a"].options.computed.classes.call(this)),{},{"v-btn--absolute":this.absolute,"v-btn--block":this.block,"v-btn--bottom":this.bottom,"v-btn--disabled":this.disabled,"v-btn--is-elevated":this.isElevated,"v-btn--fab":this.fab,"v-btn--fixed":this.fixed,"v-btn--has-bg":this.hasBg,"v-btn--icon":this.icon,"v-btn--left":this.left,"v-btn--loading":this.loading,"v-btn--outlined":this.outlined,"v-btn--plain":this.plain,"v-btn--right":this.right,"v-btn--round":this.isRound,"v-btn--rounded":this.rounded,"v-btn--router":this.to,"v-btn--text":this.text,"v-btn--tile":this.tile,"v-btn--top":this.top},this.themeClasses),this.groupClasses),this.elevationClasses),this.sizeableClasses)},computedElevation:function(){if(!this.disabled)return u["a"].options.computed.computedElevation.call(this)},computedRipple:function(){var t,e=!this.icon&&!this.fab||{circle:!0};return!this.disabled&&(null!=(t=this.ripple)?t:e)},hasBg:function(){return!this.text&&!this.plain&&!this.outlined&&!this.icon},isElevated:function(){return Boolean(!this.icon&&!this.text&&!this.outlined&&!this.depressed&&!this.disabled&&!this.plain&&(null==this.elevation||Number(this.elevation)>0))},isRound:function(){return Boolean(this.icon||this.fab)},styles:function(){return Object(n["a"])({},this.measurableStyles)}},created:function(){var t=this,e=[["flat","text"],["outline","outlined"],["round","rounded"]];e.forEach((function(e){var i=Object(a["a"])(e,2),s=i[0],n=i[1];t.$attrs.hasOwnProperty(s)&&Object(p["a"])(s,n,t)}))},methods:{click:function(t){!this.retainFocusOnClick&&!this.fab&&t.detail&&this.$el.blur(),this.$emit("click",t),this.btnToggle&&this.toggle()},genContent:function(){return this.$createElement("span",{staticClass:"v-btn__content"},this.$slots.default)},genLoader:function(){return this.$createElement("span",{class:"v-btn__loader"},this.$slots.loader||[this.$createElement(o["a"],{props:{indeterminate:!0,size:23,width:2}})])}},render:function(t){var e=[this.genContent(),this.loading&&this.genLoader()],i=this.generateRouteLink(),a=i.tag,n=i.data,r=this.hasBg?this.setBackgroundColor:this.setTextColor;return"button"===a&&(n.attrs.type=this.type,n.attrs.disabled=this.disabled),n.attrs.value=["string","number"].includes(Object(s["a"])(this.value))?this.value:JSON.stringify(this.value),t(a,this.disabled?n:r(this.color,n),e)}})},"86cc":function(t,e,i){},"8a79":function(t,e,i){"use strict";var s=i("23e7"),a=i("06cf").f,n=i("50c4"),r=i("5a34"),o=i("1d80"),c=i("ab13"),l=i("c430"),u="".endsWith,h=Math.min,d=c("endsWith"),f=!l&&!d&&!!function(){var t=a(String.prototype,"endsWith");return t&&!t.writable}();s({target:"String",proto:!0,forced:!f&&!d},{endsWith:function(t){var e=String(o(this));r(t);var i=arguments.length>1?arguments[1]:void 0,s=n(e.length),a=void 0===i?s:h(n(i),s),c=String(t);return u?u.call(e,c,a):e.slice(a-c.length,a)===c}})},"8adc":function(t,e,i){},"8ce9":function(t,e,i){},"8d4f":function(t,e,i){},"8efc":function(t,e,i){},"99d9":function(t,e,i){"use strict";i.d(e,"a",(function(){return n})),i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return o})),i.d(e,"d",(function(){return c}));var s=i("b0af"),a=i("80d2"),n=Object(a["i"])("v-card__actions"),r=Object(a["i"])("v-card__subtitle"),o=Object(a["i"])("v-card__text"),c=Object(a["i"])("v-card__title");s["a"]},adda:function(t,e,i){"use strict";i("a15b"),i("a9e3"),i("8a79"),i("2ca0");var s=i("53ca"),a=(i("8efc"),i("90a2")),n=(i("36a7"),i("24b2")),r=i("58df"),o=Object(r["a"])(n["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number],contentClass:String},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content",class:this.contentClass},this.$slots.default)}},render:function(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),c=o,l=i("7560"),u=i("d9f7"),h=i("d9bd"),d="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=Object(r["a"])(c,l["a"]).extend({name:"v-img",directives:{intersect:a["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:function(){return{root:void 0,rootMargin:void 0,threshold:void 0}}},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio:function(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc:function(){return this.src&&"object"===Object(s["a"])(this.src)?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage:function(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient(".concat(this.gradient,")")),e&&t.push('url("'.concat(e,'")'));var i=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[i]):i}},watch:{src:function(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(t,e,i){if(!d||i||this.eager){if(this.normalisedSrc.lazySrc){var s=new Image;s.src=this.normalisedSrc.lazySrc,this.pollForSize(s,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError:function(){this.hasError=!0,this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,e=new Image;this.image=e,e.onload=function(){e.decode?e.decode().catch((function(e){Object(h["c"])("Failed to decode image, trying to render anyway\n\n"+"src: ".concat(t.normalisedSrc.src)+(e.message?"\nOriginal error: ".concat(e.message):""),t)})).then(t.onLoad):t.onLoad()},e.onerror=this.onError,this.hasError=!1,this.sizes&&(e.sizes=this.sizes),this.normalisedSrc.srcset&&(e.srcset=this.normalisedSrc.srcset),e.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(e),this.getSrc()},pollForSize:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,s=function s(){var a=t.naturalHeight,n=t.naturalWidth;a||n?(e.naturalWidth=n,e.calculatedAspectRatio=n/a):t.complete||!e.isLoading||e.hasError||null==i||setTimeout(s,i)};s()},genContent:function(){var t=c.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:"".concat(this.naturalWidth,"px")}}),t},__genPlaceholder:function(){if(this.$slots.placeholder){var t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},t):t[0]}}},render:function(t){var e=c.options.render.call(this,t),i=Object(u["a"])(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:d?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,i,e.children)}})},af2b:function(t,e,i){"use strict";i("c96a");var s=i("2b0e");e["a"]=s["a"].extend({name:"sizeable",props:{large:Boolean,small:Boolean,xLarge:Boolean,xSmall:Boolean},computed:{medium:function(){return Boolean(!this.xSmall&&!this.small&&!this.large&&!this.xLarge)},sizeableClasses:function(){return{"v-size--x-small":this.xSmall,"v-size--small":this.small,"v-size--default":this.medium,"v-size--large":this.large,"v-size--x-large":this.xLarge}}}})},c96a:function(t,e,i){"use strict";var s=i("23e7"),a=i("857a"),n=i("af03");s({target:"String",proto:!0,forced:n("small")},{small:function(){return a(this,"small","","")}})},cc20:function(t,e,i){"use strict";i("4de4"),i("4160");var s=i("3835"),a=i("5530"),n=(i("8adc"),i("58df")),r=i("0789"),o=i("9d26"),c=i("a9ad"),l=i("4e82"),u=i("7560"),h=i("f2e7"),d=i("1c87"),f=i("af2b"),v=i("d9bd");e["a"]=Object(n["a"])(c["a"],f["a"],d["a"],u["a"],Object(l["a"])("chipGroup"),Object(h["b"])("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default:function(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:function(){return{proxyClass:"v-chip--active"}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])(Object(a["a"])(Object(a["a"])({"v-chip":!0},d["a"].options.computed.classes.call(this)),{},{"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose},this.themeClasses),this.sizeableClasses),this.groupClasses)},hasClose:function(){return Boolean(this.close)},isClickable:function(){return Boolean(d["a"].options.computed.isClickable.call(this)||this.chipGroup)}},created:function(){var t=this,e=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];e.forEach((function(e){var i=Object(s["a"])(e,2),a=i[0],n=i[1];t.$attrs.hasOwnProperty(a)&&Object(v["a"])(a,n,t)}))},methods:{click:function(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter:function(){var t=[];return this.isActive&&t.push(this.$createElement(o["a"],{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(r["b"],t)},genClose:function(){var t=this;return this.$createElement(o["a"],{staticClass:"v-chip__close",props:{right:!0,size:18},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.$emit("click:close"),t.$emit("update:active",!1)}}},this.closeIcon)},genContent:function(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render:function(t){var e=[this.genContent()],i=this.generateRouteLink(),s=i.tag,n=i.data;n.attrs=Object(a["a"])(Object(a["a"])({},n.attrs),{},{draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:n.attrs.tabindex}),n.directives.push({name:"show",value:this.active}),n=this.setBackgroundColor(this.color,n);var r=this.textColor||this.outlined&&this.color;return t(s,this.setTextColor(r,n),e)}})},cd33:function(t,e,i){t.exports=i.p+"img/veglogo.66d8666b.png"},ce7e:function(t,e,i){"use strict";var s=i("5530"),a=(i("8ce9"),i("7560"));e["a"]=a["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(s["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(s["a"])({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},cf2b:function(t,e,i){},d38f:function(t,e,i){t.exports=i.p+"img/nonveglogo.5c2c4b97.png"},e0c7:function(t,e,i){"use strict";var s=i("5530"),a=(i("0bc6"),i("7560")),n=i("58df");e["a"]=Object(n["a"])(a["a"]).extend({name:"v-subheader",props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:Object(s["a"])({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})},f2e7:function(t,e,i){"use strict";i.d(e,"b",(function(){return n}));var s=i("ade3"),a=i("2b0e");function n(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"value",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"input";return a["a"].extend({name:"toggleable",model:{prop:e,event:i},props:Object(s["a"])({},e,{required:!1}),data:function(){return{isActive:!!this[e]}},watch:(t={},Object(s["a"])(t,e,(function(t){this.isActive=!!t})),Object(s["a"])(t,"isActive",(function(t){!!t!==this[e]&&this.$emit(i,t)})),t)})}var r=n();e["a"]=r}}]);
//# sourceMappingURL=chunk-415fa8e4.db014359.js.map