#!/bin/bash

# Script de test API Laravel via ngrok
echo "🧪 Test de connexion à l'API Laravel via ngrok"
echo "================================================"

NGROK_URL="https://2dc1217ab612.ngrok-free.app"

echo "🔗 URL de base: $NGROK_URL"
echo ""

# Test 1: Summary endpoint
echo "📊 Test 1: Endpoint Summary"
echo "GET $NGROK_URL/api/handigo/summary"
curl -X GET "$NGROK_URL/api/handigo/summary" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "ngrok-skip-browser-warning: true" \
  -v

echo -e "\n\n"

# Test 2: Search endpoint
echo "🔍 Test 2: Endpoint Search"
echo "GET $NGROK_URL/api/ou-pratiquer/search"
curl -X GET "$NGROK_URL/api/ou-pratiquer/search" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "ngrok-skip-browser-warning: true" \
  -v

echo -e "\n\n"

# Test 3: Search avec paramètre
echo "🔍 Test 3: Endpoint Search avec paramètre"
echo "GET $NGROK_URL/api/ou-pratiquer/search?q=hockey"
curl -X GET "$NGROK_URL/api/ou-pratiquer/search?q=hockey" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "ngrok-skip-browser-warning: true" \
  -v

echo -e "\n\n"
echo "✅ Tests terminés"
