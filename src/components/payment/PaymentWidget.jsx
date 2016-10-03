import React, { PropTypes, Component } from 'react'
import * as d3 from 'd3'
import { Button } from 'react-bootstrap'
import Payment from './Payment'
import '../../styles/paymentWidget.css'

class PaymentWidget extends Component {

  constructor (props) {
    super()
  }

  getDataList () {
    const { data } = this.props
    return data.map((item, index) => <Payment key={index} values={item}>{item.sector} </Payment>)
  }

  printChart (data) {
    const scalingFunction = d3.scaleLinear().domain([0, 200]).range([0, 300])
    d3.select('.chart')
      .selectAll('div')
        .data(data)
    .enter()
      .append('div')
      .style('width', (d) => {
        const amount = d.mean != null ? parseFloat(d.mean) : 0
        let value = scalingFunction(scalingFunction(amount))
        if (value == null || isNaN(value)) {
          value = 0
        }
        return `${value}px`
      })
      .text((d) => {
        const amount = d.mean != null ? Math.round(d.mean * 100) / 100 : 0
        return `${d.name} - ${amount} €`
      })
  }

  render () {
    const { data, fetchDataset } = this.props
    this.printChart(data)
    return (
      <div>
        <h4><b>Data</b></h4>
        <p><Button bsStyle="success" onClick={fetchDataset}>Fetch data</Button></p>
        <div className="chart" />
      </div>
    )
  }
}

PaymentWidget.propTypes = {
  data: PropTypes.array,
  fetchDataset: PropTypes.func
}

module.exports = PaymentWidget
