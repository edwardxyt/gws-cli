import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteInvoice, getInvoiceById } from '../data';

export default function Invoice() {
  let navigate = useNavigate();
  let params = useParams();
  let invoice = getInvoiceById(parseInt(params.id, 10));
  return (
    <main style={{ padding: '1rem' }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button
          onClick={() => {
            deleteInvoice(invoice.number);
            navigate('/list');
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
