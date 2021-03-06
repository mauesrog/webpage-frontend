import React, { Component } from 'react';
import { Link } from 'react-router';

const DARTMOUTH_SITE = 'http://dartmouth.edu/';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navClass: 'hidden',
      logoHeight: 180,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.onLogoOver = this.onLogoOver.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  onLogoOver(e) {
  }

  handleScroll(e) {
    let navClass;
    const logoHeight = 180 - e.srcElement.body.scrollTop * 0.8;

    if (e.srcElement.body.scrollTop >= 160) {
      navClass = 'normal';
    } else {
      if (e.srcElement.body.scrollTop >= 80) {
        navClass = 'half';
      } else {
        navClass = 'hidden';
      }
    }

    this.setState({ navClass, logoHeight });
  }

  render() {
    return (
      <div className="nav-bar">
        <div id="fake-nav" style={{ display: this.state.navClass === 'normal' ? 'none' : 'flex' }}>
          <i className={`fa fa-bars ${this.state.navClass}`} style={{
            left: 15 + 23 * (180 - this.state.logoHeight) / 180,
          }} aria-hidden="true" id="menu" onClick={this.props.toggleMenu}
          />
          <a id="dartmouth-logo" href={DARTMOUTH_SITE} onMouseOver={this.onLogoOver} target="_blank">
            <img src="./src/images/dartmouth.svg" style={{
              left: 20 * 180 / (this.state.logoHeight * 0.7),
              top: 30 * this.state.logoHeight / 180,
            }} height={this.state.logoHeight >= 0 ? `${this.state.logoHeight}px;` : '0px'} alt="Dartmouth"
            />
          </a>
          <ul className={this.state.navClass}>
            <li>
              <a href="#portfolio-placeholder">Portfolio</a>
            </li>
            <li>
              <a href="#contact-me-placeholder">Contact me</a>
            </li>
            <li>
              <a href={this.props.resumeUrl || '#'} target="_blank">Resume</a>
            </li>
            <li>
              <Link to="/">Mauricio Esquivel Rogel</Link>
            </li>
          </ul>
        </div>
        <nav className={this.state.navClass}>
          <i className="fa fa-bars" aria-hidden="true" id="menu" onClick={this.props.toggleMenu} />
          <ul>
            <li>
              <Link to={DARTMOUTH_SITE} target="_blank">
                <img src="./src/images/tree.svg" alt="Dartmouth" />
              </Link>
            </li>
            <li>
              <Link to="/">Mauricio Esquivel Rogel</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
