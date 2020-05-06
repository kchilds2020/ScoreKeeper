
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
        resetFields();
        return;
    }
    else if(passwordIF.value !== vpasswordIF.value){
        alert('passwords do not match');
        resetFields();
        return;
    }
    else{
        const response = await fetch(`/register`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        const data = await response.json();
        console.log(data);
    }

}

function resetFields(){
    firstNameIF.value = '';
    lastNameIF.value = '';
    userNameIF.value = '';
    passwordIF.value = '';
    vpasswordIF.value = '';
}

