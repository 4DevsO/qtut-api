import express from 'express';
import * as b4a from '~/wrappers/b4a';
import { success, internalError, badRequest } from '~/helpers/status';

const router = express.Router();

/**
 * @name /sale/get/:saleObjectId
 * @description get sale by saleObjectId
 * @param {string} saleObjectId
 */
router.get('/get/:saleObjectId', (req, res) => {
  if (req.param != undefined && req.params.saleObjectId != undefined) {
    const saleObjectId = req.params.saleObjectId;
    if (typeof saleObjectId === typeof 'string') {
      b4a
        .saleGet(saleObjectId)
        .then((result) => success(res, result))
        .catch((err) => internalError(res, err));
    } else {
      badRequest(res, 'saleObjectId must be a string');
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /sale/update/:saleObjectId
 * @description updates info of one sale
 * @param {...params} body
 * @param {string} saleObjectId
 */
router.post('/update/:saleObjectId', (req, res) => {
  if (req.body && req.params && req.params.saleObjectId) {
    const data = req.body;
    const saleObjectId = req.params.saleObjectId;
    const allowedFields = Object.keys(data).filter(
      (field) => field !== 'user' && field !== 'userObjectId'
    );
    if (allowedFields.length > 0) {
      const saleToBeUpdated = allowedFields.reduce((newsale, field) => {
        newsale[field] = data[field];
        return newsale;
      }, {});
      saleToBeUpdated['objectId'] = saleObjectId;
      b4a
        .saleUpdate(saleToBeUpdated)
        .then((result) => success(res, result))
        .catch((err) => internalError(res, err));
    } else {
      badRequest(res, 'Must pass at least one allowed field');
    }
  } else {
    badRequest(res);
  }
});

/**
 * @name /sale/delete/:saleObjectId
 * @description delete one sale
 * @param {string} saleObjectId
 */
router.post('/delete/:saleObjectId', (req, res) => {
  if (req.params && req.params.saleObjectId) {
    const saleObjectId = req.params.saleObjectId;
    b4a
      .saleDelete(saleObjectId)
      .then((result) => success(res, result))
      .catch((err) => internalError(res, err));
  } else {
    badRequest(res);
  }
});

/**
 * @name /sale/list?location&tags&userObjectId&productName
 * @description list sales by location or/and tags or/and user or/and productName
 * @param {[[latitude, longitude], radius]} location?
 * @param {array<string>} tags?
 * @param {string} userObjectId?
 * @param {number} productName
 */
router.get('/list', (req, res) => {
  const query = req.query;
  if (Object.keys(query).length > 0) {
    const filter = Object.keys(query).reduce((newFilter, field) => {
      if (field == 'location') {
        const [coordinates, radius] = JSON.parse(query[field]);
        const location = {
          latitude: coordinates[0],
          longitude: coordinates[1]
        };

        newFilter[field] = { location, radius };
        return newFilter;
      } else if (field == 'active') {
        newFilter[field] = query[field].toLowerCase() == 'true' ? true : false;
        return newFilter;
      } else if (field == 'productName') {
        return newFilter;
      }
      newFilter[field] = query[field];
      return newFilter;
    }, {});

    b4a
      .saleGetByFilter(filter)
      .then((result) => {
        if (query['productName']) {
          const saleResults = result.filter((sale) => {
            return sale.products.some((product) => {
              return product.name
                .toLowerCase()
                .includes(query['productName'].toLowerCase());
            });
          });

          success(res, saleResults);
        } else {
          success(res, result);
        }
      })
      .catch((err) => internalError(res, err));
  } else {
    badRequest(res);
  }
});

/**
 * @name /sale/create
 * @description create a new sale
 * @param {boolean} fixed
 * @param {array<string>} products
 * @param {string} mainProductObjectId
 * @param {boolean} card
 * @param {date} closeTime
 * @param {Location{latitude, longitude}} location
 * @param {string} locationDescription
 * @param {string} creatorObjectId
 */
router.post('/create', (req, res) => {
  if (req.body != undefined) {
    const {
      fixed,
      products,
      mainProductObjectId,
      card,
      closeTime,
      location,
      locationDescription,
      creatorObjectId
    } = req.body;

    const isSale =
      fixed &&
      products.length >= 1 &&
      mainProductObjectId &&
      card &&
      closeTime &&
      location &&
      locationDescription &&
      creatorObjectId;

    if (isSale) {
      b4a
        .saleCreate(
          fixed,
          products,
          mainProductObjectId,
          card,
          closeTime,
          location,
          locationDescription,
          creatorObjectId
        )
        .then((sale) => success(res, sale))
        .catch((err) => internalError(res, err));
    } else {
      badRequest(res);
    }
  } else {
    badRequest(res);
  }
});

export default router;
