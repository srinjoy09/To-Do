const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
let token;
const button1= document.getElementById("button1");


window.onload=function(){
    loginButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        //let userLogin = {email: username, password: password};
        let formData = new FormData();
        formData.append('email', username);
        formData.append('password', password);
        //console.log(formData);
        const response = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            body: formData,
            /*headers: {
                'Content-Type': 'application/json'
            },*/
        });

        token=(await response.json()).access_token;
        console.log(token);
        //location.assign('/To-Do/webpages/viewTasks.html');
    })
}

//alert(token);


button1.addEventListener("click", async (e) => {
    const response = await fetch('http://localhost:8080/user/allTasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNAeHl6Iiwicm9sZXMiOlsiQ1VTVE9NRVIiXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3VzZXIvbG9naW4iLCJleHAiOjE2NTg5NDY2MDB9.HABO4_1OVthd2eWgQJiVo03Z31CmZnSNBbVjbhSGfFw'
        }
    });
    console.log(token);
    //document.getElementById("head_demo").innerHTML = await response.json();
})
//export default token;

