For postman

Set to POST - localhost:3000/upload
body - form-data
file as the key because that's what is in the quotations "file"
value, set it to a file and not text


npm install uuid - this is for it putting original file name at the end of uploaded file after it creates a unique name for it. 
remember to import it at the top

31:48 - What the error codes for Multer are


this is the version 2 install
npm install aws-sdk 

var AWS = require('aws-sdk/dist/aws-sdk-react-native)

creating public access for the bucket


click into the bucket you want, then select "permissions"

EDIT - on the block public access and unchecked Block all public access and saved that

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::ah-yeah-bucket-zone/*"
        }
    ]
}

the resource is the arn: of the bucket with a forward slash and a star

you also made the principal "*" for selecting all.

upload input library 

https://react-dropzone.js.org/

rec.body
rec.files when connected to multer

<form action="" encType='multipart/form-data'>
            <input type="file" />
          </form>

Need to make a post that sends everthing in that form onClick and the file will be in the submit