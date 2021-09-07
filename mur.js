//==============================================
//== MUR =======================================
//==============================================

class classMur
{
    name;
    level;
    briques;
    w;
    h;
    total;
    
    constructor()
    {
        this.name = "jeu.arene.mur";

        this.w = 13;
        this.h = 18;

        this.total = 0;
    }

    loadLevel(niveau)
    {
        console.log(this.name+".loadLevel();");

        this.fichier = "";
        this.level = "";
        this.total = 0;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'levels/level' + niveau + '.txt', false);
        xhr.send(null);
        if (xhr.status == "404") 
        {
            
                niveau = 0;
                xhr.open('GET', 'levels/level' + niveau + '.txt', false);
                xhr.send(null);
                if(jeu.demoMode == false)
                {
                    jeu.aBravo.play();
                    jeu.msg.style.top = "35%";
                    jeu.msg.style.left = "7%";
                    jeu.msgVies.innerHTML = "Vies : "+jeu.vies; 
                    jeu.catched = true;  
                    jeu.msg.innerHTML = "BRAVO";
                    setTimeout("jeu.msg.innerHTML = ''", 10000);                                          
                }
        } 
        this.fichier = xhr.responseText;

        for (let m = 0; m < this.fichier.length; m++) 
        {
            let c = this.fichier.substring(m, m + 1);
            if (c == "_" || (c >= "0" && c <= "9") || (c >= "A" && c <= "B"))
            {
                this.level += c;
                if ((c >= "0" && c <= "9") || (c >= "A" && c <= "B"))
                {
                    this.total++;
                }
            }
        }
    }

    createWall()
    {
        console.log(this.name+".createWall();");

        this.briques = [];
        let i = 0;
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {

                let x1 = x * 40;
                let y1 = y * 20;
                let x2 = x1 + 40;
                let y2 = y1 + 20;

                let cb = this.level.substring(i, i + 1);

                if (cb != "_")
                {
                    this.briques[i] = new Brique(i, x1, y1, x2, y2, cb);
                }           
                i++;
            }
        }
    }

    resetWall()
    {
        console.log(this.name+".resetWall();");

        let i = 0;
        for(let y = 0; y < 18; y++)
        {
            for(let x = 0; x < 13; x++)
            {
                let element = document.getElementById("brique"+i);
                if (element)
                {
                    element.remove(); 
                }                        
                i++;
            }
        }
    }
}