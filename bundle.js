!function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=7)}([function(e,t,s){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.logoutUser=t.initPage=t.allowedUsers=t.currentUser=t.loggedIn=void 0,s(8),s(2);const n=i(s(4));function o(){const e=document.getElementById("user_name"),s=document.getElementById("password"),i=t.allowedUsers.findIndex(t=>t.usr===e.value&&t.pwd===s.value),o=document.getElementById("login_result");e.value.trim()?-1===i&&-1===t.allowedUsers.findIndex(t=>t.usr===e.value)?(o.innerHTML="User not found. Please check your user name",o.setAttribute("class","login-error")):-1!==i?(o.innerHTML="Login Success",o.setAttribute("class","login-success"),t.loggedIn=!0,t.currentUser=t.allowedUsers[i].name,console.log("logged in successfully"),n.default.goto("/pageLayout",!0)):(o.innerHTML="Login Failed",o.setAttribute("class","login-error")):(o.innerHTML="Please enter your user name and password",o.setAttribute("class","login-error"))}function d(){console.log("called initialization function");document.getElementById("login_button").onclick=o}t.loggedIn=!1,t.currentUser="",t.allowedUsers=[{usr:"ar",pwd:"ar123",name:"Arjun"},{usr:"demo",pwd:"demo",name:"Demo User"}],t.initPage=d,t.logoutUser=function(){console.log("logging out user"),t.currentUser="",t.loggedIn=!1,n.default.goto("/",!0,!0)},d(),n.default.initialize()},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateIssueInIssueList=t.addToIssueList=t.onDrop=t.onDragOver=t.onDragStart=t.addButtonHandlers=t.convertIssueToDomListItem=t.issueList=void 0;const i=s(0),n=s(3),o=s(5);t.issueList=[{title:"issue_1",id:1,status:"todo",description:"",assignee:"Arjun"},{title:"issue_2",id:2,status:"todo",description:"",assignee:"Arjun"},{title:"issue_3",id:3,status:"todo",description:"",assignee:"Arjun"},{title:"issue_4",id:4,status:"done",description:"",assignee:"Arjun"},{title:"issue_5",id:5,status:"progress",description:"",assignee:"Arjun"},{title:"issue_6",id:6,status:"done",description:"",assignee:"Demo User"},{title:"issue_7",id:7,status:"progress",description:"",assignee:"Demo User"},{title:"issue_8",id:8,status:"progress",description:"",assignee:"Demo User"},{title:"issue_9",id:9,status:"qa",description:"",assignee:"Demo User"},{title:"issue_10",id:10,status:"qa",description:"",assignee:"Demo User"}];const d={todo:[],progress:[],qa:[],done:[]};function a(e){const t=document.createElement("li");t.setAttribute("draggable","true"),t.innerText=e.title,t.id=String(e.id);const s=e.status+"-issues",i=document.getElementById(s);i&&i.insertBefore(t,i.firstChild),d[e.status]=[e,...d[e.status]]}function l(){console.log("initializing buttons!!");const e=e=>document.getElementById(e),t=e("new-issue"),s=e("new_issue_form_submit"),i=e("new_issue_form_close");t.onclick=n.openNewIssueModal,console.log("NEW ISSUE BUTTON::",t),s.onclick=n.createNewIssue,i.onclick=n.newIssueModalReset}function u(e){const t=JSON.stringify({id:e.target.id,parentId:e.target.parentElement.id});e.dataTransfer.dropEffect="move",e.dataTransfer.setData("text/plain",t),console.log("drag started for:",e.target,e.target.parentElement.id,e.dataTransfer)}function r(e){e.preventDefault()}function c(e){const{id:t,parentId:s}=JSON.parse(e.dataTransfer.getData("text")),i=e.target,n=document.getElementById(t);i.appendChild(n),function(e,t,s){let i;d[t]=d[t].filter(t=>(t.id===Number(e)&&(i=t,i.status=s),t.id!==Number(e))),i&&(d[s]=[i,...d[s]]);console.log("board status old:",d[t]),console.log("board status new:",d[s])}(t,s.split("-")[0],e.target.id.split("-")[0]),e.dataTransfer.clearData()}t.convertIssueToDomListItem=a,t.addButtonHandlers=l,t.default=function(){console.log("loading init func of /board"),t.issueList.forEach(e=>a(e)),document.querySelectorAll("ul[class='issue-drag-box']").forEach(e=>{e.ondragstart=u,e.ondragover=r,e.ondrop=c}),document.getElementById("header-buttons").insertAdjacentHTML("beforeend",o);const e=document.getElementById("new_issue_assignee");i.allowedUsers.forEach(t=>{const s=document.createElement("option");s.innerText=t.name,s.value=t.name,e.appendChild(s)}),console.log("ISSUE UTILS::"),l()},t.onDragStart=u,t.onDragOver=r,t.onDrop=c,t.addToIssueList=function(e){t.issueList=[e,...t.issueList]},t.updateIssueInIssueList=function(e){t.issueList=t.issueList.map(t=>t.id===e.id?e:t)}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initPage=void 0,s(9);const i=s(5),n=s(3),o=s(1),d=s(0);let a={};function l(e){const t=e.target.id;if(document.getElementById("edit-issue-button").removeAttribute("disabled"),a.id!==t){const e="issues-view-list-selected-item";if(a.id){const t=document.querySelector(`li[id="${a.id}"]`);if(t){const s=t.getAttribute("class").replace(e,"");t.setAttribute("class",s)}}const s=document.querySelector(`li[id="${t}"]`),i=s.getAttribute("class")+" "+e;s.setAttribute("class",i),a=o.issueList.find(e=>e.id===Number(t)),function(){const e=document.getElementById("issue-status-display"),t=document.getElementById("issues-view-issue-number"),s=document.getElementById("issues-view-issue-title"),i=document.getElementById("issues-view-assignee"),n=document.getElementById("issues-view-description");t.innerText=a.id,s.innerText=a.title,e.innerText=c(a.status),i.value=a.assignee,n.value=a.description}()}}function u(){const e=document.getElementById("issue-status-select"),t=document.getElementById("issue-status-display"),s=document.getElementById("issues-view-assignee"),i=document.getElementById("issues-view-description"),n=document.getElementById("edit-issue-button");document.querySelectorAll(".issue-details-edit-controls").forEach(e=>{e.style.display="inline-block"}),t.style.display="none",s.removeAttribute("disabled"),i.removeAttribute("readonly"),n.style.display="none",e.value=a.status}function r(){var e;const t=document.getElementById("issue-status-select"),s=document.getElementById("issues-view-assignee"),i=document.getElementById("issues-view-description");let n=Object.assign(Object.assign({},a),{status:t.value,assignee:s.value,description:i.value});const d=document.getElementById(String(n.id));if(d){const t=null===(e=d.getAttribute("class"))||void 0===e?void 0:e.replace(a.status,n.status);d.setAttribute("class",t)}a=n,o.updateIssueInIssueList(n),g()}function c(e){let t;switch(a.status){case"todo":t="To Do";break;case"progress":t="In Progress";break;case"done":t="Done";break;case"qa":t="QA";break;default:t=""}return t}function g(){const e=document.getElementById("issue-status-display"),t=document.getElementById("issues-view-assignee"),s=document.getElementById("issues-view-description"),i=document.getElementById("edit-issue-button"),n=document.querySelectorAll(".issue-details-edit-controls");e.innerText=c(a.status),t.value=a.assignee,s.value=a.description,n.forEach(e=>{e.style.display="none"}),e.style.display="inline-block",t.setAttribute("disabled","true"),s.setAttribute("readonly","true"),i.style.display="inline-block"}function v(){g()}function m(e){const t=document.createElement("li");t.setAttribute("id",String(e.id));const s="issues-view-list-item type-"+e.status;return t.setAttribute("class",s),t.innerText=e.title,t.onclick=l,t}function p(){const e=n.createNewIssue();if(e){const t=document.getElementById("issues-view-list"),s=m(e);t.prepend(s)}}t.initPage=function(){console.log("loading issues page");const e=document.getElementById("save-issue-button"),t=document.getElementById("edit-issue-button"),s=document.getElementById("cancel-issue-changes-button");e.onclick=r,t.onclick=u,t.disabled=!0,console.log("edit button::",t,u),s.onclick=v,document.getElementById("issues_view").insertAdjacentHTML("beforeend",i);const a=document.getElementById("issues-view-assignee"),l=document.getElementById("new_issue_assignee");d.allowedUsers.forEach(e=>{const t=document.createElement("option");t.innerText=e.name,t.value=e.name,l.appendChild(t);const s=t.cloneNode(!0);a.appendChild(s)}),document.getElementById("new-issue").onclick=n.openNewIssueModal,document.getElementById("new_issue_form_submit").onclick=p,document.getElementById("new_issue_form_close").onclick=n.newIssueModalReset,function(){const e=document.getElementById("issues-view-list");o.issueList.forEach(t=>{const s=m(t);e.appendChild(s)})}()}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.newIssueModalReset=t.createNewIssue=t.openNewIssueModal=void 0;const i=s(1);function n(){const e=document.querySelectorAll("p[class='new-issue-modal-error']");e&&e.forEach(e=>e.remove());document.getElementById("new_issue_form").reset()}t.openNewIssueModal=function(){document.querySelector("dialog[id='new-issue-modal']").showModal()},t.createNewIssue=function(){const e=document.getElementById("new_issue_title"),t=document.getElementById("new_issue_status"),s=document.getElementById("new_issue_description"),o=document.getElementById("new_issue_assignee"),d=e.value,a=t.value,l=s.value,u=o.value,r=(e,t)=>{var s;const i=document.createElement("p");i.innerText=t,i.setAttribute("class","new-issue-modal-error"),null===(s=e.parentNode)||void 0===s||s.insertBefore(i,e.nextSibling)};if(d.trim()||r(e,"Please enter a title"),l.trim()||r(s,"Please enter some description"),l.trim()&&d.trim()){const e={title:d,status:a,description:l,assignee:u,id:i.issueList.length+1};console.log("NEw Issue::",e),i.addToIssueList(e),i.convertIssueToDomListItem(e);const t=document.getElementById("new-issue-modal");return n(),t.close(),e}},t.newIssueModalReset=n},function(e,t,s){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.RouterClass=void 0;const n=i(s(10)),o=s(0);class d{constructor(e){this.routes=n.default,this.logout=o.logoutUser,e&&(this.routes=e)}goto(e,t,s){var i,n;console.log("going to route::",e);const o=this.routes.find(t=>t.url===e);console.log("loadPageContent::",t,"Current route::",null===(i=this.currentRoute)||void 0===i?void 0:i.url,"required route::",null==o?void 0:o.url),(null===(n=this.currentRoute)||void 0===n?void 0:n.url)!==(null==o?void 0:o.url)&&(this.currentRoute=o),t?(console.log("loading page contents!"),this.loadContent(this.currentRoute.content,this.currentRoute.targetNodeId)):o&&o.initialize(),s&&this.changeBrowserUrl(e)}setupPageContentTracker(){const e=document.getElementById("page-content");this.pageContentTracker=new MutationObserver(this.initializePage),this.pageContentTracker.observe(e,{chidList:!0})}initializePage(){console.log("initializing selected page::",this.currentRoute.url),this.currentRoute.initialize()}loadContent(e,t="content"){try{document.getElementById(t).innerHTML=e,this.initializePage()}catch(e){return!1}return!0}initialize(){console.log(" router initialize has been called")}changeBrowserUrl(e){history.pushState({},e.split("/")[0],e)}}t.RouterClass=d;const a=new d;t.default=a},function(e,t){e.exports='<dialog id=new-issue-modal class=new-issue-modal> <div class=modal-title> New Issue </div> <div class=modal-content> <form id=new_issue_form method=dialog> <p class=modal-content-item> Title <input id=new_issue_title type=text maxlength=100 placeholder="Issue title (100 characters max.)"> </p> <p class=modal-content-item> Status <select id=new_issue_status placeholder="Title for issue"> <option value=todo> To Do </option> <option value=progress> In Progress </option> <option value=done> Done </option> <option value=qa> QA </option> </select> </p> <p class=modal-content-item> Assignee <select id=new_issue_assignee> </select> </p> <p class=modal-content-description> Description &nbsp; <textarea id=new_issue_description type=text class=modal-textarea placeholder="Enter description of the issue"></textarea> </p> <button id=new_issue_form_close type=close onclick=newIssueModalReset()> Cancel </button> </form> <button id=new_issue_form_submit type=submit onclick=createNewIssue()> Create </button> </div> </dialog>'},function(e,t,s){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.initPageTemplate=void 0,s(11);const n=s(0),o=i(s(4));function d(e){const t=document.querySelectorAll(".sidenav a");t&&t.forEach(t=>{var s,i;if(t.id===e.target.id){const e=t.getAttribute("class")+" sidenav-selected";t.setAttribute("class",e)}else{const e=t.getAttribute("class");if(e){const s=e.replace(" sidenav-selected","");t.setAttribute("class",s)}}const n=null===(i=null===(s=e.target)||void 0===s?void 0:s.id)||void 0===i?void 0:i.replace("sidenav-","/");n&&"/dashboard"!==n&&o.default.goto(n,!0,!0)})}t.initPageTemplate=function(){document.getElementById("topbar-greeting").innerText="Hi, "+n.currentUser,document.getElementById("logout_button");const e=document.getElementById("sidenav-issues"),t=document.getElementById("sidenav-board"),s=document.getElementById("sidenav-dashboard");e.onclick=d,t.onclick=d,s.onclick=d,document.getElementById("sidenav-board").setAttribute("class"," sidenav-selected"),o.default.goto("/board",!0,!0)}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),s(0),s(6),s(1),s(2),s(3),s(4)},function(e,t,s){},function(e,t,s){},function(e,t,s){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(2),o=s(0),d=s(6),a=i(s(1)),l=i(s(12)),u=s(13),r=s(14),c=s(15),g=[{url:"/",initialize:o.initPage,content:l.default,targetNodeId:"content"},{url:"/pageLayout",initialize:d.initPageTemplate,content:u,targetNodeId:"content"},{url:"/board",initialize:a.default,content:r,targetNodeId:"page-content"},{url:"/issues",initialize:n.initPage,content:c,targetNodeId:"page-content"}];t.default=g},function(e,t,s){},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default="\n<div class='login-main'>\n    <div class='title-container'>\n        Task Management System\n    </div>\n    <div class='login-container'>\n        <div class='login-details'>\n            <div class='login-container-elements login-title'> Login to your account </div>\n            <div class='login-container-elements'> Username <input id='user_name' placeholder='User name'> </div>\n            <div class='login-container-elements'> Password <input id='password' type='password' placeholder='Password'>\n            </div>\n            <div id='login_result'> </div>\n            <button id='login_button' class='login-container-elements login-button' onclick='checkUserDetails()'> Login\n            </button>\n        </div>\n    </div>\n</div>\n"},function(e,t){e.exports="<div class=main> <div class=topbar> <div class=topbar-title>Task Management System</div> <div class=topbar-details> <div id=topbar-greeting class=topbar-greeting> Hi User!</div> <a id=logout_button href=/ title=Logout class=topbar-logout> <svg width=24 height=24> <circle cx=12 cy=15 r=8 stroke=white stroke-width=2 fill=none /> <line x1=12 y1=4 x2=12 y2=15 stroke=white stroke-width=2 /> </svg> </a> </div> </div> <div class=body-content> <div class=sidenav> <a id=sidenav-dashboard>Dashboard</a> <a id=sidenav-board>Board</a> <a id=sidenav-issues>Issues</a> </div> <div id=page-content class=page-content> </div> </div> </div> "},function(e,t){e.exports=" <div class=page-header> <div class=header-title> Board </div> <div id=header-buttons> <button id=new-issue onclick=openNewIssueModal()>New Issue</button> </div> </div> <hr class=header-content-seperator> <div id=page-body class=page-body> <div class=board-box> <div class=board-box-title>To Do</div> <ul id=todo-issues class=issue-drag-box ondragstart=onDragStart(event) ondragover=onDragOver(event) ondrop=onDrop(event)></ul> </div> <div class=board-box> <div class=board-box-title>In Progress</div> <ul id=progress-issues class=issue-drag-box ondragstart=onDragStart(event) ondragover=onDragOver(event) ondrop=onDrop(event)></ul> </div> <div class=board-box> <div class=board-box-title>Done</div> <ul id=done-issues class=issue-drag-box ondragstart=onDragStart(event) ondragover=onDragOver(event) ondrop=onDrop(event)></ul> </div> <div class=board-box> <div class=board-box-title>QA</div> <ul id=qa-issues class=issue-drag-box ondragstart=onDragStart(event) ondragover=onDragOver(event) ondrop=onDrop(event)></ul> </div> </div> "},function(e,t){e.exports='<div class=issues-main id=issues_main> <div class=page-header> <div class=header-title> Issues </div> <div id=header-buttons> <button id=new-issue onclick=openNewIssueModal123()>New Issue</button> </div> </div> <hr class=header-content-seperator> <div id=issues_view class=issues_view> <div class="issues-view-list card"> <div class=card-header> Recorded Issues </div> <ul id=issues-view-list> </ul> </div> <div class="issues-view-details card"> <div class=card-header>Selected Issue Details</div> <div class="issues-view-details-titlebar issue-view-details-row"> <div class=issues-view-number-title> <div title="issue number" id=issues-view-issue-number class=issues-view-issue-id>Id</div> : <div title="issue title" id=issues-view-issue-title class=issues-view-selected-title>Title</div> </div> <div class=issue-status-details> <div title=issue-status id=issue-status-label class=issues-view-status-label> Status : </div> <div class=issues-view-status-display id=issue-status-display>N/A</div> <select id=issue-status-select class="issue-status-select issue-details-edit-controls"> <option value=todo>To Do</option> <option value=progress>In Progress</option> <option value=done>Done</option> <option value=qa>QA</option>  </select> </div> </div> <div class=issue-view-details-row> Assignee :<select id=issues-view-assignee placeholder=N/A disabled=true class=issue-view-assignee></select> </div> <div class=issue-view-details-row> Description: <textarea id=issues-view-description placeholder="No description available" readonly=true></textarea> </div> <div> <button id=edit-issue-button>Edit</button> <button id=save-issue-button type=submit class=issue-details-edit-controls onclick=saveButtonClick()>Save changes</button> <button id=cancel-issue-changes-button type=close class=issue-details-edit-controls onclick=cancelButtonClick()>Cancel</button> </div> <div> </div> </div> </div> </div>'}]);