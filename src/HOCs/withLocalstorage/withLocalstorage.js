import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (key, defaultData) => Component =>
  class HOCLocalStorage extends React.Component {
    saveData = data => {
      save(key, data);
      this.forceUpdate();
    };

    render() {
      const loadedData = load(key);

      return (
        <Component
          saveData={this.saveData}
          savedData={loadedData ? loadedData : defaultData}
          {...this.props}
        />
      );
    }
  };

export default withLocalstorage;
