
/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let objCookies;

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    let filterValue = filterNameInput.value; 
        
    buildTable(filterValue);
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let name = addNameInput.value;
    let value = addValueInput.value;    
    let filterValue = filterNameInput.value;

    objCookies = getCookies();

    if (name !== '' && value !== '' ) {
        for (let key in objCookies) {     
            if (key === name) {                    
                delete objCookies[key];                 
            }         
        }
        objCookies[name] = value;
        document.cookie = `${name}=${value}`;        
    } 
       
    buildTable(filterValue);    
});

listTable.addEventListener('click', function(e) {
    // удаление строки из таблицы
    let target = e.target;

    if (target.tagName === 'BUTTON') {
        let key = target.closest('tr').firstElementChild.innerHTML;

        document.cookie = `${key}=; max-age=0`;
        target.closest('tr').remove();
    }
});

function getCookies() {
    let obj = {};
    
    if (document.cookie) {
        obj = document.cookie.split('; ').reduce((prev, current) => {
            const [name, value] = current.split('=');
    
            prev[name] = value;
    
            return prev;
        }, {});        
    } 
    
    return obj;    
}

function addRow(name, value) {
    let row = `<tr><td>${name}</td><td>${value}</td><td><button class="delete">Удалить</button></td></tr>`;

    listTable.innerHTML += row;
}

function buildTable(value) {
    objCookies = getCookies();

    listTable.innerHTML = ''; 

    if (value) {
        for (let key in objCookies) {            
            if (key.includes(value) || objCookies[key].includes(value)) {
                addRow(key, objCookies[key]); 
            }                  
        } 
    } else {
        for (let key in objCookies) { 
            if (objCookies.hasOwnProperty(key)) {
                addRow(key, objCookies[key]);            
            }       
        }
    }
}

buildTable(filterNameInput.value);
