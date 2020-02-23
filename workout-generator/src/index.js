import React from "react";
import ReactDOM from "react-dom";

// Import custom components from App.js
import { Button, Label, Form } from "./App.js";

// Import workout database from workouts.js
import Workouts from "./workouts.js";

// Main View rendered to the webpage
class View extends React.Component {
  constructor(props) {
    super(props);
    // Store currently shown workouts, number of desired exercises,
    // and selected types of exercises in the state
    this.state = {
      workouts: [],
      numExercises: 0,
      options: []
      //typeExercise: "Upper Body"
    };
  }

  // Function for setting the number of desired exercises
  setNum = num => {
    this.setState({ numExercises: num }, function() {
      console.log(this.state.numExercises);
    });
  };

  addOption = options => {
    let opts = this.state.options;
    for (let option of options) {
      opts.push(option);
    }
    this.setState({ options: opts }, function() {
      console.log(this.state.options);
    });
  };

  removeOption = options => {
    let opts = this.state.options;
    for (let option of options) {
      if (opts.includes(option)) {
        opts.splice(opts.indexOf(option), 1);
      }
    }
    this.setState({ options: opts }, function() {
      console.log(this.state.options);
    });
  };

  setOption = options => {
    this.setState({ options: [] });
    let opts = options;
    this.setState({ options: opts }, function() {
      console.log(this.state.options);
    });
  };

  // Function for picking random exercises
  Generate = clicked => {
    if (clicked === true && this.state.options.length > 0) {
      var addition = [];
      var len = Workouts.length;
      var rndIndex = 0;
      var count = parseInt(this.state.numExercises);

      while (count > 0) {
        rndIndex = Math.floor(Math.random() * len);
        if (
          this.state.options.includes(Workouts[rndIndex]["target-muscle"]) &&
          !addition.includes(Workouts[rndIndex])
        ) {
          count--;
          addition.push(Workouts[rndIndex]);
        }
      }

      this.setState({ workouts: addition });
    } else {
      return <br></br>;
    }
  };

  // Render exercises to the screen
  render() {
    return (
      <div class="container">
        <div>
          <Button text="Generate Workout" func={this.Generate}></Button>
          <Form
            addOptFunc={this.addOption}
            removeOptFunc={this.removeOption}
            setOptFunc={this.setOption}
            numFunc={this.setNum}
          ></Form>
          <div class="list">
            {this.state.workouts.map(workout => (
              <Label
                key={workout.name}
                name={workout.name}
                link={workout.hyperlink}
                type={workout.type}
                targetmuscle={workout["target-muscle"]}
                difficulty={workout.difficulty}
              ></Label>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<View />, document.getElementById("root"));
