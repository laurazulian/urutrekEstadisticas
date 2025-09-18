const kpiData = {
    7: {visualizaciones:88600, interacciones:1000, seguidores:280, mensajes:81, "ads-impressions":12400, "ads-clicks":1300, "ads-spend":560, "ads-conversions":48},
    30: {visualizaciones:320000, interacciones:4200, seguidores:1100, mensajes:340, "ads-impressions":52000, "ads-clicks":5100, "ads-spend":2100, "ads-conversions":190},
    90: {visualizaciones:900000, interacciones:12000, seguidores:3000, mensajes:980, "ads-impressions":140000, "ads-clicks":13500, "ads-spend":5600, "ads-conversions":520}
};

let charts = {};

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

function updateKPIs(days) {
    const kpis = document.querySelectorAll('.kpi-card');
    kpis.forEach(card => {
        const key = card.getAttribute('data-kpi');
        animateValue(card.querySelector('.kpi-value'), 0, kpiData[days][key], 800);
    });
}

function updateCharts(days) {
    const labels = Array.from({length: days}, (_, i) => `Día ${i+1}`);
    const mainData = Array.from({length: days}, () => Math.floor(Math.random()*2000+1000));
    const engagementData = Array.from({length: days}, () => Math.floor(Math.random()*300+50));
    const adsImpressions = Array.from({length: days}, () => Math.floor(Math.random()*5000+1000));
    const adsClicks = Array.from({length: days}, () => Math.floor(Math.random()*500+50));
    const adsSpend = Array.from({length: days}, () => Math.floor(Math.random()*200+50));
    const adsConv = Array.from({length: days}, () => Math.floor(Math.random()*50+5));

    if (charts.main) charts.main.destroy();
    charts.main = new Chart(document.getElementById('mainChart'), {
        type: 'line',
        data: { labels: labels, datasets:[
            {label:'Visualizaciones', data:mainData, borderColor:'#48dbfb', backgroundColor:'rgba(72,219,251,0.2)', tension:0.4},
            {label:'Interacciones', data:engagementData, borderColor:'#ff6b6b', backgroundColor:'rgba(255,107,107,0.2)', tension:0.4}
        ]},
        options:{responsive:true, maintainAspectRatio:false}
    });

    if (charts.ads) charts.ads.destroy();
    charts.ads = new Chart(document.getElementById('adsChart'), {
        type:'bar',
        data:{ labels:labels, datasets:[
            {label:'Impresiones', data:adsImpressions, backgroundColor:'#ff6b6b'},
            {label:'Clics', data:adsClicks, backgroundColor:'#feca57'},
            {label:'Gasto ($)', data:adsSpend, backgroundColor:'#48dbfb'},
            {label:'Conversiones', data:adsConv, backgroundColor:'#2ed573'}
        ]},
        options:{responsive:true, maintainAspectRatio:false}
    });
}

document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click', function(){
        document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const days = parseInt(btn.getAttribute('data-days'));
        document.getElementById('dateRange').textContent = `Últimos ${days} días`;
        updateKPIs(days);
        updateCharts(days);
    });
});

// Inicializar dashboard
updateKPIs(7);
updateCharts(7);

// --- Datos simulados de contenido y insights ---
const samplePosts = [
    "Post sobre lanzamiento de producto",
    "Historias con encuesta",
    "Reels más vistos",
    "Campaña Ads segmentada",
    "Colaboración con influencer",
    "Contenido educativo",
    "Promoción especial",
    "Post viral con alta interacción"
];

const sampleInsights = [
    "El post más reciente tuvo un 30% más de engagement que el promedio.",
    "Las publicaciones con video generaron 2x más visualizaciones.",
    "Los stories con encuesta aumentan los mensajes directos un 50%.",
    "El mejor horario para publicar es entre 18 y 20 hs.",
    "La campaña de Ads tuvo un CTR del 5%, superior al promedio.",
    "Los seguidores nuevos provienen principalmente de Reels.",
    "Las publicaciones con colaboración aumentan la tasa de conversión.",
    "El contenido educativo tiene un mayor tiempo de visualización."
];

function updateInsights(days) {
    const insightsPanel = document.getElementById('insightsPanel');
    insightsPanel.innerHTML = "<h3>💡 Insights Clave</h3>"; // Reset

    // Seleccionamos 3 insights aleatorios
    const shuffled = sampleInsights.sort(()=>0.5-Math.random());
    const selected = shuffled.slice(0,3);

    selected.forEach(insight=>{
        const div = document.createElement('div');
        div.className = "insight-item";
        div.innerHTML = `<h4>💡</h4><p>${insight}</p>`;
        insightsPanel.appendChild(div);
    });
}

function updateContentPreview(days) {
    const contentItems = document.getElementById('contentItems');
    contentItems.innerHTML = ""; // Reset
    const shuffled = samplePosts.sort(()=>0.5-Math.random());
    const selected = shuffled.slice(0,6);
    selected.forEach(post=>{
        const div = document.createElement('div');
        div.className = "content-item";
        div.innerHTML = `<div class="content-image">📸</div><p>${post}</p>`;
        contentItems.appendChild(div);
    });
}

// Modificar el listener de botones para actualizar insights y contenido
document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click', function(){
        document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const days = parseInt(btn.getAttribute('data-days'));
        document.getElementById('dateRange').textContent = `Últimos ${days} días`;
        updateKPIs(days);
        updateCharts(days);
        updateInsights(days);
        updateContentPreview(days);
    });
});

// Inicializar insights y contenido al cargar
updateKPIs(7);
updateCharts(7);
updateInsights(7);
updateContentPreview(7);
