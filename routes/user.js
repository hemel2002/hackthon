require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const MongooseConnection = require("../db/MongooseConnection");
const express = require("express");
const { default: mongoose, model } = require("mongoose");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/enroll/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = "Course Name"; // Replace with actual course name
    const image = "https://example.com/image.jpg"; // Replace with actual image URL
    const amount = 1000; // Replace with actual amount in cents

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course,
              images: image ? [image] : [],
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/successfullyEnrolled?id=${courseId}&userId=${req.session.UserId}`,
      cancel_url: `http://localhost:3000/courseDetails`,
    });

    console.log(session); // Debugging line

    res.redirect(session.url);
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/", (req, res) => {
  res.render("user/user");
});
module.exports = router;
