(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10105216"],{"45e1":function(t,e,a){},abf9:function(t,e,a){"use strict";a("45e1")},ed5b:function(t,e,a){"use strict";a.r(e);var i=a("f563"),n=a("8498"),o=a("fda0"),r=a("ebc8"),s=a("1120"),l=a("a632"),c=function(){var t=this,e=t._self._c;return e(n["a"],{staticStyle:{position:"relative"},attrs:{dark:"",loading:t.loading,height:"100vh",tile:""}},[e(o["a"],{attrs:{height:"100vh","hide-delimiters":"","show-arrows":!1,cycle:"",continuous:""}},t._l(t.homePageContents,(function(t){return e(r["a"],{key:t.id},[e(n["a"],{staticClass:"carousel-cell",attrs:{flat:"",tile:"",height:"100vh"}},[e(l["a"],{staticClass:"carousel-image",attrs:{eager:"",src:t.image,dark:"",gradient:"to top, rgb(0 0 0 / 0%), rgb(0 0 0 / 60%), rgb(0 0 0 / 20%)",height:"100vh"}})],1)],1)})),1),e("div",{staticStyle:{position:"absolute",top:"90vh",width:"100vw",display:"flex","justify-content":"center"}},[e(i["a"],{attrs:{icon:"",large:""},on:{click:t.scrollDown}},[e(s["a"],{attrs:{"x-large":""}},[t._v(" expand_more ")])],1)],1)],1)},h=[],g=a("19d6"),d=a("c473"),u={name:"ShowCaseSlider",mixins:[d["a"]],data:()=>({loading:!1,colors:["green-gradient-rgba","peach-gradient-rgba","blue-gradient","green-gradient-rgba"]}),computed:{...Object(g["b"])({homePageContents:"homePageContent/allContent"})},created(){this.initialize()},methods:{async initialize(){this.isLoading=!0;const t=await this.$store.dispatch("homePageContent/fetchAllHomePageContent");t?this.isLoading=!1:await this.openSnack("Internal server error. Please try again")},scrollDown(){window.scroll({top:window.innerHeight,behavior:"smooth"})}}},w=u,b=(a("abf9"),a("8619")),p=Object(b["a"])(w,c,h,!1,null,"47e2ce30",null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-10105216.9b063791.js.map