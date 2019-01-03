import React, { Component } from "react";
import {
  BootstrapTable,
  TableHeaderColumn,
  DeleteButton
} from "react-bootstrap-table";
import { inject, observer } from "mobx-react";

import StageTable from "components/StageTable";

import "index.css";

const selectRow = {
  mode: "checkbox",
  clickToSelectAndEditCell: true,
  clickToExpand: true
  // bgColor: "#D66475"
};

const cellEdit = {
  mode: "dbclick",
  blurToSave: true
};

@inject("store")
@observer
export default class PestTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      currPage: 1
    };
  }

  remote = remoteObj => {
    // Only cell editing, insert and delete row will be handled by remote store
    remoteObj.cellEdit = true;
    remoteObj.insertRow = true;
    remoteObj.dropRow = true;
    return remoteObj;
  };

  createCustomDeleteButton = onClick => {
    return (
      <DeleteButton
        btnText="Delete Pest"
        btnContextual="btn-danger"
        className="my-custom-class"
        btnGlyphicon="glyphicon-trash"
        style={{ marginLeft: "10px" }}
      />
    );
  };

  expandComponent = row => {
    const { addStage, deleteStage, editStage } = this.props;
    return (
      <StageTable
        stages={row.expand}
        addStage={addStage}
        deleteStage={deleteStage}
        editStage={editStage}
      />
    );
  };

  emptyCellValidator(value) {
    if (!value || value === "") {
      return "The field cannot be empty!";
    }
    return true;
  }

  render() {
    const { species, addSpecie, deleteSpecie, editSpecie } = this.props;
    const { currPage } = this.state;

    const options = {
      insertText: "Add Pest",
      sizePerPageList: [5, 10, 15, 20],
      sizePerPage: 10,
      page: currPage,
      sortName: "id",
      sortOrder: "asc",
      expandRowBgColor: "#A6C48A",
      deleteBtn: this.createCustomDeleteButton,
      onCellEdit: editSpecie,
      onDeleteRow: deleteSpecie,
      onAddRow: addSpecie,
      onRowClick: row => {
        this.props.store.app.setPestID(row.id);
      }
      // onRowDoubleClick: function(row) {
      //   console.log(`You double click row id: ${row.id}`);
      // }
    };

    const subgroup = [
      "Adelgids",
      "Aphids",
      "Beetles",
      "Beetles, Borers",
      "Beetles, Leafminers",
      "Borers",
      "Borers, Moths",
      "Borers, Weevil",
      "Fly",
      "Fly, Leafminers",
      "Leafminers",
      "Leafminers, Moth",
      "Leafminers, Sawflies",
      "Midges",
      "Mites",
      "Moths",
      "Sawflies",
      "Scales",
      "Weevil",
      "Other"
    ];

    return (
      <BootstrapTable // keyBoardNav // bordered={false}
        version="4"
        striped
        hover
        data={
          species // condensed
        }
        cellEdit={cellEdit}
        insertRow={true}
        deleteRow={species.length > 1 ? true : false}
        selectRow={selectRow}
        search={true}
        options={options}
        pagination={true}
        expandableRow={() => {
          return true;
        }}
        expandComponent={this.expandComponent}
        remote={this.remote}
      >
        <TableHeaderColumn
          dataField="id" // dataAlign="center" // width="40"
          hidden
          isKey={true}
          autoValue={true}
        />
        <TableHeaderColumn
          dataField="subgroup"
          dataSort={true}
          tdStyle={{ whiteSpace: "normal" }}
          editColumnClassName="class-for-editing-cell"
          editable={{
            type: "select",
            // validator: this.emptyCellValidator,
            options: { values: subgroup }
          }}
        >
          Subgroup
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="formalName"
          dataSort={true}
          tdStyle={{ whiteSpace: "normal" }}
          editColumnClassName="class-for-editing-cell"
          editable={{ type: "textarea", validator: this.emptyCellValidator }}
        >
          Formal Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="informalName"
          dataSort={true}
          tdStyle={{ whiteSpace: "normal" }}
          editColumnClassName="class-for-editing-cell"
          editable={{ type: "textarea", validator: this.emptyCellValidator }}
        >
          Informal Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="hosts"
          tdStyle={{ whiteSpace: "normal" }}
          editColumnClassName="class-for-editing-cell"
          editable={{ type: "textarea", validator: this.emptyCellValidator }}
        >
          Hosts
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
