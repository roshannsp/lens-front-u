import { observable, action, runInAction } from 'mobx'
import { get, getProduct } from '../services/brand'
import product from '../pages/product'

export default class Brand {
  @observable brands = {}
  @observable product = {}
  @observable getBrandStatus = ''
  @observable getProductStatus = ''

  @action
  get = async () => {
    this.getBrandStatus = 'LOADING'
    try {
      const data = await get()
      runInAction(() => {
        this.brands = data.val()
        this.getBrandStatus = 'SUCCESS'
      })
    } catch (error) {
      runInAction(() => {
        this.getBrandStatus = 'FAILED'
      })
    }
  }

  @action
  set = async brands => {
    try {
      runInAction(() => {
        this.brands = brands
      })
    } catch (error) {
      console.log(error)
    }
  }

  @action
  setProducts = async (brand, products) => {
    try {
      runInAction(() => {
        this.brands[brand].products = products
      })
    } catch (error) {
      console.log(error)
    }
  }

  @action
  getProduct = async (brand, id) => {
    this.getProductStatus = 'LOADING'
    try {
      const data = await getProduct(brand)
      runInAction(() => {
        let products = data.val()
        products = products.filter(product => product.id === id)
        if (products.length > 0) {
          this.product = products[0]
          this.getProductStatus = 'SUCCESS'
        } else {
          this.getProductStatus = 'FAILED'
        }
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.getProductStatus = 'FAILED'
      })
    }
  }
}
