(this.webpackJsonpappAdmin=this.webpackJsonpappAdmin||[]).push([[4],{731:function(e,t,n){"use strict";var a=n(22),r=n.n(a),i=(n(738),n(737)),l=n(728),o=n(39),c=(n(90),n(35)),u=n(45),s=(n(285),n(196)),d=n(0),p=n.n(d),m=(n(89),n(27)),f=(n(730),n(729)),b=n(192);var A=function(e){var t=e.modalList,n=e.option,a=e.title,r=Object(d.useState)(!1),i=Object(l.a)(r,2),o=(i[0],i[1]);return p.a.createElement("div",null,p.a.createElement(f.a,{labelAlign:"right",labelCol:{span:6},wrapperCol:{span:14}},p.a.createElement("div",{className:"cm-flex cm-jc-sa"},p.a.createElement("div",{className:"cm-flex-column"},t.map((function(e,t){if("Editor"!==e.renderType)return e.updateRenderType&&(e.renderType=e.updateRenderType),p.a.createElement(f.a.Item,{label:e.label,required:e.require,key:t,style:{display:"flex"}},Object(b.g)(e,n,o))})),"\u67e5\u770b"!==a?p.a.createElement(m.a,{style:{alignSelf:"center"},onClick:e.submit,type:"primary"},"\u63d0\u4ea4"):null),p.a.createElement("div",null,t.map((function(e,t){if("Editor"===e.renderType)return p.a.createElement("div",null,Object(b.g)(e,n,o))}))))))},y=(n(290),n(197)),h=n(82),g=n(105),v=(n(195),n(193),n(168),n(194)),O=(n(286),n(287),n(81));function E(e,t,n){Object(O.d)(e,n,t,(function(n){if(Array.isArray(e.title.field)){var a=[];e.title.field.map((function(e){a.push(t[e])})),Object(v.a)(n.result,e.title.text,a)}else Object(v.a)(n.result,e.title.text)}))}function w(e,t,n){var a=e.getList;(0,e.setCurrent)(1),a(n)}function j(e,t){var n=e.getList;(0,e.setCurrent)(1),n({}),t({})}function k(e,t,n){var a=this,r=t.openAddModal,i=[];return e.map((function(e){"add"===e.status&&(e.type="primary",e.do=r,i.push(e)),"query"===e.status&&(e.type="dashed",e.do=w.bind(a,t),i.push(e),i.push({type:"danger",name:"\u91cd\u7f6e",do:j.bind(a,t,n)})),"import"===e.status&&i.push(e),"export"===e.status&&(e.type="dashed",e.do=E.bind(t.modalList),i.push(e))})),i}var C=p.a.forwardRef((function(e,t){var n=e.modalList.filter((function(e){return e.isSearch})),a={DING_TOKEN:Object(g.a)()},r=Object(d.useState)({}),i=Object(l.a)(r,2),o=i[0],u=i[1],s=Object(d.useState)(!1),A=Object(l.a)(s,2),v=(A[0],A[1]),O=k(e.actions,e,u);return Object(d.useImperativeHandle)(t,(function(){return{option:o}})),p.a.createElement("div",null,n.length>0?p.a.createElement("div",{className:"cm-mb-01"},p.a.createElement(f.a,{layout:"inline"},n.map((function(e,t){return p.a.createElement(f.a.Item,{label:e.label,key:t},Object(b.g)(e,o,v))})))):null,O.map((function(e,t){return"import"===e.status?p.a.createElement(y.a,{key:t,name:"file",showUploadList:!1,action:h.a+e.url,accept:"excel",headers:a,onChange:function(e){return function(e){"uploading"!==e.file.status&&console.log(e.file,e.fileList),"done"===e.file.status?(c.b.success("\u6587\u4ef6\u5bfc\u5165\u6210\u529f"),w.bind(this)):"error"===e.file.status&&c.b.error("\u6587\u4ef6\u5bfc\u5165\u5931\u8d25")}(e)}},p.a.createElement(m.a,{style:{background:"#52C41A",color:"#fff"}},"\u5bfc\u5165")):p.a.createElement(m.a,{type:e.type,key:t,className:"cm-mr-01",onClick:function(){return e.do(e,o)}},e.name)})))})),S=(n(288),n(198)),x=(n(735),n(739)),N=(n(289),n(199)),R=n(37),L=n.n(R),T="YYYY-MM-DD",D=1;function F(){return(F=Object(o.a)(r.a.mark((function e(t,n,a,i){var l,o,c,u;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l=n.id,o=a.sourceApi,c=o.url,u=o.method,n.isShow=Number(t),t=Number(t),e.next=6,Object(O.f)({url:c,method:u,data:{isShow:t,id:l}});case 6:if("0"===e.sent.code){e.next=9;break}return e.abrupt("return");case 9:i((function(e){return!e}));case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var I=function(e,t,n){var a=[];return e.map((function(e){var t=function(t){return"\u5e8f\u53f7"===e.label?p.a.createElement("span",null,D++):Array.isArray(t)&&e.keyValueField?p.a.createElement("div",null,t.map((function(t,n){return p.a.createElement("span",{key:n},t[e.keyValueField[1]],"\xa0")}))):p.a.createElement("span",null,t)},r=e.renderType;"Upload"===r&&(t=function(e){return p.a.createElement("img",{src:e,style:{width:"160px",height:"90px"},alt:""})}),"Radio"===r&&Array.isArray(e.radioOptions)?t=function(t){return p.a.createElement("div",null,function(e,t){for(var n=0;n<e.length;n++){var a=e[n];if(a.key==t)return a.label}}(e.radioOptions,Number(t)))}:"Tag"===r?t=function(t){return function(e,t){for(var n=0;n<e.length;n++){var a=e[n];if(a.key==t)return p.a.createElement(N.a,{color:a.color},a.label)}}(e.radioOptions,Number(t))}:"Popover"===r?t=function(t,n){return p.a.createElement(x.a,{content:n[e.linkField],title:"Link"},p.a.createElement(N.a,{color:"blue"},p.a.createElement("a",{href:n[e.linkField]},n[e.field])))}:"Switch"===r?t=function(t,a){return p.a.createElement(S.a,{checked:!!a[e.field],onChange:function(t){return function(e,t,n,a){return F.apply(this,arguments)}(t,a,e,n)}})}:"Picker"===r?t=function(t,n){return L()(t).format(e.format||T)}:"MultipleField"===r&&(t=function(t,n){return console.log(n[e.field]),p.a.createElement("div",null,n[e.field]&&Array.isArray(n[e.field])&&n[e.field].map((function(t,a){return p.a.createElement("span",{key:a},t[e.keyValueField[1]],p.a.createElement("span",null,n[e.field].length-1!==a?e.splitKey:" "))})))}),a.push({title:e.label,dataIndex:e.field,key:e.field,width:e.width,render:t})})),t&&t.length&&t.length>0&&a.push({title:"\u64cd\u4f5c",dataIndex:"button",render:function(e,n){return t.map((function(e,t){if("copy"===e.status){n[e.linkField];return p.a.createElement(x.a,{content:n[e.linkField],title:"Link"},p.a.createElement(m.a,{type:e.type,icon:e.icon,key:t,className:"cm-mr-02 btn",onClick:function(){return e.do(e,n)}},e.name))}return p.a.createElement(m.a,{type:e.type,icon:e.icon,key:t,className:"cm-mr-02",onClick:function(){return e.do(e,n)}},e.name)}))}}),D=1,a},U=n(732),Y=n.n(U),B=n(734);var K=function(e){var t=e.modalList,n=e.visible,a=e.title,r=e.option,i=e.onOk,l=e.onCancel,o=e.setRefresh,c=e.labelCol,u=e.wrapperCol;return p.a.createElement(s.a,{title:a,visible:n,onOk:i,onCancel:l},p.a.createElement(f.a,{labelAlign:"right",labelCol:{span:c||8},wrapperCol:{span:u||16}},t.map((function(e,t){return p.a.createElement(f.a.Item,{required:e.require,label:e.label,key:t,help:e.help},Object(b.g)(e,r,o))}))))},P=n(736),q=n.n(P),J=n(786),M=n(787),Q=n(788),z=n(785),G=n(726);function V(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?V(n,!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var H=s.a.confirm;function W(e,t,n){t.queryData?X(n,e,t,t.queryData):X(n,e,t,{})}function X(e,t,n,a){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",i=n.actions,l=n.modalList,o=i.filter((function(e){return"query"===e.status}))[0];Object(O.e)(o,l,a,r,(function(a){var r,i;n.isTreeTable?t((r=a.dataSource,i=n.keys,Object(B.a)(r,i.topId,i))):(t(a.dataSource),e&&e(a.count))}))}function _(e){return p.a.createElement("div",{style:{marginLeft:"25px",color:"#1890ff"}},"\u4e00\u5171\u6709\u3010",e,"\u3011\u6761\u6570\u636e")}function $(e,t,n,a,r,i,l){var o=e.current.option||{};r(l),X(n,a,t,o,{pageCount:l,pageSize:i},l)}function ee(e,t,n,a,r,i,l){e.showDetail?t(!0):n(!0);var o=Object.keys(l);o&&o.length>0?(a("\u63d2\u5165"),i.data&&Array.isArray(i.data)&&i.data.map((function(e){var t=e.field,n=e.updateField;r((function(e){return e[n]=l[t],JSON.parse(JSON.stringify(e))}))}))):(a("\u65b0\u589e"),r({}))}function te(e,t,n,a){e(!0),t((function(e){for(var t in a)e[t]=a[t];return JSON.parse(JSON.stringify(e))}))}function ne(e,t,n,a,r,i,l){var o=e.editCB,c=e.showDetail;o&&o(l,i,this),a("\u7f16\u8f91"),c?t(!0):n(!0),r((function(e){for(var t in l)e[t]=l[t];return JSON.parse(JSON.stringify(e))}))}function ae(e,t,n,a,r){var i=e.modalList,l=e.delData;H({title:"Are you sure delete this task?",content:"Some descriptions",okText:"Yes",okType:"danger",cancelText:"No",onOk:function(){Object(O.b)(a,i,Z({},r,{},l),(function(){c.b.success("\u5220\u9664\u6210\u529f"),W(t,e,n)}))},onCancel:function(){}})}function re(e,t,n,a,r,i,l,o,u,s,d){var p=r.actions,m=r.modalList,f={};"\u65b0\u589e"===e?(f=p.filter((function(e){return"add"===e.status}))[0],Object(O.a)(f,m,t,(function(){o(!1),u(!1),i(1),W(s,r,d),c.b.success("\u6dfb\u52a0\u6210\u529f")}))):"\u63d2\u5165"===e?(f=p.filter((function(e){return"insert"===e.status}))[0],Object(O.c)(f,m,t,(function(){u(!1),n?(o(!1),X(d,s,r,{},{pageCount:a,pageSize:l},a)):X(d,s,r,{},{pageCount:a,pageSize:l},a),c.b.success("\u63d2\u5165\u6210\u529f")}))):"\u7f16\u8f91"===e&&(f=p.filter((function(e){return"update"===e.status}))[0],Object(O.c)(f,m,t,(function(){u(!1),n?(o(!1),X(d,s,r,{},{pageCount:a,pageSize:l},a)):X(d,s,r,{},{pageCount:a,pageSize:l},a),c.b.success("\u7f16\u8f91\u6210\u529f")})))}function ie(e,t){q()(t[e.linkField]),c.b.success("\u590d\u5236\u6210\u529f")}function le(e,t){window.open(t[e.linkField])}function oe(e,t,n,a,r,i,l,o){var c=this;return e.map((function(e){"update"===e.status?(e.type="primary",e.icon=p.a.createElement(J.a,null),e.do=ne.bind(c,t,n,a,r,i)):"del"===e.status?(e.type="danger",e.icon=p.a.createElement(M.a,null),e.do=ae.bind(c,t,l,o)):"copy"===e.status?(e.type="",e.icon=p.a.createElement(Q.a,null),e.do=ie.bind(c)):"preview"===e.status?(e.type="dashed",e.icon=p.a.createElement(z.a,null),e.do=le.bind(c)):"insert"===e.status?(e.type="primary",e.icon=p.a.createElement(G.a,null),e.do=ee.bind(c,t,n,a,r,i)):(e.type="primary",e.icon="folder-open",e.do=te.bind(c,n,i))})),e}function ce(){return(ce=Object(o.a)(r.a.mark((function e(t,n){var a,i,l,o,c,u;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.sourceApi,i=a.url,l=a.method,o=a.data,e.next=3,Object(O.f)(Z({url:i,method:l},o));case 3:if("0"===(c=e.sent).code){e.next=6;break}return e.abrupt("return");case 6:u=(u=c.data).map((function(e){return Z({title:e.name,key:e.id},e)})),u=Object(B.a)(u,0,{id:"id",parentId:"parentId",name:"name"}),t.options=u,n((function(e){return!e}));case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t.a=p.a.forwardRef((function(e,t){var n=Object(d.useState)(""),a=Object(l.a)(n,2),r=a[0],o=a[1],c=Object(d.useState)([]),u=Object(l.a)(c,2),s=u[0],m=u[1],f=Object(d.useState)(!1),b=Object(l.a)(f,2),y=b[0],h=b[1],g=Object(d.useState)(!1),v=Object(l.a)(g,2),O=v[0],E=v[1],w=Object(d.useState)(0),j=Object(l.a)(w,2),k=j[0],S=j[1],x=Object(d.useState)(1),N=Object(l.a)(x,2),R=N[0],L=N[1],T=Object(d.useState)({}),D=Object(l.a)(T,2),F=D[0],U=D[1],B=Object(d.useState)(0),P=Object(l.a)(B,2),q=(P[0],P[1]),J=Object(d.useRef)(null),M=e.modalList,Q=e.actions,z=e.rowSelection,G=e.components,V=e.onRow,Z=e.pagination,H=e.onExpand,te=e.expandedRowRender,ne=e.onExpandedRowsChange,ae=e.expandedRowKeys,ie=e.defaultExpandedRowKeys,le=e.labelCol,ue=e.wrapperCol,se=[],de=M.filter((function(e){return e.visible})),pe=M.filter((function(e){return e.isUpdate&&e.updateVisible})),me=Q.filter((function(e){return e.showColumn})),fe=function(e,t){var n=!1,a=!0,r=!1,i=void 0;try{for(var l,o=e[Symbol.iterator]();!(a=(l=o.next()).done);a=!0){var c=l.value;c.isSearch&&(n=c.isSearch)}}catch(u){r=!0,i=u}finally{try{a||null==o.return||o.return()}finally{if(r)throw i}}return n?t:t.filter((function(e){return"query"!==e.status&&!e.showColumn}))}(M,Q);return M.length>0&&(se=I(de,oe(me,e,h,E,o,U,m,S),q)),Object(d.useEffect)((function(){(W(m,e,S),M.some((function(e){return e.doApi})))&&function(e,t){ce.apply(this,arguments)}(M.filter((function(e){return e.doApi}))[0],q)}),[]),Object(d.useImperativeHandle)(t,(function(){return{dataSource:s,setDataSource:m}})),p.a.createElement("div",{className:"cm-bc-white"},y?p.a.createElement("div",{className:"cm-p-02"},p.a.createElement("div",{onClick:function(){return function(e,t,n,a){t(!1),X(e,n,a,{})}(S,h,m,e)},className:"cm-flex cm-ai-bl cm-cursor-p cm-border-bottom-ddd cm-ptb-01 cm-c-666"},p.a.createElement("img",{src:Y.a,alt:"",className:"cm-mr-01 cm-img-01"}),p.a.createElement("span",null,"\u8fd4\u56de")),p.a.createElement("div",{className:"cm-c-333 cm-fw-bold cm-fs-020 cm-mtb-01"},r),p.a.createElement(A,{option:F,title:r,modalList:pe,submit:function(){return re(r,F,y,R,e,L,10,h,E,m,S)}})):p.a.createElement("div",{className:"cm-p-02"},p.a.createElement("div",{className:"cm-flex cm-mb-02 cm-jc-sb"},p.a.createElement(C,{actions:fe,modalList:M,option:F,ref:J,setCurrent:L,getList:X.bind(this,S,m,e),openAddModal:ee.bind(this,e,h,E,o,U)})),ae?p.a.createElement(i.a,{columns:se,rowSelection:z,dataSource:s,components:G,onExpand:H,expandedRowRender:te,expandedRowKeys:ae||[],defaultExpandedRowKeys:ie||[],onExpandedRowsChange:ne,onRow:V,rowKey:function(e){return e[M[0].field]},footer:function(){return k?_(k):null},pagination:!1===Z?Z:{current:R,onChange:$.bind(this,J,e,S,m,L,10),total:k}}):p.a.createElement(i.a,{columns:se,rowSelection:z,dataSource:s,components:G,onExpand:H,expandedRowRender:te,onExpandedRowsChange:ne,onRow:V,rowKey:function(e){return e[M[0].field]},footer:function(){return k?_(k):null},pagination:!1===Z?Z:{current:R,onChange:$.bind(this,J,e,S,m,L,10),total:k}})),p.a.createElement(K,{title:r,visible:O,labelCol:le,wrapperCol:ue,onOk:function(){return re(r,F,y,R,e,L,10,h,E,m)},option:F,onCancel:function(){return E(!1)},setRefresh:q,modalList:pe}))}))},732:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAB6ADAAQAAAABAAAACgAAAAApxhvnAAAAoElEQVQYGWNkwALS0tLkGBkZ5zOhy2VkZEQDxS7+////GgtMMjMzU/Dfv3/TgYL2QF2RM2fO3AHWmZ6e7vz3799LQIVsLCwsOiAJkCZGoPmdQJUZQHYBUHA+SBAGMOyESYBoRhABMhZo1wKgCaeAxqZNnTr1LUgcrBNo3F5mZmY9IP83EFwGKvYASYJ1ghgwAPIK0NVTgPwlGJIgRbBAAAAQzjnneSDv7wAAAABJRU5ErkJggg=="},754:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(731),l=n(745);t.default=function(){var e=Object(a.useContext)(l.default),t=[{status:"copy",name:"\u590d\u5236\u94fe\u63a5",url:"",method:"",linkField:"picUrl",showColumn:!0},{status:"add",name:"\u65b0\u589e",url:"/admin/authFileRecord/add",method:"post",showColumn:!1,data:{menuCode:e.code}},{status:"query",name:"\u67e5\u8be2",url:"/admin/authFileRecord/allList",method:"post",showColumn:!1,data:{menuCode:e.code}}];return r.a.createElement(i.a,{actions:t,modalList:[{label:"ID",field:"id",renderType:"Input",visible:!1,writable:!0,isUpdate:!0,updateField:"id"},{label:"\u6587\u4ef6",field:"picUrl",renderType:"Upload",visible:!0,writable:!0,isUpdate:!0,updateField:"picUrlList",multiple:!0,listType:"picture-card",maxCount:"9",url:"/admin/authFileRecord/upload?menuCode=gxbgs",updateWritable:!0,updateVisible:!0},{label:"\u94fe\u63a5\u5730\u5740",field:"picUrl",renderType:"Input",require:!0,visible:!1,writable:!0},{label:"\u4e0a\u4f20\u7528\u6237",field:"createUserName",renderType:"Input",require:!0,visible:!0,writable:!0},{label:"\u4e0a\u4f20\u65f6\u95f4",field:"createTime",renderType:"Picker",require:!0,visible:!0,writable:!0,format:"YYYY-MM-DD HH:mm"}],labelCol:2,wrapperCol:20})}}}]);