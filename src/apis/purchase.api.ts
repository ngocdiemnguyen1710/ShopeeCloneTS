import { Purchase, PurchaseStatus } from 'src/types/purchase.type'
import { SuccessRespone } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessRespone<Purchase>>(`${URL}/add-to-cart`, body)
  },

  getPurchases(params: { status: PurchaseStatus }) {
    return http.get<SuccessRespone<Purchase[]>>(`${URL}`, {
      params
    })
  },

  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessRespone<Purchase[]>>(`${URL}/buy-products`, body)
  },

  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessRespone<Purchase>>(`${URL}/update-purchase`, body)
  },

  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessRespone<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
