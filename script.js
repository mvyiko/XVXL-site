// Run functions
countdown();
intro();


function countdown() {
  // Set the date we're counting down to
  var countDownDate = new Date("March 1, 2023 0:0:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "IT'S MY BDAY";
    }
  }, 1000);
}


function intro() {
let day = new Date();
let hr = day.getHours();
console.log(hr);

if (hr > 6 && hr < 12) {
  document.getElementById("header").innerText = "おはよう！ - Good morning!"
}
if (hr > 12 && hr < 16) {
  document.getElementById("header").innerText = "こんにちは！ - Good afternoon!"
}
if (hr > 16 && hr < 23) {
  document.getElementById("header").innerText = "こんばんは！ - Good evening!"
}
if (hr > 23 || hr < 6) {
  document.getElementById("header").innerText = "おやすみなさい！ - Good night!"
}
}
