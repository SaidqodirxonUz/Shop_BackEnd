const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../db");
const config = require("../../shared/config");

/**
 * Post users
 * 1. Yangi users qo'shishni faqat admin va super_admin qila olishi kerak
 * @param {express.Request} req
 * @param {express.Response} res
 */
const postUsers = async (req, res) => {
  try {
    const { first_name, last_name, role, username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db("users")
      .insert({
        first_name,
        last_name,
        role,
        username,
        password: hashedPassword,
      })
      .returning("*");

    res.status(201).json({
      user: result[0],
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * Get list of users
 * 1. Login qilgan hamma Adminlar ko'ra olishi mumkin
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUsers = async (req, res) => {
  try {
    const {
      role,
      q,
      offset = 0,
      limit = 5,
      sort_by = "id",
      sort_order = "desc",
    } = req.query;
    const dbQuery = db("users").select(
      "id",
      "first_name",
      "last_name",
      "role",
      "username"
    );

    if (role) {
      dbQuery.where({ role });
    }
    if (q) {
      dbQuery
        .andWhereILike("first_name", `%${q}%`)
        .orWhereILike("last_name", `%${q}%`);
    }

    const total = await dbQuery.clone().count().groupBy("id");

    dbQuery.orderBy(sort_by, sort_order);
    dbQuery.limit(limit).offset(offset);

    const users = await dbQuery;

    res.status(200).json({
      users,
      pageInfo: {
        total: total.length,
        offset,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * Get single users
 * 1. Login qilgan hamma Adminlar ko'ra olishi mumkin
 * @param {express.Request} req
 * @param {express.Response} res
 */
const showUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await db("users")
      .select("id", "first_name", "last_name", "role", "username")
      .where({ id })
      .first();

    if (!users) {
      return res.status(404).json({
        error: "Admin topilmadi.",
      });
    }

    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * Login users
 * Admin tizimga kirish uchun login qilishi mumkin
 * @param {express.Request} req
 * @param {express.Response} res
 */
const loginUsers = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await db("users")
      .where({ username })
      .select("id", "password", "role")
      .first();

    if (!existing) {
      return res.status(401).json({
        error: "Username yoki password xato.",
      });
    }

    const match = await bcrypt.compare(password, existing.password);

    if (!match) {
      return res.status(401).json({
        error: "Username yoki password xato.",
      });
    }

    const token = jwt.sign(
      { id: existing.id, role: existing.role },
      config.jwt.secret,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * Update users
 * 1. Faqat super_admin va admin boshqa Adminlarni ma'lumotlarini tahrirlay oladi
 * @param {express.Request} req
 * @param {express.Response} res
 */
const patchUsers = async (req, res) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;

    const existing = await db("users").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} idli Admin topilmadi.`,
      });
    }

    if (changes.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(changes.password, salt);
      changes.password = hashedPassword;
    }

    const updated = await db("users")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "first_name", "last_name", "role", "username"]);

    res.status(200).json({
      updated: updated[0],
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * Delete users
 * 1. Faqat super_admin va admin boshqa Adminlarni o'chira oladi
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await db("users").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} idli Admin topilmadi.`,
      });
    }

    const deleted = await db("users")
      .where({ id })
      .delete()
      .returning(["id", "first_name", "last_name", "role", "username"]);

    res.status(200).json({
      deleted: deleted[0],
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = {
  postUsers,
  getUsers,
  showUsers,
  loginUsers,
  patchUsers,
  deleteUsers,
};

// admin
