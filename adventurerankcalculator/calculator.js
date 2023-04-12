function calculate() {
    let ADVENTURE_RANK_EXP_TABLE, DAILY_COMMISSION_EXP, EXP_GAIN_PER_DAY, EXP_PER_20_RESIN, MY_AR, MY_AR_EXP,
        RESIN_EXP_PER_DAY, RESIN_USAGE_PER_DAY, TOTAL_EXP_REQUIRED, WANTED_AR;
    MY_AR_EXP = document.getElementById("exp").value;
    MY_AR = document.getElementById("currentAR").value;
    WANTED_AR = document.getElementById("targetedAR").value;
    ADVENTURE_RANK_EXP_TABLE = {
        [50]: 294200,
        [51]: 320600,
        [52]: 349400,
        [53]: 380600,
        [54]: 414200,
        [55]: 450200,
        [56]: 682550,
        [57]: 941500,
        [58]: 1227250,
        [59]: 1540075,
        [60]: 1880200
    };
    RESIN_USAGE_PER_DAY = 0;
    if (document.getElementById("resin").checked) {
        RESIN_USAGE_PER_DAY = 180;
    }
    if (document.getElementById("primogemresin").checked) {
        RESIN_USAGE_PER_DAY = RESIN_USAGE_PER_DAY + 60
    }
    EXP_PER_20_RESIN = 100;
    RESIN_EXP_PER_DAY = RESIN_USAGE_PER_DAY / 20 * EXP_PER_20_RESIN;
    DAILY_COMMISSION_EXP = 500 + 4 * 250;
    EXP_GAIN_PER_DAY = DAILY_COMMISSION_EXP + RESIN_EXP_PER_DAY;
    TOTAL_EXP_REQUIRED = ADVENTURE_RANK_EXP_TABLE[WANTED_AR] - ADVENTURE_RANK_EXP_TABLE[MY_AR] - MY_AR_EXP;
    console.log("Total Exp required: ", TOTAL_EXP_REQUIRED);
    console.log("Estimated days until targeted AR:", TOTAL_EXP_REQUIRED / EXP_GAIN_PER_DAY);

    document.getElementById("result").innerHTML = "Total EXP required: " + TOTAL_EXP_REQUIRED + "  •  " + "ETA: " + TOTAL_EXP_REQUIRED / EXP_GAIN_PER_DAY + " days till AR" + WANTED_AR


    let maxParticleCount = 150; //set max confetti count
    let particleSpeed = 2; //set the particle animation speed
    let startConfetti; //call to start confetti animation
    let stopConfetti; //call to stop adding confetti
    let toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
    let removeConfetti; //call to stop the confetti animation and remove all confetti immediately

    (function () {
        startConfetti = startConfettiInner;
        stopConfetti = stopConfettiInner;
        toggleConfetti = toggleConfettiInner;
        removeConfetti = removeConfettiInner;
        var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
        var streamingConfetti = false;
        var animationTimer = null;
        var particles = [];
        var waveAngle = 0;

        function resetParticle(particle, width, height) {
            particle.color = colors[(Math.random() * colors.length) | 0];
            particle.x = Math.random() * width;
            particle.y = Math.random() * height - height;
            particle.diameter = Math.random() * 10 + 5;
            particle.tilt = Math.random() * 10 - 10;
            particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
            particle.tiltAngle = 0;
            return particle;
        }

        function startConfettiInner() {
            var width = window.innerWidth;
            var height = window.innerHeight;
            window.requestAnimFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        return window.setTimeout(callback, 16.6666667);
                    };
            })();
            var canvas = document.getElementById("confetti-canvas");
            if (canvas === null) {
                canvas = document.createElement("canvas");
                canvas.setAttribute("id", "confetti-canvas");
                canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
                document.body.appendChild(canvas);
                canvas.width = width;
                canvas.height = height;
                window.addEventListener("resize", function () {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }, true);
            }
            var context = canvas.getContext("2d");
            while (particles.length < maxParticleCount)
                particles.push(resetParticle({}, width, height));
            streamingConfetti = true;
            if (animationTimer === null) {
                (function runAnimation() {
                    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
                    if (particles.length === 0)
                        animationTimer = null;
                    else {
                        updateParticles();
                        drawParticles(context);
                        animationTimer = requestAnimFrame(runAnimation);
                    }
                })();
            }
        }

        function stopConfettiInner() {
            streamingConfetti = false;
        }

        function removeConfettiInner() {
            stopConfetti();
            particles = [];
        }

        function toggleConfettiInner() {
            if (streamingConfetti)
                stopConfettiInner();
            else
                startConfettiInner();
        }

        function drawParticles(context) {
            var particle;
            var x;
            for (var i = 0; i < particles.length; i++) {
                particle = particles[i];
                context.beginPath();
                context.lineWidth = particle.diameter;
                context.strokeStyle = particle.color;
                x = particle.x + particle.tilt;
                context.moveTo(x + particle.diameter / 2, particle.y);
                context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
                context.stroke();
            }
        }

        function updateParticles() {
            var width = window.innerWidth;
            var height = window.innerHeight;
            var particle;
            waveAngle += 0.01;
            for (var i = 0; i < particles.length; i++) {
                particle = particles[i];
                if (!streamingConfetti && particle.y < -15)
                    particle.y = height + 100;
                else {
                    particle.tiltAngle += particle.tiltAngleIncrement;
                    particle.x += Math.sin(waveAngle);
                    particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
                    particle.tilt = Math.sin(particle.tiltAngle) * 15;
                }
                if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
                    if (streamingConfetti && particles.length <= maxParticleCount)
                        resetParticle(particle, width, height);
                    else {
                        particles.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    })();

    startConfetti();
    setTimeout(function () {
        stopConfetti();
    }, 1000);
}