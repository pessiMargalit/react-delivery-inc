
import UseDataFetching from "../hooks/useDataFetching";
import { getCustomerById } from "./customerService";

const fetchPackages = async () => {
    try {
        const storedData = localStorage.getItem('packages');
        if (storedData) {
            return JSON.parse(storedData);
        } else {
            const response = await UseDataFetching('/data/packageList.json');
            const data = await response.json();
            localStorage.setItem('packages', JSON.stringify(data));
            return data;
        }
    } catch (error) {
        console.error('Error fetching packages:', error);
        return [];
    }
};

const deletePackage = async (packageId) => {
    try {
        const storedData = localStorage.getItem('packages');
        if (storedData) {
            const packages = JSON.parse(storedData).packages;
            const updatedPackages = packages.filter(p => p.id !== packageId);
            localStorage.setItem('packages', JSON.stringify({ packages: updatedPackages }));
            console.log('Package deleted successfully.');
            return updatedPackages;
        } else {
            console.error('No packages found.');
            return [];
        }
    } catch (error) {
        console.error('Error deleting package:', error);
        throw error;
    }
};

const addPackage = (newPackage) => {
    try {
        const storedData = localStorage.getItem('packages');
        if (storedData) {
            const packages = JSON.parse(storedData).packages;
            const updatedPackages = [...packages, newPackage];
            localStorage.setItem('packages', JSON.stringify({ packages: updatedPackages }));
            return updatedPackages;
        } else {
            console.error('No packages found in local storage.');
            return [];
        }
    } catch (error) {
        console.error('Error adding package:', error);
        throw error;
    }
};

const sortByShippingOrder = (packages, ascending = true) => {
    const sortedPackages = ascending
        ? packages.slice().sort((a, b) => a.shippingOrder - b.shippingOrder)
        : packages.slice().sort((a, b) => b.shippingOrder - a.shippingOrder);

    return sortedPackages;
}

const findCustomerName = async (customerId) => {
    try {
        const customer = await getCustomerById(customerId);
        return customer.name;
    } catch (error) {
        console.error('Error finding customer name:', error);
        throw error;
    }
}

const getPackagesByCustomerId = async (customerId) => {
    try {
        const storedData = localStorage.getItem('packages');
        if (storedData) {
            const packages = JSON.parse(storedData).packages;
            const customerPackages = packages.filter(pkg => pkg.customerid === customerId);
            return customerPackages;
        } else {
            console.error('No packages found in local storage.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching packages by customer ID:', error);
        throw error;
    }
}

export { fetchPackages, deletePackage, findCustomerName, sortByShippingOrder, addPackage, getPackagesByCustomerId };
