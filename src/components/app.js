import React, { Component } from 'react';
import NavBar from './nav_bar';
import Menu from './menu';
import Portfolio from './portfolio';
import Contact from './contact';
import { connect } from 'react-redux';
import { getResumeUrl } from '../actions';

const mapStateToProps = (state) => (
  {
    resumeUrl: state.drive.url,
  }
);

// function based "dumb" component with no state
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuToggled: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.props.getResumeUrl();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    if (e.srcElement.body.scrollTop < 80 && this.state.menuToggled) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    this.setState({ menuToggled: !this.state.menuToggled });
  }

  render() {
    return (
      <div className="app">
        <NavBar toggleMenu={this.toggleMenu} resumeUrl={this.props.resumeUrl} />
        <Menu toggled={this.state.menuToggled} toggleMenu={this.toggleMenu} resumeUrl={this.props.resumeUrl} />
        <main>
          <div id="portfolio-placeholder" />
          <Portfolio />
          <Contact />
        </main>
      </div>
    );
  }
}


export default connect(mapStateToProps, { getResumeUrl })(App);
