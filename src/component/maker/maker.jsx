import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardAddForm from 'component/card_add_form/card_add_form';
import OrderCard from 'component/order_card/order_card';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, cardRepository }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateState = location.state;
  const [orders, setOrders] = useState({});
  const [userId, setUserId] = useState(navigateState && navigateState.id);
  const [userName, setUserName] = useState();
  const [open, setOpen] = useState(false);

  const onLogout = e => {
    authService.logout();
  };
  const createOrUpdateOrder = order => {
    setOrders(orders => {
      const updated = { ...orders };
      updated[order.id] = order;
      return updated;
    });
    cardRepository.saveCard(userId, order);
  };
  const deleteOrder = order => {
    setOrders(orders => {
      const updated = { ...orders };
      delete updated[order.id];
      return updated;
    });
    cardRepository.removeCard(userId, order);
  };
  const toggleOpen = () => {
    setOpen(open => !open);
  };
  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setUserName(user.displayName);
        setUserId(user.uid);
      } else {
        navigate('/login');
      }
    });
  });
  useEffect(() => {
    if (!userId) return;
    const stopSync = cardRepository.syncCards(userId, cards =>
      setOrders(cards)
    );
    return () => stopSync();
  }, [cardRepository, userId]);

  return (
    <div className={styles.maker}>
      <Header userName={userName} onLogout={onLogout} />
      <section className={styles.orders}>
        <div className={styles.addForm}>
          {!open && (
            <button className={styles.addOpenBtn} onClick={toggleOpen}>
              Add Order Card
            </button>
          )}
          {open && (
            <>
              <h2>Add Order Card</h2>
              <div className={open ? styles.open : styles.close}>
                <CardAddForm
                  FileInput={FileInput}
                  addOrder={createOrUpdateOrder}
                />
              </div>
              <button className={styles.addCloseBtn} onClick={toggleOpen}>
                <FontAwesomeIcon icon={faSortUp} />
              </button>
            </>
          )}
        </div>
        <ul className={styles.cards}>
          {Object.keys(orders).map(key => (
            <OrderCard
              key={key}
              FileInput={FileInput}
              order={orders[key]}
              createOrUpdateOrder={createOrUpdateOrder}
              deleteOrder={deleteOrder}
            />
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
};

export default Maker;
