import axios from "axios";


const BETANDO_BASE_URL = process.env.NEXT_PUBLIC_BETANDO_BASE_URL;

const apiInstance = axios.create({
  baseURL: `${BETANDO_BASE_URL}`,
});

export default apiInstance;
