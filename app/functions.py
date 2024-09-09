import base64
import requests

PAYPAL_CLIENT_ID = "AYf9__TlgpQkxEqsJ-KRGcI1wMrdeSIEA5dxxzRWyYSS5vp4K_Ny0iEX8QYO5RyZi0r9m9WfyIBiwZhl"
PAYPAL_CLIENT_SECRET = "EIfPOjnqbVHBUjpuIIwgPIeaV_fno0xktsUWy4DdBs3L-tOb0JSW2QiRMOINM4dwA8C4teKFC0SEvSep"
BASE_URL = "https://api-m.sandbox.paypal.com"

def generateAccesToken():
    if not PAYPAL_CLIENT_ID or not PAYPAL_CLIENT_SECRET:
        raise ValueError("credenciales incorrectas")
    auth = f"{PAYPAL_CLIENT_ID}:{PAYPAL_CLIENT_SECRET}"
    auth = base64.b64encode(auth.encode()).decode('utf-8')
    
    response = requests.post(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        data={"grant_type": "client_credentials"},
        headers={"Authorization": f"Basic {auth}"}
    )
    data = response.json()
    
    return data['access_token']

def create_order(productos):
    print(productos)
    
    try:
        
        access_token = generateAccesToken()
        url = "https://api-m.sandbox.paypal.com/v2/checkout/orders"
        payload = {
            "intent":"CAPTURE",
            "purchase_units":[
                {
                    "amount":{
                        "currency_code":"USD",
                        "value":"2"
                    }
                }
            ]
            
        }
        headers = {
            "Content-Type":"application/json",
            "Authorization": f"Bearer {access_token}"
        }
        
        response = requests.post(url, headers=headers, json=payload)
        print("--- response ---", response.json())
        return response.json()
    except Exception as error:
        print("error que cree: ", error)

def capture_order(orderID):
    access_token = generateAccesToken()
    url = f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{orderID}/capture"
    
    headers = {
        "Content-Type":"application/json",
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.post(url, headers=headers)
    return response.json()