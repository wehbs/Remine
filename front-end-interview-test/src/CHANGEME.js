import React, { Component } from "react";
import RemineTable from "./components/Table/RemineTable/RemineTable";
import API from "./API";

// The only purpose of these global variables is for the eval function used later in the code
let bedmin = 0;
let bedmax = 0;
let bathmin = 0;
let bathmax = 0;

class Test extends Component {
  state = {
    property: [],
    buildings: [],
    bedmin: 0,
    bedmax: 0,
    bathmin: 0,
    bathmax: 0,
    buildingtypeselected: "All",
    list: []
  };

  // Execute functions to make API calls
  componentDidMount() {
    this.getLocations();
    this.getBuildingTypes();
  }

  // This function sets the max and min for beds and baths based on the data from the API
  init = () => {
    let beds = [];
    let baths = [];

    for (var i = 0; this.state.property.length > i; i++) {

      // This is to deal with any null data the for loop will just skip over it instead of returning NaN
      if (
        this.state.property[i].baths === null ||
        this.state.property[i].beds === null
      ) {
        continue;
      }
      beds.push(parseInt(this.state.property[i].beds, 10));      
      baths.push(parseInt(this.state.property[i].baths, 10));
    }

    bedmin = Math.min.apply(null, beds);
    bedmax = Math.max.apply(null, beds);
    bathmin = Math.min.apply(null, baths);
    bathmax = Math.max.apply(null, baths);

    this.setState({ bedmin: Math.min.apply(null, beds) });
    this.setState({ bedmax: Math.max.apply(null, beds) });
    this.setState({ bathmin: Math.min.apply(null, baths) });
    this.setState({ bathmax: Math.max.apply(null, baths) });
  };

  // API call to gather all property information
  getLocations = () => {
    API.getLocations()
      .then(res => {
        this.setState({
          property: res.data,
          list: res.data
        });
        // Execute the init function after grabbing API data which determines max and min for beds and baths
        this.init();
      })
      .catch(err => console.log(err));
  };

  //   API call to gather all building types information
  getBuildingTypes = () => {
    API.getBuildingTypes()
      .then(res =>
        this.setState({
          buildings: res.data
        })
      )
      .catch(err => console.log(err));
  };

  // This single function will capture all values from the inputs and change the state values
  onChange = event => {
    if (event.target.value === "") {
        // Looks at the global variable set up at the top and changes it to that value if the bed or bath fields are left blank
        let x = eval(event.target.name);

      this.setState({ [event.target.name]: x });
    }
    else {
    this.setState({ [event.target.name]: event.target.value });
    }

  };

  //   This function will filter out results based on input specified ranges
  filterList = () => {
    let list = [];
    let bath;
    let bed;

    for (var i = 0; this.state.property.length > i; i++) {
        // This is to convert the null data to 0 for the empty fields
        bed = this.state.property[i].beds === null ? 0 :this.state.property[i].beds;
        bath = this.state.property[i].baths === null ? 0 :this.state.property[i].baths;

      if (
        (parseInt(bed, 10) >= this.state.bedmin &&
        parseInt(bed, 10) <= this.state.bedmax) &&
        (parseInt(bath, 10) >= this.state.bathmin &&
        parseInt(bath, 10) <= this.state.bathmax)
      ) {
        if (this.state.buildingtypeselected === "All") {
          list.push(this.state.property[i]);
        }

        if (
          this.state.buildingtypeselected !== "All" &&
          this.state.property[i].buildingType.name ===
            this.state.buildingtypeselected
        ) {
          list.push(this.state.property[i]);
        }
      }
    }
    this.setState({ list: list });
  };

  render() {
    return (
      <div className="testContainer">
        <div className="filterContainer">
          <p>Beds</p>
          <input
            type="number"
            onChange={this.onChange}
            name="bedmin"
            placeholder="Min"
          />
          <input
            type="number"
            onChange={this.onChange}
            name="bedmax"
            placeholder="Max"
          />
          <p>Baths</p>
          <input
            type="number"
            onChange={this.onChange}
            name="bathmin"
            placeholder="Min"
          />
          <input
            type="number"
            onChange={this.onChange}
            name="bathmax"
            placeholder="Max"
          />

          <p>Building Type</p>
          <select onChange={this.onChange} name="buildingtypeselected">
            <option value="All">All</option>
            {this.state.buildings.map(building => (
              <option key={building.id} value={building.name}>
                {building.name}
              </option>
            ))}
          </select>
          <button onClick={this.filterList}>Submit</button>
        </div>
        <RemineTable properties={this.state.list} />
      </div>
    );
  }
}

export default Test;
