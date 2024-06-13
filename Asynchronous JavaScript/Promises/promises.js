document.addEventListener('DOMContentLoaded', () => { // is used to execute the function inside it once the initial HTML document has been completely loaded and parsed
    document.getElementById('promiseResult').style.backgroundColor = '#5f5f5f'; // sets the background color of the element with the id promiseResult
});

document.getElementById('promiseButton').addEventListener('click', () => { // Adds an event listener to the button with the ID promiseButton. When the button is clicked, the function inside this event listener is executed
    document.getElementById('promiseResult').innerText = 'Loading...'; // Updates the text of the element with the ID promiseResult to "Loading..."
    
    fetchWithTimeout('https://dummyjson.com/posts', 5000) // Calls the fetchWithTimeout function with the URL https://dummyjson.com/posts and a timeout of 5000 milliseconds
        .then(response => response.json()) // It processes the response by converting it to a JavaScript object
        .then(data => displayPosts(data.posts)) // It calls the displayPosts function, passing the array of posts from the data
        .catch(error => document.getElementById('promiseResult').innerText = error); // If any error occurs (either the fetch fails or the timeout is reached), this .catch() method is called. It updates the text of the promiseResult element with the error message
});

function fetchWithTimeout(url, timeout) { // This function accepts two parameters: url (the URL to fetch data from) and timeout (the maximum time to wait before timing out, in milliseconds)
    return new Promise((resolve, reject) => { // The function returns a new promise
        const timer = setTimeout(() => reject('Operation timed out'), timeout); // A timer is set using setTimeout. If the timeout duration elapses before the fetch is completed, the promise is rejected with the message "Operation timed out"

        fetch(url) // Initiates a fetch request to the specified URL
            .then(response => { // When the fetch request is successful
                clearTimeout(timer); // the timer is cleared using clearTimeout(timer) to prevent the timeout from rejecting the promise later
                resolve(response); // The promise is resolved with the fetch response
            })
            .catch(error => { // If the fetch request fails
                clearTimeout(timer); // the timer is cleared
                reject(error); // and the promise is rejected with the error
            });
    });
}

function displayPosts(posts) { // This function takes an array of posts and displays their titles in the promiseResult div
    const resultDiv = document.getElementById('promiseResult'); // gets a reference to the promiseResult div
    resultDiv.innerHTML = posts.map(post => `<p>${post.title}</p>`).join(''); // generates a string of HTML paragraphs, each containing a post title, and sets this string as the inner HTML of the promiseResult div
    resultDiv.style.backgroundColor = '#3b3b3b'; // changes the background color
}