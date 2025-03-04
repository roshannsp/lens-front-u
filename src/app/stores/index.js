import 'babel-polyfill'
import Product from './product'
import Queue from './queue'
import Banner from './banner'
import Instruction from './instruction'
import Promotion from './promotion'
import Review from './review'
import User from './user'
import QRCode from './qrcode'

export default {
  product: new Product(),
  queue: new Queue(),
  banner: new Banner(),
  instruction: new Instruction(),
  promotion: new Promotion(),
  review: new Review(),
  user: new User(),
  qrcode: new QRCode(),
}
