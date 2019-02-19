window.addEventListener('DOMContentLoaded', () => {
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
            calcGoods(1);

            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);

            if (empty) {
                empty.remove();
            }

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

    function calcGoods(i) {
        const items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = i + items.length;
        if (i == 0) {
            if (items.length == 0) {
                addEmpty();
            }
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
                calcGoods(0);
                calcTotal();
            });
        });
    }

    function addEmpty() {
        const e = document.createElement('div');

        e.classList.add('empty');
        e.textContent = 'Ваша корзина пока пуста';

        cartWrapper.appendChild(e);
    }
});
