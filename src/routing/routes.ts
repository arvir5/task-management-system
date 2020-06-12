export interface Route {
    // [index: string]: Function;
    url:string,
    initialize():void,
    content?:string;
    targetNodeId?:string
}

// import LoginPage from '../pages/Login/login.html'
import {initPage as initializeIssuesPage} from '../pages/Issues/issues.logic'
import {initPage as initializeLoginPage} from '../pages/Login/index'
// import issuesPageView from '../pages/Issues/issues.view'
import {initPageTemplate} from '../pages/PageLayout/pageLayout'
import initBoardPage from '../pages/Board/board.logic'

// import boardPageView from '../pages/Board/board.view'
// import loggedInPageTemplate from '../pages/PageLayout/pageLayout.template'
import loginPageView from '../pages/Login/login.view'

const loggedInPageTemplate = require('../pages/PageLayout/pageLayout.html')
const boardPageView = require('../pages/Board/board.html')
const issuesPageView = require('../pages/Issues/issues.html')

// const routes: Route = {
//     '/': initializeLoginPage,
//     '/issues': initializeIssuesPage,
// }

const routes:Route[] = [
    { url: '/', initialize:initializeLoginPage,content:loginPageView,targetNodeId:'content'},
    { url: '/pageLayout', initialize: initPageTemplate,content:loggedInPageTemplate,targetNodeId:'content'},
    { url: '/board', initialize: initBoardPage, content: boardPageView,targetNodeId:'page-content'},
    { url: '/issues', initialize: initializeIssuesPage, content: issuesPageView,targetNodeId:'page-content'}
]

export default routes