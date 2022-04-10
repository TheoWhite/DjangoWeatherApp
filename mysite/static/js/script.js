//Setup
 // Hide the error tag
 $("#error").hide();
let jsonDATA = "";
getUserData();
	
setInterval( cleanUpandStart, 30000 );

function cleanUpandStart(params) {
	const element = document.getElementById('table-element');
	element.remove(); // Removes the div with the 'div-02' id
	getUserData();
}

//Handle function for GET request
function getUserData()
{
$.ajax({
			url:"/getData",
			type: 'GET', 
			success:  function(data) {
				refreshTable(data);
		}});
}


function getTemp(city)
	{
	var key = "&appid=3564b5c94a638e8f1b203059d2e81809";
	var url = "https://api.openweathermap.org/data/2.5/weather?q=";
	$.ajax({
			url:url+city+key,
			type: 'GET', 
			success:  function(data) {
				//(0K − 273.15) × 9/5 + 32 = -459.7°F
				document.getElementById(city+ "temp").innerHTML = Math.round((data.main.temp - 273.15) * (9/5) + 32) + "F"; 
		}});
}


//Handle function for rendering table/divs
function refreshTable(x)
	{
	var body_of_document = document.body;
	
	//Create row for each triplet + table_headers
	x = JSON.parse(x);


//Create table for DOM
	var table = document.createElement('table');
		table.id = "table-element";
		//Create the header of the table
		const row = table.insertRow();
		var new_city_cell = row.insertCell();
		var new_user_cell = row.insertCell();
		var new_temp_cell = row.insertCell();
		//Create the text for each cell
		var new_city_cell_text = "City";
		var new_user_cell_text = "User";
		var new_temp_cell_text = "Temperature";
		//Apppend
		new_city_cell.appendChild(document.createTextNode(new_city_cell_text));
		new_user_cell.appendChild(document.createTextNode(new_user_cell_text));
		new_temp_cell.appendChild(document.createTextNode(new_temp_cell_text));
		
		//This is for each row_count 
		for(var row_count = 0; row_count != x.length; ++row_count)
			{
				const row = table.insertRow();
		
				//Create each cell
				var new_city_cell = row.insertCell();
				var new_user_cell = row.insertCell();
				var new_temp_cell = row.insertCell();
				
				//Create the text for each cell
				
				//Write the values to each cell
				var city_json = x[row_count].data;
				var new_city_cell_text = city_json;
				var new_user_cell_text = x[row_count].owner_id;
				var new_temp_cell_text =  "0 F";
				getTemp(city_json);
				//Set id of element so we can change the value later.
				new_temp_cell.id = (city_json + "temp");
				
				new_city_cell.appendChild(document.createTextNode(new_city_cell_text))
				new_user_cell.appendChild(document.createTextNode(new_user_cell_text))
				new_temp_cell.appendChild(document.createTextNode(new_temp_cell_text))
			}
		
		body_of_document.appendChild(table);
	}



//Handle function for filtering Users


//Handle api call to weatherData
//TODO: FIX
function getWeather(city)
	{
	var key = "&appid=3564b5c94a638e8f1b203059d2e81809";
	var url = "https://api.openweathermap.org/data/2.5/weather?q=";
		var x = '{"cod":"404","message":"city not found"}';
				document.getElementById("new-city-state").innerHTML = x;
	$.ajax({
			url:url+city+key,
			type: 'GET', 
			success:  function(data) {
				
				if(parseInt(data.cod) === 200)
				{
					document.getElementById("new-city-state").innerHTML = "Valid city";
				} 
		}});
}


/*
*	Get user input 
*/

//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 5 seconds for example
var $input = $('input');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});



//Handle error
function createError(errorMsg)
	{
		$("#error").delay(20000);
		$('#error-state').text(errorMsg)
	}

//Handle submit button & verify data
//user is "finished typing," do something
function doneTyping () {	
  	//Firstly lets check that there is data in both inputs 
		var cityValue = document.getElementById('city').value;
		var nameValue = document.getElementById('user').value;
		var errorString = '';
        if (cityValue === '') {
            //Missing value for name so send error
					  // Show the div in 5s
    					errorString = errorString + " Missing city";
        } else {
					getWeather(cityValue);
				}
				if (nameValue === '')
				{
					errorString = errorString + " Missing name";
				}
	if((nameValue != "" )&& (cityValue != ""))
	{
		  document.getElementById("submit-button").disabled = false;
	} else {
		  document.getElementById("submit-button").disabled = true;
	}
		/*
		 * If there are errors with the input call error
		 * else verify the city name.
		*/
		if(errorString !== '')
		{
			createError(errorString);
		} else {
			//Verify the city 
			getWeather(cityValue);
		}
	
	 clearTimeout(typingTimer);
}
