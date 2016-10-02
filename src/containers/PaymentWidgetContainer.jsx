import { connect } from 'react-redux'
import { fetchDataset } from '../actions/datasetActions'
import PaymentWidget from '../components/payment/PaymentWidget'

const mapStateToProps = (state, props) => ({
  data: state.dataset
})

function mapDispatchToProps (dispatch) {
  return {
    fetchDataset: () => {
      dispatch(fetchDataset())
    }
  }
}

const PaymentWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentWidget)

export default PaymentWidgetContainer
