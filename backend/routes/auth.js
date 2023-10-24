const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const  bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
// Create a user using POST "/api/auth"
const JWT_SECRET = "Shivam"
router.post(
  "/RegisterUser",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const securepassword = await bcrypt.hash(req.body.password, salt);
    try {
      
      const user = new User({name:req.body.name,
        password:securepassword,
        email:req.body.email});
        const data = {
          user:{
            id:user._id
          }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
      await user.save();
      let success = true;
      res.status(201).json({success,authToken : authToken}); // Return the created user as a response with status code 201 (Created)
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error creating user ${error}`); // Handle the error and send an appropriate response
    }
  }
);


//------------------Authentication------------------


router.post('/authUser',body("email").isEmail()
, body('password', 'password can not be blank').exists(), async(req, res)=>{

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"incorrect username or password"});
      }

      const passwordCompare = await  bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({error:"incorrect username or password"});
      }

      const data = {
        user:{
          id:user._id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      let success = true;
      res.json({success, authToken:authToken});
    } catch (error) {
      console.error(error);
      res.status(500).send(`internal sever error{error}`); // Handle the error and send an appropriate response
    }
})



// ---------------LoggedIn user details--------------- 
router.post('/getUser', fetchUser, async(req,res)=>{

  try {
    const userId = req.User.id;
     const user = await User.findById(userId).select("-password")
     res.send(user);
   } catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error")
   }

})


module.exports = router;
