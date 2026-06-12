function formatNumber(num) {
            const rounded = parseFloat(num.toFixed(2));
            return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(2).replace(/\.?0+$/, "");
            }
function calculateForces() {
    // Get input values
    const F1 = parseFloat(document.getElementById("knownForce").value);
    const angleAlpha = parseFloat(document.getElementById("angleOppositeF1").value);
    const angleBeta = parseFloat(document.getElementById("angleOppositeF2").value);
    const angleGamma = parseFloat(document.getElementById("angleOppositeF3").value);

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ''; // Clear previous results

    // Validate inputs
    if (isNaN(F1) || isNaN(angleAlpha) || isNaN(angleBeta) || isNaN(angleGamma)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    if (angleAlpha <= 0 || angleBeta <= 0 || angleGamma <= 0 || F1 <= 0) {
        alert("Please enter positive values for all fields.");
        return;
    }

    if (angleAlpha + angleBeta + angleGamma !== 360) {
        alert("The sum of angles α, β, and γ must be 360 degrees.");
        return;
    }

    // Convert angles to radians
    const alphaRad = angleAlpha * Math.PI / 180;
    const betaRad = angleBeta * Math.PI / 180;
    const gammaRad = angleGamma * Math.PI / 180;

    // Calculate forces using Lami's theorem
    const F2 = (F1 * Math.sin(betaRad)) / Math.sin(alphaRad);
    const F3 = (F1 * Math.sin(gammaRad)) / Math.sin(alphaRad);

    // Display results with step-by-step explanation
    resultDiv.innerHTML = `
        <div class="card-body p-3 pb-5">
            <h3>\\( Solution: \\)</h3>
            <p>\\( 1. Known \\, Force (F_1): ${F1} \\, N \\)</p>
            <p>\\( 2. \\, Angles: \\)</p>
            <ul class='angle'>
                <li>\\( Angle \\, Opposite \\, F_1 \\, (\\alpha): ${angleAlpha}^\\circ \\) </li>
                <li>\\( Angle \\, Opposite \\, F_2 \\, (\\beta): ${angleBeta}^\\circ \\) </li>
                <li>\\( Angle \\, Opposite \\, F_3 \\, (\\gamma): ${angleGamma}^\\circ \\)</li>
            </ul>
            <p class='math-wrap'><h5>3. Calculations using Lami's Theorem:</h5></p>
            <p class='math-wrap' >Lami's Theorem states that: </p>
            
            <p><h5>\\( \\frac{F_1}{\\sin \\alpha} = \\frac{F_2}{\\sin \\beta} = \\frac{F_3}{\\sin \\gamma} \\)</h5></p>
            <p>\\( So: \\)</p>
            <ul>
                <li><h5>\\( Force F_2: \\)<br><br>\\( F_2 = \\frac{F_1 \\times \\sin\\beta}{\\sin\\alpha} \\)</h5></li>
                <li><h5>\\( F_2 = \\frac{${F1} \\times (${Math.sin(betaRad).toFixed(4)})}{${Math.sin(alphaRad).toFixed(4)}} \\)</h5></li>
                <li>\\( F_2 = ${formatNumber(F2)} N \\)</li>
            </ul>
            <ul>
                <li><h5> \\( Force F_3: \\)<br><br> \\( F_3 = \\frac{F_1 \\times \\sin \\gamma}{\\sin \\alpha} \\)</h5></li>
                <li><h5>\\( F_3 = \\frac{${F1} \\times (${Math.sin(gammaRad).toFixed(4)})}{${Math.sin(alphaRad).toFixed(4)}} \\)</h5></li>
                <li>\\( F_3 = ${formatNumber(F3)} N \\)</li>
            </ul>
            <h5>\\( Results: \\)</h5>
            <p>\\( Force F_2 = ${formatNumber(F2)} N \\)<br>\\( Force F_3 = ${formatNumber(F3)} N \\)</p>
        </div>
    `;
    MathJax.typeset();
    document.querySelector("#result").classList.add("showResult");
}