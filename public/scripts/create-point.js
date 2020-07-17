


function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then(states => {
            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
    } )
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex 
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML ="<option value> Selecione a cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then( res => res.json() )
    .then( cities => {

            for(const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
    } )

    function newFunction() {
        return event.target.value
    }
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

// itens de coleta
//pegar todos os li

const  itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)

}
const collecteditems= document.querySelector("input[name=items]")


let selectedItems =[]

function handleSelectedItem(event){
    const itemLi = event.target

        //adicionar ou remover uma class com java script
        itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id


    // verificar se existe items selecionados, se sim
    //pegar os items selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId  //isso sera true ou false
        return itemFound
    })

    // se já estiver selecionado,
    if(alreadySelected >=0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDiferent =item != itemId
                return itemIsDiferent
        })

        selectedItems = filteredItems
    } else{
     // se não tiver selecionado, adicionar a seleção
     selectedItems.push(itemId)
    }

    console.log(selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collecteditems.value =selectedItems
}