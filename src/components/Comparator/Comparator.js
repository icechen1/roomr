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
import 'whatwg-fetch';

const mock = [
  {
    skuNumber: 0,
    title: 'Cool ass TV',
    description: 'This TV is petty damn dope.'
  },
  {
    skuNumber: 1,
    title: 'Lame ass TV',
    description: 'This TV is petty damn dope.'
  }
];

class Comparator extends Component {

  constructor() {
      super();
      let initItems = [].concat(mock);
      this.state = {items: initItems};
      console.log(this.state.items);
  }

  onSearchSubmit(res) {
    console.log('fetching at /bd/v0/productSearch/' + res);
    fetch('/bd/v0/productSearch/' + res)
      .then(function(response) {
        return response.json()
      }).then((json) => {
        console.log(json);
        this.state.items.push(json[0]);
        this.setState({items: this.state.items});
      }).catch(function(ex) {
        console.error('parsing failed', ex)
      });
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1 className={s.title}>Comparing {this.state.items.length} Products</h1>
        <SearchBar callback={this.onSearchSubmit.bind(this)} />
        <div className={s.products_table}>            
            <div className={s.products_wrapper}>
              <div className={s.products_columns}>
              { this.state.items.map((item, index) => (
                <div key={item.skuNumber} className={s.product}>
                  <div className={s.innerProduct}> 
                    <div className={s.topInfo}>
                      <h3>{item.title}</h3>
                    </div>
                    <div className={s.center}>
                      <img src={item.image} alt="Product Image" />
                    </div>
                    <div className={s.featureslist}>
                      <div className={s.tag}>${item.price}</div>
                      { (item.overallRating > 0) ?
                          <div className={s.rate}><span>{item.overallRating}/5</span></div>
                        :
                          <div className={s.rate}><span>Unrated</span></div>
                      }
                      <div>{item.description}</div>
                    </div>
                  </div>
                  <div className={s.buyBtn}>
                    <a href={item.url}>Buy</a>
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
