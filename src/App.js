import React, { Component } from "react";
import { PestTable } from "components/PestTable";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class App extends Component {
  render() {
    return (
      <div>
        <PestTable />
      </div>
    );
  }
}

export default App;
