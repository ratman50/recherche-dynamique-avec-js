// import ramdomUser from "./user";

function User(name, mail, phone) {
  this.name = name;
  this.mail = mail;
  this.phone = phone;
}
let tabUser = []; //contains informations about users
const user__name = document.querySelector(".user__name");
const user__mail = document.querySelector(".user__mail");
const user__phone = document.querySelector(".user__phone");
const database__input = document.querySelector(".database__input");
const nav__link = document.querySelectorAll(".nav__link");

let list_name = document.createElement("ul");
let list__mail = document.createElement("ul");
let list__phone = document.createElement("ul");

list_name.className = "list__name";
list_name.classList.add("list");
list__mail.className = "list__mail";
list__mail.classList.add("list");
list__phone.className = "list__phone";
list__phone.classList.add("list");

nav__link.forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelector(".nav__link_active")
      .classList.remove("nav__link_active");
    link.classList.add("nav__link_active");
  });
});
/*
 **function:createItem
 **params:name of user, mail of the user, phone of user
 **return 3 lists  where each list contains the name, the mail and the phone of an user
 */
function createItem(name, mail, phone) {
  let name__item = document.createElement("li");
  let mail__item = document.createElement("li");
  let phone__item = document.createElement("li");

  name__item.className = "item name__item";
  name__item.innerText = name;

  mail__item.className = "item mail__item";
  mail__item.innerText = mail;

  phone__item.className = "item phone__item";
  phone__item.innerText = phone;

  return {
    item1: name__item,
    item2: mail__item,
    item3: phone__item,
  };
}

fetch("https://randomuser.me/api/?results=40")
  .then((answer) => {
    return answer.json();
  })
  .then((data) => {
    for (let index = 0; index < data.results.length; index++) {
      const element = data.results[index];
      let item = createItem(
        element.name.last + " " + element.name.first,
        element.email,
        element.phone
      );
      list_name.append(item.item1);
      list__mail.append(item.item2);
      list__phone.append(item.item3);

      let us = new User(
        element.name.last + " " + element.name.first,
        element.phone,
        element.email
      );
      tabUser.push(us); //however add an user
    }
    user__name.append(list_name);
    user__mail.append(list__mail);
    user__phone.append(list__phone);
  });
function trie(tab, val) {
  if (val.length != 0) val = val[0].toUpperCase() + val.slice(1); //transforme la premiere lettre en majuscule
  let result = tab.filter((item) => {
    // puis on recherche dans le tableau les users qui ont la valeur val au debut de leur caractère
    let tail = val.length;
    if (item.name.slice(0, tail) == val) return true;
    else return false;
  });
  return result;
}

database__input.addEventListener("input", () => {
  let res;
  res = trie(tabUser, database__input.value);
  document.querySelectorAll(".item").forEach((it) => it.remove()); //on supprime tous les items de la liste pour que la recherche soit dynamique
  for (let index = 0; index < res.length; index++) {
    const element = res[index];
    let item = createItem(element.name, element.mail, element.phone);
    list_name.append(item.item1);
    list__mail.append(item.item2);
    list__phone.append(item.item3);
  }

  user__name.append(list_name);
  user__mail.append(list__mail);
  user__phone.append(list__phone);
});
