import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {
  BootstrapTable,
  TableHeaderColumn,
  DeleteButton
} from "react-bootstrap-table";
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

  isExpandableRow = row => {
    if (row.id) return true;
    else return false;
  };

  expandComponent = row => {
    return <StageTable data={row.expand} />;
  };

  render() {
    const { species, addSpecie, deleteSpecie } = this.props.store.app;
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
      onCellEdit: this.props.onCellEdit,
      onDeleteRow: deleteSpecie,
      onAddRow: addSpecie,
      onRowClick: function(row) {
        console.log(`You click row id: ${row.id}`);
      },
      onRowDoubleClick: function(row) {
        console.log(`You double click row id: ${row.id}`);
      }
    };

    return (
      <BootstrapTable
        // bordered={false}
        // keyBoardNav
        striped
        hover
        // condensed
        autoValue={true}
        data={species.slice()}
        cellEdit={cellEdit}
        insertRow={true}
        deleteRow={true}
        selectRow={selectRow}
        search={true}
        options={options}
        pagination={true}
        expandableRow={this.isExpandableRow}
        expandComponent={this.expandComponent}
        remote={this.remote}
      >
        <TableHeaderColumn
          dataField="id"
          width="40"
          dataAlign="center"
          isKey
          hidden
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="formalName"
          dataSort={true}
          tdStyle={{ whiteSpace: "normal" }}
          editColumnClassName="class-for-editing-cell"
        >
          Formal Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="informalName"
          tdStyle={{ whiteSpace: "normal" }}
        >
          Informal Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="hosts" tdStyle={{ whiteSpace: "normal" }}>
          Hosts
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
