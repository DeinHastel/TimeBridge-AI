
import { useEffect } from "react";
import { loadScript } from "@paypal/paypal-js"
import { apiCreateOrderPaypal } from "../api/paypal";
import { apiOnApprovePaypal } from "../api/paypal";

const PaypalComponent =()=>{
    
    let paypal;
    const initPaypal = async() =>{
        
        try {
            paypal = await loadScript({ clientId: "test" });
        } catch (error) {
            console.error("failed to load the PayPal JS SDK script", error);
        }

        if (paypal) {
            try {
                await paypal.Buttons({
                    style: {
                        layout: 'vertical',
                        color:  'blue',
                        shape:  'rect',
                        label:  'paypal'
                      },
                      async createOrder(){
                        const idOrder = apiCreateOrderPaypal()
                        return idOrder
                      },
                      async onApprove(data){
                        console.log("en el componente ",data)
                        const details = await apiOnApprovePaypal(data)
                        alert(`Transaction completed by ${details.payer.name.given_name}`);
                      }
                }).render("#btns-paypal");
            } catch (error) {
                console.error("failed to render the PayPal Buttons", error);
            }
        }

    }
    useEffect(
        ()=>{
            initPaypal()
        },[])

    return(
        <div>
            <div id="btns-paypal">
                aqui cosas de paypal
            </div>
        </div>
    )


}

export default PaypalComponent