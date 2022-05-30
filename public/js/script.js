
var i;
// const lineThrough = (i)=>{
//    let userText = document.querySelectorAll(`.usertext`);
//    userText.classList.add('text-decoration-line-through');
//    localStorage.setItem(`user${i}`,'line');
// }
// const lineRemove = (i)=>{
//     let userText = document.querySelector('.usertext');
//    userText.classList.remove('text-decoration-line-through');
//    localStorage.removeItem(`user${i}`);
// }


let usertexts = document.querySelectorAll('.form-check-label');
for (let s = 0; s < usertexts.length; s++) {
    const single = usertexts[s];
    single.classList.add(`usertext${s}`);
    
};
const lineDone = document.querySelectorAll('#line_done');
for (i = 0; i < lineDone.length; i++) {
    const check = lineDone[i];
    const singletext = document.querySelector(`.usertext${i}`);
    check.addEventListener('change',()=>{
        
        // let userLine = localStorage.getItem(`user${i}`);
        if(singletext.className ==='text-decoration-line-through'){
            // localStorage.removeItem(`user${i}`);
            singletext.classList.remove('text-decoration-line-through');
        }else{
            console.log('hi')
            singletext.classList.add('text-decoration-line-through');
    
                // localStorage.setItem(`user${i}`,'line');
        }
     
        
 
    });
}


// let userLine = localStorage.getItem(`user${i}`);
// if(userLine == 'line'){
//     singletext.classList.add('text-decoration-line-through');
//     lineDone.setAttribute('checked','checked');
// }else{
//     // singletext.classList.remove('text-decoration-line-through');
// }