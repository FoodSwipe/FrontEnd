(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ff389dc"],{"16e5":function(t,e,a){"use strict";a("44f3")},"3a2f":function(t,e,a){"use strict";a("a9e3");var s=a("ade3"),i=(a("9734"),a("4ad4")),r=a("a9ad"),n=a("16b7"),o=a("b848"),d=a("f573"),c=a("f2e7"),l=a("80d2"),u=a("d9bd"),m=a("58df");e["a"]=Object(m["a"])(r["a"],n["a"],o["a"],d["a"],c["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,a=t.content,s=!this.bottom&&!this.left&&!this.top&&!this.right,i=!1!==this.attach?e.offsetLeft:e.left,r=0;return this.top||this.bottom||s?r=i+e.width/2-a.width/2:(this.left||this.right)&&(r=i+(this.right?e.width:-a.width)+(this.right?10:-10)),this.nudgeLeft&&(r-=parseInt(this.nudgeLeft)),this.nudgeRight&&(r+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(r,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,a=t.content,s=!1!==this.attach?e.offsetTop:e.top,i=0;return this.top||this.bottom?i=s+(this.bottom?e.height:-a.height)+(this.bottom?10:-10):(this.left||this.right)&&(i=s+e.height/2-a.height/2),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(i+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(l["g"])(this.maxWidth),minWidth:Object(l["g"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(l["t"])(this,"activator",!0)&&Object(u["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=i["a"].options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===l["y"].esc&&(t.getActivator(e),t.runDelay("close"))},e},genActivatorAttributes:function(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition:function(){var t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(s["a"])(t,this.contentClass,!0),Object(s["a"])(t,"menuable__content__active",this.isActive),Object(s["a"])(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},"44f3":function(t,e,a){},5819:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{dark:"",fullscreen:"","hide-overlay":"","close-delay":"1000","open-delay":"1000",transition:"dialog-bottom-transition"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",{attrs:{flat:""}},[a("v-toolbar",[a("v-app-bar-nav-icon",[a("v-avatar",{staticClass:"elevation-10 golden-rod-border-3",attrs:{size:"40"}},[a("v-icon",{attrs:{size:"20"}},[t._v(" "+t._s(t.formIcon)+" ")])],1)],1),a("v-toolbar-title",{staticClass:"form-title"},[t._v(" "+t._s(t.formTitle)+" ")]),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:t.close}},[a("v-icon",[t._v(" close ")])],1)],1),a("v-card",{staticClass:"mx-auto",attrs:{flat:"",color:"transparent","max-width":"800"}},[-1!==t.editedIndex?a("v-row",{staticClass:"ma-0 pa-0 pt-8",attrs:{justify:"center",align:"center"}},[a("v-col",{staticClass:"text-center",attrs:{cols:"12",xl:"4",lg:"4",md:"4",sm:"4"}},[a("v-avatar",{staticClass:"golden-rod-border-4",attrs:{size:"180",color:"orange"}},[t.editedItem.image?a("v-img",{attrs:{src:t.editedItem.image}}):a("span",{staticClass:"display-4"},[t._v(" "+t._s(t.firstLetter)+" ")])],1)],1),a("v-col",{attrs:{cols:"12",xl:"8",lg:"8",md:"8",sm:"8"}},[a("v-list",{staticClass:"pa-0 mt-3"},[a("v-list-item",[a("v-list-item-content",[a("p",{staticClass:"headline cursor",on:{click:function(e){return t.routeToUserDetailPage(t.editedItem.id)}}},[t._v(" "+t._s(t.editedItem.full_name)+" "),a("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,i=e.attrs;return[a("v-icon",t._g(t._b({attrs:{color:"green darken-1"}},"v-icon",i,!1),s),[t._v(" check ")])]}}],null,!1,745245394)},[a("span",[t._v("Active")])])],1),a("v-divider",{staticClass:"mb-2"}),a("div",{staticClass:"mb-2"},[a("v-chip",{directives:[{name:"show",rawName:"v-show",value:t.editedItem.user.is_superuser,expression:"editedItem.user.is_superuser"}],staticClass:"mr-1 mb-1",attrs:{label:"",color:"purple lighten-1"}},[a("v-icon",{attrs:{left:""}},[t._v(" stars ")]),a("b",[t._v("Superuser")])],1),a("v-chip",{directives:[{name:"show",rawName:"v-show",value:t.editedItem.user.is_staff,expression:"editedItem.user.is_staff"}],staticClass:"mb-1",attrs:{label:"",dark:""}},[a("v-icon",{attrs:{left:"",color:"white"}},[t._v(" sentiment_satisfied_alt ")]),a("b",[t._v("Staff")])],1)],1),a("p",{staticClass:"mb-0 mb-2"},[a("v-icon",{staticClass:"small-detail-icon"},[t._v(" event ")]),a("b",{staticClass:"pl-2"},[t._v("Date joined:")]),a("span",{staticClass:"pl-2"},[t._v(t._s(t.editedItem.user.date_joined))])],1),a("p",{staticClass:"mb-0 mb-2"},[a("v-icon",{staticClass:"small-detail-icon"},[t._v(" cake ")]),a("b",{staticClass:"pl-2"},[t._v("Birth date:")]),a("span",{staticClass:"pl-2"},[t._v(t._s(t.editedItem.birth_date))])],1),a("p",{staticClass:"mb-0"},[a("v-icon",{staticClass:"small-detail-icon"},[t._v(" history ")]),a("b",{staticClass:"pl-2"},[t._v("Last Updated At:")]),a("span",{staticClass:"px-1"},[t._v(t._s(t.editedItem.last_updated))])],1)],1)],1)],1)],1)],1):t._e(),a("v-form",[a("v-row",{staticClass:"ma-0 pa-0 px-4 pt-4"},[a("v-col",{staticClass:"form-group-heading",attrs:{cols:"12"}},[a("p",{staticClass:"heading ma-0 pa-0"},[a("v-icon",{staticClass:"pb-1",attrs:{size:"30"}},[t._v(" account_circle ")]),t._v(" Account Information ")],1),a("v-divider")],1),a("v-col",{attrs:{cols:"12",xl:"6",lg:"6",md:"6",sm:"6"}},[a("v-text-field",{attrs:{id:"username",filled:"","hide-details":"auto",clearable:"",label:"Username (*)",required:"","prepend-inner-icon":"account_circle","error-messages":t.addUserErrorMessages.username},model:{value:t.editedItem.user.username,callback:function(e){t.$set(t.editedItem.user,"username",e)},expression:"editedItem.user.username"}})],1),a("v-col",{attrs:{cols:"12",xl:"6",lg:"6",md:"6",sm:"6"}},[a("v-text-field",{attrs:{id:"email",filled:"","hide-details":"auto",clearable:"",label:"Email address","prepend-inner-icon":"alternate_email","error-messages":t.addUserErrorMessages.email},model:{value:t.editedItem.user.email,callback:function(e){t.$set(t.editedItem.user,"email",e)},expression:"editedItem.user.email"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{id:"password",type:"password",filled:"","hide-details":"auto",clearable:"",label:"Password (*)",autocomplete:"on","prepend-inner-icon":"lock","error-messages":t.addUserErrorMessages.password},model:{value:t.editedItem.user.password,callback:function(e){t.$set(t.editedItem.user,"password",e)},expression:"editedItem.user.password"}})],1),a("v-col",{staticClass:"form-group-heading",attrs:{cols:"12"}},[a("p",{staticClass:"heading ma-0 pa-0"},[a("v-icon",{staticClass:"pb-1",attrs:{size:"30"}},[t._v(" face ")]),t._v(" Profile Information ")],1),a("v-divider")],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{id:"full-name",filled:"","hide-details":"auto",clearable:"",label:"First name","prepend-inner-icon":"title","error-messages":t.addUserErrorMessages.full_name},model:{value:t.editedItem.full_name,callback:function(e){t.$set(t.editedItem,"full_name",e)},expression:"editedItem.full_name"}})],1),a("v-col",{attrs:{cols:"12",xl:"6",lg:"6",md:"6",sm:"6"}},[a("v-text-field",{attrs:{label:"Contact (*)",type:"number",filled:"","hide-details":"auto",clearable:"",required:"","prepend-inner-icon":"contact_phone","error-messages":t.addUserErrorMessages.contact},model:{value:t.editedItem.contact,callback:function(e){t.$set(t.editedItem,"contact",e)},expression:"editedItem.contact"}})],1),a("v-col",{attrs:{cols:"12",xl:"6",lg:"6",md:"6",sm:"6"}},[a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,i=e.attrs;return[a("v-text-field",t._g(t._b({attrs:{label:"Birth date","prepend-inner-icon":"event",readonly:"",filled:"","hide-details":"auto","error-messages":t.addUserErrorMessages.birth_date},model:{value:t.editedItem.birth_date,callback:function(e){t.$set(t.editedItem,"birth_date",e)},expression:"editedItem.birth_date"}},"v-text-field",i,!1),s))]}}]),model:{value:t.birthDateMenu,callback:function(e){t.birthDateMenu=e},expression:"birthDateMenu"}},[a("v-date-picker",{ref:"picker",attrs:{dark:"",max:(new Date).toISOString().substr(0,10),min:"1950-01-01"},model:{value:t.editedItem.birth_date,callback:function(e){t.$set(t.editedItem,"birth_date",e)},expression:"editedItem.birth_date"}})],1)],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{id:"user-bio",filled:"","hide-details":"auto",label:"Address (*)",clearable:"",required:"","prepend-inner-icon":"room","error-messages":t.addUserErrorMessages.address},model:{value:t.editedItem.address,callback:function(e){t.$set(t.editedItem,"address",e)},expression:"editedItem.address"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"red--text",attrs:{color:"red lighten-5",depressed:""},on:{click:t.close}},[t._v(" Cancel ")]),a("v-btn",{staticClass:"blue--text",attrs:{color:"blue lighten-5",depressed:""},on:{click:function(e){return e.stopPropagation(),t.save(e)}}},[t._v(" Save ")])],1)],1)],1)],1)],1)],1)],1)},i=[],r=(a("96cf"),a("1da1")),n=a("5530"),o=a("a18c"),d=a("2f62"),c=(a("ba7d"),{name:"UserFormDialog",data:function(){return{dialog:!1,birthDateMenu:!1,editedIndex:-1,editedItem:{user:{full_name:"",email:"",username:"",is_superuser:null,is_staff:null,date_joined:null},image:"",contact:null,birth_date:null,address:"",last_updated:null},defaultItem:{}}},computed:Object(n["a"])(Object(n["a"])({},Object(d["b"])({addUserErrorMessages:"user/addUserErrorMessages"})),{},{formTitle:function(){return-1===this.editedIndex?"New User":"Edit User"},formIcon:function(){return-1===this.editedIndex?"person_add":"person"},firstLetter:function(){return-1===this.editedIndex?"F":this.editedItem.user.username[0].toUpperCase()}}),watch:{birthDateMenu:function(t){var e=this;t&&setTimeout((function(){return e.$refs.picker.activePicker="YEAR"}))}},created:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$bus.on("open-user-form-dialog-add-item",t.openDialog),t.$bus.on("open-user-form-dialog-edit-item",t.openEditDialog);case 2:case"end":return e.stop()}}),e)})))()},beforeUnmount:function(){this.$bus.off("open-user-form-dialog-add-item"),this.$bus.off("open-user-form-dialog-edit-item")},methods:{openDialog:function(){this.dialog=!0,this.$store.dispatch("user/clearAddUserErrorMessages")},openEditDialog:function(t){this.editedIndex=t.editedIndex,this.editedItem=t.editedItem,this.openDialog()},close:function(){var t=this;this.$store.dispatch("user/clearAddUserErrorMessages"),this.$nextTick((function(){t.editedItem={user:{email:"",username:"",is_superuser:null,is_staff:null,date_joined:null},full_name:"",image:"",contact:null,birth_date:null,address:"",last_updated:null},t.editedIndex=-1})),this.dialog=!1},openSnack:function(t){var e=arguments,a=this;return Object(r["a"])(regeneratorRuntime.mark((function s(){var i;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return i=e.length>1&&void 0!==e[1]?e[1]:"error",s.next=3,a.$store.dispatch("snack/setSnackState",!0);case 3:return s.next=5,a.$store.dispatch("snack/setSnackColor",i);case 5:return s.next=7,a.$store.dispatch("snack/setSnackText",t);case 7:case"end":return s.stop()}}),s)})))()},save:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a={full_name:t.editedItem.full_name,email:t.editedItem.user.email,username:t.editedItem.user.username,password:t.editedItem.user.password,contact:t.editedItem.contact,birth_date:t.editedItem.birth_date,address:t.editedItem.address},!(t.editedIndex>-1)){e.next=21;break}return e.next=4,t.$store.dispatch("user/update",{id:t.editedItem.user.id,body:a});case 4:if(s=e.sent,!0!==s){e.next=12;break}return e.next=8,t.openSnack("User updated successfully.","success");case 8:t.$bus.emit("reload-users"),t.close(),e.next=19;break;case 12:if(500!==created){e.next=17;break}return e.next=15,t.openSnack("Internal Server Error.");case 15:e.next=19;break;case 17:return e.next=19,t.openSnack("Please load a valid form.");case 19:e.next=38;break;case 21:return e.next=23,t.$store.dispatch("user/addUser",a);case 23:if(i=e.sent,!0!==i){e.next=31;break}return e.next=27,t.openSnack("User added successfully.","success");case 27:t.$bus.emit("reload-users"),t.close(),e.next=38;break;case 31:if(500!==i){e.next=36;break}return e.next=34,t.openSnack("Internal Server Error.");case 34:e.next=38;break;case 36:return e.next=38,t.openSnack("Please load a valid form.");case 38:case"end":return e.stop()}}),e)})))()},routeToUserDetailPage:function(t){o["a"].push({name:"User Detail",params:{id:t}})}}}),l=c,u=(a("16e5"),a("2877")),m=a("6544"),h=a.n(m),p=a("5bc1"),f=a("8212"),v=a("8336"),b=a("b0af"),g=a("99d9"),_=a("cc20"),x=a("62ad"),I=a("2e4b"),k=a("169a"),C=a("ce7e"),w=a("4bd4"),y=a("132d"),S=a("adda"),$=a("8860"),j=a("da13"),O=a("5d23"),D=a("e449"),A=a("0fd9"),T=a("2fa4"),U=a("8654"),V=a("71d9"),E=a("2a7f"),M=a("3a2f"),B=Object(u["a"])(l,s,i,!1,null,"fd5be306",null);e["default"]=B.exports;h()(B,{VAppBarNavIcon:p["a"],VAvatar:f["a"],VBtn:v["a"],VCard:b["a"],VCardActions:g["a"],VChip:_["a"],VCol:x["a"],VDatePicker:I["a"],VDialog:k["a"],VDivider:C["a"],VForm:w["a"],VIcon:y["a"],VImg:S["a"],VList:$["a"],VListItem:j["a"],VListItemContent:O["b"],VMenu:D["a"],VRow:A["a"],VSpacer:T["a"],VTextField:U["a"],VToolbar:V["a"],VToolbarTitle:E["b"],VTooltip:M["a"]})},"615b":function(t,e,a){},9734:function(t,e,a){},"99d9":function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"d",(function(){return d}));var s=a("b0af"),i=a("80d2"),r=Object(i["i"])("v-card__actions"),n=Object(i["i"])("v-card__subtitle"),o=Object(i["i"])("v-card__text"),d=Object(i["i"])("v-card__title");s["a"]},b0af:function(t,e,a){"use strict";a("0481"),a("4069"),a("a9e3");var s=a("5530"),i=(a("615b"),a("10d2")),r=a("297c"),n=a("1c87"),o=a("58df");e["a"]=Object(o["a"])(r["a"],n["a"],i["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({"v-card":!0},n["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},i["a"].options.computed.classes.call(this))},styles:function(){var t=Object(s["a"])({},i["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=r["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),a=e.tag,s=e.data;return s.style=this.styles,this.isClickable&&(s.attrs=s.attrs||{},s.attrs.tabindex=0),t(a,this.setBackgroundColor(this.color,s),[this.genProgress(),this.$slots.default])}})}}]);
//# sourceMappingURL=chunk-2ff389dc.e2bf35b9.js.map