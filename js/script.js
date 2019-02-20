window.addEventListener('DOMContentLoaded', () => {
    const loadContent = async (url, callback) => {
        await fetch(url)
            .then(response => response.json())
            .then(json => createElement(json.goods));
    
        callback();
    }
    
    function createElement(arr) {
        const goodsWrapper = document.querySelector('.goods__wrapper');
        
        arr.forEach(function(item) {
            let card = document.createElement('div');
            card.classList.add('goods__item');
            card.innerHTML = `
                <img class="goods__img" src="${item.url}" alt="phone">
                <div class="goods__colors">Доступно цветов: 4</div>
                <div class="goods__title">
                    ${item.title}
                </div>
                <div class="goods__price">
                    <span>${item.price}</span> руб/шт
                </div>
                <button class="goods__btn">Добавить в корзину</button>
            `;
            
            goodsWrapper.appendChild(card);
        });
    }
    
    loadContent('js/db.json', () => {
        const cartWrapper = document.querySelector('.cart__wrapper');
        const cart = document.querySelector('.cart');
        const close = document.querySelector('.cart__close');
        const open = document.querySelector('#cart');
        const goodsBtn = document.querySelectorAll('.goods__btn');
        const products = document.querySelectorAll('.goods__item');
        const confirm = document.querySelector('.confirm');
        const badge = document.querySelector('.nav__badge');
        const totalCost = document.querySelector('.cart__total > span');
        const titles = document.querySelectorAll('.goods__title');
    
        function openCart() {
            cart.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    
        function closeCart() {
            cart.style.display = 'none';
            document.body.style.overflow = '';
        }
    
        open.addEventListener('click', openCart);
        close.addEventListener('click', closeCart);
    
        goodsBtn.forEach(function(btn, i) {
            btn.addEventListener('click', () => {
                const item = products[i].cloneNode(true);
                const trigger = item.querySelector('button');
                const removeBtn = document.createElement('div');
                const empty = document.querySelector('.empty');
    
                trigger.remove();
    
                showConfirm();
    
                removeBtn.classList.add('goods__item-remove');
                removeBtn.innerHTML = '&times';
                item.appendChild(removeBtn);
    
                cartWrapper.appendChild(item);
    
                if (empty) {
                    empty.style.display = 'none';
                }

                calcGoods();
    
                calcTotal();
                removeFromCart();
            });
        });
    
        function sliceTitle() {
            titles.forEach(function(item) {
                if (item.textContent.length < 70) {
                    return;
                } else {
                    const str = `${item.textContent.slice(0, 71)}...`;
                    item.textContent = str;
                }
            });
        }
        sliceTitle();
    
        function showConfirm() {
            confirm.style.display = 'block';
            let counter = 100;
            const id = setInterval(frame, 10);
    
            function frame() {
                if (counter == 10) {
                    clearInterval(id);
                    confirm.style.display = 'none';
                } else {
                    counter--;
                    confirm.style.transform = `translateY(-${counter}px)`;
                    confirm.style.opacity = '.' + counter;
                }
            }
        }
    
        function calcGoods() {
            const items = cartWrapper.querySelectorAll('.goods__item');
            badge.textContent = items.length;
            if (items.length == 0) {
                addEmpty();
            }
        }
    
        function calcTotal() {
            const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
            let total = 0;
            prices.forEach(function(item) {
                total += +item.textContent;
            });
            totalCost.textContent = total;
        }
        
        function removeFromCart() {
            const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
    
            removeBtn.forEach(function(btn) {
                btn.addEventListener('click', () => {
                    btn.parentElement.remove();
                    calcGoods();
                    calcTotal();
                });
            });
        }
    
        function addEmpty() {
            const empty = document.querySelector('.empty');
    
            empty.style.display = 'block';
        }
    });
});

