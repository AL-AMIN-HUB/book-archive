// search input and button handle 
const loadBooks = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // clear input value
    searchInput.value = '';

    toggleSpinner('block')
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

// empty search for error message
const errorMessage = () => {
    const errorMess = document.getElementById('error-message');
    errorMess.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="container rounded-3 shadow mt-5 text-center p-3 bg-dark"> 
            <h3 class=" fw-bold text-muted"> <span class="text-danger">No results found.</span> Search for books containing the phrase?</h3>
        </div>`;
    errorMess.appendChild(div);
    toggleSpinner('none')
};

// books card declare
const bookCard = (books) => {
    // error handle
    if(books.length === 0){
        errorMessage();
        document.getElementById('error-message').style.display = 'block';
        const booksContainer = document.getElementById('books-container');
        const booksResults = document.getElementById('resultDiv');
        booksContainer.textContent = '';
        booksResults.textContent = '';
    }
    else{
        document.getElementById('error-message').style.display = 'none';
        const booksContainer = document.getElementById('books-container');
        const booksResults = document.getElementById('resultDiv');
        booksContainer.textContent = '';
        booksResults.textContent = '';

        // books results
        const div = document.createElement('div');
        div.innerHTML = `
            <h5 class="display-6 fs-5 fw-bolder container text-center mt-5">About result found: <span class="text-info fw-bolder">${books.length}</span></h5>`;
        booksResults.appendChild(div);
        toggleSpinner('none')

        // get each book 
        books.forEach(book => {
            // all books card dynamically creating
            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
            <div class="col">
                <div class="card h-100 border-0 shadow rounded-3">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top d-block img-fluid" alt="Cover image">
                    <div class="card-body text-center">
                        <h3 class="card-title"><span class="text-secondary fw-bolder">${book.title}</span></h3>
                        <p class="card-text lead">First Published: ${book.publish_year} </p>
                        <p class="card-text lead">Author: ${book.author_name} </p>
                    </div>
                </div>
            </div>`;
            booksContainer.appendChild(cardDiv);
        })
        toggleSpinner('none');
    }
};


// spinner add
const toggleSpinner = displaySpinner =>{
   const spinner =  document.getElementById('spinner');
   spinner.textContent = '';
   spinner.style.display = displaySpinner;
  const div = document.createElement('div')
  div. innerHTML = `
    <div class="spinner-grow mt-3" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
  `;
  spinner.appendChild(div);
}
