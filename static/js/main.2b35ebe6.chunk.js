(this.webpackJsonpform_online_navios_abordados=this.webpackJsonpform_online_navios_abordados||[]).push([[0],{13:function(e,a,t){e.exports=t(26)},19:function(e,a,t){},21:function(e,a,t){},26:function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),r=t(12),o=t.n(r),i=(t(19),t(28));var c=e=>{let{dadosOperacao:a,config:t,handleOperacaoChange:l}=e;return n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Opera\xe7\xe3o"),n.a.createElement("th",null,"Entidade"),n.a.createElement("th",null,"Tipo de Opera\xe7\xe3o"),n.a.createElement("th",null,"Nacionalidade"),n.a.createElement("th",null,"Outras Ag\xeancias")," ")),n.a.createElement("tbody",null,n.a.createElement("tr",null,t.map((e,t)=>n.a.createElement("td",{key:t},n.a.createElement("select",{value:a[t]||"",onChange:e=>l(e,t)},n.a.createElement("option",{value:""},"Selecione"),e.map((e,a)=>n.a.createElement("option",{key:a,value:e},e))))),n.a.createElement("td",null,n.a.createElement("input",{type:"text",value:a[4]||"",onChange:e=>l(e,4),placeholder:"Informe outras ag\xeancias"})))))};var s=e=>{let{dadosFiltrados:a=[],adicionarAoDadostable:t,handleFiltroChange:l}=e;if(!a||0===a.length)return n.a.createElement("p",null,"Lista de navios sendo carregada, aguarde...por favor!!!.");const r=a[0],o=a.slice(1);return n.a.createElement("div",{className:"naviostable"},n.a.createElement("div",{className:"table-wrapper"},n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"A\xe7\xe3o"),r.map((e,a)=>n.a.createElement("th",{key:a},e))),n.a.createElement("tr",null,n.a.createElement("th",null),r.map((e,a)=>n.a.createElement("th",{key:a},n.a.createElement("input",{type:"text",placeholder:"Filtrar",onChange:e=>l(e,a)}))))),n.a.createElement("tbody",null,o.map((e,a)=>n.a.createElement("tr",{key:a},n.a.createElement("td",null,n.a.createElement("button",{onClick:()=>t(e)},"Escolher")),e.map((e,a)=>n.a.createElement("td",{key:a},e))))))))},d=t(3),u=t.n(d);const m=e=>{let{value:a,onChange:t,disabled:l}=e,r="",o="N";if(a){const e=a.split(" ");r=e[0]||"",o=e[1]||"N"}return n.a.createElement("div",{style:{display:"flex",alignItems:"center"}},n.a.createElement(u.a,{mask:"99,99",value:r,onChange:e=>{const a=e.target.value;t({target:{value:a+" "+o}})},disabled:l},e=>n.a.createElement("input",Object.assign({},e,{type:"text",style:{width:"60px"}}))),n.a.createElement("select",{value:o,onChange:e=>{const a=e.target.value;t({target:{value:r+" "+a}})},disabled:l,style:{marginLeft:"4px"}},n.a.createElement("option",{value:"N"},"N"),n.a.createElement("option",{value:"S"},"S")))},p=e=>{let{value:a,onChange:t,disabled:l}=e,r="",o="W";if(a){const e=a.split(" ");r=e[0]||"",o=e[1]||"W"}return n.a.createElement("div",{style:{display:"flex",alignItems:"center"}},n.a.createElement(u.a,{mask:"99,99",value:r,onChange:e=>{const a=e.target.value;t({target:{value:a+" "+o}})},disabled:l},e=>n.a.createElement("input",Object.assign({},e,{type:"text",style:{width:"60px"}}))),n.a.createElement("select",{value:o,onChange:e=>{const a=e.target.value;t({target:{value:r+" "+a}})},disabled:l,style:{marginLeft:"4px"}},n.a.createElement("option",{value:"E"},"E"),n.a.createElement("option",{value:"W"},"W")))},E=e=>{let{value:a,onChange:t,disabled:l}=e,r="",o="N";if(a){const e=a.trim().split(" ");e.length>=3?(r=`${e[0]} ${e[1]}`,o=e[2]):r=2===e.length?`${e[0]} ${e[1]}`:e[0]||""}return n.a.createElement("div",{style:{display:"flex",alignItems:"center"}},n.a.createElement(u.a,{mask:"99 99,99",value:r,onChange:e=>{const a=e.target.value.trim();t({target:{value:a+(o?" "+o:" N")}})},disabled:l},e=>n.a.createElement("input",Object.assign({},e,{type:"text",style:{width:"80px"}}))),n.a.createElement("select",{value:o,onChange:e=>{const a=e.target.value;t({target:{value:`${r} ${a}`.trim()}})},disabled:l,style:{marginLeft:"4px"}},n.a.createElement("option",{value:"N"},"N"),n.a.createElement("option",{value:"S"},"S")))},g=e=>{let{value:a,onChange:t,disabled:l}=e,r="",o="W";if(a){const e=a.trim().split(" ");e.length>=3?(r=`${e[0]} ${e[1]}`,o=e[2]):r=2===e.length?`${e[0]} ${e[1]}`:e[0]||""}return n.a.createElement("div",{style:{display:"flex",alignItems:"center"}},n.a.createElement(u.a,{mask:"99 99,99",value:r,onChange:e=>{const a=e.target.value.trim();t({target:{value:a+(o?" "+o:" W")}})},disabled:l},e=>n.a.createElement("input",Object.assign({},e,{type:"text",style:{width:"80px"}}))),n.a.createElement("select",{value:o,onChange:e=>{const a=e.target.value;t({target:{value:`${r} ${a}`.trim()}})},disabled:l,style:{marginLeft:"4px"}},n.a.createElement("option",{value:"E"},"E"),n.a.createElement("option",{value:"W"},"W")))},v=e=>{let{value:a,onChange:t,disabled:l}=e,r="",o="N";if(a){const e=a.trim().split(" ");e.length>=4?(r=`${e[0]} ${e[1]} ${e[2]}`,o=e[3]):r=e.slice(0,3).join(" ")}return n.a.createElement("div",{style:{display:"flex",alignItems:"center"}},n.a.createElement(u.a,{mask:"99 99 99",value:r,onChange:e=>{const a=e.target.value.trim();t({target:{value:`${a} ${o}`.trim()}})},disabled:l},e=>n.a.createElement("input",Object.assign({},e,{type:"text",style:{width:"100px"}}))),n.a.createElement("select",{value:o,onChange:e=>{const a=e.target.value;t({target:{value:`${r} ${a}`.trim()}})},disabled:l,style:{marginLeft:"4px"}},n.a.createElement("option",{value:"N"},"N"),n.a.createElement("option",{value:"S"},"S")))},h=e=>{let{value:a,onChange:t,disabled:l}=e,r="",o="W";if(a){const e=a.trim().split(" ");e.length>=4?(r=`${e[0]} ${e[1]} ${e[2]}`,o=e[3]):r=e.slice(0,3).join(" ")}return n.a.createElement("div",{style:{display:"flex",alignItems:"center"}},n.a.createElement(u.a,{mask:"99 99 99",value:r,onChange:e=>{const a=e.target.value.trim();t({target:{value:`${a} ${o}`.trim()}})},disabled:l},e=>n.a.createElement("input",Object.assign({},e,{type:"text",style:{width:"100px"}}))),n.a.createElement("select",{value:o,onChange:e=>{const a=e.target.value;t({target:{value:`${r} ${a}`.trim()}})},disabled:l,style:{marginLeft:"4px"}},n.a.createElement("option",{value:"E"},"E"),n.a.createElement("option",{value:"W"},"W")))},b=(e,a,t)=>{if(!e||""===e.trim())return null;if(e=e.trim(),"GG"===a){const a=parseFloat(e.replace(",","."));return isNaN(a)?null:60*a}if("GGMM"===a){const a=2,t=parseInt(e.slice(0,a),10),l=parseFloat(e.slice(a).replace(",","."));return isNaN(t)||isNaN(l)?null:60*t+l}if("GGMMSS"===a){const a=2,t=parseInt(e.slice(0,a),10),l=parseInt(e.slice(a,a+2),10),n=parseInt(e.slice(a+2,a+4),10);return isNaN(t)||isNaN(l)||isNaN(n)?null:60*t+l+n/60}return null},f=(e,a,t)=>{if(null===e)return"";const l=Math.abs(e);if("GG"===a){return(l/60).toFixed(2).replace(".",",")}if("GGMM"===a){const e=Math.floor(l/60);let a=(l-60*e).toFixed(2).replace(".",",");return a.length<5&&(a=a.padStart(5,"0")),`${e} ${a}`}if("GGMMSS"===a){let e=Math.floor(l/60),a=l-60*e,t=Math.floor(a),n=Math.round(60*(a-t));return 60===n&&(n=0,t++,60===t&&(e++,t=0)),`${e}${t.toString().padStart(2,"0")}${n.toString().padStart(2,"0")},00`}return""};var S=e=>{let{dadosSelecionados:a,handleCellEdit:t,updateCellValue:l,updateRowDisabled:r,removerLinha:o,activeLocationFormat:i,setActiveLocationFormat:c,setDadosSelecionados:s}=e;if(!a.length)return n.a.createElement("p",null,'Nenhuma embarca\xe7\xe3o selecionada. Use o filtro para buscar por embarca\xe7\xe3o e clique "ESCOLHER" para inserir a Embarca\xe7\xe3o!');const d={minWidth:"150px",maxWidth:"300px",minHeight:"50px",maxHeight:"150px",whiteSpace:"pre-wrap",wordBreak:"break-all"};return n.a.createElement("div",{className:"dadostable"},n.a.createElement("div",{className:"table-wrapper"},n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Nome da Embarca\xe7\xe3o"),n.a.createElement("th",null,"N\xba Registo/IMO"),n.a.createElement("th",null,"N\xba Matr\xedcula/MMSI"),n.a.createElement("th",null,"Tipo de Embarcacao"),n.a.createElement("th",null,"Nacionalidade"),n.a.createElement("th",null,"Nome do Mestre"),n.a.createElement("th",null,"Ilha"),n.a.createElement("th",null,"Licen\xe7a"),n.a.createElement("th",null,"Data"),n.a.createElement("th",null,"Hora"),n.a.createElement("th",null,"Tipo de Task"),n.a.createElement("th",{colSpan:"2"},n.a.createElement("button",{onClick:()=>{let e;e="GG"===i?"GGMM":"GGMM"===i?"GGMMSS":"GG";const t=a.map(a=>{const t=b(a.latitude,i),l=b(a.longitude,i),n=f(t,e),r=f(l,e);return{...a,latitude:n,longitude:r}});s(t),c(e)}},"ALTERNAR FORMATO: ",i),n.a.createElement("br",null),"Latitude / Longitude"),n.a.createElement("th",null,"Situa\xe7\xe3o"),n.a.createElement("th",null,"Tipo de Infra\xe7\xe3o"),n.a.createElement("th",null,"Medidas Tomadas"),n.a.createElement("th",null,"OBS"),n.a.createElement("th",null,"A\xe7\xf5es"))),n.a.createElement("tbody",null,a.map((e,a)=>n.a.createElement("tr",{key:a},n.a.createElement("td",null,e.nomeEmbarcacao),n.a.createElement("td",null,e.numRegisto),n.a.createElement("td",null,e.numMatricula),n.a.createElement("td",null,e.tipoEmbarcacao),n.a.createElement("td",null,e.nacionalidade),n.a.createElement("td",null,e.nomeMestre),n.a.createElement("td",null,e.ilha),n.a.createElement("td",null,e.licenca),n.a.createElement("td",null,n.a.createElement("input",{type:"date",value:e.data,onChange:e=>l(a,"data",e.target.value),disabled:e.disabled})),n.a.createElement("td",null,n.a.createElement("input",{type:"time",value:e.hora,onChange:e=>l(a,"hora",e.target.value),disabled:e.disabled})),n.a.createElement("td",null,e.disabled?n.a.createElement("span",null,e.tipoDeTask):n.a.createElement("select",{value:e.tipoDeTask,onChange:e=>l(a,"tipoDeTask",e.target.value),disabled:e.disabled},n.a.createElement("option",{value:""},"Selecione..."),n.a.createElement("option",{value:"Abordado"},"Abordado"),n.a.createElement("option",{value:"Avistado"},"Avistado"),n.a.createElement("option",{value:"Investigado"},"Investigado"))),n.a.createElement("td",null,"GG"===i?n.a.createElement(m,{value:e.latitude||"",onChange:e=>l(a,"latitude",e.target.value),disabled:e.disabled}):"GGMM"===i?n.a.createElement(E,{value:e.latitude||"",onChange:e=>l(a,"latitude",e.target.value),disabled:e.disabled}):"GGMMSS"===i?n.a.createElement(v,{value:e.latitude||"",onChange:e=>l(a,"latitude",e.target.value),disabled:e.disabled}):n.a.createElement("input",{type:"text",value:"",disabled:!0,placeholder:"Inativo",style:{width:"80px"}})),n.a.createElement("td",null,"GG"===i?n.a.createElement(p,{value:e.longitude||"",onChange:e=>l(a,"longitude",e.target.value),disabled:e.disabled}):"GGMM"===i?n.a.createElement(g,{value:e.longitude||"",onChange:e=>l(a,"longitude",e.target.value),disabled:e.disabled}):"GGMMSS"===i?n.a.createElement(h,{value:e.longitude||"",onChange:e=>l(a,"longitude",e.target.value),disabled:e.disabled}):n.a.createElement("input",{type:"text",value:"",disabled:!0,placeholder:"Inativo",style:{width:"80px"}})),n.a.createElement("td",null,e.disabled?n.a.createElement("span",null,e.situacao):n.a.createElement("select",{value:e.situacao,onChange:e=>l(a,"situacao",e.target.value),disabled:e.disabled},n.a.createElement("option",{value:""},"Selecione..."),n.a.createElement("option",{value:"Irregular"},"Irregular"),n.a.createElement("option",{value:"Ilegal"},"Ilegal"),n.a.createElement("option",{value:"Legal"},"Legal"))),n.a.createElement("td",null,n.a.createElement("textarea",{value:e.tipoInfracao,onChange:e=>l(a,"tipoInfracao",e.target.value),disabled:e.disabled,style:d,rows:3})),n.a.createElement("td",null,n.a.createElement("textarea",{value:e.medidasTomadas,onChange:e=>l(a,"medidasTomadas",e.target.value),disabled:e.disabled,style:d,rows:3})),n.a.createElement("td",null,n.a.createElement("textarea",{value:e.observacoes,onChange:e=>l(a,"observacoes",e.target.value),disabled:e.disabled,style:d,rows:3})),n.a.createElement("td",null,n.a.createElement("button",{onClick:()=>r(a,!e.disabled)},e.disabled?"Editar":"Pronto"),n.a.createElement("button",{onClick:()=>o(a)},"Excluir"))))))))},y=(t(21),t(5));var C=function(){const[e,a]=Object(l.useState)(()=>{const e=localStorage.getItem("dadosOperacao");return e?JSON.parse(e):["","","","",""]}),[t,r]=Object(l.useState)(()=>{const e=localStorage.getItem("dadosSelecionados");return e?JSON.parse(e):[]}),[o,d]=Object(l.useState)([]),[u,m]=Object(l.useState)({}),[p,E]=Object(l.useState)(!0),[g,v]=Object(l.useState)(""),[h,b]=Object(l.useState)({nacionalidadeEntidade:[],operacoes:[],entidades:[],tiposEntidade:[],situacoes:[],tiposEmbarcacao:[]});Object(l.useEffect)(()=>{Promise.all([async function(){try{const e=await i.a.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vQmY3QHsDgxr-YD_5pvQla3QqEv54ek8sqB1HolsYgfOaFpTT7huZI-E7EVtt_TV0hD0Jq52j46y4vn/pub?gid=481503026&single=true&output=csv"),a=e.data.split("\n").map(e=>e.split(",")).slice(1);b({nacionalidadeEntidade:a.map(e=>e[0]).filter(Boolean),operacoes:a.map(e=>e[2]).filter(Boolean),entidades:a.map(e=>e[4]).filter(Boolean),tiposEntidade:a.map(e=>e[6]).filter(Boolean),situacoes:a.map(e=>e[8]).filter(Boolean),tiposEmbarcacao:a.map(e=>e[10]).filter(Boolean)})}catch(g){console.error("Erro ao buscar configura\xe7\xe3o:",g),v("Falha ao carregar configura\xe7\xf5es.")}}(),async function(){try{const e=(await i.a.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vR6IEKVLswVSPSlD5qKBtbTqwj7ciZOhr40a84inuVTeeXIyC8KueX8IaVW2tILpaVxp5p2OsoxBi6g/pub?output=csv")).data.split("\n").map(e=>e.split(","));d(e)}catch(g){console.error("Erro ao buscar dados dos navios:",g),v("Falha ao carregar dados dos navios.")}}()]).then(()=>E(!1))},[]),Object(l.useEffect)(()=>{localStorage.setItem("dadosOperacao",JSON.stringify(e))},[e]),Object(l.useEffect)(()=>{localStorage.setItem("dadosSelecionados",JSON.stringify(t))},[t]);const f=o.filter((e,a)=>0===a||e.every((e,a)=>{const t=u[a];if(!t)return!0;return(e?String(e).toLowerCase():"").includes(t.toLowerCase())})),C=(e,a)=>{if(!e)return"";const t=(e=>{if(!e)return null;const a=e.trim().replace(",",".").split(" ");if(a.length<2)return null;const t=a.slice(0,a.length-1).join(" ").split(" ");return 1===t.length&&t[0].includes(".")?"GG":2===t.length&&t[1].includes(".")?"GGMM":3===t.length?"GGMMSS":null})(e);if(!t)return e;const l=e.trim().replace(",",".").split(" "),n=l.pop().toUpperCase(),r=l.join(" ");let o=0,i=0,c=0;if("GG"===t)o=parseFloat(r),i=o%1*60,o=Math.floor(o);else if("GGMM"===t){const[e,a]=r.split(" ");o=parseInt(e,10),i=parseFloat(a)}else if("GGMMSS"===t){const[e,a,t]=r.split(" ");o=parseInt(e,10),i=parseInt(a,10),c=parseFloat(t)}let s=`${o}${(i+c/60).toFixed(2).replace(".",",")}`;return(a&&"S"===n||!a&&"W"===n)&&(s="-"+s),s},[M,x]=Object(l.useState)(()=>localStorage.getItem("activeLocationFormat")||"GG");return Object(l.useEffect)(()=>{localStorage.setItem("activeLocationFormat",M)},[M]),n.a.createElement("div",{className:"container"},n.a.createElement("h1",null,"FORMUL\xc1RIO PARA NAVIOS ABORDADOS/AVISTADOS/INVESTIGADOS"),p?n.a.createElement("p",null,"Carregando..."):g?n.a.createElement("p",{className:"error"},g):null,n.a.createElement(c,{dadosOperacao:e,config:[h.operacoes,h.entidades,h.tiposEntidade,h.nacionalidadeEntidade],handleOperacaoChange:(e,t)=>{const l=e.target.value;a(e=>{const a=[...e];return a[t]=l,a})}}),n.a.createElement(s,{dadosFiltrados:f,adicionarAoDadostable:e=>{e[0]&&e[0].trim().toLowerCase()==="nome da embarca\xe7\xe3o".toLowerCase()||r(a=>[...a,{nomeEmbarcacao:e[0],tipoDeTask:"",numRegisto:e[1],numMatricula:e[2],tipoEmbarcacao:e[3],nacionalidade:e[4],nomeMestre:e[5],ilha:e[6],licenca:e[7],localizacaoGG:"",localizacaoGGMM:"",localizacaoGGMMSS:"",latitude:"",longitude:"",situacao:"",tipoInfracao:"",medidasTomadas:"",observacoes:"",disabled:!1,data:(new Date).toISOString().substring(0,10),hora:(new Date).toLocaleTimeString("pt-PT",{hour:"2-digit",minute:"2-digit",hour12:!1})}])},handleFiltroChange:(e,a)=>{const t=e.target.value;m(e=>({...e,[a]:t}))}}),n.a.createElement(S,{dadosSelecionados:t,handleCellEdit:(e,a,t)=>{const l=e.target.innerText;r(e=>{const n=[...e];return n[a][t]=l,n})},updateCellValue:(e,a,t)=>{r(l=>{const n=[...l];return n[e][a]=t,n})},updateRowDisabled:(e,a)=>{r(t=>{const l=[...t];return l[e].disabled=a,l})},removerLinha:e=>{r(a=>a.filter((a,t)=>t!==e))},activeLocationFormat:M,setActiveLocationFormat:x,setDadosSelecionados:r}),n.a.createElement("button",{onClick:()=>{if(e.every(e=>""===e.trim()))return void alert("Por favor, altere os dados de opera\xe7\xe3o antes de enviar.");if(t.filter(e=>!e.disabled).length>0)return void alert("Todas as linhas devem estar no estado 'Pronto' antes de enviar.");const a={operacao:e[0]||"",entidade:e[1]||"",tipoOperacao:e[2]||"",nacionalidadeOperacao:e[3]||"",outrasAgencias:e[4]||""},l=t.map(e=>{const t=C(e.latitude,!0),l=C(e.longitude,!1);return[a.operacao,a.entidade,a.tipoOperacao,a.nacionalidadeOperacao,e.nomeEmbarcacao,e.numRegisto,e.numMatricula,e.tipoEmbarcacao,e.nacionalidade,e.nomeMestre,e.ilha,e.licenca,e.data,e.hora,e.tipoDeTask,t,l,e.situacao,e.tipoInfracao,e.medidasTomadas,a.outrasAgencias,e.observacoes]}),n=y.a.aoa_to_sheet([["Opera\xe7\xe3o","Entidade","Tipo","Nacionalidade","Nome da Embarca\xe7\xe3o","N\xba Registo/IMO","N\xba Matr\xedcula/MMSI","Tipo de Embarcacao","Nacionalidade","Nome do Mestre","Ilha","Licen\xe7a","Data","Hora","Tipo de Task","Latitude","Longitude","Situa\xe7\xe3o","Tipo de Infra\xe7\xe3o","Medidas Tomadas","Outras Ag\xeancias","OBS"],...l]),r=y.a.book_new();y.a.book_append_sheet(r,n,"Dados"),y.b(r,"dados_exportados.xlsx")},style:{marginTop:"20px",padding:"10px 20px"}},"Enviar/Download de dados"),n.a.createElement("button",{onClick:()=>{window.confirm("Tem certeza que deseja resetar os dados e come\xe7ar do zero?")&&(localStorage.clear(),window.location.reload())},style:{marginTop:"20px",padding:"10px 20px",backgroundColor:"#dc3545",color:"white"}},"Resetar Dados"))};var M=e=>{e&&e instanceof Function&&t.e(3).then(t.bind(null,29)).then(a=>{let{getCLS:t,getFID:l,getFCP:n,getLCP:r,getTTFB:o}=a;t(e),l(e),n(e),r(e),o(e)})};o.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(C,null))),M()}},[[13,1,2]]]);
//# sourceMappingURL=main.2b35ebe6.chunk.js.map