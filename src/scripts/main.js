import {  fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"

//ask about this crazy stuff
export const mainContainer = document.querySelector("#container")

const render = () => {
    //fetchCompletions()
    //fetchPlumbers()
    
    fetchRequests()
     
}

render()

mainContainer.addEventListener("stateChanged", event => {
    console.log("State of data has changed. Regenerating HTML...")
    render()
})
