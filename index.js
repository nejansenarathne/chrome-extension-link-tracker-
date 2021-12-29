let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteEl = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalstorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalstorage);


tabBtn.addEventListener("click" , function () {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads" , JSON.stringify(myLeads));
        render(myLeads);
    })

})


if (leadsFromLocalstorage) {
    myLeads = leadsFromLocalstorage;
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        console.log(leads[i]);
    
        listItems += `<li> 
                        <a target='_blank' href='${leads[i]}'> ${leads[i]} </a> 
                      </li>`;
        console.log(listItems);
    
        /*another way
        const li = document.createElement("li");
        li.textContent = myLeads[i];
        ulEl.append(li);*/
    }
    
    ulEl.innerHTML = listItems;
}


inputBtn.addEventListener("click" , function () {
    console.log("Clicked");
    myLeads.push(inputEl.value);
    console.log(myLeads);
    inputEl.value = "";

    localStorage.setItem("myLeads" , JSON.stringify(myLeads));
    
    render(myLeads)
})

deleteEl.addEventListener("dblclick" , function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

