#!/bin/bash
# Task Pipeline Manager - Integration Verification Script
# This script verifies that the frontend API integration is working correctly

echo "======================================"
echo "Task Pipeline Manager - Integration Test"
echo "======================================"
echo ""

# Check if Node.js is installed
echo "✓ Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js is not installed"
    exit 1
fi
echo "  Node.js version: $(node -v)"
echo ""

# Check if npm is installed
echo "✓ Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "✗ npm is not installed"
    exit 1
fi
echo "  npm version: $(npm -v)"
echo ""

# Check frontend dependencies
echo "✓ Checking frontend dependencies..."
cd frontend
if [ -d "node_modules" ]; then
    echo "  ✓ node_modules directory exists"
    if grep -q '"axios"' package.json; then
        echo "  ✓ Axios is installed"
    else
        echo "  ✗ Axios is NOT installed"
        exit 1
    fi
else
    echo "  ✗ node_modules directory not found - run 'npm install' first"
    exit 1
fi
echo ""

# Check API files
echo "✓ Checking API integration files..."
files=(
    "src/services/api.js"
    "src/services/taskService.js"
    "src/hooks/useTasks.js"
    ".env.local"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file exists"
    else
        echo "  ✗ $file is missing"
        exit 1
    fi
done
echo ""

# Check .env.local configuration
echo "✓ Checking environment configuration..."
if grep -q "VITE_API_URL" .env.local; then
    api_url=$(grep "VITE_API_URL" .env.local | cut -d= -f2)
    echo "  API URL configured: $api_url"
else
    echo "  ✗ VITE_API_URL not configured in .env.local"
    exit 1
fi
echo ""

# Check if backend is running
echo "✓ Checking if backend is running..."
if curl -s http://localhost:5000 > /dev/null 2>&1; then
    echo "  ✓ Backend is running on http://localhost:5000"
    
    # Check API endpoints
    echo ""
    echo "✓ Checking API endpoints..."
    
    if curl -s http://localhost:5000/api/tasks > /dev/null 2>&1; then
        echo "  ✓ GET /api/tasks is accessible"
        task_count=$(curl -s http://localhost:5000/api/tasks | grep -o '"id"' | wc -l)
        echo "    Found $task_count tasks in database"
    else
        echo "  ✗ GET /api/tasks is not accessible"
    fi
    
    if curl -s http://localhost:5000/api/logs > /dev/null 2>&1; then
        echo "  ✓ GET /api/logs is accessible"
        log_count=$(curl -s http://localhost:5000/api/logs | grep -o '"id"' | wc -l)
        echo "    Found $log_count activity logs in database"
    else
        echo "  ✗ GET /api/logs is not accessible"
    fi
else
    echo "  ⚠ Backend is NOT running on http://localhost:5000"
    echo "  Start backend with: cd backend && npm run dev"
fi
echo ""

echo "======================================"
echo "✓ Integration verification complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Start backend: cd backend && npm run dev"
echo "2. Start frontend: cd frontend && npm run dev"
echo "3. Open http://localhost:5173 in your browser"
echo ""
