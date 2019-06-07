import React, { Component } from 'react'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section style={{ paddingTop: '1rem' }}>
        <div className=" has-background-primary">
          <div className="container">
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
                <img src="https://firebasestorage.googleapis.com/v0/b/lensfrontu-prod.appspot.com/o/images%2Fqr_line_lensfrontu.jpg?alt=media&token=637329d9-1e62-463f-b6c8-00904b67c999" />
              </div>
              <div className="column">
                <h5 className="is-size-5">LENS FRONT U</h5>
                <p>เช่ากล้องเช่าเลนส์เชียงใหม่</p>
                <p>
                  ตึกแถวติดโรงเรียน มุทิตาช ประชารักษ์ ซอยทางเข้าวัดประทานพร
                </p>
                <p>เปิดทำการทุกวัน 11.00-20.00</p>
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
        </div>
      </section>
    )
  }
}

export default Footer
