/*
 *  Ball Display Class
 *  Karol Brennan
 *  5.13.2018
 *  This class is used to display the current ball.
 */
import React from 'react';
import _ from 'underscore';
import logo from '../logo.svg';

class BallDisplay extends React.Component {
  render() {
    let currentBall = _.where(this.props.balls, {active: true})[0];
    if (currentBall) {
      return (
        <div id="ball" className={"white relative notranslate"}>
          <div id="ballcount">{_.where(this.props.balls, {called: true}).length}</div>
          <div className="content">
            <span>
              {currentBall.letter}<br />{currentBall.number}
            </span>
          </div>
        </div>
      )
    } else {
      return (
        <div id="ball" className="white relative notranslate">
          <div id="ballcount">{_.where(this.props.balls, {called: true}).length}</div>
          <div className="content">
            <span>
             <img src={logo} alt="Lets Play Bingo Logo"/>
            </span>
          </div>
        </div>
      )
    }
  };
}

export default BallDisplay;