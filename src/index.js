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

        this.state = {
            squares: Array(9).fill(null),
            nextMove: "X"
        };
    }

    handleClick(i) {
        const squares = this.state.squares;
        const move = squares[i];

        // Se o move for diferente de null, significa que tem uma informação lá
        // Por tanto, devemos encerrar o clique imediatamente, visto que não podemos sobrescrever a informação
        // A linha return faz exatamente isso, ela encerra a função handleClick
        // Como qualquer texto, como "X" e "O" são truthy, ou seja, o JS entende como 'true'
        //      E o if só entra quando existe uma informação 'truthy', esse if será executado
        //      para qualquer informação válida, no caso, "X" e "O"
        if (move) {
            console.log('Square já utilizado', move);
            return;
        }

        console.log('handleClick - Game', i);

        squares[i] = 'X';

        this.setState(
            {
                squares: squares
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

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)}/>
                </div>

                <div className="game-info">
                    Informações do Jogo
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