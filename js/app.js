
const loadBooks = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    
    const url = `https://openlibrary.org/search.json?q=javascript`;
    fetch(url)
    .then(res => res.json())
    .then(data => bookCard(data.docs));
    
}

const bookCard = (books) => {
    const booksContainer = document.getElementById('books-container');
    books.forEach(book => {
        const  cardDiv  = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="col">
                    <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/=${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author_name} </p>
                        <p class="card-text">First Published: ${undefined ? book.publish_year : book.first_publish_year} </p>
                    </div>
                    </div>
                </div>        
        `;
        booksContainer.appendChild(cardDiv);
        
    })
};