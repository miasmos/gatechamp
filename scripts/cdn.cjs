const fsp = require("fs").promises;
const path = require("path");
const aws = require("aws-sdk");
const md5 = require("md5");
const Queue = require("queue");
const mimetype = require("mime-types");

let errorCount = 0;
const client = new aws.S3({
  endpoint: process.env.DIGITAL_OCEAN_SPACE_ENDPOINT,
});
const queue = new Queue({ autostart: true, concurrency: 5, timeout: 5000 });
const logError = (message) => {
  console.error(message);
  errorCount += 1;
};

async function uploadFile(filename, file, contentType, isPrivate = false) {
  console.log(`upload ${filename} ${md5(file)}`);

  if (!file) {
    console.log(`${filename} was null`);
    return;
  }

  return new Promise((resolve, reject) => {
    client.putObject(
      {
        Body: file,
        Bucket: process.env.DIGITAL_OCEAN_SPACE_NAME,
        Key: filename,
        ...(contentType && { ContentType: contentType }),
        ...(!isPrivate && { ACL: "public-read" }),
      },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
}

async function walkFiles(path, filelist = []) {
  const files = await fsp.readdir(path);
  await Promise.all(
    files.map(async (file) => {
      const stats = await fsp.stat(path + "/" + file);
      if (stats.isDirectory()) {
        filelist = await walkFiles(`${path}/${file}/`, filelist);
      } else {
        filelist.push(`${path}/${file}`);
      }
    })
  );
  return filelist;
}

async function getFolder(path) {
  const exists = await fsp.stat(path);
  if (exists) {
    return walkFiles(path);
  }
  return [];
}

function uploadFiles(folder, files, type) {
  files.forEach((path) => {
    queue.push(async () => {
      const file = await fsp.readFile(path);
      const filename = path.substring(path.lastIndexOf("/") + 1);
      const prefix = typeof folder === "string" ? `${folder}/` : "";
      await uploadFile(
        `${prefix}${filename}`,
        file,
        mimetype.lookup(path),
        false
      );
    });
  });
}

(async () => {
  try {
    const files = await getFolder(path.resolve(__dirname, "../public"));
    await uploadFiles(undefined, files);
  } catch (error) {
    logError(error);
  }

  if (errorCount > 0) {
    process.exit(1);
  }
})();
