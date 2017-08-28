import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import PestTable from "components/PestTable";
import { Flex, Box } from "rebass";
import { base } from "base";

@inject("store")
@observer
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
      subgroup: row.subgroup,
      formalName: row.formalName,
      informalName: row.informalName,
      hosts: row.hosts,
      expand: [
        {
          id: Date.now(),
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

  // STAGE ---------------------------------------
  addStage = stage => {
    const species = [...this.state.species];
    const { pestID } = this.props.store.app;
    const pest = species.find(pest => pest.id === pestID);
    const idx = species.findIndex(specie => specie.id === pest.id);
    if (
      species[idx].expand[0].name === "" &&
      species[idx].expand.length === 1
    ) {
      species[idx].expand.splice(0, 1, stage);
      this.setState({ species });
    } else {
      pest.expand.push(stage);
      this.setState({ species });
    }
  };

  deleteStage = stageId => {
    const species = [...this.state.species];
    const { pestID } = this.props.store.app;
    const pest = species.find(pest => pest.id === pestID);
    const stage = pest.expand.find(stage => stage.id === stageId[0]);
    const stageIdx = pest.expand.findIndex(s => s.id === stage.id);
    pest.expand.splice(stageIdx, 1);
    this.setState({ species });
  };

  editStage = (row, fieldName, value) => {
    const species = [...this.state.species];
    const { pestID } = this.props.store.app;
    const pest = species.find(pest => pest.id === pestID);
    const stage = pest.expand.find(stage => stage.id === row.id);
    const stageIdx = pest.expand.findIndex(s => s.id === stage.id);
    row[fieldName] = value;
    pest.expand.splice(stageIdx, 1, row);
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
            addStage={this.addStage}
            deleteStage={this.deleteStage}
            editStage={this.editStage}
          />
        </Box>
      </Flex>
    );
  }
}

export default App;
