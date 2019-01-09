import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
// import CardList from './CardList';
import fetchCards from './Scryfall'
import CubeListContainer from './CubeList';
import {BrowserRouter, Route} from 'react-router-dom';

const CardListItem = props => (
    <img src={props.img} alt="" height="350"/>
);

const CardList = props =>
  props.items.map(item => <CardListItem key={item.name} {...item} />);

class CubeButton extends React.Component {

  render() {
    const { 
      variant,
      content,
      ...others
    } = this.props;
    
    return (
      <button className={variant} {...others}>
        {content}
      </button>
    )
  }
}

class CardGetter extends React.Component {
    state = {
    items: [],
    cube: 0
  };
    getData(url) {
    axios.get(url).then(result => {
      const { data } = result;

      // update the state.
      // state is updated in a non-mutating way combining existing data with new data.
      this.setState(prevState => ({
        items: [...prevState.items, ...data.cards],
      }));

      // if there is more data to fetch, call getData again.
      //if (data.has_more) {
      //  this.getData(data.next_page);
      //}
    });
  }

  componentDidMount(){
    const initialUrl = 'http://172.31.32.90:5000/mock/cubes/' + this.props.id;
    this.getData(initialUrl);
  } 

    render() {
    return (
      <div>
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
      </div>
    );
  }
}

class App extends Component {




  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/cubes' component={CubeListContainer} />
          <Route path='/cubes/:id' component={props => <CardGetter id={props.match.params.id} />} />
        </div>
      </BrowserRouter>
    )
  }


}

export default App;
