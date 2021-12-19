class Book {
    constructor(title, author, year) {

        this.id = Math.floor(Math.random() * 1000);
        this.title = title;
        this.author = author;
        this.year = year;
        this.borrower = [];

    }

    getBorrower() {
        return this.borrower;
    }

    lend(borrower) {
        if (this.borrower !== null) {
            this.borrower = borrower;
            borrower.books.push(this);
            console.log(`You have successfully borrowed ${this.title}, ${borrower.name}`);
        } else {
            console.log(`Sorry, ${this.title} has already been borrowed`);
        }
    }


}

class Borrower {
    constructor(name) {
        let b = 1;

        this.name = name;
        this.books = [];
        this.id = `user-${++b}`;
    }

    getInstance() {
        return this;
    }

    getBooks() {
        return this.books;
    }

    returnBook(id) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            book.borrower = null;
            this.books.splice(this.books.indexOf(book), 1);
            console.log(`${this.name} has returned ${book.title}`);
        } else {
            console.log(`${this.name} has not borrowed this book`);
        }
    }

    borrowBook(book) {
        if (book.borrower === null) {
            book.lend(this);
        } else {
            console.log(`${book.title} is already borrowed`);
        }
    }
}

class Library {
    constructor() {
        this.books = [];
        this.borrowers = [];
    }

    static instance = null;

    static getLibraryInstance() {
        if (this.instance === null) {
            this.instance = new Library();
            return this.instance;
        }
        return this.instance;
    }

    get allBooks() {
        return this.books;
    }

    get bookCount() {
        return this.books.length;
    }

    get borrowedBooks() {
        return this.books.filter(book => book.borrower !== null).length;
    }

    get availableBooks() {
        return this.books.filter(book => book.borrower === null).length;
    }

    get allBorrowers() {
        return this.borrowers;
    }
        
    findById(id) {
      return this.books.find(book => book.id === id);
    }

    returnBook(id, name) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            book.borrower.returnBook(id);
        } else {
            console.log(`Book ${name}, with id ${id} not found`);
        }
    }

    getAvailableBooks() {
        console.log(`Available Books:`);
        this.books.forEach(book => {
            if (book.borrower === null) {
                console.log(`${book.id}: ${book.title}`);
            }
        });
    }

    getBorrowedBooks() {
        console.log(`Borrowed Books:`);
        this.books.forEach(book => {
            if (book.borrower !== null) {
                console.log(`${book.title}. ID #: ${book.id}`);
            }
        });
    }

    addBook(book) {
        this.books.push(book);
        return book.id;
    }

    removeBook(id) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            this.books.splice(this.books.indexOf(book), 1);
            console.log(`Book ${book.id} removed`);
        } else {
            console.log(`Book ${id} not found`);
        }
    }

    lendBook(id, borrower) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            book.lend(borrower);
        } else {
            console.log(`Book ${id} not found`);
        }
    }

    replaceBook(id, borrower, name) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            book.borrower = null;
            borrower.returnBook(id);
        } else {
            console.log(`${name} with ID: ${id} not found`);
        }
    }

    addBorrower(borrower) {
        this.borrowers.push(borrower);
        return borrower.name;
    }

    removeBorrower(id) {
        const borrower = this.borrowers.find(borrower => borrower.id === id);
        if (borrower) {
            this.borrowers.splice(this.borrowers.indexOf(borrower), 1);
            console.log(`Borrower ${borrower.name} removed`);
        } else {
            console.log(`Borrower ${id} not found`);
        }
    }
    printBooks() {
        console.log(`Books:`);
        this.books.forEach(book => console.log(`#${book.id}: ${book.title}.`));
    }

}


const library = Library.getLibraryInstance();

    library.addBook(new Book('Ben Hur', 'Lewis Wallace'));
    library.addBook(new Book('The Great Gasby', 'Scott F,F'));
    library.addBook(new Book('animal farm ', 'george orwell'));
    library.addBook(new Book('Ancient Mariner', 'Colreidge'));
    library.addBook(new Book('Game of Thrones', 'Georg R Martin'));
    library.addBook(new Book('Americanah', 'Chimamanda Adichie'));
    library.addBook(new Book('Black boy', 'John marty'));

    (function () {
    console.log("Hey There!");

    let username = prompt("Please enter username: ");
    let user = library.addBorrower(new Borrower(username));
    let mainMenu = ` MENU:
    1) VIEW ALL BOOKS
    2) DONATE A BOOK
    3) BORROW A BOOK
    4) RETURN A BOOK
    5) QUIT
    `;
    console.log(`Welcome ${user}! Mi Casa Su Casa, freely go through the options below`);
    console.log("");
    console.log("");
    console.log(mainMenu);
    console.log("");

    let newInput = prompt("Please input an option ");
    while (newInput !== '5') {
        if (newInput === '1') {
            console.log("VIEW ALL BOOKS");
            library.printBooks();
            console.log("")
            console.log("")
            console.log(mainMenu);
            newInput = prompt("Please input an option ");
        } else if (newInput === '2') {
            console.log("DONATE A BOOK");
            let title = prompt("Enter book title: ");
            let author = prompt("Enter book author: ");
            let year = prompt("Enter pubishing year: ");
                         library.addBook(new Book(title, author, year));
            console.log(`Your book: ${title} - has been donated successfuly!`);
            console.log("")
            console.log("")
            console.log(mainMenu);
            newInput = prompt("Please input an option ");
        } else if (newInput === '3') {
            console.log("BORROW A BOOK");
            library.getAvailableBooks();
            console.log("What book would you like to borrow today?");
            let bookId = parseInt(prompt("Enter the book #ID: "));
            let borrowBookId = library.findById(bookId);
            if (borrowBookId) {
                if (borrowBookId.borrower !== null) {
                    console.log(`Sorry, this book with #ID #${bookId} is already borrowed`);
                } else {
                    let borrowerName = prompt("Enter the name of the borrower: ");
                    let borrower = library.borrowers.find(borrower => borrower.name === borrowerName);
                    if (borrower) {
                        library.lend(bookId, borrower);
                        console.log(`Book ${bookId} borrowed by ${borrower.name}`);
                    } else {
                        console.log(`User: ${borrowerName} not found`);
                    }
                }
            } else {
                console.log(`Sorry, Book with #ID #${bookId} is not available`);
            }
            console.log("")
            console.log("")
            console.log(mainMenu);
            newInput = prompt("Please input an option ");
        } else if (newInput === '4') {
            console.log("RETURN A BOOK");
            library.getBorrowedBooks();
            let bookId = parseInt(prompt("Enter #ID of the book you want to return: "));
            let borrower = library.borrowers.find(borrower => borrower.name);
            if (borrower) {
                library.returnBook(bookId);
                console.log(`Book with #ID #${bookId} returned successfully, thanks!`);
            } else {
                console.log(`Sorry, Book with #ID #${bookId} not found`);
            }
            console.log("")
            console.log("")
            console.log(mainMenu);
            newInput = prompt("Please input an option ");
        } else {
            console.log("Invalid entry");
            console.log("")
            console.log("")
            console.log(mainMenu);
            newInput = prompt("kindly try again");
        }
    }
    console.log(`Thank you! see you soon ${borrowerName}`);
})();
