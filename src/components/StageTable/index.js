import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const cellEdit = {
  mode: "dbclick",
  blurToSave: true
};

@inject("store")
@observer
export default class StageTable extends Component {
  render() {
    const options = {
      insertText: "Add Stage"
    };

    if (this.props.data) {
      return (
        <BootstrapTable
          data={this.props.data}
          cellEdit={cellEdit}
          insertRow={true}
          options={options}
        >
          <TableHeaderColumn
            dataField="name"
            isKey={true}
            tdStyle={{ whiteSpace: "normal" }}
          >
            Phenological Stage
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="status"
            tdStyle={{ whiteSpace: "normal" }}
          >
            Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ddlo" width="70" dataAlign="center">
            ddlo
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ddhi" width="70" dataAlign="center">
            ddhi
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="phenologicalMarkers"
            tdStyle={{ whiteSpace: "normal" }}
          >
            Phenological Markers
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="scouting"
            tdStyle={{ whiteSpace: "normal" }}
            editable={{ type: "textarea" }}
          >
            Scouting
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="management"
            tdStyle={{ whiteSpace: "normal" }}
          >
            Management
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="biologicalControl"
            tdStyle={{ whiteSpace: "normal" }}
          >
            Biological Control
          </TableHeaderColumn>
        </BootstrapTable>
      );
    } else {
      return <p>?</p>;
    }
  }
}
