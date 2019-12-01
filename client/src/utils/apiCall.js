import axios from 'axios';
import * as Config from './../constants/Config';

export function callApi(endpoint, method = 'GET', body){
    return axios({
        method: method,
        // headers: {
        //     'Content-Type': 'application/json',
        //   }, 
        url: `${Config.API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });

};


// export function postOrder(){
//     return axios({
//         // headers: {
//         //     "Host": "web.localhost",
//         //   }, 
//         method: "POST",
//         url: `http://web.manager/api/order/checkout`,
//         data:  {
//             email: "hien@gmail.com",
//             name: "test",
//             phone: "2343534",
//             contact_address: "Vietnam",
//             gender: "male",
//             payment_method: "cod",
//             order_lines: [
//                 {
//                     product_id: 1,
//                     qty: 1
//                 }
//             ]
//         }
//     }).catch(err => {
//         console.log(err);
//     });

// };