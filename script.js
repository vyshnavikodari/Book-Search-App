// Function to handle book search
async function searchBooks() {
    // Get the value entered by the user in the search bar
    const query = document.getElementById("search-bar").value.trim();

    // If the search bar is empty, alert the user and return
    if (!query) {
        alert("Please enter a search term!");
        return;
    }

    // Construct the URL for Google Books API with the query
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`;

    try {
        // Fetch data from Google Books API
        const response = await fetch(url);
        const data = await response.json();

        // Check if there are any results
        if (data.items) {
            displayBooks(data.items);  // Call displayBooks function to show results
        } else {
            // If no books are found, display a message
            document.getElementById('book-list').innerHTML = "<p>No books found. Please try a different search.</p>";
        }
    } catch (error) {
        // Handle any errors during the fetch request
        console.error("Error fetching data from API:", error);
        document.getElementById('book-list').innerHTML = "<p>Sorry, something went wrong. Please try again later.</p>";
    }
}

// Function to display the books in the DOM
function displayBooks(books) {
    // Get the element where books will be displayed
    const bookList = document.getElementById("book-list");

    // Clear previous search results
    bookList.innerHTML = '';

    // Loop through the books and create HTML for each book
    books.forEach(book => {
        const bookInfo = book.volumeInfo;

        // Create a new div element for each book
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");

        // Get book details: title, author(s), description, and cover image
        const title = bookInfo.title || "No title available";
        const authors = bookInfo.authors ? bookInfo.authors.join(", ") : "Unknown author";
        const description = bookInfo.description ? bookInfo.description.substring(0, 150) + '...' : "No description available";
        const imageUrl = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x200';

        // Add book details to the bookElement
        bookElement.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <h3>${title}</h3>
            <p><strong>Author(s):</strong> ${authors}</p>
            <p><strong>Description:</strong> ${description}</p>
            <a href="${bookInfo.infoLink}" target="_blank">More Info</a>
        `;

        // Append the bookElement to the book list container
        bookList.appendChild(bookElement);
    });
}
function openPage() {
    // This will open the 'about.html' page
    window.location.href = 'index.html'; // Replace 'about.html' with your desired page
}