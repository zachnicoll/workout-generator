import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.css';

export const Button = class Button extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text:this.props.text,
            func:this.props.func,
            clicked:false
        };
    }
    
    click = async () => {
            await this.setState({clicked:true}, function(){
                this.state.func(this.state.clicked);
            });
            await this.setState({clicked:false});
    }

    render() {
        return(
            <button onClick={this.click}>{this.state.text}</button>
        );
    }
}

export const Label = class Label extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        
        };
    }
    
    render() {
        return(
            <div class="item">
                <a href={this.props.link}>
                    <p><b>{this.props.name}</b></p>
                    <p>Type: {this.props.type}</p>
                    <p>Target Muscle: {this.props.targetmuscle}</p>
                    <p>Difficulty: {this.props.difficulty}</p>
                </a>
            </div>
        );
    }
}