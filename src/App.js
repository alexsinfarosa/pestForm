import React, { Component } from "react";
import PestTable from "components/PestTable";
import { Flex, Box } from "rebass";
import { base } from "base";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      species: []
    };
  }

  componentWillMount() {
    this.speciesRef = base.syncState("species", {
      context: this,
      state: "species"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.speciesRef);
  }

  addSpecie = row => {
    const species = [...this.state.species];
    const specie = {
      id: row.id,
      formalName: row.formalName,
      informalName: row.informalName,
      hosts: row.hosts,
      expand: [
        {
          name: "",
          status: "",
          ddlo: 0,
          ddhi: 0,
          phenologicalMarkers: "",
          scouting: "",
          management: "",
          biologicalControl: ""
        }
      ]
    };
    species.push(specie);
    this.setState({ species });
  };

  deleteSpecie = row => {
    const species = [...this.state.species];
    const idx = species.findIndex(specie => specie.id === row[0]);
    species.splice(idx, 1);
    this.setState({ species });
  };

  editSpecie = (row, fieldName, value) => {
    const species = [...this.state.species];
    const idx = species.findIndex(specie => specie.id === row.id);
    row[fieldName] = value;
    species.splice(idx, 1, row);
    this.setState({ species });
  };

  render() {
    return (
      <Flex column m={2}>
        <Box mb={2}>
          <h1>Ornamental Pest Table</h1>
          <h3>
            ({this.state.species.length}) pests
          </h3>
        </Box>

        <Box>
          <PestTable
            species={this.state.species}
            addSpecie={this.addSpecie}
            deleteSpecie={this.deleteSpecie}
            editSpecie={this.editSpecie}
          />
        </Box>
      </Flex>
    );
  }
}

export default App;
