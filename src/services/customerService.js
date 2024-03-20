
import UseDataFetching from "../hooks/useDataFetching";;

const initializeCustomerLocalStorage = async () => {
    if (!localStorage.getItem('customers')) {
        try {
            const response = await UseDataFetching('/data/customerList.json');
            const data = await response.json();
            
            localStorage.setItem('customers', JSON.stringify(data.customers));
            return data.customers
        } catch (error) {
            console.error('Error fetching or storing customers data:', error);
        }
    }
    else{
        return getCustomersFromLocalStorage();
    }
};


const getCustomersFromLocalStorage = () => {
    const customers = localStorage.getItem('customers');
    return customers ? JSON.parse(customers) : [];
};

const getCustomerById = async (customerId) => {
    const customers = getCustomersFromLocalStorage();
    const customer = customers.find(c => c.id === customerId);
    return customer;
}

const deleteCustomer = async (customerId) => {
    try {
        const customers = getCustomersFromLocalStorage();
        const updatedCustomers = customers.filter(customer => customer.id !== customerId);
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));

        console.log('Customer deleted successfully.');
        return updatedCustomers;
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error;
    }
};

export { initializeCustomerLocalStorage as fetchCustomers, deleteCustomer, getCustomerById };
