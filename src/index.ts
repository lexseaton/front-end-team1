import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';