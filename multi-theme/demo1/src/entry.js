// import './themes/default.scss'
// import './themes/blue.scss'
// import './themes/dark.scss'

// 样式注入
const themes = require.context('./themes', false, /\.scss$/)
themes.keys().map(themes)

const span = document.createElement('span')
span.classList.add('text')
span.innerHTML = '文字'
document.body.appendChild(span)

const themeNames = ['', 'blue', 'dark']
const themeSwitchDiv = document.createElement('div')
themeNames.forEach(name => {
  const btn = document.createElement('button')
  btn.innerHTML = name || 'default'
  btn.addEventListener('click', () => {
    document.documentElement.dataset.theme = name
  })
  themeSwitchDiv.appendChild(btn)
})
document.body.appendChild(themeSwitchDiv)
