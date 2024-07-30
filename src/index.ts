import axios from "axios";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

//onst axios = require('axios');

const instance = axios.create({
	baseURL: 'http://localhost:8080/'
});

console.log("base in index" +instance.defaults.baseURL);