export const CLIENT_MANAGEMENT = 'client_management';
export const INVENTORY_MANAGEMENT = 'inventory_management';
export const FINANCE_MANAGEMENT = 'finance_management';
export const EMPLOYEE_MANAGEMENT = 'employee_management';

export const modules = [
    {name: CLIENT_MANAGEMENT, isActive: true},
    {name: INVENTORY_MANAGEMENT, isActive: true},
    {name: FINANCE_MANAGEMENT, isActive: true},
    {name: EMPLOYEE_MANAGEMENT, isActive: true}
];

export const moduleConfig = {
    [CLIENT_MANAGEMENT]: 'ClientManagement',
    [INVENTORY_MANAGEMENT]: 'InventoryManagement',
    [FINANCE_MANAGEMENT]: 'FinanceManagement',
    [EMPLOYEE_MANAGEMENT]: 'EmployeeManagement',
};