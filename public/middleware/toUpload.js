const toUpload = (cloudinary, req) => {
    const promise = new Promise((resolve, reject) => {
        cloudinary.uploader.upload(req.file.path, function(result) {
            if(!result) { reject(error) }
            else { resolve(result) }
        })
    })
    promise.then(result => { console.log(result); return result })
    promise.catch(error => { return error })
    return promise;
}

module.exports = toUpload;