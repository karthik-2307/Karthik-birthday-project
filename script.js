import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push , onValue ,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appsettings=
{
    // databaseurl:
    databaseURL:"https://play-ground-b82b1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appsettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database,"shoppingList");
let shoppingListEl=document.getElementById("wishes-list");
const buttonEl=document.getElementById("wish-button");
const inputEl=document.getElementById("name-field");
const inputE2=document.getElementById("name-field2");
const par=document.getElementById("para")
if(buttonEl)
{
buttonEl.addEventListener("click",function()
{
    
    let inputvalue=inputE2.value+"-"+inputEl.value
    buttonEl.textContent="You have wished"
    buttonEl.contentEditable=false
    push(shoppingListInDB,inputvalue)
    // shoppingListEl.innerHTML+=`<li>${inputvalue}</li>`
    // inputEl.value=""
    // inputclear();
    appenditem(inputvalue);
    console.log(inputvalue);
})
}
onValue(shoppingListInDB,function(snapshot)
{
//    console.log(snapshot.val)
  if(snapshot.exists())
  {
   let itemsarray=Object.entries(snapshot.val())
   console.log(itemsarray)
   clearshoppinglist()
   for(var i=itemsarray.length-1;i>=0;i--)
   {
    let currentitem=itemsarray[i]
   appenditem(currentitem)
   }
  }
  else
  {
    shoppingListEl.innerHTML="There are no other..."
  }
})
function clearshoppinglist()
{
    if( shoppingListEl){
    shoppingListEl.innerHTML = ""
    }
}
function appenditem(item)
{
    // shoppingListEl.innerHTML+=`<li>${inputvalue}</li>`
    // let item1=item[0]
    let item2=item[1]
    let newitem=document.createElement("li")
    newitem.textContent=item2
    if(shoppingListEl){
    shoppingListEl.append(newitem)
    // par.textContent="you have wished please go through the list."
    // window.location.href="list.html"
    // return "hello"
}
}