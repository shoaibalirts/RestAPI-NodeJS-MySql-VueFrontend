import axios from "axios";
const API = "http://localhost:3000/api/dinprodukter";

export function login(data) {
  return axios
    .post(`${API}/signin`, data)
    .then((results) => {
      console.log("Api call:");

      console.log(results.status);

      return results.status;
    })
    .catch(function (error) {
      console.log("Error when logging in: " + error);
    });
}

export function getAllProducts() {
  return axios
    .get(`${API}`)
    .then((results) => {
      console.log("Api call:");

      console.log(results.data);
      return results.data;
    })
    .catch(function (error) {
      // handle error
      console.log("frontend API calling error: " + error);
    })
    .finally(function () {
      // always executed
    });
}

export function addProduct() {
  return axios
    .post(`${API}`)
    .then((results) => {
      console.log("Api call:");

      console.log(results.data);
      return results.data;
    })
    .catch(function (error) {
      // handle error
      console.log("frontend API calling error: " + error);
    })
    .finally(function () {
      // always executed
    });
}
