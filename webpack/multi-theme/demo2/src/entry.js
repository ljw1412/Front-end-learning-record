const styleLink = document.createElement('link')
styleLink.rel = 'stylesheet'
styleLink.href = 'theme/default.css'
document.body.appendChild(styleLink)

const span = document.createElement('span')
span.classList.add('text')
span.innerHTML = '文字'
document.body.appendChild(span)

const themeNames = ['', 'blue', 'dark']
const themeSwitchDiv = document.createElement('div')
themeNames.forEach(name => {
  name = name || 'default'
  const btn = document.createElement('button')
  btn.innerHTML = name
  btn.addEventListener('click', () => {
    styleLink.href = `theme/${name}.css`
  })
  themeSwitchDiv.appendChild(btn)
})
document.body.appendChild(themeSwitchDiv)
