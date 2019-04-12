var btnBasket = document.getElementById('basket-btn');
var goodsListSection = document.getElementById('goods-list-section');
var btnCloseCart = document.getElementById('goods-list-section__delete');

var btnOrder = document.getElementsByClassName('product-card-section_btn-order');

console.log(btnOrder);

//все товары 
var  allGoods = {
   'btn0': { title : 'Зефир', price : 300, src : 'image/products_photo/zefir_photo/zefir_7.jpg' },
   'btn1': { title : 'Маршмеллоу', price : 400, src : 'image/products_photo/marshmelo_photo/marsh_3.jpg' },
   'btn2': { title : 'Маршмеллоу на палочке', price : 500, src : 'image/products_photo/marsh_on_stick_photo/onstick_4_2.jpg' }
};
//товары положенные в корзину 
var goodsInCart = [];//

//Создаем класс для товара. //Creating the class for the product 
class GoodsItem {
    constructor (title, price, src) {
        this.title = title;
        this.price = price;
        this.src = src;
    }
    //метод возвращает html-разметку отрисовка корзины. //Method for return the HTML tag. Paint the basket
    render () {
        return `<div class="goods-list__product-box">
        <span class="goods-list__product-box__name">${this.title}</span>
        <div class="goods-list__product-box__price">${this.price}</div>
        <img class="goods-list__product-box__img" src=${this.src} height="150px" alt="">
        <input type="submit" value="X" class="goods-list-item__product-box__delete" data-id=${this.title} onclick="deleteProductStringBasket()">
        </div>`
    }
}

//Создаем класс для списка товаров GoodsList. //Creating the class for the GoodsList
class GoodsList {
    constructor () {
        this.goods = goodsInCart;
    }
     //метод для заполнения списка goods
    fetchGoods () {
        //определяем ID у нажатой кнопки Заказать, оно соответствует имени первого свойства в allGoods
        let id = event.target.id;
        
        this.goods.push(allGoods[id]);//добавляем по id товар в корзину
        console.log(this.goods);
    }
    
    // Метод вывод списка товаров. Для каждого элемента массива goods будем создавать экземпляр
    // класса GoodsItem и запрашивать его разметку
    render () {
        let listHtml = '';
        let goodsList = document.getElementById('goods-list__product-box'); 
        
        this.goods.forEach (good => {
            const goodItem = new GoodsItem (good.title, good.price, good.src);
            listHtml += goodItem.render();
        });
        goodsList.innerHTML = listHtml;
    }

    //метод для удаления товара из корзины при нажатии на Х на товаре в корзине
    deleteGood () {

    }
}
    
//Создаем класс корзина Cart
class Cart {
    constructor () {
        this.goods = [];
    }
    //метод добавления товара в корзину
    addCartItem(cartItem) {
        this.goods.push(cartItem);
    }

    //Метод для вывода итоговой суммы корзины
    totalCartPrice() {
        let totalPrice = document.getElementById('goods-list__total'); 
        let sum = 0;
        this.goods.forEach (good => { 
            sum += good.price
        });
        totalPrice.innerText = `Итого  ${sum} рублей`;
    }

    // render() {
    //     let listHtml = '';
    //     let goodsList = document.getElementById('goods-list__product-box'); 
        
    //     this.goods.forEach (good => {
    //         const goodItem = new GoodsItem (good.title, good.price, good.src);
    //         listHtml += goodItem.render();
    //     });
    //     goodsList.innerHTML = listHtml;
    // }
}

var renderCart = () => {
    const list =  new GoodsList ();
    const cart = new Cart();

    list.fetchGoods();
    list.render();
    cart.totalCartPrice();
    
};

var openBasket = () => {
    goodsListSection.style.display = 'block';
}

//btnOrder.addEventListener('click', renderCart)
btnBasket.addEventListener('click', openBasket);
window.addEventListener('click', function (evt) {console.log(evt)});
btnCloseCart.addEventListener ('click', function () {goodsListSection.style.display = 'none'});
