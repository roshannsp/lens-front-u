import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import 'lodash'
import Loader from 'react-loader-spinner'

@inject('store')
@observer
class Reviews extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      reviews: [],
      loading: true,
    }
  }

  componentDidMount = async () => {
    if (_.isEmpty(this.store.review.reviews)) {
      await this.store.review.get()
    }
  }

  renderReviews() {
    const reviews = this.store.review.reviews
    return reviews.map((review, i) => {
      const post = encodeURIComponent(review)
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
        {this.store.review.getReviewsStatus === 'LOADING' && (
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
        {this.renderReviews()}
      </main>
    )
  }
}

Reviews.propTypes = {
  store: PropTypes.object,
}

export default Reviews
