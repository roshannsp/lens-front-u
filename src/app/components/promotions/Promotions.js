import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import 'lodash'
import Loader from 'react-loader-spinner'

@inject('store')
@observer
class Promotions extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      promotions: [],
      loading: true,
    }
  }

  componentDidMount = async () => {
    if (_.isEmpty(this.store.promotion.promotions)) {
      await this.store.promotion.get()
    }
  }

  renderPromotions() {
    const promotions = this.store.promotion.promotions
    return promotions.map((promotion, i) => {
      const post = encodeURIComponent(promotion)
      return (
        <iframe
          key={i}
          src={`https://www.facebook.com/plugins/post.php?href=${post}`}
          width="100%"
          height="653"
          style={{
            border: 'none',
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
          scrolling="no"
          frameBorder="0"
          allowtransparency="false"
          allow="encrypted-media"
        />
      )
    })
  }

  render() {
    return (
      <main style={{ padding: '1rem 0' }}>
        {this.store.promotion.getPromotionsStatus === 'LOADING' && (
          <div className="products-clip-loader">
            <Loader
              type="ThreeDots"
              color="#f5f5f5"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}
        {this.renderPromotions()}
      </main>
    )
  }
}

Promotions.propTypes = {
  store: PropTypes.object,
}

export default Promotions
