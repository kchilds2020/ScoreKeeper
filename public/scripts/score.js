function renderData(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    dbID = urlParams.get('game');

    axios.get(`/game/${dbID}`)
        .then(function (response) {
            console.log(response);

            let h1Title = document.createElement('h1');
            h1Title.innerText=response.data[0].gameName;

            document.getElementById('game-title').appendChild(h1Title);


            for(i=0; i < response.data[0].users.length; i++){
                let item = document.createElement('DIV');
                item.className='item';
                
                let name = document.createElement('DIV');
                name.className='user-name';

                let score = document.createElement('DIV');
                score.className='user-score';

                name.innerText = `${response.data[0].users[i]}`;
                score.innerText = `${response.data[0].points[i]}`;

                item.appendChild(name);
                item.appendChild(score);

                document.getElementById('users').appendChild(item);

                item.addEventListener('click', updateScore);
            }

            
        })
        .catch(function (error) {
            console.log(error);
        });
}

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

window.onload = renderData();