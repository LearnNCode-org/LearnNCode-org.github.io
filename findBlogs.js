//Variable Definitions
const folderPath = 'blogs';
const test2 = document.createElement('p')
test.text = 'Test2'
blogContainer.appendChild(test)

// Create a function to fetch and display blog entries
async function displayBlogEntries() {
    const test = document.createElement('p')
    test.text = 'Test1'
    blogContainer.appendChild(test)
    try {
        const blogContainer = document.getElementById('blog-container');

        // Make an HTTP GET request to the folder URL
        const folderResponse = await fetch(folderPath);
        const folderContent = await folderResponse.text();

        // Parse the HTML content to extract links to the blog entry files
        const parser = new DOMParser();
        const folderDoc = parser.parseFromString(folderContent, 'text/html');
        const fileLinks = Array.from(folderDoc.querySelectorAll('a'))
            .map(link => link.getAttribute('href'));


        const test = document.createElement('p')
        test.text = 'Test1'
        blogContainer.appendChild(test)

        // Fetch and display each blog entry
        for (const fileLink of fileLinks) {
            const entryResponse = await fetch(`${folderPath}/${fileLink}`);
            const entryContent = await entryResponse.text();
        
            // Parse the content using JSDOM
            const dom = new JSDOM(entryContent);
            const document = dom.window.document;
        
            // Extract Author Name, Topic, and entry content
            const author = document.getElementById('author').textContent;
            const topic = document.getElementById('topic').textContent;
            const entry = document.getElementById('entry').textContent;
        
            // Create a card element

            const card = document.createElement('div');
            card.classList.add('blog-card');
        
            // Populate the card with data
            card.innerHTML = `
                <p id="author">${author}</p>
                <p id="topic">${topic}</p>
                <p>${entry}</p>
            `;
            blogContainer.appendChild(card);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to display blog entries
displayBlogEntries();
