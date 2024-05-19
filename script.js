const formItem = document.getElementById('form-item');
const inputItem = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter')


function addItem(e){
    e.preventDefault();
    const newItem = inputItem.value;
    addItemSubmit(newItem);
}

function addItemSubmit(newItem){
    if( newItem === '' ){
        alert('Please enter any value');
        return;
    }else
    {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(newItem));
        console.log(li)
        const button = createButton('remove-item btn-link text-red');
        li.appendChild(button);
        itemList.appendChild(li);
        addItemToDOM(newItem);
        inputItem.value = '';
    }
}
function addItemToDOM(newItem){
    let itemsFromStorage;
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = localStorage.getItem('items');
    }
    itemsFromStorage.push(newItem);
}
function createButton(classes){
    const button = document.createElement('Button');
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}
function createIcon(classes){
    const icon =  document.createElement('i');
    icon.className = classes;
    return icon;
}
function filterItems(e){
    const input = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(input) !== -1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    })

}
function checkUI(){
    // if(itemList.children.length === 0){
    //     clearBtn.style.display = 'none';
    //     filter.style.display = 'none';
    // }
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        if(confirm('Are You sure?')){
            clearBtn.style.display = 'none';
            filter.style.display = 'none';  
        }
    }
}
function clearItems(){
    while(itemList.firstChild){
        itemList.firstChild.remove();
    }
    checkUI();
}
function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are You sure?')){
        e.target.parentElement.parentElement.remove();}
    }
}
formItem.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);
checkUI();
