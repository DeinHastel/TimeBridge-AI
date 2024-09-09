export const apiCreateOrderPaypal = async (data) => {
    const response = await fetch("http://127.0.0.1:8000/auth/api/orders/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data)
    })
  
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  
    const order = await response.json();
    console.log(order)
    return order.id
  }

  export const apiOnApprovePaypal = async (orderID) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/api/orders/capture/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({"orderID":orderID.orderID})
      })
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Error ${response.status}: ${error.message}`);
      }
  
      const details = await response.json();
      console.log(details)
      return details
    } catch (error) {
      console.error(error);
      // Maneja el error de forma más elegante, por ejemplo, mostrando un mensaje de error al usuario.
    }
  }