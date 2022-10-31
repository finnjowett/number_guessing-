function makeStars(n){
    let ans = '*';
    for (let i =2; i<=n; i++){
        let s = '\n';
        for (let j =0; j<i; j++){
            s+='*';
        }
        ans+=s;
    }
    console.log(ans);
}
makeStars(4)