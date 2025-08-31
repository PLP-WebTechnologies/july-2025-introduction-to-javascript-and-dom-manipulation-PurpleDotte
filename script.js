// Prices for meals and sides
const prices = {
    "kota": 45,
    "quarter_leg": 30,
    "steak": 35,
    "chicken_wings": 35,
    "pap": 20,
    "rice": 25,
    "chips": 25
};

// Function to update the description of the selected meal
function updateDescription(selectedPlate) {
    const description = document.getElementById("description");
    switch (selectedPlate) {
        case 'kota':
            description.textContent = "A delicious street food sandwich with a variety of fillings!";
            break;
        case 'quarter_leg':
            description.textContent = "A succulent, tender quarter leg of chicken, grilled to perfection!";
            break;
        case 'steak':
            description.textContent = "Juicy steak grilled to your preference with savory seasoning!";
            break;
        case 'chicken_wings':
            description.textContent = "Crispy, golden fried chicken wings, perfect for sharing!";
            break;
        default:
            description.textContent = "";
    }
}

// Function to show or hide the side selection based on the plate
function toggleSideSelection(selectedPlate) {
    const sideSelectContainer = document.getElementById("side_select_container");
    const radios = document.getElementsByName("side");

    // Show side selection only if the selected plate is Quarter Leg, Steak, or Chicken Wings
    if (["quarter_leg", "steak", "chicken_wings"].includes(selectedPlate)) {
        sideSelectContainer.style.display = "block"; // Show side selection for these plates
        radios.forEach(radio => radio.disabled = false); // Enable the radio buttons
        // Clear any previously selected radio button (no default selection)
        radios.forEach(radio => radio.checked = false);
    } else {
        sideSelectContainer.style.display = "none"; // Hide side selection if Kota is selected
        radios.forEach(radio => radio.disabled = true); // Disable the radio buttons for Kota
    }
}

// Function to get the selected side
function getSelectedSide() {
    let selectedSide = null;
    const radios = document.getElementsByName("side");
    radios.forEach(radio => {
        if (radio.checked) {
            selectedSide = radio.value;
        }
    });
    return selectedSide;
}

// Function to generate the receipt table based on the selection
function generateReceipt(selectedPlate, selectedSide) {
    const receiptContainer = document.getElementById("receipt_container");
    const receiptBody = document.getElementById("receipt_body");
    receiptBody.innerHTML = ""; // Clear previous entries
    document.getElementById("total_price").textContent = ""; // Clear previous total

    // Always show the plate (meal) and its price
    const platePrice = prices[selectedPlate];
    const plateRow = `<tr><td>${capitalizeFirstLetter(selectedPlate)}</td><td>R${platePrice}</td></tr>`;
    receiptBody.innerHTML += plateRow;

    // If the plate is NOT Kota and a side is selected, add the side item to the receipt
    let total = platePrice;
    if (selectedPlate !== "kota" && selectedSide) {
        const sidePrice = prices[selectedSide];
        total += sidePrice;
        const sideRow = `<tr><td>${capitalizeFirstLetter(selectedSide)}</td><td>R${sidePrice}</td></tr>`;
        receiptBody.innerHTML += sideRow;
    }

    // Display the total price
    document.getElementById("total_price").textContent = `Total: R${total}`;

    // Show the receipt container
    receiptContainer.style.display = "block";
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Main function to handle the selection changes
function showSelection() {
    const plateSelect = document.getElementById("plate_select");
    const selectedPlate = plateSelect.value;

    // Update the description based on the selected plate
    updateDescription(selectedPlate);

    // Show or hide the side selection and enable/disable radio buttons
    toggleSideSelection(selectedPlate);

    // Hide the receipt initially (in case a plate has been selected before the side selection)
    document.getElementById("receipt_container").style.display = "none";

    // If Kota is selected, we don't need to check for a side, just generate the receipt
    if (selectedPlate === "kota") {
        generateReceipt(selectedPlate, null); // No side selection for Kota
    }
}

// When a side is selected, generate the receipt
function sideSelectionChanged() {
    const plateSelect = document.getElementById("plate_select");
    const selectedPlate = plateSelect.value;

    // Get the selected side
    const selectedSide = getSelectedSide();

    // Generate the receipt if a side is selected
    if (selectedSide) {
        generateReceipt(selectedPlate, selectedSide);
    }
}
