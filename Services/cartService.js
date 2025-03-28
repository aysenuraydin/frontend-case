import {useFetch} from '/Services/productService.js';

export const getCartItem = () => {
    const total_price= document.getElementById("total-price");
    const table_body= document.getElementById("table-body");
    const cartItems = JSON.parse(localStorage.getItem("cart" )|| "[]");
    if(cartItems.length==0){
        showAlertBar();
    }else{
        let list = "";
        let totalPrice = 0;
        cartItems.forEach(i=> {
            list += `
                <tr>
                    <td class="">
                        <img class="card-img-top" src="${i.image}" alt="name">
                    </td>
                    <td class="align-middle">
                        <div class="fw-bold">${i.title}</div>
                        <div class="fs-6 fw-light">${i.price} ₺</div>
                    </td>
                    <td class="align-middle text-center">
                        <i class="fa-solid fa-minus d-inline-block fs-7" onclick="editItem(${i.id}, ${i.amount-1})"></i>
                        <span class="border rounded d-inline-block p-1 px-2">
                            ${i.amount}
                        </span>
                        <i class="fa-solid fa-plus d-inline-block fs-7" onclick="editItem(${i.id}, ${i.amount+1})"></i>
                    </td>
                    <td class="align-middle">
                        <button onclick="removeItem(${i.id})"
                        type="button" class="btn btn-light">
                            <i class="fa-solid fa-xmark fs-3"></i>
                        </button>
                    </td>
                </tr>
            `;
            totalPrice += i.amount+ i.price
            table_body.innerHTML= list;
        })
        let total = cartItems.reduce((total, item)=> total + item?.price*item?.amount, 0);
        total_price.innerHTML = total.toFixed(2) + ' ₺';
    };
}
export const addCartItem = async (id) => {
    const offcanvas_button= document.getElementById("offcanvas-button");
            
    await useFetch()
    .then(value => {
        const findData =value?.data.find(i=>i?.productID==id)?? {}
        const newData = {
            id:  findData?.productID,
            title: findData?.productName,
            price: findData?.salePrice,
            image: findData?.productData?.productMainImage,
            amount:1
        }
        let cartItems = JSON.parse(localStorage.getItem("cart") || "[]") ;
        let item = cartItems?.find(i=>i.id==newData.id);
        if(item) item.amount+=1;
        else cartItems.push(newData);

        localStorage.setItem("cart", JSON.stringify(cartItems));
    })
    .catch(e => console.log("error",e))
    .finally(()=> offcanvas_button.click());
};
export const removeCartItem = async(id) => {
    const total_price= document.getElementById("total-price");

    let cartItems = JSON.parse(localStorage.getItem("cart") || "[]") ;
    cartItems = cartItems.filter(i => i.id != id)?? [];
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    if(cartItems.length==0){
        showAlertBar();
        total_price.innerHTML = '0 ₺';
    }else {
        await getCartItem();
    };
}
export const editCartItem = async(id, value) => {
    console.log(id, value);
    let cartItems = JSON.parse(localStorage.getItem("cart") || "[]") ;
    let cartItem = cartItems.find(i => i.id == id);
    if(cartItem && value!=0){
        cartItem.amount=value;
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    await getCartItem()
}
const showAlertBar = () => {
    const table_body= document.getElementById("table-body");
    table_body.innerHTML = `
        <tr>
            <td colspan="4">
                <div class="alert alert-dark" role="alert">
                    Sepetinizde henüz ürün yok!
                </div>
            </td>
        </tr>
    `;
}

