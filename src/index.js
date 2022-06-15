let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  toyFormContainer.addEventListener('submit',(e)=>{
    e.preventDefault()
   const inputs=document.querySelectorAll('.input-text')
   const [name,url]=inputs
   newToy(name.value,url.value) 
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then((res)=>res.json())
  .then((data)=>cardFrom(data))
}
fetchToys()

function cardFrom(array){
  array.forEach((card) => {
    const div=document.createElement('div')
    div.className='card'
    div.innerHTML=`
    <h2>${card.name}</h2>
    <img src=${card.image} class="toy-avatar" />
    <p>${card.likes} Likes</p>
    <button class="like-btn" id=${card.id}>Like ❤️</button>
    `
    document.querySelector("#toy-collection").appendChild(div)
    div.querySelector('.like-btn').addEventListener('click',()=>{
      card.likes +=1
      div.querySelector('p').textContent=`${card.likes} Likes`
      addLike(card)
    })
   


  });
}

function newToy(name,image){
  fetch('http://localhost:3000/toys',{
    method:'POST',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"

    },
           
    body: JSON.stringify({
    "name":name,
    "image":image,
    "likes": 0 })
  })
  .then((res)=>res.json())
  .then((data)=>console.log(data))
}

function addLike(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method:'PATCH',
    headers:{
         "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": toyObj.likes
      })
  })
  .then((res)=>res.json())
  .then((data)=>console.log(data))
}