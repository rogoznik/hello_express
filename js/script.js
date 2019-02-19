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

            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);

            if (empty) {
                empty.remove();
            }
        });
    });
});
