//==============================================
//== BRIQUE ====================================
//==============================================

class Brique 
{
    name;
    id;
    x;
    y;
    x2;
    y2;
    cb;

    constructor(id,x1,y1,x2,y2,cb)
    {
        this.name = "brique";
        // console.log(id + " : " + x + ", " + y);
        
        this.id = id;
        this.x = x1;
        this.y = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.cb = cb;

        this.createElement();
    }

    createElement() 
    {
        // console.log(this.name+".createElement();)");
        
        this[this.id] = document.createElement("div");
        this[this.id].id = "brique" + this.id;
        this[this.id].className = "brique b" + this.cb;
        this[this.id].style.left = this.x + "px";
        this[this.id].style.top = this.y + "px";
        document.getElementById("arene").appendChild(this[this.id]);
    }
}