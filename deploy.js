// deploy ./build to s3. Run `node run build` beforehand.

const s3 = require("s3");
const fs = require("fs");
const path = require("path");

// read opts
let opts;
const optsPath = path.join(__dirname, "/deploy-config.json");


function optsFailed() {
  const optsJSON = {
    accessKeyId: "XXX",
    secretAccessKey: "XXX",
    bucket: "XXX",
  };
  fs.writeFileSync(optsPath, JSON.stringify(optsJSON, null, "    "));
  console.log("In order to deploy to AWS you must enter your credentials in" +
    " deploy-config.json.");
}

if (fs.existsSync(optsPath)) {
  opts = JSON.parse(fs.readFileSync(optsPath, "utf-8"));
  if (opts.accessKeyId === "XXX") {
    optsFailed();
    return;
  }
} else {
  optsFailed();
  return;
}

// configure s3 client
const client = s3.createClient({
  s3Options: {
    accessKeyId: opts.accessKeyId,
    secretAccessKey: opts.secretAccessKey,
  },
});

const uploadParams = {
  localDir: path.join(__dirname, "/build"),
  deleteRemoved: true,
  s3Params: {
    Bucket: opts.bucket,
    Prefix: "",
    ACL: "public-read",
  },
};

// perform upload
const uploader = client.uploadDir(uploadParams);
uploader.on("error", (err) => {
  console.error("unable to sync:", err.stack);
});
uploader.on("end", () => {
  console.log("done uploading");
});
