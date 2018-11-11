/*
 * Let's Play Bingo
 * App written by Karol Brennan
 * http://karolbrennan.com
 * http://github.com/karolbrennan
 */
import React, {Component} from 'react';
import _ from 'underscore';
import Select from 'react-select';
// Styles and Images
import logo from './logo.svg';
import 'react-select/dist/react-select.css';
// Components
import BingoBoard from './components/BingoBoard.js';
import BallDisplay from './components/BallDisplay.js';
// Helpers
import {getLanguageText} from './helpers.js';


class LetsPlayBingo extends Component {

  /*
   * Constructor
   * State Variables
   * balls: balls object, holds letter, number, called and active statues
   * running: determines if the game is presently running
   * interval & delay: how often the balls are generated
   */
  constructor(props) {
    super(props);
    this.state = {
      balls: {
        1: {letter: "B", number: 1, called: false, active: false},
        2: {letter: "B", number: 2, called: false, active: false},
        3: {letter: "B", number: 3, called: false, active: false},
        4: {letter: "B", number: 4, called: false, active: false},
        5: {letter: "B", number: 5, called: false, active: false},
        6: {letter: "B", number: 6, called: false, active: false},
        7: {letter: "B", number: 7, called: false, active: false},
        8: {letter: "B", number: 8, called: false, active: false},
        9: {letter: "B", number: 9, called: false, active: false},
        10: {letter: "B", number: 10, called: false, active: false},
        11: {letter: "B", number: 11, called: false, active: false},
        12: {letter: "B", number: 12, called: false, active: false},
        13: {letter: "B", number: 13, called: false, active: false},
        14: {letter: "B", number: 14, called: false, active: false},
        15: {letter: "B", number: 15, called: false, active: false},
        16: {letter: "I", number: 16, called: false, active: false},
        17: {letter: "I", number: 17, called: false, active: false},
        18: {letter: "I", number: 18, called: false, active: false},
        19: {letter: "I", number: 19, called: false, active: false},
        20: {letter: "I", number: 20, called: false, active: false},
        21: {letter: "I", number: 21, called: false, active: false},
        22: {letter: "I", number: 22, called: false, active: false},
        23: {letter: "I", number: 23, called: false, active: false},
        24: {letter: "I", number: 24, called: false, active: false},
        25: {letter: "I", number: 25, called: false, active: false},
        26: {letter: "I", number: 26, called: false, active: false},
        27: {letter: "I", number: 27, called: false, active: false},
        28: {letter: "I", number: 28, called: false, active: false},
        29: {letter: "I", number: 29, called: false, active: false},
        30: {letter: "I", number: 30, called: false, active: false},
        31: {letter: "N", number: 31, called: false, active: false},
        32: {letter: "N", number: 32, called: false, active: false},
        33: {letter: "N", number: 33, called: false, active: false},
        34: {letter: "N", number: 34, called: false, active: false},
        35: {letter: "N", number: 35, called: false, active: false},
        36: {letter: "N", number: 36, called: false, active: false},
        37: {letter: "N", number: 37, called: false, active: false},
        38: {letter: "N", number: 38, called: false, active: false},
        39: {letter: "N", number: 39, called: false, active: false},
        40: {letter: "N", number: 40, called: false, active: false},
        41: {letter: "N", number: 41, called: false, active: false},
        42: {letter: "N", number: 42, called: false, active: false},
        43: {letter: "N", number: 43, called: false, active: false},
        44: {letter: "N", number: 44, called: false, active: false},
        45: {letter: "N", number: 45, called: false, active: false},
        46: {letter: "G", number: 46, called: false, active: false},
        47: {letter: "G", number: 47, called: false, active: false},
        48: {letter: "G", number: 48, called: false, active: false},
        49: {letter: "G", number: 49, called: false, active: false},
        50: {letter: "G", number: 50, called: false, active: false},
        51: {letter: "G", number: 51, called: false, active: false},
        52: {letter: "G", number: 52, called: false, active: false},
        53: {letter: "G", number: 53, called: false, active: false},
        54: {letter: "G", number: 54, called: false, active: false},
        55: {letter: "G", number: 55, called: false, active: false},
        56: {letter: "G", number: 56, called: false, active: false},
        57: {letter: "G", number: 57, called: false, active: false},
        58: {letter: "G", number: 58, called: false, active: false},
        59: {letter: "G", number: 59, called: false, active: false},
        60: {letter: "G", number: 60, called: false, active: false},
        61: {letter: "O", number: 61, called: false, active: false},
        62: {letter: "O", number: 62, called: false, active: false},
        63: {letter: "O", number: 63, called: false, active: false},
        64: {letter: "O", number: 64, called: false, active: false},
        65: {letter: "O", number: 65, called: false, active: false},
        66: {letter: "O", number: 66, called: false, active: false},
        67: {letter: "O", number: 67, called: false, active: false},
        68: {letter: "O", number: 68, called: false, active: false},
        69: {letter: "O", number: 69, called: false, active: false},
        70: {letter: "O", number: 70, called: false, active: false},
        71: {letter: "O", number: 71, called: false, active: false},
        72: {letter: "O", number: 72, called: false, active: false},
        73: {letter: "O", number: 73, called: false, active: false},
        74: {letter: "O", number: 74, called: false, active: false},
        75: {letter: "O", number: 75, called: false, active: false}
      },
      newGame: true,
      running: false,
      interval: 0,
      delay: 10000,
      selectedCaller: null,
      speechEnabled: window.hasOwnProperty('speechSynthesis'),
      synth: window.speechSynthesis,
      voices: [],
      selectedPattern: null,
      pattern: {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false]
      },
      presets: {
        "Custom": {
          B: [false, false, false, false, false],
          I: [false, false, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, false, false],
          O: [false, false, false, false, false]
        },
        "Regular or 4 Corners": {
          B: [true, false, false, false, true],
          I: [false, true, false, false, false],
          N: [false, false, true, false, false],
          G: [false, false, false, true, false],
          O: [true, false, false, false, true]
        },
        "Brackets": {
          B: [true, true, false, true, true],
          I: [true, false, false, false, true],
          N: [false, false, false, false, false],
          G: [true, false, false, false, true],
          O: [true, true, false, true, true]
        },
        "Letter X": {
          B: [true, false, false, false, true],
          I: [false, true, false, true, false],
          N: [false, false, true, false, false],
          G: [false, true, false, true, false],
          O: [true, false, false, false, true]
        },
        "Layer Cake": {
          B: [true, false, true, false, true],
          I: [true, false, true, false, true],
          N: [true, false, true, false, true],
          G: [true, false, true, false, true],
          O: [true, false, true, false, true]
        },
        "Postage Stamps": {
          B: [true, true, false, false, false],
          I: [true, true, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, true, true],
          O: [false, false, false, true, true]
        },
        "Sputnik": {
          B: [true, false, false, false, true],
          I: [false, true, true, true, false],
          N: [false, true, true, true, false],
          G: [false, true, true, true, false],
          O: [true, false, false, false, true]
        },
        "Diamond": {
          B: [false, false, true, false, false],
          I: [false, true, false, true, false],
          N: [true, false, false, false, true],
          G: [false, true, false, true, false],
          O: [false, false, true, false, false]
        },
        "Filled in Diamond": {
          B: [false, false, true, false, false],
          I: [false, true, true, true, false],
          N: [true, true, true, true, true],
          G: [false, true, true, true, false],
          O: [false, false, true, false, false]
        },
        "Blackout": {
          B: [true, true, true, true, true],
          I: [true, true, true, true, true],
          N: [true, true, true, true, true],
          G: [true, true, true, true, true],
          O: [true, true, true, true, true]
        }
      }
    };
    // if speech is enabled, set up a method to load voices if they change
    if (this.state.speechEnabled) {
      this.state.synth.onvoiceschanged = this.loadVoices;
    }
  };


  /*
   *  Load Voices Function
   *  Will load voices as they change within the browser
   */
  loadVoices = () => {
    this.setState({voices: this.state.synth.getVoices()})
  };

  /*
   *  Say Function
   *  Will speak any string that is passed in
   */
  say = (text) => {
    if (this.state.speechEnabled) {
      // Create a new instance of SpeechSynthesisUtterance.
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      if (this.state.hasOwnProperty('selectedCaller')) {
        msg.voice = this.state.selectedCaller;
      }
      this.cancelSpeech();
      this.state.synth.speak(msg);
    }
  };

  cancelSpeech = () => {
    if(window.speechSynthesis.speaking){
      window.speechSynthesis.cancel();
    }
  };

  /*
   *  Reset Game Function
   *  Map out the original balls array and update
   *  active and called statuses to false
   */
  resetGame = () => {
    this.cancelSpeech();
    if(this.state.running === true){
      clearInterval(this.state.interval);
    }
    let resetBalls = this.state.balls;
    _.map(resetBalls, (ball, index) => {
      resetBalls[index].active = false;
      resetBalls[index].called = false;
    });
    this.setState({balls: resetBalls, newGame: true, running: false});
  };

  startGame = () => {
    if(this.state.newGame) {
      this.say("Let's Play Bingo!");
    }
    setTimeout(this.toggleGame, 1500);
  };

  /*
   *  Toggle Game Function
   *  Check the opposite of the current running state, this will determine our new state
   *  If the game is now running, call a number right away then set a new interval
   *  Otherwise, clear the interval
   *  Set the current running state
   */
  toggleGame = () => {
    if (!this.state.running === true) {
      this.callNumber();
      this.setState({interval: setInterval(this.callNumber, this.state.delay)});
    } else {
      clearInterval(this.state.interval);
    }
    this.setState({newGame: false, running: !this.state.running});
  };

  /*
   *  Set Delay Function
   *  Fires when the user uses the delay slider
   *  If the game is running it'll clear the existing interval and set a new one
   *  Otherwise it will just update the delay
   */
  setDelay = (e) => {
    if (this.state.running) {
      clearInterval(this.state.interval);
      this.setState({delay: e.target.value, interval: setInterval(this.callNumber, e.target.value)});
    } else {
      this.setState({delay: e.target.value});
    }
  };


  /*
   *  Choose Caller Function
   */
  chooseCaller = (e) => {
    if (e === null) {
      // default
      this.setState({selectedCaller: this.state.voices[0]});
    } else {
      let voice = this.state.voices[e.value];
      voice.value = e.value;
      this.setState({selectedCaller: voice});
    }
  };

  /*
   *  Call Number Function
   *  Will get all of the balls, find the active one and reset it
   *  Grabs uncalled balls and determines if there are still uncalled balls
   *  Otherwise, it'll generate a random ball, set it to called and active
   */
  callNumber = () => {
    let patternN = this.state.pattern.N;
    let patternIsSelected = this.state.selectedPattern;
    // Need to check if the pattern contains any N's (except for the free space)
    let callNBalls = (patternN[0] === false && patternN[1] === false && patternN[3] === false && patternN[4] === false);
    // get all balls
    let balls = this.state.balls;
    // get active bll and reset
    let active = _.filter(balls, {active: true});
    active.forEach(ball => {ball.active = false;});
    // get all uncalled balls
    // also check if pattern needs N balls called or not
    let uncalled = []
    if (callNBalls && patternIsSelected) {
      uncalled = _.filter(balls,function(obj) {
        return (!obj.called && obj.letter !== 'N')
      });
    } else {
      uncalled = _.filter(balls, {called: false});
    }
    console.log(uncalled);
    if (uncalled.length === 0) {
      alert("I've given you all I've got captain! I haven't got any more balls!");
    } else {
      // choose a random ball
      let randomball = uncalled[Math.floor(Math.random() * uncalled.length)];
      let newBall = balls[randomball.number];
      // set status of ball as called and active
      newBall.called = true;
      newBall.active = true;
      // call the new ball, first call it all together, then call each character individually
      let ballstring = newBall.number.toString();
      this.say([newBall.letter, newBall.number, ' ', ' ', newBall.letter, ' ',
        (ballstring.length === 2 ? [ballstring.charAt(0), ' ', ballstring.charAt(1)] : newBall.number)]);
      // update the state to re-render the board
      this.setState({balls: balls});
    }
  };

    /*
   *  Choose Pattern Function
   *  This sets the selected pattern
   *  Sets to default if no pattern is selected or selection is cleared.
   */
  choosePattern = (e) => {
    if (e === null) {
      this.setState({
        selectedPattern: null,
        pattern: {
          B: [false, false, false, false, false],
          I: [false, false, false, false, false],
          N: [false, false, false, false, false],
          G: [false, false, false, false, false],
          O: [false, false, false, false, false]
        }
      });
    } else {
      this.setState({
        selectedPattern: e.value,
        pattern: this.state.presets[e.value]
      });
    }
  };

  /*
   *  Update Pattern Function
   *  As user clicks on slots for the pattern, update the pattern in the state
   */
  updatePattern = (letter, index, slot) => {
    let pattern = this.state.pattern;
    pattern[letter][index] = !slot;
    this.setState({selectedPattern: "Custom", pattern: pattern});
  };


  /*
   *  Render Method
   *  Displays the bingo page
   */
  render() {
    // For the pattern dropdown
    let pattern = this.state.pattern;
    let patternArray = [_.map(this.state.presets, (preset, value) => (
      {value: value, label: value}
    ))];

    return (
      <div className="App">

        <section id="board">
          <div className="row flex">
            <div className="col c85">
              <BingoBoard balls={this.state.balls} />
            </div>
            <div className="col c15 padding">
              <BallDisplay balls={this.state.balls}/>
            </div>
          </div>
        </section>

        <section id="buttons">
          <div className="row">
            <div className="col c40">
              <button onClick={this.state.newGame ? this.startGame : this.toggleGame}>
                {this.state.newGame ? 'Start' : this.state.running ? 'Pause' : 'Resume'}
              </button>
              <button onClick={this.callNumber} disabled={this.state.running ? 'disabled' : ''}>Next Number</button>
              <button onClick={this.resetGame}>Reset</button>
            </div>
            <div className="col c40 text-center">
              <div id="speed">
                <span>Slow</span><input onChange={(e) => this.setDelay(e)} type="range" value={this.state.delay}  min="5000" max="16000" step="1000"/><span>Fast</span>
              </div>
            </div>
            <div className="col c20 text-right">
              {this.state.speechEnabled ?
                <Select name="voiceselect" placeholder="Choose Caller" searchable
                        onBlurResetsInput={true}
                        value={this.state.selectedCaller ? this.state.selectedCaller.value : ''}
                        onChange={this.chooseCaller}
                        options={_.map(this.state.voices, (voice, index) => (
                          {value: index, label: (voice.name + ' / ' + getLanguageText(voice.lang))}
                        ))}
                />
              : "Sorry, your browser doesn't support our vocal caller! Try Chrome!"}
            </div>
          </div>
        </section>

        <section>
          <div className="row">
            <div className="col c20 padding text-center">
            <div id="bingopattern" className="notranslate">
                {_.map(pattern, (column, letter) => (
                  <div key={letter} className="pattern-col">
                    <div className="pattern-letter">{letter}</div>
                    {_.map(column, (slot, index) => (
                      <div key={letter + index}
                          className={slot ? "selected pattern-slot" : "pattern-slot"}
                          onClick={(e) => this.updatePattern(letter, index, slot)}>&nbsp;
                      </div>
                    ))}
                  </div>
                ))}
                <Select
                  name="patternselect"
                  placeholder="Choose Pattern"
                  value={this.state.selectedPattern}
                  searchable
                  onBlurResetsInput={true}
                  clearable
                  onChange={this.choosePattern}
                  options={patternArray[0]}
                />
              </div>
            </div>
            <div className="col c60 padding">
              <p className="description">Use this free bingo caller to host your own bingo games at home! You
              provide the cards, we generate the bingo numbers! Completely free bingo app - no downloads necessary!
              </p>
              <p className="disclaimer">
                LetsPlayBingo.io does not intend for the bingo caller contained on this website to be used for illegal or gambling purposes. The information and bingo caller contained on this website is for entertainment purposes only. This website, its owners and associates do not have any control over the use of this bingo caller and cannot be held liable for any monetary or other losses incurred by unapproved use of this bingo caller or generated bingo cards.
              </p>
              <div className="top-bottom-padding">
                <div className="addthis_inline_share_toolbox"></div>
              </div>
            </div>
            <div className="col c20 text-center padding">
              <img className="logo" src={logo} alt="Let's Play Bingo Logo"/>
              <p className="intl">We're now international!</p>
              <div id="google_translate_element"></div>
            </div>
          </div>
        </section>

        <footer>
          <div className="row">
            <div className="col c25 text-left">
              <p>For entertainment purposes only.</p>
            </div>
            <div className="col c50 text-center">
              <p>Let's Play Bingo! © 2018 <a href="http://karolbrennan.com" target="_blank">Karol Brennan</a></p>
            </div>
            <div className="col c25 text-right">
              <p>Check out this project on <a href="http://github.com/karolbrennan/letsplaybingo" target="_blank">GitHub</a></p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default LetsPlayBingo;