import React, { Component } from "react";
class Footer extends Component {

    render() {

        return (
            <footer>
                <div className="footer-banner d-none d-md-block d-lg-none">
                    <img src="img/footer-banner.png" alt="" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="footer-title">
                                Hướng dẫn - Chính sách
                  </div>
                            <div className="footer-item">
                                <a href>Hướng dẫn mua online</a>
                                <a href>Hướng dẫn mua trả góp</a>
                                <a href>Chính sách bảo hành</a>
                                <a href>Chính sách đổi trả, nâng đời</a>
                                <a href>Chính sách vận chuyển</a>
                                <a href>Chính sách bảo mật</a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-title">
                                Hỗ trợ khách hàng
                  </div>
                            <div className="footer-item">
                                <p>Tư vấn mua hàng <span className="green font-weight-bold">0982351080</span></p>
                                <p>HTKH, bảo hành <span className="green font-weight-bold">0983591080</span></p>
                                <p>Góp ý khiếu nại <span className="green font-weight-bold">0983591080</span></p>
                                <p className="space">text</p>
                                <p>Địa chỉ: <span className="font-weight-bold">Đại học Sài Gòn</span></p>
                                <p>Thời gian làm việc: <span className="font-weight-bold">8h00-21h30</span></p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-title">
                                Hỗ trợ thanh toán
                  </div>
                            <div className="footer-item">
                                <div className="paypal">
                                    <img src="img/paypal.png" alt="" />
                                </div>
                                <div className="certificate">
                                    <img src="img/congthuong.png" alt="" />
                                </div>
                                <div className="social-media">
                                    <a href><i className="fab fa-facebook" /> <span>Fanpage của Website</span></a>
                                    <a href><i className="fab fa-youtube" /> <span>Kênh Youtube cũa Website</span></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-title">
                                Vị trí cửa hàng di động
                  </div>
                            <div className="web-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669658423677!2d106.68006961428692!3d10.759922362441618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zxJDhuqFpIEjhu41jIFPDoGkgR8Oybg!5e0!3m2!1svi!2s!4v1567766873865!5m2!1svi!2s" width={600} height={450} frameBorder={0} style={{ border: 0 }} allowFullScreen />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );


    }
}

export default Footer;

