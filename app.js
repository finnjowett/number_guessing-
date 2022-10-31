let answer = Math.floor(100* Math.random());
let n1=0;
let n2=99;

while (true) {
    let guess = prompt('Make your guess: (between ' +n1+' and '+n2 +')');
    if(guess<n1||guess>n2||isNaN(guess)){
        alert('please make a valid input.');
        continue;
    }
    if(guess == answer) {
        alert('you got it right');
        break;
    } else if(guess<=answer){
        n1=guess;
    } else if(guess>answer){
        n2=guess;
    }
}