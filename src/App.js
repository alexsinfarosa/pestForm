import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PestTable from "components/PestTable";
import { Flex, Box } from "rebass";

@inject("store")
@observer
class App extends Component {
  render() {
    return (
      <Flex column m={2}>
        <Box mb={2}>
          <h1>Ornamental Pest Table</h1>
          <h3>
            ({this.props.store.app.species.length}) pests
          </h3>
        </Box>

        <Box>
          <PestTable />
        </Box>
      </Flex>
    );
  }
}

export default App;
