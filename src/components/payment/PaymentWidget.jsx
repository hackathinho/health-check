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
      .attr('class', 'col-md-2')
      .style('height', (d) => 0)
      .style('margin-top', (d) => '500px')
      .html((d) => {
        const amount = d.mean != null ? Math.round(d.mean * 100) / 100 : 0
        return `<p><b>${amount} €</b></p><p class="title">${d.name}</p>`
      })
      .transition()
      .delay((d, i) => i * 50)
      .duration(200)
      .style('height', (d) => {
        const amount = d.mean != null ? parseFloat(d.mean) : 0
        let value = scalingFunction(scalingFunction(amount))
        if (value == null || isNaN(value)) {
          value = 0
        }
        return `${value}px`
      })
      .style('margin-top', (d) => {
        const amount = d.mean != null ? parseFloat(d.mean) : 0
        let value = scalingFunction(scalingFunction(amount))
        if (value == null || isNaN(value) || value === 0) {
          value = 494
        } else {
          value = 500 - value
        }
        return `${value}px`
      })
  }

  render () {
    const { data, fetchDataset } = this.props
    this.printChart(data)
    return (
      <div>
        <p><Button bsStyle="success" onClick={fetchDataset}>Fetch data</Button></p>
        <br />
        <h4><b>Consumos medios</b></h4>
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
