import { createStore, Store, Action } from 'redux';

interface KitchenState {
  isPowerOn: boolean;
  isToasting: boolean;
}

const initialState: KitchenState = {
  isPowerOn: false,
  isToasting: false
};

interface TogglePowerAction extends Action {
  type: 'TOGGLE_POWER';
}

interface StartToastingAction extends Action {
  type: 'START_TOASTING';
}

interface CancelToastingAction extends Action {
  type: 'CANCEL_TOASTING';
}

type KitchenAction = TogglePowerAction | StartToastingAction | CancelToastingAction;

function reducer(state: KitchenState = initialState, action: KitchenAction): KitchenState {
  switch (action.type) {
    case 'TOGGLE_POWER':
      return { ...state, isPowerOn: !state.isPowerOn };
    case 'START_TOASTING':
      return { ...state, isToasting: true };
    case 'CANCEL_TOASTING':
      return { ...state, isToasting: false };
    default:
      return state;
  }
}

const store: Store<KitchenState, KitchenAction> = createStore(reducer);

export default store;
