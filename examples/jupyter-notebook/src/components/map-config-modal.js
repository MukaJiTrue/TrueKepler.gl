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
import {default as window} from 'global/window';
import Clipboard from 'clipboard';
import {receiveMapConfig} from 'kepler.gl/actions';
import SchemaManager from 'kepler.gl/schemas';

// string to replace between js object and python dict
const Params = {
  'true': 'True',
  'false': 'False',
  'null': 'None'
};

const propTypes = {
  close: React.PropTypes.func.isRequired
};

export const LAYER_CONFIG_ID = 'copyConfig';
export class LayerConfigModal extends Component {
  state = {
    isCopied: false
  };

  componentDidMount() {
    this.clip = new Clipboard('#copy-btn');
  }

  componentWillUnmount() {
    this.clip.destroy();
  }

  onClickApply() {
    this._setConfig();
    window.setTimeout(this.props.close, 1000);
  }

  onClickCopy() {
    this.setState({isCopied: true});
    window.setTimeout(this.props.close, 1000);
  }

  render() {
    const {isCopied} = this.state;

    return (
      <div className="soft-tiny text--center">
        <textarea
          rows="20"
          className="text-input text-input--textarea--small flush"
          id={LAYER_CONFIG_ID} value={this._getConfig()}/>
        <div className="button" id="copy-btn"
          onClick={this.onClickCopy}
          data-clipboard-target= {`#${LAYER_CONFIG_ID}`}>
          {isCopied ? 'copied' : 'copy'}</div>
      </div>
    );

    /* DEBUG: Add this button allow setting of state via the textarea
     * Useful for debugging deserialization
        <Button
          className=""
          id="apply-btn"
          kind={ 'primary' }
          icon={ 'icon_gear' }
          onClick={ this.onClickApply }
        >{ 'Apply' }</Button>
    */
  }

  // Return string suitable for use in Jupyter-Voyager to configure layers
  _getConfig() {
    // replace true => True; false => False; null => None
    const configStr = JSON.stringify(SchemaManager.getAppConfigToSave(this.props.appState), null, 2);
    return IsIframe ? configStr.replace(/: ([a-z]+)/g, (_, key) => `: ${Params[key]}` || `: ${key}`)
      : configStr;
  }

  // Get the JSON config from the textarea and apply it via
  // the deserialization support.
  _setConfig() {
    const configText = window.document.getElementById(LAYER_CONFIG_ID);
    const config = JSON.parse(configText);

    const parsedConfig = SchemaManager.parseSavedConfig(config);
    this.props.dispatch(receiveMapConfig(parsedConfig));
  }

}

LayerConfigModal.propTypes = propTypes;
LayerConfigModal.displayName = 'LayerConfigModal';

// export default connect(
//   (state, props) => ({appState: state, ...props}))(LayerConfigModal);
