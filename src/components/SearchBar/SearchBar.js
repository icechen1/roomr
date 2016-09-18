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
    this.setState({search: event.target.value});
  }

  render() {
    return (
      <div>
        <input
        placeholder='Add new product to compare here...'
        onChange={this.handleChange.bind(this)}
        type="text"
        />  
      </div>);
  }

}
SearchBar.propTypes = {
  showTitle: PropTypes.string,
};

export default withStyles(s)(SearchBar);
