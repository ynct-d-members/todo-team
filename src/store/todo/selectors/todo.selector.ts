import { createSelector } from "@reduxjs/toolkit";

import { TodoState, adapter, featureKey } from "../states";

interface State {
  [featureKey]: TodoState;
}

const featureStateSelector = (state: State) => state[featureKey];

export const {
  selectAll: todosSelector,
  selectEntities: entitiesSelector,
} = adapter.getSelectors(featureStateSelector);

export const isFetchingSelector = createSelector(
  featureStateSelector,
  (state) => state.isFetching
);
