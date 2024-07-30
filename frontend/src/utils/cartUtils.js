export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

export const updateCart =(state)=> {
    // Calculate items Prices
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0));


    // Calculate shipping Prices (If order is over $100 then free, else $10 shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    // Calculate tax Prices(15% tax)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));


    // Calculate total Prices
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) + 
        Number(state.taxPrice)

    ).toFixed(2);
    localStorage.setItem('cart',JSON.stringify(state));

    return state;
}

