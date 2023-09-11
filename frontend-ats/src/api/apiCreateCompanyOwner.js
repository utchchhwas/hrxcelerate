import axios from 'axios';

const apiCreateCompanyOwner = async (data) => {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/create-company-owner/',
    { ...data }
  );
  return response;
};

export default apiCreateCompanyOwner;
