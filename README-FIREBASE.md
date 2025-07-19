# 🔥 Firebase Setup Guide - 2Star Car Wash

## 🚀 Quick Start Commands

### 1. **Login kwenye Firebase**
```bash
npm run firebase:login
```
Au:
```bash
firebase login
```

### 2. **View Project Local**
```bash
npm run dev
```
Fungua: `http://localhost:5173`

### 3. **Deploy kwenye Firebase**
```bash
npm run deploy:firebase
```
Baada ya deployment: `https://star-car-wash-4c967.web.app`

### 4. **View Firebase Console**
```bash
npm run firebase:console
```

### 5. **View Firebase Hosting**
```bash
npm run firebase:hosting
```

## 📋 All Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build project for production |
| `npm run firebase:login` | Login to Firebase |
| `npm run firebase:deploy` | Build & deploy to Firebase |
| `npm run firebase:serve` | Test Firebase hosting locally |
| `npm run firebase:open` | Open Firebase project |
| `npm run firebase:console` | Open Firebase console |
| `npm run firebase:hosting` | Open Firebase hosting dashboard |
| `npm run deploy:firebase` | Deploy hosting only |
| `npm run deploy:firestore` | Deploy Firestore rules only |
| `npm run view:firebase` | Open your live website |

## 🔧 Setup Process

### **Step 1: Install Firebase CLI (if not installed)**
```bash
npm install -g firebase-tools
```

### **Step 2: Login to Firebase**
```bash
npm run firebase:login
```

### **Step 3: Test Locally**
```bash
npm run dev
```

### **Step 4: Deploy to Firebase**
```bash
npm run deploy:firebase
```

### **Step 5: View Your Live Site**
```bash
npm run view:firebase
```

## 🌐 Your URLs

- **Local Development**: `http://localhost:5173`
- **Firebase Hosting**: `https://star-car-wash-4c967.web.app`
- **Firebase Console**: `https://console.firebase.google.com/project/star-car-wash-4c967`

## 📊 Firebase Services Connected

- ✅ **Hosting** - Website deployment
- ✅ **Firestore** - Database for bookings, payments, customers
- ✅ **Authentication** - Ready for user login (if needed)
- ✅ **Storage** - Ready for file uploads (if needed)

## 🔄 Development Workflow

1. **Make changes locally**
2. **Test with `npm run dev`**
3. **Deploy with `npm run deploy:firebase`**
4. **View live site with `npm run view:firebase`**

## 🛠️ Troubleshooting

### If Firebase login fails:
```bash
firebase logout
firebase login --reauth
```

### If deployment fails:
```bash
npm run build
firebase deploy --debug
```

### To check Firebase project:
```bash
firebase projects:list
firebase use star-car-wash-4c967
```

## 📱 Real-time Features

Your Firebase integration includes:
- Real-time booking updates
- Live payment tracking
- Customer management
- Admin dashboard with live stats

## 🎯 Next Steps

1. Run `npm run firebase:login`
2. Run `npm run dev` to test locally
3. Run `npm run deploy:firebase` to go live
4. Visit `https://star-car-wash-4c967.web.app`

Happy coding! 🚀