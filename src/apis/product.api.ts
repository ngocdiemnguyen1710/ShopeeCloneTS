import { Product, ProductConfig, ProductList } from 'src/types/product.type'
import http from 'src/utils/http'
import { SuccessRespone } from 'src/types/utils.type'

const URL = 'products'
const productApi = {
  getProducts(params: ProductConfig) {
    return http.get<SuccessRespone<ProductList>>(URL, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessRespone<Product>>(`${URL}/${id}`)
  }
}

export default productApi
