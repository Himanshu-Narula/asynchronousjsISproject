document.addEventListener('DOMContentLoaded', () => { // is used to execute the function inside it once the initial HTML document has been completely loaded and parsed
    document.getElementById('asyncResult').style.backgroundColor = '#5f5f5f'; // sets the background color of the element with the id asyncResult
});

document.getElementById('asyncButton').addEventListener('click', async () => { // Adds an event listener to the button with the ID asyncButton. When the button is clicked, the async function inside this event listener is executed
    document.getElementById('asyncResult').innerText = 'Loading...'; // Updates the text of the element with the ID asyncResult to "Loading..."

    try { // This block handles any errors that might occur during the asynchronous operations
        const posts = await fetchPostsWithTimeout('https://dummyjson.com/posts', 5000); // Calls the fetchPostsWithTimeout function with the URL https://dummyjson.com/posts and a timeout of 5000 milliseconds, and waits for the promise to resolve
        displayPosts(posts); // Calls the displayPosts function to display the posts
    } catch (error) { // If an error occurs, the catch block updates the text of the asyncResult element with the error message
        document.getElementById('asyncResult').innerText = error;
    }
});

async function fetchPostsWithTimeout(url, timeout) {
    const controller = new AbortController(); // Creates a new AbortController instance which allows you to abort web requests when timeout happens
    const signal = controller.signal; // Extracts the signal property from the AbortController instance. This signal is used to communicate with the fetch request
    
    const timer = setTimeout(() => controller.abort(), timeout); // Sets a timer to abort the request after the specified timeout duration. When the timer expires, it calls controller.abort(), which triggers an abort signal

    try {
        const response = await fetch(url, { signal }); // Initiates a fetch request to the provided URL with the abort signal
        clearTimeout(timer); // Clears the timeout to prevent the abort from being triggered if the fetch request completes before the timeout
        if (!response.ok) { // Checks if the response is not OK (status code is not in the range 200-299). If so, it throws an error
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parses the JSON body of the response
        return data.posts; // Returns the array of posts from the parsed data
    } catch (error) {
        if (error.name === 'AbortError') { // If an error occurs during the fetch operation, it checks if the error is an AbortError (indicating that the operation timed out) and throws a specific error message. Otherwise, it rethrows the original error
            throw new Error('Operation timed out');
        }
        throw error;
    }
}

function displayPosts(posts) { // This function takes an array of posts and displays their titles in the asyncResult div
    const resultDiv = document.getElementById('asyncResult'); // gets a reference to the asyncResult div
    resultDiv.innerHTML = posts.map(post => `<p>${post.title}</p>`).join(''); // generates a string of HTML paragraphs, each containing a post title, and sets this string as the inner HTML of the asyncResult div
    resultDiv.style.backgroundColor = '#3b3b3b'; // changes the background color
}