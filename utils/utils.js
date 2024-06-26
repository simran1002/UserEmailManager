
const csv=require("csv-parser");;
const fs=require("fs");
const{createReadStream}=require("fs");
const stream=require("stream");
const path=require("path");


exports.readCsv = (uploadedFile,customPropertiesMap,list) => {
    return new Promise((resolve, reject) => {
      const userData = [];
      const readStream=stream.PassThrough();
      readStream.end(uploadedFile.data);
console.log("Data read")

      readStream
        .pipe(csv())
        .on('data', (data) => {
            console.log("data->");
          let { name, email,city} = data;
          if(email==undefined || email==''){
            email=customPropertiesMap.get("email");
          }
          if(name==undefined || name==''){
            name=customPropertiesMap.get("name");
          }
          if(city==undefined || city==''){
            city=customPropertiesMap.get("city");
          }
            userData.push({ name, email,city ,list });
        })
        .on('end', () => {
          console.log('CSV file successfully processed');
          resolve(userData);
        })
        .on('error', (err) => {
          console.log(err.message);
          reject(err);
        });
    });
  };
