let library = [];

function Book(title,author,pages,status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = Boolean(status);
}

Book.prototype.changeStatus = function(){
    this.status === true? this.status = false: this.status = true;
}
function removeBook(e){
    
    library = library.filter(book=>{
        return e.target.parentNode.getAttribute('data-title') !== book.title 
    })
    loadBooks();
}
function bookCard(book){
    const bookContainer = document.querySelector('.book-container');
    const newBook = document.createElement("div");
    newBook.classList.add("book");
    newBook.setAttribute('data-title',`${book.title}`);


    const closeElement = document.createElement('img');
    closeElement.classList.add("closeButton");
    closeElement.src = "./images/close.svg";
    closeElement.addEventListener('click',removeBook);

    const titleElement = document.createElement('div');
    titleElement.classList.add("book-title");
    titleElement.innerText = `${book.title}`;


    const authorElement = document.createElement('div');
    authorElement.classList.add("author");
    authorElement.innerText = `By: ${book.author}`;

    const pagesElement = document.createElement('div');
    pagesElement.classList.add("book-pages");
    pagesElement.innerText = `${book.pages} pages`;

    const statusElement = document.createElement('div');
    statusElement.classList.add("status-check");

    const statusInput = document.createElement('button');
    statusInput.type = 'button';

    setStatusButton(statusInput,book);
    book.status === true? statusInput.innerText = "Read": statusInput.innerText = "Not Read";
    statusInput.addEventListener('click',() => {
        book.changeStatus();
        setStatusButton(statusInput,book);
        console.log(book)
    });
    
    statusElement.append(statusInput);

    

    newBook.append(closeElement);
    newBook.append(titleElement);
    newBook.append(authorElement);
    newBook.append(pagesElement);
    newBook.append(statusElement);
    bookContainer.append(newBook);
}
function addBookCard(){
    const bookContainer = document.querySelector('.book-container');

    const addCard = document.createElement('div');
    addCard.setAttribute('id','addBook');

    const plusImg = document.createElement('img');
    plusImg.src = "./images/plus-circle-outline.svg";

    addCard.append(plusImg);
    addCard.addEventListener('click',()=>{
        document.getElementById("book-form").reset();
        formContainer.setAttribute("style", "visibility: visible;");
    })
    bookContainer.append(addCard);
}
function loadBooks(){
    const bookContainerChildren = document.querySelector(".book-container");
    bookContainerChildren.innerHTML = "";
    library.forEach(book => bookCard(book));
    addBookCard();
}
function addToLibrary(form){
    
    errorCheck(form);
    if (form.title.value.length > 0 && form.author.value.length > 0 && form.pages.value.length > 0){ 
        const book = new Book(form.title.value,form.author.value,form.pages.value,form.status.checked);
        library.push(book);
        loadBooks();
        formContainer.setAttribute("style", "visibility: hidden;");
    }
    
}

function errorCheck(form){
    if(form.title.value.length < 1){
        const titleError = document.querySelector('.title-error');
        titleError.setAttribute("style", "visibility: visible;");
    }else{
        const titleError = document.querySelector('.title-error');
        titleError.setAttribute("style", "visibility: hidden;");
    }

    if (form.author.value.length <1){
        const authorError = document.querySelector('.author-error');
        authorError.setAttribute("style", "visibility: visible;");
    }else{
        const authorError = document.querySelector('.author-error');
        authorError.setAttribute("style", "visibility: hidden;");
    }

    if (form.pages.value.length <1){
        const pagesError = document.querySelector('.page-error');
        pagesError.setAttribute("style", "visibility: visible;");

    }else{
        const pagesError = document.querySelector('.page-error');
        pagesError.setAttribute("style", "visibility: hidden;");
    }
}

function setStatusButton(btn,book){
    if(book.status){
        btn.classList.remove('not-read-btn');
        btn.classList.add('read-btn');
        btn.innerText = "Read";
    }else{
        btn.classList.remove('read-btn');
        btn.classList.add('not-read-btn');
        btn.innerText = "Not Read";
    }
}

const addBook = document.querySelector("#addBook");
const formContainer = document.querySelector(".form-container");
const bookForm = document.querySelector("#book-form").elements;
const submit = document.querySelector('#add');
const closeForm = document.querySelector('.closeButton-form');

// const removeCard = document.querySelector("#closeButton");
// removeCard.

submit.addEventListener('click',()=>addToLibrary(bookForm));
addBook.addEventListener('click',()=>{
    document.getElementById("book-form").reset();
    formContainer.setAttribute("style", "visibility: visible;");
})
closeForm.addEventListener('click',()=>{
    formContainer.setAttribute("style", "visibility: hidden;");  
})

// console.log(library);