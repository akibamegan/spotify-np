import React, { Component } from 'react';
import './App.css';
import spotlogo from './img/spotlogo.png'
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        artist: '',
        image: '',
        album: '',
        tracknum: '',
        device: ''
      }
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  
  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            artist: response.item.artists[0].name,
            image: response.item.album.images[0].url,
            album: response.item.album.name,
            tracknum: response.item.track_number,
            device: response.device.name
          }
        })
      })
  }

  render() {
    return (
      <div className="App">

        <div>
          <img src = {spotlogo} />
        </div>

        <a href='http://localhost:8888'>
          <button className='buttons'>Login to Spotify</button>
        </a>

        <div>
          <h1>What's playing on your Spotify?</h1>
        </div>

        <div className='songInfo'> 
          <img src= {this.state.nowPlaying.image} style={{width: 200, marginRight:20}}/>
          Song: { this.state.nowPlaying.name } <br/>
          Artist: {this.state.nowPlaying.artist} <br/>
          Album: {this.state.nowPlaying.album} <br/>
          Track Number: {this.state.nowPlaying.tracknum} <br/>
          - <br/>
          Device Playing: {this.state.nowPlaying.device}
        </div>

        

        <button className='buttons' onClick={() => this.getNowPlaying()}>Check What's Currently Playing</button>

      </div>
    )
  }
}

export default App;