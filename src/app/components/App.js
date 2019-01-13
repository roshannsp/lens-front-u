import React, { Component } from 'react'
import Header from './Header'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import BrandList from './BrandList'

@inject('store')
@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }

  componentDidMount = async () => {
    await this.store.brand.get()
  }

  render() {
    return (
      <main>
        <Header />
        <div className="container">
          <BrandList />
        </div>
      </main>
    )
  }
}

App.propTypes = {
  store: PropTypes.object
}

export default App
