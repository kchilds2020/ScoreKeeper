const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
dbID = urlParams.get('game');

function renderData(){

    let scoreTag = document.createElement("a");
    scoreTag.href = `/score?game=${dbID}`;
    scoreTag.innerText = 'Score';
    scoreTag.className = 'active';
    document.querySelector('.navbar').appendChild(scoreTag);

    let timerTag = document.createElement("a");
    timerTag.href = `/timer?game=${dbID}`;
    timerTag.innerText = 'Timer';
    document.querySelector('.navbar').appendChild(timerTag);

    axios.get(`/game/${dbID}`)
        .then(function (response) {
            console.log(response.data);
            let h1Title = document.createElement('h1');
            h1Title.innerText=response.data[0].gameName;

            document.getElementById('game-title').appendChild(h1Title);
            if(response.data[0].points !== undefined){
                let keyNames = Object.keys(response.data[0].points);
                console.log(keyNames);

                for(i=0; i < keyNames.length; i++){
                    let item = document.createElement('DIV');
                    item.className='item';
                    
                    let name = document.createElement('DIV');
                    name.className='user-name';

                    let score = document.createElement('DIV');
                    score.className='user-score';

                    name.innerText = `${keyNames[i]}`;
                    score.innerText = `${response.data[0].points[keyNames[i]]}`;

                    item.appendChild(name);
                    item.appendChild(score);

                    document.getElementById('users').appendChild(item);

                    name.addEventListener('click', updateScore);
                } 
            }

            
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updateScore(event){
    let addValue = prompt("Points to Add");

    if(addValue !== null){
        let newValue = `${parseInt(event.target.nextElementSibling.innerText) + parseInt(addValue)}`;
        let user = {user: event.target.innerText, points: newValue, pointsID: event.target.id}

        axios.post(`/update-points/${dbID}`, user)
        .then(function (response) {
            event.target.nextElementSibling.innerText = newValue
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log(event.target.id);
    }
}

function createUser(event){
    let username = prompt("Name of User");
    let user = {user: username, points: '0'};
    if (username !== null){
        console.log(username);
        axios.post(`/update-points/${dbID}`, user)
        .then(function (response) {
            console.log(response);


                let item = document.createElement('DIV');
                item.className='item';
                    
                let name = document.createElement('DIV');
                name.className='user-name';
                name.id = username

                let score = document.createElement('DIV');
                score.className='user-score';

                name.innerText = `${username}`;
                score.innerText = "0";

                item.appendChild(name);
                item.appendChild(score);

                document.getElementById('users').appendChild(item);

                item.addEventListener('click', updateScore);
        })
        .catch(function (error) {
            console.log(error);
        });

        
    }

}

function finished(){
    let user = prompt("Name of Winner");
    if(user !== null){
        let winningUser = {
            gameID: dbID,
            winner: user,
            winnerScore: document.getElementById(user).nextElementSibling.innerText,
            completed: true
        }

        axios.post('/complete-game', winningUser)
        .then(function (response) {
            console.log(response);
            window.location.href = "/games";
        })
        .catch(function (error) {
            console.log(error);
        });
    }

}

window.onload = renderData();