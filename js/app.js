// search input and button handle 
const loadBooks = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
        // clear
        searchInput.value = '';

        // error handle
    if (searchText === '') {
        errorMessage();
    }
    
    else{
        document.getElementById('error-message').style.display = 'none';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => bookCard(data.docs));
    }
    
};

// error message
const errorMessage = () => {
    const errorMess = document.getElementById('error-message');
    errorMess.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="container rounded-3 shadow mt-5 text-center p-3 bg-dark"> 
            <h3 class=" fw-bold text-muted"> <span class="text-danger">No results found.</span> Search for books containing the phrase?</h3>
        </div>`;
    errorMess.appendChild(div);
};

// books card declare
const bookCard = (books) => {
    const booksContainer = document.getElementById('books-container');
    const booksResults = document.getElementById('resultDiv');
    booksContainer.textContent = '';
    booksResults.textContent = '';

    // books results
    const div = document.createElement('div');
    div.innerHTML = `
    <h5 class="display-6 fs-5 fw-bolder container text-center mt-5">About result found: <span class="text-info fw-bolder">${books.length}</span></h5>`;
    booksResults.appendChild(div);
        books.forEach(book => {
            // all books card
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="col">
            <div class="card h-100 border-0 shadow rounded-3">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top d-block img-fluid" alt="Cover image">
                <div class="card-body">
                    <h6 class="card-title">Book Name: <span class="text-primary">${book.title}</span></h6>
                    <p class="card-text">Author: ${book.author_name} </p>
                    <p class="card-text">First Published: ${book.publish_year} </p>
                </div>
            </div>
        </div>`;
        booksContainer.appendChild(cardDiv);
        })
};