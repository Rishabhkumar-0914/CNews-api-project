// ========================================
// CNEWS PREMIUM SCRIPT
// PART 3A
// ========================================

const apiKey = "15701cfcc6a94d42a2cd2c4986e42f65";

const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");

const loader = document.getElementById("loader");

// -----------------------------
// Country Flags
// -----------------------------

const countryFlags = {
India:"https://flagcdn.com/w320/in.png",
USA:"https://flagcdn.com/w320/us.png",
UK:"https://flagcdn.com/w320/gb.png",
Germany:"https://flagcdn.com/w320/de.png",
France:"https://flagcdn.com/w320/fr.png",
Japan:"https://flagcdn.com/w320/jp.png",
China:"https://flagcdn.com/w320/cn.png",
Canada:"https://flagcdn.com/w320/ca.png",
Australia:"https://flagcdn.com/w320/au.png",
Russia:"https://flagcdn.com/w320/ru.png",
Italy:"https://flagcdn.com/w320/it.png",
Brazil:"https://flagcdn.com/w320/br.png",
Nepal:"https://flagcdn.com/w320/np.png",
Pakistan:"https://flagcdn.com/w320/pk.png",
Bangladesh:"https://flagcdn.com/w320/bd.png",
"Sri Lanka":"https://flagcdn.com/w320/lk.png",
"South Korea":"https://flagcdn.com/w320/kr.png",
Spain:"https://flagcdn.com/w320/es.png",
Mexico:"https://flagcdn.com/w320/mx.png",
Indonesia:"https://flagcdn.com/w320/id.png"
};

// -----------------------------------
// Loading
// -----------------------------------

function showLoader(){
if(loader){
loader.style.display="block";
}
newsContainer.innerHTML="";
}

function hideLoader(){
if(loader){
loader.style.display="none";
}
}

// -----------------------------------
// Search
// -----------------------------------

function searchNews(){
const query=searchInput.value.trim();
if(query===""){
alert("Please enter a country or topic.");
return;
}
fetchNews(query);
}

// -----------------------------------
// ENTER KEY
// -----------------------------------

searchInput.addEventListener("keypress",function(e){
if(e.key==="Enter"){
searchNews();
}
});

// -----------------------------------
// Fetch News
// -----------------------------------

async function fetchNews(place){
showLoader();
try{
const response=await fetch(
`https://newsapi.org/v2/everything?q=${encodeURIComponent(place)}&sortBy=publishedAt&language=en&pageSize=20&apiKey=${apiKey}`
);
const data=await response.json();
hideLoader();
if(data.status==="ok" && data.articles.length>0){
displayNews(data.articles,place);
}
else{
newsContainer.innerHTML=
`
<div class="news-card">
<div class="news-content">
<h3>
No News Found
</h3>
<p>
No articles available for
<strong>${place}</strong>
</p>
</div>
</div>
`;
}
}
catch(error){
hideLoader();
console.log(error);
newsContainer.innerHTML=
`
<div class="news-card">
<div class="news-content">
<h3>
Oops!
</h3>
<p>
Something went wrong while fetching news.
Please try again later.
</p>
</div>
</div>
`;
}
}

// -----------------------------------
// Default News
// -----------------------------------

fetchNews("India");

// ========================================
// PART 3B
// Premium News Cards
// ========================================

function formatDate(dateString){
const date=new Date(dateString);
return date.toLocaleDateString("en-IN",{
day:"numeric",
month:"short",
year:"numeric"
});
}

// ---------------------------------------
// Display News
// ---------------------------------------

function displayNews(articles,place){
const flagURL=
countryFlags[place] ||
"https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200";

document.body.style.backgroundImage=
`linear-gradient(rgba(255,255,255,.90),rgba(255,255,255,.90)),url(${flagURL})`;

document.body.style.backgroundSize="cover";
document.body.style.backgroundAttachment="fixed";

newsContainer.innerHTML="";

articles.forEach(article=>{
const image=
article.urlToImage ||
"https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800";

const description=
article.description ||
"No description available for this article.";

const source=
article.source.name ||
"Unknown Source";

const published=
formatDate(article.publishedAt);

const card=document.createElement("div");
card.className="news-card";

card.innerHTML=
`
<img
src="${image}"
alt="News"
onerror="this.src='https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800'"
>
<div class="news-content">
<div style="display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:12px;">
<span
style="
background:#2563eb;
color:#fff;
padding:6px 12px;
border-radius:20px;
font-size:12px;
font-weight:600;">
${source}
</span>
<span
style="
font-size:12px;
color:#666;">
${published}
</span>
</div>
<h3>
${article.title}
</h3>
<p>
${description}
</p>
<a
href="${article.url}"
target="_blank">
Read Full Article →
</a>
</div>
`;

newsContainer.appendChild(card);
});

window.scrollTo({
top:650,
behavior:"smooth"
});
}

// =======================================
// Category Buttons Support
// =======================================

document.querySelectorAll(".categories button")
.forEach(button=>{
button.addEventListener("click",()=>{
const keyword=
button.innerText
.replace(/[^\w\s]/g,"")
.trim();
fetchNews(keyword);
});
});

// =======================================
// Small Hover Animation
// =======================================

document.addEventListener("mouseover",function(e){
if(e.target.closest(".news-card")){
e.target.closest(".news-card")
.style.transform="translateY(-8px)";
}
});

document.addEventListener("mouseout",function(e){
if(e.target.closest(".news-card")){
e.target.closest(".news-card")
.style.transform="translateY(0px)";
}
});

// =======================================
// Welcome Message
// =======================================

console.log("✅ CNews Premium Loaded Successfully");