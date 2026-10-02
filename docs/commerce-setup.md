# Activación del sistema de usuarios y compras

1. Crear un proyecto en Supabase y ejecutar `supabase/migrations/202610020001_commerce.sql`.
2. Configurar `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en Vercel. La clave `service_role` nunca debe exponerse con prefijo `VITE_`.
3. Configurar las URLs permitidas de autenticación y recuperación de contraseña en Supabase.
4. El producto `streaming-capa-2026` queda activo con un precio de ARS 44.999.
5. Asignar `role = 'admin'` únicamente desde SQL/dashboard seguro a los administradores correspondientes.
6. El checkout abre el link de Mercado Pago `https://mpago.la/2tSPMv4` después de crear la orden interna pendiente. La conciliación se realiza manualmente: verificar el pago, marcar la orden como pagada desde un entorno administrativo seguro y habilitar el acceso. Nunca actualizar el estado de pago desde el navegador del comprador.
7. La transmisión se realizará por Zoom. El enlace de acceso debe enviarse solamente después de la confirmación manual del pago y no debe publicarse en el frontend público.

El frontend permite explorar y agregar productos sin sesión. Al iniciar sesión, fusiona el carrito invitado con el carrito persistente del usuario.
