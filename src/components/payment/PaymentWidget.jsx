import React, { PropTypes, Component } from 'react'
import * as d3 from 'd3'
import { Button } from 'react-bootstrap'
import '../../styles/event-page.css'
import Payment from './Payment'
import '../../styles/paymentWidget.css'

class PaymentWidget extends Component {

  constructor (props) {
    super()
  }

  getData () {
    const { data } = this.props
    this.printChart(this.filterData(data))
    return data.map((item, index) => <Payment key={index} values={item}>{item.sector} </Payment>)
  }

  filterData (data) {
    return data.filter((d) => d.amount != null)
  }

  printChart (data) {
    const scalingFunction = d3.scaleLinear().domain([0, 200]).range([0, 300])
    d3.select('.chart')
      .selectAll('div')
        .data(data)
    .enter()
      .append('div')
      .style('width', (d) => {
        let value = scalingFunction(scalingFunction(parseFloat(d.amount)))
        if (value == null || isNaN(value)) {
          value = 0
        }
        return `${value}px`
      })
      .text((d) => d.amount)
  }

  render () {
    const { fetchDataset } = this.props
    return (
      <div>
        <h4><b>Data</b></h4>
        {this.getData()}
        <p>-------</p>
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
