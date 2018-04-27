## Outline

-  [Overview](1)
-  [Basic Usage](./basic-usage.md)
-  [Advanced Usage](./advanced-usage.md)
-  [API]()
  1. Components
  2. Reducers
  3. Actions and Updaters
  4. Utilities
  5. Schemas

## Overview

Kepler.gl is a __Redux-connected__ component.  The library includes the UI components, a redux reducer, action handlers, and a set of utility functions. User simply needs to import the Kepler.gl UI component and mount the Kepler.gl reducer in their root reducer.

## Component
The Kepler.gl UI component will call redux connect under the hood, and dispatch to the corresponding reducer instance.

To allow mounting of multiple instance of kepler.gl components in the same app, we implemented a local selector with forward dispatch system. The local selector will pass down the knowledge where the state of this instance lives, and the forward dispatch system will pass down a dispatch function that knows to dispatch action to the correct reducer instance. __Each kepler.gl component instance needs to have an unique id__.

## Reducer and Action Forwarding

The kepler.gl root reducer that user mounted in their app is in fact a wrapper reducer that stored the child state and update them based on forwarded actions. If An action is not a forwarded action, it pass down to all child reducers.

When a KeplerGl component instance is mounted with the id `foo`, the wrapper reducer will  add a kepler.gl local state in the root state at key `foo`.

One of the biggest challenge of using local state is to dispatch actions that only modify a specific local state. For instance, if we have 2 kepler.gl components in our app, one with id `foo` other with id `bar`. Our keplerGl reducer is going to be `keplerGl: {foo: …, bar …}`. When foo dispatches an action, it only needs to update the state of foo, we need a way to decorate the action that the root reducer only pass it down to subreducer `foo`.

To solve this, kepler.gl has a forward dispatching system. It consists of a set of forward functions including `wrapTo`, `forwardTo` and `unwrap`.   `wrapTo` wraps an action payload into an forward action by adding an address `_addr_` and a `_forward_` signature to its meta.

Each kepler.gl component receives a forward dispatcher as a prop, which dispatchs a forwarded action to the root reducer. The root reducer will check if the given action has that address and if so, unwrap the action and pass it to the child reducer.

## Actions and Updaters
The reducer in kepler.gl is assembled by a list of action handlers, each handler mapped to a state transition function named `xxUpdater`. The idea is user can import a specific action handler in their root reducer and use it to directly modify kepler.gl’s state. This will give user the full control over kepler.gl’s component state.

Each subreducer in kepler.gl is constructed with a set of updaters. For instance, here is a snippet of the map state reducer in kepler.gl.

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

