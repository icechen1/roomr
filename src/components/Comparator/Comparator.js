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
import SearchBar from '../../components/SearchBar';
import s from './Comparator.css';
import Link from '../Link';

const mock = [
  {
    sku: 0,
    name: 'Cool ass TV',
    description: 'This TV is petty damn dope.'
  },
  {
    sku: 1,
    name: 'Lame ass TV',
    description: 'This TV is petty damn dope.'
  }
];

class Comparator extends Component {
  render() {
    return (
      <div>
        <h1 className={s.title}>Comparing {mock.length} Products</h1>
        <SearchBar />
        <div className={s.products_table}>            
            <div className={s.products_wrapper}>
              <div className={s.products_columns}>
              { mock.map((item, index) => (
                <div className={s.product}>
                  <div className={s.topInfo}>
                    <h3>{item.name}</h3>
                  </div>
                  <img src="http://placehold.it/350x150" alt="Product Image" />
                  <div className={s.featureslist}>
                    <div className={s.tag}>$600</div>
                    <div className={s.rate}><span>5/5</span></div>
                    <div>{item.description}</div>
                  </div>
                </div>
              )) }
              </div>
            </div>
          </div>
        </div>);
  }

}
Comparator.propTypes = {
  className: PropTypes.string,
};

export default withStyles(s)(Comparator);
