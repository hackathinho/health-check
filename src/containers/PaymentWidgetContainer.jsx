import * as d3 from 'd3'
import { connect } from 'react-redux'
import { fetchDataset } from '../actions/datasetActions'
import PaymentWidget from '../components/payment/PaymentWidget'

/**
 * Returns an object list with categories and mean of all payments for each category
 * using getValue() property
 */
function classifyListByCategory (paymentsList, categories, getKey, getValue) {
  const groupsMap = new Map()
  categories.map((group) => groupsMap.set(group, []))
  paymentsList.map((payment) => {
    if (getValue(payment) != null) {
      const key = getKey(payment)
      const groupElements = groupsMap.get(key)
      groupElements.push(getValue(payment))
      groupsMap.set(key, groupElements)
    }
    return payment
  })
  const result = []
  groupsMap.forEach((groupElements, groupKey) => result.push({
    name: groupKey,
    mean: d3.mean(groupElements)
  }))
  return result
}

const mapStateToProps = (state, props) => ({
  data: classifyListByCategory(state.dataset, ['04001', '04002', '04003', '04004',
  '04005', '04006', '04007', '04008', '04009'], (e) => e.paymentPostCode, (e) => e.amount)
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
