const axios = require("axios");

const searchProduct = async function(productName) {
  const options = {
    method: "GET",
    url: "https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-search-by-keyword-asin",
    params: {
      domainCode: "ca",
      keyword: productName,
      page: "1",
      excludeSponsored: "false",
      sortBy: "relevanceblender",
      withCache: "true",
    },
    headers: {
      "X-RapidAPI-Key": "ZOKgzviffSmshWqa5THF8u7IVUcFp10QXGzjsnAzgfAT9LDvCY",
      "X-RapidAPI-Host": "axesso-axesso-amazon-data-service-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    return {
      error: 0,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
};


const sortProduct = function(productDetails) {
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
    return productDetails;
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  searchProduct, sortProduct,
};
