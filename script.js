// Run functions when page loads
intro();
tagline();

function intro() {
let day = new Date();
let hr = day.getHours();
console.log(hr);

if (hr >= 6 && hr <= 12) {
  document.getElementById("header").innerHTML = "xvxl's,<br>Good morning!"
}
if (hr >= 12 && hr <= 16) {
  document.getElementById("header").innerHTML = "xvxl's,<br>Good afternoon!"
}
if (hr >= 16 && hr <= 23) {
  document.getElementById("header").innerHTML = "xvxl's,<br>Good evening!"
}
if (hr >= 23 || hr <= 6) {
  document.getElementById("header").innerHTML = "xvxl's,<br>Good night!"
}
}

function tagline() {
  document.getElementById("tagline").innerHTML = 'A <a class="textLink" id="githubLink" href="https://github.com/silentswrd">xvxl</a> site. ︱ <a class="textLink" id="githubLink" href="https://github.com/silentswrd">xvxl</a>l에서 만든 웹사이트'
}