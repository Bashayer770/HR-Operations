const BASE_URL = 'https://localhost:7165/api';

export const API = {
  AUTH: {
    REGISTER: `${BASE_URL}/Account/Register`,
    LOGIN: `${BASE_URL}/Account/login`,
  },
      TIMINGPLAN: `${BASE_URL}/TimingPlans`,
      DEPARTMENTS: `${BASE_URL}/Departments`,
      LOCATIONS: `${BASE_URL}/Locations`,
};
