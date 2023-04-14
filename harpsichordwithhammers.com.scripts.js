var uniq = list => Array.from(new Set(list));
var not = (query) => i => i.textContent !== query;
var notSubject = i => i !== 'Subject';
var getParent = i => i.parentElement;
var hide = i => { i.style.display = 'none'; return i };
var show = i => { i.style = null; return i };

// create buttons for filtering
document.querySelector('.entry-content .wp-block-table').prepend(...getSubjects());

function getRows() {
  return Array.from(document.querySelectorAll('.entry-content .wp-block-table tr'));
}

function getFirstCol(row) {
  return row.querySelector('td');
}

function showOnly(query) {
  let rows = getRows().map(show);

  if (query === 'All') {
    return rows;
  }

  return rows.map(getFirstCol)
    .filter(not(query))
    .map(getParent)
    .forEach(hide);
}

function getSubjects() {
  let subjects = uniq(getRows().map(getFirstCol).map(x => x.textContent));
  let triggers = subjects.map(createTrigger);
  return triggers;
}

function createTrigger(subject) {
  let query = subject === 'Subject' ? 'All' : subject;
  let trigger = document.createElement('button');
  trigger.name = query;
  trigger.textContent = query;
  trigger.onclick = () => showOnly(query);
  return trigger;
}
