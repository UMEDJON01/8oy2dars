"use strict";
const firstnameInput = document.querySelector("#firstname");
const lastnameInput = document.querySelector("#lastname");
const ageInput = document.querySelector("#age");
const fromInput = document.querySelector("#from");
const isMarriedInputs = document.querySelectorAll("input[name='ismarried']");
const jobInput = document.querySelector("#job");
const button = document.querySelector("button");
const cardContainer = document.querySelector("#cardContainer");
const saveUserInfo = (userInfo) => {
    const userInfoArray = JSON.parse(localStorage.getItem("userInfo") || "[]");
    userInfoArray.push(userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userInfoArray));
};
const loadUserInfo = () => {
    const userInfoArray = JSON.parse(localStorage.getItem("userInfo") || "[]");
    userInfoArray.forEach((userInfo) => {
        createCard(userInfo);
    });
};
const createCard = (userInfo) => {
    const { firstname, lastname, age, from, isMarried, job } = userInfo;
    const card = document.createElement("div");
    card.className = "card";
    const nameElement = document.createElement("h2");
    nameElement.textContent = `Name: ${firstname} ${lastname}`;
    card.appendChild(nameElement);
    const ageElement = document.createElement("p");
    ageElement.textContent = `Age: ${age}`;
    card.appendChild(ageElement);
    const fromElement = document.createElement("p");
    fromElement.textContent = `From: ${from}`;
    card.appendChild(fromElement);
    const isMarriedElement = document.createElement("p");
    isMarriedElement.textContent = `Is Married: ${isMarried}`;
    card.appendChild(isMarriedElement);
    const jobElement = document.createElement("p");
    jobElement.textContent = `Job: ${job}`;
    card.appendChild(jobElement);
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        cardContainer.removeChild(card);
        removeUserInfo(userInfo);
    });
    card.appendChild(deleteButton);
    cardContainer.appendChild(card);
};
const removeUserInfo = (userInfo) => {
    let userInfoArray = JSON.parse(localStorage.getItem("userInfo") || "[]");
    userInfoArray = userInfoArray.filter((user) => JSON.stringify(user) !== JSON.stringify(userInfo));
    localStorage.setItem("userInfo", JSON.stringify(userInfoArray));
};
button.addEventListener("click", () => {
    const firstname = firstnameInput.value.trim();
    const lastname = lastnameInput.value.trim();
    const age = ageInput.value.trim();
    const from = fromInput.value.trim();
    let isMarried = "";
    isMarriedInputs.forEach((input) => {
        if (input.checked) {
            isMarried = input.value;
        }
    });
    const job = jobInput.value.trim();
    if (!firstname || !lastname || !age || !from || !isMarried || !job) {
        alert("Please fill in all fields.");
        return;
    }
    const userInfo = { firstname, lastname, age, from, isMarried, job };
    createCard(userInfo);
    saveUserInfo(userInfo);
    firstnameInput.value = "";
    lastnameInput.value = "";
    ageInput.value = "";
    fromInput.value = "";
    isMarriedInputs.forEach((input) => (input.checked = false));
    jobInput.value = "";
});
window.addEventListener("load", loadUserInfo);
