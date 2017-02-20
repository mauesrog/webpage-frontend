import React, { Component } from 'react';
import ProjectThumbnail from './project_thumbnail';

class ProjectThumbnails extends Component {
  constructor(props) {
    super(props);

    const projects = this.props.projects(0);
    const offset = projects || 0;

    this.state = {
      marginRight: 570,
      marginLeft: 0,
      offset,
    };

    this.getProjectThumbnails = this.getProjectThumbnails.bind(this);
    this.nav = this.nav.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.state.offset === 0 && props.projects) {
      this.setState({ offset: props.projects.length });
    }
  }

  getProjectThumbnails(offset) {
    const projects = this.props.projects(offset);

    if (!projects) {
      return null;
    }

    return projects.map((el, i, a) => {
      const id = (i - 1 + (a.length - offset)) % a.length;
      return <ProjectThumbnail key={i} id={id < 0 ? a.length + id : id} project={el} updateActiveProject={this.props.updateActiveProject} />;
    });
  }

  nav(right) {
    let offset = right ? this.state.offset - 1 : this.state.offset + 1;

    if (offset === 0 || offset === 12) {
      offset = 6;
    }

    this.setState({ offset });
  }

  render() {
    return (
      <div id="project-thumbnails">
        <div id="left-button" className="nav-button" onClick={e => { this.nav(false); }} >
          <i className="fa fa-arrow-left" aria-hidden="true" />
        </div>
        <div id="thumbnails">{this.getProjectThumbnails(this.state.offset)}</div>
        <div id="right-button" className="nav-button" onClick={e => { this.nav(true); }} >
          <i className="fa fa-arrow-right" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

export default ProjectThumbnails;
