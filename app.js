'use strict';

function Mobile(user, type) {
    this.user = user;
    this.type = type;
    this.price = getRandomPrice(100, 500);
    this.condition = conditions (this.price);
    allMobile.push(this);
    updateStorage();
}

let allMobile=[];


function getRandomPrice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function conditions (price){
let outPut;
if (price < 200 ){
outPut='Used';
} else if (price >= 200){
    outPut='New';
}
return outPut;
}

let table = document.getElementById(`table`);
Mobile.prototype.renderRow=function(){
    let trElement= document.createElement(`tr`);
    table.appendChild(trElement);
    
    let tdUser = document.createElement(`td`);
    trElement.appendChild(tdUser);
    tdUser.textContent=this.user;

    let tdType = document.createElement(`td`);
    trElement.appendChild(tdType);
    tdType.textContent=this.type;

    let tdPrice = document.createElement(`td`);
    trElement.appendChild(tdPrice);
    tdPrice.textContent=this.price;

    let tdCondition = document.createElement(`td`);
    trElement.appendChild(tdCondition);
    tdCondition.textContent=this.condition;

    
}

let form = document.getElementById(`form`);
form.addEventListener(`submit`,submitter);

function submitter(event){

    event.preventDefault();

    let user = event.target.userField.value;
    let type = event.target.typeField.value;
    
    let newMobile = new Mobile (user,type);
    newMobile.renderRow();

}

function updateStorage(){
    let arrayString = JSON.stringify(allMobile);
    localStorage.setItem(`mobile`,arrayString);
}

function getMobile(){
    let data = localStorage.getItem(`mobile`);
    let mobileData = JSON.parse(data);

    if (mobileData) {
        for (let i = 0; i < mobileData.length; i++) {
            new Mobile(mobileData[i].user,mobileData[i].type);
            
        }
    }
}

getMobile();

for (let i = 0; i < allMobile.length; i++) {
    allMobile[i].renderRow();
    
}

let button = document.getElementById(`clear`);
button.addEventListener(`click`,clearData);

function clearData(event){
    localStorage.clear();
}