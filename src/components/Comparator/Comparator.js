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
import { REVIEW_WORDS } from './review_words.js';
import Link from '../Link';
import 'whatwg-fetch';
import nlp from 'nlp_compromise';

const mock = [

];

class Comparator extends Component {

  constructor() {
      super();
      let initItems = [].concat(mock);
      this.state = {items: initItems};
      console.log(this.state.items);
  }

  onSearchSubmit(res) {
    console.log('fetching at /bd/v0/products/' + res);

    let overview = {};
    let details = {};
    let reviews = {};

    fetch('/bd/v0/productSearch/' + res)
      .then((response) => {
        return response.json();
      }).then((overviewJson) => {
        overview = overviewJson;
        return fetch('/bd/v0/products/' + res)
      }).then((response) => {
        return response.json();
      }).then((detailsJson) => {
        details = detailsJson;
        return fetch('/bd/v0/productReviews/' + res)
      }).then((response) => {
        return response.json();
      }).then((reviews) => {
        //union of 3 jsons
        console.log(overview);
        console.log(details);
        console.log(reviews);

        details.overallRating = overview[0].overallRating;
        details.reviews = reviews;

        this.state.items.push(details);
        this.setState({items: this.state.items});
        console.log(this.state.items);
      }).catch(function(ex) {
        console.error('parsing failed', ex)
      });
  }

  parseFeatures(html) {
    let stripped = html.replace(/<(?:.|\n)*?>/gm, '')
    let sentencesTags = nlp.text(stripped).tags();
    console.log(sentencesTags)
    ;
    //return {__html: stripped};
    // return "";
  }

  parseReviews(reviews) {
    let out = {};
    
    for(let review of reviews) {
      if(review) {
        let sentencesRoot = nlp.text(review).root();
        let words = nlp.text(sentencesRoot).terms();
        words.forEach(function (word, i) {
          if (Object.keys(REVIEW_WORDS).indexOf(word.normal) > -1) {
                //In the array!
                let index = Object.keys(REVIEW_WORDS).indexOf(word.normal);
                let key = Object.keys(REVIEW_WORDS)[index];

                let current = out[key];
                if(current)
                  out[key] = ++current;
                else
                  out[key] = 1;
          }
        });
      }
    }
    let out2 = [];
    for(let word in out) {
      out2.push({word: word, count: out[word]});
    }
    return out2;
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
                      <h3>{item.productName}</h3>
                    </div>
                    <div className={s.center}>
                    { item.mainImage ?
                      <img src={item.mainImage.url} alt="Product Image" />
                      : null }
                      <div className={s.featureslist}>
                        { (item.pricingTiers) ?
                            <div className={s.priceTag}>${item.pricingTiers[0].retailPrice}</div>
                          :
                            null
                        }
                        
                        { (item.overallRating > 0) ?
                            <div className={s.rate}><span>{item.overallRating}/5</span></div>
                          :
                            <div className={s.rate}><span>Unrated</span></div>
                        }
                      </div>
                      <div dangerouslySetInnerHTML={ this.parseFeatures(item.features) }></div>
                      <h2> Review Analysis </h2>
                      { item.reviews ? this.parseReviews(item.reviews).map((item, index) => (
                        <div className={s.tag}><b>{item.word}</b> {item.count}</div>
                      )) : <p> No reviews :( </p> }
                    </div>
                  </div>
                  <div className={s.buyBtn}>
                    <a href={item.productUrl}>Buy</a>
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
