const fs = require("fs");
const atob = require("atob");

function convertToOgg(file) {
  //   console.log("blob: ", JSON.parse(blobString.blob));
  let filename = file.filename;
  let path = file.path;
  console.log("filename:", filename);

  fs.writeFileSync("new_recording.ogg", path, "utf8", err => {
    if (err) {
      console.log("there was an error....");
    } else {
      console.log("file written");
    }
  });

  //   const buff = Buffer.from(data);

  //   ArrayBuffer;

  //   console.log("buf:", data);
  //   var fileReader = new FileReader();
  //   console.log("line 8");
  //   fileReader.onload = () => {
  //     fs.writeFileSync("recording.ogg", Buffer.from(blob2));
  //   };

  //   fileReader.readAsArrayBuffer(blob);

  //   const path = `${__dirname}/../assets/record.ogg`;

  //   fs.writeFileSync(path, buff);
}

module.exports = convertToOgg;
