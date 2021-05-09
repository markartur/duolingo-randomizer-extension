let skills = $('div[data-test="skill"]:has(div.GkDDe:contains("1"))');

var n_elements = skills.length;

var random = Math.floor(Math.random() * n_elements);

var selected = skills.get()[random];

selected.querySelector('div._15U-t').click();

await new Promise(resolve => setTimeout(resolve, 2000));

let start = document.querySelector('button[data-test="start-button"]');

start.click();