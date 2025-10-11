#!/bin/bash
echo '=============================='
echo 'Checking Waterlooville Directory Setup'
echo '=============================='
echo ''

echo '1. Checking for .env.local file...'
if [ -f .env.local ]; then
    echo '   ✓ .env.local exists'
    
    echo ''
    echo '2. Checking for Google API key...'
    if grep -q 'GOOGLE_PLACES_API_KEY' .env.local; then
        echo '   ✓ GOOGLE_PLACES_API_KEY is set'
        
        # Check if it's empty
        if grep -q 'GOOGLE_PLACES_API_KEY=""' .env.local || grep -q "GOOGLE_PLACES_API_KEY=''" .env.local || grep -q 'GOOGLE_PLACES_API_KEY=$' .env.local; then
            echo '   ⚠️  WARNING: API key appears to be empty!'
            echo ''
            echo 'To fix this:'
            echo '1. Go to https://console.cloud.google.com'
            echo '2. Create a new project or select existing'
            echo '3. Enable Places API'
            echo '4. Create credentials (API Key)'
            echo '5. Add to .env.local: GOOGLE_PLACES_API_KEY="your-key-here"'
        else
            echo '   ✓ API key has a value'
        fi
    else
        echo '   ✗ No GOOGLE_PLACES_API_KEY found'
        echo ''
        echo 'To add it, run:'
        echo 'echo "GOOGLE_PLACES_API_KEY=your-key-here" >> .env.local'
    fi
else
    echo '   ✗ .env.local not found'
    echo ''
    echo 'Creating .env.local file...'
    echo 'GOOGLE_PLACES_API_KEY=' > .env.local
    echo '   ✓ Created .env.local'
    echo ''
    echo 'Now add your Google API key to the file!'
fi

echo ''
echo '3. Checking for required packages...'
if [ -f package.json ]; then
    if grep -q '@googlemaps/google-maps-services-js' package.json; then
        echo '   ✓ Google Maps package installed'
    else
        echo '   ✗ Google Maps package not found'
        echo '   Run: npm install @googlemaps/google-maps-services-js'
    fi
fi

echo ''
echo '=============================='
echo 'Setup check complete!'
echo '=============================='
