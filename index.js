const express = require("express");
const axios = require("axios");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Use morgan for logging HTTP requests (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Helper functions
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isPerfect = (num) => {
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num && num !== 1;
};

const isArmstrong = (num) => {
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  return digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0) === num;
};

const sumDigits = (num) => {
  return num
    .toString()
    .split("")
    .map(Number)
    .reduce((sum, digit) => sum + digit, 0);
};

const getFunFact = async (num) => {
  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
    return response.data.text;
  } catch (error) {
    return "No fun fact available.";
  }
};

// Route
app.get("/api/v1/classify-number", async (req, res) => {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({
      error: true,
      message:
        "Please provide a number in the query parameter. Example: /api/v1/classify-number?number=371",
    });
  }

  if (isNaN(number) || !Number.isInteger(Number(number))) {
    return res.status(400).json({ number, error: true });
  }

  const num = parseInt(number, 10);
  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  // const funFact = await getFunFact(num);
  const [funFact, isPrimeResult, isPerfectResult] = await Promise.all([getFunFact(num), Promise.resolve(isPrime(num)), Promise.resolve(isPerfect(num))]);

  res.status(200).json({
    number: num,
    is_prime: isPrimeResult,
    is_perfect: isPerfectResult,
    properties,
    digit_sum: sumDigits(num),
    fun_fact: funFact,
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
