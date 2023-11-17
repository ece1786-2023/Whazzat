const express = require("express");
const router = express.Router();
// const qrService = require("../services/qr");
const searchApi = require("../services/searchAPI");
const model = require("../services/modelResult");
// const finalReminder = require("../services/finalReminder");
// const emailService = require("../services/emailService");
// const events = require("../services/events");
// const moment = require("moment");

router.post("/product", async (req, res, next) => {
  // console.log(req.body.product_name, req.body);
  try {
    const productNames = await model.modelOutput(req.body.search_prompt);
    console.log(productNames);
    let productDetails = [];
    // let newdata = [];
    for (let i=0; i<productNames.data.length; i++) {
      console.log(productNames.data[i]);
      const productData = await searchApi.searchProduct(productNames.data[i]);
      const productList = productData.data.searchProductDetails;
      productList.forEach((element) => {
        element.productRating = element.productRating?parseFloat(element.productRating.split(" ")[0]):null;
        element.dpUrl = "https://amazon.ca" + element.dpUrl;
        productDetails.push(element);
      });
      // productDetails.push(productData.data.searchProductDetails.map((a)=>a));
    }

    const sorterAsc = (sortBy) => (a, b) => a[sortBy] > b[sortBy] ? 1 : -1;
    const sorterDesc = (sortBy) => (a, b) => a[sortBy] < b[sortBy] ? 1 : -1;

    productDetails = productDetails.sort(sorterDesc("countReview"));
    productDetails = productDetails.sort(sorterDesc("productRating"));
    const response = productDetails.sort(sorterAsc("price"));

    if (response.error) {
      res.status(400).send({
        status: "Error",
        success: false,
        data: response,
      });
    } else {
      if (response) {
        res.send({
          status: "Success",
          success: true,
          data: response?response:{},
        });
      } else {
        res.status(200).send({
          status: "Not found",
          success: false,
          data: {},
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      status: "Error",
      success: false,
      data: error.message,
    });
  }
});

module.exports = router;
