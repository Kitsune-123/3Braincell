const adminModel = require('../model/adminModel');
const connection = require('../config/db');

exports.adminLogin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const adminData = { name, email, password };
        const admin = new adminModel();
        const newAdmin = await admin.createAdmin(adminData);
        if (newAdmin) {
            return res.status(201).json({ message: "New admin successfully created" });
        } else {
            return res.status(500).json({ message: "Failed to create admin" });
        }
    } catch (error) {
        console.error("Error while creating admin:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.listAdmin = async (req, res) => {
    try {
        const admin = new adminModel();
        const adminList = await admin.getAllAdmins();
        if (adminList) {
            return res.status(200).json(adminList);
        } else {
            console.error("Failed to fetch admin list: No data found");
            return res.status(404).send("Failed to fetch admin list: No data found");
        }
    } catch (error) {
        console.error("Error while fetching admin list:", error);
        return res.status(500).send("Server error");
    }
};

exports.listNameAdmin = async (req, res) => {
    try {
        const email = req.params.email;
        const admin = new adminModel();
        const adminData = await admin.findByKey('email', email);
        if (adminData) {
            return res.status(200).json(adminData);
        } else {
            console.error("Failed to fetch admin data: Admin not found");
            return res.status(404).send("Failed to fetch admin data: Admin not found");
        }
    } catch (error) {
        console.error("Error fetching admin data:", error);
        return res.status(500).send("Server error");
    }
};

exports.updateAdminPassword = async (req, res) => {
    const email = req.params.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    try {
        const admin = new adminModel();
        const adminData = await admin.findByKey('email', email);

        if (!adminData) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (adminData.password !== oldPassword) {
            return res.status(401).json({ message: "Incorrect old password" });
        }

        const updateResult = await admin.updateAdmin(adminData.id, { password: newPassword });
        if (updateResult) {
            return res.status(200).json({ message: "Admin password updated successfully" });
        } else {
            return res.status(500).json({ message: "Failed to update admin password" });
        }
    } catch (error) {
        console.error("Error updating admin password:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
