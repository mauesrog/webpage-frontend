import { ActionTypes } from '../actions';

const defualtProjects = {
  all: [],
  validated: false,
  message: '',
  error: null,
};

function passthrough(state) {
  console.log(state.message);
  return state;
}

function PostsReducer(state = defualtProjects, action) {
  switch (action.type) {
    case ActionTypes.FETCH_PROJECTS:
      if (action.payload) {
        return Object.assign({}, state, {
          projects: action.payload.projects,
          message: action.payload.message,
          validated: action.payload.validated,
          error: action.payload.error,
        });
      }

      return passthrough(state);

    default:
      return state;
  }
}

export default PostsReducer;
