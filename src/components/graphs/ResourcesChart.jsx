import React, { PropTypes, Component } from 'react'
import * as dc from 'dc'
import * as d3 from 'd3'
import crossfilter from 'crossfilter'
import '../../styles/resourcesChart.css'

class ResourcesChart extends Component {

  constructor (props) {
    super()
  }

  printChart () {
    const numberFormat = d3.format('.2f')
    const incidentChart = dc.barChart('#incident-chart')
    const homicideChart = dc.lineChart('#homicide-chart')
    function isTotalCrimeRateRecord (v) {
      return v.type === 'Total, all violations' && v.sub_type === 'Rate per 100,000 population'
    }
    function isTotalCrimeIncidentRecord (v) {
      return v.type === 'Total, all violations' && v.sub_type === 'Actual incidents'
    }
    function isViolentCrimeRateRecord (v) {
      return v.type === 'Total violent Criminal Code violations' &&
       v.sub_type === 'Rate per 100,000 population'
    }
    function isViolentCrimeIncidentRecord (v) {
      return v.type === 'Total violent Criminal Code violations' &&
       v.sub_type === 'Actual incidents'
    }
    function isHomicideRateRecord (v) {
      return v.type === 'Homicide' && v.sub_type === 'Rate per 100,000 population'
    }
    function isHomicideIncidentRecord (v) {
      return v.type === 'Homicide' && v.sub_type === 'Actual incidents'
    }
    d3.csv('../../data/crime.csv', (csv) => {
      const data = crossfilter(csv)
      const cities = data.dimension((d) => d.city)
      const totalCrimeRateByCity = cities.group().reduce(
              (p, v) => {
                if (isTotalCrimeRateRecord(v)) {
                  p.totalCrimeRecords++
                  p.totalCrimeRate += +v.number
                  p.avgTotalCrimeRate = p.totalCrimeRate / p.totalCrimeRecords
                }
                if (isViolentCrimeRateRecord(v)) {
                  p.violentCrimeRecords++
                  p.violentCrimeRate += +v.number
                  p.avgViolentCrimeRate = p.violentCrimeRate / p.violentCrimeRecords
                }
                p.violentCrimeRatio = p.avgViolentCrimeRate / p.avgTotalCrimeRate * 100
                return p
              },
              (p, v) => {
                if (isTotalCrimeRateRecord(v)) {
                  p.totalCrimeRecords--
                  p.totalCrimeRate -= +v.number
                  p.avgTotalCrimeRate = p.totalCrimeRate / p.totalCrimeRecords
                }
                if (isViolentCrimeRateRecord(v)) {
                  p.violentCrimeRecords--
                  p.violentCrimeRate -= +v.number
                  p.avgViolentCrimeRate = p.violentCrimeRate / p.violentCrimeRecords
                }
                p.violentCrimeRatio = p.avgViolentCrimeRate / p.avgTotalCrimeRate * 100
                return p
              },
              () => {
                return {
                  totalCrimeRecords: 0,
                  totalCrimeRate: 0,
                  avgTotalCrimeRate: 0,
                  violentCrimeRecords: 0,
                  violentCrimeRate: 0,
                  avgViolentCrimeRate: 0,
                  violentCrimeRatio: 0
                }
              }
      )
      const years = data.dimension((d) => d.year)
      const crimeIncidentByYear = years.group().reduce(
          (p, v) => {
              if (isTotalCrimeRateRecord(v)) {
                p.totalCrimeRecords++
                p.totalCrime += +v.number
                p.totalCrimeAvg = p.totalCrime / p.totalCrimeRecords
              }
              if (isViolentCrimeRateRecord(v)) {
                p.violentCrimeRecords++
                p.violentCrime += +v.number
                p.violentCrimeAvg = p.violentCrime / p.violentCrimeRecords
              }
              if(isHomicideIncidentRecord(v)){
                p.homicide += +v.number
              }
              p.nonViolentCrimeAvg = p.totalCrimeAvg - p.violentCrimeAvg
              return p
          },
          (p, v) => {
              if (isTotalCrimeRateRecord(v)) {
                p.totalCrimeRecords--
                p.totalCrime -= +v.number
                p.totalCrimeAvg = p.totalCrime / p.totalCrimeRecords
              }
              if (isViolentCrimeRateRecord(v)) {
                p.violentCrimeRecords--
                p.violentCrime -= +v.number
                p.violentCrimeAvg = p.violentCrime / p.violentCrimeRecords
              }
              if(isHomicideIncidentRecord(v)){
                p.homicide -= +v.number
              }
              p.nonViolentCrimeAvg = p.totalCrimeAvg - p.violentCrimeAvg
              return p
          },
          () => {
            return {
              totalCrimeRecords: 0,
              totalCrime: 0,
              totalCrimeAvg: 0,
              violentCrimeRecords: 0,
              violentCrime: 0,
              violentCrimeAvg: 0,
              homicide: 0,
              nonViolentCrimeAvg: 0
            }
          }
      )

      incidentChart
        .width(500)
        .height(200)
        .margins({ top: 40, right: 50, bottom: 30, left: 60 })
        .dimension(years)
        .group(crimeIncidentByYear, 'Non-Violent Crime')
        .valueAccessor((d) => d.value.nonViolentCrimeAvg)
       .stack(crimeIncidentByYear, 'Violent Crime', (d) => d.value.violentCrimeAvg)
       .x(d3.scaleLinear().domain([1997, 2012]))
       .renderHorizontalGridLines(true)
       .centerBar(true)
       .elasticY(true)
       .brushOn(false)
       .legend(dc.legend().x(250).y(10))
       .title((d) => `${d.key}
           \nViolent crime per 100k population: ${Math.round(d.value.violentCrimeAvg)}
           \nNon-Violent crime per 100k population: ${Math.round(d.value.nonViolentCrimeAvg)}`)
       .xAxis()
       .ticks(5)
       .tickFormat(d3.format('d'))

      homicideChart
         .width(500)
          .height(200)
          .renderArea(false)
          .margins({ top: 10, right: 50, bottom: 30, left: 60 })
          .dimension(years)
          .group(crimeIncidentByYear)
          .valueAccessor((d) => d.value.homicide)
          .x(d3.scaleLinear().domain([1997, 2012]))
          .renderHorizontalGridLines(true)
          .elasticY(true)
          .brushOn(true)
          .title((d) => `${d.key}\nHomicide incidents: ${Math.round(d.value.homicide)}`)
          .xAxis()
          .ticks(5)
          .tickFormat(d3.format('d'))
      dc.renderAll()
    })
  }

  render () {
    this.printChart()
    console.log('priiint')
    return (
      <div>
        <div id="incident-chart">
          <strong>Incidents by Year</strong>
          <div className="clearfix" />
        </div>
        <div id="homicide-chart">
          <strong>Crime Per 100K Population by Year</strong>
          <div className="clearfix" />
        </div>
      </div>
    )
  }
}

ResourcesChart.propTypes = {
  data: PropTypes.array,
  fetchDataset: PropTypes.func
}

module.exports = ResourcesChart
