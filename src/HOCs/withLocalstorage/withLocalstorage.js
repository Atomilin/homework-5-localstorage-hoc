import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (key, defaultData) => (WrappedComponent) => {
    return class HOCLocalStorage extends Component {
        constructor(props) {
            super(props);

            this.key = key;
            this.data = load(key);
            this.state = {
                newData: []
            };
        }
        
        loadData = () => {
            return load(key) || defaultData
        };

        updateData = (data) => {
            save(key, data);
            this.setState({
                newData: load(key)
            })
        };

        render() {
            return <WrappedComponent savedData={this.loadData()} updateData={this.updateData}/>
        }
    }
};


export default withLocalstorage;
