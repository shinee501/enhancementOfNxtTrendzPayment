import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total}
              /-
            </h1>

            <p className="total-items">{cartList.length} Items in cart</p>

            <Popup
              modal
              trigger={
                <button type="button" className="checkout-button">
                  Checkout
                </button>
              }
            >
              {close => (
                <div className="payment-popup">
                  <h1>Select Payment Method</h1>

                  <div>
                    <input type="radio" id="card" name="payment" disabled />
                    <label htmlFor="card">Card</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="netBanking"
                      name="payment"
                      disabled
                    />
                    <label htmlFor="netBanking">Net Banking</label>
                  </div>

                  <div>
                    <input type="radio" id="upi" name="payment" disabled />
                    <label htmlFor="upi">UPI</label>
                  </div>

                  <div>
                    <input type="radio" id="wallet" name="payment" disabled />
                    <label htmlFor="wallet">Wallet</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={event => setPaymentMethod(event.target.value)}
                    />
                    <label htmlFor="cod">Cash on Delivery</label>
                  </div>

                  <p>Total Items: {cartList.length}</p>

                  <p>Total Amount: Rs {total}/-</p>

                  {orderPlaced ? (
                    <p>Your order has been placed successfully</p>
                  ) : (
                    <button
                      type="button"
                      disabled={paymentMethod !== 'COD'}
                      onClick={() => setOrderPlaced(true)}
                    >
                      Confirm Order
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('')
                      setOrderPlaced(false)
                      close()
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
