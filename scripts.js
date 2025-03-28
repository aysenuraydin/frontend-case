document.addEventListener("DOMContentLoaded", () => {
    const offcanvas_button= document.getElementById("offcanvas-button");
    const total_price= document.getElementById("total-price");
    const table_body= document.getElementById("table-body");

    window.removeCartItem = (id) => {
        let cartItems = JSON.parse(localStorage.getItem("cart") || "[]") ;
        cartItems = cartItems.filter(i => i.id != id)?? [];
        localStorage.setItem("cart", JSON.stringify(cartItems));
        
        if(cartItems.length==0){
            showAlertBar();
            total_price.innerHTML = '$ 0';
        }else {
            getCartItem();
        };
    }
    window.getCartItem = () => {
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
                            <div class="fs-6 fw-light">$ ${i.price.toFixed(2)}</div>
                        </td>
                        <td class="align-middle text-center"> ${i.amount} </td>
                        <td class="align-middle">
                            <button onclick="removeCartItem(${i.id})"
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
            total_price.innerHTML = '$ ' + total.toFixed(2);
        };

    }
    window.showAlertBar = () => {
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
    offcanvas_button.addEventListener("click", getCartItem);
} );
