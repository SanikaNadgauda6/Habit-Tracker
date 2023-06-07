// Get the submit button element
var setAlarm = document.getElementById('submit');

// Add an event listener to the submit button
setAlarm.addEventListener('click', setNewAlarm);

// Get the alarms list container element
const alarmsList = document.getElementById("alarmsList");

// Array to store alarms
const alarmsArray = [];

// Function to create and display an alarm in the list
function displayAlarms() {
  // Clear the alarms list
  alarmsList.innerHTML = '';

  // Iterate over the alarmsArray and display each alarm
  alarmsArray.forEach((alarm, index) => {
    // Create a new list item element
    const listItem = document.createElement("li");

//   // Convert the hours to 12-hour format
//   let hour12 = alarm.hour % 12;
//   hour12 = hour12 === 0 ? 12 : hour12;

//   // Determine if it's AM or PM
//   const period = alarm.hour >= 12 ? 'PM' : 'AM';

//   // Set the text content of the list item with the formatted time
//   listItem.textContent = `${hour12}:${formattedMinute} ${period}`;


//   // Format the hours and minutes with leading zeros
//   const formattedHour = alarm.hour.toString().padStart(2, '0');
//   const formattedMinute = alarm.minute.toString().padStart(2, '0');

    // Set the text content of the list item
    listItem.textContent = `${alarm.hour}:${alarm.minute}`;

    // Create a delete button for each alarm
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", () => {
      deleteAlarm(index);
    });

    // Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // Append the list item to the alarms list container
    alarmsList.appendChild(listItem);
  });
}


function setNewAlarm() {
  // Get the date input element
  var alarmDate = document.getElementById('date');
  alarmDate = new Date(alarmDate.value);
  currentDate = new Date().getTime();

  // Ring the bell at the time of alarm
  var timeToAlarm = alarmDate - currentDate;
  var tune = new Audio("alarm-clock-tune.mp3");
  if (timeToAlarm >= 0) {
    setTimeout(() => {
      tune.play();
    }, timeToAlarm);
  }

  // Add the new alarm to the array
  const alarmHour = alarmDate.getHours(); // Get the hours (0-23)
  if (alarmHour.length < 2) {
    alarmHour = '0' + alarmHour;
  }
  const alarmMinute = alarmDate.getMinutes(); // Get the minutes (0-59)

  if (alarmMinute.length < 2) {
    alarmMinute = '0' + alarmMinute;
  }


  const alarm = {
    hour: alarmHour,
    minute: alarmMinute,
  };
  

  alarmsArray.push(alarm); // Add the new alarm to the array
  displayAlarms(); // Display all alarms in the list

  // Prevent form submission
  event.preventDefault();
}

// Function to delete an alarm
function deleteAlarm(index) {
  alarmsArray.splice(index, 1); // Remove the alarm from the array
  displayAlarms(); // Display the updated alarms list
}

// Update the current time every second
setInterval(() => {
  let liveDate = new Date();
  document.getElementById("currentTime").innerHTML = liveDate.toLocaleTimeString();
}, 1000);







//    // counting how many days , hrs, mins & secs are remaining for the alarm
//         // var days = Math.floor( timeToAlarm / (1000*60*60*24));

//         // var hours = Math.floor( (timeToAlarm % (1000*60*60*24)) / (1000*60*60) );
//         // // console.log(hours, "Hours");

//         // var minutes = Math.floor((timeToAlarm % (1000*60*60)) / (1000*60) );
//         // // console.log(minutes, "Mins");

//         // var seconds = Math.floor((timeToAlarm % (1000*60)) / 1000 );
//         // // console.log(seconds, "secs");

//         // var Show = days +" Day(s), "+hours+" hrs, "+ minutes+" min, "+seconds+" secs. ";

//         // document.getElementById("show").innerHTML = Show;
