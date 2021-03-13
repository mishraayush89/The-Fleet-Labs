import React, { Component } from "react";
import "./collapsible.css";
import { database } from "../firebase/utils";
class Collapsible extends Component {
  constructor(props) {
    super();
    this.state = {
      medical: "",
      transport: "",
      open: true,
      open2: true,
    };
    this.fillitems = this.fillitems.bind(this);
    this.fillitems2 = this.fillitems2.bind(this);
  }

  componentDidMount() {
    const medref = database.ref("medical");
    medref.on("value", (snapshot) => {
      const items = snapshot.val();
      const item = [];
      for (let id in items) {
        item.push({ _id: id, ref: "medical", ...items[id] });
      }
      console.log(item);
      this.setState({ medical: item });
    });

    const transref = database.ref("transport");
    transref.on("value", (snapshot) => {
      const items = snapshot.val();
      const item = [];
      for (let id in items) {
        item.push({ _id: id, ref: "transport", ...items[id] });
      }
      console.log(item);
      this.setState({ transport: item });
    });
  }
  fillitems() {
    let reps = this.state.medical ? this.state.medical : "";
    if (reps.length > 0) {
      return reps.map((rep) => {
        return (
          <tr key={rep._id}>
            <td><strong>{rep.title}</strong></td>
            <td>{rep.cap_per_claim}</td>
            <td>{rep.cap_per_yaer}</td>
            <td>{rep.cap_per_month}</td>
            <td>{rep.available}</td>
            <td style={{ textAlign: "center" }}>
              <button
                onClick={() => {
                  this.deleteitem(rep);
                }}
                className="delbtn"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
  }
  fillitems2() {
    let reps = this.state.transport ? this.state.transport : "";
    if (reps.length > 0) {
      return reps.map((rep) => {
        return (
          <tr key={rep._id}>
            <td><strong>{rep.title}</strong></td>
            <td>{rep.cap_per_claim}</td>
            <td>{rep.cap_per_yaer}</td>
            <td>{rep.cap_per_month}</td>
            <td>{rep.available}</td>
            <td style={{ textAlign: "center" }}>
              <button
                onClick={() => {
                  this.deleteitem(rep);
                }}
                className="delbtn"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
  }

  deleteitem(rep) {
    const delref = database.ref(rep.ref).child(rep._id);
    delref.remove();
  }

  render() {
    const { open, open2 } = this.state;
    return (
      <Tabs>
        <Tab label="My Benifits">
          <div className="collapse">
            <div className="top">
              <div className="title">🚑 Medical</div>
              <div className="top2">
                <div className="title2">
                  starting Balance: <strong>500SGD</strong>
                </div>

                <div className="title3">
                  Available Balance: : <strong>280.50SGD</strong>
                </div>

                <svg
                  onClick={() => this.setState({ open: !open })}
                  style={{
                    transform: open ? "rotate(0deg)" : "rotate(180deg)",
                    transition: "0.3s all",
                  }}
                  className="arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 28 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 16L14 6L4 16L0 14L14 0L28 14L24 16Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <div
              className="bottom"
              style={{
                maxHeight: open ? "300px" : "0px",
              }}
            >
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Cap_per_claim</th>
                    <th>cap_per_year</th>
                    <th>cap_per_month</th>
                    <th>available balance</th>
                    <th style={{ textAlign: "center",visibility:'hidden'  }}>Delete</th>
                  </tr>
                </thead>
                <tbody>{this.fillitems()}</tbody>
              </table>
            </div>
          </div>

          <div className="collapse">
            <div className="top">
              <div className="title">🚗 Transport</div>
              <div className="top2">
                <div className="title2">
                  starting Balance: <strong>500SGD</strong>
                </div>

                <div className="title3">
                  Available Balance: : <strong>280.50SGD</strong>
                </div>

                <svg
                  onClick={() => this.setState({ open2: !open2 })}
                  style={{
                    transform: open2 ? "rotate(0deg)" : "rotate(180deg)",
                    transition: "0.3s all",
                  }}
                  className="arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 28 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 16L14 6L4 16L0 14L14 0L28 14L24 16Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <div
              className="bottom"
              style={{
                maxHeight: open2 ? "300px" : "0px",
              }}
            >
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Cap_per_claim</th>
                    <th>cap_per_year</th>
                    <th>cap_per_month</th>
                    <th>available balance</th>
                    <th style={{ textAlign: "center",visibility:'hidden' }}>Delete</th>
                  </tr>
                </thead>
                <tbody>{this.fillitems2()}</tbody>
              </table>
            </div>
          </div>
        </Tab>
        <Tab label="Others"></Tab>
      </Tabs>
    );
  }
}

/*
Implementation of the tab component
*/
class Tabs extends React.Component {
  state = {
    activeTab: this.props.children[0].props.label,
  };
  changeTab = (tab) => {
    this.setState({ activeTab: tab });
  };
  render() {
    let content;
    let buttons = [];
    return (
      <div>
        {React.Children.map(this.props.children, (child) => {
          buttons.push(child.props.label);
          if (child.props.label === this.state.activeTab)
            content = child.props.children;
        })}

        <TabButtons
          activeTab={this.state.activeTab}
          buttons={buttons}
          changeTab={this.changeTab}
        />
        <div className="tab-content">{content}</div>
      </div>
    );
  }
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className="tab-buttons">
      {buttons.map((button) => {
        return (
          <button
            className="tab2"
            className={button === activeTab ? "active" : ""}
            onClick={() => changeTab(button)}
          >
            {button}
          </button>
        );
      })}
    </div>
  );
};

const Tab = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Collapsible;