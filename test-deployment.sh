#!/bin/bash
# Test deployment script

echo "🧪 Testing deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Creating .env file..."
    cat > .env << 'EOF'
DATABASE_URL=postgresql://Admin:Vitacross260105@pgm-bp128809g268sh3k2o.pg.rds.aliyuncs.com:5432/inbound_medical
JWT_SECRET=vitacross-prod-jwt-secret-key-2024-change-in-production-random-key-abc123xyz
NODE_ENV=production
PORT=3000
EOF
fi

# Check docker-compose.yml
if [ ! -f docker-compose.yml ]; then
    echo "❌ docker-compose.yml not found!"
    exit 1
fi

# Check if Dockerfile exists
if [ ! -f Dockerfile ]; then
    echo "❌ Dockerfile not found!"
    exit 1
fi

# Check if package.json exists
if [ ! -f package.json ]; then
    echo "❌ package.json not found!"
    echo "Please run 'pnpm install' in local and ensure all files are ready."
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "❌ node_modules directory not found!"
    echo "Please run 'pnpm install' in local first."
    exit 1
fi

# Check if dist exists
if [ ! -d dist ]; then
    echo "❌ dist directory not found!"
    echo "Please run 'pnpm run build' in local first."
    exit 1
fi

echo "✅ All required files are present!"

# Stop and restart
docker-compose down
docker-compose up -d

# Wait for startup
echo "Waiting for application to start..."
sleep 15

# Check container status
echo "Container status:"
docker-compose ps

# Show logs
echo ""
echo "Application logs (last 50 lines):"
docker-compose logs --tail=50 app
