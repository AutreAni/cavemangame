const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

function createImg(src) {
    let img = document.createElement("img");
    img.src = src;
    return img
}

let bgImg = createImg("https://media.istockphoto.com/vectors/seamless-forest-landscape-beautiful-high-quality-unending-background-vector-id1140144751?b=1&k=6&m=1140144751&s=612x612&w=0&h=2XvYN_VgZ05IqXojUC9pJOw75HyXjz_iBM6q2v2psrE=");


let caveman = createImg("https://github.com/AutreAni/cavemangame/blob/main/imgbin_caveman-png%20(1).png?raw=true");

let wildBoar = createImg("/images/wildPig.png");

let rockImg = createImg("/images/kisspng-rock-desert-mineral-sand.png");

let burgerImg = createImg("/images/Daco_4440079.png");

let deathAngelImg = createImg("/images/clipart577822 (1).png");

let lizardImg = createImg("/images/lizard.png");

let flyImg = createImg("/images/fly.png");

let caveImg = createImg("/images/cave.png");

let cavewomanImg = createImg("/images/cavewoman.png");

let campfireImg = createImg("images/campfire.png");


function restart() {
    let gameover = document.querySelector(".gameover");
    gameover.style.display = "none";
    let win = document.querySelector('.win');
    win.style.display = "none";
    let bgData = {
        xDelta: 0,
        bgImg1: {
            x: 0,
        },
        bgImg2: {
            x: canvas.width,
        }
    };

    let cavemanData = {
        hero: {
            xDelta: 0,
            yDelta: 0,
            x: 0,
            y: 250,
            width: 120,
            height: 200,
        },
        rocks: [],
    }


    let wildBoarData = {
        boars: [],
        burgers: [],
        shootCount: 0,
        inHouse: false,
    }

    let lizardData = {
        lizards: [],
        flies: [],
        shootCount: 0,
        inHouse: false,
    }

    let deathAngelData = [];

    let caveData = {
        cave: [],
        cavewoman: [],
        campfire: [],
    }

    let energyBar = document.querySelector(".energyBar");
    energyBar.innerHTML = "";
    let arr = []
    for (let i = 0; i < 4; i++) {
        let div = document.createElement("div");
        div.className = "bar";
        div.classList.add("bar" + i);
        arr.push(div);
    }

    energyBar.append(...arr);

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(bgImg, bgData.bgImg1.x, 0, canvas.width, canvas.height);
        context.drawImage(bgImg, bgData.bgImg2.x, 0, canvas.width, canvas.height);
        context.drawImage(caveman, cavemanData.hero.x, cavemanData.hero.y, cavemanData.hero.width, cavemanData.hero.height);

        cavemanData.rocks.forEach(rock =>
            context.drawImage(rockImg, rock.x, rock.y, rock.width, rock.height));

        wildBoarData.boars.forEach(boar =>
            context.drawImage(wildBoar, boar.x, boar.y, boar.width, boar.height));

        deathAngelData.forEach(angel =>
            context.drawImage(deathAngelImg, angel.x, angel.y, angel.width, angel.height));

        wildBoarData.burgers.forEach(burger =>
            context.drawImage(burgerImg, burger.x, burger.y, burger.width, burger.height));

        lizardData.lizards.forEach(lizard =>
            context.drawImage(lizardImg, lizard.x, lizard.y, lizard.width, lizard.height));
        lizardData.flies.forEach(fly =>
            context.drawImage(flyImg, fly.x, fly.y, fly.width, fly.height));
        caveData.cave.forEach(caveElem =>
            context.drawImage(caveImg, caveElem.x, caveElem.y, caveElem.width, caveElem.height));
        caveData.cavewoman.forEach(cavewomanElem =>
            context.drawImage(cavewomanImg, cavewomanElem.x, cavewomanElem.y, cavewomanElem.width, cavewomanElem.height));
        caveData.campfire.forEach(fire =>
            context.drawImage(campfireImg, fire.x, fire.y, fire.width, fire.height));
    }

    //energy bar last index
    let j = 3;

    //background circles count
    let count = 0;

    function update() {
        //updating x and y

        bgData.bgImg1.x += bgData.xDelta;
        cavemanData.hero.x += cavemanData.hero.xDelta;
        cavemanData.hero.y += cavemanData.hero.yDelta;


        wildBoarData.boars.forEach(boar => {
            boar.y += boar.yDelta,
            boar.x += boar.xDelta
        });


        deathAngelData.forEach(angel => {
            angel.y += angel.yDelta,
                angel.x += angel.xDelta
        });

        cavemanData.rocks.forEach(rock => rock.x += rock.xDelta);
        wildBoarData.burgers.forEach(burger => burger.x += burger.xDelta);

        lizardData.lizards.forEach(lizard => {
            lizard.x += lizard.xDelta,
            lizard.y += lizard.yDelta
        });

        lizardData.flies.forEach(fly => fly.x += fly.xDelta);

        //filtering out of canvas elements

        wildBoarData.burgers = wildBoarData.burgers.filter(burger => !burger.deleteMe);
        cavemanData.rocks = cavemanData.rocks.filter(rock => !rock.deleteMe);
        wildBoarData.boars = wildBoarData.boars.filter(boar => !boar.deleteMe);
        deathAngelData = deathAngelData.filter(angel => !angel.deleteMe);
        lizardData.lizards = lizardData.lizards.filter(lizard => !lizard.deleteMe);
        lizardData.flies = lizardData.flies.filter(fly => !fly.deleteMe);


        //panning background

        if (bgData.bgImg1.x < - canvas.width) {
            bgData.bgImg1.x = 0;
            count++;
        }
        if (bgData.bgImg1.x < 0) {
            bgData.bgImg2.x = canvas.width + bgData.bgImg1.x;
        }

        //keeping caveman inside canvas

        if (cavemanData.hero.x > canvas.width - cavemanData.hero.width) {
            cavemanData.hero.x = canvas.width - cavemanData.hero.width;
        }

        if (cavemanData.hero.x < 0) cavemanData.hero.x = 0;

        // filter arrays after leaving canvas

        wildBoarData.boars.forEach(boar => (boar.y + boar.height) < 0 ? boar.deleteMe = true : boar.deleteMe = false);

        wildBoarData.burgers.forEach(burger => burger.x < 0 ? burger.deleteMe = true : burger.deleteMe = false);

        deathAngelData.forEach(angel => angel.y + angel.height < 0 ? angel.deleteMe = true : angel.deleteMe = false);

        lizardData.lizards.forEach(lizard => (lizard.y + lizard.height) < 0 ? lizard.deleteMe = true : lizard.deleteMe = false);

        lizardData.flies.forEach(fly => (fly.y + fly.height) < 0 ? fly.deleteMe = true : fly.deleteMe = false);


        //controlling energy bar
        if (cavemanData.hero.isHit) {
            let div = document.querySelector(`.bar${j}`);
            if (div) div.remove();
            j--;
            arr.pop();
            cavemanData.hero.isHit = false;
        }

        //check for intersaction


        //burger and caveman hero
        wildBoarData.burgers.forEach(function (burger) {
            if (intersect(cavemanData.hero, burger)) {
                cavemanData.hero.isHit = true;
                burger.deleteMe = true;
            }
        });
        // rocks and burgers
        cavemanData.rocks.forEach(function (rock) {
            wildBoarData.burgers.forEach(function (burger) {
                if (intersect(rock, burger)) {
                    rock.deleteMe = true;
                    burger.deleteMe = true;
                }
            });
        });
        // rock and wildBoar
        if (wildBoarData.boars.length) {
            cavemanData.rocks.forEach(function (rock) {
                wildBoarData.boars.forEach(function (boar) {
                    if (intersect(boar, rock)) {
                        rock.deleteMe = true;
                        boar.yDelta = -3;
                        if (!deathAngelData.length) {
                            deathAngelData.push({
                                xDelta: -2,
                                yDelta: -3,
                                x: boar.x - 150,
                                y: boar.y,
                                width: 150,
                                height: 180,
                            });
                        }
                    }
                });
            });
        }

        //caveman hero and wildBoar
        if (wildBoarData.boars.length) {
            wildBoarData.boars.forEach(function (hero) {
                if (intersect(cavemanData.hero, hero)) {
                    cavemanData.hero.isHit = true;
                    hero.x = -200;
                }
            });
        }

        //fly and caveman
        lizardData.flies.forEach(function (fly) {
            if (intersect(cavemanData.hero, fly)) {
                cavemanData.hero.isHit = true;
                fly.deleteMe = true;
            }
        });

        //fly and rock
        cavemanData.rocks.forEach(function (rock) {
            lizardData.flies.forEach(function (fly) {
                if (intersect(rock, fly)) {
                    rock.deleteMe = true;
                    fly.deleteMe = true;
                }
            });
        });

        //rock and lizard

        if (lizardData.lizards.length) {
            cavemanData.rocks.forEach(function (rock) {
                lizardData.lizards.forEach(function (lizard) {
                    if (intersect(lizard, rock)) {
                        rock.deleteMe = true;
                        lizard.yDelta = -3;
                        if (!deathAngelData.length) {
                            deathAngelData.push({
                                xDelta: -2,
                                yDelta: -3,
                                x: lizard.x - 150,
                                y: lizard.y,
                                width: 150,
                                height: 180,
                            });
                        }
                    }
                });
            });
        }
        //caveman hero and lizard
        if (lizardData.lizards.length) {
            lizardData.lizards.forEach(function (lizard) {
                if (intersect(cavemanData.hero, lizard)) {
                    cavemanData.hero.isHit = true;
                    lizard.x = -200;
                }
            });
        }

        //bring boar opponent after background made a circle
        if (count === 1) {
            if (!wildBoarData.inHouse) {
                if (!wildBoarData.boars.length) {
                    wildBoarData.boars.push({
                        xDelta: -2,
                        yDelta: 0,
                        x: canvas.width - 190,
                        width: 180,
                        height: 150,
                        y: 280,
                    });
                    wildBoarData.inHouse = true;
                }
            }
        }

        //opponent can shoot burgers, but not when the distance is less than 400px
        if (wildBoarData.boars.length) {
            if (!wildBoarData.burgers.length) {
                if ((wildBoarData.boars[0].x - cavemanData.hero.x > 400) && wildBoarData.shootCount < 4) {
                    wildBoarData.burgers.push({
                        xDelta: -4,
                        x: wildBoarData.boars[0].x - 20,
                        y: 320,
                        width: 30,
                        height: 30,
                    });
                    wildBoarData.shootCount++;
                }
            }
        }
        if (count === 3) {
            if (!lizardData.lizards.length) {
                if (!lizardData.inHouse) {
                    lizardData.lizards.push({
                        xDelta: -2,
                        yDelta: 0,
                        x: canvas.width - 140,
                        width: 120,
                        height: 150,
                        y: 280,
                    });
                    lizardData.inHouse = true;
                }
            }
        }
        //lizard can shoot
        if (lizardData.lizards.length) {
            if (!lizardData.flies.length) {
                if ((lizardData.lizards[0].x - cavemanData.hero.x > 400) && (lizardData.shootCount < 4)) {
                    lizardData.flies.push({
                        xDelta: -4,
                        x: lizardData.lizards[0].x - 20,
                        y: 320,
                        width: 70,
                        height: 70,
                    });
                    lizardData.shootCount++;
                }
            }
        }


        if (count === 5) {
            if (!caveData.cave.length && !caveData.cavewoman.length) {
                caveData.cave.push({
                    x: canvas.width - 200,
                    y: canvas.height - 270,
                    width: 200,
                    height: 200,
                });
                caveData.cavewoman.push({
                    x: canvas.width - 320,
                    y: canvas.height - 230,
                    width: 80,
                    height: 180,
                });
            }

            if (cavemanData.hero.x + 140 > caveData.cavewoman[0].x) {
                cavemanData.hero.xDelta = 0;
                if (!caveData.campfire.length) {
                    caveData.campfire.push({
                        x: canvas.width - 370,
                        y: canvas.height - 100,
                        width: 100,
                        height: 100,
                    });
                setTimeout(()=> win.style.display = "flex",3000);
                }
            } else {
                cavemanData.hero.xDelta = 5;
                win.style.display = "none";
            }

        }
        //if caveman looses all energy bars he looses the game
        if (j < 0) {
            if (!deathAngelData.length) {
                deathAngelData.push({
                    xDelta: -2,
                    yDelta: -3,
                    x: cavemanData.hero.x + cavemanData.hero.width + 10,
                    y: cavemanData.hero.y,
                    width: 150,
                    height: 180,
                });
                cavemanData.hero.yDelta = -3;
                setTimeout(() => gameover.style.display = "flex", 3000);
            }
        } else {
            gameover.style.display = "none";
        }
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    loop();


    function intersect(rect1, rect2) {
        const x = Math.max(rect1.x, rect2.x),
            num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
            y = Math.max(rect1.y, rect2.y),
            num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
        return (num1 >= x && num2 >= y);
    };

    //count is to track cirlces of bg


    document.addEventListener("keydown", function (e) {
        if (e.code === "ArrowUp") {
            //move bg while playing
            bgData.xDelta = -4;

       
            // stop panning background when caveman reached the cave    
            if (count === 5) {
                bgData.xDelta = 0;
            }
        }

        //move caveman hero around in canvas
        if (e.code === "ArrowRight") {
            cavemanData.hero.xDelta = 5;
        }
        if (e.code === "ArrowLeft") {
            cavemanData.hero.xDelta = -5;
        }

        //shoot
        if (e.code === "Space") {
            cavemanData.rocks.push({
                xDelta: 3,
                x: cavemanData.hero.x + cavemanData.hero.width,
                y: cavemanData.hero.y + cavemanData.hero.height / 3,
                width: 50,
                height: 50,
            });
        }
    });


    document.addEventListener("keyup", function (e) {
        if (e.code === "ArrowUp") {
            bgData.xDelta = 0;
            // wildBoarData.boars.forEach(boar => boar.xDelta = 0);
            deathAngelData.forEach(angel => angel.xDelta = 0);
            // lizardData.lizards.forEach(lizard => lizard.xDelta = 0);
        }

        if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
            cavemanData.hero.xDelta = 0;
        }
    });
}


document.body.addEventListener("click", function(event){
    let target = event.target.closest("button");
    if(!target) return;
    if(target.tagName !== "BUTTON") return;
    restart();
});


restart();

let instruction = document.querySelector(".instruction");

window.addEventListener("load", instruct);
function instruct() {
    instruction.style.display = "flex";
    setTimeout(() => instruction.style.display = "none", 4000);
}
document.body.addEventListener("keydown", function () {
    instruction.style.display = "none";
})