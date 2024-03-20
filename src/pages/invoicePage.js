import React from 'react';
import InvoiceList from '../components/invoicesList';

const InvoicePage = ({ invoices }) => {
    return (<>
        <InvoiceList invoices={invoices} />
    </>
    );
};

export default InvoicePage;
