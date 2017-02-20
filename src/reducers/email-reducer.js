import { ActionTypes } from '../actions';

const defualtEmail = {
  validated: false,
  message: '',
  error: null,
};

function passthrough(state) {
  console.log(state.message);
  return state;
}

function EmailReducer(state = defualtEmail, action) {
  console.log(action.payload);

  switch (action.type) {
    case ActionTypes.SEND_EMAIL:
      if (action.payload) {
        return Object.assign({}, state, {
          message: action.payload.message,
          validated: action.payload.validated,
          error: action.payload.error,
        });
      }

      return passthrough(state);

    case ActionTypes.STOP_WARNING:
      return Object.assign({}, state, {
        message: action.payload.message,
      });

    default:
      return state;
  }
}

export default EmailReducer;
