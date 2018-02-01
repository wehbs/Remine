import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API';

class Test extends Component {

state = {
    property: []
}

componentDidMount() {
    this.getLocations();
  }

    getLocations = () => {
        API.getLocations()
          .then(res =>
            this.setState({
              property: res.data
            })

          )
          .catch(err => console.log(err));
      };

    render() {
        return (
            <div className="testContainer">
                <div className="filterContainer">
                    Your filters go here.
                </div>
                <RemineTable properties={this.state.property} />
            </div>
        );
    }
}

export default Test;
