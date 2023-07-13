const express = require("express");
require("dotenv/config");
const jwt = require("jsonwebtoken");

/**
 * Used to check if user is authenticated
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log(payload);
    if (payload.role != "admin") {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
};
module.exports = isAdmin;
