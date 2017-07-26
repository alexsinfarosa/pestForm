import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import StageTable from "components/StageTable";

const selectRow = {
  mode: "checkbox",
  clickToSelect: true,
  clickToExpand: true,
  bgColor: "#F0AD4E"
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

  isExpandableRow = row => {
    if (row.id) return true;
    else return false;
  };

  expandComponent = row => {
    return <StageTable data={row.expand} />;
  };

  render() {
    const { species } = this.props.store.app;
    const { currPage } = this.state;

    const options = {
      insertText: "Add Pest",
      deleteText: "Delete Pest",
      sizePerPageList: [5, 10, 15, 20],
      sizePerPage: 10,
      page: currPage,
      sortName: "id",
      sortOrder: "asc",
      expandRowBgColor: "#F2BB6E",
      onRowClick: function(row) {
        console.log(`You click row id: ${row.id}`);
      },
      onRowDoubleClick: function(row) {
        console.log(`You double click row id: ${row.id}`);
      }
    };

    return (
      <BootstrapTable
        containerStyle={{ margin: "0 auto", padding: "20px" }}
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
