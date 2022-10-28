let alert = document.querySelector(".alert")
let form = document.querySelector(".gro-form")
let grocery = document.getElementById("gro")
let submit = document.querySelector(".sub-btn")
let container = document.querySelector(".grocery-container")
let list = document.querySelector(".grocery-list ")
let clear = document.querySelector (".clear-btn")


let editelement
let editflag = false
let editid = ""


form.addEventListener("submit",adding)
clear.addEventListener("click",clearitems)
window.addEventListener("DOMContentLoaded",setupItems)


function adding(e){
    e.preventDefault()
    let value = grocery.value
    let id = new Date().getTime().toString()
    console.log(id)


    if(value && !editflag){
        // console.log("hai")
       
        createListitem(id,value)
        displayAlert("entered successfully","success")
        container.classList.add("show-container")

        addTolocalstorage(id,value)

        Clear()


    }
    else if(value && editflag){
        console.log("editing")
        editelement.innerHTML = value
        displayAlert("Edited Successfully","success")

        editLocalStorage(editid,value)
        Clear()
    }
    else{
        displayAlert("Enter Any Item","danger")
    }


}


//function for display alert
function displayAlert(textvalue,action){

    alert.textContent = textvalue
    alert.classList.add(`alert-${action}`)

    setTimeout(function(){
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    },1000)
}

//function for default input field
function Clear()
{
    grocery.value = ""
    editflag = false
    editid = ""
    submit.textContent = "submit"
}
//function for clear items
function clearitems()
{
    let createdItems = document.querySelectorAll(".grocery-item")

    if(createdItems.length > 0){
    createdItems.forEach(function(createdItems){
    list.removeChild(createdItems)
    })
    }
    displayAlert("List is empty","danger")
    Clear()

    localStorage.removeItem("list")
    container.classList.remove("show-container");

}

function deletingItem(x)
{
    console.log("deleted")
    let ele = x.currentTarget.parentElement.parentElement
    const id = ele.dataset.id

    list.removeChild(ele)
    if(list.children.length == 0) {
        container.classList.remove("show-container")
    }

    displayAlert("Item Removed","danger")
    removeFromLocalStorage(id)
    Clear()
}


function editingItem(x)
{
    console.log("edited")
    let ele = x.currentTarget.parentElement.parentElement

    editelement = x.currentTarget.parentElement.previousElementSibling
    grocery.value = editelement.innerHTML
    editflag = true
    editid = ele.dataset.id
    submit.textContent = "Edit"
    

}


//function for local storage
function addTolocalstorage(id,value)
{

console.log("hai")
let grocery = { id, value }

console.log(grocery)
let items = getLocalStorage()
items.push(grocery)

localStorage.setItem("list",JSON.stringify(items))


}



function removeFromLocalStorage(id)
{
let items = getLocalStorage()
items = items.filter(function(item){
    if(item.id !== id){
       return item
    }
})
localStorage.setItem("list",JSON.stringify(items))
}



function  editLocalStorage(id,value){

 let items = getLocalStorage()
 items = items.map(function(item){
    if(item.id === id){

        item.value = value

    }
    return item
 })
 localStorage.setItem("list",JSON.stringify(items))
}



function getLocalStorage(){
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list")) : []
}


function setupItems(){

    let items = getLocalStorage()
    if(items.length > 0){
    items.forEach(function(item){
        createListitem(item.id, item.value)
    })
    }

}


function createListitem(id,value)
{
    let element = document.createElement("div")

    element.classList.add("grocery-item")

    let atr = document.createAttribute("data-id")
    atr.value = id
    element.setAttributeNode(atr)


    element.innerHTML= `<p class="title mb-0 ">${value}</p>
    <div class="btn-container">
    <i class="bi bi-pencil-square edit-btn"></i>
    <i class="bi bi-trash-fill delete-btn text-danger "></i>
    </div>`


    let deletebtn = element.querySelector(".delete-btn")
    let editbtn = element.querySelector(".edit-btn")
    
    deletebtn.addEventListener("click",deletingItem)
    editbtn.addEventListener("click",editingItem)


    list.appendChild(element)
    container.classList.add("show-container")
}
