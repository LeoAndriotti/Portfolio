function baskara()
{
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);

    let x1 = 0;
    let x2=0;
    let d=0;
    let r=0;
    let dn=0;
    d=((b*b)-(4*a*c));
    if(d<0){
        dn=-(d);
        d=dn;
        r=Math.sqrt(d);
        x1=((-b+(r))/(2*a));
        x2=((-b-(r))/(2*a));
        document.getElementById("resultado").textContent =
    `As raízes são: x1 =  ${x1.toFixed(2)}  x2 = ${x2.toFixed(2)}`;
    }else{
        r=Math.sqrt(d);
        x1=((-b+(r))/(2*a));
        x2=((-b-(r))/(2*a));
        document.getElementById("resultado").textContent =
        `As raízes são: x1 =  ${x1.toFixed(2)}" \n x2 = ${x2.toFixed(2)}`;
    }
}

