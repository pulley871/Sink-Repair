import { sendRequest } from "./dataAccess.js"

export const ServiceForm = () => {
    let html = `
    <div class="field">
    <label class="label" for="serviceDescription">Description</label>
    <input type="text" name="serviceDescription" id="input__description"class="input" />
</div>
<div class="field">
    <label class="label" for="serviceAddress">Address</label>
    <input type="text" name="serviceAddress" id="input__address"class="input" />
</div>
<div class="field">
    <label class="label" for="serviceBudget">Budget</label>
    <input type="number" name="serviceBudget" id="input__budget"class="input" />
</div>
<div class="field">
    <label class="label" for="serviceDate">Date needed</label>
    <input type="date" name="serviceDate" id="input__serviceDate"class="input" />
</div>

<button class="button" id="submitRequest">Submit Request</button>
`
    

    return html
}
//reuqest properties
//"id": 1,
// "description": "Aut sint voluptatem fugit eius quas molestiae modi.",
// "address": "34445 Bianka Ports",
// "budget": 400,
// "neededBy": "2021-08-27"
export const SaveService = () =>{
    let newService = {
        "description": document.querySelector("#input__description").value,
        "address": document.querySelector("#input__address").value,
        "budget": document.querySelector("#input__budget").value,
        "neededBy": document.querySelector("#input__serviceDate").value
    }
    return newService
}

document.addEventListener(
    "click",
    (event) =>{
        if (event.target.id ==="submitRequest"){
            sendRequest(SaveService())
            

        }
    }
)