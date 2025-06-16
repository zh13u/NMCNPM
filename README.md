# 🥗 FoodTrace - Food Traceability System

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&duration=3000&pause=1000&color=00D8FF&center=true&vCenter=true&width=600&lines=Welcome+to+FoodTrace!;Blockchain+Food+Traceability;Transparency+%26+Safety+First;Built+with+Modern+Tech" alt="Typing SVG" />
</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">
</div>

---

<div align="center">

### 🚀 **Tech Stack Showcase**

</div>

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,typescript,solidity,nodejs,express,mongodb,ethereum" />
</p>

<div align="center">
  <img src="https://img.shields.io/badge/⚡_Next.js_14.1.0-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/⚛️_React_18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/📘_TypeScript_5.3.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/⛓️_Web3_4.16.0-F16822?style=for-the-badge&logo=web3.js&logoColor=white" alt="Web3"/>
  <img src="https://img.shields.io/badge/🚀_Express_5.1.0-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/🍃_MongoDB_8.13.2-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/📜_Solidity_0.8.29-363636?style=for-the-badge&logo=solidity&logoColor=white" alt="Solidity"/>
  <img src="https://img.shields.io/badge/🦊_Truffle_5.11.5-3FE0C5?style=for-the-badge&logo=truffle&logoColor=black" alt="Truffle"/>
  <img src="https://img.shields.io/badge/⛏️_Hardhat_2.23.0-F7B93E?style=for-the-badge&logo=hardhat&logoColor=black" alt="Hardhat"/>
  <img src="https://img.shields.io/badge/🎨_Material_UI_5.15.10-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material-UI"/>
  <img src="https://img.shields.io/badge/🔐_JWT_9.0.2-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</div>

---

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="100">
</div>

## 🌟 **About FoodTrace**

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=F7931E&center=true&vCenter=true&width=800&lines=Revolutionary+Food+Supply+Chain+Solution;Powered+by+Blockchain+Technology;Ensuring+Transparency+%26+Food+Safety;From+Farm+to+Fork+Tracking" alt="Typing SVG" />
</div>

**FoodTrace** is a cutting-edge food traceability system that revolutionizes supply chain transparency through blockchain technology. Our platform ensures food safety, authenticity, and complete traceability from farm to fork.

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif" width="600">
</div>

---

## ✨ **Key Features**

<table align="center">
<tr>
<td width="50%">

### 🔍 **Real-time Traceability**
- Track products through entire supply chain
- Instant access to product history
- Live location and status updates

### 🔐 **Blockchain Security**
- Immutable transaction records
- Smart contract automation
- Decentralized data storage

### 📱 **QR Code Integration**
- Quick product information access
- Mobile-friendly scanning
- Instant verification system

</td>
<td width="50%">

### 📊 **Advanced Analytics**
- Comprehensive dashboard
- Real-time reporting
- Supply chain insights

### 🌐 **Web3 Integration**
- Secure cryptocurrency transactions
- Wallet connectivity
- DeFi protocol support

### 📱 **Responsive Design**
- Cross-platform compatibility
- Modern UI/UX design
- Progressive Web App features

</td>
</tr>
</table>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif" width="400">
</div>

---

## 🏗️ **Project Architecture**

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=9146FF&center=true&vCenter=true&width=600&lines=Microservices+Architecture;Scalable+%26+Maintainable;Cloud-Native+Design" alt="Typing SVG" />
</div>

```mermaid
graph TB
    A[🌐 Frontend - Next.js] --> B[🚀 API Gateway]
    B --> C[🔐 Auth Service]
    B --> D[📊 Traceability Service]
    B --> E[⛓️ Blockchain Service]
    
    C --> F[(🍃 MongoDB)]
    D --> F
    E --> G[📜 Smart Contracts]
    G --> H[⛓️ Ethereum Network]
    
    I[📱 Mobile App] --> B
    J[🔍 QR Scanner] --> B
```

<details>
<summary>📁 <strong>Detailed Project Structure</strong></summary>

```
foodtrace/
├── 🎨 frontend/                    # Next.js React Application
│   ├── 📂 src/
│   │   ├── 🧩 components/         # Reusable UI components
│   │   ├── 📄 pages/              # Application pages
│   │   ├── 🎨 styles/             # CSS and styling
│   │   ├── 🛠️ utils/              # Utility functions
│   │   └── 🔗 hooks/              # Custom React hooks
│   ├── 📁 public/                 # Static assets
│   └── ⚙️ config files
│
├── 🚀 backend/                     # Node.js Express Server
│   ├── 📂 src/
│   │   ├── 🛣️ routes/             # API route definitions
│   │   ├── 🎮 controllers/        # Business logic handlers
│   │   ├── 📊 models/             # Database models
│   │   ├── 🔐 middleware/         # Authentication & validation
│   │   └── 🛠️ services/           # Business services
│   └── ⚙️ config files
│
└── ⛓️ blockchain/                  # Smart Contracts & Web3
    ├── 📜 contracts/              # Solidity smart contracts
    ├── 🧪 test/                   # Contract tests
    ├── 📋 scripts/                # Deployment scripts
    └── ⚙️ config files
```

</details>

---

## 🛠️ **Technology Deep Dive**

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284136-03988914-d899-44b4-b1d9-4eeccf656e44.gif" width="100">
</div>

### 🎨 **Frontend Powerhouse**

<table align="center">
<tr>
<td align="center" width="20%">
  <img src="https://skillicons.dev/icons?i=nextjs" width="40"/>
  <br><strong>Next.js 14</strong>
  <br>SSR & Performance
</td>
<td align="center" width="20%">
  <img src="https://skillicons.dev/icons?i=react" width="40"/>
  <br><strong>React 18</strong>
  <br>Modern Hooks
</td>
<td align="center" width="20%">
  <img src="https://skillicons.dev/icons?i=typescript" width="40"/>
  <br><strong>TypeScript</strong>
  <br>Type Safety
</td>
<td align="center" width="20%">
  <img src="https://skillicons.dev/icons?i=materialui" width="40"/>
  <br><strong>Material-UI</strong>
  <br>Premium Design
</td>
<td align="center" width="20%">
  <img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="40"/>
  <br><strong>Web3</strong>
  <br>Blockchain Integration
</td>
</tr>
</table>

### 🚀 **Backend Excellence**

<table align="center">
<tr>
<td align="center" width="25%">
  <img src="https://skillicons.dev/icons?i=nodejs" width="40"/>
  <br><strong>Node.js</strong>
  <br>Runtime Environment
</td>
<td align="center" width="25%">
  <img src="https://skillicons.dev/icons?i=express" width="40"/>
  <br><strong>Express.js</strong>
  <br>Web Framework
</td>
<td align="center" width="25%">
  <img src="https://skillicons.dev/icons?i=mongodb" width="40"/>
  <br><strong>MongoDB</strong>
  <br>NoSQL Database
</td>
<td align="center" width="25%">
  <img src="https://user-images.githubusercontent.com/74038190/212257460-738ff738-247f-4445-a718-cdd0ca76e2db.gif" width="40"/>
  <br><strong>JWT</strong>
  <br>Authentication
</td>
</tr>
</table>

### ⛓️ **Blockchain Infrastructure**

<table align="center">
<tr>
<td align="center" width="25%">
  <img src="https://skillicons.dev/icons?i=solidity" width="40"/>
  <br><strong>Solidity</strong>
  <br>Smart Contracts
</td>
<td align="center" width="25%">
  <img src="https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385b7c2812.gif" width="40"/>
  <br><strong>Truffle</strong>
  <br>Development Suite
</td>
<td align="center" width="25%">
  <img src="https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif" width="40"/>
  <br><strong>Hardhat</strong>
  <br>Testing Framework
</td>
<td align="center" width="25%">
  <img src="https://skillicons.dev/icons?i=ethereum" width="40"/>
  <br><strong>Ethereum</strong>
  <br>Blockchain Network
</td>
</tr>
</table>

---

## 🚀 **Quick Start Guide**

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=FF6B6B&center=true&vCenter=true&width=500&lines=Get+Started+in+Minutes!;Follow+Simple+Steps;Start+Building+Today!" alt="Typing SVG" />
</div>

### 📋 **Prerequisites**

<div align="center">

| Requirement | Version | Status |
|-------------|---------|--------|
| Node.js | >= 14.x | ✅ Required |
| npm/yarn | Latest | ✅ Required |
| Git | Latest | ✅ Required |
| Ganache | Latest | 🔧 Development |

</div>

### 📥 **Installation**

<details>
<summary>🔽 <strong>Step-by-step Installation</strong></summary>

#### 1️⃣ **Clone Repository**
```bash
git clone https://github.com/your-username/foodtrace.git
cd foodtrace
```

#### 2️⃣ **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

#### 3️⃣ **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

#### 4️⃣ **Install Blockchain Dependencies**
```bash
cd ../blockchain
npm install
```

</details>

### 🏃‍♂️ **Running the Application**

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="200">
</div>

```bash
# Create MongoDB environment by using Docker
docker pull mongo:latest
docker run -d -p 27017:27017 --name foodtrace mongo:latest
```

```bash
# ⛓️ Deploy Smart Contracts (Terminal 1)
# open ganache and get private_key
 => cd blockchain
 => python deploy.py (add private_key)
 => python app.py

# 🔥 Start Backend (Terminal 2)
cd backend
npm start

# 🚀 Start Frontend (Terminal 3)
cd frontend
npm start
```

#### Using

- Visit the homepage: [http://localhost:3000](http://localhost:3000)  
  👉 This page allows users to **scan QR codes** via camera or **upload QR images**.

- Access the admin dashboard at: [http://localhost:3000/admin](http://localhost:3000/admin)  
  👉 Reserved for **admin accounts** with the following credentials:
  * **Email:** `admin@gmail.com`  
  * **Password:** `admin123`
  * Features available:
    - Manage supplier accounts  
    - Create new supplier accounts  

- Experience the **supplier dashboard**:
  👉 Please login a supplier account at [http://localhost:3000/login](http://localhost:3000/login)  
  👉 Once logged in, you will be redirected to the **Dashboard**, where you can:
  * Add new products  
  * Update product status and quality

---

## 🤝 **Contributing**

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=4ECDC4&center=true&vCenter=true&width=700&lines=Built+by+5+Amazing+Developers!;Teamwork+Makes+the+Dream+Work;Join+Our+Growing+Community;Make+Food+Safer+Together!" alt="Typing SVG" />
</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284094-e50ceae2-de86-4dd6-a8c0-b9c6ba57ed34.gif" width="200">
</div>

This project was collaboratively built by our team of 5 developers, each bringing unique skills and expertise. We welcome contributions from the community to help improve FoodTrace!

### 🎯 **How to Contribute**

1. **🍴 Fork** the repository
2. **🌿 Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **📝 Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **🚀 Push** to the branch (`git push origin feature/AmazingFeature`)
5. **🔄 Open** a Pull Request

### 📋 **Contribution Guidelines**

- 🐛 **Bug Reports:** Use our bug report template
- 💡 **Feature Requests:** Use our feature request template
- 📖 **Documentation:** Help improve our docs
- 🧪 **Testing:** Add tests for new features
- 🎨 **UI/UX:** Improve user experience

---

## 👥 **Meet Our Team**

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=E91E63&center=true&vCenter=true&width=600&lines=Meet+Our+Amazing+Team!;5+Passionate+Developers;Building+the+Future+Together!;Collaborative+Excellence!" alt="Typing SVG" />
</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284145-bf2c01a8-c448-4f1a-b911-99c676e5e62d.gif" width="200">
</div>

<table align="center" width="900px">
<tr>
<td align="center" width="20%">
  <img src="https://avatars.githubusercontent.com/u/127707514?v=4" width="80"/>
  <br>
  <strong>kuveee</strong>
  <br>
  <sub>🎨 Frontend Specialist</sub>
  <br>
  <sub>React • TypeScript • UI/UX</sub>
  <br>
  <sub>Testing • Deployment</sub>
  <br>
  <a href="https://github.com/kuveee">GitHub</a>
</td>
<td align="center" width="20%">
  <img src="https://avatars.githubusercontent.com/u/129470696?v=4" width="80"/>
  <br>
  <strong>NTK1100</strong>
  <br>
  <sub>⛓️ Blockchain Developer</sub>
  <br>
  <sub>Solidity • Smart Contracts</sub>
  <br>
  <sub>Testing • Deployment</sub>
  <br>
  <a href="https://github.com/NTK1100">GitHub</a>
</td>
<td align="center" width="20%">
  <img src="https://avatars.githubusercontent.com/u/167009163?v=4" width="80"/>
  <br>
  <strong>zh13u</strong>
  <br>
  <sub>🔧 Backend Engineer</sub>
  <br>
  <sub>Node.js • MongoDB • APIs</sub>
  <br>
  <sub>Testing • Deployment</sub>
  <br>
  <a href="https://github.com/zh13u">GitHub</a>
</td>
<td align="center" width="20%">
  <img src="https://avatars.githubusercontent.com/u/199244596?v=4" width="80"/>
  <br>
  <strong>stepToBecomeGigachad</strong>
  <br>
  <sub>⛓️ Blockchain Developer</sub>
  <br>
  <sub>Solidity • Smart Contracts</sub>
  <br>
  <sub>Testing • Deployment</sub>
  <br>
  <a href="https://github.com/stepToBecomeGigachad">GitHub</a>
</td>
<td align="center" width="20%">
  <img src="https://avatars.githubusercontent.com/u/167999420?v=4" width="80"/>
  <br>
  <strong>Crabs536</strong>
  <br>
  <sub>🔧 Backend Engineer</sub>
  <br>
  <sub>Node.js • MongoDB • APIs</sub>
  <br>
  <sub>Testing • Deployment</sub>
  <br>
  <a href="https://github.com/Crabs536">GitHub</a>
</td>
</tr>
</table>

### 🎯 **Team Roles & Responsibilities**

<div align="center">

| 👨‍💻 **Role** | 🛠️ **Responsibilities** | 🚀 **Technologies** |
|-------------|------------------------|-------------------|
| **Project Lead** | Architecture, Coordination, Full-Stack Development | Next.js, React, Node.js, Project Management |
| **Blockchain Dev** | Smart Contracts, Web3 Integration, DApp Logic | Solidity, Truffle, Hardhat, Ethereum |
| **Frontend Specialist** | UI/UX Design, Component Development, Responsive Design | React, TypeScript, Material-UI, CSS |
| **Backend Engineer** | API Development, Database Design, Server Logic | Node.js, Express, MongoDB, RESTful APIs |
| **Security & DevOps** | Authentication, Testing, CI/CD, Deployment | JWT, Testing Frameworks, Docker, AWS |

</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284145-bf2c01a8-c448-4f1a-b911-99c676e5e62d.gif" width="300">
</div>

---

## 🙏 **Acknowledgments**

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="100">
</div>

Special thanks to all the amazing technologies, communities, and our team collaboration that made this project possible:

### 🎓 **Educational Support**

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=4CAF50&center=true&vCenter=true&width=700&lines=Proudly+Developed+at+PTIT+Ho+Chi+Minh;Under+Expert+Academic+Guidance;Software+Engineering+Excellence!" alt="Educational Typing SVG" />
</div>

<table align="center" width="100%">
<tr>
<td align="center" width="33%">
  <img src="https://ptit.edu.vn/wp-content/uploads/2024/08/logo-PTIT-826x1024.jpg" width="80" height="80"/>
  <br>
  <strong>🏫 ACADEMIC INSTITUTION</strong>
  <br>
  <sub><strong>Posts and Telecommunications Institute of Technology</strong></sub>
  <br>
  <sub><strong>Ho Chi Minh City Campus</strong></sub>
  <br>
  <sub>🎯 Exceptional academic resources</sub>
  <br>
  <sub>🚀 Innovation in technology education</sub>
</td>
<td align="center" width="33%">
  <img src="https://static.vecteezy.com/system/resources/previews/004/610/354/non_2x/simple-minimalist-pen-graduation-hat-for-education-school-university-logo-design-vector.jpg" width="80" height="80"/>
  <br>
  <strong>👨‍🏫 FACULTY MENTOR</strong>
  <br>
  <sub><strong>Mr. Chau Van Van, MSc</strong></sub>
  <br>
  <sub><em>Project Supervisor & Technical Advisor</em></sub>
  <br><br>
  <sub>🎓 Exceptional mentorship</sub>
  <br>
  <sub>💡 Technical guidance & expertise</sub>
  <br>
  <sub>🛠️ Modern software development practices</sub>
</td>
<td align="center" width="33%">
  <img src="https://logo.com/image-cdn/images/kts928pd/production/e6c16c6fdc213eae670cae97c487582ad720f85e-351x351.png?w=1080&q=72&fm=webp" width="80" height="80"/>
  <br>
  <strong>📚 COURSE FOUNDATION</strong>
  <br>
  <sub><strong>INTRODUCTION TO SOFTWARE ENGINEERING (SWE)</strong></sub>
  <br>
  <sub><em>Comprehensive Academic Program</em></sub>
  <br><br>
  <sub>📖 Comprehensive curriculum</sub>
  <br>
  <sub>🔬 Hands-on learning experiences</sub>
  <br>
  <sub>⚙️ Software engineering principles</sub>
</td>
</tr>
</table>

<div align="center">
  <img src="https://img.shields.io/badge/🎓_PTIT_Ho_Chi_Minh-Educational_Excellence-4CAF50?style=for-the-badge&logoColor=white" alt="PTIT Badge"/>
  <img src="https://img.shields.io/badge/Mr._Chau_Van_Van_MSc-Faculty_Mentor-2196F3?style=for-the-badge&logoColor=white" alt="Mentor Badge"/>
  <img src="https://img.shields.io/badge/📚_Software_Engineering-Academic_Foundation-FF9800?style=for-the-badge&logoColor=white" alt="Course Badge"/>
</div>

### 🌟 **Technology Communities**
- ⚡ **Vercel Team** for Next.js framework
- ⚛️ **React Team** for the amazing library
- ⛓️ **Ethereum Foundation** for blockchain technology
- 🎨 **Material-UI Team** for beautiful components
- 🚀 **Open Source Community** for countless resources

### 👥 **Team Collaboration**
- 💪 **Each team member** for their dedicated contributions
- 🤝 **Collaborative spirit** that made this project successful
- 🧠 **Knowledge sharing** between team members
- ⏰ **Time management** and meeting deadlines together

### 🔧 **Development Tools**
- 🐙 **GitHub** for version control and collaboration
- 💬 **Discord/Slack** for team communication
- 📋 **Trello/Notion** for project management
- ☕ **Coffee & Late nights** that powered our coding sessions


<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">
</div>


<div align="center">
  <sub>Built with ❤️ by the FoodTrace team</sub>
</div>
