import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API';

class Test extends Component {

state = {
    property: [],
    buildings: []
}

componentDidMount() {
    this.getLocations();
    this.getBuildingTypes();    
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


      getBuildingTypes = () => {
        API.getBuildingTypes()
          .then(res =>
            this.setState({
              buildings: res.data
            })

          )
          .catch(err => console.log(err));
      };


      filterList = (event) => {
        let updatedList = this.getLocations();

        updatedList = updatedList.filter(function(item){
            return item.search(
              event.target.value) !== -1;
          });


        this.setState({property: updatedList});
      };



      
    render() {
        return (
            <div className="testContainer">
                <div className="filterContainer">
                    

                <input type="number" placeholder="# of Beds" />

                
                <input type="number" placeholder="# of Baths" onChange={this.filterList}/>

                <br />

                <p>Building Type</p>
                <select>
                {this.state.buildings.map(buildings => (
                    <option key={buildings.id} value={buildings.name}>{buildings.name}</option>
                ))}
                </select>


                </div>
                <RemineTable properties={this.state.property} />
            </div>
        );
    }
}

export default Test;
