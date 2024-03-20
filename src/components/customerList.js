

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GenericTable from '../genericComponents/genericTable';
import GenericButton from '../genericComponents/genericButton';
import { fetchCustomers, deleteCustomer } from '../services/customerService';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const history = useHistory();
  const columns = ['Id', 'Name'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await fetchCustomers();
        setCustomers(customers);
        setDataFetched(true);

      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, [dataFetched]);

  const handleCreateInvoice = (customer) => {
    history.push({
      pathname: '/invoices',
      state: { customer: [customer] },
    });
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      const updatedCustomers = await deleteCustomer(customerId);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const renderButtons = (rowData, rowIndex) => (
    <>
      <GenericButton
        label="Create Invoice"
        onClick={() => handleCreateInvoice(rowData)}
      />
      <GenericButton
        label="Delete"
        onClick={() => handleDeleteCustomer(rowData.id)}
      />
    </>
  );

  return (
    <div>
      <h2>Customer List</h2>
      {dataFetched && customers && customers.length > 0 && (
        <GenericTable
          columns={columns}
          data={customers}
          buttons={renderButtons}
        />
      )}
    </div>
  );
};

export default CustomerList;
