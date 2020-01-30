import React from 'react';
import ReactDOM from 'react-dom';
import Button from './App.js'
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
            <div>
                <Button text="Generate Workout" func={this.Generate}></Button>
                <ul>
                    {this.state.workouts.map((workout) => (
                        <li key={workout.name}>{workout.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<View />, document.getElementById('root'));