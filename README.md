[<img width="180" alt="Kepler.gl" src="https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/website/icons/kepler.gl-logo.png">](http://www.kepler.gl/)

[Kepler.gl](http://www.kepler.gl) is a data-agnostic, high-performance web-based application for visual exploration of large-scale geolocation data sets, introduced in Uber's [eng blog](https://eng.uber.com/keplergl/). Built on top of [Mapbox GL](https://www.mapbox.com) and [deck.gl](http://uber.github.io/deck.gl/#/), kepler.gl can render millions of points representing thousands of trips and perform spatial aggregations on the fly.

[Demo app](https://uber.github.io/kepler.gl/#/demo)

[<img width="600" alt="Kepler.gl Demo" src="https://eng.uber.com/wp-content/uploads/2018/05/image4-3-768x493.png">](https://uber.github.io/kepler.gl/#/demo)

Kepler.gl is a React component that uses [Redux](https://redux.js.org/) to manage its state and data flow. It can be embedded into other React-Redux applications and is highly customizable.

To build a kepler.gl application, programtically load data, save and reload map config, take a look at this [step-by-step tutorial](http://vis.academy/#/kepler.gl/) on vis.academy.

<<<<<<< HEAD
## Dev Questions - StackOverflow
Check out this [StackOverflow](https://stackoverflow.com/questions/tagged/kepler.gl)

## Links
=======
### Documentation
- [Get Started](./docs/get-started.md)
- [User Guide](./docs/user-guides/j-get-started.md)
- [Api Refernece](./docs/api-reference/overview.md)
>>>>>>> generate output.md from jsDoc

### Intallation

For best results, use [nvm](https://github.com/creationix/nvm) `nvm install`.

### Install
Install node (`> 6`), yarn, and project dependencies

```sh
npm install --save kepler.gl
```

### Usage

Take a look at [examples/demo-app](./examples/demo-app) for how to use kepler.gl in your app. Each example in the examples folder can be installed and run locally.

#### 1.Get Mapbox Token

Kepler.gl is built on top of [Mapbox GL](https://www.mapbox.com). A mapbox account and an access token are needed to use kepler.gl in your app. Get a [Mapbox Access Token](https://www.mapbox.com/help/define-access-token/) at mapbox.com.

#### 2. Mount reducer

Kepler.gl uses [Redux](https://redux.js.org/) to manage its internal state, along with [react-palm](https://github.com/btford/react-palm) middleware to handle side effects.

If you mount `keplerGlReducer` in another address instead of `keplerGl`, or it is not
mounted at root of your reducer, you will need to specify the path to it when you mount the component with the `getState` prop.

```js
import keplerGlReducer from 'kepler.gl/reducers';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {taskMiddleware} from 'react-palm';

const reducer = combineReducers({
  // <-- mount kepler.gl reducer in your app
  keplerGl: keplerGlReducer,

  // Your other reducers here
  app: appReducer
});

// create store
const store = createStore(reducer, {}, applyMiddleware(taskMiddleware));
```

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

### Local development

```sh
git clone
```

```sh
npm install
```

or

```sh
yarn --ignore-engines
```
then
```
export MapboxAccessToken=<insert_your_token>

npm start
```
An Example app will be served at
http://localhost:8080/

### Develop The kepler.gl Website

Make sure to export mapbox token in the same terminal before start the server.
```sh
    export MapboxAccessToken=<insert_your_token>
```

In order to start
```
    yarn web
```

To checkout the build
```
    cd website && yarn build
```

Publish on github pages __Authorized User Only__.

<b>important* Before publish. Copy the mapbox token at [this link](http://t.uber.com/kepler.gl-token). (Only accessible by Uber developer). Deploy will fail if token is missing</b>
```
    export MapboxAccessToken=<insert_your_token>
    yarn deploy
```

### Basic Usage
You can also take a look at `kepler.gl/examples/demo-app` for how to use kepler.gl in your app
Here are the basic steps:

#### 1. Mount kepler.gl reducer in your app reducer. Kepler.gl uses [react-palm](https://github.com/btford/react-palm) to handle side effects.
You need to add `taskMiddleware` to your store too. We are actively working on a solution where
`react-palm` will not be required, however it is still a very nice side effects management tool that works easier for testing than react-thunk.

```js
import keplerGlReducer from 'kepler.gl/reducers';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {taskMiddleware} from 'react-palm/tasks';

const reducers = combineReducers({
  // <-- mount kepler.gl reducer in your app
  keplerGl: keplerGlReducer,

  // Your other reducers here
  app: appReducer
});

// using createStore
const store = createStore(reducer, applyMiddleware(taskMiddleware))

// using enhancers
const initialState = {}
const middlewares = [taskMiddleware]
const enhancers = [
  applyMiddleware(...middlewares)
]

const store = createStore(reducer, initialState, compose(...enhancers))
```

If you mount kepler.gl reducer in another address instead of `keplerGl`, or the kepler.gl reducer is not
mounted at root of your state, you will need to specify the path to it when you mount the component
with the `getState` prop.

#### 2. Mount kepler.gl Component

```js
import KeplerGl from 'kepler.gl';

const Map = props => (
  <KeplerGl
      id="foo"
      width={width}
      mapboxApiAccessToken={token}
      height={height}/>
);
```

##### Component Props

##### `id` (String, required)

- Default: `map`

The id of this KeplerGl instance. `id` is required if you have multiple
KeplerGl instances in your app. It defines the prop name of the KeplerGl state that is
stored in the KeplerGl reducer. For example, the state of the KeplerGl component with id `foo` is
stored in `state.keplerGl.foo`.

In case you create multiple kepler.gl instances using the same id, the kepler.gl state defined by the entry will be
overridden by the latest instance and reset to a blank state.


##### `mapboxApiAccessToken` (String, required)

- Default: `undefined`

You can create a free account at [www.mapbox.com](https://www.mapbox.com) and create a token at [www.mapbox.com/account/access-tokens](https://www.mapbox.com/account/access-tokens)

##### `getState` (Function, optional)

- Default: `state => state.keplerGl`

The path to the root keplerGl state in your reducer.

##### `width` (Number, optional)

- Default: `800`

Width of the KeplerGl UI.

##### `height` (Number, optional)

- Default: `800`

##### `appName` (String, optional)

- Default: `Kepler.Gl`

App name displayed in side panel header

##### `version` (String, optional)

- Default: `v1.0`

version displayed in side panel header

##### `onSaveMap` (Function, optional)

- Default: `() => {}`

Action called when click Save Map Url in side panel header.

##### `actions` (Object, optional)

- Default: `{}`

Actions payload creator to replace default kepler.gl action. Only use custom action when you want to modify action payload.

##### `mint` (Boolean, optional)

- Default: `true`

Whether to load a fresh empty state when component is mounted. when parse `mint: true` kepler.gl component will always load a fresh state when re-mount the same component, state inside this component will be destroyed once its unmounted.
By Parsing `mint: false` kepler.gl will keep the component state in the store even when it is unmounted, and use it as initial state when re-mounted again. This is useful when mounting kepler.gl in a modal, and keep the same map when re-open.

#### 3. Dispatch custom actions to `keplerGl` reducer.

One advantage of using the reducer over React component state to handle keplerGl state is the flexibility
to customize its behavior. If you only have one `KeplerGl` instance in your app or never intend to dispatch actions to KeplerGl from outside the component itself,
you don’t need to worry about forwarding dispatch and can move on to the next section. But life is full of customizations, and we want to make yours as enjoyable as possible.

There are multiple ways to dispatch actions to a specific `KeplerGl` instance.

- In the root reducer, with reducer updaters.

Each action is mapped to a reducer updater in kepler.gl. You can import the reducer updater corresponding to a specific action, and call it with the previous state and action payload to get the updated state.
e.g. `updateVisDataUpdater` is the updater for `ActionTypes.UPDATE_VIS_DATA` (take a look at each reducer `reducers/vis-state.js` for action to updater mapping).
Here is an example how you can listen to an app action `QUERY_SUCCESS` and call `updateVisDataUpdater` to load data into Kepler.Gl.
```js
import keplerGlReducer, {visStateUpdaters} from 'kepler.gl/reducers';

// Root Reducer
const reducers = combineReducers({
 keplerGl: keplerGlReducer,

 app: appReducer
});

const composedReducer = (state, action) => {
 switch (action.type) {
   case 'QUERY_SUCCESS':
     return {
       ...state,
       keplerGl: {
         ...state.keplerGl,

         // 'map' is the id of the keplerGl instance
         map: {
            ...state.keplerGl.map,
            visState: visStateUpdaters.updateVisDataUpdater(
              state.keplerGl.map.visState, {datasets: action.payload})
         }
       }
     };
 }
 return reducers(state, action);
};

export default composedReducer;
```

- Using redux `connect`

You can add a dispatch function to your component that dispatches actions to a specific `keplerGl` component,
using connect.


```js
// component
import KeplerGl from 'kepler.gl';

// action and forward dispatcher
import {toggleFullScreen, forwardTo} from 'kepler.gl/actions';
import {connect} from 'react-redux';

Const MapContainer = props => (
  <div>
    <button onClick=() => props.keplerGlDispatch(toggleFullScreen())/>
    <KeplerGl
      id="foo"
    />
  </div>
)

const mapStateToProps = state => state
const mapDispatchToProps = (dispatch, props) => ({
 dispatch,
 keplerGlDispatch: forwardTo(‘foo’, dispatch)
});

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(MapContainer);
```

- Wrap action payload

You can also simply wrap an action into a forward action with the `wrapTo` helper

```js
// component
import KeplerGl from 'kepler.gl';

// action and forward dispatcher
import {toggleFullScreen, wrapTo} from 'kepler.gl/actions';

// create a function to wrapper action payload to 'foo'
const wrapToMap = wrapTo('foo');
const MapContainer = ({dispatch}) => (
  <div>
    <button onClick=() => dispatch(wrapToMap(toggleFullScreen())/>
    <KeplerGl
      id="foo"
    />
  </div>
);

```

#### 4. Replace default components.
Everyone wants the flexibility to render custom kepler.gl componenents. Kepler.gl has a dependency injection system that allow you to inject
components to KeplerGl replacing existing ones. All you need to do is to create a component factory for the one you want to replace, import the original component factory
and call `injectComponents` at the root component of your app where `KeplerGl` is mounted.
Take a look at `examples/demo-app/src/app.js` and see how it renders a custom side panel header in kepler.gl

```js
import {injectComponents, PanelHeaderFactory} from 'kepler.gl/components';

// define custom header
const CustomHeader = () => (<div>My kepler.gl app</div>);
const myCustomHeaderFactory = () => CustomHeader;

// Inject custom header into Kepler.gl, replacing default
const KeplerGl = injectComponents([
  [PanelHeaderFactory, myCustomHeaderFactory]
]);

// render KeplerGl, it will render your custom header instead of the default
const MapContainer = () => (
  <div>
    <KeplerGl
      id="foo"
    />
  </div>
);

```

Using `withState` helper to add reducer state and actions to customized component as additional props.

```js
import {withState, injectComponents, PanelHeaderFactory} from 'kepler.gl/components';
import {visStateLens} from 'kepler.gl/reducers';

// custom action wrap to mounted instance
const addTodo = (text) => wrapTo('map', {
    type: 'ADD_TODO',
    text
});

// define custom header
const CustomHeader = ({visState, addTodo}) => (
  <div onClick={() => addTodo('hello')}>{`${Object.keys(visState.datasets).length} dataset loaded`}</div>
);

// now CustomHeader will receive `visState` and `addTodo` as additional props.
const myCustomHeaderFactory = () => withState(
  // keplerGl state lenses
  [visStateLens],
  // customMapStateToProps
  headerStateToProps,
  // actions
  {addTodo}
)(CustomHeader);

```
#### 5. How to add data to map
In order to interact with a kepler.gl instance and add new data to it, you can dispatch __`addDataToMap`__ action from anywhere inside your app. It adds dataset to kepler.gl instance and update the full configuration (mapState, mapStyle, visState).

Kepler.gl provides an easy API `KeplerGlSchema.getConfigToSave` to generate a json blob of the current kepler instance configuration.

The config object value will always have higher precedence than the options properties.
For instance, if you provide `{centerMap: true}` as part of the options object and in your config object you pass
the mapState configuration with latitude and longitude define,
the latter will be applied and the map view will be moved the defined coordinates.

Read more about [addDataToMap](./api-reference/actions/actions.md#adddatatomap)
