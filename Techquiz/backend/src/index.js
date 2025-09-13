require("./Models/connection");
var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.json());
var cors = require("cors");

const cookieParser = require("cookie-parser");

var allowedOrigin = ["https://petcare-yk3u.vercel.app"];
app.use(
  cors({
    origin: allowedOrigin,
    credentials: false,
  })
);








app.use(cookieParser());

var ContactUs = require("./Models/Contact");
var faq = require("./Models/Faq");
const port = process.env.PORT || 4000;
var jwt = require("jsonwebtoken");
var user = require("./Models/users");
var order_Model= require("./Models/orders");
jwt_SecretKey = "secretKey";
var categories = require("./Models/Categories");
var Petproducts = require("./Models/Products");
var cart_Model = require("./Models/Cart");
var wishlistModel = require("./Models/wishlist");
var vets = require("./Models/Veterinarian");
var animalShelters = require("./Models/AnimalShelter");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
var pet = require("./Models/pets");
var appointment = require("./Models/Appointment");
var HealthRecord = require("./Models/healthRecord");
var shelterPets = require("./Models/shelterpets");
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // 465 pe true hota hai
  auth: {
    user: "96f004001@smtp-brevo.com",
    pass: "H9REOAv736afZSF1",
  },
  tls: {
    rejectUnauthorized: false
  }
});

var websiteName="FurShield";
var multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      
      null,"E:/FurShield-main/FurShield-main/Techquiz/clientside/public/images/productImages"
    );
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/register", async (req, res) => {
  var { first_name, last_name, email, address, phone } = req.body;

  try {
    var emailExisting = await user.findOne({ email });
    if (emailExisting) {
      return res.json({
        success: false,
        massege: "email is already register !",
      });
    }
    var numberExisting = await user.findOne({ phone });
    if (numberExisting) {
      return res.json({
        success: false,
        massege: "number is already register !",
      });
    }
    var Otp = String(Math.floor(100000 + Math.random() * 900000));
    var verifyOptExpireAt = Date.now() + 24 * 60 * 60 + 10000;
    const hashedPassword = await bcrypt.hash(req.body.hash_password, 10);
    var newUser = await user.create({
      last_name: last_name,
      first_name: first_name,
      email: email,
      phone: phone,
      address,
      verifyOpt: Otp,
      verifyOptExpireAt: verifyOptExpireAt,
      profile_picture: null,
      hash_password: hashedPassword,
    });

    var userToken = jwt.sign({ id: newUser._id }, jwt_SecretKey, {
      expiresIn: "2d",
    });
    res.cookie("token", userToken, {
      httpOnly: true,
      secure: false, // Use this in production
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    // for sending the Email
    var mailOptions = {
      from: "akashwaghella@gmail.com",
      to: email,
      subject: "welcome to MyWebsite",
      text: `weclome to MyWebsite.your account is created With email id :${email} and please verify the account with this  OPT  ${Otp} `,
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      massege: "user is registered !",
    });
  } catch (error) {
    return res.json({ success: false, massege: error.message });
  }
});

// logined

app.post("/login", async (req, res) => {
  var { email, hash_password } = req.body;
   let findShelter = await animalShelters.findOne({ email });

  if (!email || !hash_password) {
    return res.json({
      success: false,
      messege: "all input is required! ",
    });
  }

  try {
   
    var findEmail = await user.findOne({ email });
     if(findEmail){
    if (!findEmail) {
      return res.json({
        success: false,
        messege: "email is invalid ",
      });
    }
    var isPasswordValid = await bcrypt.compare(
      hash_password,
      findEmail.hash_password
    );
    if (!isPasswordValid) {
      return res.json({
        success: false,
        messege: "password is invalid ",
      });
    }
    var isvarify = findEmail.isverify;
    if (!isvarify) {
      return res.json({
        success: false,
        messege: "sorry your account is not verify ",
      });
    }
    var isactivate = findEmail.status;
    if (isactivate === 0) {
      return res.json({
        success: false,
        messege: " your account is deactivate by Admin ",
      });
    }
    var userToken = jwt.sign(
      { id: findEmail._id, role: findEmail.is_admin },
      jwt_SecretKey,
      {
        expiresIn: "2d",
      }
    );
    res.cookie("token", userToken, {
      httpOnly: false,
      secure: false,
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      success: true,
      messege: userToken,
      role: findEmail.role,
    });
  }  else if(findShelter){
         if(findShelter){
    if (!findShelter) {
      return res.json({
        success: false,
        messege: "email is invalid ",
      });
    }
    var isPasswordValid = await bcrypt.compare(
      hash_password,
      findShelter.hash_password
    );
    if (!isPasswordValid) {
      return res.json({
        success: false,
        messege: "password is invalid ",
      });
    }
    var isvarify = findShelter.isverify;
    if (!isvarify) {
      return res.json({
        success: false,
        messege: "sorry your account is not verify ",
      });
    }
    var isactivate = findShelter.status;
    if (isactivate === 0) {
      return res.json({
        success: false,
        messege: " your account is deactivate by Admin ",
      });
    }
    var userToken = jwt.sign(
      { id: findShelter._id, },
      jwt_SecretKey,
      {
        expiresIn: "2d",
      }
    );
    res.cookie("token", userToken, {
      httpOnly: false,
      secure: false,
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      success: true,
      messege: userToken,
      role: findEmail.role,
    });}

  }
  } catch (error) {
    return res.json({ success: false, messege: "Accc" });
  }
});

app.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.json({
      success: true,
      messege: "Logout done ! ",
    });
  } catch (error) {
    return res.json({ success: false, messege: "Accc" });
  }
});

// app.post("/verifiy_Account", async (req, res) => {
//   var { verifyOpt, email } = req.body;
//   let findUser = await user.findOne({ email }) || await vets.findOne({ email }) || await animalShelters.findOne({email});
//   try {
//     if (!verifyOpt) {
//       return res.json({ success: false, message: "there is no verifyOTP" });
//     }
   
//     if (findUser.verifyOpt !== verifyOpt
//     ) {
//       return res.json({ success: false, message: "invalid Opt" });
//     }
//     if (findUser.verifyOptExpireAt < Date.now()) {
//       return res.json({ success: false, message: "Expired OTP" });
//     }
//     findUser.isverify = true;
//     findUser.verifyOpt = "";
//     findUser.verifyOptExpireAt = "";
//     await findUser.save();
//     return res.json({
//       success: true,
//       messege: " Activate Account! ",
//     });
//   } catch (error) {
//     return res.json({ success: false, message: "Accc" });
//   }
// });
app.post("/verify_Account", async (req, res) => {
  const { verifyOpt, email } = req.body;

  if (!verifyOpt || !email) {
    return res.json({ success: false, message: "OTP and email are required" });
  }

  try {
    // Check user across all collections
    const findUser = await user.findOne({ email }) 
      || await vets.findOne({ email }) 
      || await animalShelters.findOne({ email });

    if (!findUser) {
      return res.json({ success: false, message: "User not found" });
    }

    if (findUser.verifyOpt !== verifyOpt) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (findUser.verifyOptExpireAt < Date.now()) {
      return res.json({ success: false, message: "Expired OTP" });
    }

    // Activate account
    findUser.isverify = true;
    findUser.verifyOpt = "";
    findUser.verifyOptExpireAt = "";
    await findUser.save();

    return res.json({ success: true, message: "Account activated successfully!" });
    
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

app.get("/profile/:id", (req, res) => {
  user.findById(req.params.id).then((resp) => {
    res.send(resp);
  });
});
app.put("/updateuser/:id",upload.single("profile_picture"),
  async (req, res) => {
    const userId = req.params.id;
    const { email, first_name, last_name, status, role, address } = req.body;

    let updateFields = {
      email,
      first_name,
      last_name,
      status,
      role,
      address,
    };

    // Handle profile picture update
    if (req.file) {
      updateFields.profile_picture = req.file.filename;
    }

    try {
      const updatedUser = await user.findByIdAndUpdate(userId, updateFields, {
        new: true,
      });
      if (updatedUser) {
        res.send("User updated successfully");
      } else {
        res.send("User not found");
      }
    } catch (err) {
      console.error(err);
      res.send("Error updating user");
    }
  }
);
app.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.json({
      success: true,
      messege: "Logout done ! ",
    });
  } catch (error) {
    return res.json({ success: false, messege: error.message });
  }
});
app.put("/updatePassword/:id", async (req, res) => {
  var find_id = await user.findById(req.params.id);
  const hashedPassword = await bcrypt.hash(req.body.hash_password, 10);
  find_id.hash_password = hashedPassword;
  find_id.save();
  res.send("password updated!");
});
app.post("/addcontact", async (req, res) => {
  const { name, email, contact_number, message } = req.body;

  try {
    await ContactUs.create({
      name,
      email,
      contact_number: contact_number,
      message,
    });
    res.status(200).send("Contact message added successfully");
  } catch (err) {
    console.error(err);
    res.send("Error adding contact message");
  }
});
app.put("/forgetPassword", async (req, res) => {
  try {
    const { email, hash_password } = req.body;

    const userData = await user.findOne({ email }) || await vets.findOne({ email }) || await animalShelters.findOne({email});
    if (!userData) {
      return res.status(400).send("email is  not found");
    }

    const hashedPassword = await bcrypt.hash(hash_password, 10);
    userData.hash_password = hashedPassword;
    await userData.save();

    res.send("Password updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/website/productDetails", (req, res) => {
  Petproducts.find({ Status :1}).then((resp) => {
    res.send(resp);
  });
}); 
// wishlist 
app.post("/website/addWishList",async(req,res)=>{
   var {user_id,name} = req.body;
try{
    var wishlist =await wishlistModel.findOne({user_id})
     if(!user_id || !name){
       return res.json({ success: false, message: "f" });

     }
      const existingItem = await wishlistModel.findOne({ user_id, name });

    if (existingItem) {
      return res.json({ success: false, message: "Product is already in wishlist" });
    } 
     await wishlistModel.create(req.body);
      return res.json({ success: true, message: "Product is added in wishlist" });
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
})
app.get("/wishlist/:user_id",(req,res)=>{
  wishlistModel.find({user_id:req.params.user_id}).then((ress)=>{
    res.send(ress)})
})
app.delete("/delWishProduct/:id",(req,res)=>{
  wishlistModel.findByIdAndDelete(req.params.id).then((ress)=>{
    res.send("wish list product is deleted !")})
})

app.post("/website/addCart",async(req,res)=>{
   var {user_id,name,productId} = req.body;
try{
    var cart =await cart_Model.findOne({user_id})
     if(!user_id || !name){
       return res.json({ success: false, message: "f" });

     }
      const existingItem = await cart_Model.findOne({ user_id, productId });

    if (existingItem) {
      return res.json({ success: false, message: "Product is already in wishlist" });
    } 

     await cart_Model.create(req.body);
     var find_product= await Petproducts.findById(productId)
      return res.json({ success: true, message: "Product is added in wishlist" ,data:find_product});
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
})
app.post("/addToCart", async (req, res) => {
  try {
    const { user_id, name, image, price, quantity } = req.body;

    // Required fields check
    if (!user_id || !name || !quantity || !price) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Product find by name
    const product = await Petproducts.findOne({ name });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Stock check (field ka naam confirm karein Product schema me)
    if (quantity > product.quantity) {
      return res
        .status(400)
        .send({ message: `Only ${product.quantity} items available in stock` });
    }

    // Check if product already in cart
    let existingCartItem = await cart_Model.findOne({ user_id, name });

    if (existingCartItem) {
      if (existingCartItem.quantity + quantity > product.Quantity) {
        return res.status(400).send({
          message: `You already have ${existingCartItem.quantity} in cart. Only ${
            product.Quantity - existingCartItem.quantity
          } more can be added.`,
        });
      }

      existingCartItem.quantity += quantity;
      existingCartItem.total = existingCartItem.quantity * price; // ✅ safe calc
      await existingCartItem.save();
    } else {
      existingCartItem = await cart_Model.create({
        user_id,
        name,
        image,
        price,
        quantity,
        total: quantity * price, // ✅ backend calculates total
      });
    }

    // Update stock
    product.quantity -= quantity;
    await product.save();

    return res.send({
      message: "Product added to cart and stock updated",
      cartItem: existingCartItem,
    });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    res.status(500).send({ message: err.message });
  }
});


  app.get('/cartDetail/:user_id',(req,res)=>{
    cart_Model.find({user_id:req.params.user_id}).then((reps)=>{
      res.send(reps)
    })
   
  })
  // app.delete('/cartDel/:id',(req,res)=>{
  //   cart_Model.findByIdAndDelete(req.params.id).then((reps)=>{
  //     res.send("del")
  //   })
   
  // })
app.delete('/cartDel/:id', async (req, res) => {
  try {
    // Cart se item find
    const cartItem = await cart_Model.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }

    // Cart item se productId aur quantity nikaalo
    const { name, quantity } = cartItem;

    // Product quantity wapas add karo
const product = await Petproducts.findOne({ name: cartItem.name });

if (product) {
  product.quantity += cartItem.quantity; // cart ki quantity wapas product me add
  await product.save();
} else {
  console.log("Product not found with name:", cartItem.name);
}


    // Cart item delete karo
    await cart_Model.findByIdAndDelete(req.params.id);

    res.send({ message: "Cart item deleted & product quantity updated" });

  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).send({ message: "Something went wrong", error: error.message });
  }
});

app.post("/website/appointment", async (req, res) => {
  try {
    const { user_id, pet_name,name, email, pet_id, vet_id, appointment_time,reason } = req.body;

    // Validation
    // if (!user_id || !name || !pet_id || !vet_id || !appointment_time) {
    //   return res.json({ success: false, message: "All fields are required" });
    // }

    // Pet find
    const petData = await pet.findById(pet_id);
    if (!petData) {
      return res.json({ success: false, message: "Pet not found" });
    }

    // Vet find
    const vetData = await vets.findById(vet_id); // agar vets alag model hai to `vet.findById(vet_id)`
    if (!vetData) {
      return res.json({ success: false, message: "Vet not found" });
    }
 const userData = await user.findById(user_id); // agar vets alag model hai to `vet.findById(vet_id)`
    if (!userData) {
      return res.json({ success: false, message: "user not found" });
    }
    // Appointment create
    const newAppointment = await appointment.create({
      user_id,
      name :userData.first_name,
      email:userData.email,
      pet_id,
      reason,
      pet_name: petData.name, 
      vet_id,
      vet_name: vetData.name, 
      appointment_time,
      status: "Scheduled"
    });

    return res.json({
      success: true,
      message: "Appointment booked successfully",
      data: newAppointment
    });

  } catch (error) {
    console.error("Appointment Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


app.post("/addOrder", async (req, res) => {
  try {
    const { user_id, items, totalAmount, address,name,email } = req.body;

    if (!user_id || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order request" });
    }

    // New order create
    const newOrder = await order_Model.create({
      user_id,
      name,
      email,
      items,
      totalAmount,
      address,
      status: "pending",
    });

    // Cart saaf karo
    await cart_Model.deleteMany({ user_id: user_id });

    return res.json({
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order Error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});


  
    app.get("/fetchOrderByUser/:user_id",(req,res)=>{
    order_Model.find({user_id:req.params.user_id}).then((r)=>{
      res.send(r)
    })
  })
  // ✅ Pet storage
const petStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, "E:/FurShield-main/FurShield-main/Techquiz/clientside/public/images/petsImages/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //   generate filename
    cb(null, uniqueSuffix + file.originalname);
  },
});
const uploadPet = multer({ storage: petStorage });

app.post("/api/pets", uploadPet.single("pet_img"), async (req, res) => {
await pet.create(req.body)
    res.status(201).json({ message: "Pet added successfully" });

});

   app.get("/api/pets/:ownerId", async (req, res) => {
  try {
    const { q } = req.query;
    let filter = { owner_id: req.params.ownerId };

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { species: { $regex: q, $options: "i" } },
        { breed: { $regex: q, $options: "i" } },
      ];
    }

    const pets = await pet.find(filter);
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/delpet/:id", (req, res) => {
  pet.findByIdAndDelete(req.params.id).then(() => {
    res.send("delete !");
  });
});
app.get("/fetchpet/:id", async (req, res) => {
  try {
    const Pet = await pet.findById(req.params.id)
    if (!Pet) return res.status(404).json({ message: "Pet not found" });

    res.json(Pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put("/Updatepet/:id", uploadPet.single("pet_img"), async (req, res) => {
  try {
    const { name, species, breed, age, gender } = req.body;

    let updatedData = { name, species, breed, age, gender };

    // ✅ agar new image upload hui hai
    if (req.file) {
      updatedData.pet_img = req.file.filename;
    }

    const pet = await pet.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    })

    if (!pet) return res.status(404).json({ message: "Pet not found" });

    res.json({ message: "Pet updated successfully", pet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/activate_vets", (req, res) => {
  vets.find({ status: 1 }).then((rerp) => {
    res.send(rerp);
  });
});
app.get("/healthHistory/:pet_id", (req, res) => {
  HealthRecord.find({ pet_id: req.params.pet_id }).then((rerp) => {
    res.send(rerp);
  });
});
app.get("/myappointment/:owner_id", (req, res) => {
  appointment.find({ owner_id: req.params.owner_id }).then((rerp) => {
    res.send(rerp);
  });
});

// ----------------------------------ADMIN panel API --------------------------------------------

app.get("/fetch_user", (req, res) => {
  user.find({ role : 0 }).then((rerp) => {
    res.send(rerp);
  });
});
app.put("/statususer/:id", async (req, res) => {
  var find_id = await user.findById(req.params.id);
  find_id.status = find_id.status == 1 ? 0 : 1;
  find_id.save();
  res.send("updated !");
});

app.get("/search_user/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await user.find({
    role: 0,
    email: { $regex: query, $options: "i" },
  });
  res.send(items);
});
app.delete("/deluser/:id", (req, res) => {
  user.findByIdAndDelete(req.params.id).then(() => {
    res.send("delete !");
  });
});
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await ContactUs.find();
    res.send(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching contacts");
  }
});
app.delete("/delcon/:id", (req, res) => {
  ContactUs.findByIdAndDelete(req.params.id).then(() => {
    res.send("delete !");
  });
});
app.get("/search_contact/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await ContactUs.find({
    email: { $regex: query, $options: "i" },
    name: { $regex: query, $options: "i" },
  });
  res.send(items);
});

app.post("/add_faq", async (req, res) => {
  faq.create(req.body).then(() => {
    res.send("faq created");
  });
});
app.get("/faq_fetch", (req, res) => {
  faq.find().then((resp) => {
    res.send(resp);
  });
});
app.get("/faq_find/:id", (req, res) => {
  faq.findById(req.params.id).then((resp) => {
    res.send(resp);
  });
});
app.put("/faq_edit/:id", (req, res) => {
  faq.findByIdAndUpdate(req.params.id, req.body).then((resp) => {
    res.send("the faq is updated now");
  });
});
app.delete("/faq_del/:id", (req, res) => {
  faq.findByIdAndDelete(req.params.id).then((resp) => {
    res.send("the faq is deleted now");
  });
});
app.get("/faq_search/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await faq.find({
    subject: { $regex: query, $options: "i" },
  });
  res.send(items);
});

app.post("/add_category", async (req, res) => {
  var { name, status } = req.body;
  try {
    var nameExisitng = await categories.findOne({ name });
    if (nameExisitng) {
      return res.json({
        success: false,
        massege: "category name  is already existing !",
      });
    }
    await categories.create(req.body);
    return res.json({
      success: true,
      massege: "Category is added successfully !",
    });
  } catch (error) {
    return res.json({ success: false, massege: error.message });
  }
});

app.get("/fetchCategory", (req, res) => {
  categories.find().then((resp) => {
    res.send(resp);
  });
});
app.put("/statusCate/:id", async (req, res) => {
  var find_id = await categories.findById(req.params.id);
  find_id.status = find_id.status == 1 ? 0 : 1;
  find_id.save();
  res.send("updated !");
});

app.delete("/category_del/:id", (req, res) => {
  categories.findByIdAndDelete(req.params.id).then((ress) => {
    res.send("product is deleted !");
  });
});
app.get("/search_Cate/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await categories.find({
    name: { $regex: query, $options: "i" },
  });
  res.send(items);
});
app.get("/find_Cate/:id", (req, res) => {
  categories.findById(req.params.id).then((resp) => {
    res.send(resp);
  });
});

app.put("/update_Cate/:id", (req, res) => {
  categories.findByIdAndUpdate(req.params.id, req.body).then((resp) => {
    res.send("updated !");
  });
});
// app.get("/CategoryProduct/:category",(req,res)=>{
//   product_data.find({category:req.params.category}).then((resp)=>{
//     res.send(resp)
//   })
// })
app.get("/active_Category", (req, res) => {
  categories.find({ status: 1 }).then((resp) => {
    res.send(resp);
  });
});
const storages = multer.diskStorage({
  destination: function (req, file, cb) {
    // make directory
    // path change krna hai
    // images/ProductImages
    cb(
      null,"E:/FurShield-main/FurShield-main/Techquiz/clientside/public/images/petsImages"
    );
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //   generate filename
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadsss = multer({ storage: storages });

app.post("/add_Product", uploadsss.single("Image"), async (req, res) => {
  var { name, des, quantity, Price, Status, category } = req.body;
  
  var Image = req.file.filename
  try {
    var nameExisitng = await Petproducts.findOne({ name });
    if (nameExisitng) {
      return res.json({
        success: false,
        message: "product name  is already existing !",
      });
    }
    await Petproducts.create({
      name,
      des,
      quantity,
      Price,
      Image: Image,
      category,
      Status,
    });
    return res.json({
      success: true,
      message: "product is added successfully !",
    });
  } catch (error) {
    return res.json({ success: false, massege: error.message });
  }
});
app.get("/productDetails", (req, res) => {
  Petproducts.find().then((resp) => {
    res.send(resp);
  });
});
app.get("/lowestTohigh", (req, res) => {
  Petproducts.find()
    .sort({ Price: 1 })
    .then((resp) => {
      res.send(resp);
    });
});
app.get("/highTolowest", (req, res) => {
  Petproducts.find()
    .sort({ Price: -1 })
    .then((resp) => {
      res.send(resp);
    });
});
app.get("/search_product/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await Petproducts.find({
    name: { $regex: query, $options: "i" },
  });
  res.send(items);
});
app.delete("/productDel/:id", (req, res) => {
  Petproducts.findByIdAndDelete(req.params.id).then((ress) => {
    res.send("product is deleted !");
  });
});
app.put("/statusproducts/:id", async (req, res) => {
  var find_id = await Petproducts.findById(req.params.id);
  find_id.Status = find_id.Status == 1 ? 0 : 1;
  find_id.save();
  res.send("updated !");
});
app.get("/product_data/:id", (req, res) => {
  Petproducts.findById(req.params.id).then((resp) => {
    res.send(resp);
  });
});
app.put("/updateProduct/:id", (req, res) => {
  Petproducts.findByIdAndUpdate(req.params.id, req.body).then((resp) => {
    res.send(resp);
  });
});

app.put(
  "/update_ProductImage/:id",
  upload.single("Image"),
  async (req, res) => {
    const productId = req.params.id;

    let Image;
    if (req.file) {
      Image = req.file.filename;
    }

    try {
      const updatedProduct = await Petproducts.findByIdAndUpdate(
        productId,
        {
          Image: Image,
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).send("Product not found");
      }

      res.send("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send("Error updating product");
    }
  }
);
app.post("/register_vets", async (req, res) => {
  var { name, email, address, contactNumber } = req.body;

  try {
    var emailExisting = await vets.findOne({ email });
    if (emailExisting) {
      return res.json({
        success: false,
        massege: "email is already register !",
      });
    }
    var numberExisting = await vets.findOne({ contactNumber });
    if (numberExisting) {
      return res.json({
        success: false,
        massege: "number is already register !",
      });
    }
    var Otp = String(Math.floor(100000 + Math.random() * 900000));
    var verifyOptExpireAt = Date.now() + 24 * 60 * 60 + 10000;
    const hashedPassword = await bcrypt.hash(req.body.hash_password, 10);
    var newUser = await vets.create({
      name,
      contactNumber:contactNumber,
      email: email,
    address,
      verifyOpt: Otp,
      verifyOptExpireAt: verifyOptExpireAt,
   
      hash_password: hashedPassword,
    });



    // for sending the Email
    var mailOptions = {
      from: "akashwaghella@gmail.com",
      to: email,
      subject: `welcome to ${websiteName}`,
      text: `weclome to ${websiteName}.your account is created With email id :${email} and please verify the account with this  OPT  ${Otp} `,
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      massege: "Vaterinarian is registered succesfully !",
    });
  } catch (error) {
    return res.json({ success: false, massege: error.message });
  }
});
app.get("/fetch_vets", (req, res) => {
  vets.find().then((rerp) => {
    res.send(rerp);
  });
});
app.get("/search_vetes/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await vets.find({
   
    email: { $regex: query, $options: "i" },
  });
  res.send(items);
});
app.delete("/delvetes/:id", (req, res) => {
  vets.findByIdAndDelete(req.params.id).then(() => {
    res.send("delete !");
  });
});
app.put("/statusvetes/:id", async (req, res) => {
  var find_id = await vets.findById(req.params.id);
  find_id.status = find_id.status == 1 ? 0 : 1;
  find_id.save();
  res.send("updated !");
});

app.post("/register_shelter", async (req, res) => {
  var {Sheltername, name, email, address, contactNumber ,contactpersonName} = req.body;

  try {
    var emailExisting = await animalShelters.findOne({ email });
    if (emailExisting) {
      return res.json({
        success: false,
        massege: "email is already register !",
      });
    }

    var numberExisting = await animalShelters.findOne({ contactNumber });
    if (numberExisting) {
      return res.json({
        success: false,
        massege: "number is already register !",
      });
    }
    var Otp = String(Math.floor(100000 + Math.random() * 900000));
    var verifyOptExpireAt = Date.now() + 24 * 60 * 60 + 10000;
    const hashedPassword = await bcrypt.hash(req.body.hash_password, 10);
    var newUser = await animalShelters.create({
     
      contactpersonName,
      contactNumber:contactNumber,
      email: email,
    address,
    Sheltername:Sheltername,
      verifyOpt: Otp,
      verifyOptExpireAt: verifyOptExpireAt,
      profile_picture: null,
      hash_password: hashedPassword,
    });



    // for sending the Email
      var mailOptions = {
      from: "akashwaghella@gmail.com",
      to: email,
      subject: `welcome to ${websiteName}`,
      text: `weclome to ${websiteName}.your account is register With email id :${email} and please verify the account with this  OPT  ${Otp} `,
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      massege: "Vaterinarian is registered succesfully !",
    });
  } catch (error) {
    return res.json({ success: false, massege: error.message });
  }
});
// app.get("/test-email", async (req, res) => {
//   try {
//     await transporter.sendMail({
//       from: "966313001@smtp-brevo.com",   // yahi verified hona chahiye
//       to: "mahnnooranwar191@gmail.com", // apna email
//       subject: "SMTP Test",
//       text: "Hello! This is a test email from Brevo SMTP.",
//     });
//     res.send("✅ Email sent!");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("❌ Email failed: " + err.message);
//   }
// });

app.get("/search_shelter/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await animalShelters.find({
    
    Sheltername: { $regex: query, $options: "i" },
  });
  res.send(items);
});
app.get("/fetch_shelter", (req, res) => {
  animalShelters.find().then((rerp) => {
    res.send(rerp);
  });
});
app.delete("/delShelter/:id", (req, res) => {
  animalShelters.findByIdAndDelete(req.params.id).then(() => {
    res.send("delete !");
  });
});
app.put("/statusShelter/:id", async (req, res) => {
  var find_id = await animalShelters.findById(req.params.id);
  find_id.status = find_id.status == 1 ? 0 : 1;
  find_id.save();
  res.send("updated !");
});
  app.delete("/fetchOrderdel/:id",(req,res)=>{
    order_Model.findByIdAndDelete(req.params.id).then((r)=>{
      res.send("deleted")
    })
  })
app.get("/search_order/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await order_Model.find({
   
    email: { $regex: query, $options: "i" },
  });
  res.send(items);
});
app.get("/fetchOrder",(req,res)=>{
    order_Model.find().then((r)=>{
      res.send(r)
    })
  })
    app.get("/fetchOrderData/:id",(req,res)=>{
    order_Model.findById(req.params.id).then((r)=>{
      res.send(r)
    })
  })
  // to update Status of order
  app.put("/Order_Status/:id", async (req,res)=>{
    var orderStatus = await order_Model.findById(req.params.id);
    orderStatus.status= req.body.status;
    await  orderStatus.save(); 
     res.send("Status Updated !")
  }) 
// for activite vets 


  // ------------------------------------------- Animal shelter and vetes
app.post("/login_vets", async (req, res) => {
  const { email, hash_password } = req.body;

  if (!email || !hash_password) {
    return res.json({ success: false, messege: "All input is required!" });
  }

  try {
    const findEmail = await vets.findOne({ email });

    if (!findEmail) {
      return res.json({ success: false, messege: "Email is invalid" });
    }

    const isPasswordValid = await bcrypt.compare(hash_password, findEmail.hash_password);
    if (!isPasswordValid) {
      return res.json({ success: false, messege: "Password is invalid" });
    }

    if (!findEmail.isverify) {
      return res.json({ success: false, messege: "Your account is not verified" });
    }

    if (findEmail.status === 0) {
      return res.json({ success: false, messege: "Your account is deactivated by Admin" });
    }

    const userToken = jwt.sign({ id: findEmail._id }, jwt_SecretKey, { expiresIn: "2d" });

    res.cookie("token", userToken, {
      httpOnly: false,
      secure: false,
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, messege: userToken });

  } catch (error) {
    return res.json({ success: false, messege: error.message });
  }
});

app.post("/login_shelteranimal", async (req, res) => {
  const { email, hash_password } = req.body;

  if (!email || !hash_password) {
    return res.json({ success: false, messege: "All input is required!" });
  }

  try {
    const findShelter = await animalShelters.findOne({ email });

    if (!findShelter) {
      return res.json({ success: false, messege: "Email is invalid" });
    }

    const isPasswordValid = await bcrypt.compare(hash_password, findShelter.hash_password);
    if (!isPasswordValid) return res.json({ success: false, messege: "Password is invalid" });

    if (!findShelter.isverify) return res.json({ success: false, messege: "Your account is not verified" });

    if (findShelter.status === 0) return res.json({ success: false, messege: "Your account is deactivated by Admin" });

    const userToken = jwt.sign({ id: findShelter._id, role: "shelter" }, jwt_SecretKey, { expiresIn: "2d" });

    res.cookie("token", userToken, {
      httpOnly: false,
      secure: false,
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, messege: userToken, role: "shelter" });

  } catch (error) {
    return res.json({ success: false, messege: error.message });
  }
});

app.get("/profileVetes/:id", (req, res) => {
  vets.findById(req.params.id).then((resp) => {
    res.send(resp);
  });
});
app.put("/UpdateVetes/:id", (req, res) => {
  vets.findByIdAndUpdate(req.params.id,req.body).then((resp) => {
    res.send(resp);
  });
});
app.get("/fetchappoint/:vet_id", async (req, res) => {
  try {
    const appointments = await appointment.find({ vet_id: req.params.vet_id });
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
  app.put("/app_Status/:id", async (req,res)=>{
    var orderStatus = await appointment.findById(req.params.id);
    orderStatus.status= req.body.status;
    await  orderStatus.save(); 
     res.send("Status Updated !")
  }) 
  app.delete("/delapp/:id", (req, res) => {
  appointment.findByIdAndDelete(req.params.id).then(() => {
    res.send("delete !");
  });
});
app.get("/search_app/:vet_id/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await appointment.find({
    vet_id:req.params.vet_id,
    email: { $regex: query, $options: "i" },
  });
  res.send(items);
});
app.post("/vetes/addHealthRecord", async (req, res) => {
  try {
const {
  appointment_id,
  pet_id,
  user_id,
  pet_name,
  vet_id,
  vet_name,

  diagnosis,
  treatment,
  
 
} = req.body;
  

    // Fetch user
    const userData = await appointment.findById(appointment_id);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Fetch pet
  

    // Fetch vet
   
    // Save HealthRecord (appointment)
    const newRecord = await HealthRecord.create({
      user_id: userData.user_id,
      name: userData.first_name,
    appointment_id: userData.appointment_id,
      pet_id: userData.pet_id,
      pet_name: userData.pet_name,
      vet_id: userData.vet_id,
      vet_name: userData.vet_name,
      treatment,
      diagnosis,
     
    
     
    });

    return res.json({
      success: true,
      message: "Health record added successfully",
      data: newRecord
    });

  } catch (error) {
    console.error("HealthRecord Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.get("/vetesrecord/:vet_id", async (req, res) => {
  try {
    const appointments = await HealthRecord.find({ vet_id: req.params.vet_id });
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/search_healthrecord/:vet_id/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await HealthRecord.find({
    vet_id:req.params.vet_id,
    pet_name: { $regex: query, $options: "i" },
  });
  res.send(items);
});
  app.delete("/delhealth/:id", (req, res) => {
  HealthRecord.findByIdAndDelete(req.params.id).then(() => {
    res.send("delete !");
  });
});
app.post("/vetes/addHealthRecord", async (req, res) => {
  try {
const {
  appointment_id,
  pet_id,
  user_id,
  pet_name,
  vet_id,
  vet_name,

  diagnosis,
  treatment,
  
 
} = req.body;
  

    // Fetch user
    const userData = await appointment.findById(appointment_id);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Fetch pet
  

    // Fetch vet
   
    // Save HealthRecord (appointment)
    const newRecord = await HealthRecord.create({
      user_id: userData.user_id,
      name: userData.first_name,
    appointment_id: userData.appointment_id,
      pet_id: userData.pet_id,
      pet_name: userData.pet_name,
      vet_id: userData.vet_id,
      vet_name: userData.vet_name,
      treatment,
      diagnosis,
     
    
     
    });

    return res.json({
      success: true,
      message: "Health record added successfully",
      data: newRecord
    });

  } catch (error) {
    console.error("HealthRecord Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// Edit Health Record API
app.put("/vetes/editHealthRecord/:id", async (req, res) => {
  try {
    const { id } = req.params; // HealthRecord ID
    const {
      appointment_id,
      diagnosis,
      treatment,
    } = req.body;

    // Validate required fields
    if (!appointment_id || !diagnosis || !treatment) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find existing HealthRecord
    const record = await HealthRecord.findById(id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Health record not found" });
    }

    // Fetch appointment to get related user/pet/vet info
    const userData = await appointment.findById(appointment_id);
    if (!userData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Update fields
    record.appointment_id = userData._id;
    record.user_id = userData.user_id;
    record.name = userData.first_name;
    record.pet_id = userData.pet_id;
    record.pet_name = userData.pet_name;
    record.vet_id = userData.vet_id;
    record.vet_name = userData.vet_name;
    record.diagnosis = diagnosis;
    record.treatment = treatment;

    await record.save();

    return res.json({
      success: true,
      message: "Health record updated successfully",
      data: record
    });

  } catch (error) {
    console.error("Edit HealthRecord Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// Get single Health Record by ID
app.get("/vetes/healthRecord/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const record = await HealthRecord.findById(id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Health record not found" });
    }

    return res.json({
      success: true,
      message: "Health record fetched successfully",
      data: record
    });

  } catch (error) {
    console.error("Fetch HealthRecord Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// -----------------------animal shelter
app.get("/profileshelter/:id", (req, res) => {
  animalShelters.findById(req.params.id).then((resp) => {
    res.send(resp);
  });
});

app.put("/updateshelter/:id", (req, res) => {
  animalShelters.findByIdAndUpdate(req.params.id,req.body).then((resp) => {
    res.send("updated !");
  });
});
app.post("/api/shelterpets", uploadPet.single("pet_img"), async (req, res) => {
await shelterPets.create(req.body)
    res.status(201).json({ message: "Pet added successfully" });

});
app.get("/shelterpet/:shelter_id", async (req, res) => {
  try {
    const shelterpet = await  shelterPets.find({ shelter_id: req.params.shelter_id });
    res.json(shelterpet);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/search_pet/:shelter_id/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await shelterPets.find({
    shelter_id:req.params.shelter_id,
    pet_name: { $regex: query, $options: "i" },
  });
  res.send(items);
});
  app.delete("/delShelterpet/:id", (req, res) => {
  shelterPets.findByIdAndDelete(req.params.id).then(() => {
    res.send("delete !");
  });
});
app.get("/shelterpets_find/:id", (req, res) => {
  shelterPets.findById(req.params.id).then((resp) => {
    res.send(resp);
  });
});
app.put("/UpdateShelterpet/:id", uploadPet.single("pet_img"), async (req, res) => {
  try {
    const { name, species, breed, age, gender } = req.body;

    let updatedData = { name, species, breed, age, gender };

    // ✅ agar new image upload hui hai
    if (req.file) {
      updatedData.pet_img = req.file.filename;
    }

    const pet = await shelterPets.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    })

    if (!pet) return res.status(404).json({ message: "Pet not found" });

    res.json({ message: "Pet updated successfully", pet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/adoptionsPET", async (req, res) => {
  try {
    const pets = await shelterPets.find({status:0}); // ❌ no populate
    res.json(pets);
  } catch (err) {
    console.error("❌ Error fetching adoptions:", err);
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/adoption-requests", async (req, res) => {
  try {
    const {pet_name, pet_id, name, email, phone, address, message } = req.body;

    if (!pet_id || !name || !email) {
      return res.status(400).json({ message: "Pet, Name & Email are required" });
    }
var petData= await shelterPets.findById(pet_id)
    const request = new AdoptionRequest({
      pet_id,
      pet_name:petData.name,
      name,
      email,
      phone,
      address,
      message
    });

    await request.save();
    res.status(201).json({ message: "Adoption request submitted", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/adoption-requests", async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().populate("pet_id");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/search_adopt/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await AdoptionRequest.find({
   
    email: { $regex: query, $options: "i" },
  });
  res.send(items);
});
app.delete("/deladopt/:id",(req,res)=>{
  AdoptionRequest.findByIdAndDelete(req.params.id).then((ress)=>{
    res.send("wish list product is deleted !")})
})
app.put("/list/:id", async (req, res) => {
  try {
    // ✅ Find adoption request by its ID
    const orderStatus = await AdoptionRequest.findById(req.params.id);
    if (!orderStatus) {
      return res.status(404).json({ message: "Adoption request not found" });
    }

    // ✅ Get the related pet id
    const petId = orderStatus.pet_id;

    // ✅ Find the pet
    const petStatus = await shelterPets.findById(petId);
    if (!petStatus) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // ✅ Update statuses
    orderStatus.status = "approved";
    petStatus.status = 1; // (1 = adopted or active depending on your logic)

    await orderStatus.save();
    await petStatus.save();

    res.json({ message: "✅ Status Updated!", orderStatus, petStatus });
  } catch (err) {
    console.error("❌ Error updating status:", err);
    res.status(500).json({ error: err.message });
  }
});
app.listen(port, () => {
  console.log(`the application is running now ${port}`);
});
