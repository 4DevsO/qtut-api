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
router.get('/:productObjectId', (req, res) => {
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

router.post('/update', (req, res) => {
  if (req.body && req.body.product) {
    const product = req.body.product;
    if (typeof product === typeof {}) {
      // IMPLEMENTAR
    } else {
      badRequest(res);
    }
  } else {
    badRequest(res);
  }
});

router.post('/delete', (req, res) => {
  if (req.body && req.body.productObjectId) {
    const productObjectId = req.body.productObjectId;
    if (typeof productObjectId === typeof 'string') {
      // IMPLEMENTAR
    } else {
      badRequest(res);
    }
  } else {
    badRequest(res);
  }
});

// Consultar por Criador

// Consultar por Nome

// Consultar por Tags

// Consultar por Filtro ??? Não entendi

export default router;
