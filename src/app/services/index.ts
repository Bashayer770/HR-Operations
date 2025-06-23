const BASE_URL = 'https://localhost:7165/api';
const CHAT_URL = 'http://127.0.0.1:5000';

export const API = {
  AUTH: {
    REGISTER: `${BASE_URL}/Account/Register`,

    LOGIN: `${BASE_URL}/Account/login`,
    CHANGE_PASSWORD: `${BASE_URL}/Account/ChangePassword`,
    USER_INFO: `${BASE_URL}/Account/Profile`,

    //     LOGIN: `${BASE_URL}/Account/Login`,
  },
  TIMINGPLAN: `${BASE_URL}/TimingPlans`,
  DEPARTMENTS: `${BASE_URL}/Departments`,
  LOCATIONS: `${BASE_URL}/Locations`,
  NODES: `${BASE_URL}/Nodes`,
  EMPLOYEES: `${BASE_URL}/Employees/all`,
  CHAT: `${CHAT_URL}/Chat`,
  GET_TIMING_PLAN: `${BASE_URL}/TimingPlans/GetTimingPlan`,
  GET_EMPLOYEE_ALLOWS: `${BASE_URL}/EmployeeAllows/GetEmployeeAllows`,
};
