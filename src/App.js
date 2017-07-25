import React, { Component } from "react";
import { PestTable2 } from "components/PestTable2";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class App extends Component {
  render() {
    return (
      <div>
        <PestTable2 />
      </div>
    );
  }
}

export default App;
