# 🔒 Configuración de Variables de Entorno

## Configuración de Firebase

Este proyecto usa variables de entorno para proteger las credenciales de Firebase.

### Pasos para configurar:

1. **Copia el archivo de ejemplo:**
   ```bash
   copy .env.example .env
   ```

2. **Edita el archivo `.env`** y reemplaza los valores con tus credenciales de Firebase:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Selecciona tu proyecto
   - Ve a Configuración del proyecto > General
   - En "Tus apps" copia las credenciales

3. **Variables requeridas:**
   ```
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

4. **Reinicia el servidor de desarrollo** después de crear/modificar el archivo `.env`

## ⚠️ Importante

- **NUNCA** subas el archivo `.env` a GitHub
- El archivo `.env` está en `.gitignore` por seguridad
- Comparte las credenciales de forma segura (nunca por email o chat público)
- Solo `.env.example` debe subirse al repositorio

## Notas sobre Seguridad

Aunque las claves de Firebase para el frontend son públicas por diseño, usar variables de entorno:
- Facilita cambiar entre entornos (desarrollo, producción)
- Evita exponer credenciales en el código fuente
- Es una buena práctica de seguridad
