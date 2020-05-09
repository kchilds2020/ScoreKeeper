
function getActiveGames() {

    axios.get('/get-session-info')
    .then(function (response) {
        console.log(response)
        let welcomeTitle = document.createElement('h1');
        welcomeTitle.innerText = `Welcome ${response.data[0].firstname}`;
        document.getElementById('home-title').appendChild(welcomeTitle);
    })
    .catch(function (error) {
        console.log(error);
    });

    axios.get('/api/active-games')
        .then(function (response) {
            const {data} = response;
            console.log(data);
            if(data.length !== 0){
                document.getElementById('act-games').style.visibility = 'visible';
                data.forEach(element => {
                    console.log(element);
                    let game = document.createElement('div');
                    game.className = 'game';
                    game.id = element._id;
                    game.innerText = element.gameName;

                    game.addEventListener('click', goToGame);

                    document.getElementById('unfinished-games').appendChild(game);
                });
            }else{
                document.getElementById('act-games').style.visibility = 'hidden';
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function goToGame(event){
    console.log(event.target.id);
    window.location.href = `/score?game=${event.target.id}`
}

function createGame(event){
    gName = prompt('Please enter the name of game');

    if(gName !== null){
        let newGame = {
            gameName: gName,
            winner: 'unfinished',
            winnerScore: 'unfinished',
            completed: 'false',
        }

        axios.post('/api/create-game', newGame)
            .then(function (response) {
                console.log(response);
                window.location.href = `/score?game=${response.data.insertedId}`;

            })
            .catch(function (error) {
                console.log(error);
            });
    }



}

window.onload = getActiveGames;