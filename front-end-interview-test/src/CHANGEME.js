import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API';

class Test extends Component {

state = {
    property: [],
    buildings: [],
    bedmin:0,
    bedmax:10,
    bathmin:0,
    bathmax:10,
    buildingtypeselected:'',
    list: []

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


      onChange= (event)=>{
      this.setState({[event.target.name]: event.target.value}); 
      }   


      onChangeBuilding= (event)=>{
      this.setState({buildingtypeselected: event.target.value});  
      }
      
      
      filterList = () => {
        let list=[];
        for (var i = 0;this.state.property.length>i; i++) {
               if((this.state.property[i].beds >= this.state.bedmin && this.state.property[i].beds <= this.state.bedmax)&&
               (this.state.property[i].baths >= this.state.bathmin && this.state.property[i].baths <= this.state.bathmax) && 
               (this.state.property[i].buildingType.name === this.state.buildingtypeselected))
               {
                list.push(this.state.property[i]);
              }
         }
      this.setState({list:list});  
    };

      
    render() {
        return (
            <div className="testContainer">

                <div className="filterContainer">
                    
                <p>Beds</p>
                <input type="number" onChange={this.onChange} name="bedmin" placeholder="Min" />
                <input type="number" onChange={this.onChange} name="bedmax" placeholder="Max" />
                 <p>Baths</p>
                <input type="number" onChange={this.onChange} name="bathmin" placeholder="Min" />
                <input type="number" onChange={this.onChange} name="bathmax" placeholder="Max" />

                  
                <p>Building Type</p>
                <select onChange={this.onChangeBuilding} name='buildingtypeselected'>
                {this.state.buildings.map(building=> (
                    <option key={building.id} value={building.name}>
                    {building.name}
                    </option>
                ))}
                </select>
                <button onClick={this.filterList}>Submit</button>
                </div> 
                <RemineTable properties={this.state.property} />
            </div>
        );
    }
}

export default Test;