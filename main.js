function StokMama() {
    const product = document.querySelector('.product');
    const numberOf = document.querySelector('.numberOf');
    const numberMin = document.querySelector('.numberMin');
    const addProduct = document.querySelector('.addProduct');
    const productPanel = document.querySelector('.productPanel');

    addProduct.addEventListener('click', function () {
        if (!product.value || !numberOf.value || !numberMin.value) {
            alert('[ERRO] Insira todos os dados!');
        } else {
            if (Number(numberOf.value) > 0 && Number(numberMin.value) > 0) {
                createProduct(product.value, numberOf.value, numberMin.value);
            }else{
                alert('[Erro] Informe um valor postivo!');
            }
        }
    });

    function pressEnter(param) {
        param.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                createProduct(product.value, numberOf.value, numberMin.value);
            }
        });
    }

    pressEnter(product);
    pressEnter(numberOf);
    pressEnter(numberMin);

    function createProduct(pdt, nbrOf, nbrMin) {
        const div = document.createElement('div');
        const p1 = paragraph(pdt);
        p1.setAttribute('class', 'productsName');
        const p2 = paragraph(nbrOf.replace('+-', ''));
        const p3 = paragraph(nbrMin);

        div.appendChild(p1);
        div.appendChild(p2);
        createPlusButton(p2);
        createMinusButton(p2);
        div.appendChild(p3);

        createButton(div);

        productPanel.appendChild(div);

        saveProducts();

        cleanScreen();
    }

    function paragraph(parameter) {
        const p = document.createElement('p');
        p.innerText = parameter;
        return p;
    }
    
    function createPlusButton(content) {
        const button = document.createElement('button');
        button.innerText = '+';
        content.appendChild(button);
        button.setAttribute('class', 'plus');
        button.setAttribute('title', 'Aumentar a quantidade');
    }

    function createMinusButton(content) {
        const button = document.createElement('button');
        button.innerText = '-';
        content.appendChild(button);
        button.setAttribute('class', 'minus');
        button.setAttribute('title', 'Diminuir a quantidade');
    }

    function createButton(content) {
        const button = document.createElement('button');
        button.innerText = 'Apagar';
        content.appendChild(button);
        button.setAttribute('class', 'delete');
        button.setAttribute('title', 'Apagar esta tarefa');
    }

    function changeQuantity(changed, what) {
        const productRetaked = takeFromLocalStorage();
        localStorage.clear();

        for (let index = 0; index < productRetaked.length; index+=3) {
            if (productRetaked[index] === changed) {
                const indexOfNumber = index+1;
                const numberOfProduct = String(Number(productRetaked[indexOfNumber].replace('+-', '')) + what) + '+-';
                productRetaked[indexOfNumber] = numberOfProduct;
                saveOnJson(productRetaked);
                creatingSavedProducts(productRetaked);
            }
        } 
    }

    document.addEventListener('click', function (elemt) {
        const element = elemt.target;

        if (element.classList.contains('plus')) {
            const grandParent = element.parentElement.parentElement;
            const findIndex = grandParent.querySelector('.productsName').innerText;
            deleteDivs();
            changeQuantity(findIndex, 1);
        }

        if (element.classList.contains('minus')) {
            const grandParent = element.parentElement.parentElement;
            const findIndex = grandParent.querySelector('.productsName').innerText;
            deleteDivs();
            changeQuantity(findIndex, -1);
        }
        
        if (element.classList.contains('delete')) {
            element.parentElement.remove();
            saveProducts();
        }
    });

    function deleteDivs() {
        const allDivs = productPanel.querySelectorAll('div');
        for (let i = 0; i < allDivs.length; i++) {
            allDivs[i].remove();
        }
    }

    function saveOnJson(array) {
        const JsonString = JSON.stringify(array);
        localStorage.setItem('productsSaved', JsonString);
    }

    function saveProducts() {
        const registeredProducts = productPanel.querySelectorAll('p');
        const productsSaver = [];

        for (const productList of registeredProducts) {
            let pOfProd = productList.innerText;
            productsSaver.push(pOfProd);
        }

        saveOnJson(productsSaver);
    }

    function takeFromLocalStorage(){
        const productsSaved = localStorage.getItem('productsSaved');
        return JSON.parse(productsSaved);
    }

    function creatingSavedProducts(productRetaked) {
        for (let index = 0; index < productRetaked.length; index += 3) {
            createProduct(productRetaked[index], productRetaked[index + 1], productRetaked[index + 2]);
        }
    }

    function useSavedProducts() {
        const productRetaked = takeFromLocalStorage();

        if (productRetaked !== null) {
            creatingSavedProducts(productRetaked);
        }
    }

    useSavedProducts();

    function cleanScreen() {
        product.focus();
        product.value = '';
        numberOf.value = '';
        numberMin.value = '';
    }
}

StokMama();