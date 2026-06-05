const coins = [
    {
        id: "bitcoin",
        symbol: "btc",
        priceEl: "btc-price",
        changeEl: "btc-change",
        capEl: "btc-marketcap",
        chartEl: "btc-chart",
        chart: null,
        history: []
    },
    {
        id: "ethereum",
        symbol: "eth",
        priceEl: "eth-price",
        changeEl: "eth-change",
        capEl: "eth-marketcap",
        chartEl: "eth-chart",
        chart: null,
        history: []
    },
    {
        id: "solana",
        symbol: "sol",
        priceEl: "sol-price",
        changeEl: "sol-change",
        capEl: "sol-marketcap",
        chartEl: "sol-chart",
        chart: null,
        history: []
    }
];

async function fetchMarketData() {

    try {

        const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=24h"
        );

        const data = await res.json();

        data.forEach(updateCoin);

    } catch (err) {
        console.error("Error fetching crypto data:", err);
    }
}

function updateCoin(coinData) {

    const coin = coins.find(c => c.id === coinData.id);

    if (!coin) return;

    // Animate price
    animateValue(
        coin.priceEl,
        coinData.current_price
    );

    // Market cap
    document.getElementById(coin.capEl).textContent =
        "$" + coinData.market_cap.toLocaleString();

    // Change %
    const change = coinData.price_change_percentage_24h.toFixed(2);

    const changeEl = document.getElementById(coin.changeEl);

    changeEl.textContent = `${change}%`;

    changeEl.classList.remove("positive", "negative");

    if (change >= 0) {
        changeEl.classList.add("positive");
    } else {
        changeEl.classList.add("negative");
    }

    // Update chart history
    updateChart(coin, coinData.current_price);
}

function animateValue(elementId, endValue) {

    const el = document.getElementById(elementId);

    let start = 0;
    let duration = 800;
    let startTime = null;

    function animate(currentTime) {

        if (!startTime) startTime = currentTime;

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const value = Math.floor(
            progress * (endValue - start) + start
        );

        el.textContent = "$" + value.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function updateChart(coin, price) {

    coin.history.push(price);

    if (coin.history.length > 12) {
        coin.history.shift();
    }

    const ctx = document.getElementById(coin.chartEl);

    if (!coin.chart) {

        coin.chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: coin.history.map((_, i) => i),
                datasets: [{
                    data: coin.history,
                    borderColor: "#38bdf8",
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });

    } else {

        coin.chart.data.labels = coin.history.map((_, i) => i);
        coin.chart.data.datasets[0].data = coin.history;
        coin.chart.update();

    }
}
// INIT
fetchMarketData();
setInterval(fetchMarketData, 30000);
const elements = document.querySelectorAll(".section-title, .market-card, .feature-card, .testimonial-card, .cta-box");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.1
});

elements.forEach(el => {
    el.classList.add("fade-in");
    observer.observe(el);
});
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {

        // close others (optional but cleaner UX)
        faqItems.forEach(el => {
            if(el !== item){
                el.classList.remove("active");
            }
        });

        // toggle current
        item.classList.toggle("active");

    });

});