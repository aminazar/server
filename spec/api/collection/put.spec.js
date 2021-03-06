const rp = require('request-promise');
const lib = require('../../../lib/index');
const models = require('../../../mongo/models.mongo');
const error = require('../../../lib/errors.list');
const mongoose = require('mongoose');


describe('Put Collection', () => {

  let productIdsArr = [mongoose.Types.ObjectId(), mongoose.Types.ObjectId(), mongoose.Types.ObjectId()];
  let collectionIds = [];
  let newProduct;
  beforeEach(done => {
    lib.dbHelpers.dropAll().then(res => {
      models['CollectionTest'].create({
        name: 'collection four',
        productIds: [
          productIdsArr[0],
          productIdsArr[1]
        ]
      }).then(res => {
        collectionIds[0] = res._id;

        done();
      });
    }).catch(err => {
      console.log(err);
      done();
    });
  });

  it('should add a new collection ', function (done) {
    this.done = done;
    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL('collection'),
      body: {
        name: 'collection three',
        productIds: [
          productIdsArr[0],
          productIdsArr[1],
          productIdsArr[2]
        ]
      },
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      expect(res.statusCode).toBe(200);

      return models['CollectionTest'].find();
    }).then(res => {
      // console.log("CollectionPutTest@@", res);

      expect(res.length).toEqual(2);
      expect(res[0].productIds.length).toEqual(2);
      expect(res[0].productIds).toContain(productIdsArr[0]);
      expect(res[0].productIds).toNotContain(productIdsArr[2]);
      expect(res[1].productIds.length).toEqual(3);

      done();
    }).catch(lib.helpers.errorHandler.bind(this));
  });

  it('should update collection productIds ', function (done) {
    this.done = done;
    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL('collection'),
      body: {
        // name same name in collection
        name: 'collection four',
        productIds: [
          productIdsArr[0],
          productIdsArr[1],
          productIdsArr[2]
        ]
      },
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      expect(res.statusCode).toBe(200);

      return models['CollectionTest'].find();
    }).then(res => {
      console.log("CollectionPutTest@@", res);

      expect(res.length).toEqual(1);
      expect(res[0].productIds.length).toEqual(3);
      expect(res[0].productIds).toContain(productIdsArr[2]);

      done();
    }).catch(lib.helpers.errorHandler.bind(this));
  });


  it('expect error when name of collection is not defined', function (done) {
    this.done = done;
    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL(`collection`),
      body: {
        // name: 'second name',
        productIds: [
          productIdsArr[0],
        ]
      },
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      this.fail('expect error when name of collection is not defined');

      done();
    }).catch(err => {
      expect(err.statusCode).toBe(error.CollectionNameRequired.status);
      expect(err.error).toBe(error.CollectionNameRequired.message);
      done();
    });
  });

  it('should added product to collection', function (done) {
    this.done = done;
    newProduct = mongoose.Types.ObjectId();
    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL(`collection/product/${collectionIds[0]}/${newProduct}`),
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      expect(res.statusCode).toBe(200);

      return models['CollectionTest'].findById(collectionIds[0]);
    }).then(res => {
      console.log("CollectionTest@@", res);

      expect(res.productIds.length).toEqual(3);
      expect(res.productIds).toContain(newProduct);

      done();
    }).catch(lib.helpers.errorHandler.bind(this));
  });

  it('expect error when cid params is not valid', function (done) {
    this.done = done;
    newProduct = mongoose.Types.ObjectId();
    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL(`collection/product/1/${newProduct}`),
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      this.fail('expect error when cid params is not valid');
      done();
    }).catch(err => {
      // console.log(err);
      expect(err.statusCode).toBe(error.collectionIdIsNotValid.status);
      expect(err.error).toEqual(error.collectionIdIsNotValid.message);
      done();
    });
  });

  it('expect error when pid params is not valid', function (done) {
    this.done = done;
    productId = mongoose.Types.ObjectId();
    rp({
      method: 'put',
      uri: lib.helpers.apiTestURL(`collection/product/${collectionIds[0]}/1`),
      json: true,
      resolveWithFullResponse: true
    }).then(res => {
      this.fail('error when pid is not defined');
      done();
    }).catch(err => {
      console.log(err);
      expect(err.statusCode).toBe(error.productIdIsNotValid.status);
      expect(err.error).toEqual(error.productIdIsNotValid.message);
      done();
    });
  });

});
