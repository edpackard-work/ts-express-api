var Product = require('../model/Product');

test("Should be invalid if all fields are empty", done => {
    const product = new Product(); 
    product.validate((err: any) => {
      expect(err).not.toBeNull();
      done();
    });
  });