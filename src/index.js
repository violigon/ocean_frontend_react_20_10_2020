import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return <button className="square" onClick={props.onClick}>
        {props.value}
    </button>;
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
    }

    render() {
        return <div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>;
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    handleClick(i) {
        const squares = this.state.squares;
        const currentInfo = squares[i];

        // Se o move for diferente de null, significa que tem uma informação lá
        // Por tanto, devemos encerrar o clique imediatamente, visto que não podemos sobrescrever a informação
        // A linha return faz exatamente isso, ela encerra a função handleClick
        // Como qualquer texto, como "X" e "O" são truthy, ou seja, o JS entende como 'true'
        //      E o if só entra quando existe uma informação 'truthy', esse if será executado
        //      para qualquer informação válida, no caso, "X" e "O"
        if (currentInfo || calculateWinner(squares)) {
            return;
        }

        const currentMove = this.state.nextMove;

        // Atualiza a informação do square atual com o currentMove
        squares[i] = currentMove;

        // Definimos o move da próxima jogada
        // Se o move atual for 'X', o próximo é o 'O' e vice-versa
        const nextMove = currentMove === 'X' ? 'O' : 'X'; // Operador ternário

        /*
        // Definimos o move da próxima jogada
        let nextMove = '';
        
        // Se o move atual for 'X', o próximo é o 'O' e vice-versa
        if (currentMove == 'X') {
            nextMove = 'O';
        } else {
            nextMove = 'X';
        }
        */

        this.setState(
            {
                squares: squares,
                nextMove: nextMove
            }
        )

        /*let move = "";
        let nextMove = "";
        
        if (this.state.nextMove == "X") {
            move = "X";
            nextMove = "O";
        } else {
            move = "O";
            nextMove = "X";
        }
        this.setState(
            {
                move: move,
                nextMove: nextMove
            }
        )*/
    }

    getInitialState() {
        return {
            squares: Array(9).fill(null),
            nextMove: 'X'
        };
    }

    restartGame() {
        this.setState(this.getInitialState());
    }

    render() {
        const winner = calculateWinner(this.state.squares);

        const nextMove = this.state.nextMove;
        const winMove = nextMove == 'X' ? 'O' : 'X';

        const status = winner ? 'Winner: ' + winMove : 'Next player: ' + nextMove;

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)}/>
                </div>

                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.restartGame()}>Restart Game</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    // Componente -> Elemento a ser renderizado
    <Game/>,
    // Em um elemento -> Container em que será renderizado
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let line of lines) {
        const [a, b, c] = line;

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return true;
        }
    }

    return false;
}
