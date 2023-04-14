isChords = i => i.textContent === 'Chords'
isNotChords = i => !isChords(i)
getParent = i => i.parentElement
hide = i => i.style.display = 'none'
show = i => i.style = null

showChords = $x('//tr/td[1]')
  .filter(isNotChords)
  .map(getParent)
  .forEach(hide)
