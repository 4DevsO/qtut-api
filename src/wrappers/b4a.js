const Parse = require('parse/node');
const keys = require('../../configs/keys');

//----------------- Init Parse Conn -----------------//
Parse.initialize(keys.b4a_app_id, keys.b4a_js_key, keys.b4a_master_key);
Parse.serverURL = 'https://qtut.back4app.io';

//----------------- Parse Cloud Funcs -----------------//

/**
 * @name hello
 * @description prints Hello World! from b4a
 */
module.exports.hello = () => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('hello')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//----------------- User Functions -----------------//

/**
 * @name userSetAcls
 * @description set acls for current user
 * @param {Parse.User} user
 */
module.exports.userSetAcls = (user) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('userSetAcls', {
      user: user
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name userSignUp
 * @description resolve user sign up
 * @param {string} email
 * @param {string} password
 */
module.exports.userSignUp = (email, password) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('userSignUp', {
      username: email,
      email: email,
      password: password
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name userSignIn
 * @description resolve user sign in
 * @param {string} email
 * @param {string} password
 */
module.exports.userSignIn = (email, password) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('userSignIn', {
      username: email,
      password: password
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name userUpdate
 * @description create/update value for field in user
 * @param {User{objectId, ...params}} user
 */
module.exports.userUpdate = (user) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('userUpdate', {
      user: user
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name userGet
 * @description get User
 * @param {string} userObjectId
 */
module.exports.userGet = (userObjectId) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('userGet', {
      userObjectId: userObjectId
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name userResetPassword
 * @description send request to reset user password
 * @param {string} email
 */
module.exports.userResetPassword = (email) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('userResetPassword', {
      email: email
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name userDelete
 * @description delete user
 * @param {string} userObjectId
 */
module.exports.userDelete = (userObjectId) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('userDelete', {
      userObjectId: userObjectId
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//----------------- Product Functions -----------------//

/**
 * @name productCreate
 * @description create a new product
 * @param {string} name
 * @param {number} price
 * @param {string} description
 * @param {array<string>} pictures
 * @param {array<string>} tags
 * @param {string} creatorObjectId
 */
module.exports.productCreate = (
  name,
  price,
  description,
  pictures,
  tags,
  creatorObjectId
) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('productCreate', {
      name: name,
      price: price,
      description: description,
      pictures: pictures,
      tags: tags,
      creatorObjectId: creatorObjectId
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name productUpdate
 * @description update one product
 * @param {Product{objectId, ...params}} product
 */
module.exports.productUpdate = (product) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('productUpdate', {
      product: product
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name productDelete
 * @description delete one product
 * @param {string} productObjectId
 */
module.exports.productDelete = (productObjectId) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('productDelete', {
      productObjectId: productObjectId
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name productGet
 * @description get one product by it's objectId
 * @param {string} productObjectId
 */
module.exports.productGet = (productObjectId) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('productGet', {
      productObjectId: productObjectId
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name productGetByFilter
 * @description get products by N params
 * @param {filter{...string : any}} filter
 */
module.exports.productGetByFilter = (filter) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('productGetByFilter', {
      filter: filter
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//----------------- Sale Functions -----------------//

/**
 * @name saleCreate
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
module.exports.saleCreate = (
  fixed,
  products,
  mainProductObjectId,
  card,
  closeTime,
  location,
  locationDescription,
  creatorObjectId
) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('saleCreate', {
      fixed: fixed,
      products: products,
      mainProductObjectId: mainProductObjectId,
      card: card,
      closeTime: closeTime,
      location: location,
      locationDescription: locationDescription,
      creatorObjectId: creatorObjectId
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name saleDelete
 * @description delete one sale
 * @param {string} saleObjectId
 */
module.exports.saleDelete = (saleObjectId) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('saleDelete', {
      saleObjectId: saleObjectId
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name saleUpdate
 * @description update one sale
 * @param {Sale{objectId, ...params}} sale
 */
module.exports.saleUpdate = (sale) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('saleUpdate', {
      sale: sale
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name saleGet
 * @description get one sale by objectId
 * @param {string} saleObjectId
 */
module.exports.saleGet = (saleObjectId) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('saleGet', {
      saleObjectId: saleObjectId
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name saleGetByFilter
 * @description get sales by filter
 * @param {filter{...params}} filter
 */
module.exports.saleGetByFilter = (filter) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('saleGetByFilter', {
      filter: filter
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @name saleGetByLocationRadius
 * @description get sales by location proximity
 * @param {Location{latitude, longitude}} location
 * @param {number} radius
 */
module.exports.saleGetByLocationRadius = (location, radius) => {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('saleGetByLocationRadius', {
      location: location,
      radius: radius
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
