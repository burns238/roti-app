import React from "react";
import axios from "axios";

const Cube = props => {

	return (
		<div className="col-md-4 mt-2 mb-2">
	    <a href={props.id}>
        <img src={props.img} height="30"/>
		    {props.title}      
		  </a>
		</div>
	)
}

const CubeList = (props) => {
  return (
    <div className="row">
      {props.cubes.map(item => {
        return(
          <Cube 
            key={item.title} {...item} 
          />
        );
      })}
    </div>
  )
};

class CubeListContainer extends React.Component {
  state = {
    cubes: []
  };

  componentDidMount() {
    const initialUrl = "http://172.31.32.90:5000/mock/cubes/";
    this.getData(initialUrl);
  }

  getData(url) {
    axios.get(url).then(result => {
      // update the state.
      // state is updated in a non-mutating way combining existing data with new data.
      this.setState({
        cubes: result.data
      });

      // if there is more data to fetch, call getData again.
      //if (data.has_more) {
      //  this.getData(data.next_page);
      //}
    });
  }

  render() {
    return (
      <div className="container">
        <CubeList cubes={this.state.cubes} />
      </div>
    );
  }
}

export default CubeListContainer;
