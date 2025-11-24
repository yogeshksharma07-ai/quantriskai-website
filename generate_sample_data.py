import json
import math
import random
import time

# Generate realistic crude oil price data
# Based on typical WTI crude oil characteristics:
# - Current price range: $65-$85/bbl
# - Annual volatility: ~35%
# - Mean reversion tendency

def generate_crude_oil_prices(days=500, initial_price=75.0, annual_vol=0.35, mean_price=75.0, mean_reversion=0.05):
    """
    Generate realistic crude oil prices using geometric Brownian motion with mean reversion
    """
    prices = [initial_price]
    daily_vol = annual_vol / math.sqrt(252)  # Convert annual to daily volatility
    
    for i in range(1, days):
        # Mean reversion component
        drift = mean_reversion * (mean_price - prices[-1]) / prices[-1]
        
        # Random shock (Box-Muller transform for normal distribution)
        u1 = random.random()
        u2 = random.random()
        z = math.sqrt(-2 * math.log(u1)) * math.cos(2 * math.pi * u2)
        
        # Price change
        daily_return = drift + daily_vol * z
        new_price = prices[-1] * (1 + daily_return)
        
        # Keep prices in realistic range
        new_price = max(50, min(100, new_price))
        prices.append(new_price)
    
    return prices

# Set seed for reproducibility
random.seed(42)

# Generate 500 days of data
days = 500
prices = generate_crude_oil_prices(days)

# Generate timestamps (going back 500 days from now)
end_timestamp = int(time.time())
timestamps = [end_timestamp - (days - i) * 24 * 60 * 60 for i in range(days)]

# Create output data
output = {
    "prices": [round(p, 2) for p in prices],
    "timestamps": timestamps,
    "lastUpdated": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    "ticker": "CL=F",
    "description": "WTI Crude Oil Futures - Simulated historical closing prices based on realistic market parameters",
    "note": "This is simulated data for demonstration purposes. For production use, integrate with a real financial data API."
}

# Save to file
with open('assets/data/crude-oil-historical.json', 'w') as f:
    json.dump(output, f, indent=2)

print(f"Successfully generated {len(prices)} price points")
print(f"Data saved to assets/data/crude-oil-historical.json")
print(f"Price range: ${min(prices):.2f} - ${max(prices):.2f}/bbl")
print(f"Latest price: ${prices[-1]:.2f}/bbl")
print(f"Average price: ${sum(prices)/len(prices):.2f}/bbl")
