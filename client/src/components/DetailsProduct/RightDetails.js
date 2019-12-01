import React, { Component } from "react";
import { connect } from 'react-redux';
class RightDetails extends Component {

    render() {
        const { screen, cpu, camera, ram, memory, pin, osystem, origin } = this.props.details;
        return (
            <div className="col-md-4">
                <div className="mb-2 pb-2 border-bottom">
                    <h4>Thông số kỹ thuật</h4>
                </div>
                <div className="specifications-list mb-4">
                    <div className="specifications-item">
                        <span>Màn hình: </span>
                        <span>{screen}</span>
                    </div>
                    <div className="specifications-item">
                        <span>Hệ điều hành: </span>
                        <span>{osystem}</span>
                    </div>
                    <div className="specifications-item">
                        <span>Camera sau: </span>
                        <span>{camera}</span>
                    </div>
                    <div className="specifications-item">
                        <span>Camera trước: </span>
                        <span>{camera}</span>
                    </div>
                    <div className="specifications-item">
                        <span>CPU: </span>
                        <span>{cpu}</span>
                    </div>
                    <div className="specifications-item">
                        <span>RAM: </span>
                        <span>{ram}</span>
                    </div>
                    <div className="specifications-item">
                        <span>Bộ nhớ trong: </span>
                        <span>{memory}</span>
                    </div>
                    <div className="specifications-item">
                        <span>Thẻ SIM: </span>
                        <span> 2 Nano SIM, Hỗ trợ 4G</span>
                    </div>
                    <div className="specifications-item">
                        <span>Dung lượng pin: </span>
                        <span>{pin}</span>
                    </div>
                    <div className="specifications-item">
                        <span>Xuất sứ: </span>
                        <span> {origin}</span>
                    </div>
                </div>

            </div>
        );


    }
}

const mapStateToProps = state => {
    return {
        details: state.details
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightDetails);
