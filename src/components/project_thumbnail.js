import React, { Component } from 'react';

class ProjectThumbnail extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    if (!this.props.project) {
      return <div className="project-thumbnail" />;
    }

    return (
      <div className="project-thumbnail" onClick={() => { this.props.updateActiveProject(this.props.id); }}>
        <h2>{this.props.project.title}</h2>
        <img src={`./src/images/${this.props.project.thumbnail}_small.png`} alt={this.props.project.url} />
      </div>
    );
  }
}

export default ProjectThumbnail;
