let interviewList = [];
let rejectedList = [];
let deletedArray = [];
let currentStatus = "all";

//Got all the count elements
let total = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let notAppliedCount = document.getElementById("notAppliedCount");
let filteredSection = document.getElementById("filtered-section");
let emptyState = document.getElementById("empty-state");
let availableJobs = document.getElementById("job-count");

//Got all the buttons which will be used to filter the cards
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

//Got all the card length
const allCards = document.getElementById("allcards");
const mainContainer = document.querySelector("main");

//Made for set the length of the cards
function calculateCount() {
  total.innerText = allCards.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
  availableJobs.innerText = allCards.children.length;
}
calculateCount();

//Made for the filter buttons
function toggleStyle(id) {
  currentStatus = id;
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
    availableJobs.innerText = interviewList.length;
    renderCards();
  } else if (id == "all-btn") {
    allCards.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  } else if (id == "rejected-btn") {
    allCards.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    availableJobs.innerText = rejectedList.length;
    renderRejectedCards();
  }
}

mainContainer.addEventListener("click", function (event) {
  // TRASH BUTTON HANDLER - ADD THIS SECTION FIRST

  const trashContainer = event.target.closest(".delete-btn");

  if (trashContainer) {
    // Find the card container
    const cardElement = event.target.closest(".flex.mt-5");
    if (!cardElement) return;

    // Get job details for removal from arrays
    const jobInfoDiv = cardElement.querySelector("div:first-child");
    const companyName = jobInfoDiv.querySelector(".company-name").innerText;
    const jobTitle = jobInfoDiv.querySelector(".job-title").innerText;

    // Remove from interviewList
    interviewList = interviewList.filter(
      (card) =>
        !(card.companyName === companyName && card.jobTitle === jobTitle),
    );

    // Remove from rejectedList
    rejectedList = rejectedList.filter(
      (card) =>
        !(card.companyName === companyName && card.jobTitle === jobTitle),
    );

    // REMOVE FROM ALL CARDS SECTION

    const allCardsList = allCards.querySelectorAll(".flex.mt-5");
    for (let card of allCardsList) {
      const cardCompanyName = card.querySelector(".company-name").innerText;
      const cardJobTitle = card.querySelector(".job-title").innerText;

      if (cardCompanyName === companyName && cardJobTitle === jobTitle) {
        card.remove();
        break;
      }
    }

    // Add to deletedArray for tracking
    const jobData = {
      companyName,
      jobTitle,
      deletedAt: new Date(),
    };
    deletedArray.push(jobData);

    // Remove the card from DOM
    cardElement.remove();

    // Update counts
    calculateCount();

    // Handle empty states
    if (currentStatus === "interview-btn" && interviewList.length === 0) {
      filteredSection.innerHTML = "";
      filteredSection.appendChild(emptyState);
      emptyState.classList.remove("hidden");
    } else if (currentStatus === "rejected-btn" && rejectedList.length === 0) {
      filteredSection.innerHTML = "";
      filteredSection.appendChild(emptyState);
      emptyState.classList.remove("hidden");
    }

    return;
  }

  // END OF TRASH BUTTON HANDLER

  // INTERVIEW BUTTON HANDLER

  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode;
    const parentNodes = event.target.closest(".flex");

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
      (card) => card.companyName == companyName,
    );
    if (!existingCard) {
      interviewList.push(jobData);
    }

    rejectedList = rejectedList.filter(
      (card) =>
        !(
          card.companyName === jobData.companyName &&
          card.jobTitle === jobData.jobTitle
        ),
    );
    parentNodes.remove();
    calculateCount();
    if (currentStatus == "rejected-btn") {
      renderRejectedCards();
    }
  }

  // REJECTED BUTTON HANDLER
  else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode;
    const parentNodes = event.target.closest(".flex");
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

    interviewList = interviewList.filter(
      (card) =>
        !(
          card.companyName === jobData.companyName &&
          card.jobTitle === jobData.jobTitle
        ),
    );

    if (currentStatus == "interview-btn") {
      renderCards();
    }
    parentNodes.remove();
    calculateCount();
  }
});

function renderCards() {
  filteredSection.innerHTML = "";
  if (interviewList.length === 0) {
    filteredSection.appendChild(emptyState);
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  for (let interview of interviewList) {
    const div = document.createElement("div");
    div.className =
      "flex mt-5 justify-between p-15 bg-white rounded-lg shadow-md mb-8";
    div.innerHTML = `
        <div>
          <h1 class="company-name text-2xl text-[#002C5C]">${interview.companyName}</h1>
          <p class="job-title text-[#64748B] mb-5 text-lg">${interview.jobTitle}</p>
          <p class="job-location text-[#64748B] mb-5">${interview.jobLocation}</p>
          <p class="bg-green-600 w-[16%] text-white p-3 uppercase font-semibold mb-2 status-btn">${interview.status}</p>
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
        <div class="border h-8 rounded-full flex items-center justify-center w-8 cursor-pointer delete-btn">
          <i class="fa-regular fa-trash-can" style="color: gray"></i>
        </div>`;
    filteredSection.appendChild(div);
  }
}

function renderRejectedCards() {
  filteredSection.innerHTML = "";

  if (rejectedList.length === 0) {
    filteredSection.appendChild(emptyState);
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  for (let rejected of rejectedList) {
    const div = document.createElement("div");
    div.className =
      "flex mt-5 justify-between p-15 bg-white rounded-lg shadow-md mb-8";
    div.innerHTML = `
        <div>
          <h1 class="company-name text-2xl text-[#002C5C]">${rejected.companyName}</h1>
          <p class="job-title text-[#64748B] mb-5 text-lg">${rejected.jobTitle}</p>
          <p class="job-location text-[#64748B] mb-5">${rejected.jobLocation}</p>
          <p class="bg-red-600 w-[16%] text-white p-3 uppercase font-semibold mb-2 status-btn">${rejected.status}</p>
          <p class="job-description mb-5 text-[#323B49]">${rejected.jobDescription}</p>
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
        <div class="border h-8 rounded-full flex items-center justify-center w-8 cursor-pointer delete-btn">
          <i class="fa-regular fa-trash-can" style="color: gray"></i>
        </div>`;
    filteredSection.appendChild(div);
  }
}
