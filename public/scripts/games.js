function getPastGames() {
    axios.get('/api/completed-games')
        .then(function (response) {
            const {data} = response;
            console.log(data);
            data.forEach(element => {
                var tableRef = document.getElementById('games-table').getElementsByTagName('tbody')[0];

                // Insert a row in the table at the last row
                var newRow   = tableRef.insertRow();
    
                // Insert a cell in the row at index 0
                var newCell0  = newRow.insertCell(0);
                var newCell1  = newRow.insertCell(1);
                var newCell2  = newRow.insertCell(2);

    
                // Append a text node to the cell
                var newText0  = document.createTextNode(`${element.gameName}`);
                var newText1  = document.createTextNode(`${element.winner}`);
                var newText2  = document.createTextNode(`${element.winnerScore}`);


                newCell0.appendChild(newText0);
                newCell1.appendChild(newText1);
                newCell2.appendChild(newText2);
            });
           

        })
        .catch(function (error) {
            console.log(error);
        });
}
window.onload = getPastGames;