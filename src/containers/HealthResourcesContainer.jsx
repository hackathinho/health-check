import { connect } from 'react-redux'
import { fetchDataset } from '../actions/datasetActions'
import ResourcesChart from '../components/graphs/ResourcesChart'

const mapStateToProps = (state, props) => ({
  data: [
    {
      1995: {
        coruña: {
          camas_instaladas: 120,
          camas_funcionando: 100
        }
      }
    },
    {
      1996: {
        lugo: {
          camas_instaladas: 80,
          camas_funcionando: 40
        }
      }
    }
  ]
})

function mapDispatchToProps (dispatch) {
  return {
    fetchDataset: () => {
      dispatch(fetchDataset())
    }
  }
}

const HealthResourcesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourcesChart)

export default HealthResourcesContainer
