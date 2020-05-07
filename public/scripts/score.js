function updateScore(event){
    let addValue = prompt("Points to Add");
    event.target.nextElementSibling.innerText = `${parseInt(event.target.nextElementSibling.innerText) + parseInt(addValue)}`
}

function createUser(event){
    let username = prompt("Name of User");
    let item = document.createElement('DIV');
    item.className='item';
    
    let name = document.createElement('DIV');
    name.className='user-name';

    let score = document.createElement('DIV');
    score.className='user-score';

    name.innerText = `${username}`;
    score.innerText = "0";

    item.appendChild(name);
    item.appendChild(score);

    document.getElementById('users').appendChild(item);

    item.addEventListener('click', updateScore);

}