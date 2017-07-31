import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import {
  BootstrapTable,
  TableHeaderColumn,
  DeleteButton
} from "react-bootstrap-table";

import "index.css";

const selectRow = {
  mode: "checkbox",
  clickToSelectAndEditCell: true
};

const cellEdit = {
  mode: "dbclick",
  blurToSave: true
};

@inject("store")
@observer
export default class StageTable extends Component {
  createCustomDeleteButton = onClick => {
    return (
      <DeleteButton
        btnText="Delete Stage"
        btnContextual="btn-danger"
        className="my-custom-class"
        btnGlyphicon="glyphicon-trash"
        style={{ marginLeft: "10px" }}
      />
    );
  };

  remote = remoteObj => {
    // Only cell editing, insert and delete row will be handled by remote store
    remoteObj.cellEdit = true;
    remoteObj.insertRow = true;
    remoteObj.dropRow = true;
    return remoteObj;
  };

  degreeDayValidator(value) {
    const nan = isNaN(parseInt(value, 10));
    if (nan) {
      return "Degree Day must be a integer!";
    }
    return true;
  }

  emptyCellValidator(value) {
    if (!value || value === "") {
      return "The field cannot be empty!";
    }
    return true;
  }

  render() {
    const { stages, addStage, deleteStage, editStage } = this.props;
    const options = {
      insertText: "Add Phenological Stage",
      sortName: "id",
      sortOrder: "asc",
      deleteBtn: this.createCustomDeleteButton,
      onCellEdit: editStage,
      onDeleteRow: deleteStage,
      onAddRow: addStage
    };

    if (this.props.stages) {
      return (
        <BootstrapTable
          striped
          hover
          data={stages}
          cellEdit={cellEdit}
          insertRow={true}
          deleteRow={stages.length > 1 ? true : false}
          selectRow={selectRow}
          options={options}
          remote={this.remote}
        >
          <TableHeaderColumn
            dataField="id"
            hidden
            isKey={true}
            autoValue={true}
          />
          <TableHeaderColumn
            dataField="name"
            dataSort={true}
            tdStyle={{ whiteSpace: "normal" }}
            editColumnClassName="class-for-editing-cell"
            editable={{ type: "textarea", validator: this.emptyCellValidator }}
          >
            Phenological Stage
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="status"
            tdStyle={{ whiteSpace: "normal" }}
            editColumnClassName="class-for-editing-cell"
            editable={{ type: "textarea", validator: this.emptyCellValidator }}
          >
            Status
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="ddlo"
            width="70"
            dataAlign="center"
            editable={{ validator: this.degreeDayValidator }}
          >
            ddlo
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="ddhi"
            width="70"
            dataAlign="center"
            editable={{ validator: this.degreeDayValidator }}
          >
            ddhi
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="phenologicalMarkers"
            tdStyle={{ whiteSpace: "normal" }}
            editColumnClassName="class-for-editing-cell"
            editable={{ type: "textarea", validator: this.emptyCellValidator }}
          >
            Phenological Markers
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="scouting"
            tdStyle={{ whiteSpace: "normal" }}
            editColumnClassName="class-for-editing-cell"
            editable={{ type: "textarea", validator: this.emptyCellValidator }}
          >
            Scouting
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="management"
            tdStyle={{ whiteSpace: "normal" }}
            editColumnClassName="class-for-editing-cell"
            editable={{ type: "textarea", validator: this.emptyCellValidator }}
          >
            Management
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="biologicalControl"
            tdStyle={{ whiteSpace: "normal" }}
            editColumnClassName="class-for-editing-cell"
            editable={{ type: "textarea", validator: this.emptyCellValidator }}
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
