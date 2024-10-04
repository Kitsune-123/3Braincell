var db = require('../config/db')

class adminModel{
    constructor() {
      this.tableName = "admin";
    }
    async executeQuery(query, values) {
        return new Promise((resolve, reject) => {
            db.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    async getAllAdmins() {
        try {
            const query = `SELECT * FROM ${this.tableName}`;
            const results = await this.executeQuery(query);
            return results;
        } catch (error) {
            console.error("An error occurred while fetching all admins:", error);
            throw error;
        }
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

  
    async createAdmin(adminData) {
      try {
        const query = `INSERT INTO ${this.tableName} SET ?`;
        const result = await this.executeQuery(query, [adminData]); // Execute the query
        console.log("Add admin count success!", result);
        return result.insertId;
      } catch (error) {
        console.log("An error occurred while creating admin account:", error);
        return null;
      }
    }
    
  
    async updateAdmin(id, data) {
      try {
        const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
        const result = await this.executeQuery(query, [data, id]);
        console.log("Update data of admin success!", result);
        return result.affectedRows;
      } catch (error) {
        console.log("An error occur while updating data of admin:", error);
      }
    }
  
    async deleteAdmin(id) {
      try {
        const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await this.executeQuery(query, [id]);
        console.log("Delete data of admin success!", result);
        return result.affectedRows;
      } catch (error) {
        console.log("An error occurred while deleting data of admin:", error);
        return null;
      }
    }
  }

module.exports = adminModel;