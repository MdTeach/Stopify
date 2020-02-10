const getInMinutes = (mills)=>{
    let remaning = mills%60;
    let mins = (mills-remaning)/60
    remaning = Math.ceil(remaning);

    let secString  = remaning >= 10 ? remaning.toString() : "0"+remaning.toString()
    let minString = mins >= 10 ? mins.toString() : "0"+mins.toString()
    return minString+":"+secString
}

export {getInMinutes}