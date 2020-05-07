const loginUsername = document.getElementById('username-login-field');
const loginPassword = document.getElementById('password-login-field');
const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', login);

async function login(event){
    const user = { userName: loginUsername.value, password: loginPassword.value} 
    console.log(user);
    if(user.userName === '' || user.password === ''){
        alert('all fields were not filled out');
        resetFields();
        return;
    }
    else{
            axios.post('/login', user)
              .then(function (response) {
                if(response.status = '200'){
                    window.location.href = `${response.request.responseURL}`;
                }else{
                    console.log(response);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
    }
    console.log('test');
}

