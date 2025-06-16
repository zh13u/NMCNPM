# 🥗 FoodTrace - Food Traceability System

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Web3-4.16.0-orange?style=for-the-badge&logo=ethereum" alt="Web3"/>
</div>

## 📝 Description

FoodTrace is a modern food traceability system that combines blockchain technology to ensure transparency and safety in the food supply chain. The project uses advanced technologies such as Next.js, React, TypeScript, and Web3 to build a comprehensive platform.

## ✨ Key Features

- 🔍 Real-time food traceability
- 📱 User-friendly and responsive interface
- 🔐 Data security with blockchain technology
- 📊 Detailed product information management
- 📱 QR code scanning for information retrieval
- 🔄 Web3 integration for secure transactions

## 🏗️ Project Structure

```
foodtrace/
├── frontend/           # Next.js application
│   ├── src/           # Frontend source code
│   ├── public/        # Static assets
│   └── tsconfig.json  # TypeScript configuration
├── backend/           # Node.js server
│   ├── src/          # Backend source code
│   ├── routes/       # API route definitions
│   ├── controllers/  # Business logic handlers
│   └── models/       # Data models
└── blockchain/       # Smart contracts and blockchain interaction
```

## 🛠️ Technologies Used

### Frontend
- **Framework & Core:**
  - Next.js 14.1.0 - Modern React framework with SSR
  - React 18.2.0 - UI library
  - TypeScript 5.3.3 - Type-safe programming language
  - Material-UI 5.15.10 - UI component library
  - Emotion 11.11.3 - CSS-in-JS solution

- **State Management & Data Fetching:**
  - React Router DOM 6.22.1 - Client-side routing
  - Axios 1.6.7 - HTTP client

- **Blockchain Integration:**
  - Web3.js 4.16.0 - Ethereum JavaScript API
  - QR Code Scanner (html5-qrcode 2.3.8)
  - QR Code Generator (qrcode.react 3.1.0)

### Backend
- **Core:**
  - Node.js - Runtime environment
  - Express.js 5.1.0 - Web framework
  - TypeScript 5.8.3 - Type-safe JavaScript
  - MongoDB (Mongoose 8.13.2) - Database

- **Blockchain Integration:**
  - Web3.js 1.10.4 - Ethereum JavaScript API
  - Truffle 5.11.5 - Smart contract development
  - Hardhat 2.23.0 - Development environment
  - Solidity 0.8.29 - Smart contract language

- **Security & Authentication:**
  - JWT (jsonwebtoken 9.0.2) - Authentication
  - bcryptjs 3.0.2 - Password hashing
  - Helmet 8.1.0 - Security middleware
  - dotenv 16.5.0 - Environment variables

- **Development Tools:**
  - ESLint 8.56.0 - Code linting
  - ts-node-dev - Development server
  - Winston 3.17.0 - Logging
  - Morgan 1.10.0 - HTTP request logger

### Blockchain
- **Smart Contracts:**
  - Solidity 0.8.29 - Smart contract language
  - Truffle 5.11.5 - Development framework
  - Hardhat 2.23.0 - Development environment
  - Web3.js 1.10.4 - Ethereum JavaScript API

- **Development & Testing:**
  - Truffle HDWallet Provider - Wallet integration
  - Hardhat Toolbox - Development tools
  - Ethers.js 6.13.5 - Ethereum library

- **Security:**
  - Solidity compiler 0.8.29
  - Truffle security features
  - Hardhat security plugins

## 🚀 Installation and Running

### System Requirements
- Node.js >= 14.x
- npm or yarn
- Truffle Suite
- Ganache (for blockchain development environment)

### Installation

1. Clone repository:
```bash
git clone https://github.com/your-username/foodtrace.git
cd foodtrace
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Environment configuration:
- Create `.env` file in the backend directory
- Configure necessary environment variables

4. Run the application:
```bash
# Run frontend
cd frontend
npm run dev

# Run backend
cd ../backend
npm run dev
```

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our contribution process.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - [kuvee](https://github.com/kuveee)

## 🙏 Acknowledgments

Thank you for your interest in the FoodTrace project! If you have any questions or suggestions, please create an issue or contact us.
