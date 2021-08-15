import { SinkRepair } from "./SinkRepair.js"
const applicationState = {
    requests: [],
    plumbers: [],
    completions: []

}
 const mainContainer = document.querySelector("#container")

const API = "http://localhost:8088"
//pull JSON database and convert it to JS to use in app
export const fetchRequests = () => {
    const requestFetch = fetch("http://localhost:8088/requests")
    const plumbersFetch = fetch("http://localhost:8088/plumbers")
    const completionsFetch = fetch("http://localhost:8088/completions")
    Promise.all([requestFetch, plumbersFetch, completionsFetch])
    .then(values =>{
        return Promise.all(values.map(r => r.json()));
    }).then(([request,plumbers,completions])=>{
        applicationState.requests = request
        applicationState.plumbers = plumbers
        applicationState.completions = completions
        //made these console logs to help me see if the data was coming in
        console.log(applicationState.request = request)
        console.log(applicationState.plumbers = plumbers)
        console.log(applicationState.completions = completions)
    }).then(()=> mainContainer.innerHTML = SinkRepair())
    
}

    // export const fetchPlumbers = () => {
        //     return fetch(`${API}/plumbers`)
//         .then(response => response.json())
//         .then(
//             (plumbers) => {
//                 // Store the external state in application state
//                 applicationState.plumbers = plumbers
//             }
//         )
// }
// export const fetchCompletions = () => {
//     return fetch(`${API}/completions`)
//         .then(response => response.json())
//         .then(
//             (completions) => {
//                 // Store the external state in application state
//                 applicationState.completions = completions
//             }
//         )
// }
export const getRequest = () =>{
    const completedRequest = applicationState.requests.filter((request)=>{
        const completedJob = applicationState.completions.find((job)=> job.requestId === request.id)
        if (completedJob !== undefined){
            request.completed = true
            return true
        }
         
       
         
         
    })
    const incompleteRequest = applicationState.requests.filter((request)=>{
        const completedJob = applicationState.completions.find((job)=> job.requestId === request.id)
        if (completedJob === undefined){
            request.completed = false
            return true
        }
    })
    
    const newArr = incompleteRequest.concat(completedRequest)
    return newArr
}
export const getPlumbers = ()=>{
    return applicationState.plumbers.map((plumber)=>({...plumber}))
}
export const getCompletions = ()=>{
    return applicationState.completions.map((job)=>({...job}))
}
//add json object
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
export const sendCompletions = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
//delete Json object
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, {method: "DELETE"})
    .then(()=>{mainContainer.dispatchEvent(new CustomEvent("stateChanged"))})
}