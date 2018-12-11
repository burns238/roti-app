
function fetchCards(url) { 

	function promiseStuff(that, json, cards) {
      that.cards = cards.concat(json.data.filter(card => card.image_uris))
      if (json.has_more) {
        fetch(json.next_page).then(response => 
          response.json().then(json2 => {
            promiseStuff(that, json2, that.cards)
          })
        ) 
      }
    }

    var cards = []
    fetch(url).then(response => 
      response.json().then(json => 
        promiseStuff(this, json, cards)
      )
    )
} 



export default fetchCards;