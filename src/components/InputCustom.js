import React, { Component } from 'react';

export default class InputCustom extends Component {

    render() {
        return (
            <div className="pure-control-group pure-u-1-3">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} value={this.props.value} onChange={this.props.onChange}></input>
            </div>
        );
    }
}