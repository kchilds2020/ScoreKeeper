
const firstNameIF = document.querySelector('.first-name-if');
const lastNameIF = document.querySelector('.last-name-if');
const userNameIF = document.querySelector('.username-if');
const passwordIF = document.querySelector('.password-if');
const vpasswordIF = document.querySelector('.v-password-if');
const formButton = document.querySelector('.form-btn');

formButton.addEventListener('click', register);

async function register(event) {
    const user = {
        firstName: firstNameIF.value,
        lastName: lastNameIF.value,
        userName: userNameIF.value,
        password: passwordIF.value
    };
    console.log(user);
    //validate all fields have values and passwords match
    if(firstNameIF.value === '' || lastNameIF.value === '' || userNameIF.value === '' || passwordIF.value === '' || vpasswordIF.value === ''){
        alert('all fields were not filled out');
        return;
    }
    else if(!hasUpperCase(userNameIF.value)){
        alert('Username must have an upper-case character');
        userNameIF.value = '';
    }
    else if(passwordIF.value !== vpasswordIF.value){
        alert('passwords do not match');
        vpasswordIF.value = '';
        passwordIF.value = '';
        return;
    }
    else{
        axios.post('/register', user)
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

}

function hasUpperCase(str) {
    return (/[A-Z]/.test(str));
}

function resetFields(){
    firstNameIF.value = '';
    lastNameIF.value = '';
    userNameIF.value = '';
    passwordIF.value = '';
    vpasswordIF.value = '';
}

