import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './CardList';
import fetchCards from './Scryfall'

class App extends Component {

  componentDidMount(){

    function promiseStuff(that, json, cards) {
        cards = cards.concat(json.data.filter(card => card.image_uris))
        that.setState({cards: cards})
        if (json.has_more) {
          fetch(json.next_page).then(response => 
            response.json().then(json2 => {
              promiseStuff(that, json2, cards)
            })
          ) 
        }
      }

      var url = "https://api.scryfall.com/cards/search?q=cube:vintage"
      var cards = []
      fetch(url).then(response => 
        response.json().then(json => {
          promiseStuff(this, json, cards)
        }
        )
      )
    } 

  constructor() {
    super()
    this.state = {
      cards:[]
    }
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Magicthegathering-logo.svg" className="App-logo" alt="logo" />
          <img src="https://i.imgur.com/iAMYae4.png" className="App-logo" alt="logo" />
          <p>
            (Z->)90° - (E-N²W)90°t=1
          </p>
          <CardList cards={this.state.cards}/>
        </header>
      </div>
    );
  }
}

export default App;
