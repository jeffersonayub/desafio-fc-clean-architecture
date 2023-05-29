import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import { v4 as uuid } from "uuid";
import Product from "../../../domain/product/entity/product";

export default class CreateProductUseCase {

  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDto
    ): Promise<OutputCreateProductDto> {
    const product = await new Product(uuid() , input.name, input.price);
    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  };
}