import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Label} from './App.js'
import Workouts from './workouts.js';

class View extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            workouts:[]
        };
    }
    
    Generate = (clicked) => {
        if(clicked === true){
            var addition = [];
            Workouts.map((workout) => {
                addition.push(workout);
            });
            this.setState({workouts: addition});
        }
        else{
            return(<br></br>);
        }
    }

    render() {
        return(
            <div class="container">
                <div>
                    <Button text="Generate Workout" func={this.Generate}></Button>
                    <div class="list">
                        {this.state.workouts.map((workout) => (
                            <Label key={workout.name} name={workout.name} link={workout.hyperlink} type={workout.type} targetmuscle={workout["target-muscle"]} difficulty={workout.difficulty}></Label>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<View />, document.getElementById('root'));