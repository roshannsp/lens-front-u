import React, { Component } from 'react'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section>
        <div className="container">
          <div className="columns">
            <div className="column">
              <p>โปรโมชั่น</p>
              <br />
              <ul>
                <li>- เช่า 7 วัน จ่าย 5 วัน</li>
                <br />
                <li>- เช่า 4 วัน จ่าย 3 วัน</li>
              </ul>
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flensfrontu%2F&tabs&width=340&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=245078872972696"
                width="340"
                height="214"
                style={{ border: 'none', overflow: 'hidden', margin: '1rem' }}
                scrolling="no"
                allow="encrypted-media"
              />
            </div>
            <div className="column">Line Contact</div>
            <div className="column">
              <h3>ติดต่อร้าน LENSFRONTU</h3>
              <p>
                <span>ร้าน Lensfrontu</span>
              </p>
              <p>
                <span>
                  จันทร์-เสาร์ 11.30-22.00น.
                  <br />
                  <span style={{ textDecoration: 'underline' }}>
                    หยุดวันอาทิตย์
                  </span>
                </span>
              </p>
              <p>
                <span>ติดต่อสอบถามข้อมูล รายละเอียดการเช่า ข้อสงสัยต่างๆ</span>
              </p>
              <p>
                <span>โทร 08x-xxx-xxxx</span>
              </p>
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
