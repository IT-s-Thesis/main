import React, { Component } from "react";
import { Link } from 'react-router-dom';
class Footer extends Component {

    render() {

        return (
            <footer>
                <div className="container pb-2">
                    <div className="row text-center text-sm-left">
                        <div className="col-md-3 col-sm-6">
                            
                            <div className="footer-title">
                                Hướng dẫn - Chính sách
                  </div>
                            <div className="footer-item">
                                <Link to="/">Hướng dẫn mua online</Link>
                                <Link to="/">Hướng dẫn mua trả góp</Link>
                                <Link to="/">Chính sách bảo hành</Link>
                                <Link to="/">Chính sách đổi trả, nâng đời</Link>
                                <Link to="/">Chính sách vận chuyển</Link>
                                <Link to="/">Chính sách bảo mật</Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
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
                        <div className="col-md-3 col-sm-6">
                            <div className="footer-title">
                                Hỗ trợ thanh toán
                  </div>
                            <div className="footer-item">
                                <div className="paypal d-flex">
                                    <Link to="/"><img src="img/paypal.png" alt="" /></Link>
                                    <Link to="/"><img src="img/atm.png" alt="" /></Link>
                                    <Link to="/"><img src="img/master.png" alt="" /></Link>
                                </div>
                                <div className="certificate">
                                    <Link to="/"><img src="img/congthuong.png" alt="" /></Link>
                                </div>
                                <div className="social-media">
                                    <Link to="/"><i className="fab fa-facebook" /> <span>Fanpage của Website</span></Link>
                                    <Link to="/"><i className="fab fa-youtube" /> <span>Kênh Youtube cũa Website</span></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="footer-title">
                                Vị trí cửa hàng di động
                  </div>
                            <div className="web-map">
                                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669658423677!2d106.68006961428692!3d10.759922362441618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zxJDhuqFpIEjhu41jIFPDoGkgR8Oybg!5e0!3m2!1svi!2s!4v1567766873865!5m2!1svi!2s" width={600} height={450} frameBorder={0} style={{ border: 0 }} allowFullScreen />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copy-right text-center pt-2">
                    <p> 2019. Công ty cổ phần Điện thoại di động. GPDKKD: 0303217354 do sở KH ĐT TP.HCM cấp ngày 02/01/2007. Địa chỉ: 273 An Dương Vương, Quận 5, TP.Hồ Chí Minh.</p>
                        <p>Điện thoại: 18001060. Email: cskh@thegioididong.com. Chịu trách nhiệm nội dung: Trần Nhật Linh. Xem chính sách sử dụng web</p>
                </div>
            </footer>
        );


    }
}

export default Footer;

