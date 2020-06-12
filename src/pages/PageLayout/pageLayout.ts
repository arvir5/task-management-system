import './pageLayout.css'

import {currentUser} from '../Login/index'
import router from '../../routing/router';


export function initPageTemplate():void {
    // console.log('loading /pageTemplate init function ')
    const userGreeting = <HTMLDivElement>document.getElementById('topbar-greeting')
    userGreeting.innerText = `Hi, ${currentUser}`
    const logoutButton = <HTMLButtonElement>document.getElementById('logout_button')
    const issuesElement = <HTMLAnchorElement>document.getElementById('sidenav-issues')
    const boardElement = <HTMLAnchorElement>document.getElementById('sidenav-board')
    const dashboardElement = <HTMLAnchorElement>document.getElementById('sidenav-dashboard')
    issuesElement.onclick = changeSideNavSelection
    boardElement.onclick = changeSideNavSelection
    dashboardElement.onclick = changeSideNavSelection
    // logoutButton.onclick = () => router.goto('/', true, true)
    redirectToLandingPage()
}

function redirectToLandingPage():void {
    const boardElement = <HTMLAnchorElement>document.getElementById('sidenav-board')
    boardElement.setAttribute('class',' sidenav-selected')
    router.goto('/board', true, true)
}

function changeSideNavSelection(event:any):void {
    const allSideNavElements = document.querySelectorAll('.sidenav a')
    if(allSideNavElements){
        allSideNavElements.forEach((element:any)=>{
            if(element.id===event.target.id){
                const newStyle = `${element.getAttribute('class')} sidenav-selected`
                element.setAttribute('class',newStyle)
            } else {
                const oldStyle = element.getAttribute('class')
                if(oldStyle){
                    const newStyle = oldStyle.replace(' sidenav-selected','')
                    element.setAttribute('class', newStyle)
                }
            }
            const requiredRoute = event.target?.id?.replace('sidenav-','/')
            if(requiredRoute && requiredRoute!== '/dashboard'){
                router.goto(requiredRoute,true,true)
            }
        })
    }
}