import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const cellEdit2 = {
  mode: "dbclick",
  blurToSave: true
};

class Stages extends Component {
  render() {
    const options = {
      insertText: "Add Stage"
    };
    if (this.props.data) {
      return (
        <BootstrapTable
          data={this.props.data}
          cellEdit={cellEdit2}
          insertRow={true}
          options={options}
        >
          <TableHeaderColumn dataField="fieldA" isKey={true}>
            Field A
          </TableHeaderColumn>
          <TableHeaderColumn dataField="fieldB">Field B</TableHeaderColumn>
        </BootstrapTable>
      );
    } else {
      return <p>?</p>;
    }
  }
}

const products = [
  {
    id: 1,
    name: "Apple",
    price: 12,
    expand: [
      {
        fieldA: "test1",
        fieldB: "test2"
      },
      {
        fieldA: "test2",
        fieldB: "test3"
      }
    ]
  },
  {
    id: 2,
    name: "Pear",
    price: 8,
    expand: [
      {
        fieldA: "test1",
        fieldB: "test2"
      },
      {
        fieldA: "test2",
        fieldB: "test3"
      }
    ]
  },
  {
    id: 3,
    name: "Figs",
    price: 10,
    expand: [
      {
        fieldA: "test1",
        fieldB: "test2"
      },
      {
        fieldA: "test2",
        fieldB: "test3"
      }
    ]
  },
  {
    id: 4,
    name: "Pineapple",
    price: 13,
    expand: [
      {
        fieldA: "test1",
        fieldB: "test2"
      },
      {
        fieldA: "test2",
        fieldB: "test3"
      }
    ]
  }
];

// If you want to enable deleteRow, you must enable row selection also.
// const selectRowProp = {
//   mode: "checkbox",
//   bgColor: "#FFCDAF",
//   hideSelectColumn: false, // enable hide selection column.
//   clickToSelect: false // enable click to select
// };

const selectRow = {
  mode: "checkbox",
  bgColor: "#F0AD4E",
  clickToSelect: true, // click to select, default is false
  clickToExpand: true // click to expand row, default is false
};

const cellEdit = {
  mode: "dbclick",
  blurToSave: true
};

export class PestTable2 extends Component {
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
    return <Stages data={row.expand} />;
  };

  render() {
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
        data={products}
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
        <TableHeaderColumn dataField="id" width="40" dataAlign="center" isKey>
          ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataSort={true}>
          Informal Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="price">Formal Name</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
