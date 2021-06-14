const AWS = require('aws-sdk');

AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
        console.log('Access key:', AWS.config.credentials.accessKeyId);
    }
});

const lastModified = '2021-06-14T13:39:59.000Z';
console.log('lastModified: ', lastModified);
const params = {
    Bucket: 'mariia-ptytsyna-task2',
    Prefix: 'file-1.txt'
};
const s3 = new AWS.S3();

const bucketPromise = s3.listObjectVersions(params).promise();

// Handle promise fulfilled/rejected states
bucketPromise.then(
    function (data) {
        console.log('files: ', data);
        if (data.Versions.length) {
            let fileNoNewerThanGivenDate = data.Versions[0];
            for (let value of data.Versions) {

                const v1 = new Date(value.LastModified)
                const v2 = new Date(lastModified)
                if (v1 < v2) {
                    fileNoNewerThanGivenDate = value;
                    break;
                }
            }
            console.log('fileNoNewerThanGivenDate: ', fileNoNewerThanGivenDate);
        }
    }).catch(
    function (err) {
        console.error(err, err.stack);
    });
