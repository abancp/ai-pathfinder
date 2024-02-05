import './style.css'
import Agent from './agent.js'
import state from './matrix.js'
const AI = new Agent(0, 4, state)

let htmlDivs = `<div class="container">`
state.map((a, y) => {
    htmlDivs += '<div class="row">'
    a.map((point, x) => {
        htmlDivs += `<div class="inner-div div-${point}">${(x == AI.x && y == AI.y) ? '<div id="Agent"></div>' : ''}</div>`
    })
    htmlDivs += '</div>'
})
htmlDivs += '</div>'

document.querySelector('#app').innerHTML = htmlDivs


AI.train(300)