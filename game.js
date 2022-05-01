const BOARD_SIZE = 8;

let table;


//creates the board of the game and peices.
//TODO: addEvent listener "onclick"
function createBoard() {
    // table = document.getElementById(CHESS_BOARD_ID);
    // if (table !== null) {
    //   table.remove();
    // }
    table = document.createElement("table");
    //table.id = CHESS_BOARD_ID;
   
    document.body.appendChild(table);
    for (let row = 0; row < BOARD_SIZE; row++) {
      const rowElement = table.insertRow();
  
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cell = rowElement.insertCell();
  
        if ((row + col) % 2 === 0) {
          cell.className = "light-box";
        } else {
          cell.className = "dark-box";
        }
        //cell.addEventListener("click", (event) => onCellClick(event, row, col));
      }
    }
}








// when page loads the createBoard is initiated.
window.addEventListener('load', createBoard());



