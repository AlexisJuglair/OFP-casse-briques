//==============================================
//== BATTE =====================================
//==============================================

class batte {
    name;
    run;
    w;
    y;
    x1;
    x2;
    ox;

    constructor ()
    {
        this.name = "batte";

        this.run = null;

        // this.x = 0;
        
        this.w = 80;
        this.y = 460;
        
        this.x1 = 0;
        this.x2 = this.x1 + this.w;
        this.ox = this.x1;
    }

    createElement()
    {
        console.log(this.name+".createElement();");

        let batte = document.createElement("div");
        batte.id = "batte";
        batte.className = "batte";
        document.getElementById("arene").appendChild(batte);      
    }

    startListenMouse()
    {
        //console.log(this.name+".startListenMouse();");

        document.body.onmousemove = function (event) 
        {
            let bcr = parseInt(jeu.arene.element.getBoundingClientRect().left);
            jeu.arene.batte.x1 = event.clientX - bcr - (jeu.arene.batte.w / 2);
            // jeu.arene.batte.move();
            // jeu.catched = true;
            jeu.arene.batte.go();
        }
    }

    move() 
    {
        //console.log(this.name+".move();");
        
        if (jeu.catched == false)
        {
            if (jeu.demoMode) 
            {
                this.x1 = jeu.arene.balles[0].x - (this.w / 2);
            }
            
            if (this.x1 < 0) 
            {
                this.x1 = 0;
            }
    
            if (this.x1 > (520 - this.w)) 
            {
                this.x1 = 520 - this.w;
            }
        }
        else
        {
            jeu.arene.balles[0].moveTo(this.x1, this.y);
        }

        this.x2 = this.x1 + this.w;
        document.getElementById("batte").style.left = this.x1 + "px"; 
    }  

    go()
    {
        //console.log(this.name + ".go();");
        if(this.run == undefined || this.run == null)
        {
            this.run = setInterval("jeu.arene.batte.move();",5);
        }    
        if (jeu.demoMode == false)
        {
            this.startListenMouse();
        }
    }

    stop()
    {
        console.log(this.name + ".stop);");

        clearInterval(this.run);
    }
}