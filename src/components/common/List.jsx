import React, { PropTypes, Component } from 'react'
import Item from './Item'
import '../../styles/common.css'

class List extends Component {

  constructor (props) {
    super()
    this.props = props
  }

  render () {
    const { elements } = this.props
    return (
      <div>
        <div className="row list-content">
          {
            elements.map((item, itemIndex) =>
              <Item key={`${itemIndex}`} id={`${itemIndex}`}>{item}</Item>
            )
          }
        </div>
      </div>
    )
  }
}

List.propTypes = {
  elements: PropTypes.array
}

export default List
