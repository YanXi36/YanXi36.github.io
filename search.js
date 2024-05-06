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
        "https://yanxi36.github.io/brand/ADC/Gao_jia.html", 
        "https://yanxi36.github.io/brand/ADC/Gradient.html", 
        "https://yanxi36.github.io/brand/ADC/Goy.html",
        "https://yanxi36.github.io/brand/ADC/Gao_ling.html",
        "https://yanxi36.github.io/brand/ADC/Gao_porcelain.html",
        "https://yanxi36.github.io/brand/ADC/Gao_xiang.html",
        "https://yanxi36.github.io/brand/ADC/Gose.html",
        "https://yanxi36.github.io/brand/ADC/Gao_ya.html", 
        "https://yanxi36.github.io/brand/ADC/Gao_ge.html",
        "https://yanxi36.github.io/brand/ADC/Dian_jing.html",
        "https://yanxi36.github.io/brand/ADC/Gao_zheng01.html", 
        "https://yanxi36.github.io/brand/ADC/Gao_zheng23.html",
        "https://yanxi36.github.io/brand/ADC/Gao_cheng.html", 
        "https://yanxi36.github.io/brand/ADC/Gao_fang.html", 
        "https://yanxi36.github.io/brand/ADC/Gao_fu.html", 
        "https://yanxi36.github.io/brand/ADC/Gao_so.html", 
        "https://yanxi36.github.io/brand/ADC/Gao_ping.html", 
        "https://yanxi36.github.io/brand/ADC/Gao_guang.html", 
        "https://yanxi36.github.io/brand/ADC/Gao_wang.html", 
        "https://yanxi36.github.io/brand/ADC/Gao_yan.html", 
        "https://yanxi36.github.io/brand/ADC/Gao_pin.html", 

        "https://yanxi36.github.io/brand/APLAX/APLAX.html", 
        "https://yanxi36.github.io/brand/APLAX/Chao_jing.html", 
        "https://yanxi36.github.io/brand/APLAX/Duo_la.html", 
        "https://yanxi36.github.io/brand/APLAX/Hua_yang.html",
        "https://yanxi36.github.io/brand/APLAX/Fong_cai.html",
        "https://yanxi36.github.io/brand/APLAX/Kaleidoscope.html",
        "https://yanxi36.github.io/brand/APLAX/Star.html",    
        "https://yanxi36.github.io/brand/APLAX/Galaxy.html", 
        "https://yanxi36.github.io/brand/APLAX/Marrow.html", 

        "https://yanxi36.github.io/brand/AKATO/AKATO.html", 
        "https://yanxi36.github.io/brand/AKATO/Ka_le.html", 
        "https://yanxi36.github.io/brand/AKATO/Ci_cheng.html", 
        "https://yanxi36.github.io/brand/AKATO/Xiong_ben.html", 
        "https://yanxi36.github.io/brand/AKATO/Qun_ma.html", 
        "https://yanxi36.github.io/brand/AKATO/Jing_gang.html", 
        "https://yanxi36.github.io/brand/AKATO/Shin_Osaka.html", 

        "https://yanxi36.github.io/brand/KSK/KSK.html", 
        "https://yanxi36.github.io/brand/KSK/Cai_Hue.html",
        "https://yanxi36.github.io/brand/KSK/Yi_Si.html", 
        "https://yanxi36.github.io/brand/KSK/Yan_Nian.html", 
        "https://yanxi36.github.io/brand/KSK/De_Dao.html", 
        "https://yanxi36.github.io/brand/KSK/Xian_Tuan.html", 
        "https://yanxi36.github.io/brand/KSK/Xin_Wun_Nian.html"
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
