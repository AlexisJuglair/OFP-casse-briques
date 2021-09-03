//==============================================
//== JEU =======================================
//==============================================

class classJeu 
{
    name;
    niveau;
    vies;
    demoMode;
    msg;
    msgVies;
    aGameOver;
    viesDecrem;

    constructor()
    {
        this.name        = 'jeu.arene';

        this.niveau      = 0;
        this.vies        = 10;

        this.demoMode    = false;
        this.msg         = "";
        this.msgVies     = "";
        this.viesDecrem  = this.vies;

        this.aGameOver = new Audio('sounds/game-over.mp3');
        this.aBravo = new Audio('sounds/bravo.mp3');
    }

    start() 
    {
        console.log(this.name+".start();");

        this.demoMode = true;

        if (document.getElementById("arene"))
        {
            btnStart.enable();
        }

        if (!document.getElementById("arene")) 
        {
            this.arene = new classArene();
            
            this.arene.createElement();
            this.arene.open();

            this.arene.batte.createElement();
            this.arene.batte.startListenMouse();

            this.arene.balles[0].createElement();

            this.msg = document.createElement("div");
            this.msg.id = "msg";
            document.getElementById("arene").appendChild(this.msg);

            this.msgVies = document.createElement("div");
            this.msgVies.id = "vies";
            document.getElementById("arene").appendChild(this.msgVies);            
        }

        this.arene.mur.resetWall();
        this.arene.mur.loadLevel(this.niveau);
        this.arene.mur.createWall();

        this.arene.balles[0].go();

        if(this.demoMode)
        {
            this.demo();
        }   
    }

    countDown()
    {
        console.log(this.name+".countDown();");
        
        this.msg.innerHTML = "";
        this.msg.style.top = "35%";
        this.msg.style.left = "25%";

        setTimeout(function() { this.msg.innerHTML = '3' }, 1000);
        setTimeout(function() { this.msg.innerHTML = '2' }, 2000);
        setTimeout(function() { this.msg.innerHTML = '1' }, 3000);
        setTimeout(function() { this.msg.innerHTML = '' }, 4000);
    }

    newGame() 
    {
        console.log(this.name+".newGame();");

        btnQuit.set("RETOUR", () => { this.start(); });

        btnStart.disable();
        btnQuit.enable();

        this.demoMode = false;

        this.niveau = 0;

        this.arene.balles[0].stop();
        this.arene.balles[0].removeElement();

        this.countDown();

        setTimeout("jeu.arene.mur.resetWall();", 4000); 
        setTimeout("jeu.arene.mur.loadLevel("+this.niveau+");", 4000); 
        setTimeout("jeu.arene.mur.createWall();", 4000); 

        this.msgVies.innerHTML = "Vies : "+this.vies;
        this.viesDecrem  = this.vies;

        setTimeout("jeu.arene.balles[0].createElement();", 4000);
        setTimeout("jeu.arene.balles[0].go();", 4000);

        setTimeout("jeu.arene.batte.go();", 4000);
    }

    demo()
    {
        console.log(this.name+".demo();"); 

        btnQuit.set("Home", () => { this.arene.close(); });

        this.msg.style.top = "35%";
        this.msg.style.left = "15%";
        this.msg.innerHTML = "DEMO";
        this.msgVies.innerHTML = "Vies : -";

        // btnStart.enable();
        // btnQuit.enable();

        this.demoMode = true;
         
        this.niveau = 0;
    }

    quit() 
    {
        console.log(this.name+".quit();");

        document.location.href = "https://www.google.fr";
    }
}