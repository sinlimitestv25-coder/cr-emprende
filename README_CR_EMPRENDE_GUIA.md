# C&R Emprende - Guía de trabajo y control de versiones

## Nombre del proyecto

**C&R Emprende**  
Plataforma de gestión para emprendedores, desarrollada por **C&R Soluciones Digitales**.

---

## Objetivo general

Crear una plataforma SaaS para que emprendedores puedan gestionar su negocio desde un solo lugar.

La plataforma está pensada para rubros como:

- Artesanías
- Jabones artesanales
- Repostería
- Venta de comida
- Impresiones
- Ropa
- Fragancias
- Sahumerios
- Ferias locales
- Emprendimientos familiares

---

## Concepto principal

La aplicación funciona con dos grandes vistas:

### 1. Panel administrador

Usado por C&R Soluciones Digitales.

Desde este panel se podrá:

- Crear usuarios
- Crear emprendimientos
- Asignar rubros
- Administrar planes
- Administrar suscripciones
- Ver mensajes internos
- Configurar módulos
- Gestionar soporte remoto
- Controlar altas, bajas y vencimientos

### 2. Panel emprendedor

Usado por cada cliente/emprendedor.

Cada usuario verá solamente la información de su propio emprendimiento mediante su ID interna.

---

## Regla principal de datos

Cada emprendimiento tendrá una ID única.

Ejemplo:

```txt
EMP-001 -> Jabones Artesanales
EMP-002 -> Repostería Ana
EMP-003 -> Impresiones Leo
```

Todas las tablas internas deberán vincularse con esa ID.

Ejemplo:

```txt
productos.emprendimiento_id
clientes.emprendimiento_id
insumos.emprendimiento_id
proveedores.emprendimiento_id
presupuestos.emprendimiento_id
finanzas.emprendimiento_id
mensajes.emprendimiento_id
```

Esto evita que se mezclen datos entre usuarios.

---

## Módulos pensados para el emprendedor

- Dashboard
- Productos
- Stock / Inventario
- Insumos
- Proveedores
- Producción / Recetas
- Clientes
- Presupuestos
- Pedidos
- Finanzas
- Reportes
- WhatsApp
- Configuración
- Mensajes C&R
- Soporte remoto

---

## Configuración del emprendimiento

Cada emprendedor podrá personalizar su panel:

- Logo
- Nombre del emprendimiento
- Rubro
- WhatsApp
- Instagram
- Datos comerciales
- Colores del panel
- Fondo o identidad visual
- Datos para presupuestos
- Datos para mensajes

En planes superiores se podrá habilitar soporte remoto temporal.

---

## Mensajes C&R

No es chat en vivo.

Es un sistema de mensajes internos entre:

- Emprendedor
- Administrador C&R

Sirve para:

- Consultas
- Problemas técnicos
- Solicitudes de mejora
- Ayuda con configuración
- Capacitación
- Seguimiento de soporte

---

## Soporte remoto

El emprendedor podrá habilitar acceso temporal al administrador.

Opciones pensadas:

- 15 minutos
- 30 minutos
- 1 hora
- 24 horas

El administrador solo podrá ingresar si el usuario habilita el acceso.

---

## Planes

La idea de los planes no es quitar módulos importantes.

Todos los planes deberían permitir trabajar correctamente.

La diferencia está en el nivel de acompañamiento.

### Básico

- Acceso a la plataforma
- Uso normal del sistema
- Ayuda inicial
- Soporte básico

### Pro

- Todo lo del básico
- Más acompañamiento
- Configuraciones adicionales
- Posibilidad de más usuarios
- Respuestas más rápidas

### Elite

- Todo lo anterior
- Acompañamiento prioritario
- Soporte remoto temporal
- Configuración avanzada
- Mayor asistencia personalizada

---

## Comandos básicos de Git

Cada vez que se haga una modificación:

```bash
git add .
git commit -m "mensaje del cambio"
git push origin main
```

---

## Convención de commits

### Cambios visuales

```bash
git commit -m "feat: mejora visual dashboard y banners"
git commit -m "feat: nuevo branding C&R Soluciones Digitales"
git commit -m "feat: rediseño login y sidebar"
```

### Funcionalidades nuevas

```bash
git commit -m "feat: modulo mensajes internos"
git commit -m "feat: soporte remoto para plan elite"
git commit -m "feat: configuracion de emprendimiento"
git commit -m "feat: gestion de modulos por rubro"
```

### Correcciones

```bash
git commit -m "fix: correccion de build en vercel"
git commit -m "fix: problema visual en sidebar"
git commit -m "fix: error en wizard de emprendimientos"
```

### Versiones importantes

```bash
git commit -m "release: v0.2 CR Emprende MVP Visual"
git commit -m "release: v0.3 panel emprendedor funcional"
git commit -m "release: v0.4 integracion supabase"
```

---

## Últimas integraciones realizadas

### v0.1 - Base inicial

- Login visual
- Panel administrador
- Dashboard
- Usuarios
- Emprendimientos
- Rubros
- Módulos
- Planes
- Suscripciones

Commit sugerido:

```bash
git commit -m "feat: base inicial de CR Emprende SaaS"
```

---

### v0.2 - Branding C&R

- Logo C&R Soluciones Digitales
- Colores azul/tech
- Sidebar mejorado
- Login visual
- Fondo premium
- Banners visuales

Commit sugerido:

```bash
git commit -m "feat: nuevo branding C&R Soluciones Digitales"
```

---

### v0.3 - Bienvenida y mensajes internos

- Fondo azul en login
- Banner visual en dashboard
- Modal de bienvenida para emprendedor
- Módulo Mensajes C&R
- Bandeja de mensajes para administrador
- Formulario interno para consultas

Commit sugerido:

```bash
git commit -m "feat: bienvenida y mensajes internos C&R"
```

---

### v0.4 - Sidebar y personalización

- Logo grande en sidebar
- Identidad visual para administrador
- Logo personalizable por emprendimiento
- Login más realista
- Menos textos repetidos
- Fondo general más claro

Commit sugerido:

```bash
git commit -m "feat: mejora visual sidebar, branding y login"
```

---

## Próximos pasos

### Corto plazo

- Pulir estética del dashboard
- Mejorar cards con íconos grandes
- Revisar versión mobile
- Ajustar textos repetidos
- Mejorar configuración del emprendedor

### Mediano plazo

- Integrar Supabase
- Crear autenticación real
- Crear tabla de usuarios
- Crear tabla de emprendimientos
- Vincular usuarios con emprendimientos
- Filtrar información por emprendimiento_id

### Largo plazo

- Portal público opcional para emprendedores
- Presupuestador real
- Finanzas reales
- Reportes
- WhatsApp avanzado
- Notificaciones
- App móvil futura

---

## Estructura futura de base de datos

Tablas principales pensadas:

```txt
usuarios
emprendimientos
usuario_emprendimientos
rubros
modulos
planes
suscripciones
productos
insumos
proveedores
clientes
recetas
presupuestos
pedidos
finanzas
mensajes
configuracion_emprendimiento
soporte_remoto
```

---

## Nota importante

Este proyecto debe mantenerse como una única plataforma multi-emprendimiento.

No crear una web separada para cada rubro.

La clave es:

```txt
Un sistema
Muchos emprendimientos
Cada uno con su ID
Cada uno ve solo sus datos
```

---

## Estado actual

Proyecto en etapa:

```txt
MVP visual avanzado
```

Ya funciona en:

- GitHub
- Vercel
- Prototipo navegable

Falta conectar base de datos real y autenticación.
