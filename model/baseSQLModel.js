var db = require("../config/db");

class ProductModel {
  constructor() {
    this.tableName = "product";
  }

  executeQuery(query, params) {
    return new Promise((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async getAllProduct() {
    const query = `SELECT * FROM ${this.tableName}`;
    const results = await this.executeQuery(query);
    return results;
  }

  async findByColumn(column) {
    const query = `SELECT ${column} FROM ${this.tableName}`;
    const results = await this.executeQuery(query);
    return results;
  }

  async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const results = await this.executeQuery(query, [id]);
    return results[0];
  }

  async findByKey(key, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${key} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results[0];
  }

  async findAllByKey(key, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${key} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results;
  }

  async createProduct(data) {
    try {
      const query = `INSERT INTO ${this.tableName} SET ?`;
      const result = await this.executeQuery(query, data);
      console.log("Add new data of product success!", result);
      return result.insertId;
    } catch (error) {
      console.log("An error occurred while adding data of product:", error);
      return null;
    }
  }

  async updateProduct(id, data) {
    try {
      const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
      const result = await this.executeQuery(query, [data, id]);
      console.log("Update data of product success!", result);
      return result.affectedRows;
    } catch (error) {
      console.log("An error occur while updating data of product:", error);
    }
  }

  async deleteProduct(id) {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
      const result = await this.executeQuery(query, [id]);
      console.log("Delete data of product success!", result);
      return result.affectedRows;
    } catch (error) {
      console.log("An error occurred while deleting data of product:", error);
      return null;
    }
  }
}

class BillModel {
  constructor() {
    this.tableName = "bill";
  }
  async getAllBill() {
    const query = `SELECT * FROM ${this.tableName}`;
    const results = await this.executeQuery(query);
    return results;
  }

  async createBill(data) {
    try {
      const query = `INSERT INTO ${this.tableName} SET ?`;
      const result = await this.executeQuery(query, data);
      console.log("Add new data of bill success!", result);
      return result.insertId;
    } catch (error) {
      console.log("An error occurred while adding data of bill:", error);
      return null;
    }
  }

  async updateBill(id, data) {
    try {
      const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
      const result = await this.executeQuery(query, [data, id]);
      console.log("Update data of bill success!", result);
      return result.affectedRows;
    } catch (error) {
      console.log("An error occur while updating data of bill:", error);
    }
  }

  async deleteBill(id) {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
      const result = await this.executeQuery(query, [id]);
      console.log("Delete data of bill success!", result);
      return result.affectedRows;
    } catch (error) {
      console.log("An error occurred while deleting data of bill:", error);
      return null;
    }
  }
}

class CategoryModel{
  constructor() {
    this.tableName = "category";
  }

  async getAllCategory(){
    const query = `SELECT * FROM ${this.tableName}`;
    const result = await this.executeQuery(query)
    return result;
  }

  async findByKey(key, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${key} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results[0];
  }

  async findAllByKey(key, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${key} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results;
  }

  async createProduct(data) {
    try {
      const query = `INSERT INTO ${this.tableName} SET ?`;
      const result = await this.executeQuery(query, data);
      console.log("Add new data of product success!", result);
      return result.insertId;
    } catch (error) {
      console.log("An error occurred while adding data of product:", error);
      return null;
    }
  }

  async updateProduct(id, data) {
    try {
      const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
      const result = await this.executeQuery(query, [data, id]);
      console.log("Update data of product success!", result);
      return result.affectedRows;
    } catch (error) {
      console.log("An error occur while updating data of product:", error);
    }
  }

  async deleteProduct(id) {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
      const result = await this.executeQuery(query, [id]);
      console.log("Delete data of product success!", result);
      return result.affectedRows;
    } catch (error) {
      console.log("An error occurred while deleting data of product:", error);
      return null;
    }
  }
}


module.exports = ProductModel,CategoryModel, BillModel ;
