import axios from "axios";
const API = "http://localhost:3000/api/dinprodukter";

export function getAllProducts() {
  return axios
    .get(`${API}`)
    .then((results) => {
      console.log("Api call for getting or reading all products:");

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
      console.log("Api call for adding product:");

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

export function deleteProduct(prodId) {
  return axios
    .delete(`${API}/${prodId}`)
    .then((results) => {
      console.log("Api call for deleting a product:");

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
