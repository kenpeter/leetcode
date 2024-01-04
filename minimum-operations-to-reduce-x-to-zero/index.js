/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function(ns, x) {
    // * g: test case:
    // * g: 1. special case
    // * g: 2. not enough
    // * g: 3. enough
    // * g: 4. left forward only
    // * g: 5. right backward only
    // * g: 6. left forward and right backward together

    const curr_sum = ns.reduce((acc, a) => {
        return acc + a;
    }, 0);
    if(curr_sum < x) {
        return -1;
    }

    // * g: case 1
    let l = 0;
    let r = 0;
    let t_sum_left = 0;
    let time1 = 0;

    while(r < ns.length) {
        t_sum_left = t_sum_left + ns[r];

        ++time1;

        if(t_sum_left === x) {
            // * g: res
            break;
        } else if(t_sum_left > x) {
            time1 = Infinity;
            break;
        }

        ++r;
    }


    // * g: case 2
    l = ns.length-1;
    r = ns.length-1;
    let t_sum_right = 0;
    let time2 = 0;
    while(l >= 0) {
        t_sum_right = t_sum_right + ns[l];

        ++time2;

        if(t_sum_right === x) {
            // * g: res
            break;
        } else if(t_sum_right > x) {
            time2 = Infinity;
            break;
        }

        --l;
    }

    // * g: case 3
    let a_right = 0;

    let b_left = ns.length-1;

    let sum3 = 0;
    let t_sum3 = 0;
    let time3 = 0;
    let t_time3 = 0;

    // * g: outloop stable, inloop run, for 2 slide window
    outloop:
    while(a_right < ns.length) {
        sum3 = sum3 + ns[a_right];
        ++time3;

        if(sum3 === x) {
            // * g: res
            break;
        } else if(sum3 > x) {
            time3 = Infinity;
            break;
        } else {
            // * g: inloop use tmp, reset after inloop finish
            // * g: inloop many reset
            t_sum3 = sum3;
            t_time3 = time3;
            b_left = ns.length-1;

            while(b_left >= 0) {
               t_sum3 = t_sum3 + ns[b_left];
               ++t_time3;

               if(t_sum3 === x) {
                   // * g: res
                   time3 = t_time3;
                   // * g: multi loop, need further break
                   break outloop;
               } else if(t_sum3 > x) {
                   // * g: !work, try other way
                   break;
               }

               --b_left;
            }
        }

        ++a_right;
    }


    // * g: diff scenario need compare
    const res = Math.min(time1, time2, time3);
    if(res === Infinity) {
        return -1;
    } else {
        return res;
    }
};