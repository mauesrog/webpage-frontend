import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div id="menu-wrapper">
        <div id="menu" className={this.props.toggled ? 'toggled' : 'normal'}>
          <a href="#portfolio-placeholder" onClick={this.props.toggleMenu}>Portfolio</a>
          <a href="#contact-me-placeholder" onClick={this.props.toggleMenu}>Contact me</a>
          <a href={this.props.resumeUrl || '#'} onClick={this.props.toggleMenu} target="_blank">Resume</a>
        </div>
      </div>
    );
  }
}

export default Menu;
