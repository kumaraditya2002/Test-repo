let url = 'db.json';
let btns = document.getElementsByClassName('btnmy');
Array.from(btns).forEach(item => {
    item.addEventListener('click', e => {
        let headings = document.getElementById('theading');
        let main = document.getElementById('main');
        main.style.display = "none";
        document.getElementById('tit').innerText = item.innerText;
        fetch(url).then(res => {
            return res.json();
        }).then(data => {
            let arr = data[item.innerText];
            let hstr = `<tr>`;
            for (let titles in arr[0]) {
                hstr += `<th scope="col">${titles}</th>`
            }
            hstr += `</tr>`
            headings.innerHTML = hstr;
            let body = document.getElementById('tbody');
            let html = ``;
            arr.forEach(element => {
                html += `<tr>`;
                for (let title in element) {
                    console.log(element);
                    html += `<td>${element[title]}</td>`;
                }
                html += `</tr>`;
            });
            body.innerHTML = html;
        }).catch(err => console.log(err));
    });
});
