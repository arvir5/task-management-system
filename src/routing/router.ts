import routes, {Route as RouteInterface} from './routes'

import {logoutUser} from '../pages/Login/index'

export class RouterClass {
    private routes: RouteInterface[] = routes;
    pageContentTracker:any
    currentRoute: RouteInterface|any
    logout = logoutUser

    constructor(explicitRoutes?: RouteInterface[]){
        if (explicitRoutes){
            this.routes = explicitRoutes
        }
    }

    goto(url:string,loadPageContents?:boolean,modifyPageUrl?:boolean):void{
        console.log('going to route::', url)
        const requiredRoute = this.routes.find((route:RouteInterface)=>route.url===url)
        console.log('loadPageContent::',loadPageContents,"Current route::",this.currentRoute?.url,"required route::",requiredRoute?.url)
        if (this.currentRoute?.url !== requiredRoute?.url) {
            this.currentRoute = requiredRoute
        }
        if(loadPageContents) {
            console.log('loading page contents!')
            this.loadContent(this.currentRoute.content, this.currentRoute.targetNodeId)
        }
        else if (requiredRoute) {
            requiredRoute.initialize()
        }
        if(modifyPageUrl){
            this.changeBrowserUrl(url)
        }
    }

    setupPageContentTracker():void {
        const pageContent = document.getElementById('page-content')
        this.pageContentTracker = new MutationObserver(this.initializePage)
        this.pageContentTracker.observe(pageContent,{chidList:true})
    }

    initializePage():void {
        console.log('initializing selected page::',this.currentRoute.url)
        this.currentRoute.initialize()
    }

    loadContent(content:string,targetNodeId:string='content'):boolean {
        try {
            const targetNode = document.getElementById(targetNodeId)!
            targetNode.innerHTML = content
            this.initializePage()
        } catch (error) {
            return false
        }
        return true
    }

    /**
     * navigates the route to the login page on app start up
     */
    initialize():void {
        console.log(" router initialize has been called")
    //   this.goto('/')  
    }

    changeBrowserUrl(url:string):void{
        history.pushState({},url.split('/')[0],url)
    }
}

const router = new RouterClass()

export default router