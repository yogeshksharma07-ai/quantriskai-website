// Interactive Risk Assessment Demo

document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing interactive features...');
    initializeTabs();
    initializeRiskMeter();
    initializeOilVaR();
    initializeParticles();
});

// Tab Switching Functionality
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    console.log('Found', tabBtns.length, 'tab buttons');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            console.log('Switching to tab:', tabName);
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const activeTab = document.getElementById(`${tabName}-tab`);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
}

// Risk Meter Functionality
function initializeRiskMeter() {
    const riskValue = document.getElementById('riskValue');
    const marketVolatility = document.getElementById('marketVolatility');
    const liquidityRisk = document.getElementById('liquidityRisk');
    const creditRisk = document.getElementById('creditRisk');
    // Display value elements
    const marketValue = document.getElementById('marketValue');
    const liquidityValue = document.getElementById('liquidityValue');
    const creditValue = document.getElementById('creditValue');
    if (!riskValue || !marketVolatility || !liquidityRisk || !creditRisk) {
        console.log('Risk meter elements not found');
        return; // Elements not found, exit gracefully
    }
    console.log('Risk meter initialized');
    // Event listeners for sliders
    marketVolatility.addEventListener('input', updateRiskScore);
    liquidityRisk.addEventListener('input', updateRiskScore);
    creditRisk.addEventListener('input', updateRiskScore);
    // Initialize with default values
    updateRiskScore();
}

function updateRiskScore() {
    const marketVolatility = document.getElementById('marketVolatility');
    const liquidityRisk = document.getElementById('liquidityRisk');
    const creditRisk = document.getElementById('creditRisk');
    const riskValue = document.getElementById('riskValue');
    const meterCircle = document.getElementById('meterCircle');
    // Update display values
    const marketValue = document.getElementById('marketValue');
    const liquidityValue = document.getElementById('liquidityValue');
    const creditValue = document.getElementById('creditValue');
    if (marketValue) marketValue.textContent = marketVolatility.value;
    if (liquidityValue) liquidityValue.textContent = liquidityRisk.value;
    if (creditValue) creditValue.textContent = creditRisk.value;
    // Calculate weighted risk score
    const market = parseInt(marketVolatility.value);
    const liquidity = parseInt(liquidityRisk.value);
    const credit = parseInt(creditRisk.value);
    // Weighted formula: Market 40%, Liquidity 30%, Credit 30%
    const totalRisk = Math.round((market * 0.4 + liquidity * 0.3 + credit * 0.3));
    // Update risk value display
    riskValue.textContent = totalRisk;
    // Update meter visual
    updateMeterVisual(totalRisk, meterCircle);
    // Update risk assessment text
    updateRiskAssessment(totalRisk);
}

function updateMeterVisual(riskScore, meterElement) {
    const angle = riskScore * 3.6; // Convert percentage to degrees
    let color;
    // Determine color based on risk level
    if (riskScore <= 30) {
        color = '#10b981'; // Green
    } else if (riskScore <= 60) {
        color = '#f59e0b'; // Yellow
    } else {
        color = '#ef4444'; // Red
    }
    // Update meter circle gradient
    meterElement.style.background = `conic-gradient(from 0deg, ${color} 0deg ${angle}deg, #e5e7eb ${angle}deg 360deg)`;
    // Add pulse animation for high risk
    if (riskScore > 80) {
        meterElement.style.animation = 'pulse 2s infinite';
    } else {
        meterElement.style.animation = 'none';
    }
}

function updateRiskAssessment(riskScore) {
    // Create or update risk assessment text
    let assessmentEl = document.getElementById('riskAssessment');
    if (!assessmentEl) {
        assessmentEl = document.createElement('div');
        assessmentEl.id = 'riskAssessment';
        assessmentEl.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
            transition: all 0.3s ease;
        `;
        const controls = document.querySelector('.controls');
        if (controls) {
            controls.appendChild(assessmentEl);
        }
    }
    let assessment, bgColor, textColor;
    if (riskScore <= 30) {
        assessment = "Low Risk - Favorable conditions for investment";
        bgColor = '#dcfce7';
        textColor = '#166534';
    } else if (riskScore <= 60) {
        assessment = "Moderate Risk - Proceed with caution and monitoring";
        bgColor = '#fef3c7';
        textColor = '#92400e';
    } else {
        assessment = "High Risk - Consider risk mitigation strategies";
        bgColor = '#fee2e2';
        textColor = '#dc2626';
    }
    assessmentEl.textContent = assessment;
    assessmentEl.style.backgroundColor = bgColor;
    assessmentEl.style.color = textColor;
}

// Crude Oil VaR Calculator using pre-fetched local data
function initializeOilVaR() {
    const varDuration = document.getElementById('varDuration');
    const confidenceLevel = document.getElementById('confidenceLevel');
    if (!varDuration || !confidenceLevel) {
        console.log('VaR elements not found');
        return;
    }
    console.log('Oil VaR initialized');
    varDuration.addEventListener('input', updateOilVaR);
    confidenceLevel.addEventListener('change', updateOilVaR);
    updateOilVaR();
}

async function updateOilVaR() {
    const varDuration = document.getElementById('varDuration');
    const durationValue = document.getElementById('durationValue');
    const oilSpotPrice = document.getElementById('oilSpotPrice');
    const varValue = document.getElementById('varValue');
    const varDescription = document.getElementById('varDescription');
    if (durationValue) durationValue.textContent = varDuration.value;
    const days = parseInt(varDuration.value);
    // Loading state
    if (oilSpotPrice) oilSpotPrice.textContent = 'Loading...';
    if (varValue) varValue.textContent = 'Calculating...';
    if (varDescription) varDescription.textContent = 'Loading historical crude oil data...';
    try {
        const data = await fetchCrudeOilData(days);
        if (!data || !data.prices || data.prices.length < 2) {
            throw new Error('Insufficient data received');
        }
        const spotPrice = data.prices[data.prices.length - 1];
        if (oilSpotPrice) oilSpotPrice.textContent = `$${spotPrice.toFixed(2)}`;
        const logReturns = calculateLogReturns(data.prices);
        const var95 = calculateVaR(spotPrice, logReturns, 95);
        const var99 = calculateVaR(spotPrice, logReturns, 99);
        if (varValue) {
            varValue.innerHTML = `
                <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <div style="font-size: 0.9em; opacity: 0.8; margin-bottom: 5px;">95% VaR</div>
                        <div style="font-size: 1.2em; font-weight: bold;">$${var95.toFixed(2)}/bbl</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.9em; opacity: 0.8; margin-bottom: 5px;">99% VaR</div>
                        <div style="font-size: 1.2em; font-weight: bold;">$${var99.toFixed(2)}/bbl</div>
                    </div>
                </div>
            `;
        }
        if (varDescription) {
            varDescription.textContent = `Based on ${days} days of historical WTI crude oil data, with 95% confidence the maximum 1-day loss is $${var95.toFixed(2)}/bbl, and with 99% confidence it's $${var99.toFixed(2)}/bbl`;
        }
        console.log(`VaR calculated: 95% = $${var95.toFixed(2)}, 99% = $${var99.toFixed(2)}`);
    } catch (error) {
        console.error('Error loading crude oil data:', error);
        if (oilSpotPrice) oilSpotPrice.textContent = 'Error';
        if (varValue) varValue.textContent = 'N/A';
        if (varDescription) varDescription.textContent = 'Unable to load historical data. Please refresh the page or check the console for errors.';
    }
}

async function fetchCrudeOilData(days) {
    // Load pre-fetched historical data from local JSON file
    const url = 'assets/data/crude-oil-historical.json';
    console.log(`Loading pre-fetched crude oil data for ${days} days from ${url}...`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const availableDays = data.prices.length;
        if (days > availableDays) {
            console.warn(`Requested ${days} days, but only ${availableDays} days available. Using all available data.`);
        }
        const slicedPrices = data.prices.slice(-days);
        const slicedTimestamps = data.timestamps.slice(-days);
        return { prices: slicedPrices, timestamps: slicedTimestamps };
    } catch (error) {
        console.error('Error loading local crude oil data:', error);
        throw error;
    }
}

function calculateLogReturns(prices) {
    const logReturns = [];
    for (let i = 1; i < prices.length; i++) {
        const logReturn = Math.log(prices[i] / prices[i - 1]);
        logReturns.push(logReturn);
    }
    console.log(`Calculated ${logReturns.length} log returns`);
    return logReturns;
}

function calculateVaR(spotPrice, logReturns, confidenceLevel) {
    const sortedReturns = [...logReturns].sort((a, b) => a - b);
    const percentile = (100 - confidenceLevel) / 100;
    const varIndex = Math.floor(percentile * sortedReturns.length);
    const varReturn = sortedReturns[varIndex];
    const varAmount = Math.abs(spotPrice * varReturn);
    console.log(`VaR at ${confidenceLevel}%: $${varAmount.toFixed(2)} (return: ${(varReturn * 100).toFixed(4)}%)`);
    return varAmount;
}

// Particle System
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createParticle(), i * 1000);
    }
    setInterval(createParticle, 2000);
}

function createParticle() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    const size = Math.random() * 3 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particlesContainer.appendChild(particle);
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 25000);
}