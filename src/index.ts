import axios from "axios";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

export const baseURL = process.env.API_URL || 'http://localhost:8080/'; 

