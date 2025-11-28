import axios from "axios";
axios.defaults.withCredentials = true;
const API = "http://localhost:3000/api/dinprodukter";

export function signup(data) {
  return axios
    .post(`${API}/signup`, data)
    .then((results) => {
      console.log("Api call:");

      console.log(results.status);

      return results.status;
    })
    .catch(function (error) {
      console.log("Error when signing in: " + error);
    });
}

export function getAllProducts() {
  return axios
    .get(`${API}`)
    .then((results) => {
      // console.log("Api call for getting or reading all products:");

      // console.log(results.data);
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

export function getProductById(id) {
  return axios.get(`${API}/${id}`).then((results) => results.data);
}

export function updateProduct(formData) {
  return axios
    .put(`${API}/${formData.id}`, formData)
    .then((results) => {
      console.log("Api call for updating the product:");

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
      // console.log("Api call for deleting a product:");

      // console.log(results.data);
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

export function login(data) {
  return axios
    .post(`${API}/signin`, data, { withCredentials: true })
    .then((results) => {
      console.log("Api call:");

      console.log(results.status);

      return results.status;
    })
    .catch(function (error) {
      console.log("Error when logging in: " + error);
    });
}
