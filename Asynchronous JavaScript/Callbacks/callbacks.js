document.addEventListener('DOMContentLoaded', () => { // is used to execute the function inside it once the initial HTML document has been completely loaded and parsed
    document.getElementById('callbackResult').style.backgroundColor = '#5f5f5f'; // sets the background color of the element with the id callbackResult
});

document.getElementById('callbackButton').addEventListener('click', () => { // adds an event listener to the button with the id callbackButton. When this button is clicked, it triggers the function defined inside the event listener
    displayMessageAfterDelay((message) => { // this function is called with a callback function and a delay of 5000 milliseconds (5 seconds). This means displayMessageAfterDelay will wait for 5 seconds before executing the callback function
        document.getElementById('callbackResult').innerText = message;  // updates the text content of the callbackResult div to message (which will be "Callback executed after 5 seconds")
        fetchPosts(displayPosts); // and then calls fetchPosts with displayPosts as its callback
    }, 5000);
});

function displayMessageAfterDelay(callback, delay) { // This function accepts a callback function and a delay in milliseconds
    setTimeout(() => { // sets a timer for 'delay' milliseconds (5000 ms). After the timer expires
        callback('Callback executed after 5 seconds'); // executes the provided callback function with the message "Callback executed after 5 seconds"
    }, delay);
}

function fetchPosts(callback) {
    fetch('https://dummyjson.com/posts') // fetches data from the specified API endpoint
        .then(response => response.json()) // processes the response from the fetch request
        .then(data => callback(data.posts)) // passes the array of posts from the API response to the provided callback function
        .catch(error => console.error('Error fetching posts:', error)); // handles any errors that occur during the fetch request and logs them to the console
}

function displayPosts(posts) { // This function takes an array of posts and displays their titles in the callbackResult div
    const resultDiv = document.getElementById('callbackResult'); // gets a reference to the callbackResult div
    resultDiv.innerHTML = posts.map(post => `<p>${post.title}</p>`).join(''); // generates a string of HTML paragraphs, each containing a post title, and sets this string as the inner HTML of the callbackResult div
    resultDiv.style.backgroundColor = '#3b3b3b'; // changes the background color
}