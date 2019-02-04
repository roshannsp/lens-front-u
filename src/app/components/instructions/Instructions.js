import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import 'lodash'
import { BeatLoader } from 'react-spinners'

@inject('store')
@observer
class Instructions extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      instructions: [],
      loading: true
    }
  }

  componentDidMount = async () => {
    if (_.isEmpty(this.store.instruction.instructions)) {
      await this.store.instruction.get()
    }
  }

  renderInstructions() {
    const instructions = this.store.instruction.instructions
    return instructions.map((instruction, i) => {
      const post = encodeURIComponent(instruction)
      return (
        <iframe
          key={i}
          src={`https://www.facebook.com/plugins/post.php?href=${post}`}
          width="100%"
          height="653"
          style={{
            border: 'none',
            overflow: 'hidden',
            backgroundColor: 'white'
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
        {this.store.instruction.getInstructionsStatus === 'LOADING' && (
          <div className="products-clip-loader">
            <BeatLoader color={'#f2acc7'} loading={true} />
          </div>
        )}
        {this.renderInstructions()}
      </main>
    )
  }
}

Instructions.propTypes = {
  store: PropTypes.object
}

export default Instructions
