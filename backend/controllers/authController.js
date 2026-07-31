import { loginUser } from "../services/authService.js";


export const login = async (req, res) => {

  try {

    const { email, password } = req.body;


    const result = await loginUser(
      email,
      password
    );


    res.status(200).json({
      message: "Login successful",
      ...result,
    });


  } catch(error) {

    res.status(401).json({
      message: error.message,
    });

  }

};