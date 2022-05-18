class book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

class UI{
    static displayBooks(){
        let storedBooks = [
            {
                title: "First",
                author: "Name",
                isbn: 1
            },
            {
                title: "second",
                author: "Naav",
                isbn: 2
            }
        ];

        books = storedBooks;

        books.forEach((book)=> UI.addBook(book));
    };

    static addBook(book){
        const list = document.querySelector("#book-list");

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = '#' class = "btn btn-danger delete">X</a></td>
        `
        list.appendChild(row);
    };

}

document.addEventListener('DOMContentLoaded', UI.displayBooks);
