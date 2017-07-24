import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Table, Badge, Icon, Input } from "antd";

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false
  };
  handleChange = e => {
    const value = e.target.value;
    this.setState({ value });
  };

  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  onCellChange = (index, key) => {
    return value => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  };

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable
          ? <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
          : <div className="editable-cell-text-wrapper">
              {value || " "}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>}
      </div>
    );
  }
}

@inject("store")
@observer
export class PestTable extends Component {
  expandedRowRender = idx => {
    const columns = [
      {
        title: "Phenological Stage",
        dataIndex: "name",
        key: "name",
        width: 80
      },
      { title: "Status", dataIndex: "status", key: "status", width: 100 },
      { title: "ddlo", dataIndex: "ddlo", key: "ddlo", width: 30 },
      { title: "ddhi", dataIndex: "ddhi", key: "ddhi", width: 30 },
      {
        title: "Markers",
        dataIndex: "phenologicalMarkers",
        key: "phenologicalMarkers",
        width: 100
      },
      {
        title: "Scouting",
        dataIndex: "scouting",
        key: "scouting",
        width: 150
      },
      {
        title: "Management",
        dataIndex: "management",
        key: "management",
        width: 150
      },
      {
        title: "BioControl",
        dataIndex: "control",
        key: "control",
        width: 50
      },
      {
        title: "Actions",
        dataIndex: "operation",
        key: "operation",
        width: 50,
        render: () =>
          <span className={"table-operation"}>
            <a>Delete </a>
          </span>
      }
    ];
    const { species } = this.props.store.app;
    console.log(species[idx]);
    return (
      <Table
        rowKey={(record, index) => index}
        columns={columns}
        dataSource={species[idx].stages.slice()}
        pagination={false}
      />
    );
  };

  render() {
    const { species } = this.props.store.app;
    const columns = [
      {
        title: "Informal Name",
        dataIndex: "informalName",
        key: "informalName"
      },
      { title: "Formal Name", dataIndex: "formalName", key: "formalName" },
      { title: "Hosts", dataIndex: "hosts", key: "hosts" },
      { title: "Action", key: "operation", render: () => <a>Delete</a> }
    ];

    return (
      <Table
        rowKey={record => record.id}
        className="components-table-demo-nested"
        columns={columns}
        expandedRowRender={stage => this.expandedRowRender(stage.id)}
        dataSource={species.slice()}
      />
    );
  }
}
