import React from "react";
import ReactDOM from "react-dom";
import styles from "./App.css";

// Contains all custom components used in index.js

// Button Component //
export const Button = class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      func: this.props.func,
      clicked: false
    };
  }

  click = async () => {
    await this.setState({ clicked: true }, function() {
      this.state.func(this.state.clicked);
    });
    await this.setState({ clicked: false });
  };

  render() {
    return <button onClick={this.click}>{this.state.text}</button>;
  }
};
///////////////////

// Label Component //
export const Label = class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="item">
        <a href={this.props.link} target="blank">
          <p>
            <b class="itemtitle">{this.props.name}</b>
          </p>
          <hr style={{ width: "90%" }}></hr>
          <p class="itemcontent">
            <b>Type:</b> {this.props.type}
          </p>
          <p class="itemcontent">
            <b>Target Muscle:</b> {this.props.targetmuscle}
          </p>
          <p class="itemcontent">
            <b>Difficulty:</b> {this.props.difficulty}
          </p>
        </a>
      </div>
    );
  }
};
///////////////////

// Form Component //
export const Form = class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Biceps: false,
      Triceps: false,
      Abs: false,
      Shoulders: false,
      Chest: false,
      Traps: false,
      Lats: false,
      "Lower Back": false,
      "Upper Back": false,
      Forearms: false,
      Quads: false,
      Hamstrings: false,
      Calves: false,
      Glutes: false,
      Adductors: false,
      Abductors: false
    };
  }

  typeOpts = type => {
    console.log("Type is", type);
    if (type === "Upper Body") {
      let options = [
        "Biceps",
        "Triceps",
        "Abs",
        "Shoulders",
        "Chest",
        "Traps",
        "Lats",
        "Lower Back",
        "Upper Back",
        "Forearms"
      ];
      let notOptions = [
        "Quads",
        "Hamstrings",
        "Calves",
        "Glutes",
        "Adductors",
        "Abductors"
      ];
      this.props.setOptFunc(options);
      this.setChecked(options, true);
      this.setChecked(notOptions, false);
    } else if (type === "Lower Body") {
      let notOptions = [
        "Biceps",
        "Triceps",
        "Abs",
        "Shoulders",
        "Chest",
        "Traps",
        "Lats",
        "Lower Back",
        "Upper Back",
        "Forearms"
      ];
      let options = [
        "Quads",
        "Hamstrings",
        "Calves",
        "Glutes",
        "Adductors",
        "Abductors"
      ];
      this.props.setOptFunc(options);
      this.setChecked(options, true);
      this.setChecked(notOptions, false);
    } else if(type === "Both") {
      let options = [
        "Biceps",
        "Triceps",
        "Abs",
        "Shoulders",
        "Chest",
        "Traps",
        "Lats",
        "Lower Back",
        "Upper Back",
        "Forearms",
        "Quads",
        "Hamstrings",
        "Calves",
        "Glutes",
        "Adductors",
        "Abductors"
      ];
      this.props.setOptFunc(options);
      this.setChecked(options, true);
    }
    else{
      let options = [
        "Biceps",
        "Triceps",
        "Abs",
        "Shoulders",
        "Chest",
        "Traps",
        "Lats",
        "Lower Back",
        "Upper Back",
        "Forearms",
        "Quads",
        "Hamstrings",
        "Calves",
        "Glutes",
        "Adductors",
        "Abductors"
      ];
      this.props.setOptFunc([]);
      this.setChecked(options, false);
    }
  };

  handleOpts = (options, add) => {
    this.setChecked(options, add);
    if (add === true) {
      this.props.addOptFunc(options);
    } else {
      this.props.removeOptFunc(options);
    }
  };

  setChecked = (options, checked) => {
    for (let option of options) {
      this.setState({ [option]: checked });
    }
  };

  render() {
    return (
      <div class="form">
        <div
          class="form-content"
          style={{ borderRight: "3px solid rgba(0,0,0,0.5)", width: "32%" }}
        >
          <h1>
            Number of Exercises:{" "}
            <input
              type="text"
              name="numExercises"
              onChange={event => this.props.numFunc(event.target.value)}
              autoComplete="off"
            ></input>{" "}
            <br></br>
          </h1>
          <h1>
            Type:
            <select onChange={event => this.typeOpts(event.target.value)}>
            <option value="">--Select--</option>
              <option value="Upper Body">Upper Body</option>
              <option value="Lower Body">Lower Body</option>
              <option value="Both">Both</option>
            </select>
          </h1>
        </div>

        <div class="form-content" style={{ marginLeft: "10px" }}>
          <p>
            {[
              "Biceps",
              "Triceps",
              "Abs",
              "Shoulders",
              "Chest",
              "Traps",
              "Lats"
            ].map(muscle => (
              <span>
                <input
                  type="checkbox"
                  name={muscle}
                  checked={this.state[muscle]}
                  onChange={event =>
                    this.handleOpts(
                      [event.target.name],
                      event.target.checked,
                      muscle
                    )
                  }
                ></input>
                <text>{muscle}</text>
              </span>
            ))}
          </p>
          <p>
            {[
              "Lower Back",
              "Upper Back",
              "Forearms",
              "Quads",
              "Hamstrings"
            ].map(muscle => (
              <span>
                <input
                  type="checkbox"
                  name={muscle}
                  checked={this.state[muscle]}
                  onChange={event =>
                    this.handleOpts([event.target.name], event.target.checked)
                  }
                ></input>
                <text>{muscle}</text>
              </span>
            ))}
          </p>
          <p>
            {["Calves", "Glutes", "Adductors", "Abductors"].map(muscle => (
              <span>
                <input
                  type="checkbox"
                  name={muscle}
                  checked={this.state[muscle]}
                  onChange={event =>
                    this.handleOpts([event.target.name], event.target.checked)
                  }
                ></input>
                <text>{muscle}</text>
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  }
};
///////////////////
