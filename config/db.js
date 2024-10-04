const { log } = require('console');
const mysql = require('mysql2'); 
///
let config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
module.exports = connect;

console.log(config)
let connection = {}
function connect() {
  connection = mysql.createConnection(config);
  connection.connect((err) => {
      if (err) {
          console.error("Error connecting to the database:", err);
          console.log("Retrying in 5 seconds");
          setTimeout(connect, 5000)
          return;
      }
      console.log("Database is connected");
  });
  return connection;
}


function getAllProducts(callback) {

  connection.query('SELECT * FROM product', (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); 
          callback(error, null);
          return;
      }
      connection.end();
      callback(null, results);
  });
}

function getAllMenProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id IN (?, ?, ?)', ['m1', 'm2', 'm3'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); 
          callback(error, null);
          return;
      }
      connection.end(); 
      callback(null, results); 
  });
}

function getAllWomenProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id IN (?, ?, ?)', ['wm1', 'wm2', 'wm3'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); 
          callback(error, null);
          return;
      }
      connection.end(); 
      callback(null, results); 
  });
}

function getAllKidsProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id IN (?, ?, ?)', ['kd1', 'kd2', 'kd3'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); // Close the                                                                                                                                                                                             connection in case of error
          callback(error, null);
          return;
      }
      connection.end(); // Close the connection after the query
      callback(null, results); // Pass the results to the callback function
  });
}

function getMenShirtProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id = ?', ['m1'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); // Close the connection in case of error
          callback(error, null);
          return;
      }
      connection.end(); // Close the connection after the query
      callback(null, results); // Pass the results to the callback function
  });
}

function getMenShortsProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id = ?', ['m3'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); // Close the connection in case of error
          callback(error, null);
          return;
      }
      connection.end(); // Close the connection after the query
      callback(null, results); // Pass the results to the callback function
  });
}

function getMenShoesProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id = ?', ['m2'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); // Close the connection in case of error
          callback(error, null);
          return;
      }
      connection.end(); // Close the connection after the query
      callback(null, results); // Pass the results to the callback function
  });
}

function getWomenShirtProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id = ?', ['wm1'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); 
          callback(error, null);
          return;
      }
      connection.end(); 
      callback(null, results); 
  });
}

function getWomenShortsProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id = ?', ['wm2'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); // Close the connection in case of error
          callback(error, null);
          return;
      }
      connection.end(); // Close the connection after the query
      callback(null, results); // Pass the results to the callback function
  });
}

function getWomenShoesProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id = ?', ['wm3'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); // Close the connection in case of error
          callback(error, null);
          return;
      }
      connection.end(); // Close the connection after the query
      callback(null, results); // Pass the results to the callback function
  });
}

function getKidClothingProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id = ?', ['kd1'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); // Close the connection in case of error
          callback(error, null);
          return;
      }
      connection.end(); // Close the connection after the query
      callback(null, results); // Pass the results to the callback function
  });
}

function getKidShoesProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id = ?', ['kd2'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); // Close the connection in case of error
          callback(error, null);
          return;
      }
      connection.end(); // Close the connection after the query
      callback(null, results); // Pass the results to the callback function
  });
}


function getKidAccessoryProducts(callback) {
  connection.query('SELECT * FROM product WHERE category_id = ?', ['kd3'], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); // Close the connection in case of error
          callback(error, null);
          return;
      }
      connection.end(); // Close the connection after the query
      callback(null, results); // Pass the results to the callback function
  });
}

function getProductById(productId, callback) { // Assuming createConnection() function is defined elsewhere
  connection.query('SELECT * FROM product WHERE product_id = ?', [productId], (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); // Close the connection in case of error
          callback(error, null);
          return;
      }
      connection.end(); 
      callback(null, results); 
  });
} 

function insertUser(fname, lname, email, password) {
  const sql = "INSERT INTO user (user_firstname, user_lastname, email, password) VALUES (?, ?, ?, ?)";
  const values = [fname, lname, email, password];

  return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
          if (error) {
              reject(error);
              return;
          }
          resolve(results);
      });
  });
}

function insertShopping(productId) { 
  const sql = "INSERT INTO sale_history (product_id) VALUES (?)";
  const values = [productId];

  return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
          if (error) {
              reject(error);
              return;
          }
          resolve(results);
      });
  });
}

function getSaleProducts(callback) {
  connection.query('SELECT sh.*, p.product_name, p.description, p.price, p.image FROM sale_history sh INNER JOIN product p ON sh.product_id = p.product_id', (error, results) => {
      if (error) {
          console.error('Error fetching products:', error);
          connection.end(); 
          callback(error, null);
          return;
      }
      connection.end(); 
      callback(null, results); 
  });
}

module.exports = {
  connect,
  getAllProducts,
  getAllMenProducts,
  getAllWomenProducts,
  getAllKidsProducts,
  getMenShirtProducts,
  getMenShortsProducts,
  getMenShoesProducts,
  getWomenShirtProducts,
  getWomenShortsProducts,
  getWomenShoesProducts,
  getKidClothingProducts,
  getKidShoesProducts,
  getKidAccessoryProducts,
  getProductById,
  insertUser,
  insertShopping,
  getSaleProducts
};