/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { Component, PropTypes } from 'react';
import s from './SearchBar.css';
import Link from '../Link';

class SearchBar extends Component {
  handleChange(event) {
    this.setState({search: event.target.value})
  }

  handlePress(event) {
    if (event.key === 'Enter') {
      this.props.callback(this.state.search);
    }
  }

  render() {
    return (
      <div>
        <input
          placeholder='Add new product to compare here...'
          onKeyPress={this.handlePress.bind(this)}
          onChange={this.handleChange.bind(this)}
          type="text"
        />  
      </div>);
  }

}
SearchBar.propTypes = {
  callback: PropTypes.func,
};

export default withStyles(s)(SearchBar);
