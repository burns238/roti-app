import React, { Component } from 'react';

class CardList extends Component {

  constructor(props) {
	super(props)
  } 

	render() {
		  function cardValue(card) {
		    var dict = {
		      "W": 1,
		      "U": 2,
		      "B": 3,
		      "R": 4,
		      "G": 5
		    }

		    var value = 0;
		    var i;
		    if (card.colors) {
		    	if (card.colors.length === 0) {
		    		value = 99999999999
		    	} else {
		      		for (i=0; i < card.colors.length; i++) {
		        		value += dict[card.colors[i]];
		      		}
		  		}	
		    } 

		    if (card.colors && card.colors.length > 1) {
		    	value *= 1000*card.colors.length;
		    }

		    return value
		  }

		var cardOutput = []
		if (this.props.cards && this.props.cards.length > 0) {
		  cardOutput = this.props.cards.sort(function(a, b) {
            return cardValue(a) - cardValue(b)
          })
        } 

        cardOutput = cardOutput.map(card => <img key={card.id} src={card.image_uris.small} alt="Card"/>)

		return (
			<div>
			{cardOutput}
			</div>
		)
	}


}

export default CardList; 