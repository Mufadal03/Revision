let container = document.querySelector("#container")
let setLimit = document.querySelector("#limit")
let paginationContainer = document.querySelector("#pagination")
let total_products = 32
let limit = 3
let page = 1
getData(limit,page)
function getData(limit,page){
    fetch(`https://muffi-server.herokuapp.com/earrings?_limit=${limit}&_page=${page}`)
    .then((r)=>r.json())
        .then((r) => {
            DisplayData(r)
            let buttons = Math.ceil(total_products / limit)
            DisplayButtons(buttons,page)

    })
    .catch(err =>console.error(err))
}

function DisplayData(data){
    container.innerHTML = ""
    data.map((el) => {
        let div = document.createElement("div")
        let img = document.createElement("img")
        let name = document.createElement("p")

        img.src = el.poster
        name.innerText = el.name
        img.style.width="250px"
        div.append(img, name)
        container.append(div)


    })
}

setLimit.addEventListener("change", () => {
    if(setLimit.value=="set")return
    limit = setLimit.value
    getData(limit,page=1)

})

function DisplayButtons(total,page) {
    paginationContainer.innerHTML=""
    let buttons = new Array(total).fill(0)
    buttons.map((el,index) => {
        let btn = document.createElement("button")
        btn.innerText = index + 1
        btn.className = "btn"
         btn.addEventListener("click",()=>pagination(index))
        if (index + 1 == page) {
            btn.className = "btn active"
            btn.disabled = true
        }
       

        paginationContainer.append(btn)
    })
}

function pagination(i) {
    getData(limit,i+1)
}