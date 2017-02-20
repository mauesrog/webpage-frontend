import { combineReducers } from 'redux';

import ProjectsReducer from './projects-reducer';
import EmailsReducer from './email-reducer';
import DriveReducer from './drive-reducer';

const rootReducer = combineReducers({
  projects: ProjectsReducer,
  email: EmailsReducer,
  drive: DriveReducer,
});

export default rootReducer;
