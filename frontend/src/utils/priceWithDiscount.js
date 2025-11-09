export const pricewithDiscount = (price,dis = 1)=>{
    const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - Number(discountAmout)
    return actualPrice
}

export const DisplayPriceInRupees = (price)=>{
    return new Intl.NumberFormat('en-IN',{
        style : 'currency',
        currency : 'INR'
    }).format(price)
}