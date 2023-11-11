//    Developer: Yantong Wu
//    File Purpose: The search function (common used)
//    Update Date : 2023/11/11

async function search() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    // URL search list
    var urls = [
        "https://yanxi36.github.io",
        "https://yanxi36.github.io/salesbase.html",
        "https://yanxi36.github.io/download.html",
        "https://yanxi36.github.io/brand/APLAX/APLAX.html",
        "https://yanxi36.github.io/brand/APLAX/Chao_jing.html",
        "https://yanxi36.github.io/brand/APLAX/Fong_cai.html",
        "https://yanxi36.github.io/brand/APLAX/Star.html",
        "https://yanxi36.github.io/brand/APLAX/Duo_la.html",
        "https://yanxi36.github.io/brand/APLAX/Kaleidoscope.html",
        "https://yanxi36.github.io/brand/APLAX/Galaxy.html",
        "https://yanxi36.github.io/brand/APLAX/Hua_yang.html",
        "https://yanxi36.github.io/brand/APLAX/Marrow.html"
    ];

    for (var i = 0; i < urls.length; i++) {
        var url = urls[i];
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.text();

                var parser = new DOMParser();
                var doc = parser.parseFromString(data, "text/html");
                var pageTitle = doc.querySelector("title").textContent;

                if (data.toLowerCase().includes(searchInput)) {
                    var resultLink = document.createElement("a");
                    resultLink.href = url;
                    resultLink.textContent = pageTitle;
                    searchResults.appendChild(resultLink);
                    searchResults.appendChild(document.createElement("br"));
                }
            } else {
                console.error("Failed to load the page：" + url);
            }
        } catch (error) {
            console.error("Failed to load the page：" + url);
        }
    }
}
