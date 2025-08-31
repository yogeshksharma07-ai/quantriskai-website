/ Interactive Risk Assessment Demo

document.addEventListener('DOMContentLoaded', function() {
    initializeRiskMeter();
    initializeParticles();
});

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
        return; // Elements not found, exit gracefully
    }
    
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
    let color, bgColor;
    
    // Determine color based on risk level
    if (riskScore <= 30) {
        color = '#10b981'; // Green
        bgColor = '#dcfce7';
    } else if (riskScore <= 60) {
        color = '#f59e0b'; // Yellow
        bgColor = '#fef3c7';
    } else {
        color = '#ef4444'; // Red
        bgColor = '#fee2e2';
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

// Particle System
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createParticle(), i * 1000);
    }
    
    // Continue creating particles
    setInterval(createParticle, 2000);
}

function createParticle() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning and timing
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    
    // Random size variation
    const size = Math.random() * 3 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particlesContainer.appendChild(particle);
    
    // Clean up particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 25000);
}

// Advanced Risk Calculations
function calculateAdvancedRisk(market, liquidity, credit) {
    // More sophisticated risk calculation with correlations
    const marketWeight = 0.4;
    const liquidityWeight = 0.3;
    const creditWeight = 0.3;
    
    // Add correlation adjustments
    const correlationBonus = Math.min(10, Math.abs(market - liquidity) / 10);
    const volatilityPenalty = market > 80 ? 5 : 0;
    
    const baseRisk = (market * marketWeight + liquidity * liquidityWeight + credit * creditWeight);
    const adjustedRisk = Math.max(0, Math.min(100, baseRisk - correlationBonus + volatilityPenalty));
    
    return Math.round(adjustedRisk);
}

// Risk Scenario Presets
function applyRiskScenario(scenario) {
    const marketVolatility = document.getElementById('marketVolatility');
    const liquidityRisk = document.getElementById('liquidityRisk');
    const creditRisk = document.getElementById('creditRisk');
    
    const scenarios = {
        bullMarket: { market: 15, liquidity: 10, credit: 20 },
        bearMarket: { market: 85, liquidity: 70, credit: 60 },
        crisis: { market: 95, liquidity: 90, credit: 85 },
        stable: { market: 25, liquidity: 20, credit: 25 }
    };
    
    const preset = scenarios[scenario];
    if (preset) {
        marketVolatility.value = preset.market;
        liquidityRisk.value = preset.liquidity;
        creditRisk.value = preset.credit;
        updateRiskScore();
    }
}

// Add scenario buttons to demo
function addScenarioButtons() {
    const controls = document.querySelector('.controls');
    if (!controls) return;
    
    const scenarioContainer = document.createElement('div');
    scenarioContainer.style.cssText = `
        margin-top: 2rem;
        text-align: center;
    `;
    
    scenarioContainer.innerHTML = `
        <h4 style="margin-bottom: 1rem; color: var(--text-dark);">Quick Scenarios</h4>
        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
            <button onclick="applyRiskScenario('stable')" class="scenario-btn">Stable</button>
            <button onclick="applyRiskScenario('bullMarket')" class="scenario-btn">Bull Market</button>
            <button onclick="applyRiskScenario('bearMarket')" class="scenario-btn">Bear Market</button>
            <button onclick="applyRiskScenario('crisis')" class="scenario-btn">Crisis</button>
        </div>
    `;
    
    controls.appendChild(scenarioContainer);
    
    // Add scenario button styles
    const scenarioStyles = document.createElement('style');
    scenarioStyles.textContent = `
        .scenario-btn {
            padding: 0.5rem 1rem;
            border: 1px solid var(--accent-color);
            background: transparent;
            color: var(--accent-color);
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .scenario-btn:hover {
            background: var(--accent-color);
            color: white;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(scenarioStyles);
}

// Initialize scenario buttons after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addScenarioButtons, 100);
});