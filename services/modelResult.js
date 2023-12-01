// const moment = require("moment");

// const jwt = require("jsonwebtoken");

const modelOutput = async function(prompt) {
  // const supabase = service.supabaseAdminClient;

  // const axios = require("axios");

  // const options = {
  //   method: "GET",
  //   url: "https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-search-by-keyword-asin",
  //   params: {
  //     domainCode: "ca",
  //     keyword: productName,
  //     page: "1",
  //     excludeSponsored: "false",
  //     sortBy: "relevanceblender",
  //     withCache: "true",
  //   },
  //   headers: {
  //     "X-RapidAPI-Key": "ZOKgzviffSmshWqa5THF8u7IVUcFp10QXGzjsnAzgfAT9LDvCY",
  //     "X-RapidAPI-Host": "axesso-axesso-amazon-data-service-v1.p.rapidapi.com",
  //   },
  // };

  try {
    // const response = await axios.request(options);
    // console.log(response.data);
    const response = {
      "data": ["Fork", "Spoon"],
    };
    return {
      error: 0,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  modelOutput,
};
