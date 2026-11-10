const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

searchBtn.addEventListener("click", function() {
    searchResult.textContent =
        "You searched for: " + searchInput.value;
});

resetBtn.addEventListener("click", function() {
    searchInput.value = "";
    searchResult.textContent = "";
});