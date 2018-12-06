import React, { Component } from 'react';

class CardList extends Component {

  constructor(props) {
	super(props)
  } 

	render() {
		var cardOutput =  this.props.cards.map(card => 
			<div>{card}</div>
			)
		return (
			<div>
			{cardOutput}
			</div>
		)
	}


}

export default CardList;