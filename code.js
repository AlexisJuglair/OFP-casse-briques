//==============================================
//== COMMUN ====================================
//==============================================

class classBouton
{
    constructor(id) 
    {
        this.name    = "bouton";

        this.id      = id;      
    }

    createElement() {
        console.log(this.name+".createElement();");

        let button = document.createElement("button");
        button.id = this.id;
        document.getElementById("boutons").appendChild(button);
        this.element = document.getElementById(this.id);
    }

    set(libelle,action) 
    {   
        console.log(this.name+".set();");

        this.element.innerHTML = libelle;
        this.element.onclick   = action;       
    }

    disable()
    {
        console.log(this.name+".disable();");

        this.element.setAttribute("disabled", "disabled");
    }

    enable()
    {
        console.log(this.name+".enable();");

        this.element.removeAttribute("disabled");
    }
}

let jeu;
let logo;
let boutons;
let btnStart;
let btnQuit;

function init() 
{
    jeu = new classJeu();

    logo = document.createElement("img");
    logo.id = "logo";
    logo.setAttribute("src", "logo.svg");
    document.body.appendChild(logo);

    boutons = document.createElement("div");
    boutons.id = "boutons";
    document.getElementById("logo").after(boutons);

    btnStart = new classBouton("btnStart");
    btnStart.createElement();
    btnStart.set("START", function() { jeu.start() } );

    btnQuit = new classBouton("btnQuit");
    btnQuit.createElement();
    btnQuit.set("QUIT", function() { jeu.quit() } );
}