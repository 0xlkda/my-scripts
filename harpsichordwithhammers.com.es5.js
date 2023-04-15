/*
2023-04-15 17:43 GMT+7
after mailed to Gary, the author. He did some changes!
now original content sorted & grouped as-is
well done!
*/ function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var // create buttons for filtering
_document_querySelector;
var uniq = function(list) {
    return Array.from(new Set(list));
};
var not = function(query) {
    return function(i) {
        return i.textContent !== query;
    };
};
var notSubject = function(i) {
    return i !== "Subject";
};
var getParent = function(i) {
    return i.parentElement;
};
var hide = function(i) {
    i.style.display = "none";
    return i;
};
var show = function(i) {
    i.style = null;
    return i;
};
(_document_querySelector = document.querySelector(".entry-content .wp-block-table")).prepend.apply(_document_querySelector, _to_consumable_array(getSubjects()));
function getRows() {
    return Array.from(document.querySelectorAll(".entry-content .wp-block-table tr"));
}
function getFirstCol(row) {
    return row.querySelector("td");
}
function showOnly(query) {
    var rows = getRows().map(show);
    if (query === "All") {
        return rows;
    }
    return rows.map(getFirstCol).filter(not(query)).map(getParent).forEach(hide);
}
function getSubjects() {
    var subjects = uniq(getRows().map(getFirstCol).map(function(x) {
        return x.textContent;
    }));
    var triggers = subjects.map(createTrigger);
    return triggers;
}
function createTrigger(subject) {
    var query = subject === "Subject" ? "All" : subject;
    var trigger = document.createElement("button");
    trigger.name = query;
    trigger.textContent = query;
    trigger.onclick = function() {
        return showOnly(query);
    };
    return trigger;
}

