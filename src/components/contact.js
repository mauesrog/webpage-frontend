import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendEmail, stopWarning } from '../actions';


const formData = ['name', 'email', 'message'];

const mapStateToProps = (state) => (
  {
    warningMessage: state.email.message,
  }
);

function what(state) {
  return mapStateToProps(state);
}

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formClass: 'normal',
      name: 'normal',
      email: 'normal',
      message: 'normal',
      nameData: '',
      emailData: '',
      messageData: '',
      warningMessage: '',
      submitEnabled: false,
    };

    this.toggleFocus = this.toggleFocus.bind(this);
    this.submit = this.submit.bind(this);
    this.activateWarning = this.activateWarning.bind(this);
  }

  componentWillReceiveProps(props) {
    console.log('props');
    if (props.warningMessage) {
      this.activateWarning(props.warningMessage);
    }
  }

  activateWarning(warningMessage) {
    window.setTimeout(() => {
      this.setState({ submitEnabled: true });
      this.props.stopWarning();
    }, 3000);
  }

  toggleFocus(id) {
    const state = {};

    if (id !== null) {
      state[id] = 'focus';
    }

    for (const key of Object.keys(this.state)) {
      if (!(key === id || key === 'formClass' || key === 'warningMessage' || key.includes('Data'))) {
        state[key] = 'normal';
      }
    }

    this.setState(state);
  }

  submit(e) {
    e.preventDefault();

    this.props.sendEmail({
      name: this.state.nameData,
      email: this.state.emailData,
      content: this.state.messageData,
    });

    this.setState({ submitEnabled: false });
  }

  formChange(v, i) {
    const state = {};
    let submitEnabled = null;

    state[`${formData[i]}Data`] = v;

    if (v.trim().length) {
      for (const key of Object.keys(this.state)) {
        if (key.includes('Data') && key !== `${formData[i]}Data`) {
          if (!this.state[key].trim().length) {
            console.log(key);
            submitEnabled = false;
            break;
          }
        }
      }

      state.submitEnabled = submitEnabled === null;
    } else {
      state.submitEnabled = false;
    }

    this.setState(state);
  }

  render() {
    return (
      <div id="contact-me-wrapper">
        <div id="contact-me-placeholder" />
        <h1 id="contact-me-heading">Contact me</h1>
        <div id="warning" className={this.props.warningMessage ? 'success' : 'none'}>
          <p>{this.props.warningMessage}</p>
        </div>
        <form className={this.state.formClass} onSubmit={this.submit}>
          <h3 className={this.state.name}>NAME</h3>
          <input type="text" name="name"
            onChange={(e) => { this.formChange(e.target.value, 0); }}
            onFocus={(e) => { this.toggleFocus(e.target.name); }}
            onBlur={(e) => { this.toggleFocus(null); }}
            value={this.state.nameData}
          />
          <h3 className={this.state.email}>EMAIL</h3>
          <input type="email" name="email"
            onChange={(e) => { this.formChange(e.target.value, 1); }}
            onFocus={(e) => { this.toggleFocus(e.target.name); }}
            onBlur={(e) => { this.toggleFocus(null); }}
            value={this.state.emailData}
          />
          <h3 className={this.state.message}>MESSAGE</h3>
          <textarea name="message" name="message"
            onChange={(e) => { this.formChange(e.target.value, 2); }}
            onFocus={(e) => { this.toggleFocus(e.target.name); }}
            onBlur={(e) => { this.toggleFocus(null); }}
            value={this.state.messageData}
          />
          <input type="submit" value="Send email" disabled={!this.state.submitEnabled} />
        </form>
        <div id="social-networks" >
          <a href="https://www.linkedin.com/in/mauricio-esquivel-rogel" target="_blank">
            <i className="fa fa-linkedin-square" aria-hidden="true" />
          </a>
          <a href="https://github.com/mauesrog" target="_blank">
            <i className="fa fa-github-square" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }
}

export default connect(what, { sendEmail, stopWarning })(Menu);
