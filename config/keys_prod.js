module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  S3Bucket: process.env.S3_BUCKET,
  mapBoxToken: process.env.MAP_BOX_TOKEN
};