import UseDataFetching from "../hooks/useDataFetching";
import { getPackagesByCustomerId } from "./packageService";

const fetchInvoices = async () => {
    try {
        const storedData = localStorage.getItem('invoices');
        if (storedData) {
            return JSON.parse(storedData);
        } else {
            const response = await UseDataFetching('/data/invoicesList.json');
            const data = await response.json();
            localStorage.setItem('invoices', JSON.stringify(data.invoices));
            localStorage.setItem('lastInvoiceIndex', 10)
            return data;
        }
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return [];
    }
};

const createInvoiceByCustomerId = async (customer) => {
    try {
        const invoiceId = parseInt(localStorage.getItem('lastInvoiceIndex'))+ 1;
        const packages = await getPackagesByCustomerId(customer[0].id);
        const customername = customer[0].name;
        const totalWeight = packages.reduce((accumulator, currentPackage) => {
            const weightNumeric = parseInt(currentPackage.weight);
            return accumulator + weightNumeric;
        }, 0);

        const totalPrice = packages.reduce((accumulator, currentPackage) => accumulator + currentPackage.price, 0);

        const invoiceData = [{
            id: invoiceId,
            date: new Date().toDateString(),
            customername: customername,
            packages: packages,
            totalweight: totalWeight + "kg",
            totalprice: totalPrice,
        }];
        let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
        if (!Array.isArray(invoices)) {
            invoices = [];
        }
        if (!invoices.includes(invoiceData[0])) {
            invoices.push(invoiceData[0]);
            localStorage.setItem('invoices', JSON.stringify(invoices));
            localStorage.setItem('lastInvoiceIndex', invoiceId)
        }
        return invoiceData;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }
};

export { createInvoiceByCustomerId, fetchInvoices };
