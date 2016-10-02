import React, { PropTypes, Component } from 'react'
import { Label } from 'react-bootstrap'

class Payment extends Component {

  constructor (props) {
    super()
  }

  render () {
    const { clientPostCode, paymentPostCode, sector, date, hours, amount,
      operationsNumber } = this.props.values
    return (
      <div>
        <p>
          <Label>{sector}</Label> {paymentPostCode} -> {amount} €
        </p>
        <p>{date} / {hours}</p>
        <p>Client: {clientPostCode} - {operationsNumber}</p>
      </div>
    )
  }
}

Payment.propTypes = {
  values: PropTypes.object
}

module.exports = Payment
