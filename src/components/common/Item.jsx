import React from 'react'

function Item (props) {
  return <div key={`item-${props.id}`} className="list-item">{props.children}</div>
}

Item.propTypes = {
  children: React.PropTypes.element,
  id: React.PropTypes.string
}

module.exports = Item
