(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27dee83a"],{"3c19":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"admin-home"},[a("v-row",{staticClass:"ma-0 pa-0"},[a("v-breadcrumbs",{staticClass:"px-1 pt-3",attrs:{dark:"",items:e.homePageBreadcrumbs},scopedSlots:e._u([{key:"item",fn:function(t){var r=t.item;return[a("v-breadcrumbs-item",{staticClass:"admin-breadcrumb-item",attrs:{to:r.href,disabled:r.disabled}},[e._v(" "+e._s(r.text.toUpperCase())+" ")])]}}])})],1),a("v-row",{staticClass:"ma-0 pa-0"},[a("v-col",{attrs:{cols:"12",xl:"6",lg:"6",md:"6",sm:"6"}},[a("sale-summary-card")],1),a("v-col",{attrs:{cols:"12",xl:"6",lg:"6",md:"6",sm:"6"}},[a("user-summary-card")],1),a("v-col",{attrs:{cols:"12"}},[a("v-card",{attrs:{dark:""}},[a("admin-logs")],1)],1)],1)],1)},n=[],s=(a("d3b7"),{name:"AdminHomeView",components:{AdminLogs:function(){return Promise.all([a.e("chunk-07709945"),a.e("chunk-5284a556"),a.e("chunk-310381c9"),a.e("chunk-cc731854"),a.e("chunk-1fffc1e2")]).then(a.bind(null,"7957"))},UserSummaryCard:function(){return Promise.all([a.e("chunk-5755bf50"),a.e("chunk-2d207bc6")]).then(a.bind(null,"a298"))},SaleSummaryCard:function(){return Promise.all([a.e("chunk-5755bf50"),a.e("chunk-2d0d9f45")]).then(a.bind(null,"6a15"))}},data:function(){return{homePageBreadcrumbs:[{text:"> Home",disabled:!1,href:"/admin/home"},{text:"Users",disabled:!1,href:"/admin/user"},{text:"Orders",disabled:!1,href:"/admin/order"},{text:"Transactions",disabled:!1,href:"/admin/transaction"},{text:"Menu Item",disabled:!1,href:"/admin/menu-item"}]}}}),c=s,o=a("2877"),i=a("6544"),l=a.n(i),d=a("2bc5"),u=a("f625"),f=a("b0af"),m=a("62ad"),b=a("0fd9"),h=Object(o["a"])(c,r,n,!1,null,null,null);t["default"]=h.exports;l()(h,{VBreadcrumbs:d["a"],VBreadcrumbsItem:u["a"],VCard:f["a"],VCol:m["a"],VRow:b["a"]})},"615b":function(e,t,a){},"62ad":function(e,t,a){"use strict";a("4160"),a("caad"),a("13d5"),a("45fc"),a("4ec9"),a("a9e3"),a("b64b"),a("d3b7"),a("ac1f"),a("3ca3"),a("5319"),a("2ca0"),a("159b"),a("ddb0");var r=a("ade3"),n=a("5530"),s=(a("4b85"),a("2b0e")),c=a("d9f7"),o=a("80d2"),i=["sm","md","lg","xl"],l=function(){return i.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{})}(),d=function(){return i.reduce((function(e,t){return e["offset"+Object(o["G"])(t)]={type:[String,Number],default:null},e}),{})}(),u=function(){return i.reduce((function(e,t){return e["order"+Object(o["G"])(t)]={type:[String,Number],default:null},e}),{})}(),f={col:Object.keys(l),offset:Object.keys(d),order:Object.keys(u)};function m(e,t,a){var r=e;if(null!=a&&!1!==a){if(t){var n=t.replace(e,"");r+="-".concat(n)}return"col"!==e||""!==a&&!0!==a?(r+="-".concat(a),r.toLowerCase()):r.toLowerCase()}}var b=new Map;t["a"]=s["a"].extend({name:"v-col",functional:!0,props:Object(n["a"])(Object(n["a"])(Object(n["a"])(Object(n["a"])({cols:{type:[Boolean,String,Number],default:!1}},l),{},{offset:{type:[String,Number],default:null}},d),{},{order:{type:[String,Number],default:null}},u),{},{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var a=t.props,n=t.data,s=t.children,o=(t.parent,"");for(var i in a)o+=String(a[i]);var l=b.get(o);return l||function(){var e,t;for(t in l=[],f)f[t].forEach((function(e){var r=a[e],n=m(t,e,r);n&&l.push(n)}));var n=l.some((function(e){return e.startsWith("col-")}));l.push((e={col:!n||!a.cols},Object(r["a"])(e,"col-".concat(a.cols),a.cols),Object(r["a"])(e,"offset-".concat(a.offset),a.offset),Object(r["a"])(e,"order-".concat(a.order),a.order),Object(r["a"])(e,"align-self-".concat(a.alignSelf),a.alignSelf),e)),b.set(o,l)}(),e(a.tag,Object(c["a"])(n,{class:l}),s)}})},b0af:function(e,t,a){"use strict";a("0481"),a("4069"),a("a9e3");var r=a("5530"),n=(a("615b"),a("10d2")),s=a("297c"),c=a("1c87"),o=a("58df");t["a"]=Object(o["a"])(s["a"],c["a"],n["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(r["a"])(Object(r["a"])({"v-card":!0},c["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},n["a"].options.computed.classes.call(this))},styles:function(){var e=Object(r["a"])({},n["a"].options.computed.styles.call(this));return this.img&&(e.background='url("'.concat(this.img,'") center center / cover no-repeat')),e}},methods:{genProgress:function(){var e=s["a"].options.methods.genProgress.call(this);return e?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[e]):null}},render:function(e){var t=this.generateRouteLink(),a=t.tag,r=t.data;return r.style=this.styles,this.isClickable&&(r.attrs=r.attrs||{},r.attrs.tabindex=0),e(a,this.setBackgroundColor(this.color,r),[this.genProgress(),this.$slots.default])}})}}]);
//# sourceMappingURL=chunk-27dee83a.aea41f64.js.map