function renderList(json) {
    const posts = json.data.children;
    return `<ol>
      ${posts.map(
        post => `<li style="list-style-type: none; margin-right: 4%;">
                    <div class="card" style="background-color: #171717; color: #e5e5e5;">
                        <div class="card-block">
                            <h4 class="card-title">${post.data.title}</h4>
                            <h6 class="card-subtitle mb-2 text-muted">${post.data.author}</h6>
                            <p class="card-text">${post.data.selftext}</p>
                            <a href="${post.data.url}" class="card-link">Read More...</a>
                        </div>
                    </div>
                </li>`
      ).join('')}
    </ol>`;
}

/*Asynchronous fetch with catch and try error handling and Request Constructor*/
async function fetchTopFive(sub, amount, type) {
    const URL = `https://www.reddit.com/r/${sub}/${type}/.json?limit=${amount}`;
    try {
        const fetchResult = fetch(
            new Request(URL, {method: 'GET', cache: 'reload'})
        );
        const response = await fetchResult;
        if(response.ok) {
            const jsonData = await response.json();
            console.log(jsonData);
            result.innerHTML =  renderList(jsonData);
        }
        else {
            result.innerHTML = 'Response.status: ${response.status}';
        }
    } catch(e)
    {
        throw Error(e);
    }
}

function submitText() {
    var text = document.getElementById('input').value;
    var num = document.getElementById('input1').value;
    var type = document.getElementById('input2').value;
    console.log(text);
    console.log(num);
    fetchTopFive(text, num, type.toLowerCase());
}

