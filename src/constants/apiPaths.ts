const API_PATHS = {
  product: "https://8vu5lh7wgf.execute-api.us-east-1.amazonaws.com/prod",
  // CloudFront for EB endpoint http://alexintech-cart-api-prod.us-east-1.elasticbeanstalk.com/api
  // to fix https calls in frontend
  order: "https://dfhrg3g2hmhuo.cloudfront.net/api",
  import: "https://buic89amtj.execute-api.us-east-1.amazonaws.com/prod",
  bff: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  // CloudFront for EB endpoint http://alexintech-cart-api-prod.us-east-1.elasticbeanstalk.com/api
  // to fix https calls in frontend
  cart: "https://dfhrg3g2hmhuo.cloudfront.net/api",
};

export default API_PATHS;
