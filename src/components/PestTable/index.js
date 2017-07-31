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

    return (
      <BootstrapTable
        // bordered={false}
        // keyBoardNav
        striped
        hover
        // condensed
        data={species}
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
          dataField="id"
          // width="40"
          // dataAlign="center"
          hidden
          isKey={true}
          autoValue={true}
        />
        <TableHeaderColumn
          dataField="formalName"
          dataSort={true}
          editable={{ type: "textarea" }}
          tdStyle={{ whiteSpace: "normal" }}
          editColumnClassName="class-for-editing-cell"
        >
          Formal Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="informalName"
          dataSort={true}
          editable={{ type: "textarea" }}
          tdStyle={{ whiteSpace: "normal" }}
          editColumnClassName="class-for-editing-cell"
        >
          Informal Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="hosts"
          editable={{ type: "textarea" }}
          tdStyle={{ whiteSpace: "normal" }}
          editColumnClassName="class-for-editing-cell"
        >
          Hosts
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
