import { where } from "sequelize";
import User from "../models/User.js";
import { hashPassword } from "../utils/hashPassword.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { full_name, email, password, phone_num, location, gender } =
      req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash the password
    const hashedPassword = await hashPassword(password);

    const profilePic = req.files["profile_pic"][0].buffer; // Access uploaded profile picture
    const profilePicType = req.files["profile_pic"][0].mimetype;

    const cv = req.files["cv"][0].buffer; // Access uploaded CV
    const cvType = req.files["cv"][0].mimetype;

    // Create a new user
    const newuser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      phone_num,
      location,
      gender,
      cv: cv,
      cv_type: cvType,
      profile_pic: profilePic,
      profile_pic_type: profilePicType,
      isVerified: "false",
      status: 1,
    });

    //Remove the password field from the user object before sending
    const userResponse = { ...newuser.toJSON() };
    delete userResponse.password;

    return res
      .status(201)
      .json({ message: "User created successfully", user: userResponse });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
