import axios from 'axios';

const ROOT_URL = 'https://mauricioesquivelrogel.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

export const ActionTypes = {
  FETCH_PROJECTS: 'FETCH_PROJECTS',
  SEND_EMAIL: 'SEND_EMAIL',
  STOP_WARNING: 'STOP_WARNING',
  GET_RESUME_URL: 'GET_RESUME_URL',
};

// POST ACTIONS

export function fetchProjects() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/projects`)
    .then(response => {
      const payload = {
        projects: [],
        message: '',
        validated: false,
        error: null,
      };

      if (!response.data.projects[0]) {
        payload.message = 'No projects available';
      } else {
        payload.message = 'Projects okay';
        payload.projects = response.data.projects;
        payload.validated = true;
      }

      dispatch({ type: ActionTypes.FETCH_PROJECTS, payload });
    })
    .catch(error => {
      console.log(error);
    });
  };
}

export function sendEmail(data) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/contact`, data)
    .then(response => {
      console.log(response);
      const payload = {
        message: response.data.message,
        validated: true,
        error: null,
      };

      dispatch({ type: ActionTypes.SEND_EMAIL, payload });
    })
    .catch(error => {
      console.log(error);
    });
  };
}

export function stopWarning() {
  return (dispatch) => {
    const payload = {
      message: '',
    };

    dispatch({ type: ActionTypes.SEND_EMAIL, payload });
  };
}

export function getResumeUrl() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/drive`)
    .then(response => {
      const payload = {
        url: response.data.url,
        validated: true,
        error: null,
      };

      dispatch({ type: ActionTypes.GET_RESUME_URL, payload });
    })
    .catch(error => {
      console.log(error);
    });
  };
}
