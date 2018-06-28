import React, { Component } from 'react';

export default class SubmitButton extends Component {

    render() {

        return (
            <div className="pure-controls">
                <button type="submit" className="pure-button pure-button-primary">{this.props.name}</button>
            </div>
        );
    }
}