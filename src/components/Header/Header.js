/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';

function Header() {
  // compareus!
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Navigation className={s.nav} />
        <Link className={s.brand} to="/">
          <span width="38" height="38"> 🎅 </span>
          <span className={s.brandTxt}>bd2bd</span>
        </Link>
        <div className={s.banner}>
          <h2 className={s.bannerTitle}>BuildDirect Compare</h2>
          <p className={s.bannerDesc}>Buy buy buy!</p>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
