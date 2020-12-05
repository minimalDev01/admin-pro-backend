const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");

const fileUpload = (req, res = response) => {
  const type = req.params.type;
  const id = req.params.id;

  // Validate type
  const validTypes = ["hospitals", "medics", "users"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: "Not a medic, hospital or user (type)",
    });
  }

  // Validate that exists a file
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No files were uploaded",
    });
  }

  // Process the file (img in this case)
  const file = req.files.image;

  const cutName = file.name.split(".");
  const fileExtension = cutName[cutName.length - 1];

  // Validate extension
  const validExtension = ["png", "jpg", "jpeg", "gif"];
  if (!validExtension.includes(fileExtension)) {
    res.status(400).json({
      ok: false,
      msg: "Denied extension",
    });
  }

  // Generate file name
  const fileName = `${uuidv4()}.${fileExtension}`;

  // Path for save the image
  const path = `./uploads/${type}/${fileName}`;

  // Move the image
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: "Error while moving the image",
      });
    }

    // Update database
    updateImage(type, id, fileName);

    res.json({
      ok: true,
      msg: "File uploaded",
      fileName,
    });
  });
};

const returnImage = (req, res = response) => {
  const type = req.params.type;
  const photo = req.params.photo;

  const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);

  // Default image
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  returnImage,
};
