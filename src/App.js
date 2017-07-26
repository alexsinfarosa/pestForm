import React, { Component } from "react";

import { observer, inject } from "mobx-react";

@inject("store")
@observer
class App extends Component {
  render() {
    return (
      <div>
        <h1>Pest Table</h1>
        <br />
      </div>
    );
  }
}

export default App;
