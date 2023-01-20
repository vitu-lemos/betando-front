import axios from "axios";
const BETANO_BASE_URL = process.env.NEXT_PUBLIC_BETANO_BASE_URL;

const betanoInstance = axios.create({
  baseURL: `${BETANO_BASE_URL}`,
});

export default betanoInstance;
