import React, { Component } from 'react';

import ProjectPreview from './project_preview.js';
import ProjectThumbnails from './project_thumbnails';
import Demo from './demo';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions';

const mapStateToProps = (state) => (
  {
    projects: state.projects.projects,
    validated: state.projects.validated,
    message: state.projects.message,
    updated: state.projects.updated,
  }
);

class Portfolio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeProject: null,
      portwrapper: 'unactive',
      demoDummy: 'unactive',
    };

    this.getProjects = this.getProjects.bind(this);
    this.updateActiveProject = this.updateActiveProject.bind(this);
    this.updateDemo = this.updateDemo.bind(this);
    this.closeDemo = this.closeDemo.bind(this);
  }

  componentWillReceiveProps(props) {
    if (!this.state.projects && props.projects) {
      this.setState({ activeProject: props.projects[0] });
    }
  }

  getProjects(offset) {
    if (this.props.projects == null) {
      this.props.fetchProjects();
      return null;
    }

    const DATA = this.props.projects;

    const firstHalf = DATA.slice(DATA.length - 1 - offset, DATA.length);

    return firstHalf.concat(DATA.slice(0, DATA.length - 1 - offset));
  }

  updateActiveProject(i) {
    const activeProject = this.props.projects[i];

    this.setState({ activeProject });
  }

  updateDemo() {
    const portwrapper = 'active';
    const demoDummy = this.state.portwrapper === 'active' ? 'active' : 'unactive';

    this.setState({ portwrapper, demoDummy });
  }

  closeDemo() {
    const portwrapper = 'unactive';
    const demoDummy = 'unactive';

    this.setState({ portwrapper, demoDummy });
  }

  render() {
    return (
      <div id="portfolio-wrapper" className={this.state.portwrapper}>
        <h1 id="portfolio-heading">Portfolio</h1>
        <div id="portfolio">
          <ProjectPreview data={this.state.activeProject} updateDemo={this.updateDemo} />
          <ProjectThumbnails projects={this.getProjects} leftOffset={this.state.leftOffset} updateActiveProject={this.updateActiveProject} />
        </div>
        <div id="demo-placeholder" className={this.state.demoDummy} />
        <Demo activeProject={this.state.activeProject} demoActive={this.state.portwrapper === 'active'} closeDemo={this.closeDemo} />
      </div>
    );
  }
}

export default connect(mapStateToProps, { fetchProjects })(Portfolio);
