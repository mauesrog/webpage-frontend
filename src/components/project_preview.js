import React, { Component } from 'react';

class ProjectPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.getLogos = this.getLogos.bind(this);
    // this.getDescription = this.getDescription.bind(this);
  }

  getLogos() {
    return this.props.data.language.concat(this.props.data.technologies).map((el, i) => {
      const className = (el === 'java' || el === 'c') ? 'big' : 'normal';

      return <img src={`./src/logos/${el}.svg`} className={className} key={i} alt={el} />;
    });
  }

  demoButton() {
    if (this.props.data.url) {
      return <a id="demo-button" onClick={this.props.updateDemo} href="#demo-placeholder">Demo</a>;
    }

    return null;
  }

  extractSpecialString(s, tag) {
    const s1 = s.slice(0, s.indexOf(`<${tag}>`));
    const s2 = s.slice(s.indexOf(`</${tag}>`) + 4, s.length);
    const specialString = s.slice(s.indexOf(`<${tag}>`) + 3, s.indexOf(`</${tag}>`));

    return [s1, specialString, s2];
  }

  gitButton() {
    if (this.props.data.git) {
      return <a href={`https://github.com/mauesrog/${this.props.data.git}`} target="_blank" className="git"><i className="fa fa-github-square" aria-hidden="true" /></a>;
    }

    return null;
  }

  // getDescription() {
  //   let description = this.props.data.description;
  //   let parts = [this.props.data.description];
  //
  //   while (description.includes('<a>')) {
  //     parts = parts.slice(0, parts.length - 1).concat(this.extractSpecialString(description, 'a'));
  //     description = parts[parts.length - 1];
  //   }
  //
  //   if (parts.length > 1) {
  //     return <div> (
  //       return parts.map((el, i) => {
  //         if (i % 2 === 0) {
  //           return <p>{el}</p>;
  //         }
  //
  //         return <a>{el}</a>;
  //       });
  //     ) </div>;
  //   }
  //
  //   return <p>{this.props.data.description}</p>;
  // }

  render() {
    if (!this.props.data) {
      return <div id="project-preview" />;
    }

    return (
      <div id="project-preview">
        <h1>{this.props.data.title === 'Post-It App' ? 'Realtime Collaborative Post-It Note App' : this.props.data.title}</h1>
        <div>
          <div>
            <img src={`./src/images/${this.props.data.thumbnail}.png`} alt={this.props.data.url} />
            <div id="logos">{this.getLogos()}</div>
          </div>
          <div id="description">
            <div id="technical-data">
              <h3>{this.props.data.type}</h3>
              <h4>{this.props.data.date}</h4>
            </div>
            <p>{this.props.data.description}</p>
            <div id="buttons">
              {this.demoButton()}
              {this.gitButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectPreview;
