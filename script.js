//Constructor of book
class books{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn ;
    }
}

class store{
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBooks(book){
        const books = store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books))
    }
}
// TO show the books 
class UI{
    static displayBooks(){

        var books = store.getBooks();

        books.forEach((book) => UI.addBook(book));
    }

    static addBook(book){
        var list = document.querySelector("#book-list");

        var row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = "#" class = "btn btn-danger delete">X</a></td>
        `
        list.appendChild(row);
    }

    static clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector("#author").value = '';
    document.querySelector("#isbn").value = '';
    }

    static deleteBook(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, classname){
        const div = document.createElement('div');
        div.className = `alert alert-${classname}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");

        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1200)
    }
}



//DisplayBooks
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Add Book through UI
document.querySelector("#book-form").addEventListener('submit', (e) => {

    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    if (title === '' || author === '' || isbn === ''){
        UI.showAlert("Please fill in all the fields", 'danger');
    }else{

        UI.showAlert("Book added successfully", 'success')
        const book = new books(title, author, isbn);
        UI.addBook(book);
        store.addBooks(book)
        
        UI.clearFields();
    }
});


document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.showAlert("Book deleted successfully", 'success')
    UI.deleteBook(e.target);
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})