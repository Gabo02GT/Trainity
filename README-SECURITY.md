# Trainity - GYM

Una Progressive Web App (PWA) moderna, segura y escalable construida con Vite, React y Firebase.

## 🚀 Características

- **Instalable**: Se instala como aplicación nativa en cualquier dispositivo
- **Offline**: Funciona sin conexión a internet gracias al Service Worker
- **Autenticación Segura**: Firebase Auth con Gmail y Email/Password
- **Rápida**: Optimizada con Vite para máximo rendimiento
- **Responsive**: Se adapta a cualquier tamaño de pantalla
- **Escalable**: Estructura de proyecto lista para crecer
- **Segura**: Credenciales protegidas con variables de entorno

## 📋 Requisitos

- Node.js v22.13.0 o superior
- npm 10.9.2 o superior
- Proyecto Firebase configurado

## 🛠️ Instalación

```bash
npm install
```

## 🔐 Configuración de Variables de Entorno

1. **Copia el archivo de ejemplo:**
```bash
cp .env.example .env.local
```

2. **Agrega tus credenciales de Firebase en `.env.local`:**
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

⚠️ **IMPORTANTE**: 
- El archivo `.env.local` nunca se debe commitear
- Está incluido en `.gitignore` para proteger tus credenciales
- Cada desarrollador debe crear su propio `.env.local`

## 📦 Desarrollo

Para ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🔨 Construcción para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## 📱 Instalación como PWA

1. Abre la aplicación en tu navegador
2. En Chrome/Edge: Click en el ícono de instalar (arriba a la derecha)
3. En Safari (iOS): Comparte → Agregar a pantalla de inicio
4. ¡Listo! La app funcionará como aplicación nativa

## 🏗️ Estructura del Proyecto

```
PWA-Gym/
├── src/
│   ├── pages/
│   │   ├── Login.jsx        # Página de login
│   │   ├── Register.jsx     # Página de registro
│   │   ├── Home.jsx         # Página principal
│   │   └── Auth.css         # Estilos de autenticación
│   ├── components/
│   │   └── ProtectedRoute.jsx # Rutas protegidas
│   ├── context/
│   │   └── AuthContext.jsx  # Contexto de autenticación
│   ├── config/
│   │   └── firebase.js      # Configuración de Firebase
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos de la app
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── public/
│   ├── manifest.json        # Configuración PWA
│   ├── service-worker.js    # Service Worker para offline
│   └── images/              # Iconos y assets
├── .env.example             # Template de variables de entorno
├── .env.local               # Variables de entorno (NO COMMITEAR)
├── index.html               # HTML principal
├── vite.config.js           # Configuración de Vite
└── package.json             # Dependencias del proyecto
```

## 🔧 Tecnologías

- **Vite**: Build tool ultrarrápido
- **React**: Librería UI
- **React Router**: Enrutamiento de la aplicación
- **Firebase**: Autenticación y base de datos
- **Service Workers**: Para funcionalidad offline
- **Web App Manifest**: Configuración de PWA

## 🔐 Seguridad

- ✓ Credenciales de Firebase en variables de entorno
- ✓ Archivos `.env.local` excluidos del control de versiones
- ✓ Rutas protegidas que requieren autenticación
- ✓ Email verification con Firebase
- ✓ Service Worker con caché seguro

## 📄 Licencia

MIT

## 👨‍💻 Autor

Gabriel Garcia

---

**¡Haz que tu idea sea una PWA segura e instalable!**
