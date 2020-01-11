
var $tbody = document.querySelector("tbody");
var $timeInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var startingIndex = 0;
var resultsPerPage = 50;
var filteredDataSet = data;

// Button event listener
$searchBtn.addEventListener("click", handleSearchButtonClick);

// renderTable
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredDataSet.length; i++) {

    var data = filteredDataSet[i];
    var fields = Object.keys(data);

    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {

      // Create cells and populate
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data[field];
    }
  }
}

function handleSearchButtonClick() {

  // Trim and lowercase input
  var filterDateTime = $timeInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // Apply filter
  filteredDataSet = data.filter(function(data) {
    var dateTimeField = data.datetime.toLowerCase();
    var cityField = data.city.toLowerCase();
    var stateField = data.state.toLowerCase();
    var countryField = data.country.toLowerCase();
    var shapeField = data.shape.toLowerCase();

    var allFields = 
      (filterDateTime === "" || dateTimeField === filterDateTime) &&
      (filterCity === "" || cityField === filterCity) &&
      (filterCountry === "" || countryField === filterCountry) &&
      (filterState === "" || stateField === filterState) &&
      (filterShape === "" || shapeField === filterShape);
    return allFields;

  });
  renderTable();
}

$loadMoreBtn.addEventListener("click", handleButtonClick);

function handleButtonClick() {
  startingIndex += resultsPerPage;
  renderTable();

  if (startingIndex + resultsPerPage >= filteredDataSet.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All Data Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
}

// Render table on page load
renderTable();