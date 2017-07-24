import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Table, Icon, Input, Popconfirm, Button } from "antd";

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === "save") {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === "cancel") {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.editable !== this.state.editable ||
      nextState.value !== this.state.value
    );
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div>
        {editable
          ? <div>
              <Input value={value} onChange={e => this.handleChange(e)} />
            </div>
          : <div className="editable-row-text">
              {value.toString() || " "}
            </div>}
      </div>
    );
  }
}

@inject("store")
@observer
export class PestTable extends Component {
  onDelete = index => {
    const dataSource = [...this.props.store.app.species.slice()];
    dataSource.splice(index, 1);
    this.props.store.app.setSpecies(dataSource);
  };

  handleAdd = () => {
    this.props.store.app.addSpecie();
  };

  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }

  edit(index) {
    const { species } = this.props.store.app;
    Object.keys(species[index]).forEach(item => {
      if (
        species[index][item] &&
        typeof species[index][item].editable !== "undefined"
      ) {
        species[index][item].editable = true;
      }
    });
  }

  renderColumns = (data, index, key, text) => {
    const { editable, status } = data[index][key];
    if (typeof editable === "undefined") {
      return text;
    }
    return (
      <EditableCell
        editable={editable}
        value={text}
        onChange={value => this.handleChange(key, index, value)}
        status={status}
      />
    );
  };

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
        width: 50
      }
    ];
    const { species } = this.props.store.app;
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
        render: (text, record, index) =>
          this.renderColumns(species, index, "informalName", text)
      },
      { title: "Formal Name", dataIndex: "formalName", key: "formalName" },
      { title: "Hosts", dataIndex: "hosts", key: "hosts" },
      {
        title: "Action",
        key: "operation",
        render: (text, record, index) => {
          return this.props.store.app.species.slice().length > 1
            ? <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.onDelete(index)}
              >
                <a>Delete</a>
              </Popconfirm>
            : null;
        }
      },
      {
        title: "Edit",
        key: "edit",
        render: (text, record, index) => {
          // const { editable } = this.state.data[index].name;
          return (
            <div className="editable-row-operations">
              {false
                ? <span>
                    <a onClick={() => this.editDone(index, "save")}>Save</a>
                    <Popconfirm
                      title="Sure to cancel?"
                      onConfirm={() => this.editDone(index, "cancel")}
                    >
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                : <span>
                    <a onClick={() => this.edit(index)}>Edit</a>
                  </span>}
            </div>
          );
        }
      }
    ];

    return (
      <div>
        <br />
        <Button className="editable-add-btn" onClick={this.handleAdd}>
          Add Pest
        </Button>
        <br />
        <Table
          style={{ marginTop: "10px" }}
          rowKey={record => record.id}
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={stage => this.expandedRowRender(stage.id)}
          // expandedRowRender={stage => console.log(stage.id)}
          dataSource={species.slice()}
        />
      </div>
    );
  }
}
