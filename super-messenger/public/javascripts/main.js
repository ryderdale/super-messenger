//use pushState() to change the url and allow manipulations to still receive a backbuton 
let signIn = document.getElementById('sign-in');
let bodySection = document.getElementById('body-section');

let user_id; 

    //upper right navigation links
    let createAccount = document.getElementById('create-account');
    createAccount.addEventListener('click', (event) => { 
        event.preventDefault();
        createAccountButton();
    });

    let signin = document.getElementById('sign-in')
    signin.addEventListener('click', (event) => { 
        event.preventDefault();
        signInButton();
    });

    let logout = document.getElementById('logout-button');
    logout.addEventListener('click', (event) => {
        document.getElementById('login-buttons-container').hidden = false;
        document.getElementById('logout-buttons-container').hidden= true;
        let user_id = undefined;
    })

    //create account forms sumbit
    let createAccountSubmit = document.getElementById('submit-create-account');
    createAccountSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        createUserInstance();
        })
    
    //signin form submit 
    let signinSubmit = document.getElementById('sign-in-submit');
    signinSubmit.addEventListener('click', (event) => { 
        event.preventDefault();
        signinSubmitFetch();
    }); 

    //upper right links
function createAccountButton () {
    document.getElementById('sign-in-container').hidden = true;
    document.getElementById('create-account-container').hidden = false;
}

function signInButton () {
    document.getElementById('create-account-container').hidden = true;
    document.getElementById('sign-in-container').hidden = false;
}

//sign up process functions
function createUserInstance () {
    let body = {};  
    body.first_name = document.createAccount.firstName.value;
    body.last_name = document.createAccount.lastName.value;
    body.email = document.createAccount.email.value;
    body.username = document.createAccount.username.value;
    body.password = document.createAccount.password.value;
    console.log('Body data', body);
    let createUserHeaders = new Headers();
    createUserHeaders.append('content-type', 'application/json');
    let appInit = {
        method: 'POST',
        headers: createUserHeaders,
        body: JSON.stringify(body)
    }
    let URL = "/users"; 
    fetch(URL, appInit).then(function(response){
        // console.log(response.json());
        return response.json()
    })
    .then(function (response) {
        console.log(response);
        user_id = response[0].user_id; 
        document.getElementById('create-account-container').hidden = true;
        document.getElementById('login-buttons-container').hidden = true;
        document.getElementById('logout-buttons-container').hidden = false;
        document.getElementById('compose-message-container').hidden = false; 
    })
    .catch(function (error) {
        console.error("Fetch error:", error);
    });
}; 


//sign in submit fetch 
function signinSubmitFetch() {
    let body = {};
    body.email = document.loginAccount.email.value;
    body.password = document.loginAccount.password.value;
    let loginHeaders = new Headers();
    loginHeaders.append('content-type', 'application/json');
    let appInit = {
        method: 'POST',
        headers: loginHeaders,
        body: JSON.stringify(body)
    }
    let loginURL = "/users/login"; 
    fetch(loginURL, appInit).then(function(response){
        return response.json();  
    })
    .then((user)=>{
        if(user_id = user[0]){
            user_id = user[0].user_id; 
            document.getElementById('sign-in-container').hidden = true;
            document.getElementById('login-buttons-container').hidden = true;
            document.getElementById('logout-buttons-container').hidden= false;
            document.getElementById('compose-message-container').hidden = false;
        }
        else {
            alert('incorrect password');
        }
        
        
    })
    .catch(function (error) {
        console.error("Fetch error:", error);
    });
}


