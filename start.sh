#!/bin/bash

# VoucherFinder Quick Start Script
# This script starts both backend and frontend servers

echo "🚀 Starting VoucherFinder..."
echo ""

# Check if backend/.env exists
if [ ! -f backend/.env ]; then
    echo "⚠️  Warning: backend/.env not found"
    echo "Creating from backend/.env.example..."
    cp backend/.env.example backend/.env 2>/dev/null || true
    echo "Please edit backend/.env with your API keys"
    echo ""
fi

# Check and setup Python virtual environment
if [ ! -d "backend/venv" ]; then
    echo "📦 Creating Python virtual environment..."
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    echo "📥 Installing backend dependencies..."
    pip install -r requirements.txt
    cd ..
else
    echo "✅ Virtual environment found"
fi

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
else
    echo "✅ Frontend dependencies found"
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup INT TERM

# Start backend
echo "📦 Starting backend server..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 3

# Start frontend
echo "🎨 Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servers started!"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user interrupt
wait

