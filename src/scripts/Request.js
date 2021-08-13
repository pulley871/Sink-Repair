import { getRequest, deleteRequest, getPlumbers, sendCompletions } from "./dataAccess.js";
//reuqest properties
//"id": 1,
// "description": "Aut sint voluptatem fugit eius quas molestiae modi.",
// "address": "34445 Bianka Ports",
// "budget": 400,
// "neededBy": "2021-08-27"
const mainContainer = document.querySelector("#container")
export const Request = () =>{
    const getRequests = getRequest()
    const plumbers = getPlumbers()
    let htmlString = ""
    const request = getRequests.map((request =>{
        if (request.completed === false){
            return `
                <li>
                    ${request.description}
                    <select class="plumbers" id="plumbers">
                    <option value="">Choose</option>
                    ${
                        plumbers.map(
                        plumber => {
                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                            }).join("")
                    }
                    </select>
                    <button class="request__delete"id="request--${request.id}">
                        Delete
                    </button>
                </li>
                `

        }else{
            return `<li class="completed">${request.description}</li>`
        }
    }));
    htmlString += request.join("");
    return htmlString
}
document.addEventListener("click",
    (event)=>{
        if (event.target.id.startsWith("request--")){
            const [,eventId] = event.target.id.split("--")
            deleteRequest(parseInt(eventId))
        }
    })

    mainContainer.addEventListener(
        "change",
        (event) => {
            if (event.target.id === "plumbers") {
                const [requestId, plumberId] = event.target.value.split("--")

                
                const completion = {
                    requestId: parseInt(requestId),
                    plumberId: parseInt(plumberId),
                    date: new Date(Date.now()).toString().substr(4, 11)
                }
                sendCompletions(completion)
                /*
                    Invoke the function that performs the POST request
                    to the `completions` resource for your API. Send the
                    completion object as a parameter.
                 */
    
            }
        }
    )
    