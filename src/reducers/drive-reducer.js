import { ActionTypes } from '../actions';

const defualtDrive = { url: null, validated: null, error: null };

function passthrough(state) {
  return state;
}

function DriveReducer(state = defualtDrive, action) {
  switch (action.type) {
    case ActionTypes.GET_RESUME_URL:
      if (action.payload) {
        return Object.assign({}, state, {
          url: action.payload.url,
          validated: action.payload.validated,
          error: action.payload.error,
        });
      }

      return passthrough(state);

    default:
      return state;
  }
}

export default DriveReducer;
