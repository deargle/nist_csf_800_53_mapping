(function(t){function e(e){for(var s,a,i=e[0],l=e[1],c=e[2],f=0,b=[];f<i.length;f++)a=i[f],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&b.push(n[a][0]),n[a]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);u&&u(e);while(b.length)b.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],s=!0,i=1;i<r.length;i++){var l=r[i];0!==n[l]&&(s=!1)}s&&(o.splice(e--,1),t=a(a.s=r[0]))}return t}var s={},n={index:0},o=[];function a(e){if(s[e])return s[e].exports;var r=s[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=s,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)a.d(r,s,function(e){return t[e]}.bind(null,s));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/nist_csf_800_53_mapping/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"034f":function(t,e,r){"use strict";r("85ec")},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var s=r("2b0e"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("h1",[t._v(t._s(t.title))]),r("p",[t._v("The NIST CSF Core maps controls from 800-53 (and other) informative references, but only by code, which makes text-searching impossible. Mashup!")]),t._m(0),t._m(1),t._m(2),t._m(3),r("hr"),r("b-container",{attrs:{fluid:""}},[r("b-row",[r("b-col",{staticClass:"my-1",attrs:{lg:"6"}},[r("b-form-group",{staticClass:"mb-0",attrs:{label:"Filter","label-cols-sm":"3","label-align-sm":"right","label-size":"sm","label-for":"filterInput"}},[r("b-input-group",{attrs:{size:"sm"}},[r("b-form-input",{attrs:{type:"search",id:"filterInput",placeholder:"Type to Search",debounce:"150"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),r("b-input-group-append",[r("b-button",{attrs:{disabled:!t.filter},on:{click:function(e){t.filter=""}}},[t._v("Clear")])],1)],1)],1),r("b-form-group",{staticClass:"mb-0",attrs:{label:"Filter On","label-cols-sm":"3","label-align-sm":"right","label-size":"sm",description:"Leave all unchecked to filter on all fields"}},[r("b-form-checkbox-group",{staticClass:"mt-1",attrs:{stacked:""},model:{value:t.filterOn,callback:function(e){t.filterOn=e},expression:"filterOn"}},[r("b-form-checkbox",{attrs:{value:"nist_csf_function"}},[t._v("CSF Function")]),r("b-form-checkbox",{attrs:{value:"nist_csf_category_name_and_code"}},[t._v("CSF Category Name")]),r("b-form-checkbox",{attrs:{value:"nist_csf_category"}},[t._v("CSF Category Description")]),r("b-form-checkbox",{attrs:{value:"nist_csf_subcategory"}},[t._v("CSF Subcategory")]),r("b-form-checkbox",{attrs:{value:"800-53_code_and_title"}},[t._v("Control Title")]),r("b-form-checkbox",{attrs:{value:"800-53_family"}},[t._v("Control Family")]),r("b-form-checkbox",{attrs:{value:"800-53_extended_description"}},[t._v("Control Description")])],1)],1)],1),r("b-col",{staticClass:"my-1",attrs:{lg:"6"}},[r("b-form-group",{staticClass:"mb-0",attrs:{label:"Only Show These Core Functions","label-cols-sm":"3","label-align-sm":"right","label-size":"sm",description:"Leave all unchecked to inlcude all core functions"}},[r("b-form-checkbox-group",{staticClass:"mt-1",attrs:{stacked:""},model:{value:t.onlyTheseCoreFunctions,callback:function(e){t.onlyTheseCoreFunctions=e},expression:"onlyTheseCoreFunctions"}},[r("b-form-checkbox",{attrs:{value:"Identify (ID)"}},[t._v("Identify (ID)")]),r("b-form-checkbox",{attrs:{value:"Protect (PR)"}},[t._v("Protect (PR)")]),r("b-form-checkbox",{attrs:{value:"Detect (DE)"}},[t._v("Detect (DE)")]),r("b-form-checkbox",{attrs:{value:"Respond (RS)"}},[t._v("Respond (RS)")]),r("b-form-checkbox",{attrs:{value:"Recover (RC)"}},[t._v("Recover (RC)")])],1)],1)],1)],1),r("b-table",{attrs:{striped:"",hover:"",busy:t.isBusy,items:t.filteredItems,fields:t.fields,filter:t.filter,"filter-included-fields":t.filterOn},scopedSlots:t._u([{key:"thead-top",fn:function(){return[r("b-tr",[r("b-th",{attrs:{variant:"secondary",colspan:"3"}},[t._v("Cybersecurity Framework Core")]),r("b-th",{attrs:{variant:"",colspan:"2"}},[t._v("800-53 Controls")]),r("b-th",{attrs:{colspan:"1"}},[r("span",{staticClass:"sr-only"},[t._v("Show Details")])])],1)]},proxy:!0},{key:"cell(800-53_name)",fn:function(e){return[r("a",{attrs:{href:"https://nvd.nist.gov/800-53/Rev4/control/"+e.value}},[t._v(t._s(e.value))])]}},{key:"cell(show_details)",fn:function(e){return[r("b-button",{staticClass:"mr-2",attrs:{size:"sm"},on:{click:e.toggleDetails}},[t._v(" "+t._s(e.detailsShowing?"Hide":"Show")+" Details ")])]}},{key:"row-details",fn:function(e){return[r("b-card",[r("b-row",{staticClass:"mb-2"},[r("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[r("b",[t._v("CSF Function:")])]),r("b-col",[t._v(t._s(e.item["nist_csf_function_name"]))])],1),r("b-row",{staticClass:"mb-2"},[r("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[r("b",[t._v("CSF Category:")])]),r("b-col",[t._v(t._s(e.item["nist_csf_category"]))])],1),r("b-row",{staticClass:"mb-2"},[r("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[r("b",[t._v("CSF Subcategory:")])]),r("b-col",[t._v(t._s(e.item["nist_csf_subcategory"]))])],1),r("b-row",{staticClass:"mb-2"},[r("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[r("b",[t._v("Control Title:")])]),r("b-col",[t._v(t._s(e.item["800-53_title"]))])],1),r("b-row",{staticClass:"mb-2"},[r("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[r("b",[t._v("Control Family:")])]),r("b-col",[t._v(t._s(e.item["800-53_family"]))])],1),r("b-row",{staticClass:"mb-2"},[r("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[r("b",[t._v("Control Description:")])]),r("b-col",[r("ul",t._l(e.item["800-53_extended_description"],(function(e,s){return r("li",{key:s},[t._v(" "+t._s(e)+" ")])})),0),r("p",[t._v("(Excludes supplemental guidance, if any.)")])])],1),r("b-row",{staticClass:"mb-2"},[r("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[r("b",[t._v("Control Source:")])]),r("b-col",[r("a",{attrs:{href:"https://nvd.nist.gov/800-53/Rev4/control/"+e.item["800-53_name"]}},[t._v(t._s(e.item["800-53_name"]))])])],1),r("b-button",{attrs:{size:"sm"},on:{click:e.toggleDetails}},[t._v("Hide Details")])],1)]}},{key:"table-busy",fn:function(){return[r("div",{staticClass:"text-center text-primary my-2"},[r("b-spinner",{staticClass:"align-middle"}),r("strong",[t._v("Loading...")])],1)]},proxy:!0}])})],1)],1)},o=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("p",{staticClass:"meta"},[t._v("2020-11-03 by "),r("a",{attrs:{href:"https://daveeargle.com"}},[t._v("Dave Eargle")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("p",[t._v("Shows details and permits text-searching of the "),r("a",{attrs:{href:"https://nvd.nist.gov/800-53/Rev4"}},[t._v("NIST Special Publication 800-53 (Rev. 4)")]),t._v(" security and privacy controls "),r("a",{attrs:{href:"https://www.nist.gov/document/csfsubcategories-sp80053mappingxlsx"}},[t._v("mapped")]),t._v(" to the "),r("a",{attrs:{href:"https://www.nist.gov/cyberframework"}},[t._v("NIST Cybersecurity Framework")]),t._v(" Core. ")])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("p",[t._v("Associated blog post "),r("a",{attrs:{href:"https://daveeargle.com/2020/11/03/NIST-CSF-800-53-Mapping/"}},[t._v("here")]),t._v(".")])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("p",[t._v("Github repository "),r("a",{attrs:{href:"https://daveeargle.com/nist_csf_800_53_mapping/"}},[t._v("here")]),t._v(".")])}],a=(r("99af"),r("caad"),r("2532"),r("4de4"),r("d3b7"),r("d81d"),r("f1ca")),i={name:"App",data:function(){return{title:document.title,fields:[{key:"nist_csf_function",label:"CSF Function",sortable:!0},{key:"nist_csf_category_name_and_code",label:"CSF Category",sortable:!0},{key:"nist_csf_subcategory",label:"CSF Subcategory",sortable:!0},{key:"800-53_code_and_title",label:"Control Title",formatter:"controlCodeAndTitle",filterByFormatted:!0,tdClass:"text-capitalize"},{key:"800-53_family",label:"Control Family",sortable:!0},"show_details"],items:[],filter:null,filterOn:[],onlyTheseCoreFunctions:[],isBusy:!0}},methods:{controlCodeAndTitle:function(t,e,r){return"".concat(r["800-53_name"],": ").concat(r["800-53_title"])}},computed:{filteredItems:function(){var t=this,e=this.items;if(!this.onlyTheseCoreFunctions.length)return e;var r=function(e){return t.onlyTheseCoreFunctions.includes(e["nist_csf_function"])};return e.filter(r)}},created:function(){var t=this,e={"Identify (ID)":"blue","Protect (PR)":"purple","Detect (DE)":"orange","Respond (RS)":"red","Recover (RC)":"green"};Object(a["a"])("https://raw.githubusercontent.com/deargle/nist_csf_800_53_mapping/master/data/joined-condensed.csv",(function(t){return t["800-53_extended_description"]&&(t["800-53_extended_description"]=JSON.parse(t["800-53_extended_description"])),t})).then((function(r){var s=r.map((function(t){return t["_cellVariants"]={nist_csf_function:e[t["nist_csf_function"]]},t}));t.items=s,t.isBusy=!1}))}},l=i,c=(r("034f"),r("2877")),u=Object(c["a"])(l,n,o,!1,null,null,null),f=u.exports,b=r("5f5b");r("f9e3"),r("2dd8");s["default"].use(b["a"]),s["default"].config.productionTip=!1,new s["default"]({render:function(t){return t(f)}}).$mount("#app")},"85ec":function(t,e,r){}});
//# sourceMappingURL=index.d1b8deac.js.map