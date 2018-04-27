### Intallation

Use <b>Node v6</b> and above, older node versions have not been tested

```sh
npm install --save kepler.gl
```

### Usage

#### 1.Get Mapbox Token

Kepler.gl is built on top of [Mapbox GL](https://www.mapbox.com). A mapbox account and an access token are needed to use kepler.gl in your app. Get a [Mapbox Access Token](https://www.mapbox.com/help/define-access-token/) at mapbox.com.

#### 2. Mount reducer

Kepler.gl uses [Redux](https://redux.js.org/) to manage its internal state, along with [react-palm](https://github.com/btford/react-palm) middleware to handle side effects. Mount kepler.gl reducer in your store, apply  `taskMiddleware`.

```js
import keplerGlReducer from 'kepler.gl/reducers';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {taskMiddleware} from 'react-palm/tasks';

const reducer = combineReducers({
  // <-- mount kepler.gl reducer in your app
  keplerGl: keplerGlReducer,

  // Your other reducers here
  app: appReducer
});

// create store
const store = createStore(reducer, {}, applyMiddleware(taskMiddleware));
```
If you mount `keplerGlReducer` in another address instead of `keplerGl`, or it is not
mounted at root of your reducer, you will need to specify the path to it when you mount the component with the `getState` prop.

#### 3. Mount component

```js
import KeplerGl from 'kepler.gl';

const Map = props => (
  <KeplerGl
      id="foo"
      mapboxApiAccessToken={token}
      width={width}
      height={height}/>
);
```

#### 4. Add data to map
In order to interact with a kepler.gl instance and add new data to it, you can dispatch __`addDataToMap`__ action from anywhere inside your app. It adds dataset to kepler.gl instance and update the full configuration (mapState, mapStyle, visState).

Read more about [addDataToMap](./api-reference/actions/actions.md#adddatatomap)
```js
import {addDataToMap} from 'kepler.gl/actions';

this.props.dispatch(
  addDataToMap(
    // datasets
    {
      info: {
        label: 'Sample Taxi Trips in New York City',
        id: 'test_trip_data'
      },
      data: sampleTripData
    },
    // option
    {
      centerMap: true,
      readOnly: false
    },
    // config
    {
      mapStyle: {styleType: 'light'}
    }
  )
);
```
