(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04be7974"],{2299:function(t,e,a){},"23df":function(t,e,a){},"40b9":function(t,e,a){},"4ca6":function(t,e,a){"use strict";a("a9e3");var s=a("15fd"),i=a("5530"),r=(a("ff44"),a("132d")),n=a("a9ad"),o=a("7560"),c=a("f2e7"),l=a("2b0e"),d=l["a"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),u=a("fe6c"),m=a("58df"),p=a("80d2");e["a"]=Object(m["a"])(n["a"],Object(u["b"])(["left","bottom"]),o["a"],c["a"],d).extend({name:"v-badge",props:{avatar:Boolean,bordered:Boolean,color:{type:String,default:"primary"},content:{required:!1},dot:Boolean,label:{type:String,default:"$vuetify.badge"},icon:String,inline:Boolean,offsetX:[Number,String],offsetY:[Number,String],overlap:Boolean,tile:Boolean,transition:{type:String,default:"scale-rotate-transition"},value:{default:!0}},computed:{classes:function(){return Object(i["a"])({"v-badge--avatar":this.avatar,"v-badge--bordered":this.bordered,"v-badge--bottom":this.bottom,"v-badge--dot":this.dot,"v-badge--icon":null!=this.icon,"v-badge--inline":this.inline,"v-badge--left":this.left,"v-badge--overlap":this.overlap,"v-badge--tile":this.tile},this.themeClasses)},computedBottom:function(){return this.bottom?"auto":this.computedYOffset},computedLeft:function(){return this.isRtl?this.left?this.computedXOffset:"auto":this.left?"auto":this.computedXOffset},computedRight:function(){return this.isRtl?this.left?"auto":this.computedXOffset:this.left?this.computedXOffset:"auto"},computedTop:function(){return this.bottom?this.computedYOffset:"auto"},computedXOffset:function(){return this.calcPosition(this.offsetX)},computedYOffset:function(){return this.calcPosition(this.offsetY)},isRtl:function(){return this.$vuetify.rtl},offset:function(){return this.overlap?this.dot?8:12:this.dot?2:4},styles:function(){return this.inline?{}:{bottom:this.computedBottom,left:this.computedLeft,right:this.computedRight,top:this.computedTop}}},methods:{calcPosition:function(t){return"calc(100% - ".concat(Object(p["g"])(t||this.offset),")")},genBadge:function(){var t=this.$vuetify.lang,e=this.$attrs["aria-label"]||t.t(this.label),a=this.setBackgroundColor(this.color,{staticClass:"v-badge__badge",style:this.styles,attrs:{"aria-atomic":this.$attrs["aria-atomic"]||"true","aria-label":e,"aria-live":this.$attrs["aria-live"]||"polite",title:this.$attrs.title,role:this.$attrs.role||"status"},directives:[{name:"show",value:this.isActive}]}),s=this.$createElement("span",a,[this.genBadgeContent()]);return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[s]):s},genBadgeContent:function(){if(!this.dot){var t=Object(p["s"])(this,"badge");return t||(this.content?String(this.content):this.icon?this.$createElement(r["a"],this.icon):void 0)}},genBadgeWrapper:function(){return this.$createElement("span",{staticClass:"v-badge__wrapper"},[this.genBadge()])}},render:function(t){var e=[this.genBadgeWrapper()],a=[Object(p["s"])(this)],i=this.$attrs,r=(i["aria-atomic"],i["aria-label"],i["aria-live"],i.role,i.title,Object(s["a"])(i,["aria-atomic","aria-label","aria-live","role","title"]));return this.inline&&this.left?a.unshift(e):a.push(e),t("span",{staticClass:"v-badge",attrs:r,class:this.classes},a)}})},"5b8d":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"pa-4",staticStyle:{position:"relative"},attrs:{flat:"",tile:"",loading:t.isLoading,width:"100vw","min-height":"100vh",color:"#ececec"}},[a("div",{staticClass:"custom-shape-divider-top"},[a("svg",{attrs:{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 120",preserveAspectRatio:"none"}},[a("path",{staticClass:"shape-fill",attrs:{d:"M1200 0L0 0 598.97 114.72 1200 0z"}})])]),a("div",{staticClass:"custom-shape-divider-bottom"},[a("svg",{attrs:{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 120",preserveAspectRatio:"none"}},[a("path",{staticClass:"shape-fill",attrs:{d:"M1200 0L0 0 598.97 114.72 1200 0z"}})])]),a("div",{staticClass:"py-8"}),a("v-card",{staticClass:"px-2",attrs:{width:"100%",flat:"",tile:"",color:"transparent"}},[a("top-sheet-card",{attrs:{title:"Hot items you can pick right now",color:"orange"}},[a("div",{staticClass:"d-flex flex-wrap"},t._l(t.topItemsSet,(function(e,s){return a("peek-items",{key:e.id,staticClass:"mb-2",class:{"mr-3":t.topItemsSet.length!==s+1},attrs:{item:e}})})),1)]),a("div",{staticClass:"py-8"}),a("top-sheet-card",{attrs:{title:"Recommendation from Foodswipe",color:"teal"}},[a("div",{staticClass:"d-flex flex-wrap"},t._l(t.recommendations,(function(e,s){return a("peek-items",{key:e.id,staticClass:"mb-2",class:{"mr-3":t.recommendations.length!==s+1},attrs:{item:e}})})),1)]),a("div",{staticClass:"py-8"}),a("top-sheet-card",{attrs:{title:"Swipe Through Our Menu Item Collections",color:"indigo"}},[a("div",{staticClass:"d-flex flex-wrap"},t._l(t.itemGroups,(function(e,s){return a("menu-item-group-avatar",{key:e.id,staticClass:"mb-2",class:{"mr-3":t.itemGroups.length!==s+1},attrs:{"item-group":e}})})),1)])],1)],1)},i=[],r=(a("96cf"),a("1da1")),n=a("5530"),o=a("2f62"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"peek-item",attrs:{"max-width":"140","min-height":"300",color:"elevation-1",rounded:""}},[a("v-row",{staticClass:"ma-0 pa-0",attrs:{justify:"center",align:"center"}},[a("v-col",{staticClass:"d-flex justify-center",attrs:{cols:"12"}},[a("v-badge",{attrs:{avatar:"",bordered:"",overlap:"",bottom:"","offset-x":"30","offset-y":"20",color:"white"},scopedSlots:t._u([{key:"badge",fn:function(){return[a("v-avatar",{staticClass:"elevation-4",attrs:{size:"25",color:"transparent"}},[t.item.menu_item.item_type.length>0?a("v-img",{attrs:{src:t.item.menu_item.item_type[0].badge}}):a("span",{staticClass:"grey rounded-circle",staticStyle:{width:"14px"}},[t._v("x")])],1)]},proxy:!0}])},[a("v-avatar",{staticClass:"item-image-avatar",attrs:{size:"100",color:"white"}},[a("v-img",{staticClass:"car-image",attrs:{src:t.item.menu_item.image,"max-width":"100%"}})],1)],1)],1),a("v-col",{staticClass:"d-flex justify-center",attrs:{cols:"12"}},[a("p",{staticClass:"mb-0 text-center item-name"},[t._v(" "+t._s(t.item.menu_item.name)+" ")])]),a("v-col",{staticClass:"d-flex justify-center",attrs:{cols:"12"}},[a("p",{staticClass:"mb-0 text-center"},[a("span",{staticClass:"nrs"},[t._v("NRs")]),a("span",{staticClass:"number-font item-price"},[t._v(" "+t._s(t.item.menu_item.price)+" ")])])]),t.cartItems[t.item.menu_item.name]?t._e():a("v-col",{staticClass:"d-flex justify-center",attrs:{cols:"12"}},[a("v-btn",{staticClass:"to-cart-btn",attrs:{loading:t.loadingCartBtn,dark:"",color:"orange","min-width":"25"},on:{click:function(e){return e.preventDefault(),t.addItemToCart(t.item.menu_item)}}},[a("v-icon",[t._v(" add_shopping_cart ")])],1)],1)],1)],1)},l=[],d=a("6bee"),u={name:"PeekItems",mixins:[d["a"]],props:{item:{type:Object,required:!0}},data:function(){return{loadingCartBtn:null}}},m=u,p=(a("9327"),a("2877")),f=a("6544"),h=a.n(f),v=a("8212"),g=a("4ca6"),b=a("8336"),C=a("b0af"),w=a("62ad"),x=a("132d"),_=a("adda"),y=a("0fd9"),I=Object(p["a"])(m,c,l,!1,null,"60e816cc",null),O=I.exports;h()(I,{VAvatar:v["a"],VBadge:g["a"],VBtn:b["a"],VCard:C["a"],VCol:w["a"],VIcon:x["a"],VImg:_["a"],VRow:y["a"]});var j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-auto pa-4 sheet-card",attrs:{outlined:"",rounded:"",color:"#ffffff87","max-width":"1000"}},[a("v-sheet",{staticClass:"sheet mx-auto",attrs:{dark:"",rounded:"","max-width":"900",elevation:"4",color:t.color}},[a("v-card-title",{staticClass:"d-flex justify-space-between align-center py-8"},[a("p",{staticClass:"section-header mb-0"},[t._v(" "+t._s(t.title)+" ")])])],1),a("div",{staticClass:"py-6"}),a("div",{staticClass:"pa-1"},[t._t("default")],2)],1)},$=[],B={name:"TopSheetCard",props:{color:{type:String,required:!0},title:{type:String,required:!0}}},S=B,k=(a("fc10"),a("99d9")),R=a("8dd9"),V=Object(p["a"])(S,j,$,!1,null,"cec63aee",null),G=V.exports;h()(V,{VCard:C["a"],VCardTitle:k["d"],VSheet:R["a"]});var L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"pa-2 d-flex justify-center align-center",attrs:{flat:"","max-width":"140",rounded:"",color:"transparent"}},[a("div",[a("v-avatar",{staticClass:"menu-group-av",attrs:{size:"100"}},[a("v-img",{attrs:{src:t.itemGroup.image}})],1),a("p",{staticClass:"item-name text-center"},[t._v(" "+t._s(t.itemGroup.name)+" ")])],1)])},T=[],E={name:"MenuItemGroupAvatar",props:{itemGroup:{type:Object,required:!0}}},A=E,z=(a("c9fe"),Object(p["a"])(A,L,T,!1,null,"2e8b2351",null)),X=z.exports;h()(z,{VAvatar:v["a"],VCard:C["a"],VImg:_["a"]});var M={name:"HotItemsComponent",components:{MenuItemGroupAvatar:X,TopSheetCard:G,PeekItems:O},data:function(){return{isLoading:!1,topItemsSet:[],recommendations:[],itemGroups:[]}},computed:Object(n["a"])({},Object(o["b"])({topItems:"menuItem/allTopItems",recommendedItems:"menuItem/allRecommendedItems",menuItemGroups:"menuItemGroup/allMenuItemGroups"})),created:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.initialize();case 2:case"end":return e.stop()}}),e)})))()},methods:{initialize:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.isLoading=!0,e.next=3,t.$store.dispatch("menuItem/fetchTopItems");case 3:return a=e.sent,a&&(t.topItemsSet=t.topItems),e.next=7,t.$store.dispatch("menuItem/fetchRecommendedItems");case 7:return a=e.sent,a&&(t.recommendations=t.recommendedItems),e.next=11,t.$store.dispatch("menuItemGroup/withItems");case 11:a=e.sent,a&&(t.itemGroups=t.menuItemGroups.results),t.isLoading=!1;case 14:case"end":return e.stop()}}),e)})))()}}},q=M,P=(a("d574"),a("89b1"),Object(p["a"])(q,s,i,!1,null,"6d256b96",null));e["default"]=P.exports;h()(P,{VCard:C["a"]})},"5e43":function(t,e,a){},"6bee":function(t,e,a){"use strict";a("4160"),a("b0c0"),a("ac1f"),a("5319"),a("159b"),a("96cf");var s=a("1da1"),i=a("5530"),r=a("2f62"),n={computed:Object(i["a"])(Object(i["a"])({},Object(r["b"])({pendingOrder:"order/detailOrder"})),{},{cartItems:function(){var t={};return this.pendingOrder?(this.pendingOrder["cart_items"].forEach((function(e){t[e.item.name]=e})),t):t}}),methods:{addItemToCart:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:e.loadingCartBtn=!0,e.$helper.getCookingOrderId()?e.$bus.emit("add-item-to-cart",{withItem:t}):e.$helper.isAuthenticated()?(s=e.$helper.getCurrentUser(),e.$bus.emit("start-order-prefill",{order:{custom_location:s.profile.address,custom_contact:s.profile.contact?s.profile.contact.replace(/\D/g,""):null},withItem:t})):e.$bus.emit("start-order",{withItem:t}),e.loadingCartBtn=!1;case 3:case"end":return a.stop()}}),a)})))()}}};e["a"]=n},"89b1":function(t,e,a){"use strict";a("40b9")},9327:function(t,e,a){"use strict";a("23df")},c3e4:function(t,e,a){},c9fe:function(t,e,a){"use strict";a("2299")},d574:function(t,e,a){"use strict";a("5e43")},fc10:function(t,e,a){"use strict";a("c3e4")},ff44:function(t,e,a){}}]);
//# sourceMappingURL=chunk-04be7974.f27f662a.js.map