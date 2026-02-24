let interviewList = [];
let rejectedList = [];

//Got all the count elements
let total = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let notAppliedCount = document.getElementById("notAppliedCount");

//Got all the buttons which will be used to filter the cards
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

//Got all the card length
const allCards = document.getElementById("allcards").children.length;

const mainContainer = document.querySelector("main");

//Made for set the length of the cards
function calculateCount() {
  total.innerText = allCards;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

function toggleStyle(id) {
  allBtn.classList.add("bg-white", "text-black");
  interviewBtn.classList.add("bg-white", "text-black");
  rejectedBtn.classList.add("bg-white", "text-black");

  allBtn.classList.remove("bg-blue-700", "text-white");
  interviewBtn.classList.remove("bg-blue-700", "text-white");
  rejectedBtn.classList.remove("bg-blue-700", "text-white");

  const selectedBtn = document.getElementById(id);
  selectedBtn.classList.remove("bg-white", "text-black");
  selectedBtn.classList.add("bg-blue-700", "text-white");
}
