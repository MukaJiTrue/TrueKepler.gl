// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import {connect} from 'react-redux';
import window from 'global/window';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {receivePostMessage} from './actions';

import {replaceLoadDataModal} from './factories/map-config-modal';
import {AddDataButtonFactory, ExportConfigModalFactory} from 'kepler.gl/components';

import ExportConfigButtonFactory from './components/export-config-button';
import CustomExportConfigModalFactory from './components/export-config-modal';

const KeplerGl = require('kepler.gl/components').injectComponents([
  [AddDataButtonFactory, ExportConfigButtonFactory],
  [ExportConfigModalFactory, CustomExportConfigModalFactory]
]);

// const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line
const MAPBOX_TOKEN = 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2pmc3hhd21uMzE3azJxczJhOWc4czBpYyJ9.HiDptGv2C0Bkcv_TGr_kJw'; // eslint-disable-line

// Sample data
import sampleData from './data/sample-data';
import sampleConfig from './configurations/config.json';

/* eslint-disable no-unused-vars */
import {updateVisData, addDataToMap} from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';
/* eslint-enable no-unused-vars */

class App extends Component {

  componentDidMount() {
    // load sample msg for testing
    // this._receiveJupyterMsg();

    window.addEventListener('message', this._msgHandler);
  }

  _receiveJupyterMsg() {
    const jupyterData = {
      data: [{
        id: 'hex_data',
        data: sampleData
      }],

      // config is optional
      config: sampleConfig
    };

    this.props.dispatch(receivePostMessage(jupyterData));
  }

  _msgHandler = (e) => {
    // if jupyter is suppose to send a config or a data
    if (e.data.config || e.data.data) {
      this.props.dispatch(receivePostMessage(e.data));
    }
  }

  componentWillUnMount() {
    // for workbench integration
    window.removeEventListener('message', this._msgHandler);
  }

  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl
              mapboxApiAccessToken={MAPBOX_TOKEN}
              id="map"
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);
