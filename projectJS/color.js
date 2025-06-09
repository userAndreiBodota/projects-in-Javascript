const body = document.querySelector("body");
const colorGreen = document.getElementById("green");
const colorRed = document.getElementById("red");
const colorBlack = document.getElementById("black");
const colorRandom = document.getElementById("random");

colorGreen.addEventListener("click", () => {
  if (document.body.style.backgroundColor === "green") {
    document.body.style.backgroundColor = "";
  } else {
    document.body.style.backgroundColor = "green";
  }
});

colorRed.addEventListener("click", () => {
  if (document.body.style.backgroundColor === "red") {
    document.body.style.backgroundColor = "";
  } else {
    document.body.style.backgroundColor = "red";
  }
});

colorBlack.addEventListener("click", () => {
  if (document.body.style.backgroundColor === "black") {
    document.body.style.backgroundColor = "";
  } else {
    document.body.style.backgroundColor = "black";
  }
});

colorRandom.addEventListener("click", () => {
  const colors = ["red", "green", "blue", "yellow", "purple", "orange"];

  const random = colors[Math.floor(Math.random() * colors.length)];

  document.body.style.backgroundColor = random;
});
