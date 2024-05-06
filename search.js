// Developer: Yantong Wu
// File Purpose: The search function (commonly used)
// Update Date: 2024/05/06

async function createResultLink(href, textContent) {
    const resultLink = document.createElement("a");
    resultLink.href = href;
    resultLink.textContent = textContent;
    searchResults.appendChild(resultLink);
    searchResults.appendChild(document.createElement("br"));
}

async function search() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase().replace(/\s/g, ''); // Remove spaces
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    const processSeriesConfig = async (seriesConfig) => {
        const seriesTitle = seriesConfig.title.toLowerCase().replace(/\s/g, '');

        if (seriesTitle.includes(searchInput)) {
            await createResultLink(seriesConfig.page, seriesConfig.title);
        }

        await Promise.all(seriesConfig.imageInfo.map(async (image) => {
            if (image.displayText.toLowerCase().replace(/\s/g, '').includes(searchInput)) {
                await createResultLink(seriesConfig.page, seriesConfig.title);
            }
        }));
    };

    for (const seriesConfig of Object.values(productConfigs)) {
        await processSeriesConfig(seriesConfig);
    }

    const urls = [
        "https://yanxi36.github.io",
        "https://yanxi36.github.io/salesbase.html",
        "https://yanxi36.github.io/download.html",

        "https://yanxi36.github.io/brand/ADC/ADC.html",
        "https://yanxi36.github.io/brand/APLAX/APLAX.html", 
        "https://yanxi36.github.io/brand/AKATO/AKATO.html", 
        "https://yanxi36.github.io/brand/KSK/KSK.html", 
    ];

    await Promise.all(urls.map(async (url) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.text();
                if (data.toLowerCase().replace(/\s/g, '').includes(searchInput)) {
                    const pageTitle = new DOMParser().parseFromString(data, "text/html").querySelector("title").textContent;
                    await createResultLink(url, pageTitle);
                }
            } else {
                console.error("Failed to load the page: " + url);
            }
        } catch (error) {
            console.error("Failed to load the page: " + url);
        }
    }));
}
