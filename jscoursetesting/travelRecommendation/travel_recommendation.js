
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

let travelData = null;

// Task 6: Fetch data from JSON
fetch("travel_recommendation_api.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load JSON");
        }
        return response.json();
    })
    .then(data => {
        travelData = data;
        console.log("Travel data loaded:", data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

// Task 7: Search for recommendations
searchBtn.addEventListener("click", function() {

    const keyword = searchInput.value.toLowerCase().trim();

    searchResult.innerHTML = "";

    if (!travelData) {
        searchResult.textContent = "Travel data not loaded.";
        return;
    }

    if (keyword === "") {
        searchResult.textContent = "Please enter a keyword.";
        return;
    }

    let results = [];

    // Search for beaches
    if (keyword === "beach" || keyword === "beaches") {
        results = travelData.beaches || [];
    }

    // Search for temples
    else if (keyword === "temple" || keyword === "temples") {
        results = travelData.temples || [];
    }

    // Search for countries
    else if (keyword === "country" || keyword === "countries") {
        (travelData.countries || []).forEach(country => {
            results.push(...country.cities);
        });
    }

    // Search for specific countries or cities
    else {
        (travelData.countries || []).forEach(country => {
            country.cities.forEach(city => {

                if (
                    country.name.toLowerCase().includes(keyword) ||
                    city.name.toLowerCase().includes(keyword)
                ) {
                    results.push(city);
                }

            });
        });
    }

    // Display the results
    if (results.length > 0) {
        results.forEach(place => {
            displayResult(place);
        });
    } else {
        searchResult.textContent = "No recommendations found.";
    }

});

// Function to display each destination
function displayResult(place) {

    const card = document.createElement("div");
    card.className = "result-card";

    const title = document.createElement("h3");
    title.textContent = place.name;

    const image = document.createElement("img");
    image.src = place.imageUrl;
    image.alt = place.name;
    image.width = 300;

    const description = document.createElement("p");
    description.textContent = place.description;

    card.append(title, image, description);
    searchResult.appendChild(card);
}

// Reset button
resetBtn.addEventListener("click", function() {
    searchInput.value = "";
    searchResult.innerHTML = "";
});

