interface UserInfo {
  firstname: string;
  lastname: string;
  age: string;
  from: string;
  isMarried: string;
  job: string;
}

const firstnameInput = document.querySelector("#firstname") as HTMLInputElement;
const lastnameInput = document.querySelector("#lastname") as HTMLInputElement;
const ageInput = document.querySelector("#age") as HTMLInputElement;
const fromInput = document.querySelector("#from") as HTMLInputElement;
const isMarriedInputs = document.querySelectorAll(
  "input[name='ismarried']"
) as NodeListOf<HTMLInputElement>;
const jobInput = document.querySelector("#job") as HTMLInputElement;
const button = document.querySelector("button") as HTMLButtonElement;
const cardContainer = document.querySelector(
  "#cardContainer"
) as HTMLDivElement;

const saveUserInfo = (userInfo: UserInfo) => {
  const userInfoArray: UserInfo[] = JSON.parse(
    localStorage.getItem("userInfo") || "[]"
  );
  userInfoArray.push(userInfo);
  localStorage.setItem("userInfo", JSON.stringify(userInfoArray));
};

const loadUserInfo = () => {
  const userInfoArray: UserInfo[] = JSON.parse(
    localStorage.getItem("userInfo") || "[]"
  );
  userInfoArray.forEach((userInfo) => {
    createCard(userInfo);
  });
};

const createCard = (userInfo: UserInfo) => {
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

const removeUserInfo = (userInfo: UserInfo) => {
  let userInfoArray: UserInfo[] = JSON.parse(
    localStorage.getItem("userInfo") || "[]"
  );
  userInfoArray = userInfoArray.filter(
    (user) => JSON.stringify(user) !== JSON.stringify(userInfo)
  );
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

  const userInfo: UserInfo = { firstname, lastname, age, from, isMarried, job };

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
