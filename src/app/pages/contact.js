import * as React from 'react'
import { Provider } from 'mobx-react'
import store from '../stores'
import 'babel-polyfill'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../../public/style.scss'
import Reviews from '../components/reviews/Reviews'

export default () => (
  <Provider store={store}>
    <main>
      <Header />
      <div className="container" style={{ paddingTop: 2 + 'rem' }}>
        <h2 className="title has-text-light is-size-2 is-uppercase header-title">
          ติดต่อ
        </h2>
        <div className="flex-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3776.767633680727!2d98.9526088144854!3d18.80850606521446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3be486e99af1%3A0xdf1065d0f0475915!2zTEVOUyBGUk9OVCBVIOC5gOC4iuC5iOC4suC4geC4peC5ieC4reC4h-C5gOC4iuC5iOC4suC5gOC4peC4meC4quC5jOC5gOC4iuC4teC4ouC4h-C5g-C4q-C4oeC5iA!5e0!3m2!1sth!2sth!4v1549369068621"
            width="600"
            height="450"
            frameborder="0"
            style={{ border: '0' }}
            allowfullscreen
          />
        </div>
        <div
          className="flex-center"
          style={{ flexDirection: 'column', margin: '1rem' }}
        >
          <h5 className="is-size-5">LENS FRONT U</h5>
          <p className="has-text-centered">
            เช่ากล้องเช่าเลนส์เชียงใหม่ ตำบล ช้างเผือก อำเภอเมืองเชียงใหม่
            เชียงใหม่ 50300
          </p>
          <p>เปิดทำการทุกวัน 18.00-22.00</p>
          <br />
          <p className="has-text-centered">
            ติดต่อสอบถามข้อมูล รายละเอียดการเช่า ข้อสงสัยต่าง ๆ
          </p>
          <p>โทร 091 858 8467</p>
          <p>หรือทาง social media ดังนี้</p>
        </div>
        <div className="social-media-container">
          <div className="flex-center">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flensfrontu%2F&tabs&width=340&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=245078872972696"
              width="340"
              height="214"
              style={{ border: 'none', overflow: 'hidden', margin: '1rem' }}
              scrolling="no"
              allow="encrypted-media"
            />
          </div>
          <div className="flex-center" style={{ flexDirection: 'column' }}>
            <img
              className="line-qr"
              src="https://firebasestorage.googleapis.com/v0/b/lens-front-u-dev.appspot.com/o/images%2Fqr_line.jpg?alt=media&token=629c7679-463a-4ecb-b57e-fd063e631c2f"
            />
            <p className="has-text-centered">Line id: lensfrontu</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  </Provider>
)
