import axios from "axios";
const API = "http://localhost:3000/api/dinprodukter";

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

export function addProduct(formData) {
  return axios
    .post(`${API}`, formData)
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
