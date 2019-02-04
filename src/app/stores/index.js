import 'babel-polyfill'
import Product from './product'
import Queue from './queue'
import Banner from './banner'

export default {
  product: new Product(),
  queue: new Queue(),
  banner: new Banner()
}
