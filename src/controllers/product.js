import express from 'express';
import { success, internalError, badRequest } from '~/helpers/status';

const router = express.Router();

router.get('/:productObjectId', (req, res) => {
  if (req.param && req.params.productObjectId) {
    const productObjectId = req.params.productObjectId;
    if (typeof productObjectId === typeof 'string') {
      // IMPLEMENTAR
    } else {
      badRequest(res);
    }
  } else {
    badRequest(res);
  }
});

router.post('/create', (req, res) => {
  if (req.body) {
    const { userObjectId, name, price, picture, tags, description } = req.body;

    const isProduct =
      userObjectId && name && price && picture && tags && description;

    if (isProduct) {
      // IMPLEMENTAR
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
