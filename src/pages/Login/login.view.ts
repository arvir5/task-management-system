export default `
<div class='login-main'>
    <div class='title-container'>
        Task Management System
    </div>
    <div class='login-container'>
        <div class='login-details'>
            <div class='login-container-elements login-title'> Login to your account </div>
            <div class='login-container-elements'> Username <input id='user_name' placeholder='User name'> </div>
            <div class='login-container-elements'> Password <input id='password' type='password' placeholder='Password'>
            </div>
            <div id='login_result'> </div>
            <button id='login_button' class='login-container-elements login-button' onclick='checkUserDetails()'> Login
            </button>
        </div>
    </div>
</div>
`