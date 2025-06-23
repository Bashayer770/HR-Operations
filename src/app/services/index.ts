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
  DEPARTMENTS: `${BASE_URL}/Departments/GetDepartments`,
  LOCATIONS: `${BASE_URL}/Locations`,
  NODES: `${BASE_URL}/Nodes`,
  EMPLOYEES: `${BASE_URL}/Employees/all`,
  CHAT: `${CHAT_URL}/Chat`,
  GET_TIMING_PLAN: `${BASE_URL}/TimingPlans/GetTimingPlan`,
  GET_TIME_PLANS_NON_ALLOW: `${BASE_URL}/TimingPlans/GetTimePlansNonAllow`,
  GET_ALLOW_TIME_PLAN: `${BASE_URL}/TimingPlans/GetAllowTimePlan`,
  GET_EMPLOYEE_ALLOWS: `${BASE_URL}/EmployeeAllows/GetEmployeeAllows`,
  ADD_EMPLOYEE_ALLOWS: `${BASE_URL}/EmployeeAllows/AddEmployeeAllow`,
  REPORTS: {
    ATTENDANCE: `${BASE_URL}/Reports/Attendance`,
  },
};
