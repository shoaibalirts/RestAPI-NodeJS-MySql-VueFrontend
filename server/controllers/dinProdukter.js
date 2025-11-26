import connection from "../database.js";
connection.connect();
// @desc      Get all products
// @route     Get /api/dinprodukter
// @access    Public
export const getAllProducts = async (req, res, next) => {
  let query = "SELECT prod_id, prod_name, prod_co2, curr_date FROM product";
  connection.query(query, function (error, results, fields) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
    // console.log(req.authenticationToken);
  });
};

// @desc      Get a single product
// @route     Get /api/dinprodukter/:prodId
// @access    Public
export const getProduct = async (req, res, next) => {
  const prodId = req.params.prodId;

  let query =
    "SELECT prod_id, prod_name, prod_co2, curr_date FROM product WHERE prod_id=?";
  connection.query(query, [prodId], function (error, results, fields) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
    // console.log(req.authenticationToken);
  });
};

// @desc      Create new product
// @route     POST /api/dinprodukter
// @access    Private, meaning after login we have to send a token
export const createProduct = async (req, res, next) => {
  const now = new Date();
  req.body.curr_date = now;
  const prodData = req.body;
  const values = [prodData.prod_name, prodData.prod_co2, prodData.curr_date];
  let query = `INSERT INTO product (prod_name, prod_co2, curr_date) VALUES (?, ?, ?)`;
  console.log(query);

  connection.query(query, values, function (error, results, fields) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ success: true, msg: "Product has been created" });
  });
};

// @desc      Update a product
// @route     PUT /api/dinprodukter/:prodId
// @access    Private, meaning after login we have to send a token
export const updateProduct = async (req, res, next) => {
  const prodId = req.params.prodId;
  const prodName = req.body.prod_name;
  const prodCo2 = req.body.prod_co2;
  const now = new Date();
  req.body.curr_date = now;
  const prod_curr_date = req.body.curr_date;
  const values = [prodName, prodCo2, prod_curr_date];
  let query = `UPDATE product SET prod_name=?, prod_co2=?, curr_date=? WHERE prod_id=${prodId}`;
  console.log(query);

  connection.query(query, values, function (error, results, fields) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ success: true, msg: "Product has been created" });
  });
};

// @desc      Delete a product
// @route     DELETE /api/dinprodukter/:prodId
// @access    Private, meaning after login we have to send a token
export const deleteProduct = async (req, res, next) => {
  const prodId = req.params.prodId;
  let query = `DELETE FROM product WHERE prod_id=${prodId}`;
  console.log(query);

  connection.query(query, function (error, results, fields) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ success: true, msg: "Product has been deleted" });
  });
};

// @desc      Create signin
// @route     POST /api/dinprodukter
// @access    Private, meaning after login we have to send a token
export const signin = async (req, res, next) => {
  try {
    const prodData = req.body;
    console.log(prodData);
    const loginData = {
      username: prodData.user_name,
      password: prodData.user_password,
      userRole: prodData.user_role_name,
    };
    console.log(loginData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ success: true, msg: "user is created" });
};
