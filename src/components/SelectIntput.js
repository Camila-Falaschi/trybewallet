import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class SelectInput extends Component {
  render() {
    const { testid, labelName, dataArray, handleInputChange, name, value } = this.props;
    return (
      <label htmlFor={ labelName }>
        {labelName}
        <select
          name={ name }
          value={ value }
          data-testid={ testid }
          id={ labelName }
          onChange={ handleInputChange }
        >
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
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  dataArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};
