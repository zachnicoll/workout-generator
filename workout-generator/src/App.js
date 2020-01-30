import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
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

export default Button;