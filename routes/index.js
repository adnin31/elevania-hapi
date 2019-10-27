const Sequelize = require('sequelize');
const sequlize = require('../config/sequelize-setup');

class Routes {
  constructor(server) {
    this.server = server;
    this.products = sequlize.define('products', {
      name: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      }
    });
  }

  getProducts () {
      this.server.route ({
        method: 'GET',
        path: '/products',
        handler: async(req, h) => {
          const products = await this.products.findAll()

          return products;
        }
    })
  }

  addProducts () {
      this.server.route ({
        method: 'POST',
        path: '/product',
        handler: async(req, h) => {
          const product = await this.products.create({
            name: req.payload.name,
            picture: req.payload.picture,
            description: req.payload.description,
            price: req.payload.price,
            createdAt: new Date(),
          })

          return product
        }
    })
  }

  updateProducts () {
    this.server.route ({
      method: 'POST',
      path: '/product/{id}',
      handler: async(req, h) => {
         const product = await this.products.update({
            name: req.payload.name,
            picture: req.payload.picture,
            description: req.payload.description,
            price: req.payload.price,
            updatedAt: new Date(),
          }, {
            where: {
              id: req.params.id,
            },
          })

          return product
      }
    })
  }

  deleteProducts () {
    this.server.route ({
      method: 'DELETE',
      path: '/product/{id}',
      handler: async(req, h) => {
        const product = await this.products.destroy({
          where: {
            id: req.params.id,
          },
        })

        return product
      }
    })
  }


}

module.exports = Routes