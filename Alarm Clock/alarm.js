var setAlarm = document.getElementById('submit');
setAlarm.addEventListener('click', setNewAlarm);

// Get the alarms list container element
const alarmsList = document.getElementById("alarmsList");
const alarmsArray = [];

// Function to create and display an alarm in the list
function displayAlarms() {
  alarmsList.innerHTML = '';

  // Iterate over the alarmsArray and display each alarm
  alarmsArray.forEach((alarm, index) => {
    // Create a new list item element
    const listItem = document.createElement("li");

    // Set the text content of the list item
    listItem.textContent = `${alarm.hour}:${alarm.minute}  ${alarm.AmPm}`;

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
  var InputalarmDate = document.getElementById('date');
  alarmDate = new Date(InputalarmDate.value);
  let currentDate = new Date().getTime();
  let timeToAlarm = alarmDate - currentDate;

  // Ring the bell at the time of alarm
  var tune = new Audio("alarm-clock-tune.mp3");
  if (timeToAlarm >= 0) {
    setTimeout(() => {
      tune.play();
      // Remove the alarm from the array after it has rung
      alarmsArray.shift();
      displayAlarms();
    }, timeToAlarm);
  }

  // Add the new alarm to the array
  let alarmHour = alarmDate.getHours().toString().padStart(2, '0'); // Get the hours (0-23)
  var AmPm = alarmHour >= 12 ? 'PM' : 'AM';
  alarmHour = (alarmHour % 12) || 12;
  const paddedAlarmHour = alarmHour.toString().padStart(2, '0');
  const alarmMinute = alarmDate.getMinutes().toString().padStart(2, '0'); // Get the minutes (0-59)

  const alarm = {
    hour: paddedAlarmHour,
    minute: alarmMinute,
    AmPm: AmPm,
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
