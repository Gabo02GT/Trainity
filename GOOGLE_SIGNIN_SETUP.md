# Solución: Google Sign-In Error "The requested action is invalid"

Si ves el error **"The requested action is invalid"** al intentar usar Google Sign-In, debes configurar lo siguiente en Firebase Console:

## ✅ Pasos para Configurar Google Sign-In

### 1. Habilitar Google Sign-In en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto **Trainity**
3. Ve a **Authentication** → **Sign-in method**
4. Busca **Google** y haz click
5. Cambia el estado a **Enabled** (Habilitado)
6. Selecciona tu email de soporte
7. Guarda los cambios

### 2. Configurar OAuth Consent Screen

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Selecciona tu proyecto de Trainity
3. Ve a **APIs & Services** → **OAuth consent screen**
4. Selecciona **External** como User type
5. Completa la información:
   - **App name**: Trainity
   - **User support email**: tu_email@gmail.com
   - **Developer contact**: tu_email@gmail.com
6. Haz clic en **Save and Continue**
7. En "Scopes", haz clic en **Save and Continue**
8. En "Test users", agrega tu email de Gmail
9. Guarda y completa

### 3. Agregar localhost a Dominios Autorizados

Para desarrollo local:

1. Ve a **Firebase Console** → **Project Settings** (⚙️)
2. Ve a la pestaña **Authorized domains**
3. Haz clic en **Add domain**
4. Agrega: `localhost`

### 4. Para Producción (cuando despliegues)

Cuando subas tu PWA a producción, agrega tu dominio:

1. Ve a **Firebase Console** → **Project Settings**
2. En **Authorized domains**, agrega tu dominio (ej: trainity.com)

## 🧪 Prueba Local

Después de hacer estos cambios:

1. Recarga tu aplicación en `http://localhost:5173`
2. Intenta hacer clic en "Continuar con Google"
3. Deberías ver el popup de login de Google

## ❌ Si aún tienes problemas

- **Limpia el cache del navegador**: Press `Ctrl+Shift+Delete`
- **Abre DevTools**: Press `F12` y verifica la consola para más errores
- **Verifica que las variables de entorno estén cargadas**: En la consola escribe `import.meta.env` y verifica que muestre tus credenciales

## 📝 Código Correcto (ya implementado)

El código en `src/context/AuthContext.jsx` ya tiene la configuración correcta:

```javascript
const loginWithGoogle = async () => {
  setError(null);
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    setError(err.message);
    throw err;
  }
};
```

Solo necesitas habilitar Google en Firebase y configurar OAuth Consent Screen.
