let total = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let notAppliedCount = document.getElementById("notAppliedCount");

const allCards = document.getElementById("allcards").children.length;

function calculateCount() {
  total.innerText = allCards;
}
calculateCount();
