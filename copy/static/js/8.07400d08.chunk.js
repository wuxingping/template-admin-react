(this.webpackJsonpappAdmin=this.webpackJsonpappAdmin||[]).push([[8],{731:function(e,t,n){"use strict";var a=n(22),r=n.n(a),i=(n(738),n(737)),o=n(728),l=n(39),c=(n(90),n(35)),u=n(45),s=(n(285),n(196)),d=n(0),p=n.n(d),m=(n(89),n(27)),f=(n(730),n(729)),b=n(192);var A=function(e){var t=e.modalList,n=e.option,a=e.title,r=Object(d.useState)(!1),i=Object(o.a)(r,2),l=(i[0],i[1]);return p.a.createElement("div",null,p.a.createElement(f.a,{labelAlign:"right",labelCol:{span:6},wrapperCol:{span:14}},p.a.createElement("div",{className:"cm-flex cm-jc-sa"},p.a.createElement("div",{className:"cm-flex-column"},t.map((function(e,t){if("Editor"!==e.renderType)return e.updateRenderType&&(e.renderType=e.updateRenderType),p.a.createElement(f.a.Item,{label:e.label,required:e.require,key:t,style:{display:"flex"}},Object(b.g)(e,n,l))})),"\u67e5\u770b"!==a?p.a.createElement(m.a,{style:{alignSelf:"center"},onClick:e.submit,type:"primary"},"\u63d0\u4ea4"):null),p.a.createElement("div",null,t.map((function(e,t){if("Editor"===e.renderType)return p.a.createElement("div",null,Object(b.g)(e,n,l))}))))))},y=(n(290),n(197)),h=n(82),g=n(105),O=(n(195),n(193),n(168),n(194)),v=(n(286),n(287),n(81));function E(e,t,n){Object(v.d)(e,n,t,(function(n){if(Array.isArray(e.title.field)){var a=[];e.title.field.map((function(e){a.push(t[e])})),Object(O.a)(n.result,e.title.text,a)}else Object(O.a)(n.result,e.title.text)}))}function w(e,t,n){var a=e.getList;(0,e.setCurrent)(1),a(n)}function j(e,t){var n=e.getList;(0,e.setCurrent)(1),n({}),t({})}function k(e,t,n){var a=this,r=t.openAddModal,i=[];return e.map((function(e){"add"===e.status&&(e.type="primary",e.do=r,i.push(e)),"query"===e.status&&(e.type="dashed",e.do=w.bind(a,t),i.push(e),i.push({type:"danger",name:"\u91cd\u7f6e",do:j.bind(a,t,n)})),"import"===e.status&&i.push(e),"export"===e.status&&(e.type="dashed",e.do=E.bind(t.modalList),i.push(e))})),i}var C=p.a.forwardRef((function(e,t){var n=e.modalList.filter((function(e){return e.isSearch})),a={DING_TOKEN:Object(g.a)()},r=Object(d.useState)({}),i=Object(o.a)(r,2),l=i[0],u=i[1],s=Object(d.useState)(!1),A=Object(o.a)(s,2),O=(A[0],A[1]),v=k(e.actions,e,u);return Object(d.useImperativeHandle)(t,(function(){return{option:l}})),p.a.createElement("div",null,n.length>0?p.a.createElement("div",{className:"cm-mb-01"},p.a.createElement(f.a,{layout:"inline"},n.map((function(e,t){return p.a.createElement(f.a.Item,{label:e.label,key:t},Object(b.g)(e,l,O))})))):null,v.map((function(e,t){return"import"===e.status?p.a.createElement(y.a,{key:t,name:"file",showUploadList:!1,action:h.a+e.url,accept:"excel",headers:a,onChange:function(e){return function(e){"uploading"!==e.file.status&&console.log(e.file,e.fileList),"done"===e.file.status?(c.b.success("\u6587\u4ef6\u5bfc\u5165\u6210\u529f"),w.bind(this)):"error"===e.file.status&&c.b.error("\u6587\u4ef6\u5bfc\u5165\u5931\u8d25")}(e)}},p.a.createElement(m.a,{style:{background:"#52C41A",color:"#fff"}},"\u5bfc\u5165")):p.a.createElement(m.a,{type:e.type,key:t,className:"cm-mr-01",onClick:function(){return e.do(e,l)}},e.name)})))})),S=(n(288),n(198)),x=(n(735),n(739)),N=(n(289),n(199)),R=n(37),L=n.n(R),T="YYYY-MM-DD",D=1;function I(){return(I=Object(l.a)(r.a.mark((function e(t,n,a,i){var o,l,c,u;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=n.id,l=a.sourceApi,c=l.url,u=l.method,n.isShow=Number(t),t=Number(t),e.next=6,Object(v.f)({url:c,method:u,data:{isShow:t,id:o}});case 6:if("0"===e.sent.code){e.next=9;break}return e.abrupt("return");case 9:i((function(e){return!e}));case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var U=function(e,t,n){var a=[];return e.map((function(e){var t=function(t){return"\u5e8f\u53f7"===e.label?p.a.createElement("span",null,D++):Array.isArray(t)&&e.keyValueField?p.a.createElement("div",null,t.map((function(t,n){return p.a.createElement("span",{key:n},t[e.keyValueField[1]],"\xa0")}))):p.a.createElement("span",null,t)},r=e.renderType;"Upload"===r&&(t=function(e){return p.a.createElement("img",{src:e,style:{width:"160px",height:"90px"},alt:""})}),"Radio"===r&&Array.isArray(e.radioOptions)?t=function(t){return p.a.createElement("div",null,function(e,t){for(var n=0;n<e.length;n++){var a=e[n];if(a.key==t)return a.label}}(e.radioOptions,Number(t)))}:"Tag"===r?t=function(t){return function(e,t){for(var n=0;n<e.length;n++){var a=e[n];if(a.key==t)return p.a.createElement(N.a,{color:a.color},a.label)}}(e.radioOptions,Number(t))}:"Popover"===r?t=function(t,n){return p.a.createElement(x.a,{content:n[e.linkField],title:"Link"},p.a.createElement(N.a,{color:"blue"},p.a.createElement("a",{href:n[e.linkField]},n[e.field])))}:"Switch"===r?t=function(t,a){return p.a.createElement(S.a,{checked:!!a[e.field],onChange:function(t){return function(e,t,n,a){return I.apply(this,arguments)}(t,a,e,n)}})}:"Picker"===r?t=function(t,n){return L()(t).format(e.format||T)}:"MultipleField"===r&&(t=function(t,n){return console.log(n[e.field]),p.a.createElement("div",null,n[e.field]&&Array.isArray(n[e.field])&&n[e.field].map((function(t,a){return p.a.createElement("span",{key:a},t[e.keyValueField[1]],p.a.createElement("span",null,n[e.field].length-1!==a?e.splitKey:" "))})))}),a.push({title:e.label,dataIndex:e.field,key:e.field,width:e.width,render:t})})),t&&t.length&&t.length>0&&a.push({title:"\u64cd\u4f5c",dataIndex:"button",render:function(e,n){return t.map((function(e,t){if("copy"===e.status){n[e.linkField];return p.a.createElement(x.a,{content:n[e.linkField],title:"Link"},p.a.createElement(m.a,{type:e.type,icon:e.icon,key:t,className:"cm-mr-02 btn",onClick:function(){return e.do(e,n)}},e.name))}return p.a.createElement(m.a,{type:e.type,icon:e.icon,key:t,className:"cm-mr-02",onClick:function(){return e.do(e,n)}},e.name)}))}}),D=1,a},F=n(732),Y=n.n(F),B=n(734);var q=function(e){var t=e.modalList,n=e.visible,a=e.title,r=e.option,i=e.onOk,o=e.onCancel,l=e.setRefresh,c=e.labelCol,u=e.wrapperCol;return p.a.createElement(s.a,{title:a,visible:n,onOk:i,onCancel:o},p.a.createElement(f.a,{labelAlign:"right",labelCol:{span:c||8},wrapperCol:{span:u||16}},t.map((function(e,t){return p.a.createElement(f.a.Item,{required:e.require,label:e.label,key:t,help:e.help},Object(b.g)(e,r,l))}))))},K=n(736),P=n.n(K),J=n(786),M=n(787),Q=n(788),V=n(785),z=n(726);function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?G(n,!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var W=s.a.confirm;function H(e,t,n){t.queryData?X(n,e,t,t.queryData):X(n,e,t,{})}function X(e,t,n,a){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",i=n.actions,o=n.modalList,l=i.filter((function(e){return"query"===e.status}))[0];Object(v.e)(l,o,a,r,(function(a){var r,i;n.isTreeTable?t((r=a.dataSource,i=n.keys,Object(B.a)(r,i.topId,i))):(t(a.dataSource),e&&e(a.count))}))}function _(e){return p.a.createElement("div",{style:{marginLeft:"25px",color:"#1890ff"}},"\u4e00\u5171\u6709\u3010",e,"\u3011\u6761\u6570\u636e")}function $(e,t,n,a,r,i,o){var l=e.current.option||{};r(o),X(n,a,t,l,{pageCount:o,pageSize:i},o)}function ee(e,t,n,a,r,i,o){e.showDetail?t(!0):n(!0);var l=Object.keys(o);l&&l.length>0?(a("\u63d2\u5165"),i.data&&Array.isArray(i.data)&&i.data.map((function(e){var t=e.field,n=e.updateField;r((function(e){return e[n]=o[t],JSON.parse(JSON.stringify(e))}))}))):(a("\u65b0\u589e"),r({}))}function te(e,t,n,a){e(!0),t((function(e){for(var t in a)e[t]=a[t];return JSON.parse(JSON.stringify(e))}))}function ne(e,t,n,a,r,i,o){var l=e.editCB,c=e.showDetail;l&&l(o,i,this),a("\u7f16\u8f91"),c?t(!0):n(!0),r((function(e){for(var t in o)e[t]=o[t];return JSON.parse(JSON.stringify(e))}))}function ae(e,t,n,a,r){var i=e.modalList,o=e.delData;W({title:"Are you sure delete this task?",content:"Some descriptions",okText:"Yes",okType:"danger",cancelText:"No",onOk:function(){Object(v.b)(a,i,Z({},r,{},o),(function(){c.b.success("\u5220\u9664\u6210\u529f"),H(t,e,n)}))},onCancel:function(){}})}function re(e,t,n,a,r,i,o,l,u,s,d){var p=r.actions,m=r.modalList,f={};"\u65b0\u589e"===e?(f=p.filter((function(e){return"add"===e.status}))[0],Object(v.a)(f,m,t,(function(){l(!1),u(!1),i(1),H(s,r,d),c.b.success("\u6dfb\u52a0\u6210\u529f")}))):"\u63d2\u5165"===e?(f=p.filter((function(e){return"insert"===e.status}))[0],Object(v.c)(f,m,t,(function(){u(!1),n?(l(!1),X(d,s,r,{},{pageCount:a,pageSize:o},a)):X(d,s,r,{},{pageCount:a,pageSize:o},a),c.b.success("\u63d2\u5165\u6210\u529f")}))):"\u7f16\u8f91"===e&&(f=p.filter((function(e){return"update"===e.status}))[0],Object(v.c)(f,m,t,(function(){u(!1),n?(l(!1),X(d,s,r,{},{pageCount:a,pageSize:o},a)):X(d,s,r,{},{pageCount:a,pageSize:o},a),c.b.success("\u7f16\u8f91\u6210\u529f")})))}function ie(e,t){P()(t[e.linkField]),c.b.success("\u590d\u5236\u6210\u529f")}function oe(e,t){window.open(t[e.linkField])}function le(e,t,n,a,r,i,o,l){var c=this;return e.map((function(e){"update"===e.status?(e.type="primary",e.icon=p.a.createElement(J.a,null),e.do=ne.bind(c,t,n,a,r,i)):"del"===e.status?(e.type="danger",e.icon=p.a.createElement(M.a,null),e.do=ae.bind(c,t,o,l)):"copy"===e.status?(e.type="",e.icon=p.a.createElement(Q.a,null),e.do=ie.bind(c)):"preview"===e.status?(e.type="dashed",e.icon=p.a.createElement(V.a,null),e.do=oe.bind(c)):"insert"===e.status?(e.type="primary",e.icon=p.a.createElement(z.a,null),e.do=ee.bind(c,t,n,a,r,i)):(e.type="primary",e.icon="folder-open",e.do=te.bind(c,n,i))})),e}function ce(){return(ce=Object(l.a)(r.a.mark((function e(t,n){var a,i,o,l,c,u;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.sourceApi,i=a.url,o=a.method,l=a.data,e.next=3,Object(v.f)(Z({url:i,method:o},l));case 3:if("0"===(c=e.sent).code){e.next=6;break}return e.abrupt("return");case 6:u=(u=c.data).map((function(e){return Z({title:e.name,key:e.id},e)})),u=Object(B.a)(u,0,{id:"id",parentId:"parentId",name:"name"}),t.options=u,n((function(e){return!e}));case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t.a=p.a.forwardRef((function(e,t){var n=Object(d.useState)(""),a=Object(o.a)(n,2),r=a[0],l=a[1],c=Object(d.useState)([]),u=Object(o.a)(c,2),s=u[0],m=u[1],f=Object(d.useState)(!1),b=Object(o.a)(f,2),y=b[0],h=b[1],g=Object(d.useState)(!1),O=Object(o.a)(g,2),v=O[0],E=O[1],w=Object(d.useState)(0),j=Object(o.a)(w,2),k=j[0],S=j[1],x=Object(d.useState)(1),N=Object(o.a)(x,2),R=N[0],L=N[1],T=Object(d.useState)({}),D=Object(o.a)(T,2),I=D[0],F=D[1],B=Object(d.useState)(0),K=Object(o.a)(B,2),P=(K[0],K[1]),J=Object(d.useRef)(null),M=e.modalList,Q=e.actions,V=e.rowSelection,z=e.components,G=e.onRow,Z=e.pagination,W=e.onExpand,te=e.expandedRowRender,ne=e.onExpandedRowsChange,ae=e.expandedRowKeys,ie=e.defaultExpandedRowKeys,oe=e.labelCol,ue=e.wrapperCol,se=[],de=M.filter((function(e){return e.visible})),pe=M.filter((function(e){return e.isUpdate&&e.updateVisible})),me=Q.filter((function(e){return e.showColumn})),fe=function(e,t){var n=!1,a=!0,r=!1,i=void 0;try{for(var o,l=e[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var c=o.value;c.isSearch&&(n=c.isSearch)}}catch(u){r=!0,i=u}finally{try{a||null==l.return||l.return()}finally{if(r)throw i}}return n?t:t.filter((function(e){return"query"!==e.status&&!e.showColumn}))}(M,Q);return M.length>0&&(se=U(de,le(me,e,h,E,l,F,m,S),P)),Object(d.useEffect)((function(){(H(m,e,S),M.some((function(e){return e.doApi})))&&function(e,t){ce.apply(this,arguments)}(M.filter((function(e){return e.doApi}))[0],P)}),[]),Object(d.useImperativeHandle)(t,(function(){return{dataSource:s,setDataSource:m}})),p.a.createElement("div",{className:"cm-bc-white"},y?p.a.createElement("div",{className:"cm-p-02"},p.a.createElement("div",{onClick:function(){return function(e,t,n,a){t(!1),X(e,n,a,{})}(S,h,m,e)},className:"cm-flex cm-ai-bl cm-cursor-p cm-border-bottom-ddd cm-ptb-01 cm-c-666"},p.a.createElement("img",{src:Y.a,alt:"",className:"cm-mr-01 cm-img-01"}),p.a.createElement("span",null,"\u8fd4\u56de")),p.a.createElement("div",{className:"cm-c-333 cm-fw-bold cm-fs-020 cm-mtb-01"},r),p.a.createElement(A,{option:I,title:r,modalList:pe,submit:function(){return re(r,I,y,R,e,L,10,h,E,m,S)}})):p.a.createElement("div",{className:"cm-p-02"},p.a.createElement("div",{className:"cm-flex cm-mb-02 cm-jc-sb"},p.a.createElement(C,{actions:fe,modalList:M,option:I,ref:J,setCurrent:L,getList:X.bind(this,S,m,e),openAddModal:ee.bind(this,e,h,E,l,F)})),ae?p.a.createElement(i.a,{columns:se,rowSelection:V,dataSource:s,components:z,onExpand:W,expandedRowRender:te,expandedRowKeys:ae||[],defaultExpandedRowKeys:ie||[],onExpandedRowsChange:ne,onRow:G,rowKey:function(e){return e[M[0].field]},footer:function(){return k?_(k):null},pagination:!1===Z?Z:{current:R,onChange:$.bind(this,J,e,S,m,L,10),total:k}}):p.a.createElement(i.a,{columns:se,rowSelection:V,dataSource:s,components:z,onExpand:W,expandedRowRender:te,onExpandedRowsChange:ne,onRow:G,rowKey:function(e){return e[M[0].field]},footer:function(){return k?_(k):null},pagination:!1===Z?Z:{current:R,onChange:$.bind(this,J,e,S,m,L,10),total:k}})),p.a.createElement(q,{title:r,visible:v,labelCol:oe,wrapperCol:ue,onOk:function(){return re(r,I,y,R,e,L,10,h,E,m)},option:I,onCancel:function(){return E(!1)},setRefresh:P,modalList:pe}))}))},732:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAB6ADAAQAAAABAAAACgAAAAApxhvnAAAAoElEQVQYGWNkwALS0tLkGBkZ5zOhy2VkZEQDxS7+////GgtMMjMzU/Dfv3/TgYL2QF2RM2fO3AHWmZ6e7vz3799LQIVsLCwsOiAJkCZGoPmdQJUZQHYBUHA+SBAGMOyESYBoRhABMhZo1wKgCaeAxqZNnTr1LUgcrBNo3F5mZmY9IP83EFwGKvYASYJ1ghgwAPIK0NVTgPwlGJIgRbBAAAAQzjnneSDv7wAAAABJRU5ErkJggg=="},758:function(e,t,n){"use strict";n.r(t);var a=n(54),r=n(55),i=n(57),o=n(56),l=n(58),c=n(0),u=n.n(c),s=n(731),d=[{label:"\u7f16\u53f7",field:"id",renderType:"Input",visible:!1,isUpdate:!0,updateField:"id"},{label:"\u680f\u76ee\u540d\u79f0",field:"columnName",renderType:"Input",require:!0,visible:!0,writable:!1,isUpdate:!0,updateField:"columnName",updateWritable:!0,updateVisible:!0,maxLength:8,width:230},{label:"\u82f1\u6587\u540d\u79f0",field:"description",renderType:"Input",require:!0,visible:!0,isUpdate:!0,updateField:"description",updateWritable:!0,updateVisible:!0,maxLength:15,width:230},{label:"\u680f\u76ee\u56fe\u7247",field:"picUrl",renderType:"Upload",require:!0,visible:!0,isUpdate:!0,updateField:"picUrl",updateWritable:!0,updateVisible:!0},{label:"\u66f4\u65b0\u65f6\u95f4",field:"updateTime",renderType:"Picker",format:"YYYY-MM-DD",require:!0,visible:!0,isUpdate:!1}],p=[{status:"update",name:"\u7f16\u8f91",url:"/admin/weeksColumn/update",method:"post",showColumn:!0},{status:"add",name:"\u65b0\u589e",url:"/admin/weeksColumn/add",method:"post",showColumn:!1},{status:"query",name:"\u67e5\u8be2",url:"/admin/weeksColumn/allList",method:"get",showColumn:!1}],m=function(e){function t(e){return Object(a.a)(this,t),Object(i.a)(this,Object(o.a)(t).call(this,e))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return u.a.createElement(s.a,{actions:p,modalList:d})}}]),t}(u.a.Component);t.default=m}}]);