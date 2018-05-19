import React, { Component } from 'react';
import "./tweets.css";

export default class Tweet extends Component {
  render() {
    return (
      <div className="tweet container">
          <div className="row">
            <div className="col-sm-2">
                <img className="tweet-img" src={this.props.img} alt="twitter-user-image"/>
            </div>
            <div className="col-sm-10">
                <div className="row">
                    <div className="tweet-header">
                        <div className="tweeter-name">
                        <strong>
                            {this.props.name}
                        </strong>
                        </div>
                        <div className="tweeter-screen">
                            &#160; 
                            @{this.props.screenName}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="tweet-body">
                        {this.props.text} 
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
  }
}
