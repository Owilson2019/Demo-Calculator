if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
}

const enter = document.getElementById('enter')
const display = document.getElementById('display')
const btns = (() => {
    let output = {}
    for (let btn of document.getElementsByClassName('button')) {
        output[btn.innerText] = btn
    }
    return output
})()

let output = ''
let mem = ''

let update = () => display.innerText = output

for (let btnid in btns) {
    let btn = btns[btnid]
    if (btn.innerText !== '=' && btn.innerText !== 'AC' && btn.innerText !== 'M+' && btn.innerText !== 'MC') {
        btn.addEventListener('click', () => {
            output+=btn.innerText
            update()
        })
    }
}

btns['='].addEventListener('click', () => {
    output = eval(output)
    update()
})

btns['AC'].addEventListener('click', () => {
    output = ''
    update()
})

btns['MC'].addEventListener('click', () => {
    output = eval(output+'+'+mem)
    update()
})

btns['M+'].addEventListener('click', () => {
    mem = eval(mem+'+'+output)
})