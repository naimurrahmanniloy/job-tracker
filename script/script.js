let interviewList = [];
let rejectedList = [];

//Got all the count elements
let total = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let notAppliedCount = document.getElementById("notAppliedCount");
let filteredSection = document.getElementById("filtered-section");

//Got all the buttons which will be used to filter the cards
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

//Got all the card length
const allCards = document.getElementById("allcards");

//Got the main container to append the cards
const mainContainer = document.querySelector("main");

//Made for set the length of the cards
function calculateCount() {
  total.innerText = allCards.children.length;
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

  if (id == "interview-btn") {
    allCards.classList.add("hidden");
    filteredSection.classList.remove("hidden");
  } else if (id == "all-btn") {
    allCards.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  }
}

mainContainer.addEventListener("click", function (event) {
  console.log(event.target.classList.contains("interview-btn"));
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode;
    const companyName = parentNode.querySelector(".company-name").innerText;
    const jobTitle = parentNode.querySelector(".job-title").innerText;
    const jobLocation = parentNode.querySelector(".job-location").innerText;
    const jobDescription =
      parentNode.querySelector(".job-description").innerText;
    const status = parentNode.querySelector(".status-btn").innerText;
    parentNode.querySelector(".status-btn").innerText = "Interview";

    const jobData = {
      companyName,
      jobTitle,
      jobLocation,
      jobDescription,
      status: "Interview",
    };
    const existingCard = interviewList.find(
      (card) => card.companyName === companyName && card.jobTitle === jobTitle,
    );
    if (!existingCard) {
      interviewList.push(jobData);
    }
    renderCards();
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode;
    const companyName = parentNode.querySelector(".company-name").innerText;
    const jobTitle = parentNode.querySelector(".job-title").innerText;
    const jobLocation = parentNode.querySelector(".job-location").innerText;
    const jobDescription =
      parentNode.querySelector(".job-description").innerText;
    const status = parentNode.querySelector(".status-btn").innerText;
    parentNode.querySelector(".status-btn").innerText = "Rejected";
    const jobData = {
      companyName,
      jobTitle,
      jobLocation,
      jobDescription,
      status: "Rejected",
    };
    const existingCard = rejectedList.find(
      (card) => card.companyName === companyName && card.jobTitle === jobTitle,
    );
    if (!existingCard) {
      rejectedList.push(jobData);
    }
  }
});

function renderCards() {
  filteredSection.innerHTML = " ";
  for (let interview of interviewList) {
    const div = document.createElement("div");
    div.className =
      "flex justify-between p-15 bg-white rounded-lg shadow-md mb-8";
    div.innerHTML = `
      
        <div>
          <h1 class="company-name text-2xl text-[#002C5C]">${interview.companyName}</h1>
          <p class="job-title text-[#64748B] mb-5 text-lg">${interview.jobTitle}</p>
          <p class="job-location text-[#64748B] mb-5">${interview.jobLocation}</p>
          <p class="bg-[#EEF4FF] w-[16%] p-3 uppercase text-[#002C5C] font-semibold mb-2 status-btn">${interview.status}</p>
          <p class="job-description mb-5 text-[#323B49]">${interview.jobDescription}</p>
            <button
              id="interview-btn"
              class="btn btn-outline btn-success text-lg mr-2 interview-btn"
            >
              Interview
            </button>
            <button
              id="rejected-btn"
              class="btn btn-outline btn-error text-lg rejected-btn"
            >
              Rejected
            </button>
        </div>
        <div class="border h-8 rounded-full flex items-center justify-center w-8 cursor-pointer">
          <i class="fa-regular fa-trash-can" style="color: gray"></i>
      </div>`;
    filteredSection.appendChild(div);
  }
}
