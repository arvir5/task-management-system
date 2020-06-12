import './index.css'
// import initBoardPage from '../PageLayout/pageLayout'
// import pageLayoutView from '../PageLayout/pageLayoutView'

import '../Issues/issues.logic'
import router from '../../routing/router'
// import issuesView from '../Issues/issues.view'

export var loggedIn: boolean = false
export var currentUser: string = ''

let loginObserver:MutationObserver

export interface UserDetails {
    usr: string, //specifies the user name
    pwd: string, //specifies the password
    name: string, //specifies the name of user
}

export const allowedUsers: UserDetails[] = [
    { usr: 'ar', pwd: 'ar123', name: 'Arjun' },
    { usr: 'demo', pwd: 'demo', name: 'Demo User' }
]


function checkUserDetails(): void {
    const username = document.getElementById('user_name')! as HTMLInputElement;
    const password = document.getElementById('password')! as HTMLInputElement;
    const authorisedUser = allowedUsers.findIndex((user: UserDetails) => user.usr === username.value && user.pwd === password.value)

    const login_result = <HTMLInputElement>document.getElementById('login_result')!
    if (!username.value.trim()){
        login_result.innerHTML = 'Please enter your user name and password'
        login_result.setAttribute("class", "login-error")
    }
    else if (authorisedUser === -1 && allowedUsers.findIndex((user: UserDetails) => user.usr === username.value) === -1){
        login_result.innerHTML = 'User not found. Please check your user name'
        login_result.setAttribute("class", "login-error")
    }
    else if (authorisedUser !== -1) {
        login_result.innerHTML = 'Login Success'
        login_result.setAttribute("class","login-success")
        // window.location.pathname='/page.html'
        // loggedIn = false
        // currentUser = allowedUsers[authorisedUser].name
        // const contentDiv = <HTMLElement>document.getElementById('content')
        // const observerConfig = {childList:true};
        // const changeObserver = new MutationObserver(initBoardPage)
        // changeObserver.observe(contentDiv,observerConfig)
        // contentDiv.innerHTML = pageLayoutView
        loggedIn = true
        currentUser = allowedUsers[authorisedUser].name
        loginSuccess()
    } else {
        login_result.innerHTML = 'Login Failed'
        login_result.setAttribute("class","login-error")
    }
}


function loginSuccess():void {
    // router.goto('/issues',true)
    console.log("logged in successfully")
    // router.goto('/board',true,true)
    router.goto('/pageLayout',true)
    // const contentDiv = <HTMLDivElement>document.getElementById('content')
    // const observerOptions = {childlist:true} 
    // loginObserver = new MutationObserver(()=>{
    //     console.log('login observer mutated')
    //     router.goto('/board',false,true)
    // })
    // loginObserver.observe(contentDiv,{childList:true,subtree:false})
    // contentDiv.innerHTML = issuesView
    // contentDiv.innerHTML = pageLayoutView
}

export function initPage():void {
    console.log('called initialization function')
    const lgBtn = document.getElementById('login_button')!
    lgBtn.onclick = checkUserDetails
}

export function logoutUser():void{
    console.log('logging out user')
    // alert('you are logging out')
    currentUser=''
    loggedIn = false
    // loginObserver.disconnect()
    router.goto('/',true,true)
    // router.changeBrowserUrl('/')
}

initPage()
router.initialize()
