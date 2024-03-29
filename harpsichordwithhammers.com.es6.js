/*
2023-04-15 17:43 GMT+7
after mailed to Gary, the author. He did some changes!
now original content sorted & grouped as-is
well done!
*/

let uniq = list => Array.from(new Set(list));
let not = (query) => i => i.textContent !== query;
let notSubject = i => i !== 'Subject';
let getParent = i => i.parentElement;
let hide = i => { i.style.display = 'none'; return i };
let show = i => { i.style = null; return i };

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
