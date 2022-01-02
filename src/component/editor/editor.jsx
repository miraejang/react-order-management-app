import React from 'react';
import CardAddForm from '../card_add_form/card_add_form';
import CardEditForm from '../card_edit_form/card_edit_form';
import styles from './editor.module.css';

const Editor = ({ orders, createOrUpdateOrder, deleteOrder }) => (
  <div className={styles.editor}>
    {Object.keys(orders).map(key => (
      <CardEditForm
        key={key}
        order={orders[key]}
        updateOrder={createOrUpdateOrder}
        deleteOrder={deleteOrder}
      />
    ))}
    <CardAddForm addOrder={createOrUpdateOrder} />
  </div>
);

export default Editor;
