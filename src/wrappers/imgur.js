const req = require('request');

class imgur {
  constructor(imgur_client_id) {
    this.imgur_client_id = imgur_client_id;
    this.headers = {
      Authorization: `Client-ID ${imgur_client_id}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }

  /**
   * @name uploadBase64Image
   * @description upload one base64 image and return the link
   * @param {string<base64>} picture
   */
  uploadBase64Image(picture) {
    return new Promise((resolve, reject) => {
      const form = {
        image: picture,
        type: 'base64'
      };
      req.post(
        'https://api.imgur.com/3/image',
        {
          headers: this.headers,
          form: form
        },
        (err, res, body) => {
          if (err) {
            reject(err);
          }
          const parsedBody = JSON.parse(body);
          if (parsedBody.data && parsedBody.data.link) {
            resolve(parsedBody.data.link);
          } else {
            reject(res);
          }
        }
      );
    });
  }

  /**
   * @name uploadBase64Images
   * @description upload the array of base64 images and return their links
   * @param {array<string<base64>>} pictures
   */
  uploadBase64Images(pictures) {
    return new Promise((resolve, reject) => {
      const imgurLinks = [];
      const uploadPromises = pictures.map((picture) =>
        this.uploadBase64Image(picture)
      );
      Promise.all(uploadPromises)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}

module.exports = imgur;
