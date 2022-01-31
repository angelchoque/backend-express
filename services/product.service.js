const faker = require('faker');
const boom = require("@hapi/boom");

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {

    const limit = 50;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create({ name, price, image }) {
    const product = {
      id: faker.datatype.uuid(),
      name,
      price,
      image,
    };
    this.products.push(product);
    return product;
  }

  async find() {
    // return this.products
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(this.products)
      }, 1000)
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found')
    }
    if (product.isBlock) {
      throw boom.conflict('product is block')
    }
    return product
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      // throw new Error('product not found')
      throw boom.notFound('product not found')
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.find(item => item.id === id);
    if (index === -1) {
      // throw new Error('product not found')
      throw boom.notFound('product not found')
    }
    this.products.splice(index, 1);
    return { id }
  }
}

module.exports = ProductsServices;
