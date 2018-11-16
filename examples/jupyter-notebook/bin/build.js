import webpack from 'webpack';
import {appendFileSync} from 'fs';
import {join} from 'path';

import webpackConfig from '../webpack/build';

const bundler = webpack(webpackConfig);

bundler.run((err, stats) => {
  /* eslint-disable */
  if (err) {
    return console.error(err);
  }

  const assets = stats.toJson().assetsByChunkName;
  const [main, style] = assets.main;
  const files = JSON.stringify({main, style});
  appendFileSync(join(__dirname, '../dist/', main), `\nwindow.FILES=${files}`);

  return console.log(stats.toString(webpackConfig.stats));
  /* eslint-enable */
});
