const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({ 
  cloud_name: 'dfos7xbwg',
  api_key: '221674848975436', 
  api_secret: 'hTBETFfor22yIXNdOwpn5DUpzuo' 
})

const directories = ['css', 'js']

const path = './build/static/'

directories.forEach(dir => {
  const files = fs.readdirSync(path + dir)
  // console.log(files)
  files.forEach(file => {
    cloudinary.v2.uploader.upload(`${path}${dir}/${file}`, { resource_type: "raw", folder: `static/${dir}`, use_filename: true, unique_filename: false }, function (error, result) {
      if(error) {
        console.log(error)
      }
    })
  })
})
