let x = document.getElementsByClassName("nested-dropdown")[0];
let _uls = document.getElementsByClassName("nested-ul");
for (let i = 0; i < _uls.length; i++) {
  let _lis = _uls[i].children;
  for (let j = 0; j < _lis.length; j++) {
    let btn = _lis[j].children[1].children[0];
    btn.addEventListener("click", () => {
      let _el = _lis[j].children[2];
      _el.classList.toggle("_hide");
    });
  }
}
