(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9355b6e"],{"07ed":function(t,e,a){"use strict";a.r(e);var s=a("e453"),i=a("f563"),r=a("a644"),n=a("ebb2"),o=a("1120"),c=a("a632"),d=a("f4af"),h=a("ce60"),l=a("8118"),u=a("9832"),f=a("48a5"),p=a("47f2"),b=a("c142"),m=function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-center"},[e(b["a"],{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:s}){return[e(i["a"],t._g(t._b({attrs:{color:"primary",dark:"",icon:"",disabled:!t.doneFromCustomer},on:{click:t.show}},"v-btn",s,!1),a),[e(o["a"],[t._v("kitchen")])],1)]}}])},[e("span",[t._v("Order KOT")])]),e(p["a"],{staticClass:"elevation-4",attrs:{"position-x":t.x,"position-y":t.y,absolute:"","offset-y":"","close-on-content-click":!1,transition:"scale-transition","max-width":"400","nudge-top":"-20"},model:{value:t.showKOTMenu,callback:function(e){t.showKOTMenu=e},expression:"showKOTMenu"}},[e(d["a"],{attrs:{dense:"",dark:"","max-width":"400"}},[e(h["a"],[e("div",{staticClass:"kot-sub-header"},[e(o["a"],{staticClass:"star-icon",attrs:{size:"16"}},[t._v(" star ")]),e("span",[t._v("KOT PRINTER")])],1),e("div",{staticClass:"hint-for-kot"},[t._v(" Cheers! The first KOT has been already printed."),e("br"),t._v(" For another one, be sure you've updated cart item quantities. ")]),e(b["a"],{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({attrs:a,on:s}){return[e(i["a"],t._g(t._b({attrs:{icon:"",loading:t.generatingKot},on:{click:t.generatePostKot}},"v-btn",a,!1),s),[e(o["a"],[t._v("refresh")])],1)]}}])},[e("span",[t._v("Refresh KOT")])])],1),e(n["a"]),t._l(t.batchGroupedKOTItems,(function(a,n){return e(f["a"],{key:n},[e("div",{staticClass:"d-flex justify-space-between align-center pa-2"},[e(r["a"],{staticClass:"point875",attrs:{label:"",small:""}},[t._v(" Batch: "+t._s(a.batch)+" ")]),e(i["a"],{attrs:{loading:t.creatingDoc,small:"",color:"orange",text:""},on:{click:function(e){return t.generateKOTPDF(a)}}},[t._v(" Print ")])],1),t._l(a.cartItems,(function(a,i){return e(h["a"],{key:i+185,attrs:{disabled:""}},[e(u["a"],[e(s["a"],{attrs:{color:"grey",size:"30"}},[e(c["a"],{attrs:{src:a.itemImage}})],1)],1),e(l["b"],[e(l["d"],[t._v(t._s(a.itemName))])],1),e(l["a"],[e("span",{staticClass:"number-font",staticStyle:{"font-size":"26px"}},[t._v(" "+t._s(a.quantityDiff)+" ")])])],1)}))],2)})),e(n["a"]),e(h["a"],[e(l["b"],[e("p",{staticClass:"mb-0",staticStyle:{"font-size":"12px"}},[t._v(" Note: Only the first KOT is automatically generated. Preceding KOTs should be refreshed by the operator manually after updating the order. ")])])],1)],2)],1)],1)},g=[],K=a("19d6"),O=a("a8c6"),v=a("c473"),y={mixins:[v["a"]],props:{orderId:{type:Number,required:!0},doneFromCustomer:{type:Boolean,required:!0}},emits:["refresh"],data:()=>({isLoading:null,showKOTMenu:!1,x:0,y:0,batchGroupedKOTItems:[],doc:null,creatingDoc:!1,generatingKot:!1}),computed:{...Object(K["b"])({orderKOTItems:"cart/orderKOTs"}),document(){return{heading:"Food Swipe and Online Market Company Pvt. Ltd.",location:"New-road, Pokhara"}}},async created(){this.$bus.on("refresh-kot-menu",this.initialize),await this.initialize()},beforeUnmount(){this.$bus.off("refresh-kot-menu",this.initialize)},methods:{async initialize(){this.isLoading=!0,this.batchGroupedKOTItems=[],await this.$store.dispatch("cart/fetchOrderKOT",{orderId:this.orderId}),this.batchGroupedKOTItems=this.$helper.groupOrderKOTByBatch(this.orderKOTItems),this.isLoading=!1},show(t){t.preventDefault(),this.showKOTMenu=!1,this.x=t.clientX,this.y=t.clientY,this.$nextTick(()=>{this.showKOTMenu=!0})},generateKOTPDF(t){this.creatingDoc=!0,this.doc=new O["default"]({orientation:"portrait",uint:"in",format:"dl"}),this.$helper.generateKOTPDF(t,this.doc,this.orderId),this.creatingDoc=!1},async generatePostKot(){this.generatingKot=!0;const t=await this.$store.dispatch("cart/generatePostKotForOrder",{id:this.orderId});this.generatingKot=!1,t?(this.$emit("refresh"),await this.initialize()):await this.openSnack("Kot refresh failed.","error")}}},T=y,_=(a("c3dc"),a("4a4e")),w=Object(_["a"])(T,m,g,!1,null,"3aa6a7dd",null);e["default"]=w.exports},"173b":function(t,e,a){},c3dc:function(t,e,a){"use strict";a("173b")}}]);
//# sourceMappingURL=chunk-a9355b6e.5aafd202.js.map