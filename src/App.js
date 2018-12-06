import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './CardList';

class App extends Component {

  componentDidMount(){
    var url = "https://api.scryfall.com/cards/search?q=cube:vintage"
    fetch(url).then(
      response => response.json().then(
        json => {
          var cards2 = json.data.map(card => card.name )
          console.log(cards2)
          this.setState({cards: cards2})
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
    var firstCard = ""
    if (this.state.cards.count !== 0) {
      firstCard = this.state.cards[0]
    }

    console.log(firstCard)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <CardList cards={this.state.cards}/>
        </header>
      </div>
    );
  }
}

export default App;
