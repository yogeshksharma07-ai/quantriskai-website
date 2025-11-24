import json
import urllib.request
import time
import ssl

# --- SETTINGS ---
days = 500
max_retries = 5
retry_delay = 2  # seconds
# ----------------

end_date = int(time.time())
start_date = end_date - (days * 24 * 60 * 60)

url = f"https://query1.finance.yahoo.com/v8/finance/chart/CL=F?period1={start_date}&period2={end_date}&interval=1d"

print("Fetching data from Yahoo Finance...")
print("URL:", url)

# Create a browser-style request
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}
req = urllib.request.Request(url, headers=headers)

# Fix SSL cert issues on Windows/Python
ssl_context = ssl.create_default_context()

# Retry logic
for attempt in range(max_retries):
    try:
        with urllib.request.urlopen(req, context=ssl_context) as response:
            data = json.loads(response.read().decode())
        break  # success → exit retry loop

    except Exception as e:
        if "429" in str(e):
            wait = retry_delay * (2 ** attempt)
            print(f"⚠ Rate limited. Retrying in {wait} seconds...")
            time.sleep(wait)
        else:
            print("✗ Fatal error:", e)
            exit()

# Extract data
result = data["chart"]["result"][0]
timestamps = result["timestamp"]
close_prices = result["indicators"]["quote"][0]["close"]

# Remove null values
prices = [p for p in close_prices if p is not None]

# Build output JSON
output = {
    "prices": prices,
    "timestamps": timestamps[:len(prices)],
    "lastUpdated": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    "ticker": "CL=F",
    "description": "WTI Crude Oil Futures - Historical closing prices"
}

# Save file
with open("assets/data/crude-oil-historical.json", "w") as f:
    json.dump(output, f, indent=2)

print(f"✓ Successfully fetched {len(prices)} price points")
print(f"✓ Data saved to assets/data/crude-oil-historical.json")
print(f"✓ Latest price: ${prices[-1]:.2f}/bbl")
