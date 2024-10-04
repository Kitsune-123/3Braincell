// var BaseSQLModel = require("./baseSQLModel");
var db = require ('../config/db')

class userModel{
    constructor() {
      this.tableName = "user";
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
    
    async getAllUser(){
      const query = `SELECT * FROM ${this.tableName}`;
      const result = await this.executeQuery(query);
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
  
    async createUser(data) {
      try {
        const query = `INSERT INTO ${this.tableName} SET ?`;
        const result = await this.executeQuery(query, data);
        console.log("Add user addcount success!", result);
        return result.insertId;
      } catch (error) {
        console.log("An error occurred while createing user account:", error);
        return null;
      }
    }
  
    async updateUser(id, data) {
      try {
        const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
        const result = await this.executeQuery(query, [data, id]);
        console.log("Update data of user success!", result);
        return result.affectedRows;
      } catch (error) {
        console.log("An error occur while updating data of user:", error);
      }
    }
  
    async deleteUser(id) {
      try {
        const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await this.executeQuery(query, [id]);
        console.log("Delete data of user success!", result);
        return result.affectedRows;
      } catch (error) {
        console.log("An error occurred while deleting data of user:", error);
        return null;
      }
    }
  }
module.exports = userModel; 