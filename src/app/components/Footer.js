import React, { Component } from 'react'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section>
        <div className="container">
          <hr />
          <div className="columns">
            <div className="column">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flensfrontu%2F&tabs&width=340&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=245078872972696"
                width="340"
                height="214"
                style={{ border: 'none', overflow: 'hidden', margin: '1rem' }}
                scrolling="no"
                allow="encrypted-media"
              />
            </div>
            <div className="column">
              <img src="https://firebasestorage.googleapis.com/v0/b/lens-front-u-dev.appspot.com/o/images%2Fqr_line.jpg?alt=media&token=629c7679-463a-4ecb-b57e-fd063e631c2f" />
            </div>
            <div className="column">
              <p>
                LENS FRONT U เช่ากล้องเช่าเลนส์เชียงใหม่ ตำบล ช้างเผือก
                อำเภอเมืองเชียงใหม่ เชียงใหม่ 50300
              </p>
              <p>ทุกวัน 18.00-22.00</p>
              <br />
              <p>ติดต่อสอบถามข้อมูล รายละเอียดการเช่า ข้อสงสัยต่าง ๆ</p>
              <p>โทร 091 858 8467</p>
            </div>
          </div>
        </div>
        <nav className="navbar is-primary">
          <div className="navbar-brand container">
            <span className="navbar-item nowrap has-text-pink">
              Copyright 2019 lensfrontu.com | All Rights Reserved | Powered by
              pullptong
            </span>
          </div>
        </nav>
      </section>
    )
  }
}

export default Footer
