import React, { Component } from 'react';
import { autorun, observable } from 'mobx';
// import { observer } from 'mobx-react';
import Word from '../Word';

export var GameState = observable.object(
    {
        stopped: false,
        wordCount: 0,
        get title() {
            return this.stopped ? "Resume" : "Stop";
        },
        get status() {
            return "Showing " + this.wordCount + " words on screen.";
        }
    }
);

GameState.words = []; //words on screen
GameState.typed = []; //typed letter cache

const leftPadding = 2;
const fontHeight = 16;
const allWords = [
    "False",
    "None",
    "True",
    "and",
    "as",
    "assert",
    "break",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "nonlocal",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield"
];

function getWord() {
    const idx = Math.floor(Math.random() * allWords.length - 1);
    return allWords[idx];
}

class GameArea extends Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {date: new Date()};

    // }
    componentDidMount() {
        this.x = 40;
        this.y = 40;
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
        this.context.font = "30px Arial";
        this.context.fillStyle = "red";

        this.disposer = autorun(
            () => {
                if (this.props.gameState.stopped) {
                    this.stop();
                } else {
                    this.resume();
                }
            }
        );

        var typing = function (e) {
            const gameState = this.props.gameState;
            const string = String.fromCharCode(e.keyCode);
            gameState.typed.push(string);
            console.log("You typed " + string + e.keyCode + ", " + gameState.typed.join(""));
        }
        document.addEventListener("keypress", typing.bind(this), false);
    }

    clear(ctx) {
        // console.log("context:" + ctx);
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    removeWord(word) {
        const gameState = this.props.gameState;
        let words = gameState.words;
        let index = words.indexOf(word);
        if (index > -1) {
            words.splice(index, 1);
            gameState.wordCount = words.length;
            // console.log("removed word: "+ word);
        }
    }

    resetTypedCache() {
        const gameState = this.props.gameState;
        if (gameState.typed.length > 0) {
            console.log("reseted cache");
            gameState.typed = [];
        }
    }

    resume() {
        console.log("resumeing ...");

        var updateGameArea = function () {
            let ctx = this.context;
            this.clear(ctx);
            this.y += 1;
            ctx.fillText("Hello world!", this.x, this.y);

            let gameState = this.props.gameState;
            let wordArray = gameState.words;
            let offScreenWords = [];
            let completedWords = [];
            var isPrefix = false; //if user typed part of any words on screen

            for (let i = 0; i < wordArray.length; i++) {
                let word = wordArray[i];
                word.update(gameState.typed);

                if (word.hasTypedPart) {
                    isPrefix = true;
                    // preFixlog += w.text + " ";
                }
                if (word.completed) {
                    completedWords.push(word);
                    // completeLog += w.text + " ";
                }
                if (word.outOfBound()) {
                    offScreenWords.push(word);
                }
            }
            // Remove offscreen words from array
            for (let i = 0; i < offScreenWords.length; i++) {
                this.removeWord(offScreenWords[i]);
            }
            if (completedWords.length > 0) {
                for (let i = 0; i < completedWords.length; i++) {
                    this.removeWord(completedWords[i]);
                }
                this.resetTypedCache();
            } else {
                if (!isPrefix) {
                    this.resetTypedCache();
                }
            }
        };

        var addWord = function () {
            let word = new Word(this.canvas.width,
                this.canvas.height,
                getWord(),
                this.context,
                leftPadding,
                fontHeight);
            const gameState = this.props.gameState;
            let words = gameState.words;
            words.push(word);
            gameState.wordCount = words.length;
        };

        this.interval = setInterval(updateGameArea.bind(this), 100);

        // this.wordInterval = setInterval(() => this.addWord(), 1500);
        this.wordInterval = setInterval(
            addWord.bind(this),
            1500
        );
    }

    stop() {
        console.log("stopping ...");
        clearInterval(this.interval);
        clearInterval(this.wordInterval);
    }



    componentWillUnmount() {
        this.disposer();
        this.stop();
    }

    render() {
        return (
            <canvas id="myCanvas" width="600" height="400">
            </canvas>
        );
    }
}

export default GameArea;