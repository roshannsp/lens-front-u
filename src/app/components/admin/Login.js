import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import 'babel-polyfill'

@inject('store')
@observer
class Admin extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.enterFunction = this.enterFunction.bind(this)
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.enterFunction, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.enterFunction, false)
  }

  enterFunction(event) {
    if (event.keyCode === 13) {
      this.login()
    }
  }

  handleInputChange(event) {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  async login() {
    await this.store.user.login(this.state.username, this.state.password)
    if (!this.store.user.isLogedIn) {
      alert('Login failed')
    }
  }

  render() {
    const isLogedIn = this.store.user.isLogedIn
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-light">Login</h3>
              <p className="subtitle has-text-light">
                Please login to proceed.
              </p>
              <div className="box">
                <div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="text"
                        placeholder="Username"
                        autoFocus=""
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <button
                    className="button is-block is-info is-large is-fullwidth"
                    onClick={this.login}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Admin.propTypes = {
  store: PropTypes.object
}

export default Admin
