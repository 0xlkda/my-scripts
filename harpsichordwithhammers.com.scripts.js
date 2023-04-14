var not = (myChoice) => i => i.textContent !== myChoice
var getParent = i => i.parentElement
var hide = i => i.style.display = 'none'
var show = i => i.style = null

var showOnly = (category) => {
  $x('//tr').forEach(show)
  $x('//tr/td[1]')
  .filter(not(category))
  .map(getParent)
  .forEach(hide)
}

showOnly('Chords')
