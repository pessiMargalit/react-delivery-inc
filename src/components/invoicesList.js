import React, { useState, useEffect } from 'react';
import { fetchInvoices, createInvoiceByCustomerId } from '../services/invoiceService';
import GenericTable from '../genericComponents/genericTable';
import { useLocation } from 'react-router-dom';
import '../style/invoiceStyle.css';
import { useRef } from 'react';

const InvoiceList = ({ location }) => {
  const columns = ['ID', 'Weight', 'Price'];
  const customer = useLocation();
  const [invoices, setInvoices] = useState([]);
  const isFetch = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let invoiceData;
        if (customer && customer.state && Array.isArray(customer.state.customer)) {
          invoiceData = await createInvoiceByCustomerId(customer.state.customer);
        }
        else {
          const data = await fetchInvoices();
          if (data) {
            invoiceData = data.invoices ? data.invoices : data;
          } else {
            console.error('Invalid or empty data format:', data);
            return;
          }
        }
        setInvoices(prevInvoices => [...prevInvoices, ...invoiceData]);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    if (!isFetch.current) {
      fetchData();
      isFetch.current = true;
    }
  }, [location, customer]);

  return (
    <div className="invoice-container">
      {invoices.length > 0 && invoices.map((invoice, index) => (
        <div key={index}>
          <div className="header">
            <div className="left-info">
              <div>Date: {invoice.date}</div>
              <div>Customer Name: {invoice.customername}</div>
            </div>
            <div className="right-info">
              <div id="InvoiceTitle">Invoice</div>
              <div> No. {invoice.id}</div>
            </div>
          </div>

          <GenericTable
            columns={columns}
            data={invoice.packages}

          />
          <div className="totals-summary">
            <div>Total Weight: {invoice.totalweight}</div>
            <div>Total: {invoice.totalprice}</div>
          </div>
          <div className="footer">
            <p>You received {invoice.packages.length} packages</p>
            <p>Thank you for using our services</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InvoiceList;
