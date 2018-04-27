## Reducer
...Comoing soon

Root Reducer -> Core Reducer -> Subreducer


## Root Reducer

## Local Reducer

Each kepler.gl instance state is stored in a local reduccer. A local reducer has 4 sub reducers. __`visState`__, __`mapState`__, __`mapStyle`__ and __`uiState`__. Each of them managers a piece of state that is mostly self contained.
- __visState__ - Manages all visualization related, including datasets, layers, filters and interaction configs. Some of the key updaters are `updateVisDataUpdater`,  `layerConfigChangeUpdater`, `setFilterUpdater`, `interactionConfigChangeUpdater`.

- __mapState__ - Manages base map behavior including the viewport, drag rotate and toggle split maps. Key updates are `updateMapUpdater`, `toggleSplitMapUpdater` and `togglePerspectiveUpdater`.

- __mapStyle__ - Managers base map style, including setting base map style, toggling base map layers and adding custom base map style.

- __uiState__ - Managers all UI component transition state, including open / close side panel, current displayed panel etc. Note, ui state reducer is the only reducer that’s not saved in kepler.gl schema.


## Subreducer

The subreducers - __`visState`__, __`mapState`__, __`mapStyle`__ and __`uiState`__ - in are assembled by a list of action handlers, each handler mapped to a state transition function named xxUpdater. User can import a specific action handler in their root reducer and use it to directly modify kepler.gl’s state (without dispathcing a kepler.gl action). This will give user the full control over kepler.gl’s component state.

Each subreducer in kepler.gl is constructed with a set of updaters and an action handler. For instance, here is a snippet of the map state reducer in kepler.gl:

```js
// reducers/map-state.js
import {
 fitBoundsUpdater,
 receiveMapConfigUpdater,
 togglePerspectiveUpdater
} from './map-state-updaters';

/* Action Handlers */
const actionHandler = {
 [ActionTypes.UPDATE_MAP]: updateMapUpdater,
 [ActionTypes.FIT_BOUNDS]: fitBoundsUpdater,
 [ActionTypes.TOGGLE_PERSPECTIVE]: togglePerspectiveUpdater
};

/* Reducer */
export const mapStateReducerFactory = (initialState = {}) => handleActions(
 actionHandler,
 {...INITIAL_MAP_STATE, ...initialState, initialState}
);
```
