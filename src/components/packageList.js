import React, { useEffect, useState } from 'react';
import GenericTable from '../genericComponents/genericTable';
import GenericButton from '../genericComponents/genericButton';
import GenericModal from '../genericComponents/genericModal';
import { fetchPackages, deletePackage, findCustomerName, sortByShippingOrder, addPackage } from '../services/packageService';
import { useRef } from 'react';

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const packagesToShow = useRef([]);
  const [ascending, setAscending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const btn = <GenericButton label="&#43;" onClick={() => setIsModalOpen(true)} />
  const columns = ['Id', 'Weight', 'Customer Name', 'Price', btn]

  useEffect(() => {
    fetchData();
  }, [isDataFetched]);

  const fetchData = async () => {
    try {
      const data = await fetchPackages();
      const packagesData = data.packages;
      const updatedPackages = await Promise.all(packagesData.map(async p => ({
        ...p,
        customername: await findCustomerName(p.customerid)
      })));
      setPackages(updatedPackages);
      packagesToShow.current = sortByShippingOrder(updatedPackages);
      setIsDataFetched(true);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleDeletePackage = async (packageId) => {
    try {
      const updatedPackages = await deletePackage(packageId);
      setPackages(updatedPackages);
      packagesToShow.current = sortByShippingOrder(updatedPackages);
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleSortByShippingOrder = () => {
    packagesToShow.current = sortByShippingOrder(packagesToShow.current, ascending);
    setAscending(!ascending);
  };

  const handleAddPackage = async () => {
    try {
      const newPackageData = {
        id: document.getElementById('id').value,
        weight: document.getElementById('weight').value,
        customerid: document.getElementById('customerId').value,
        price: document.getElementById('price').value,
        shippingOrder: sortByShippingOrder(packages, false)[0].shippingOrder + 1
      };
      const updatedPackages = await addPackage(newPackageData);
      setPackages(updatedPackages);
      packagesToShow.current = sortByShippingOrder(updatedPackages);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding package:', error);
    }
  };

  const renderButtons = (rowData) => (
    <>
      <GenericButton label="Delete" onClick={() => handleDeletePackage(rowData.id)} />
      <GenericButton label="&#8597;" onClick={handleSortByShippingOrder} />
    </>
  );

  return (
    <div>
      <h2>Package List</h2>
      {isDataFetched && (
        <GenericTable
          columns={columns}
          data={packagesToShow.current}
          buttons={renderButtons}
        />
      )}
      <GenericModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Add New Package</h2>
        <input id="id" type="text" placeholder="Id" />
        <input id="weight" type="text" placeholder="Weight" />
        <input id='customerId' placeholder="Customer Id" />
        <input id='price' placeholder="Price" />
        <GenericButton label="Add" onClick={handleAddPackage} />
      </GenericModal>
    </div>
  );
};

export default PackageList;


