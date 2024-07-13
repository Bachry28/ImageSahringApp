const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createUserLogin(req, res) {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    // Assuming user_id is the correct property name
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET);
    // Set cookie with token and user_id
    res.setHeader("Set-Cookie", `token=${token}; httpOnly; path=/; SameSite=None; userId=${user.user_id}`);
    res.status(200).json({ message: "Login Success", token, userId: user.user_id });

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid credentials" });
  }
};

async function getSpecificUser(req, res) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { user_id: Number(id) },
      select: {
        user_id: true,
        username: true,
        foto: true,
         // Include the username field in the response
        // Add other fields you need in the response
      }
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Successfully found specific user", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = {
  createUserLogin,getSpecificUser
};
