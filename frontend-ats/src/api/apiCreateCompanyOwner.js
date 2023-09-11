import axios from 'axios';
import { API_ROOT } from '../API';

const apiCreateCompanyOwner = async (data) => {
  const response = await axios.post(
    // 'http://127.0.0.1:8000/api/create-company-owner/',
    `${API_ROOT}/create-company-owner/`,
    { ...data }
  );
  return response;
};

export default apiCreateCompanyOwner;
