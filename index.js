let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); // JSON.parse pretvara "myLeads" nazad u array
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage; // postavljamo array na vrijednost iz local storagea
  renderLeads(myLeads);
}


tabBtn.addEventListener("click", function(){
  //console.log(tabs[0].url) // key.value kod objekta - u ovom slucaju array je key (tabs[]), a url value
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      renderLeads(myLeads);  
  });
});

function renderLeads(leads){
let listItems = "";
for (let i = 0; i < leads.length; i++) {
  //listItems += "<li><a href=' " + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>";

  //Template string
  listItems += `
        <li>
            <a href="${leads[i]}">
                ${leads[i]}
            </a>
        </li>
    `;
}

ulEl.innerHTML = listItems;
};


/*
for (let i = 0; i < myLeads.length; i++) {
  //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"; // prvi nacin dodavanja elemenata u HTML

  const li = document.createElement("li");
  li.textContent = myLeads[i];  // drugi nacin dodavanja elemenata u HTML
  ulEl.append(li);
}
*/

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads)); // JSON.strinfify pretvara array myLeads u stringove
  renderLeads(myLeads);
});

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
});