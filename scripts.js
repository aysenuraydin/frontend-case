

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const list = document.querySelector('#product-list');

        if(data.length==0) {
            list.innerHTML= `
            <div>
                <div class="alert alert-danger" role="alert">
                    Ürün bulunamadı !
                </div>
            </div>
            `;
            return;
        }
        else if(data.length<6) {
            list.innerHTML= `
            <div>
                <div class="alert alert-danger" role="alert">
                    Toplam ürün sayısı 6 dan az !
                </div>
            </div>
            `;
            return;
        };

        data.forEach(i => {
            const card = `
            <div class="card p-3 col-2 m-2" style="width: 18rem;">
                <img src= "${i?.image}" width="1rem"
                class="card-img-top mx-auto" alt="resim">
                <div class="card-body">
                    <h6 class="card-title">${i?.title}</h6>
                    <div class="row details">
                        <h6 class="card-title col">$ ${i?.price}</h6>
                        <a href="#" class="col btn btn-sm btn-primary">Detay</a>
                    </div>
                </div>
            </div>
            `;
            list.innerHTML += card;
        })
    });

