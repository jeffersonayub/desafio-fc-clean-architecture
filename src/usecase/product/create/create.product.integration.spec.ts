import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe('Integration test create product use case', () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });


  afterEach(async () => {
    await sequelize.close(); 
  });

  it('should create a product type (a)', async () => {

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      name: "Product A",
      price: 1,
      type: "a"
    }

    const output = {
      id: expect.any(String),
      name: "Product A",
      price: 1
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })

  it('should create a product type (b)', async () => {

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      name: "Product B",
      price: 2,
      type: "b"
    }

    const output = {
      id: expect.any(String),
      name: "Product B",
      price: 4
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })

})