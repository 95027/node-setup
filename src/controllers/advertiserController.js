const { Advertiser } = require("../models");

const registerAdvertiser = async (req, res, next) => {
  const { name, email, phone, companyName, bussinessCategory } = req.body;
  Advertiser.create({
    name,
    email,
    phone,
    companyName,
    bussinessCategory,
  });
  res.status(200).json({ message: "advertiser registered successfully" });
  try {
  } catch (error) {
    next(error);
  }
};

const getAllAdvertisers = async (req, res, next) => {
  try {
    const advertisers = await Advertiser.findAll();
    res
      .status(200)
      .json({ message: "advertisers fetched successfully", advertisers });
  } catch (error) {
    next(error);
  }
};

const getAdvertiserById = async (req, res, next) => {
  try {
    const advertiser = await Advertiser.findByPk(req.params.id);

    if (!advertiser) {
      return res.status(404).json({ message: "advertiser not found" });
    }
    res
      .status(200)
      .json({ message: "advertiser fetched successfully", advertiser });
  } catch (error) {
    next(error);
  }
};

const destroyAdvertiser = async (req, res, next) => {
  try {
    const advertiser = await Advertiser.findByPk(req.params.id);

    if (!advertiser) {
      return res.status(404).json({ message: "advertiser not found" });
    }
    await advertiser.destroy();

    res.status(200).json({ message: "advertiser destroyed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerAdvertiser,
  getAdvertiserById,
  getAllAdvertisers,
  destroyAdvertiser,
};
