import { session, useSession } from 'next-auth/client';
import { useContext } from 'react';
import Item from '../components/Item';
import { ShoppingCardContext } from '../context/ShoppingCardContext';
import style from '../styles/shopping.module.css';
import {loadStripe} from '@stripe/stripe-js';

const shopping = () => {
  const { shoppingCard, totalNet, totalTTC, handleShipingSelect } =
    useContext(ShoppingCardContext);
  const handleSelect = e => {
    let price = parseFloat(e.target.options[e.target.selectedIndex].value);
    handleShipingSelect(price);
  };
  const [session] = useSession();
  // create Checkout Session
  const stripePromise = loadStripe();
  const createCheckoutSession = () => {};
  return (
    <div className={style.shopping}>
      <h1 className={style.title}>Shopping cart</h1>
      <div className={style.shoppingCard}>
        <div>
          {shoppingCard.map(item => (
            <Item key={item.id} movie={item} />
          ))}
        </div>
        {shoppingCard.length > 0 && (
          <div className={style.total}>
            <div className={style.coupon}>
              <h3>Have coupon?</h3>
              <div>
                <input placeholder={'coupon code'} />
                <button>Applay</button>
              </div>
            </div>
            <div className={style.summary}>
              <div className={style.summaryInner}>
                <h3>summary</h3>
                <div>
                  <h3>movies : {shoppingCard.length}</h3>
                  <h3>${totalNet.toFixed(2)}</h3>
                </div>
                <div className={style.shippingMethode}>
                  <h3>shipping</h3>
                  <select
                    onChange={handleSelect}
                    className={style.shippingSelect}
                  >
                    <option value={0} className={style.shippingOption}>
                      free-shipping
                    </option>
                    <option value={5} className={style.shippingOption}>
                      standard-delivery-$5.00
                    </option>
                    <option value={20} className={style.shippingOption}>
                      fast-delivery-$20.00
                    </option>
                  </select>
                </div>
                <div className={style.totalPrice}>
                  <h3>total </h3>
                  <h3>${totalTTC.toFixed(2)}</h3>
                </div>
                <button
                  role='link'
                  onClick={createCheckoutSession}
                  className={style.checkout}
                  disabled={!session}
                >
                  {session ? 'checkout' : 'sign up first'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default shopping;
