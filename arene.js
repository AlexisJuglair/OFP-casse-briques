//==============================================
//== ARENE =====================================
//==============================================

class classArene
{  
    name;
    w;
    h;
    mur;
    batte;
    balles;
    onclick;

    constructor()
    {
        this.name = "arene";

        this.w = 0;
        this.h = 0;

        this.mur = new classMur();
        this.batte = new batte(); 

        this.balles = new Array(3);
        this.balles[0] = new balle(0);
        this.balles[1] = new balle(1);
        this.balles[2] = new balle(2);

        this.onclick = "";
        this.element = ""
    }

    createElement()
    {
        console.log(this.name+".createElement();");

        let divArene = document.createElement("div");
        divArene.id = "arene";
        divArene.style.width = this.w;
        divArene.style.height = this.h;
        if (jeu.demoMode == false) 
        {
            divArene.onclick = jeu.arene.batte.startListenMouse();
        }
        
        document.getElementById("logo").after(divArene);
        this.element = document.getElementById("arene");
    }

    open()
    {
        console.log(this.name+".open();");
  
        btnStart.disable();
        btnQuit.disable();

        this.element.style.display = 'block';    
        setTimeout("jeu.arene.element.style.width = 520", 1000);
        setTimeout("jeu.arene.element.style.height = 520", 3000);
        setTimeout("document.getElementById('logo').style.top = '-300px'", 3000);
        setTimeout("jeu.arene.element.style.top = '50px'", 3000);

        setTimeout("btnStart.set('New Game', function() { jeu.newGame(); } )", 4500);
        setTimeout("btnQuit.set('HOME', function() { jeu.arene.close(); } )", 4500);
        setTimeout("btnStart.enable()", 5000);
        setTimeout("btnQuit.enable()", 5000);       
    }

    close()
    {
        console.log(this.name+".close();");

        btnStart.disable();
        btnQuit.disable();

        this.batte.stop();

        this.balles[0].stop();

        setTimeout("jeu.arene.element.style.height = 0", 1000);         
        setTimeout("document.getElementById('logo').style.top = 0", 3000);
        setTimeout("jeu.arene.element.style.top = '240px'", 3000);
        setTimeout("jeu.arene.element.style.width = 0", 4000);
        setTimeout("jeu.arene.element.remove()", 6000);
        
        setTimeout("btnStart.set('START', function() { jeu.start(); } )", 6000);
        setTimeout("btnQuit.set('QUIT', function() { jeu.quit(); } )", 6000);
        setTimeout("btnStart.enable()", 6500);
        setTimeout("btnQuit.enable()", 6500);   
    }
}