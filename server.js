// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const nodemailer = require('nodemailer');
const Stripe = require('stripe');

// Init Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve frontend build if exists
const frontendPath = path.join(__dirname, 'frontend', 'build');
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Mock products (replace with real data from rubrunner.com)
const products = [
  {
    id: 1,
    name: "Smoky BBQ Rub",
    price: 1099, // in cents
    description: "A perfect balance of sweet, smoky, and savory for any grill master.",
    ingredients: "Brown sugar, paprika, garlic powder, onion powder, spices",
    image: "/images/smoky-bbq.jpg"
  },
  {
    id: 2,
    name: "Spicy Cajun Seasoning",
    price: 999,
    description: "Bring the heat with our bold Cajun spice blend.",
    ingredients: "Papri
