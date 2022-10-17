let library = [];

function Book(title,author,pages,status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = Boolean(status);
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
    statusElement.innerText= "Finished? ";

    const statusInput = document.createElement('input');
    statusInput.type = 'checkbox';

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

    const book = new Book(form.title.value,form.author.value,form.pages.value,form.status.checked);
    library.push(book);
    loadBooks();
    formContainer.setAttribute("style", "visibility: hidden;");
   
}


const addBook = document.querySelector("#addBook");
const formContainer = document.querySelector(".form-container");
const bookForm = document.querySelector("#book-form").elements;
const submit = document.querySelector('#add');

// const removeCard = document.querySelector("#closeButton");
// removeCard.

submit.addEventListener('click',()=>addToLibrary(bookForm));
addBook.addEventListener('click',()=>{
    document.getElementById("book-form").reset();
    formContainer.setAttribute("style", "visibility: visible;");
})


// console.log(library);