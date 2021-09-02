
const loadBooks = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    // clear
    searchInput.value = '';
    
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => bookCard(data.docs));
    
}

const bookCard = (books) => {
    const booksContainer = document.getElementById('books-container');
    booksContainer.textContent = '';
    books.forEach(book => {
        const  cardDiv  = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="col">
                    <div class="card h-100 border-0 shadow rounded-3">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top d-block img-fluid" alt="Cover image">
                    <div class="card-body">
                        <h6 class="card-title">Book Name: <span class="text-primary">${book.title}</span></h6>
                        <p class="card-text">Author: ${book.author_name} </p>
                        <p class="card-text">First Published: ${undefined ? book.publish_year : book.first_publish_year} </p>
                    </div>
                    </div>
                </div>        
        `;
        booksContainer.appendChild(cardDiv);
        
    })
};