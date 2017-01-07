// deploy ./build to s3. Run `node run build` beforehand.

var s3 = require('s3');
var fs = require('fs');

// read opts
var opts;
var optsPath = __dirname + "/deploy-config.json";

function optsFailed() {
  var optsJSON = {
    accessKeyId: 'XXX',
    secretAccessKey: 'XXX',
    bucket: 'XXX',
  };
  fs.writeFileSync(optsPath, JSON.stringify(optsJSON, null, '    '));
  console.log('In order to deploy to AWS you must enter your credentials in deploy-config.json.')
}

if (fs.existsSync(optsPath)) {
  opts = require(optsPath);
  if (opts.accessKeyId === 'XXX') {
    optsFailed();
    return;
  }
} else {
  optsFailed();
  return;
}

// configure s3 client
var client = s3.createClient({
  s3Options: {
    accessKeyId: opts.accessKeyId,
    secretAccessKey: opts.secretAccessKey,
  },
});

var uploadParams = {
  localDir: __dirname + "/build",
  deleteRemoved: true,
  s3Params: {
    Bucket: opts.bucket,
    Prefix: "",
    ACL: "public-read",
  },
};

// perform upload
var uploader = client.uploadDir(uploadParams);
uploader.on('error', function(err) {
  console.error("unable to sync:", err.stack);
});
uploader.on('end', function() {
  console.log("done uploading");
});