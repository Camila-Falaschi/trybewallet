import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class SelectInput extends Component {
  render() {
    const { testid, labelName, dataArray } = this.props;
    return (
      <label htmlFor={ labelName }>
        {labelName}
        <select data-testid={ testid } id={ labelName }>
          {dataArray.map((element) => (
            <option key={ element } value={ element }>{element}</option>
          ))}
        </select>
      </label>
    );
  }
}

SelectInput.propTypes = {
  testid: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  dataArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};
