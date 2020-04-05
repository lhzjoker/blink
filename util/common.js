const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const random = function generateMixed(n) {
    var res = '';
    /*Math.ceil()是取一个比它大的整数，Math.random()是产生一个0~1的小数，乘35就产生一个0~35的随机数*/
    const id = Math.ceil(Math.random()*35);
    for(var i=0;i<n;i++){
        res+=chars[id]
    }
    return res
}

export {
    random
}