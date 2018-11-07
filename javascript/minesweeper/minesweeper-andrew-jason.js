export const Pieces = {
    None : '.',
    Space : 0,
    Mine : '@'
}

export class Minesweeper {
    constructor() {
        this.board = [];
    }

    toArrayOfStrings() {
        let output = [];
        for(let row = 0; row < this.board.length; row++){
            output[row] = this.board[row].join("");
            output[row] = output[row].replace(/0/g, ' ');
            output[row] = output[row].replace(/@/g, '*');
        }
        return output;
    }

    getPiece(row, col){
        if ((row >= 0 && row < this.board.length) &&
            (col >= 0 && col < this.board[row].length)) {
                return this.board[row][col];
            }

        return Pieces.None;
    }

    isMine(row, col){
        let piece = this.getPiece(row, col);
        if (piece !== undefined && piece === Pieces.Mine){
            return 1;
        }
        return 0;
    }

    countMines(){
        for (let rowIdx = 0; rowIdx < this.board.length; rowIdx++){
            for (let colIdx = 0; colIdx <this.board[rowIdx].length; colIdx++){
                let piece = this.getPiece(rowIdx, colIdx);
                
                if (piece === Pieces.Mine){
                    continue;
                } else {
                    let count = 0;
                    for (let dx = -1; dx <= 1; dx++){
                        for (let dy = -1; dy <= 1; dy++){
                            count += this.isMine(rowIdx + dx, colIdx + dy);
                        }
                    }
                    this.board[rowIdx][colIdx] = count;
                }
            }
        }
        return this.toArrayOfStrings();
    }

    annotate(ans = []){
        if (ans.toString() == "")
        {
            return ans;
        }
        for(let row in ans){
            this.board[row] = [];
            for (let col in ans[row]){
                let input = ans[row][col];
                if ( input === undefined || input === ''){
                    this.board[row][col] = Pieces.None;    
                } 
                else if (input === '*'){
                    this.board[row][col] = Pieces.Mine;
                }
                else{
                    this.board[row][col] = Pieces.Space;
                }
            }
        }
        return this.toArrayOfStrings();
    }
};
