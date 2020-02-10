import React from "react";
import ReactDOM from "react-dom";
import { Button, Label, Form } from "./App.js";
import Workouts from "./workouts.js";

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
      numExercises: 0,
      typeExercise: "Upper Body"
    };
  }

  setNum = (num) => {
    this.setState({ numExercises: num }, function(){
      console.log(this.state.numExercises);
    });
  };

  setType = (type) => {
    this.setState({ typeExercise: type }, function(){
      console.log(this.state.typeExercise);
    });
  };

  Generate = clicked => {
    if (clicked === true) {
      var addition = [];
      var len = Workouts.length;
      console.log("Length of Workouts Array: ", len);
      var rndIndex = 0;
      var count = parseInt(this.state.numExercises);
      while(count > 0){
        rndIndex = Math.floor(Math.random() * len);
        console.log(rndIndex);
        if(Workouts[rndIndex].type === this.state.typeExercise && !addition.includes(Workouts[rndIndex])){
          count--;
          addition.push(Workouts[rndIndex]);
        }
      }
      console.log(addition);
      this.setState({ workouts: addition });
    } else {
      return <br></br>;
    }
  };

  render() {
    return (
      <div class="container">
        <div>
          <Button text="Generate Workout" func={this.Generate}></Button>
          <Form numFunc={this.setNum} typeFunc={this.setType}></Form>
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
