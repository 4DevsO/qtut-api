import express from 'express';
import * as b4a from '~/wrappers/b4a';
import keys from '../../configs/keys';
import Imgur from '~/wrappers/imgur';
import { success, internalError, badRequest } from '~/helpers/status';

const router = express.Router();
const imgur = new Imgur(keys.imgur_client_id);

/**
 * @name /product/:productObjectId
 * @description get product by productObjectId
 * @param {string} productObjectId
 */
router.get('/get/:productObjectId', (req, res) => {
  if (req.param != undefined && req.params.productObjectId != undefined) {
    const productObjectId = req.params.productObjectId;
    if (typeof productObjectId === typeof 'string') {
      b4a
        .productGet(productObjectId)
        .then((result) => success(res, result))
        .catch((err) => internalError(res, err));
    } else {
      badRequest(res, 'productObjectId must be a string');
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /product/create
 * @description create one product
 * @param {string} name
 * @param {number} price
 * @param {string} description
 * @param {array<string<base64>>} pictures
 * @param {array<string>} tags
 * @param {string} creatorObjectId
 */
router.post('/create', (req, res) => {
  if (req.body != undefined) {
    const {
      creatorObjectId,
      name,
      price,
      pictures,
      tags,
      description
    } = req.body;

    const isProduct =
      creatorObjectId &&
      name &&
      price &&
      pictures &&
      pictures.length >= 1 &&
      tags &&
      tags.length >= 1 &&
      description;

    if (isProduct) {
      imgur
        .uploadImages(pictures)
        .then((imgurPictures) => {
          if (imgurPictures.length > 0) {
            b4a
              .productCreate(
                name,
                price,
                description,
                imgurPictures,
                tags,
                creatorObjectId
              )
              .then((product) => success(res, product))
              .catch((err) => internalError(res, err));
          } else {
            badRequest(res, 'Not enough pictures');
          }
        })
        .catch((err) => internalError(res, err));
    } else {
      badRequest(res);
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /product/update/:productObjectId
 * @description updates info of one product
 * @param {...params} body
 * @param {string} productObjectId
 */
router.post('/update/:productObjectId', (req, res) => {
  if (req.body && req.params && req.params.productObjectId) {
    const data = req.body;
    const productObjectId = req.params.productObjectId;
    const allowedFields = Object.keys(data).filter(
      (field) => field !== 'user' && field !== 'userObjectId'
    );
    if (allowedFields.length > 0) {
      const productToBeUpdated = allowedFields.reduce((newProduct, field) => {
        newProduct[field] = data[field];
        return newProduct;
      }, {});
      productToBeUpdated['objectId'] = productObjectId;
      if (productToBeUpdated['pictures']) {
        imgur
          .uploadImages(productToBeUpdated['pictures'])
          .then((pictures) => {
            productToBeUpdated['pictures'] = pictures;
            b4a
              .productUpdate(productToBeUpdated)
              .then((result) => success(res, result))
              .catch((err) => internalError(res, err));
          })
          .catch((err) => internalError(res, err));
      } else {
        b4a
          .productUpdate(productToBeUpdated)
          .then((result) => success(res, result))
          .catch((err) => internalError(res, err));
      }
    } else {
      badRequest(res, 'Must pass at least one allowed field');
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /product/delete/:productObjectId
 * @description delete one product
 * @param {string} productObjectId
 */
router.post('/delete/:productObjectId', (req, res) => {
  if (req.params && req.params.productObjectId) {
    const productObjectId = req.params.productObjectId;
    b4a
      .productDelete(productObjectId)
      .then((result) => success(res, result))
      .catch((err) => internalError(res, err));
  } else {
    badRequest(res);
  }
});

/**
 * @name /product/list?name&tags&userObjectId
 * @description list products by user or/and tags or/and name or/and price
 * @param {string} name?
 * @param {array<string>} tags?
 * @param {string} userObjectId?
 * @param {number} price
 */
router.get('/list', (req, res) => {
  const query = req.query;
  if (Object.keys(query).length > 0) {
    const filter = Object.keys(query).reduce((newFilter, field) => {
      newFilter[field] = query[field];
      return newFilter;
    }, {});
    b4a
      .productGetByFilter(filter)
      .then((result) => success(res, result))
      .catch((err) => internalError(res, err));
  } else {
    badRequest(res);
  }
});

export default router;
