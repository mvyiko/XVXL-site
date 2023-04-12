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
}