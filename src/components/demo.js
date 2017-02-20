import React, { Component } from 'react';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: null,
      pages: null,
    };

    this.renderDemo = this.renderDemo.bind(this);
  }

  onPdfCompleted(page, pages) {
    this.setState({ page, pages });
  }

  renderDemo() {
    if (!this.props.activeProject) {
      return null;
    }

    const url = this.props.activeProject.url.includes('http') ? this.props.activeProject.url : `https://www.youtube.com/embed/${this.props.activeProject.url}`;

    if (this.props.demoActive) {
      return (
        <div>
          <iframe width="854" height="480" src={url} className="front" />
          <a href="#portfolio-placeholder" >
            <i className="fa fa-times" onClick={this.props.closeDemo} />
          </a>
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div id="demo">{this.renderDemo()}</div>
    );
  }
}

export default Demo;
