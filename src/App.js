import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
// import CardList from './CardList';
import fetchCards from './Scryfall'

const CardListItem = props => (
    <img src={props.image_uris && props.image_uris.small} alt="" />
);

const CardList = props =>
  props.items.map(item => <CardListItem key={item.id} {...item} />);


class App extends Component {
  state = {
    items: [],
  };

  getData(url) {
    axios.get(url).then(result => {
      const { data } = result;

      // update the state.
      // state is updated in a non-mutating way combining existing data with new data.
      this.setState(prevState => ({
        items: [...prevState.items, ...data.data],
      }));

      console.log(this.state);

      // if there is more data to fetch, call getData again.
      if (data.has_more) {
        this.getData(data.next_page);
      }
    });
  }

  componentDidMount(){
    const initialUrl = 'https://api.scryfall.com/cards/search?q=cube:vintage';
    this.getData(initialUrl);
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
        </header>
        <CardList items={this.state.items} />
      </div>
    );
  }
}

export default App;
