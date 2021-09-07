//==============================================
//== BALLE =====================================
//==============================================

class balle 
{
    name;
    id;
    isMoving;
    fixed;
    xs;
    ys;
    x;
    y;
    run;

    constructor(id)
    {
        this.name = "balle";

        this.id = id;

        this.isMoving = false;

        this.catched = true;

        this.xs = 2;
        this.ys = 3;

        this.x = 260;
        this.y = 400;

        this.run = null;
    }

    createElement() 
    {
        console.log(this.name + "[" + this.id + "].createElement();");

        let divBalle = document.createElement("div");
        divBalle.id = "balle" + this.id;
        divBalle.className = "balle";
        document.getElementById("arene").appendChild(divBalle);
    }

    removeElement()
    {
        console.log(this.name + "[" + this.id + "].removeElement();");

        if (document.getElementById("balle"+this.id) != undefined)
        {
            document.getElementById("balle"+this.id).remove();
        }
    }

    move()
    {
        //console.log(brique.x1+','+brique.y1,' / '+brique.x2+','+brique.y2);

        if (this.isMoving == false) 
        {
            this.isMoving = true;

            //COLLISION BORDS GAUCHE ET DROIT
            let dx = this.x + this.xs;
            if(dx < 7 || dx > 513)
            {
                this.xs = this.xs * -1;
                this.x  = (dx < 7) ? 7 : 513;
            }
            
            else
            {
                this.x = dx;
            }
            
            //COLLISION BORDS HAUT ET BAS
            let dy = this.y + this.ys;

            if(dy < 0)
            {
                this.ys = this.ys * -1;
                this.y  = (dy < 7) ? 7 : dy;
            }
            else
            {
                //GAME OVER
                if(dy > 520)
                {
                    this.stop();

                    if (jeu.demoMode == false)
                    {         
                        jeu.viesDecrem--;    
                        jeu.msgVies.innerHTML = "Vies : "+jeu.viesDecrem;
                        if (jeu.viesDecrem == 0)
                        {
                            this.stop();
                            jeu.aGameOver.play();
                            jeu.msg.style.top = "25%";
                            jeu.msg.style.left = "15%";
                            setTimeout("jeu.msg.innerHTML = 'GAME'", 1000);
                            setTimeout("jeu.msg.innerHTML = 'GAME OVER'", 2000);
                            setTimeout("jeu.start();", 2500);
                        }
                        this.reset();
                        jeu.catched = true;
                    }
                    else 
                    {
                        this.reset();
                        this.go();
                    }
                    
                }
                else
                {
                    //COLLISION AVEC LA BATTE
                    if((    dy > (jeu.arene.batte.y - 7)
                        &&  dy < (jeu.arene.batte.y + 10))
                        && (dx >= jeu.arene.batte.x1 && dx <= jeu.arene.batte.x2))
                    {
                        this.ys = this.ys * -1;
                        this.y  = jeu.arene.batte.y - 7;
                    }
                    else
                    {
                        this.y = dy;
                    }
                }
            }

            //COLLISION AVEC LES BRIQUES
            jeu.arene.mur.briques.forEach(brique => 
            {
                let collision = false;
                let points = new Array(8);
               
                points[0] = new classPoint(dx   , dy -7);
                points[1] = new classPoint(dx +5, dy -5);
                points[2] = new classPoint(dx +7, dy);
                points[3] = new classPoint(dx +5, dy +5);
                points[4] = new classPoint(dx   , dy +7);
                points[5] = new classPoint(dx -5, dy +5);
                points[6] = new classPoint(dx -7, dy);
                points[7] = new classPoint(dx -5, dy -5);

                for(let i = 0; i<8; i++)
                {
                    if ((points[i].x >= brique.x && points[i].x <= brique.x2) && (points[i].y >= brique.y && points[i].y <= brique.y2))
                    {
                        points[i].isIn = true;
                    }
                }

                //collision verticale
                if((points[0].isIn && !points[4].isIn) ||
                  (points[4].isIn && !points[0].isIn))
                {
                    this.ys = this.ys * -1;
                    collision = true;
                }

                //collision horizontale
                if((points[6].isIn && !points[2].isIn) || (points[2].isIn && !points[6].isIn))
                {
                    this.xs = this.xs * -1;
                    collision = true;
                }

                //collision diagonale
                if ((points[1].isIn && !points[5].isIn) || (points[7].isIn && !points[3].isIn) ||
                    (points[7].isIn && !points[3].isIn) || (points[3].isIn && !points[7].isIn))
                {
                    this.xs = this.xs * -1;
                    this.ys = this.ys * -1;
                    collision = true;
                }

                if(collision == true)
                {
                    let el = document.getElementById("brique" + brique.id);
                    if(el)
                    {
                        //jeu.aBrique.play();
                        el.parentNode.removeChild(el);

                        jeu.arene.mur.total--;
                        if (jeu.arene.mur.total == 0)
                        {
                            jeu.arene.mur.resetWall();

                            this.stop();
                            
                            jeu.niveau++;
                            jeu.arene.mur.loadLevel(jeu.niveau);
                            jeu.arene.mur.createWall();

                            this.reset();
                            if(jeu.demoMode == true)
                            {                  
                                this.go();
                            }
                            else 
                            {
                                jeu.catched = true;
                            }                    
                        }
                    }
                    brique.x = 0;
                    brique.y = 0;
                    brique.x2 = 0;
                    brique.y2 = 0;
                }
            });

            this.moveTo(this.x, this.y);
            this.isMoving = false;
        }           
    }

    moveTo(x, y)
    {
        // console.log(this.name + "[" + this.id + "].moveTo();");

        if (jeu.catched == false)
        {
            this.x = x;
            this.y = y;
    
            document.getElementById("balle"+this.id).style.left = (x - 7) + "px";
            document.getElementById("balle"+this.id).style.top  = (y - 7) + "px";   
        }
        else
        {
            this.x = x+33;
            this.y = y-7;
            document.getElementById("balle"+this.id).style.left = (x + 33) + "px";
            document.getElementById("balle"+this.id).style.top  = (y - 7) + "px"; 
        }
        
    }

    onClickAction() 
    {
        console.log(this.name+".onClickAction();");
        document.addEventListener("click", function mouseClick()
        {       
            jeu.catched = false;
            jeu.arene.balles[0].go();       
        });
    }

    reset() 
    {
        console.log(this.name+".reset();)");

        this.catched = true;
        this.xs =  1;
        this.ys = -2;
        this.moveTo(260,453);
    }

    go() 
    {
       console.log("jeu.arene.balles[" + this.id +"].go()");
    
       if(this.run == null)
       {
            this.run = setInterval("jeu.arene.balles[0].move()",5);   
       }
       else
       {   
            this.catched = false;
       }
    }

    stop() 
    {
        console.log(this.name+".stop();)");

        if(this.run != null)
        {
            clearInterval(this.run);
            this.run = null;
        }
    }

}