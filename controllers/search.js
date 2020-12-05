const { response } = require("express");
const User = require("../models/user");
const Hospital = require("../models/hospital");
const Medic = require("../models/medic");

const getAll = async (req, res = response) => {
  const search = req.params.search;
  const regexp = new RegExp(search, "i");

  const [users, hospitals, medics] = await Promise.all([
    User.find({ name: regexp }),
    Hospital.find({ name: regexp }),
    Medic.find({ name: regexp }),
  ]);

  res.json({
    ok: true,
    users,
    hospitals,
    medics,
  });
};

const getCollectionDocuments = async (req, res = response) => {
  const table = req.params.table;
  const search = req.params.search;
  const regexp = new RegExp(search, "i");

  let data = [];

  switch (table) {
    case "medics":
      data = await Medic.find({ name: regexp })
        .populate("user", "name img")
        .populate("hospital", "name img");
      break;
    case "hospitals":
      data = await Hospital.find({ name: regexp }).populate("user", "name img");
      break;
    case "users":
      data = await User.find({ name: regexp });
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "Table must be users, medics or hospitals",
      });
  }

  res.json({
    ok: true,
    results: data,
  });
};

module.exports = {
  getAll,
  getCollectionDocuments,
};
