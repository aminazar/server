/**
 * Created by Eabasir on 30/01/2018.
 */

let adminOnly = new Error("Only admin can do this.");
adminOnly.status = 403;

let badPass = new Error("Incorrect password");
badPass.status = 401;

let noUser = new Error('Person not found');
noUser.status = 400;

let noPass = new Error('No password is set up');
noPass.status = 500;

let noAccess = new Error('No access to this functionality');
noAccess.status = 403;

let invalidId= new Error('id is not valid');
invalidId.status = 403;

let productNameRequired = new Error("Product name is not specified");
productNameRequired.status = 404;

let productTypeRequired = new Error("Product type is not specified");
productTypeRequired.status = 404;

let productBrandRequired = new Error("Product brand is not specified");
productBrandRequired.status = 404;

let productIdRequired = new Error("Product id is not specified");
productIdRequired.status = 404;

let productBasePriceRequired = new Error("Product base price is not specified");
productBasePriceRequired.status = 404;

let productColorIdRequired = new Error("Product color id is not specified");
productColorIdRequired.status = 404;

let productTagIdRequired = new Error("Product tag id is not specified");
productTagIdRequired.status = 404;

let productColorImagesRequired = new Error("Product color images are not specified");
productColorImagesRequired.status = 404;

let productColorNotExist = new Error("This product color is not exist for this product");
productColorNotExist.status = 404;

let productInstanceSizeRequired = new Error("Product instance size is not specified");
productInstanceSizeRequired.status = 404;

let productInstanceNotExist = new Error("This product instance is not exist for this product");
productInstanceNotExist.status = 404;

let productInstanceIdRequired = new Error("product instance id is not specified");
productInstanceIdRequired.status = 404;

let productInstanceCountRequired = new Error("product instance count is not specified");
productInstanceCountRequired.status = 404;

let productInstanceWarehouseIdRequired = new Error("product instance warehouse id is not specified");
productInstanceWarehouseIdRequired.status = 404;

let collectionIdIsNotValid = new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
collectionIdIsNotValid.status = 500;

let productIdIsNotValid = new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
productIdIsNotValid.status = 500;

let CollectionNameRequired = new Error("Collection validation failed: name: Path `name` is required.");
CollectionNameRequired.status = 404;

let badUploadedFile = new Error("file has no data or path");
badUploadedFile.status = 404;

module.exports = {
  adminOnly,
  badPass,
  noUser,
  noPass,
  noAccess,
  invalidId,
  productIdRequired,
  productNameRequired,
  productTypeRequired,
  productBrandRequired,
  productBasePriceRequired,
  productColorIdRequired,
  productTagIdRequired,
  productColorImagesRequired,
  productColorNotExist,
  productInstanceNotExist,
  productInstanceSizeRequired,
  productInstanceIdRequired,
  productInstanceCountRequired,
  productInstanceWarehouseIdRequired,
  badUploadedFile,
  collectionIdIsNotValid,
  CollectionNameRequired,
  productIdIsNotValid
};
