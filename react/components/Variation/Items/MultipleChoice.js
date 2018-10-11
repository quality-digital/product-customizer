import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NumericStepper from 'vtex.styleguide/NumericStepper'
import ProductPrice from 'vtex.store-components/ProductPrice'

class MultipleChoice extends Component {
  static propTypes = {
    /* Index to define the chossed amount */
    index: PropTypes.string,
    /* Object that handle the choosed amount of variations */
    choosedAmount: PropTypes.object,
    /* Min limit of selections */
    minTotalItems: PropTypes.number,
    /* Max limit of selections */
    maxTotalItems: PropTypes.number,
    /* Trigger function to handle changes on inputs  */
    onVariationChange: PropTypes.func,
    /* Item to populate component data   */
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }

  handleChoosedAmount = async e => {
    e.preventDefault()

    const choosedAmount = e.value
    const {
      item,
      index,
      onVariationChange,
    } = this.props

    await this.setState({ choosedAmount })

    onVariationChange({ index, variation: item, quantity: choosedAmount })
  }

  /**
  * render
  * Render the current component.
  * @return <Component> MultipleChoice
  */
  render() {
    const {
      item,
      index,
      choosedAmount,
    } = this.props

    const price = parseFloat(item.price / 100).toFixed(2)

    return (
      <div className="vtex-product-customizer__multiple-choice w-100 flex justify-between items-center pointer">
        <div className="flex align-center">
          <img src={item.image} width="72" height="100%" />
          <div className="multiple-choice__title w-100 flex flex-column justify-center pa5">
            <div className="multiple-choice__name">{item.name}</div>
            <div className="multiple-choice__price">
              <ProductPrice
                showLabels={false}
                showListPrice={false}
                sellingPrice={price}
                listPrice={price}
              />
            </div>
          </div>
        </div>
        <div className="multiple-choice__actions near-black tc">
          <NumericStepper
            value={choosedAmount[index]}
            minItems={parseInt(item.minQuantity)}
            maxValue={parseInt(item.maxQuantity)}
            onChange={this.handleChoosedAmount}
          />
        </div>
      </div>
    )
  }
}

export default MultipleChoice