import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  EyeOff,
  Globe,
  KeyRound,
  Lock,
  Pencil,
  Copy,
  LayoutDashboard,
  LogIn,
  LogOut,
  MessageCircle,
  Mail,
  Send,
  Package,
  Palette,
  Phone,
  Plus,
  Printer,
  QrCode,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";

const modulesBase = [
  "Dashboard",
  "Productos",
  "Insumos",
  "Proveedores",
  "Producción / Recetas",
  "Clientes",
  "Exhibición",
  "Presupuestos",
  "Pedidos",
  "Finanzas",
  "Reportes",
  "WhatsApp",
  "Configuración",
];

const rubrosIniciales = [
  {
    id: "RUB-ART",
    nombre: "Artesanías",
    enfoque: "Productos hechos a mano o personalizados.",
    etiquetaInsumos: "Insumos",
    actividades: ["Jabones", "Velas", "Tejidos", "Sahumerios", "Souvenirs"],
    ejemplos: "sahumerios, tejidos, velas, manualidades, fragancias",
    modulos: ["Dashboard", "Productos", "Insumos", "Proveedores", "Clientes", "Exhibición", "Presupuestos", "Pedidos", "Finanzas", "WhatsApp", "Configuración"],
  },
  {
    id: "RUB-GAS",
    nombre: "Gastronomía / Repostería",
    enfoque: "Producción con recetas, materia prima y costos por unidad.",
    etiquetaInsumos: "Materia prima",
    actividades: ["Alfajores", "Tortas", "Viandas", "Cumpleaños", "Panificados"],
    ejemplos: "tortas, alfajores, comida casera, panificados",
    modulos: ["Dashboard", "Productos", "Insumos", "Proveedores", "Producción / Recetas", "Clientes", "Exhibición", "Presupuestos", "Pedidos", "Finanzas", "WhatsApp", "Configuración"],
  },
  {
    id: "RUB-IMP",
    nombre: "Impresiones / Gráfica",
    enfoque: "Trabajos por pedido, insumos gráficos y presupuestos rápidos.",
    etiquetaInsumos: "Insumos",
    actividades: ["Fotocopias", "Sublimación", "Stickers", "Tarjetas", "Cumpleaños personalizados"],
    ejemplos: "stickers, tarjetas, folletos, sublimados, fotocopias",
    modulos: ["Dashboard", "Productos", "Insumos", "Proveedores", "Clientes", "Exhibición", "Presupuestos", "Pedidos", "Finanzas", "Reportes", "WhatsApp", "Configuración"],
  },
  {
    id: "RUB-USADOS",
    nombre: "Indumentaria / Reventa",
    enfoque: "Compra y venta de productos con control de stock y margen.",
    etiquetaInsumos: "Mercadería",
    actividades: ["Ropa usada", "Ropa infantil", "Accesorios", "Feria americana", "Calzado"],
    ejemplos: "ropa usada, medias, accesorios, feria americana",
    modulos: ["Dashboard", "Productos", "Clientes", "Exhibición", "Pedidos", "Finanzas", "Reportes", "WhatsApp", "Configuración"],
  },
];

const planesIniciales = [
  {
    id: "PLAN-BAS",
    nombre: "Básico",
    precio: "$15.000",
    periodos: ["Mensual", "Trimestral", "Semestral", "Anual"],
    soporte: "Explicación inicial + uso autónomo",
    usuarios: 1,
    accesoAdmin: false,
    color: "from-sky-500 via-blue-600 to-slate-900",
    resumen: "Para emprendedores que empiezan y necesitan ordenar su negocio sin depender de planillas.",
    idealPara: "Primer emprendimiento, uso individual, carga inicial simple y acompañamiento básico.",
    contiene: ["Dashboard principal", "Productos", "Clientes", "Presupuestos", "Pedidos", "Finanzas básicas", "WhatsApp", "Configuración del emprendimiento"],
    beneficios: ["El usuario puede empezar a cargar su negocio", "Tiene una base ordenada de clientes y productos", "Puede generar presupuestos simples", "C&R hace una explicación inicial"],
    limites: ["1 usuario incluido", "Soporte sin prioridad", "Sin soporte remoto avanzado"],
    notaInterna: "Plan de entrada. No sacar módulos base: la diferencia comercial está en acompañamiento, usuarios y prioridad."
  },
  {
    id: "PLAN-PRO",
    nombre: "Pro",
    precio: "$25.000",
    periodos: ["Mensual", "Trimestral", "Semestral", "Anual"],
    soporte: "Ayuda y configuraciones simples",
    usuarios: 2,
    accesoAdmin: false,
    color: "from-violet-500 via-fuchsia-600 to-slate-900",
    resumen: "Para emprendimientos que ya venden y necesitan más seguimiento, configuración y orden comercial.",
    idealPara: "Negocios con movimiento frecuente, pedidos, clientes recurrentes y necesidad de ajustar precios.",
    contiene: ["Todo lo del Básico", "Reportes", "Producción / Recetas si el rubro lo necesita", "Más configuración inicial", "Acompañamiento para ordenar costos", "Mejor seguimiento comercial"],
    beneficios: ["Más ayuda de C&R", "Mejor armado inicial del negocio", "Más control de costos y presupuestos", "Puede trabajar con 2 usuarios"],
    limites: ["2 usuarios incluidos", "Soporte con prioridad media", "Soporte remoto solo si se habilita como adicional"],
    notaInterna: "Plan recomendado para vender. Debe sentirse más completo por el acompañamiento, no porque el básico sea limitado."
  },
  {
    id: "PLAN-ELITE",
    nombre: "Elite",
    precio: "$40.000",
    periodos: ["Mensual", "Trimestral", "Semestral", "Anual"],
    soporte: "Acompañamiento y soporte remoto",
    usuarios: 5,
    accesoAdmin: true,
    color: "from-amber-400 via-orange-500 to-slate-900",
    resumen: "Para clientes que quieren prioridad, soporte cercano y ayuda para usar la plataforma al máximo.",
    idealPara: "Emprendimientos con mucho movimiento, varios usuarios o necesidad de soporte más directo.",
    contiene: ["Todo lo del Pro", "Soporte remoto temporal", "Prioridad de atención", "Configuración avanzada", "Acompañamiento para reportes y finanzas", "Hasta 5 usuarios incluidos"],
    beneficios: ["C&R puede entrar con permiso temporal", "Respuesta prioritaria", "Mayor acompañamiento", "Ideal para clientes que necesitan ayuda frecuente"],
    limites: ["5 usuarios incluidos", "Soporte remoto siempre con autorización del cliente", "Cambios grandes pueden presupuestarse aparte"],
    notaInterna: "Plan premium. Acá entra la mayor diferencia de servicio: prioridad, acceso remoto autorizado y acompañamiento."
  },
];

const emprendimientosIniciales = [
  {
    id: "EMP-001",
    nombre: "Jabones de Rodrigo",
    rubroId: "RUB-ART",
    rubro: "Artesanías",
    actividad: "Jabones y fragancias",
    plan: "Elite",
    estadoPago: "Pagado",
    fechaAlta: "01/06/2026",
    estado: "Activo",
    portalVisible: true,
    fechaSuspension: null,
    fechaEliminacion: null,
    vencimiento: "30/06/2026",
    owner: "Rodrigo Jabones",
    color: "Dorado",
    logo: "JR",
    whatsapp: "2974 292907",
    instagram: "@jabonesrodrigo",
    modulos: ["Dashboard", "Productos", "Insumos", "Proveedores", "Producción / Recetas", "Clientes", "Presupuestos", "Pedidos", "Finanzas", "WhatsApp", "Configuración"],
    soporteRemoto: { habilitado: false, vence: null },
  },
  {
    id: "EMP-002",
    nombre: "Dulces de Ana",
    rubroId: "RUB-GAS",
    rubro: "Gastronomía / Repostería",
    actividad: "Alfajores y tortas",
    plan: "Pro",
    estadoPago: "Pendiente",
    fechaAlta: "18/06/2026",
    estado: "Activo",
    portalVisible: true,
    fechaSuspension: null,
    fechaEliminacion: null,
    vencimiento: "18/07/2026",
    owner: "Ana Repostería",
    color: "Rosa pastel",
    logo: "DA",
    whatsapp: "2974 000111",
    instagram: "@dulcesdeana",
    modulos: ["Dashboard", "Productos", "Insumos", "Producción / Recetas", "Clientes", "Presupuestos", "Finanzas", "WhatsApp", "Configuración"],
    soporteRemoto: { habilitado: false, vence: null },
  },
  {
    id: "EMP-003",
    nombre: "Grafica Demo",
    rubroId: "RUB-IMP",
    rubro: "Impresiones / Grafica",
    actividad: "Stickers y papeleria",
    plan: "Pro",
    estadoPago: "Bonificado",
    fechaAlta: "20/06/2026",
    estado: "Activo",
    portalVisible: true,
    fechaSuspension: null,
    fechaEliminacion: null,
    vencimiento: "20/07/2026",
    owner: "Demo Impresiones",
    color: "Azul",
    logo: "GD",
    whatsapp: "2974 333555",
    instagram: "@graficademo",
    modulos: ["Dashboard", "Productos", "Insumos", "Proveedores", "Clientes", "Exhibicion", "Presupuestos", "Pedidos", "Finanzas", "Reportes", "WhatsApp", "Configuracion"],
    soporteRemoto: { habilitado: false, vence: null },
  },
  {
    id: "EMP-004",
    nombre: "Mini Moda Demo",
    rubroId: "RUB-USADOS",
    rubro: "Indumentaria / Reventa",
    actividad: "Ropa infantil y accesorios",
    plan: "Basico",
    estadoPago: "Bonificado",
    fechaAlta: "20/06/2026",
    estado: "Activo",
    portalVisible: true,
    fechaSuspension: null,
    fechaEliminacion: null,
    vencimiento: "20/07/2026",
    owner: "Demo Indumentaria",
    color: "Violeta",
    logo: "MM",
    whatsapp: "2974 444666",
    instagram: "@minimodademo",
    modulos: ["Dashboard", "Productos", "Clientes", "Exhibicion", "Pedidos", "Finanzas", "Reportes", "WhatsApp", "Configuracion"],
    soporteRemoto: { habilitado: false, vence: null },
  },
];

const usuariosIniciales = [
  { id: "USR-001", nombre: "Rodrigo Jabones", telefono: "2974 292907", email: "rodrigo@cremprende.com", rol: "Dueño", rubro: "Artesanías", plan: "Elite", estadoPago: "Pagado", fechaAlta: "01/06/2026", emprendimientoIds: ["EMP-001"], estado: "Activo", password: "123456", renovadoHasta: "30/06/2026", cambiosPassword: 1, renovaciones: 0 },
  { id: "USR-002", nombre: "Ana Repostería", telefono: "2974 000111", email: "ana@cremprende.com", rol: "Dueño", rubro: "Gastronomía / Repostería", plan: "Pro", estadoPago: "Pendiente", fechaAlta: "18/06/2026", emprendimientoIds: ["EMP-002"], estado: "Activo", password: "123456", renovadoHasta: "18/07/2026", cambiosPassword: 0, renovaciones: 0 },
  { id: "USR-003", nombre: "Ayudante Feria", telefono: "2974 222333", email: "ayuda@cremprende.com", rol: "Operador", rubro: "Artesanías", plan: "Básico", estadoPago: "Bonificado", fechaAlta: "10/06/2026", emprendimientoIds: ["EMP-001", "EMP-002"], estado: "Activo", password: "123456", renovadoHasta: "30/06/2026", cambiosPassword: 0, renovaciones: 0 },
  { id: "USR-004", nombre: "Demo Impresiones", telefono: "2974 333555", email: "impresiones@cremprende.com", rol: "Dueno", rubro: "Impresiones / Grafica", plan: "Pro", estadoPago: "Bonificado", fechaAlta: "20/06/2026", emprendimientoIds: ["EMP-003"], estado: "Activo", password: "123456", renovadoHasta: "20/07/2026", cambiosPassword: 0, renovaciones: 0 },
  { id: "USR-005", nombre: "Demo Indumentaria", telefono: "2974 444666", email: "indumentaria@cremprende.com", rol: "Dueno", rubro: "Indumentaria / Reventa", plan: "Basico", estadoPago: "Bonificado", fechaAlta: "20/06/2026", emprendimientoIds: ["EMP-004"], estado: "Activo", password: "123456", renovadoHasta: "20/07/2026", cambiosPassword: 0, renovaciones: 0 },
];

const productosDemo = [
  { id: "PROD-1", emprendimientoId: "EMP-001", nombre: "Jabón lavanda", stock: 32, costo: 950, venta: 1800, estado: "Activo" },
  { id: "PROD-2", emprendimientoId: "EMP-001", nombre: "Pack regalo x3", stock: 9, costo: 2450, venta: 4500, estado: "Bajo stock" },
  { id: "PROD-3", emprendimientoId: "EMP-002", nombre: "Alfajor chocolate", stock: 45, costo: 420, venta: 800, estado: "Activo" },
  { id: "PROD-4", emprendimientoId: "EMP-002", nombre: "Torta vainilla 1kg", stock: 8, costo: 4500, venta: 8500, estado: "Activo" },
  { id: "PROD-5", emprendimientoId: "EMP-002", nombre: "Lemon pie familiar", stock: 5, costo: 5200, venta: 9800, estado: "Activo" },
  { id: "PROD-6", emprendimientoId: "EMP-002", nombre: "Vianda pollo y vegetales", stock: 18, costo: 1800, venta: 3200, estado: "Activo" },
  { id: "PROD-7", emprendimientoId: "EMP-002", nombre: "Pan dulce artesanal", stock: 10, costo: 2600, venta: 5200, estado: "Activo" },
  { id: "PROD-8", emprendimientoId: "EMP-003", nombre: "Stickers troquelados x100", stock: 12, costo: 4200, venta: 9000, estado: "Activo" },
  { id: "PROD-9", emprendimientoId: "EMP-003", nombre: "Tarjetas personales x100", stock: 8, costo: 3600, venta: 7800, estado: "Activo" },
  { id: "PROD-10", emprendimientoId: "EMP-003", nombre: "Fotocopia color x50", stock: 30, costo: 1500, venta: 3500, estado: "Activo" },
  { id: "PROD-11", emprendimientoId: "EMP-003", nombre: "Sublimacion taza personalizada", stock: 15, costo: 2800, venta: 6500, estado: "Activo" },
  { id: "PROD-12", emprendimientoId: "EMP-004", nombre: "Body bebe estampado", stock: 14, costo: 2900, venta: 6200, estado: "Activo" },
  { id: "PROD-13", emprendimientoId: "EMP-004", nombre: "Set aritos acero x3", stock: 25, costo: 1600, venta: 3900, estado: "Activo" },
  { id: "PROD-14", emprendimientoId: "EMP-004", nombre: "Collar fantasia dorado", stock: 12, costo: 2400, venta: 5600, estado: "Activo" },
  { id: "PROD-15", emprendimientoId: "EMP-004", nombre: "Pack cosmetica basica", stock: 9, costo: 5200, venta: 9800, estado: "Activo" },
];

const insumosDemo = [
  { id: "INS-1", emprendimientoId: "EMP-001", nombre: "Glicerina", costo: 6200, unidad: "kg", proveedor: "Distribuidora Sur" },
  { id: "INS-2", emprendimientoId: "EMP-001", nombre: "Fragancia lavanda", costo: 3500, unidad: "100ml", proveedor: "Esencias Patagónicas" },
  { id: "INS-4", emprendimientoId: "EMP-001", nombre: "Aceite de lavanda", costo: 4800, unidad: "50ml", proveedor: "Esencias Patagonicas" },
  { id: "INS-5", emprendimientoId: "EMP-001", nombre: "Petalos de lavanda secos", costo: 2200, unidad: "50g", proveedor: "Herboristeria Sur" },
  { id: "INS-6", emprendimientoId: "EMP-001", nombre: "Esencia maracuya", costo: 3900, unidad: "100ml", proveedor: "Esencias Patagonicas" },
  { id: "INS-7", emprendimientoId: "EMP-001", nombre: "Aceite de chia", costo: 5600, unidad: "50ml", proveedor: "Natural Oil" },
  { id: "INS-8", emprendimientoId: "EMP-001", nombre: "Semillas de chia", costo: 1800, unidad: "100g", proveedor: "Herboristeria Sur" },
  { id: "INS-9", emprendimientoId: "EMP-001", nombre: "Harina de arroz fina", costo: 1400, unidad: "500g", proveedor: "Mayorista local" },
  { id: "INS-10", emprendimientoId: "EMP-001", nombre: "Esencia flor de loto", costo: 4200, unidad: "100ml", proveedor: "Esencias Patagonicas" },
  { id: "INS-11", emprendimientoId: "EMP-001", nombre: "Aceite de almendras", costo: 5200, unidad: "100ml", proveedor: "Natural Oil" },
  { id: "INS-12", emprendimientoId: "EMP-001", nombre: "Avena molida", costo: 1200, unidad: "500g", proveedor: "Mayorista local" },
  { id: "INS-13", emprendimientoId: "EMP-001", nombre: "Miel", costo: 2600, unidad: "500g", proveedor: "Productor local" },
  { id: "INS-14", emprendimientoId: "EMP-001", nombre: "Carbon activado cosmetico", costo: 3100, unidad: "100g", proveedor: "Insumos Cosmeticos" },
  { id: "INS-15", emprendimientoId: "EMP-001", nombre: "Aceite de tea tree", costo: 6200, unidad: "50ml", proveedor: "Natural Oil" },
  { id: "INS-16", emprendimientoId: "EMP-001", nombre: "Gel de aloe vera", costo: 2800, unidad: "250ml", proveedor: "Insumos Cosmeticos" },
  { id: "INS-17", emprendimientoId: "EMP-001", nombre: "Extracto de calendula", costo: 4600, unidad: "100ml", proveedor: "Natural Oil" },
  { id: "INS-18", emprendimientoId: "EMP-001", nombre: "Petalos de calendula secos", costo: 2400, unidad: "50g", proveedor: "Herboristeria Sur" },
  { id: "INS-19", emprendimientoId: "EMP-001", nombre: "Aceite de coco", costo: 4300, unidad: "250ml", proveedor: "Natural Oil" },
  { id: "INS-20", emprendimientoId: "EMP-001", nombre: "Coco rallado fino", costo: 1700, unidad: "250g", proveedor: "Mayorista local" },
  { id: "INS-21", emprendimientoId: "EMP-001", nombre: "Esencia rosas", costo: 3900, unidad: "100ml", proveedor: "Esencias Patagonicas" },
  { id: "INS-22", emprendimientoId: "EMP-001", nombre: "Petalos de rosa secos", costo: 2600, unidad: "50g", proveedor: "Herboristeria Sur" },
  { id: "INS-23", emprendimientoId: "EMP-001", nombre: "Alcohol cosmetico 70", costo: 1800, unidad: "500ml", proveedor: "Insumos Cosmeticos" },
  { id: "INS-24", emprendimientoId: "EMP-001", nombre: "Colorante cosmetico", costo: 2500, unidad: "50ml", proveedor: "Insumos Cosmeticos" },
  { id: "INS-3", emprendimientoId: "EMP-002", nombre: "Harina", costo: 1200, unidad: "kg", proveedor: "Mayorista local" },
  { id: "INS-GAS-1", emprendimientoId: "EMP-002", nombre: "Harina 0000", costo: 1200, unidad: "kg", proveedor: "Mayorista local" },
  { id: "INS-GAS-2", emprendimientoId: "EMP-002", nombre: "Azucar", costo: 1400, unidad: "kg", proveedor: "Mayorista local" },
  { id: "INS-GAS-3", emprendimientoId: "EMP-002", nombre: "Huevos", costo: 3200, unidad: "docena", proveedor: "Granja Sur" },
  { id: "INS-GAS-4", emprendimientoId: "EMP-002", nombre: "Aceite girasol", costo: 2600, unidad: "litro", proveedor: "Mayorista local" },
  { id: "INS-GAS-5", emprendimientoId: "EMP-002", nombre: "Dulce de leche repostero", costo: 3900, unidad: "kg", proveedor: "Distribuidora Dulce" },
  { id: "INS-GAS-6", emprendimientoId: "EMP-002", nombre: "Chocolate cobertura", costo: 5200, unidad: "kg", proveedor: "Reposteria Central" },
  { id: "INS-GAS-7", emprendimientoId: "EMP-002", nombre: "Crema de leche", costo: 2900, unidad: "litro", proveedor: "Lacteos Sur" },
  { id: "INS-GAS-8", emprendimientoId: "EMP-002", nombre: "Pollo", costo: 4300, unidad: "kg", proveedor: "Carniceria Centro" },
  { id: "INS-GAS-9", emprendimientoId: "EMP-002", nombre: "Verduras mixtas", costo: 1800, unidad: "kg", proveedor: "Verduleria local" },
  { id: "INS-GAS-10", emprendimientoId: "EMP-002", nombre: "Bandejas descartables", costo: 2200, unidad: "100u", proveedor: "Packaging Sur" },
  { id: "INS-IMP-1", emprendimientoId: "EMP-003", nombre: "Papel obra 75g", costo: 5500, unidad: "resma", proveedor: "Papelera Sur" },
  { id: "INS-IMP-2", emprendimientoId: "EMP-003", nombre: "Papel fotografico glossy 130g", costo: 7200, unidad: "50 hojas", proveedor: "Papelera Sur" },
  { id: "INS-IMP-3", emprendimientoId: "EMP-003", nombre: "Papel ilustracion 300g", costo: 9400, unidad: "100 hojas", proveedor: "Papelera Sur" },
  { id: "INS-IMP-4", emprendimientoId: "EMP-003", nombre: "Tinta pigmentada negra", costo: 6800, unidad: "100ml", proveedor: "Insumos Graficos" },
  { id: "INS-IMP-5", emprendimientoId: "EMP-003", nombre: "Tinta pigmentada color", costo: 8200, unidad: "100ml", proveedor: "Insumos Graficos" },
  { id: "INS-IMP-6", emprendimientoId: "EMP-003", nombre: "Toner laser negro", costo: 18500, unidad: "unidad", proveedor: "Print Market" },
  { id: "INS-IMP-7", emprendimientoId: "EMP-003", nombre: "Vinilo adhesivo mate", costo: 12500, unidad: "metro", proveedor: "Grafica Mayorista" },
  { id: "INS-IMP-8", emprendimientoId: "EMP-003", nombre: "Lamina sublimacion taza", costo: 4800, unidad: "10u", proveedor: "Sublima Sur" },
  { id: "INS-IMP-9", emprendimientoId: "EMP-003", nombre: "Servicio Canva Pro", costo: 8500, unidad: "mes", proveedor: "Software" },
  { id: "INS-IND-1", emprendimientoId: "EMP-004", nombre: "Body bebe algodon", costo: 2900, unidad: "unidad", proveedor: "Mayorista Textil" },
  { id: "INS-IND-2", emprendimientoId: "EMP-004", nombre: "Remera infantil lisa", costo: 3500, unidad: "unidad", proveedor: "Mayorista Textil" },
  { id: "INS-IND-3", emprendimientoId: "EMP-004", nombre: "Calza infantil", costo: 4200, unidad: "unidad", proveedor: "Mayorista Textil" },
  { id: "INS-IND-4", emprendimientoId: "EMP-004", nombre: "Aritos acero quirurgico", costo: 1600, unidad: "set", proveedor: "Accesorios Once" },
  { id: "INS-IND-5", emprendimientoId: "EMP-004", nombre: "Collar fantasia", costo: 2400, unidad: "unidad", proveedor: "Accesorios Once" },
  { id: "INS-IND-6", emprendimientoId: "EMP-004", nombre: "Piercing acero", costo: 1800, unidad: "unidad", proveedor: "Accesorios Once" },
  { id: "INS-IND-7", emprendimientoId: "EMP-004", nombre: "Labial mate", costo: 2200, unidad: "unidad", proveedor: "Cosmetica Mayorista" },
  { id: "INS-IND-8", emprendimientoId: "EMP-004", nombre: "Mascara pestanas", costo: 2600, unidad: "unidad", proveedor: "Cosmetica Mayorista" },
  { id: "INS-IND-9", emprendimientoId: "EMP-004", nombre: "Vincha infantil", costo: 1200, unidad: "unidad", proveedor: "Accesorios Once" },
];

const recetasDemo = [
  { id: "REC-1", emprendimientoId: "EMP-001", nombre: "Jabón lavanda x10", insumos: "Glicerina + fragancia + molde", costo: 9500, sugerido: 18000 },
  { id: "REC-3", emprendimientoId: "EMP-001", nombre: "Jabon maracuya y chia x10", insumos: "Glicerina + maracuya + chia", costo: 9800, sugerido: 19000, margen: 55, items: [
    { id: "RI-MAR-1", insumoId: "INS-1", cantidad: 1000 },
    { id: "RI-MAR-2", insumoId: "INS-6", cantidad: 55 },
    { id: "RI-MAR-3", insumoId: "INS-7", cantidad: 15 },
    { id: "RI-MAR-4", insumoId: "INS-8", cantidad: 10 },
    { id: "RI-MAR-5", insumoId: "INS-24", cantidad: 5 },
  ] },
  { id: "REC-4", emprendimientoId: "EMP-001", nombre: "Jabon arroz y flor de loto x10", insumos: "Glicerina + arroz + flor de loto", costo: 9200, sugerido: 18500, margen: 55, items: [
    { id: "RI-LOT-1", insumoId: "INS-1", cantidad: 1000 },
    { id: "RI-LOT-2", insumoId: "INS-9", cantidad: 22 },
    { id: "RI-LOT-3", insumoId: "INS-10", cantidad: 50 },
    { id: "RI-LOT-4", insumoId: "INS-11", cantidad: 15 },
    { id: "RI-LOT-5", insumoId: "INS-24", cantidad: 4 },
  ] },
  { id: "REC-5", emprendimientoId: "EMP-001", nombre: "Jabon avena y miel x10", insumos: "Glicerina + avena + miel", costo: 8800, sugerido: 17500, margen: 52, items: [
    { id: "RI-AVE-1", insumoId: "INS-1", cantidad: 1000 },
    { id: "RI-AVE-2", insumoId: "INS-12", cantidad: 35 },
    { id: "RI-AVE-3", insumoId: "INS-13", cantidad: 30 },
    { id: "RI-AVE-4", insumoId: "INS-11", cantidad: 10 },
  ] },
  { id: "REC-6", emprendimientoId: "EMP-001", nombre: "Jabon carbon activado x10", insumos: "Glicerina + carbon + tea tree", costo: 9400, sugerido: 18800, margen: 55, items: [
    { id: "RI-CAR-1", insumoId: "INS-1", cantidad: 1000 },
    { id: "RI-CAR-2", insumoId: "INS-14", cantidad: 12 },
    { id: "RI-CAR-3", insumoId: "INS-15", cantidad: 14 },
    { id: "RI-CAR-4", insumoId: "INS-23", cantidad: 10 },
  ] },
  { id: "REC-7", emprendimientoId: "EMP-001", nombre: "Jabon aloe vera x10", insumos: "Glicerina + aloe vera", costo: 8700, sugerido: 17500, margen: 52, items: [
    { id: "RI-ALO-1", insumoId: "INS-1", cantidad: 1000 },
    { id: "RI-ALO-2", insumoId: "INS-16", cantidad: 45 },
    { id: "RI-ALO-3", insumoId: "INS-11", cantidad: 10 },
    { id: "RI-ALO-4", insumoId: "INS-24", cantidad: 3 },
  ] },
  { id: "REC-8", emprendimientoId: "EMP-001", nombre: "Jabon calendula x10", insumos: "Glicerina + calendula", costo: 9300, sugerido: 18500, margen: 54, items: [
    { id: "RI-CAL-1", insumoId: "INS-1", cantidad: 1000 },
    { id: "RI-CAL-2", insumoId: "INS-17", cantidad: 35 },
    { id: "RI-CAL-3", insumoId: "INS-18", cantidad: 8 },
    { id: "RI-CAL-4", insumoId: "INS-11", cantidad: 10 },
  ] },
  { id: "REC-9", emprendimientoId: "EMP-001", nombre: "Jabon coco nutritivo x10", insumos: "Glicerina + coco", costo: 9100, sugerido: 18000, margen: 53, items: [
    { id: "RI-COC-1", insumoId: "INS-1", cantidad: 1000 },
    { id: "RI-COC-2", insumoId: "INS-19", cantidad: 22 },
    { id: "RI-COC-3", insumoId: "INS-20", cantidad: 18 },
  ] },
  { id: "REC-10", emprendimientoId: "EMP-001", nombre: "Jabon rosas x10", insumos: "Glicerina + rosas", costo: 9000, sugerido: 18000, margen: 53, items: [
    { id: "RI-ROS-1", insumoId: "INS-1", cantidad: 1000 },
    { id: "RI-ROS-2", insumoId: "INS-21", cantidad: 50 },
    { id: "RI-ROS-3", insumoId: "INS-22", cantidad: 8 },
    { id: "RI-ROS-4", insumoId: "INS-24", cantidad: 4 },
  ] },
  { id: "REC-11", emprendimientoId: "EMP-001", nombre: "Jabon antibacterial suave x10", insumos: "Glicerina + tea tree + alcohol cosmetico", costo: 9600, sugerido: 19500, margen: 55, items: [
    { id: "RI-ANT-1", insumoId: "INS-1", cantidad: 1000 },
    { id: "RI-ANT-2", insumoId: "INS-15", cantidad: 18 },
    { id: "RI-ANT-3", insumoId: "INS-23", cantidad: 18 },
    { id: "RI-ANT-4", insumoId: "INS-24", cantidad: 3 },
  ] },
  { id: "REC-2", emprendimientoId: "EMP-002", nombre: "Alfajor x12", insumos: "Harina + dulce + chocolate", costo: 5200, sugerido: 9600 },
  { id: "REC-GAS-1", emprendimientoId: "EMP-002", nombre: "Torta vainilla 1kg", insumos: "Harina + azucar + huevos + crema", costo: 4500, sugerido: 8500, margen: 47, items: [
    { id: "RI-GAS-TOR-1", insumoId: "INS-GAS-1", cantidad: 0.35 },
    { id: "RI-GAS-TOR-2", insumoId: "INS-GAS-2", cantidad: 0.25 },
    { id: "RI-GAS-TOR-3", insumoId: "INS-GAS-3", cantidad: 0.5 },
    { id: "RI-GAS-TOR-4", insumoId: "INS-GAS-7", cantidad: 0.4 },
  ] },
  { id: "REC-GAS-2", emprendimientoId: "EMP-002", nombre: "Lemon pie familiar", insumos: "Harina + azucar + huevos + crema", costo: 5200, sugerido: 9800, margen: 47, items: [
    { id: "RI-GAS-LEM-1", insumoId: "INS-GAS-1", cantidad: 0.28 },
    { id: "RI-GAS-LEM-2", insumoId: "INS-GAS-2", cantidad: 0.22 },
    { id: "RI-GAS-LEM-3", insumoId: "INS-GAS-3", cantidad: 0.4 },
    { id: "RI-GAS-LEM-4", insumoId: "INS-GAS-7", cantidad: 0.25 },
  ] },
  { id: "REC-GAS-3", emprendimientoId: "EMP-002", nombre: "Vianda pollo y vegetales x10", insumos: "Pollo + verduras + aceite + bandejas", costo: 18000, sugerido: 32000, margen: 44, items: [
    { id: "RI-GAS-VIA-1", insumoId: "INS-GAS-8", cantidad: 2.2 },
    { id: "RI-GAS-VIA-2", insumoId: "INS-GAS-9", cantidad: 2.5 },
    { id: "RI-GAS-VIA-3", insumoId: "INS-GAS-4", cantidad: 0.25 },
    { id: "RI-GAS-VIA-4", insumoId: "INS-GAS-10", cantidad: 0.1 },
  ] },
  { id: "REC-IMP-1", emprendimientoId: "EMP-003", nombre: "Stickers troquelados x100", insumos: "Vinilo + tinta color + Canva", costo: 4200, sugerido: 9000, margen: 53, items: [
    { id: "RI-IMP-STI-1", insumoId: "INS-IMP-7", cantidad: 0.35 },
    { id: "RI-IMP-STI-2", insumoId: "INS-IMP-5", cantidad: 0.08 },
    { id: "RI-IMP-STI-3", insumoId: "INS-IMP-9", cantidad: 0.03 },
  ] },
  { id: "REC-IMP-2", emprendimientoId: "EMP-003", nombre: "Tarjetas personales x100", insumos: "Papel ilustracion + tinta color + Canva", costo: 3600, sugerido: 7800, margen: 54, items: [
    { id: "RI-IMP-TAR-1", insumoId: "INS-IMP-3", cantidad: 0.25 },
    { id: "RI-IMP-TAR-2", insumoId: "INS-IMP-5", cantidad: 0.06 },
    { id: "RI-IMP-TAR-3", insumoId: "INS-IMP-9", cantidad: 0.03 },
  ] },
  { id: "REC-IMP-3", emprendimientoId: "EMP-003", nombre: "Taza sublimada personalizada", insumos: "Lamina sublimacion + tinta color", costo: 2800, sugerido: 6500, margen: 57, items: [
    { id: "RI-IMP-TAZ-1", insumoId: "INS-IMP-8", cantidad: 0.1 },
    { id: "RI-IMP-TAZ-2", insumoId: "INS-IMP-5", cantidad: 0.05 },
  ] },
];

const clientesDemo = [
  { id: "CLI-1", emprendimientoId: "EMP-001", nombre: "María López", telefono: "2974 111222", compras: 4, ultimaCompra: "Pack regalo x3", estado: "Activo" },
  { id: "CLI-2", emprendimientoId: "EMP-001", nombre: "Comisión Feria", telefono: "2974 333444", compras: 2, ultimaCompra: "Jabón lavanda", estado: "Seguimiento" },
  { id: "CLI-3", emprendimientoId: "EMP-002", nombre: "Lucía Pérez", telefono: "2974 555666", compras: 6, ultimaCompra: "Alfajor chocolate", estado: "Activo" },
  { id: "CLI-4", emprendimientoId: "EMP-003", nombre: "Salon Luna", telefono: "2974 777888", compras: 3, ultimaCompra: "Stickers troquelados x100", estado: "Seguimiento" },
  { id: "CLI-5", emprendimientoId: "EMP-003", nombre: "Cumple Sofi", telefono: "2974 888999", compras: 1, ultimaCompra: "Tarjetas personales x100", estado: "Potencial" },
  { id: "CLI-6", emprendimientoId: "EMP-004", nombre: "Micaela Torres", telefono: "2974 444777", compras: 2, ultimaCompra: "Body bebe estampado", estado: "Activo" },
  { id: "CLI-7", emprendimientoId: "EMP-004", nombre: "Feria Barrio Norte", telefono: "2974 555888", compras: 5, ultimaCompra: "Set aritos acero x3", estado: "Seguimiento" },
];

const exhibicionInicial = [
  {
    id: "PUB-001",
    emprendimientoId: "EMP-001",
    titulo: "Jabón lavanda artesanal",
    descripcion: "Jabón aromático hecho a mano, ideal para regalos o uso personal.",
    precio: 1800,
    categoria: "Jabones",
    estado: "Visible",
    imagen: "",
  },
  {
    id: "PUB-002",
    emprendimientoId: "EMP-001",
    titulo: "Pack regalo x3",
    descripcion: "Tres jabones artesanales listos para regalar.",
    precio: 4500,
    categoria: "Regalos",
    estado: "Visible",
    imagen: "",
  },
  {
    id: "PUB-003",
    emprendimientoId: "EMP-002",
    titulo: "Alfajor chocolate",
    descripcion: "Alfajor artesanal de chocolate con dulce de leche.",
    precio: 800,
    categoria: "Dulces",
    estado: "Visible",
    imagen: "",
  },
  {
    id: "PUB-004",
    emprendimientoId: "EMP-002",
    titulo: "Lemon pie familiar",
    descripcion: "Postre familiar con crema suave y base crocante.",
    precio: 9800,
    categoria: "Reposteria",
    estado: "Visible",
    imagen: "",
  },
  {
    id: "PUB-005",
    emprendimientoId: "EMP-002",
    titulo: "Vianda pollo y vegetales",
    descripcion: "Vianda casera lista para retirar o coordinar entrega.",
    precio: 3200,
    categoria: "Viandas",
    estado: "Visible",
    imagen: "",
  },
  {
    id: "PUB-006",
    emprendimientoId: "EMP-003",
    titulo: "Stickers troquelados x100",
    descripcion: "Stickers personalizados para emprendimientos, ferias y packaging.",
    precio: 9000,
    categoria: "Stickers",
    estado: "Visible",
    imagen: "",
  },
  {
    id: "PUB-007",
    emprendimientoId: "EMP-003",
    titulo: "Tarjetas personales x100",
    descripcion: "Tarjetas comerciales listas para entregar con tu marca.",
    precio: 7800,
    categoria: "Papeleria",
    estado: "Visible",
    imagen: "",
  },
  {
    id: "PUB-008",
    emprendimientoId: "EMP-003",
    titulo: "Taza sublimada personalizada",
    descripcion: "Taza personalizada para regalos, fechas especiales o merchandising.",
    precio: 6500,
    categoria: "Sublimacion",
    estado: "Visible",
    imagen: "",
  },
  {
    id: "PUB-009",
    emprendimientoId: "EMP-004",
    titulo: "Body bebe estampado",
    descripcion: "Body de algodon con estampa infantil, talle a coordinar.",
    precio: 6200,
    categoria: "Ropa infantil",
    estado: "Visible",
    imagen: "",
  },
  {
    id: "PUB-010",
    emprendimientoId: "EMP-004",
    titulo: "Set aritos acero x3",
    descripcion: "Set de aritos de acero para venta individual o feria.",
    precio: 3900,
    categoria: "Accesorios",
    estado: "Visible",
    imagen: "",
  },
  {
    id: "PUB-011",
    emprendimientoId: "EMP-004",
    titulo: "Pack cosmetica basica",
    descripcion: "Combo inicial de cosmetica para regalos o reventa.",
    precio: 9800,
    categoria: "Cosmetica",
    estado: "Visible",
    imagen: "",
  },
];

const STORAGE_KEYS = {
  publicaciones: "cr-emprende-publicaciones",
  consultasPortal: "cr-emprende-consultas-portal",
  portalConfig: "cr-emprende-portal-config",
  portalCache: "cr-emprende-portal-cache",
  portalViews: "cr-emprende-portal-views",
  commissionSettings: "cr-emprende-commission-settings",
  portalCommissions: "cr-emprende-portal-commissions",
};

const PORTAL_IMAGE_MAX_UPLOAD_BYTES = 2 * 1024 * 1024;
const PORTAL_IMAGE_TARGET_BYTES = 600 * 1024;
const PORTAL_IMAGE_MAX_DIMENSION = 1400;
const PORTAL_PUBLICATION_LIMIT = 20;
const PORTAL_LOGO_MAX_UPLOAD_BYTES = 1 * 1024 * 1024;
const PORTAL_LOGO_TARGET_BYTES = 300 * 1024;
const PORTAL_BANNER_MAX_UPLOAD_BYTES = 2 * 1024 * 1024;
const PORTAL_BANNER_TARGET_BYTES = 700 * 1024;

function loadStoredValue(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveStoredValue(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local storage can fail in restricted browsing modes.
  }
}

function getDefaultPortalConfig(emp) {
  return {
    descripcion: `Conocé las publicaciones de ${emp?.nombre || "este emprendimiento"} y consultá directo por WhatsApp.`,
    color: "cyan",
  };
}

function buildPortalCache(emprendimientos, publicaciones, portalConfig) {
  const now = new Date().toISOString();
  return emprendimientos.reduce((acc, emp) => {
    acc[emp.id] = {
      version: now,
      updatedAt: now,
      emp: {
        id: emp.id,
        nombre: emp.nombre,
        rubro: emp.rubro,
        actividad: emp.actividad,
        logo: emp.logo,
        whatsapp: emp.whatsapp,
        instagram: emp.instagram,
        estado: accountStatusLabel(emp),
        portalVisible: emp.portalVisible !== false,
        fechaSuspension: emp.fechaSuspension || null,
        fechaEliminacion: emp.fechaEliminacion || null,
      },
      config: {
        ...getDefaultPortalConfig(emp),
        ...(portalConfig[emp.id] || {}),
      },
      publicaciones: publicaciones.filter((item) => item.emprendimientoId === emp.id && item.estado === "Visible"),
    };
    return acc;
  }, {});
}

function dataUrlSizeBytes(dataUrl) {
  if (!dataUrl || typeof dataUrl !== "string") return 0;
  const base64 = dataUrl.split(",")[1] || "";
  return Math.round((base64.length * 3) / 4);
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen."));
    };
    image.src = url;
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("No se pudo optimizar la imagen."));
    }, type, quality);
  });
}

async function compressImageFile(file, options = {}) {
  if (!file) return null;
  const maxUploadBytes = options.maxUploadBytes || PORTAL_IMAGE_MAX_UPLOAD_BYTES;
  const targetBytes = options.targetBytes || PORTAL_IMAGE_TARGET_BYTES;
  const maxDimension = options.maxDimension || PORTAL_IMAGE_MAX_DIMENSION;
  if (file.size > maxUploadBytes) {
    throw new Error(`La imagen supera el limite de ${formatBytes(maxUploadBytes)}.`);
  }

  const image = await loadImageFromFile(file);
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);

  let quality = 0.82;
  let blob = await canvasToBlob(canvas, "image/webp", quality);
  while (blob.size > targetBytes && quality > 0.45) {
    quality -= 0.08;
    blob = await canvasToBlob(canvas, "image/webp", quality);
  }

  const dataUrl = await blobToDataUrl(blob);
  return {
    dataUrl,
    originalBytes: file.size,
    finalBytes: dataUrlSizeBytes(dataUrl),
    width,
    height,
  };
}

async function compressPortalImage(file) {
  return compressImageFile(file, {
    maxUploadBytes: PORTAL_IMAGE_MAX_UPLOAD_BYTES,
    targetBytes: PORTAL_IMAGE_TARGET_BYTES,
    maxDimension: PORTAL_IMAGE_MAX_DIMENSION,
  });
}

async function compressPortalLogo(file) {
  return compressImageFile(file, {
    maxUploadBytes: PORTAL_LOGO_MAX_UPLOAD_BYTES,
    targetBytes: PORTAL_LOGO_TARGET_BYTES,
    maxDimension: 900,
  });
}

async function compressPortalBanner(file) {
  return compressImageFile(file, {
    maxUploadBytes: PORTAL_BANNER_MAX_UPLOAD_BYTES,
    targetBytes: PORTAL_BANNER_TARGET_BYTES,
    maxDimension: 1800,
  });
}

const defaultCommissionSettings = {
  porcentaje: 1,
  limiteMensual: 10000,
  version: 1,
  updatedAt: "",
};


function parseEsDate(dateText) {
  if (!dateText || typeof dateText !== "string") return null;
  if (dateText.includes("T")) {
    const isoDate = new Date(dateText);
    return Number.isNaN(isoDate.getTime()) ? null : isoDate;
  }
  const parts = dateText.split("/").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
}

function getDueStatus(dateText) {
  const dueDate = parseEsDate(dateText);
  if (!dueDate) return "Sin fecha";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "Vencido";
  if (diffDays <= 7) return "Por vencer";
  return "Al día";
}

function userDueValue(user) {
  return user?.demo && user.demoExpiraOn ? user.demoExpiraOn : user?.renovadoHasta;
}

function userDueLabel(user) {
  if (user?.demo && user.demoExpiraOn) return formatDateTime(user.demoExpiraOn);
  return user?.renovadoHasta || "Sin fecha";
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function isoToEsDate(value) {
  if (!value) return new Date().toLocaleDateString("es-AR");
  if (value.includes("/")) return value;
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

function accountStatusLabel(emp) {
  const value = String(emp?.estado || "Activo").toLowerCase();
  if (value.includes("suspend")) return "Suspendido";
  if (value.includes("elimin")) return "Eliminado";
  return "Activo";
}

function accountStatusTone(emp) {
  const status = accountStatusLabel(emp);
  if (status === "Suspendido") return "warning";
  if (status === "Eliminado") return "danger";
  return "success";
}

function getSuspendedDays(emp) {
  const date = parseEsDate(emp?.fechaSuspension);
  if (!date) return 0;
  date.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((today - date) / (1000 * 60 * 60 * 24)));
}

function suspensionWarning(emp) {
  const days = getSuspendedDays(emp);
  if (days >= 90) return { label: "Eliminar", tone: "danger", detail: "Llego al limite de 90 dias." };
  if (days >= 85) return { label: "Ultimo aviso", tone: "danger", detail: "Quedan pocos dias antes de eliminar." };
  if (days >= 60) return { label: "Segundo aviso", tone: "warning", detail: "Seguimiento recomendado." };
  if (days >= 30) return { label: "Primer aviso", tone: "warning", detail: "Conviene contactar al emprendedor." };
  return { label: "Seguimiento", tone: "info", detail: "Dentro del periodo de resguardo." };
}

function formatDateTime(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";
  return date.toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" });
}

function getRemainingMs(dateText) {
  const date = parseEsDate(dateText);
  if (!date) return 0;
  return Math.max(0, date.getTime() - Date.now());
}

function formatRemaining(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

function normalizePhoneForWhatsApp(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("54")) return digits;
  return `54${digits}`;
}

function getPortalTheme(color) {
  const themes = {
    cyan: { overlay: "rgba(8,145,178,.58)" },
    violet: { overlay: "rgba(124,58,237,.58)" },
    emerald: { overlay: "rgba(5,150,105,.58)" },
    amber: { overlay: "rgba(217,119,6,.50)" },
    rose: { overlay: "rgba(225,29,72,.52)" },
  };
  return themes[color] || themes.cyan;
}

function addMinutesFromNow(minutes) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + Number(minutes));
  return date.toISOString();
}

function accessUserFromName(name) {
  const base = (name || "demo")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 18) || "demo";
  return `${base}@cremprende.com`;
}

const adminEmails = ["admin@cremprende.com"];

const demoDurationOptions = [
  { value: 5, label: "5 minutos" },
  { value: 60, label: "1 hora" },
  { value: 300, label: "5 horas" },
  { value: 720, label: "12 horas" },
  { value: 1440, label: "24 horas" },
];

const qrDemoDurationMinutes = 180;
const qrDemoBaseIds = ["EMP-001", "EMP-002", "EMP-003", "EMP-004"];

function getDemoAccessUrl() {
  if (typeof window === "undefined") return "?demo=1";
  const basePath = window.location.pathname
    .replace(/\/demoCR\/?$/i, "")
    .replace(/\/index\.html$/i, "")
    .replace(/\/$/, "");
  return `${window.location.origin}${basePath || ""}/#/demoCR`;
}

function getQrImageUrl(url, size = 220) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
}

function getDemoBaseLabel(emp) {
  if (!emp) return "Demo";
  if (emp.id === "EMP-001") return "Demo Artesanias / Jabones";
  if (emp.id === "EMP-002") return "Demo Gastronomia / Reposteria";
  if (emp.id === "EMP-003") return "Demo Impresiones / Grafica";
  if (emp.id === "EMP-004") return "Demo Indumentaria / Reventa";
  return `Demo ${emp.rubro || emp.nombre}`;
}

function App() {
  const supportParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const supportEmpIdFromUrl = supportParams?.get("soporte_emp") || null;
  const portalEmpIdFromUrl = supportParams?.get("portal") || null;
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
  const currentHash = typeof window !== "undefined" ? window.location.hash : "";
  const isDemoAccessFromUrl = supportParams?.get("demo") === "1" || /\/demoCR\/?$/i.test(currentPath) || /^#\/demoCR\/?$/i.test(currentHash);
  const isSupportSession = Boolean(supportEmpIdFromUrl);

  const [isLoggedIn, setIsLoggedIn] = useState(isSupportSession);
  const [loginRole, setLoginRole] = useState(isSupportSession ? "Soporte C&R" : "Super Admin");
  const [loginEmail, setLoginEmail] = useState("admin@cremprende.com");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [demoRemainingMs, setDemoRemainingMs] = useState(0);
  const [activePage, setActivePage] = useState(isSupportSession ? "mi-panel" : "dashboard");
  const [emprendimientos, setEmprendimientos] = useState(emprendimientosIniciales);
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [rubros, setRubros] = useState(rubrosIniciales);
  const [planes] = useState(planesIniciales);
  const [selectedEmpId, setSelectedEmpId] = useState(supportEmpIdFromUrl || "EMP-001");
  const [search, setSearch] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isBusinessWizardOpen, setIsBusinessWizardOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showDemoExpired, setShowDemoExpired] = useState(false);
  const [expiredDemoUser, setExpiredDemoUser] = useState(null);
  const [mensajes, setMensajes] = useState([
    { id: "MSG-001", emprendimientoId: "EMP-001", usuarioId: "USR-001", adminId: "ADMIN-CR-001", de: "Rodrigo Jabones", asunto: "Consulta sobre presupuestos", categoria: "Consulta", mensaje: "Hola, quería saber si podemos agregar una opción para guardar presupuestos frecuentes.", estado: "Nuevo", fecha: "Hoy 10:20", respuesta: "", fechaRespuesta: "" },
    { id: "MSG-002", emprendimientoId: "EMP-002", usuarioId: "USR-002", adminId: "ADMIN-CR-001", de: "Ana Repostería", asunto: "Ayuda con recetas", categoria: "Ayuda", mensaje: "Necesito revisar cómo cargar los costos de una receta nueva.", estado: "Respondido", fecha: "Ayer 18:05", respuesta: "Sí, Ana. Entrá en Producción / Recetas y cargá primero la materia prima. Después armamos la receta con cantidades para calcular costo por unidad.", fechaRespuesta: "Ayer 18:42", respondidoPor: "C&R Soporte" },
  ]);
  const [historialAdmin, setHistorialAdmin] = useState([]);
  const [historialComercial, setHistorialComercial] = useState([]);
  const [publicaciones, setPublicaciones] = useState(() => loadStoredValue(STORAGE_KEYS.publicaciones, exhibicionInicial));
  const [consultasPortal, setConsultasPortal] = useState(() => loadStoredValue(STORAGE_KEYS.consultasPortal, []));
  const [portalConfig, setPortalConfig] = useState(() => loadStoredValue(STORAGE_KEYS.portalConfig, {}));
  const [portalCache, setPortalCache] = useState(() => loadStoredValue(STORAGE_KEYS.portalCache, {}));
  const [portalViews, setPortalViews] = useState(() => loadStoredValue(STORAGE_KEYS.portalViews, {}));
  const [commissionSettings, setCommissionSettings] = useState(() => loadStoredValue(STORAGE_KEYS.commissionSettings, defaultCommissionSettings));
  const [portalCommissions, setPortalCommissions] = useState(() => loadStoredValue(STORAGE_KEYS.portalCommissions, []));

  const selectedEmp = emprendimientos.find((e) => e.id === selectedEmpId) || emprendimientos[0];
  const isAdmin = loginRole === "Super Admin";
  const selectedEmpStatus = accountStatusLabel(selectedEmp);
  const isUserAccountBlocked = !isAdmin && (selectedEmpStatus === "Suspendido" || selectedEmpStatus === "Eliminado");

  const filteredEmprendimientos = useMemo(() => {
    const term = search.toLowerCase();
    return emprendimientos.filter((e) => [e.id, e.nombre, e.rubro, e.actividad, e.owner, e.plan, e.estado, e.estadoPago].join(" ").toLowerCase().includes(term));
  }, [emprendimientos, search]);

  useEffect(() => {
    if (!isLoggedIn || isAdmin || !currentUser?.demo || !currentUser.demoExpiraOn) {
      setDemoRemainingMs(0);
      return undefined;
    }

    function updateDemoTimer() {
      const remaining = getRemainingMs(currentUser.demoExpiraOn);
      setDemoRemainingMs(remaining);
      if (remaining <= 0) {
        setExpiredDemoUser(currentUser);
        setShowDemoExpired(true);
        setShowWelcome(false);
        setIsLoggedIn(false);
        setActivePage("mi-panel");
      }
    }

    updateDemoTimer();
    const interval = window.setInterval(updateDemoTimer, 1000);
    return () => window.clearInterval(interval);
  }, [currentUser, isAdmin, isLoggedIn]);

  useEffect(() => {
    saveStoredValue(STORAGE_KEYS.publicaciones, publicaciones);
  }, [publicaciones]);

  useEffect(() => {
    saveStoredValue(STORAGE_KEYS.consultasPortal, consultasPortal);
  }, [consultasPortal]);

  useEffect(() => {
    saveStoredValue(STORAGE_KEYS.portalConfig, portalConfig);
  }, [portalConfig]);

  useEffect(() => {
    setPortalCache(buildPortalCache(emprendimientos, publicaciones, portalConfig));
  }, [emprendimientos, publicaciones, portalConfig]);

  useEffect(() => {
    saveStoredValue(STORAGE_KEYS.portalCache, portalCache);
  }, [portalCache]);

  useEffect(() => {
    saveStoredValue(STORAGE_KEYS.portalViews, portalViews);
  }, [portalViews]);

  useEffect(() => {
    saveStoredValue(STORAGE_KEYS.commissionSettings, commissionSettings);
  }, [commissionSettings]);

  useEffect(() => {
    saveStoredValue(STORAGE_KEYS.portalCommissions, portalCommissions);
  }, [portalCommissions]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    function syncPortalStorage(event) {
      if (event.key === STORAGE_KEYS.publicaciones) {
        setPublicaciones(loadStoredValue(STORAGE_KEYS.publicaciones, exhibicionInicial));
      }
      if (event.key === STORAGE_KEYS.consultasPortal) {
        setConsultasPortal(loadStoredValue(STORAGE_KEYS.consultasPortal, []));
      }
      if (event.key === STORAGE_KEYS.portalConfig) {
        setPortalConfig(loadStoredValue(STORAGE_KEYS.portalConfig, {}));
      }
      if (event.key === STORAGE_KEYS.portalCache) {
        setPortalCache(loadStoredValue(STORAGE_KEYS.portalCache, {}));
      }
      if (event.key === STORAGE_KEYS.portalViews) {
        setPortalViews(loadStoredValue(STORAGE_KEYS.portalViews, {}));
      }
      if (event.key === STORAGE_KEYS.commissionSettings) {
        setCommissionSettings(loadStoredValue(STORAGE_KEYS.commissionSettings, defaultCommissionSettings));
      }
      if (event.key === STORAGE_KEYS.portalCommissions) {
        setPortalCommissions(loadStoredValue(STORAGE_KEYS.portalCommissions, []));
      }
    }
    window.addEventListener("storage", syncPortalStorage);
    return () => window.removeEventListener("storage", syncPortalStorage);
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    const email = loginEmail.trim().toLowerCase();
    const password = loginPassword.trim();
    const matchedUser = usuarios.find((u) => u.email?.toLowerCase() === email);
    const isAdminEmail = adminEmails.includes(email);
    const detectedRole = matchedUser ? matchedUser.rol || "Dueño" : isAdminEmail ? "Super Admin" : null;

    if (!detectedRole) {
      setLoginError("No encontramos ese usuario. Revisá el email o crealo desde Usuarios.");
      return;
    }

    if (matchedUser && matchedUser.password !== password) {
      setLoginError("La contraseña no coincide con ese usuario.");
      return;
    }

    const demoExpired = matchedUser?.demo && matchedUser.demoExpiraOn && isDateExpired(matchedUser.demoExpiraOn);
    if (demoExpired) {
      setCurrentUser(null);
      setExpiredDemoUser(matchedUser);
      setShowDemoExpired(true);
      setIsLoggedIn(false);
      setLoginError("");
      return;
    }

    setLoginError("");
    setCurrentUser(matchedUser || null);
    setDemoRemainingMs(matchedUser?.demo ? getRemainingMs(matchedUser.demoExpiraOn) : 0);
    setLoginRole(detectedRole);
    setIsLoggedIn(true);
    setShowWelcome(detectedRole !== "Super Admin");
    setShowDemoExpired(false);
    setExpiredDemoUser(null);
    setActivePage(detectedRole === "Super Admin" ? "dashboard" : "mi-panel");
    if (matchedUser?.emprendimientoIds?.length) {
      setSelectedEmpId(matchedUser.emprendimientoIds[0]);
    }
  }

  function startQrDemo(empId) {
    const emp = emprendimientos.find((item) => item.id === empId) || emprendimientos[0];
    const baseUser = usuarios.find((item) => item.emprendimientoIds?.includes(emp.id)) || usuarios[0];
    const demoExpiresOn = addMinutesFromNow(qrDemoDurationMinutes);
    const demoUser = {
      ...baseUser,
      id: `QR-DEMO-${emp.id}`,
      nombre: getDemoBaseLabel(emp),
      email: `demo-${emp.id.toLowerCase()}@cremprende.com`,
      rol: "Dueno",
      plan: "Demo",
      estadoPago: "Bonificado",
      emprendimientoIds: [emp.id],
      demo: true,
      demoDuracionMinutos: qrDemoDurationMinutes,
      demoDuracionLabel: "3 horas",
      demoExpiraOn: demoExpiresOn,
      renovadoHasta: formatDateTime(demoExpiresOn),
      commissionNoticeVersion: commissionSettings.version,
    };

    setLoginError("");
    setCurrentUser(demoUser);
    setDemoRemainingMs(getRemainingMs(demoExpiresOn));
    setLoginRole("Dueno");
    setSelectedEmpId(emp.id);
    setIsLoggedIn(true);
    setShowWelcome(true);
    setShowDemoExpired(false);
    setExpiredDemoUser(null);
    setActivePage("mi-panel");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setDemoRemainingMs(0);
    setActivePage("dashboard");
  }

  function closeDemoExpired() {
    setShowDemoExpired(false);
    setExpiredDemoUser(null);
    setCurrentUser(null);
    setDemoRemainingMs(0);
  }

  function updateEmprendimientoSettings(updated) {
    setEmprendimientos((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setSelectedEmpId(updated.id);
  }

  function updateBusinessAccountStatus(empId, status) {
    const nextStatus = accountStatusLabel({ estado: status });
    const today = todayISO();
    const currentEmp = emprendimientos.find((emp) => emp.id === empId);
    const actionByStatus = {
      Activo: "cuenta_reactivada",
      Suspendido: "cuenta_suspendida",
      Eliminado: "cuenta_eliminada",
    };
    setHistorialAdmin((prev) => [
      {
        id: `ADM-${Date.now().toString().slice(-6)}`,
        adminId: "ADMIN-CR-001",
        admin: "Super Administrador",
        emprendimientoId: empId,
        emprendimiento: currentEmp?.nombre || empId,
        accion: actionByStatus[nextStatus] || "estado_modificado",
        detalle: `${currentEmp?.nombre || empId}: ${accountStatusLabel(currentEmp)} -> ${nextStatus}`,
        fecha: new Date().toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" }),
      },
      ...prev,
    ]);
    setEmprendimientos((prev) =>
      prev.map((emp) => {
        if (emp.id !== empId) return emp;
        if (nextStatus === "Suspendido") {
          return { ...emp, estado: "Suspendido", portalVisible: false, fechaSuspension: emp.fechaSuspension || today, fechaEliminacion: null };
        }
        if (nextStatus === "Eliminado") {
          return { ...emp, estado: "Eliminado", portalVisible: false, fechaEliminacion: today };
        }
        return { ...emp, estado: "Activo", portalVisible: true, fechaSuspension: null, fechaEliminacion: null };
      })
    );
  }

  function sendMensaje(nuevo) {
    setMensajes((prev) => [
      {
        id: `MSG-${Date.now().toString().slice(-5)}`,
        fecha: "Ahora",
        estado: "Nuevo",
        respuesta: "",
        fechaRespuesta: "",
        adminId: "ADMIN-CR-001",
        ...nuevo,
      },
      ...prev,
    ]);
  }

  function registerCommercialEvent(evento) {
    setHistorialComercial((prev) => [
      {
        id: `SEG-${Date.now().toString().slice(-6)}`,
        fecha: new Date().toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" }),
        responsable: "Admin C&R",
        ...evento,
      },
      ...prev,
    ]);
  }

  function addPortalConsulta(consulta) {
    setConsultasPortal((prev) => [
      {
        id: `CONS-${Date.now().toString().slice(-6)}`,
        fecha: new Date().toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" }),
        estado: "Nueva",
        ...consulta,
      },
      ...prev,
    ]);
  }

  function updatePortalConsulta(consultaId, changes) {
    setConsultasPortal((prev) => prev.map((consulta) => consulta.id === consultaId ? { ...consulta, ...changes } : consulta));
  }

  function updatePortalConfig(empId, changes) {
    setPortalConfig((prev) => ({
      ...prev,
      [empId]: {
        ...getDefaultPortalConfig(emprendimientos.find((e) => e.id === empId)),
        ...(prev[empId] || {}),
        ...changes,
      },
    }));
  }

  function registerPortalView(empId) {
    setPortalViews((prev) => ({ ...prev, [empId]: Number(prev[empId] || 0) + 1 }));
  }

  function updateCommissionSettings(next) {
    setCommissionSettings((prev) => ({
      ...prev,
      ...next,
      version: Number(prev.version || 1) + 1,
      updatedAt: new Date().toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" }),
    }));
  }

  function markCommissionNoticeSeen(userId) {
    setUsuarios((prev) => prev.map((u) => u.id === userId ? { ...u, commissionNoticeVersion: commissionSettings.version } : u));
    setCurrentUser((prev) => prev?.id === userId ? { ...prev, commissionNoticeVersion: commissionSettings.version } : prev);
  }

  function registerPortalSale(consultaId, saleAmount) {
    const consulta = consultasPortal.find((item) => item.id === consultaId);
    if (!consulta) return;
    const existingMonthTotal = portalCommissions
      .filter((item) => item.emprendimientoId === consulta.emprendimientoId && item.estado !== "Pagada")
      .reduce((acc, item) => acc + Number(item.comision || 0), 0);
    const rawCommission = Math.round(Number(saleAmount || 0) * (Number(commissionSettings.porcentaje || 0) / 100));
    const available = Math.max(0, Number(commissionSettings.limiteMensual || 0) - existingMonthTotal);
    const commission = Math.min(rawCommission, available);
    const sale = {
      id: `COM-${Date.now().toString().slice(-6)}`,
      consultaId,
      emprendimientoId: consulta.emprendimientoId,
      usuario: consulta.nombre,
      publicacionTitulo: consulta.publicacionTitulo,
      venta: Number(saleAmount || 0),
      porcentaje: Number(commissionSettings.porcentaje || 0),
      comision: commission,
      limiteMensual: Number(commissionSettings.limiteMensual || 0),
      estado: "Pendiente",
      fecha: new Date().toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" }),
    };
    setPortalCommissions((prev) => [sale, ...prev]);
    updatePortalConsulta(consultaId, { estado: "Venta concretada", venta: sale.venta, comision: sale.comision });
    registerCommercialEvent({
      usuario: consulta.nombre,
      tipo: "Venta por portal",
      accion: "Venta concretada",
      estado: "Pendiente",
      nota: `${consulta.publicacionTitulo}: venta ${money(sale.venta)}, comisión ${money(sale.comision)} (${sale.porcentaje}%).`,
    });
  }

  function replyMensaje(mensajeId, respuesta) {
    setMensajes((prev) =>
      prev.map((m) =>
        m.id === mensajeId
          ? {
              ...m,
              respuesta,
              estado: "Respondido",
              fechaRespuesta: "Ahora",
              respondidoPor: "C&R Soporte",
              adminId: "ADMIN-CR-001",
            }
          : m
      )
    );
  }

  function addMonthsFromToday(months) {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString("es-AR");
  }

  function isDateExpired(dateText) {
    const date = parseEsDate(dateText);
    if (!date) return false;
    if (!String(dateText).includes("T")) {
      date.setHours(23, 59, 59, 999);
    }
    return new Date() > date;
  }

  function renewUser(userId, months) {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, renovadoHasta: addMonthsFromToday(months), renovaciones: (u.renovaciones || 0) + 1, estado: "Activo" }
          : u
      )
    );
  }

  function changeUserPassword(userId, newPassword) {
    const current = usuarios.find((u) => u.id === userId);
    const nextCount = (current?.cambiosPassword || 0) + 1;
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, password: newPassword, cambiosPassword: nextCount }
          : u
      )
    );
    return nextCount;
  }

  if (portalEmpIdFromUrl) {
    const livePortal = buildPortalCache(emprendimientos, publicaciones, portalConfig)[portalEmpIdFromUrl];
    const cachedPortal = portalCache[portalEmpIdFromUrl]
      ? { ...portalCache[portalEmpIdFromUrl], emp: { ...portalCache[portalEmpIdFromUrl].emp, ...(livePortal?.emp || {}) } }
      : livePortal;
    return (
      <PortalPublico
        emp={cachedPortal?.emp}
        publicaciones={cachedPortal?.publicaciones || []}
        config={cachedPortal?.config}
        cacheInfo={cachedPortal}
        onConsulta={addPortalConsulta}
        onView={registerPortalView}
      />
    );
  }

  if (!isLoggedIn && isDemoAccessFromUrl) {
    return (
      <>
        <DemoAccessScreen emprendimientos={emprendimientos} onStartDemo={startQrDemo} onBack={() => {
          if (typeof window !== "undefined") window.location.href = window.location.pathname.replace(/\/demoCR\/?$/i, "/");
        }} />
        {showDemoExpired && expiredDemoUser && <DemoExpiredModal user={expiredDemoUser} onClose={closeDemoExpired} />}
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <LoginScreen email={loginEmail} setEmail={setLoginEmail} password={loginPassword} setPassword={setLoginPassword} error={loginError} onLogin={handleLogin} />
        {showDemoExpired && expiredDemoUser && <DemoExpiredModal user={expiredDemoUser} onClose={closeDemoExpired} />}
      </>
    );
  }

  return (
    <div className={`min-h-screen text-white flex bg-[#07111f] app-shell ${!isAdmin ? `theme-${selectedEmp.apariencia || "claro"} palette-${selectedEmp.paleta || "vivos"}` : "theme-admin"}`}>
      <aside className="hidden md:flex w-72 glass-panel border-r border-blue-500/20 p-5 flex-col sticky top-0 h-screen overflow-y-auto">
        <SidebarBrand isAdmin={isAdmin} emp={selectedEmp} />
        <nav className="space-y-1.5 flex-1 pb-4">
          {isAdmin ? (
            <>
              <SidebarButton active={activePage === "dashboard"} icon={<LayoutDashboard />} label="Dashboard" onClick={() => setActivePage("dashboard")} />
              <SidebarButton active={activePage === "usuarios"} icon={<Users />} label="Usuarios" onClick={() => setActivePage("usuarios")} />
              <SidebarButton active={activePage === "emprendimientos"} icon={<Building2 />} label="Emprendimientos" onClick={() => setActivePage("emprendimientos")} />
              <SidebarButton active={activePage === "suspendidos"} icon={<AlertTriangle />} label="Suspendidos" onClick={() => setActivePage("suspendidos")} />
              <SidebarButton active={activePage === "estadisticas"} icon={<LayoutDashboard />} label="Estadísticas" onClick={() => setActivePage("estadisticas")} />
              <SidebarButton active={activePage === "rubros"} icon={<Boxes />} label="Rubros" onClick={() => setActivePage("rubros")} />
              <SidebarButton active={activePage === "modulos"} icon={<Settings />} label="Módulos" onClick={() => setActivePage("modulos")} />
              <SidebarButton active={activePage === "planes"} icon={<CreditCard />} label="Planes" onClick={() => setActivePage("planes")} />
              <SidebarButton active={activePage === "suscripciones"} icon={<DollarSign />} label="Finanzas" onClick={() => setActivePage("suscripciones")} />
              <SidebarButton active={activePage === "soporte"} icon={<ShieldCheck />} label="Soporte remoto" onClick={() => setActivePage("soporte")} />
              <SidebarButton active={activePage === "mensajes"} icon={<Mail />} label="Mensajes" onClick={() => setActivePage("mensajes")} />
              <SidebarButton active={activePage === "historial"} icon={<ClipboardList />} label="Historial" onClick={() => setActivePage("historial")} />
              <SidebarButton active={activePage === "configuracion-admin"} icon={<Settings />} label="Configuración" onClick={() => setActivePage("configuracion-admin")} />
            </>
          ) : (
            <>
              <SidebarButton active={activePage === "mi-panel"} icon={<LayoutDashboard />} label="Mi panel" onClick={() => setActivePage("mi-panel")} />
              <SidebarButton active={activePage === "productos"} icon={<Package />} label="Productos" onClick={() => setActivePage("productos")} />
              <SidebarButton active={activePage === "insumos"} icon={<Boxes />} label="Insumos" onClick={() => setActivePage("insumos")} />
              <SidebarButton active={activePage === "proveedores"} icon={<Building2 />} label="Proveedores" onClick={() => setActivePage("proveedores")} />
              <SidebarButton active={activePage === "recetas"} icon={<ClipboardList />} label="Producción / Recetas" onClick={() => setActivePage("recetas")} />
              <SidebarButton active={activePage === "clientes"} icon={<Users />} label="Clientes" onClick={() => setActivePage("clientes")} />
              <SidebarButton active={activePage === "exhibicion"} icon={<Eye />} label="Exhibición" onClick={() => setActivePage("exhibicion")} />
              <SidebarButton active={activePage === "presupuestos"} icon={<CreditCard />} label="Presupuestos" onClick={() => setActivePage("presupuestos")} />
              <SidebarButton active={activePage === "pedidos"} icon={<ShoppingBag />} label="Pedidos" onClick={() => setActivePage("pedidos")} />
              <SidebarButton active={activePage === "finanzas"} icon={<DollarSign />} label="Finanzas" onClick={() => setActivePage("finanzas")} />
              <SidebarButton active={activePage === "reportes"} icon={<LayoutDashboard />} label="Reportes" onClick={() => setActivePage("reportes")} />
              <SidebarButton active={activePage === "whatsapp"} icon={<MessageCircle />} label="WhatsApp" onClick={() => setActivePage("whatsapp")} />
              <SidebarButton active={activePage === "mensajes"} icon={<Mail />} label="Mensajes con administrador" onClick={() => setActivePage("mensajes")} />
              <SidebarButton active={activePage === "configuracion"} icon={<Palette />} label="Configuración" onClick={() => setActivePage("configuracion")} />
            </>
          )}
        </nav>
        <div className="mt-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 p-4">
          <p className="text-sm font-bold text-sky-300">Sesión</p>
          <p className="text-xs text-slate-200 mt-1">Rol: {loginRole}</p>
          {!isAdmin && <p className="text-xs text-slate-300 mt-1">ID: {selectedEmp.id}</p>}
          {!isAdmin && currentUser?.demo && <DemoCountdownCard remainingMs={demoRemainingMs} expiresOn={currentUser.demoExpiraOn} />}
          <Button onClick={handleLogout} className="w-full mt-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white">
            <LogOut className="w-4 h-4 mr-2" /> Salir
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <div className="w-full space-y-6">
          <MobileTopNav
            isAdmin={isAdmin}
            emp={selectedEmp}
            activePage={activePage}
            setActivePage={setActivePage}
            currentUser={currentUser}
            demoRemainingMs={demoRemainingMs}
            onLogout={handleLogout}
          />
          {!isAdmin && currentUser?.demo && <DemoCountdownBanner remainingMs={demoRemainingMs} expiresOn={currentUser.demoExpiraOn} />}
          {isSupportSession && <SupportSessionBanner emp={selectedEmp} />}
          {!isAdmin && !isSupportSession && selectedEmp?.soporteRemoto?.habilitado && <ClientSupportActiveBanner emp={selectedEmp} />}

          {isAdmin && activePage === "dashboard" && <AdminDashboard emprendimientos={emprendimientos} usuarios={usuarios} rubros={rubros} planes={planes} setActivePage={setActivePage} onRegisterCommercialEvent={registerCommercialEvent} />}
          {isAdmin && activePage === "usuarios" && <UsuariosPage usuarios={usuarios} emprendimientos={emprendimientos} onNewUser={() => setIsUserModalOpen(true)} onRenewUser={renewUser} onChangePassword={changeUserPassword} />}
          {isAdmin && activePage === "emprendimientos" && <EmprendimientosPage emprendimientos={filteredEmprendimientos} search={search} setSearch={setSearch} onNewBusiness={() => setIsBusinessWizardOpen(true)} onChangeAccountStatus={updateBusinessAccountStatus} setSelectedEmpId={setSelectedEmpId} setActivePage={setActivePage} />}
          {isAdmin && activePage === "suspendidos" && <SuspendidosPage emprendimientos={emprendimientos} onChangeAccountStatus={updateBusinessAccountStatus} />}
          {isAdmin && activePage === "estadisticas" && <EstadisticasAdminPage emprendimientos={emprendimientos} publicaciones={publicaciones} consultasPortal={consultasPortal} portalViews={portalViews} portalCommissions={portalCommissions} />}
          {isAdmin && activePage === "rubros" && <RubrosManagerPage rubros={rubros} modules={modulesBase} onChange={setRubros} />}
          {isAdmin && activePage === "modulos" && <ModulosPage modules={modulesBase} rubros={rubros} />}
          {isAdmin && activePage === "planes" && <PlanesPage planes={planes} />}
          {isAdmin && activePage === "suscripciones" && <SuscripcionesPage emprendimientos={emprendimientos} planes={planes} historialComercial={historialComercial} commissionSettings={commissionSettings} portalCommissions={portalCommissions} />}
          {isAdmin && activePage === "soporte" && <SoporteAdminPage emprendimientos={emprendimientos} setSelectedEmpId={setSelectedEmpId} setActivePage={setActivePage} />}
          {isAdmin && activePage === "mensajes" && <MensajesAdminPage mensajes={mensajes} emprendimientos={emprendimientos} onReply={replyMensaje} />}
          {isAdmin && activePage === "historial" && <HistorialAdminPage historial={historialAdmin} />}
          {isAdmin && activePage === "configuracion-admin" && <ConfiguracionAdminPage commissionSettings={commissionSettings} onUpdateCommissionSettings={updateCommissionSettings} demoUrl={getDemoAccessUrl()} />}

          {!isAdmin && isUserAccountBlocked && <BlockedAccountNotice emp={selectedEmp} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "mi-panel" && <ClienteDashboard emp={selectedEmp} setActivePage={setActivePage} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "productos" && <ClienteProductos emp={selectedEmp} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "insumos" && <ClienteInsumos emp={selectedEmp} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "proveedores" && <ClienteProveedores emp={selectedEmp} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "recetas" && <ClienteRecetas emp={selectedEmp} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "clientes" && <ClienteClientes emp={selectedEmp} potenciales={consultasPortal.filter((consulta) => consulta.emprendimientoId === selectedEmp.id && consulta.estado === "Potencial")} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "exhibicion" && <ClienteExhibicion emp={selectedEmp} publicaciones={publicaciones.filter((item) => item.emprendimientoId === selectedEmp.id)} consultas={consultasPortal.filter((consulta) => consulta.emprendimientoId === selectedEmp.id)} portalConfig={portalConfig[selectedEmp.id] || getDefaultPortalConfig(selectedEmp)} portalViews={portalViews[selectedEmp.id] || 0} portalCacheInfo={portalCache[selectedEmp.id]} commissionSettings={commissionSettings} portalCommissions={portalCommissions.filter((item) => item.emprendimientoId === selectedEmp.id)} setPublicaciones={setPublicaciones} onUpdateConsulta={updatePortalConsulta} onUpdatePortalConfig={updatePortalConfig} onRegisterSale={registerPortalSale} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "presupuestos" && <ClientePresupuestos emp={selectedEmp} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "pedidos" && <ClientePedidos emp={selectedEmp} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "finanzas" && <ClienteFinanzas emp={selectedEmp} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "reportes" && <ClienteReportes emp={selectedEmp} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "whatsapp" && <ClienteWhatsApp emp={selectedEmp} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "configuracion" && <ClienteConfiguracion emp={selectedEmp} updateEmp={updateEmprendimientoSettings} plan={planes.find((p) => p.nombre === selectedEmp.plan)} />}
          {!isAdmin && !isUserAccountBlocked && activePage === "mensajes" && <ClienteMensajesPage emp={selectedEmp} mensajes={mensajes.filter((m) => m.emprendimientoId === selectedEmp.id)} onSend={sendMensaje} />}

          {isAdmin && activePage === "vista-cliente" && <ClienteDashboard emp={selectedEmp} adminView onBack={() => setActivePage("soporte")} />}
        </div>
      </main>

      {showDemoExpired && !isAdmin && expiredDemoUser && <DemoExpiredModal user={expiredDemoUser} onClose={closeDemoExpired} />}
      {showWelcome && !isAdmin && !isUserAccountBlocked && <WelcomeModal emp={selectedEmp} onClose={() => setShowWelcome(false)} onMessages={() => { setShowWelcome(false); setActivePage("mensajes"); }} />}
      {!isAdmin && !isUserAccountBlocked && currentUser && commissionSettings.updatedAt && (currentUser.commissionNoticeVersion || 0) < commissionSettings.version && <CommissionNoticeModal settings={commissionSettings} onClose={() => markCommissionNoticeSeen(currentUser.id)} />}
      {isBusinessWizardOpen && <BusinessWizard rubros={rubros} planes={planes} modules={modulesBase} onClose={() => setIsBusinessWizardOpen(false)} onCreate={(nuevo) => { setEmprendimientos((prev) => [nuevo, ...prev]); setIsBusinessWizardOpen(false); setActivePage("emprendimientos"); }} />}
      {isUserModalOpen && <UsuarioModal rubros={rubros} planes={planes} onClose={() => setIsUserModalOpen(false)} onCreate={(nuevo) => { setUsuarios((prev) => [nuevo, ...prev]); setIsUserModalOpen(false); }} />}
    </div>
  );
}

function SidebarBrand({ isAdmin, emp }) {
  const isImageLogo = !isAdmin && emp?.logo && (emp.logo.startsWith("http") || emp.logo.startsWith("/") || emp.logo.startsWith("data:"));

  if (isAdmin) {
    return (
      <div className="mb-8 rounded-[1.5rem] bg-white p-4 shadow-2xl shadow-blue-600/20 border border-blue-500/10">
        <img src="/logo-cr.png" alt="C&R Emprende" className="w-full max-h-36 object-contain" />
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/25 p-5 text-center shadow-2xl shadow-blue-900/20">
      <div className="mx-auto h-36 w-36 rounded-[2rem] bg-blue-500/15 border border-blue-400/25 flex items-center justify-center overflow-hidden mb-4">
        {isImageLogo ? <img src={emp.logo} alt={emp.nombre} className="h-full w-full object-cover" /> : <span className="text-5xl font-black text-sky-300">{emp?.logo || emp?.nombre?.slice(0,2) || "E"}</span>}
      </div>
      <p className="text-lg font-black text-white leading-tight">{emp?.nombre}</p>
    </div>
  );
}

function DemoCountdownCard({ remainingMs, expiresOn }) {
  const isEndingSoon = remainingMs <= 5 * 60 * 1000;
  return (
    <div className={`mt-3 rounded-2xl border p-3 ${isEndingSoon ? "border-amber-300/30 bg-amber-400/10" : "border-cyan-300/20 bg-cyan-500/10"}`}>
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-white">
        <Clock className="w-4 h-4" />
        Demo activo
      </div>
      <p className={`mt-2 text-2xl font-black tabular-nums ${isEndingSoon ? "text-amber-300" : "text-cyan-200"}`}>{formatRemaining(remainingMs)}</p>
      <p className="mt-1 text-[11px] leading-snug text-slate-300">Finaliza {formatDateTime(expiresOn)}</p>
    </div>
  );
}

const adminMobileNavItems = [
  ["dashboard", "Dashboard"],
  ["usuarios", "Usuarios"],
  ["emprendimientos", "Emprendimientos"],
  ["suspendidos", "Suspendidos"],
  ["estadisticas", "Estadisticas"],
  ["rubros", "Rubros"],
  ["modulos", "Modulos"],
  ["planes", "Planes"],
  ["suscripciones", "Finanzas"],
  ["soporte", "Soporte remoto"],
  ["mensajes", "Mensajes"],
  ["historial", "Historial"],
  ["configuracion-admin", "Configuracion"],
];

const clientMobileNavItems = [
  ["mi-panel", "Mi panel"],
  ["productos", "Productos"],
  ["insumos", "Insumos"],
  ["proveedores", "Proveedores"],
  ["recetas", "Produccion / Recetas"],
  ["clientes", "Clientes"],
  ["exhibicion", "Exhibicion"],
  ["presupuestos", "Presupuestos"],
  ["pedidos", "Pedidos"],
  ["finanzas", "Finanzas"],
  ["reportes", "Reportes"],
  ["whatsapp", "WhatsApp"],
  ["mensajes", "Mensajes"],
  ["configuracion", "Configuracion"],
];

function MobileTopNav({ isAdmin, emp, activePage, setActivePage, currentUser, demoRemainingMs, onLogout }) {
  const items = isAdmin ? adminMobileNavItems : clientMobileNavItems;
  const activeLabel = items.find(([id]) => id === activePage)?.[1] || "Panel";
  const isImageLogo = !isAdmin && emp?.logo && (emp.logo.startsWith("http") || emp.logo.startsWith("/") || emp.logo.startsWith("data:"));

  return (
    <div className="md:hidden sticky top-0 z-40 -mx-4 -mt-4 mb-2 border-b border-blue-500/20 bg-slate-950/95 px-4 py-3 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-12 w-12 rounded-2xl bg-white border border-blue-500/20 flex items-center justify-center overflow-hidden shrink-0">
            {isAdmin ? (
              <img src="/logo-cr.png" alt="C&R Emprende" className="h-10 w-10 object-contain" />
            ) : isImageLogo ? (
              <img src={emp.logo} alt={emp.nombre} className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-black text-blue-950">{emp?.logo || "CR"}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-wide text-sky-300">{isAdmin ? "Admin C&R" : emp?.nombre}</p>
            <p className="text-sm font-black text-white truncate">{activeLabel}</p>
          </div>
        </div>
        <Button type="button" onClick={onLogout} className="rounded-xl bg-slate-800 text-white px-3 py-2">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
        <select value={activePage} onChange={(event) => setActivePage(event.target.value)} className="w-full rounded-2xl border border-blue-500/25 bg-slate-900 px-3 py-3 text-sm font-bold text-white outline-none focus:border-sky-300">
          {items.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </select>
        {!isAdmin && currentUser?.demo && (
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-500/10 px-3 py-2 text-right">
            <p className="text-[10px] font-black uppercase tracking-wide text-cyan-200">Demo</p>
            <p className="text-sm font-black tabular-nums text-white">{formatRemaining(demoRemainingMs)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function BlockedAccountNotice({ emp }) {
  const status = accountStatusLabel(emp);
  const suspendedDays = getSuspendedDays(emp);
  const isDeleted = status === "Eliminado";

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className={`w-full max-w-3xl rounded-[2rem] border p-7 shadow-2xl ${isDeleted ? "bg-red-50 border-red-200 shadow-red-900/10" : "bg-amber-50 border-amber-200 shadow-amber-900/10"}`}>
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border ${isDeleted ? "bg-red-600 border-red-700 text-white" : "bg-amber-500 border-amber-600 text-white"}`}>
            {isDeleted ? <Lock className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
          </div>
          <div className="flex-1">
            <p className={`text-xs font-black uppercase tracking-[0.16em] ${isDeleted ? "text-red-700" : "text-amber-700"}`}>Cuenta {status.toLowerCase()}</p>
            <h1 className="text-3xl font-black text-slate-950 mt-2">{emp?.nombre || "Emprendimiento"}</h1>
            <p className="text-slate-700 font-semibold mt-3">
              {isDeleted
                ? "Esta cuenta fue eliminada y no tiene acceso operativo al panel."
                : "Tu cuenta se encuentra suspendida. Para reactivar el servicio, comunicate con C&R Emprende."}
            </p>
            {!isDeleted && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
                <InfoPill label="Fecha suspension" value={emp?.fechaSuspension ? isoToEsDate(emp.fechaSuspension) : "Pendiente"} />
                <InfoPill label="Dias suspendido" value={suspendedDays} />
                <InfoPill label="Portal publico" value="Oculto" />
              </div>
            )}
            {!isDeleted && suspendedDays >= 85 && (
              <div className="mt-5 rounded-2xl bg-red-600 text-white p-4 font-bold">
                Aviso importante: la cuenta esta cerca del limite de 90 dias de suspension.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoPill({ label, value }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-xl font-black text-slate-950 mt-1">{value}</p>
    </div>
  );
}

function DemoCountdownBanner({ remainingMs, expiresOn }) {
  const isEndingSoon = remainingMs <= 5 * 60 * 1000;
  return (
    <div className={`rounded-[1.5rem] border p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${isEndingSoon ? "border-amber-300/30 bg-amber-400/10" : "border-cyan-300/20 bg-cyan-500/10"}`}>
      <div className="flex items-center gap-3">
        <div className={`h-11 w-11 rounded-2xl border flex items-center justify-center ${isEndingSoon ? "border-amber-300/30 bg-amber-400/15 text-amber-200" : "border-cyan-300/20 bg-cyan-400/15 text-cyan-200"}`}>
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-300">Demo activo</p>
          <p className="text-sm text-slate-100">La sesión se cerrará automáticamente al finalizar el tiempo.</p>
        </div>
      </div>
      <div className="md:text-right">
        <p className={`text-2xl font-black tabular-nums ${isEndingSoon ? "text-amber-300" : "text-cyan-200"}`}>{formatRemaining(remainingMs)}</p>
        <p className="text-xs text-slate-300">Finaliza {formatDateTime(expiresOn)}</p>
      </div>
    </div>
  );
}

function CommissionNoticeModal({ settings, onClose }) {
  return (
    <ModalShell eyebrow="Condiciones del portal" title="Actualización de comisión" onClose={onClose}>
      <div className="p-5 space-y-4">
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
          Se actualizaron las condiciones comerciales del portal de exhibición. La comisión vigente es de <b>{settings.porcentaje}%</b> por venta concretada desde el portal, con un límite mensual de <b>{money(settings.limiteMensual)}</b>.
        </div>
        {settings.updatedAt && <p className="text-sm text-slate-300">Última actualización: {settings.updatedAt}</p>}
        <Button type="button" onClick={onClose} className="w-full bg-blue-500 text-black">Entendido</Button>
      </div>
    </ModalShell>
  );
}

function LoginScreen({ email, setEmail, password, setPassword, error, onLogin }) {
  const loginBenefits = [
    {
      icon: <ShieldCheck />,
      label: "Datos seguros",
      value: "Separados por emprendimiento",
      className: "from-sky-500 via-blue-600 to-cyan-500 shadow-sky-950/40",
    },
    {
      icon: <Palette />,
      label: "Rubros adaptados",
      value: "Gastronomía, imprenta, indumentaria y más",
      className: "from-violet-500 via-fuchsia-600 to-pink-500 shadow-fuchsia-950/40",
    },
    {
      icon: <CreditCard />,
      label: "Planes claros",
      value: "Básico, Pro y Elite",
      className: "from-amber-400 via-orange-500 to-rose-500 shadow-orange-950/40",
    },
  ];

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(2,6,23,.56), rgba(2,6,23,.84)), url('/fondo-saas.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,.25),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(168,85,247,.20),transparent_28%)]" />
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] rounded-[2.2rem] overflow-hidden glass-panel relative z-10 shadow-2xl shadow-blue-950/40 border border-white/10">
        <div className="p-7 md:p-10 bg-gradient-to-br from-sky-100 via-blue-50 to-emerald-50">
          <div className="flex justify-center">
            <div className="relative inline-flex rounded-[1.5rem] bg-sky-50 px-5 py-3 shadow-2xl shadow-blue-600/15 border border-sky-200 overflow-hidden">
              <img src="/logo-cr.png" alt="C&R Emprende" className="h-44 w-auto object-contain" />
              <span className="absolute left-4 top-6 z-10 -rotate-[16deg] rounded-full bg-gradient-to-r from-fuchsia-500 via-sky-400 to-emerald-300 px-6 py-1.5 text-xl font-black uppercase tracking-[0.18em] text-white shadow-2xl shadow-fuchsia-900/35 ring-2 ring-white/80">
                Emprende
              </span>
            </div>
          </div>

          <div className="mt-8 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-blue-950">Gestión simple para emprendedores reales</h1>
          </div>

          <div className="space-y-3 mt-8">
            {loginBenefits.map((item) => (
              <div key={item.label} className={`rounded-2xl bg-gradient-to-br ${item.className} px-4 py-3 border border-white/20 shadow-xl text-white transition-transform hover:-translate-y-0.5 flex items-center gap-4`}>
                <div className="w-11 h-11 rounded-2xl bg-white/18 border border-white/25 flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">{item.label}</p>
                  <p className="text-sm font-semibold mt-1 leading-snug text-white/95">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={onLogin} className="p-8 md:p-10 bg-slate-900/88 space-y-5 backdrop-blur-xl flex flex-col justify-center">
          <div>
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-400 text-white flex items-center justify-center mb-4 shadow-xl shadow-blue-500/25"><LogIn className="w-8 h-8" /></div>
            <h2 className="text-3xl font-black text-white">Ingresar</h2>
            <div className="mt-4 rounded-3xl border border-white/10 bg-white/8 p-4 shadow-inner shadow-slate-950/30">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-200">Tu logo, tu negocio, tu control</p>
            </div>
          </div>
          {error && <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-sm font-bold text-red-300">{error}</div>}
          <InputField icon={<Users />} label="Usuario" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@cremprende.com" />
          <InputField icon={<KeyRound />} label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          <div className="rounded-2xl border border-sky-300/20 bg-sky-500/10 p-4 shadow-inner shadow-sky-950/30">
            <p className="text-sm text-slate-100">Modo prototipo: los usuarios cargados entran con su email y contraseña temporal. El correo administrador de C&R entra al panel principal.</p>
          </div>
          <Button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 text-slate-950 hover:scale-[1.01] py-6 font-black shadow-xl shadow-sky-950/30">Ingresar</Button>
          <Button type="button" onClick={() => {
            if (typeof window !== "undefined") window.location.href = getDemoAccessUrl();
          }} className="w-full rounded-2xl bg-white/10 border border-white/15 text-white py-4">
            <QrCode className="w-4 h-4 mr-2" /> Probar demo
          </Button>
        </form>
      </div>
    </div>
  );
}

function DemoAccessScreen({ emprendimientos, onStartDemo, onBack }) {
  const demoBases = qrDemoBaseIds
    .map((id) => emprendimientos.find((emp) => emp.id === id))
    .filter(Boolean);
  const [selectedId, setSelectedId] = useState(demoBases[0]?.id || "");

  const selected = demoBases.find((emp) => emp.id === selectedId) || demoBases[0];

  return (
    <div className="min-h-screen text-white bg-slate-950 p-4 md:p-8 relative overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(2,6,23,.72), rgba(2,6,23,.92)), url('/fondo-saas.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(14,165,233,.24),transparent_32%)]" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white p-3 shadow-xl shadow-blue-950/30">
              <img src="/logo-cr.png" alt="C&R Emprende" className="h-16 w-auto object-contain" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Demo emprendedor</p>
              <h1 className="text-3xl md:text-5xl font-black mt-1">Probá C&R Emprende</h1>
            </div>
          </div>
          <Button type="button" onClick={onBack} className="bg-slate-800 text-white border border-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al ingreso
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_.8fr] gap-5">
          <Card>
            <CardContent className="p-6 md:p-8 space-y-6">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-300">Elegí una base</p>
                <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Entrá con datos precargados por rubro</h2>
                <p className="text-slate-200 mt-3">La demo dura 3 horas. Vas a poder recorrer panel, productos, insumos, recetas, clientes, exhibición y portal según el rubro elegido.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {demoBases.map((emp) => {
                  const active = selected?.id === emp.id;
                  return (
                    <button key={emp.id} type="button" onClick={() => setSelectedId(emp.id)} className={`rounded-3xl border p-4 text-left transition ${active ? "border-cyan-300 bg-cyan-500/15 shadow-xl shadow-cyan-950/20" : "border-white/10 bg-slate-950/70 hover:border-sky-300/40"}`}>
                      <p className="text-white font-black">{getDemoBaseLabel(emp)}</p>
                      <p className="text-sm text-slate-300 mt-1">{emp.nombre}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge>{emp.actividad}</Badge>
                        <Badge>{emp.plan}</Badge>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-5">
                <p className="text-xs font-black uppercase tracking-wide text-sky-300">Base seleccionada</p>
                <h3 className="text-xl font-black text-white mt-2">{selected?.nombre}</h3>
                <p className="text-sm text-slate-200 mt-1">{selected?.rubro} · {selected?.actividad}</p>
              </div>

              <Button type="button" onClick={() => selected && onStartDemo(selected.id)} className="w-full rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 text-slate-950 py-5 font-black">
                Ingresar a demo por 3 horas
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-5">
              <div className="rounded-[1.75rem] bg-white p-5">
                <img src="/logo-cr.png" alt="C&R Emprende" className="h-24 w-auto object-contain mx-auto" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Sos emprendedor?</h2>
                <p className="text-slate-200 mt-3 leading-relaxed">Te ayudamos a ordenar productos, costos, stock, clientes, presupuestos y tu portal de exhibición para vender con más control.</p>
              </div>
              <div className="space-y-3">
                <ArchitectureRow icon={<Package />} title="Productos y stock" text="Probá productos, costos y precios de venta sugeridos." />
                <ArchitectureRow icon={<Globe />} title="Portal público" text="Mostrá publicaciones y recibí consultas con WhatsApp." />
                <ArchitectureRow icon={<Clock />} title="Demo temporal" text="Acceso de 3 horas, con cierre automático al vencer." />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PortalPublico({ emp, publicaciones, config, cacheInfo, onConsulta, onView }) {
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [form, setForm] = useState({ nombre: "", whatsapp: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (emp?.id) onView(emp.id);
  }, [emp?.id]);

  useEffect(() => {
    if (!emp) return;
    document.title = `${emp.nombre} | Portal C&R Emprende`;
    const description = config?.descripcion || getDefaultPortalConfig(emp).descripcion;
    const image = emp.logo?.startsWith("data:") || emp.logo?.startsWith("http") || emp.logo?.startsWith("/") ? emp.logo : "/logo-cr.png";
    [
      ["property", "og:title", emp.nombre],
      ["property", "og:description", description],
      ["property", "og:image", image],
      ["name", "description", description],
    ].forEach(([attr, key, content]) => {
      let meta = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    });
  }, [emp, config]);

  if (!emp) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-md rounded-3xl border border-red-400/20 bg-red-400/10 p-6 text-center">
          <h1 className="text-2xl font-black">Portal no encontrado</h1>
          <p className="text-slate-200 mt-2">El link no corresponde a un emprendimiento activo.</p>
        </div>
      </div>
    );
  }

  const status = accountStatusLabel(emp);

  if (status === "Eliminado") {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-md rounded-3xl border border-red-400/20 bg-red-400/10 p-6 text-center">
          <h1 className="text-2xl font-black">Portal no disponible</h1>
          <p className="text-slate-200 mt-2">Este portal ya no se encuentra activo.</p>
        </div>
      </div>
    );
  }

  if (status === "Suspendido" || emp.portalVisible === false) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-xl rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6 text-center">
          <h1 className="text-2xl font-black">Este emprendimiento no esta disponible actualmente.</h1>
          <p className="text-slate-200 mt-2">El portal publico queda oculto hasta que la cuenta vuelva a estar activa.</p>
        </div>
      </div>
    );
  }

  function openConsult(publication) {
    setSelectedPublication(publication);
    setForm({ nombre: "", whatsapp: "", mensaje: `Hola, me interesa ${publication.titulo}.` });
    setSent(false);
  }

  function submitConsult(event) {
    event.preventDefault();
    if (!selectedPublication || !form.nombre.trim() || !form.whatsapp.trim()) return;
    onConsulta({
      emprendimientoId: emp.id,
      publicacionId: selectedPublication.id,
      publicacionTitulo: selectedPublication.titulo,
      nombre: form.nombre.trim(),
      whatsapp: form.whatsapp.trim(),
      mensaje: form.mensaje.trim() || `Consulta por ${selectedPublication.titulo}`,
    });
    setSent(true);
  }

  const theme = getPortalTheme(config?.color);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative min-h-[230px] overflow-hidden border-b border-white/10 px-5 py-4 md:px-10 md:py-6" style={{ backgroundImage: `linear-gradient(90deg, rgba(2,6,23,.88), ${theme.overlay}), url('${config?.bannerImage || "/fondo-saas.png"}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="w-full">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2">
              <img src="/logo-cr.png" alt="C&R Emprende" className="h-12 w-auto rounded bg-white/90 px-2" />
              <span className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">Emprende</span>
            </div>
            <div className="flex h-32 w-32 md:h-44 md:w-44 items-center justify-center overflow-hidden rounded-[2rem] border border-white/15 bg-white/12 text-4xl md:text-5xl font-black text-white">
              {emp.logo?.startsWith("/") || emp.logo?.startsWith("http") || emp.logo?.startsWith("data:") ? <img src={emp.logo} alt={emp.nombre} className="h-full w-full object-cover" /> : emp.logo || emp.nombre.slice(0, 2)}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-center gap-6 text-center">
            <div className="mx-auto">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-300">Portal de exhibición</p>
              <h1 className="mt-2 text-4xl md:text-6xl font-black text-white">{emp.nombre}</h1>
              <p className="mt-3 max-w-3xl text-base md:text-lg font-semibold text-slate-100">{config?.descripcion || getDefaultPortalConfig(emp).descripcion}</p>
              <p className="mt-2 text-sm text-slate-400">{emp.rubro} · {emp.actividad}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 text-sm text-slate-100 md:absolute md:bottom-6 md:left-10 min-w-[210px] text-left">
              <p className="font-black text-white">Contacto</p>
              <p className="mt-1">{emp.whatsapp || "WhatsApp pendiente"}</p>
              <p>{emp.instagram || ""}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="w-full p-4 md:p-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {publicaciones.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
              <PublicacionImage item={item} />
              <div className="p-5 space-y-3">
                <p className="text-xs font-black uppercase tracking-wide text-sky-300">{item.categoria}</p>
                <h2 className="text-xl font-black">{item.titulo}</h2>
                <p className="text-sm text-slate-300">{item.descripcion}</p>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-emerald-300 font-black">{item.precio ? money(item.precio) : "Consultar"}</p>
                  <Button type="button" onClick={() => openConsult(item)} className="bg-blue-500 text-black">Consultar</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!publicaciones.length && <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 text-slate-300">Este portal todavía no tiene publicaciones visibles.</div>}
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-6 text-center text-sm font-bold text-slate-500">
          Espacio reservado para sponsors / publicidad
        </div>
      </main>

      {selectedPublication && (
        <ModalShell eyebrow="Consulta" title={selectedPublication.titulo} onClose={() => setSelectedPublication(null)}>
          {sent ? (
            <div className="p-5 space-y-4">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-200 font-bold">
                Consulta enviada. El emprendimiento va a responderte por WhatsApp.
              </div>
              <Button type="button" onClick={() => setSelectedPublication(null)} className="w-full bg-blue-500 text-black">Cerrar</Button>
            </div>
          ) : (
            <form onSubmit={submitConsult} className="p-5 space-y-4">
              <InputField icon={<Users />} label="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
              <InputField icon={<Phone />} label="WhatsApp" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="Ej: 2974 123456" required />
              <div>
                <label className="text-sm font-bold text-slate-200 mb-2 block">Consulta</label>
                <textarea value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} className="w-full min-h-[120px] rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400" />
              </div>
              <Button type="submit" className="w-full bg-blue-500 text-black">Enviar consulta</Button>
            </form>
          )}
        </ModalShell>
      )}
    </div>
  );
}

function AdminDashboard({ emprendimientos, usuarios, rubros, planes, setActivePage, onRegisterCommercialEvent }) {
  const [alertStates, setAlertStates] = useState({});
  const [alertNotice, setAlertNotice] = useState("");
  const elite = emprendimientos.filter((e) => e.plan === "Elite").length;
  const usuariosDemo = usuarios.filter((u) => u.demo).length;
  const usuariosPendientes = usuarios.filter((u) => (u.estadoPago || "Pendiente") === "Pendiente").length;
  const usuariosSinEmprendimiento = usuarios.filter((u) => !(u.emprendimientoIds || []).length).length;
  const usuariosPorRubro = rubros.map((rubro) => ({
    label: rubro.nombre,
    value: usuarios.filter((u) => u.rubro === rubro.nombre).length,
  }));
  const usuariosSinRubro = usuarios.filter((u) => !u.rubro).length;
  if (usuariosSinRubro) usuariosPorRubro.push({ label: "Sin rubro", value: usuariosSinRubro });
  const emprendedoresActivos = emprendimientos.filter((e) => accountStatusLabel(e) === "Activo").length;
  const emprendedoresSuspendidos = emprendimientos.filter((e) => accountStatusLabel(e) === "Suspendido").length;
  const emprendedoresEliminados = emprendimientos.filter((e) => accountStatusLabel(e) === "Eliminado").length;
  const portalesVisibles = emprendimientos.filter((e) => accountStatusLabel(e) === "Activo" && e.portalVisible !== false).length;

  const alertas = [
    ...usuarios
      .filter((u) => (u.estadoPago || "Pendiente") === "Pendiente")
      .map((u) => ({
        id: `pago-${u.id}`,
        usuario: u.nombre,
        tone: "danger",
        icon: <DollarSign />,
        title: "Pago pendiente",
        text: `${u.nombre} figura con pago pendiente en el plan ${u.plan || "Básico"}.`,
        actionLabel: "Copiar mensaje",
        action: async () => {
          const message = `Hola ${u.nombre}, te escribimos de C&R Emprende para recordarte que tu pago figura pendiente. Cuando puedas, coordinamos la regularización para mantener tu acceso activo.`;
          try {
            await navigator.clipboard.writeText(message);
            setAlertNotice(`Mensaje de pago copiado para ${u.nombre}.`);
          } catch {
            setAlertNotice(`No pude copiar el mensaje. Revisá permisos del navegador.`);
          }
          onRegisterCommercialEvent({
            usuario: u.nombre,
            tipo: "Pago pendiente",
            accion: "Mensaje copiado",
            estado: "Pendiente",
            nota: `Se preparó recordatorio de pago para ${u.email}.`,
          });
          setActivePage("mensajes");
        },
      })),
    ...usuarios
      .filter((u) => !(u.emprendimientoIds || []).length)
      .map((u) => ({
        id: `emprendimiento-${u.id}`,
        usuario: u.nombre,
        tone: "warning",
        icon: <Building2 />,
        title: "Usuario sin emprendimiento",
        text: `${u.nombre} ya tiene acceso, pero todavía no tiene emprendimiento vinculado.`,
        actionLabel: "Ver usuarios",
        action: () => {
          onRegisterCommercialEvent({
            usuario: u.nombre,
            tipo: "Usuario sin emprendimiento",
            accion: "Revisión abierta",
            estado: "Pendiente",
            nota: `Se revisó el acceso ${u.email} sin emprendimiento vinculado.`,
          });
          setActivePage("usuarios");
        },
      })),
  ].filter((alerta) => alertStates[alerta.id] !== "hidden");

  const alertasActivas = alertas.filter((alerta) => alertStates[alerta.id] !== "done");
  const dashboardCards = [
    {
      label: "Emprendimientos",
      value: emprendimientos.length,
      icon: <Building2 />,
      page: "emprendimientos",
      description: "Ver emprendimientos activos",
      className: "from-sky-500 via-blue-600 to-cyan-700 border-sky-300/40 text-white shadow-sky-950/35",
    },
    {
      label: "Usuarios",
      value: usuarios.length,
      icon: <Users />,
      page: "usuarios",
      description: "Administrar accesos",
      className: "from-violet-500 via-fuchsia-600 to-indigo-700 border-violet-300/40 text-white shadow-violet-950/35",
    },
    {
      label: "Rubros",
      value: rubros.length,
      icon: <Boxes />,
      page: "rubros",
      description: "Configurar categorías",
      className: "from-emerald-500 via-teal-600 to-cyan-700 border-emerald-300/40 text-white shadow-emerald-950/35",
    },
    {
      label: "Planes",
      value: planes.length,
      icon: <ShieldCheck />,
      page: "planes",
      description: "Planes y soporte avanzado",
      className: "from-amber-400 via-orange-500 to-rose-600 border-amber-300/40 text-white shadow-orange-950/35",
    },
  ];
  const estadoCards = [
    { label: "Activos", value: emprendedoresActivos, icon: <CheckCircle2 />, className: statColorStyles.emerald.card, iconClassName: statColorStyles.emerald.icon },
    { label: "Suspendidos", value: emprendedoresSuspendidos, icon: <AlertTriangle />, className: statColorStyles.amber.card, iconClassName: statColorStyles.amber.icon },
    { label: "Eliminados", value: emprendedoresEliminados, icon: <Lock />, className: statColorStyles.rose.card, iconClassName: statColorStyles.rose.icon },
    { label: "Portales visibles", value: portalesVisibles, icon: <Globe />, className: statColorStyles.sky.card, iconClassName: statColorStyles.sky.icon },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard administrador" subtitle="Resumen visual del sistema. Desde acá ves el estado general y entrás rápido a cada módulo." />
      <HeroBanner title="Hola, Rodrigo 👋" subtitle="Bienvenido a C&R Emprende. Este panel es para visualizar el estado general de usuarios, rubros, emprendimientos y soporte." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {dashboardCards.map((card) => (
          <DashboardActionCard
            key={card.label}
            icon={card.icon}
            label={card.label}
            value={card.value}
            description={card.description}
            className={card.className}
            onClick={() => setActivePage(card.page)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {estadoCards.map((item) => (
          <StatCard key={item.label} icon={item.icon} label={item.label} value={item.value} className={item.className} iconClassName={item.iconClassName} />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_.75fr] gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
              <div>
                <h2 className="text-xl font-bold text-white">Usuarios por rubro</h2>
                <p className="text-sm text-slate-300 mt-1">Vista rÃ¡pida para entender dÃ³nde estÃ¡ creciendo la plataforma.</p>
              </div>
              <Badge>{usuarios.length} usuarios</Badge>
            </div>
            <UsersByRubroChart data={usuariosPorRubro} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Alertas comerciales</h2>
                <p className="text-sm text-slate-300 mt-1">Prioridad en pagos pendientes y accesos incompletos.</p>
              </div>
              <Badge>{alertasActivas.length} activas</Badge>
            </div>
            {alertNotice && <div className="mb-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm font-bold text-emerald-300">{alertNotice}</div>}
            <div className="space-y-3 max-h-[390px] overflow-y-auto pr-1">
              {alertas.length ? alertas.map((alerta) => (
                <CommercialAlertRow
                  key={alerta.id}
                  alerta={alerta}
                  state={alertStates[alerta.id] || "active"}
                  onDone={() => {
                    setAlertStates((prev) => ({ ...prev, [alerta.id]: "done" }));
                    onRegisterCommercialEvent({
                      usuario: alerta.usuario,
                      tipo: alerta.title,
                      accion: "Marcada atendida",
                      estado: "Atendido",
                      nota: alerta.text,
                    });
                  }}
                  onHide={() => {
                    setAlertStates((prev) => ({ ...prev, [alerta.id]: "hidden" }));
                    onRegisterCommercialEvent({
                      usuario: alerta.usuario,
                      tipo: alerta.title,
                      accion: alertStates[alerta.id] === "done" ? "Quitada del panel" : "Desactivada",
                      estado: "Cerrado",
                      nota: alerta.text,
                    });
                  }}
                />
              )) : (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200 font-bold">Sin alertas comerciales por ahora.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card><CardContent className="p-5"><h2 className="text-xl font-bold text-white mb-4">Regla de datos</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-3"><ArchitectureRow icon={<Building2 />} title="Emprendimiento ID" text="Cada proyecto tiene su ID: EMP-001, EMP-002, etc." /><ArchitectureRow icon={<Boxes />} title="Datos vinculados" text="Productos, insumos, clientes y finanzas guardan emprendimiento_id." /><ArchitectureRow icon={<ShieldCheck />} title="Aislamiento" text="Cada usuario ve solo los datos de los emprendimientos asignados." /></div></CardContent></Card>
    </div>
  );
}

function UsersByRubroChart({ data }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const points = data.map((item, index) => {
    const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
    const y = 92 - (item.value / max) * 72;
    return { ...item, x, y };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `0,100 ${line} 100,100`;

  return (
    <div className="space-y-5">
      <div className="h-64 rounded-[1.5rem] border border-sky-300/15 bg-slate-950/70 p-4">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="rubroArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <polygon points={area} fill="url(#rubroArea)" />
          {[20, 40, 60, 80].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(148,163,184,.16)" strokeWidth="0.35" />)}
          <polyline points={line} fill="none" stroke="#67e8f9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {points.map((point) => (
            <circle key={point.label} cx={point.x} cy={point.y} r="2.6" fill="#0f172a" stroke="#a7f3d0" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {points.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span className="text-sm font-bold text-slate-100 truncate">{item.label}</span>
            <span className="rounded-full bg-cyan-400/10 border border-cyan-300/20 px-3 py-1 text-sm font-black text-cyan-200">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommercialAlertRow({ alerta, state, onDone, onHide }) {
  const isDone = state === "done";
  const toneClass = alerta.tone === "danger"
    ? "border-red-400/20 bg-red-400/10 text-red-200"
    : "border-amber-400/20 bg-amber-400/10 text-amber-100";

  return (
    <div className={`rounded-2xl border p-4 ${isDone ? "border-emerald-400/20 bg-emerald-400/10 opacity-75" : toneClass}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/15">
          {React.cloneElement(isDone ? <CheckCircle2 /> : alerta.icon, { className: "w-4 h-4" })}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-black text-white">{alerta.title}</p>
            <StatusBadge label={isDone ? "Atendida" : "Activa"} tone={isDone ? "success" : alerta.tone === "danger" ? "danger" : "warning"} />
          </div>
          <p className="mt-1 text-sm text-slate-100">{alerta.text}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {!isDone && <Button type="button" onClick={alerta.action} className="rounded-xl bg-blue-500 text-black px-3 py-2 text-xs"><Send className="w-3 h-3 mr-1" />{alerta.actionLabel}</Button>}
            {!isDone && <Button type="button" onClick={onDone} className="rounded-xl bg-emerald-500/15 text-emerald-200 border border-emerald-400/25 px-3 py-2 text-xs">Marcar atendida</Button>}
            <Button type="button" onClick={onHide} className="rounded-xl bg-slate-800 text-white px-3 py-2 text-xs">{isDone ? "Quitar" : "Desactivar"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsuariosPage({ usuarios, emprendimientos, onNewUser, onRenewUser, onChangePassword }) {
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [renewal, setRenewal] = useState(null);
  const [passwordModal, setPasswordModal] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const usuariosActivos = usuarios.filter((u) => u.estado === "Activo").length;
  const usuariosPendientes = usuarios.filter((u) => (u.estadoPago || "Pendiente") === "Pendiente").length;
  const usuariosBonificados = usuarios.filter((u) => u.estadoPago === "Bonificado").length;

  function getUserEmps(user) {
    return (user.emprendimientoIds || []).map((id) => emprendimientos.find((e) => e.id === id)).filter(Boolean);
  }

  function userRubro(user, emps) {
    return user.rubro || emps.map((e) => e.rubro).join(", ") || "Sin rubro";
  }

  function paymentTone(status) {
    if (status === "Pagado") return "success";
    if (status === "Bonificado") return "warning";
    return "danger";
  }

  function confirmRenewal() {
    if (!renewal) return;
    onRenewUser(renewal.user.id, renewal.months);
    setRenewal(null);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  async function savePassword() {
    if (!passwordModal || !newPassword.trim()) return;
    const count = onChangePassword(passwordModal.id, newPassword.trim());
    const warning = count >= 5
      ? `\n\nAviso: esta es la ${count}ª vez que se cambia la contraseña. A partir del próximo cambio puede aplicarse un plus por recuperación frecuente.`
      : "";
    const message = `Hola ${passwordModal.nombre}, tu nueva contraseña temporal para ingresar a C&R Emprende es: ${newPassword.trim()}.${warning}`;
    await copyText(message);
    setPasswordNotice(`Contraseña actualizada y mensaje copiado al portapapeles. Cambios realizados: ${count}.`);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Usuarios" subtitle="Usuarios habilitados para usar la plataforma." buttonText="Nuevo usuario" onButtonClick={onNewUser} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<Users />} label="Usuarios" value={usuarios.length} className={statColorStyles.sky.card} iconClassName={statColorStyles.sky.icon} />
        <StatCard icon={<CheckCircle2 />} label="Activos" value={usuariosActivos} className={statColorStyles.emerald.card} iconClassName={statColorStyles.emerald.icon} />
        <StatCard icon={<CalendarClock />} label="Pendientes" value={usuariosPendientes} className={statColorStyles.amber.card} iconClassName={statColorStyles.amber.icon} />
        <StatCard icon={<ShieldCheck />} label="Bonificados" value={usuariosBonificados} className={statColorStyles.violet.card} iconClassName={statColorStyles.violet.icon} />
      </div>

      <Card>
        <CardContent className="p-4 overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-bold text-white">Usuarios creados</h2>
              <p className="text-sm text-slate-300 mt-1">Desde acá podés ver rubro, plan, estado de pago, renovar acceso y administrar contraseñas.</p>
            </div>
          </div>
          <table className="w-full min-w-[1420px] text-[13px]">
            <thead>
              <tr className="text-left text-sky-300 border-b border-blue-500/20 bg-slate-950/60">
                <UserTableHead icon={<Users />} label="Usuario" />
                <UserTableHead icon={<Phone />} label="Teléfono" />
                <UserTableHead icon={<Globe />} label="Acceso" />
                <UserTableHead icon={<Boxes />} label="Rubro" />
                <UserTableHead icon={<CreditCard />} label="Plan" />
                <UserTableHead icon={<DollarSign />} label="Pago" />
                <UserTableHead icon={<Building2 />} label="Emprendimiento" />
                <UserTableHead icon={<KeyRound />} label="Contraseña" />
                <UserTableHead icon={<CalendarClock />} label="Fecha vencimiento" center />
                <UserTableHead icon={<RefreshCw />} label="Renovaciones" center />
                <UserTableHead icon={<CheckCircle2 />} label="Estado" />
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => {
                const emps = getUserEmps(u);
                const isVisible = !!visiblePasswords[u.id];
                return (
                  <tr key={u.id} className="border-b border-slate-800 hover:bg-slate-900/60 transition cursor-pointer" onClick={() => setSelectedUser(u)}>
                    <td className="py-2.5 pr-3 font-bold text-white whitespace-nowrap">
                      {u.nombre}
                      <p className="text-xs text-sky-300">{u.id}</p>
                    </td>
                    <td className="py-2.5 pr-3 text-slate-100 whitespace-nowrap">{u.telefono || "Sin teléfono"}</td>
                    <td className="py-2.5 pr-3 text-slate-100 whitespace-nowrap">{u.email}</td>
                    <td className="py-2.5 pr-3 text-slate-100 whitespace-nowrap">{userRubro(u, emps)}</td>
                    <td className="py-2.5 pr-3 flex items-center gap-2"><Badge>{u.plan || "Básico"}</Badge>{u.demo && <Badge>Demo</Badge>}</td>
                    <td className="py-2.5 pr-3"><StatusBadge label={u.estadoPago || "Pendiente"} tone={paymentTone(u.estadoPago)} /></td>
                    <td className="py-2.5 pr-3 text-slate-100 whitespace-nowrap">{emps.map((e) => e.nombre).join(", ") || "Pendiente"}</td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <div className="w-[92px] rounded-lg bg-slate-950 border border-slate-800 px-2 py-1.5 font-mono text-slate-100 text-xs">
                          {isVisible ? u.password : "••••••••"}
                        </div>
                        <Button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setVisiblePasswords((prev) => ({ ...prev, [u.id]: !prev[u.id] })); }}
                          className="rounded-md bg-amber-500 text-white border border-amber-500 hover:bg-amber-500 !p-1"
                          title="Mostrar u ocultar contraseña"
                        >
                          {isVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                        <Button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPasswordModal(u); setNewPassword(""); setPasswordNotice(""); }}
                          className="rounded-md bg-violet-500/15 text-violet-200 border border-violet-400/25 hover:bg-violet-500/25 !p-1"
                          title="Cambiar contraseña"
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-center">
                      <DueBadge status={getDueStatus(userDueValue(u))} date={userDueLabel(u)} />
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                        {[1, 3, 6, 12].map((months) => (
                          <Button
                            key={months}
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setRenewal({ user: u, months }); }}
                            className="rounded-md bg-orange-500 text-white border border-orange-500 hover:bg-orange-500 !px-1.5 !py-1 text-[10px] leading-none font-black min-w-[30px]"
                          >
                            X{months}
                          </Button>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 pr-3"><StatusBadge label={u.estado} tone="success" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {selectedUser && (() => {
        const emps = getUserEmps(selectedUser);
        return (
          <ModalShell eyebrow="Ficha de usuario" title={selectedUser.nombre} onClose={() => setSelectedUser(null)}>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <DetailBox icon={<Globe />} label="Usuario de acceso" value={selectedUser.email} />
                <DetailBox icon={<Phone />} label="Teléfono" value={selectedUser.telefono || "Sin teléfono"} />
                <DetailBox icon={<Boxes />} label="Rubro" value={userRubro(selectedUser, emps)} />
                <DetailBox icon={<CreditCard />} label="Plan contratado" value={selectedUser.plan || "Básico"} />
                <DetailBox icon={<ShieldCheck />} label="Demo" value={selectedUser.demo ? "Sí" : "No"} />
                <DetailBox icon={<DollarSign />} label="Estado de pago" value={selectedUser.estadoPago || "Pendiente"} />
                <DetailBox icon={<CalendarClock />} label="Fecha vencimiento" value={userDueLabel(selectedUser)} />
                {selectedUser.demo && <DetailBox icon={<Clock />} label="Duración demo" value={selectedUser.demoDuracionLabel || "Demo temporal"} />}
                <DetailBox icon={<Building2 />} label="Emprendimiento" value={emps.map((e) => e.nombre).join(", ") || "Pendiente de crear"} />
                <DetailBox icon={<ShieldCheck />} label="Estado" value={selectedUser.estado || "Activo"} />
                <DetailBox icon={<KeyRound />} label="Cambios de contraseña" value={`${selectedUser.cambiosPassword || 0} cambio(s)`} />
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-300">
                  Esta ficha es para ver el detalle completo sin cargar de más la tabla. Más adelante, cuando conectemos Supabase, acá podemos sumar historial de pagos, renovaciones y cambios de contraseña.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <Button type="button" onClick={() => setSelectedUser(null)} className="w-full bg-slate-800 text-white">Cerrar</Button>
                <Button type="button" onClick={() => { setPasswordModal(selectedUser); setNewPassword(""); setPasswordNotice(""); setSelectedUser(null); }} className="w-full bg-violet-500 text-white">Cambiar contraseña</Button>
              </div>
            </div>
          </ModalShell>
        );
      })()}

      {renewal && (
        <ModalShell eyebrow="Confirmar renovación" title="Renovar usuario" onClose={() => setRenewal(null)}>
          <div className="p-5 space-y-4">
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
              <p className="text-slate-100">
                Estás por renovar a <b>{renewal.user.nombre}</b> por <b>{renewal.months} mes{renewal.months > 1 ? "es" : ""}</b>.
              </p>
              <p className="text-sm text-slate-300 mt-2">Confirmá la acción para evitar renovaciones por error.</p>
            </div>
            <div className="flex gap-3">
              <Button type="button" onClick={() => setRenewal(null)} className="w-full bg-slate-800 text-white">Cancelar</Button>
              <Button type="button" onClick={confirmRenewal} className="w-full bg-blue-500 text-black">Confirmar renovación</Button>
            </div>
          </div>
        </ModalShell>
      )}

      {passwordModal && (
        <ModalShell eyebrow="Cambio de contraseña" title={`Cambiar contraseña · ${passwordModal.nombre}`} onClose={() => setPasswordModal(null)}>
          <div className="p-5 space-y-4">
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
              <p className="text-slate-100">Usalo cuando el usuario olvidó su acceso. Al guardar, se copia un mensaje listo para reenviar.</p>
              {(passwordModal.cambiosPassword || 0) >= 4 && (
                <p className="text-amber-300 text-sm font-bold mt-2">Atención: este usuario ya tuvo varios cambios de contraseña.</p>
              )}
            </div>
            <InputField icon={<Lock />} label="Nueva contraseña temporal" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Ej: Acceso2026" />
            {passwordNotice && (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <div className="flex items-center gap-2 text-emerald-300 font-bold"><Copy className="w-4 h-4" /> {passwordNotice}</div>
              </div>
            )}
            <div className="flex gap-3">
              <Button type="button" onClick={() => setPasswordModal(null)} className="w-full bg-slate-800 text-white">Cerrar</Button>
              <Button type="button" onClick={savePassword} className="w-full bg-blue-500 text-black">Guardar y copiar mensaje</Button>
            </div>
          </div>
        </ModalShell>
      )}
    </div>
  );
}

const statColorStyles = {
  sky: { card: "border-sky-300/40 bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-700 shadow-2xl shadow-sky-950/35", icon: "bg-white/20 text-white border-white/25" },
  emerald: { card: "border-emerald-300/40 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 shadow-2xl shadow-emerald-950/35", icon: "bg-white/20 text-white border-white/25" },
  amber: { card: "border-amber-300/40 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 shadow-2xl shadow-orange-950/35", icon: "bg-white/20 text-white border-white/25" },
  violet: { card: "border-violet-300/40 bg-gradient-to-br from-violet-500 via-fuchsia-600 to-indigo-700 shadow-2xl shadow-violet-950/35", icon: "bg-white/20 text-white border-white/25" },
  rose: { card: "border-rose-300/40 bg-gradient-to-br from-rose-500 via-pink-600 to-red-700 shadow-2xl shadow-rose-950/35", icon: "bg-white/20 text-white border-white/25" },
};

const rubroCardPalettes = [
  { card: "border-sky-300/40 bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-700 shadow-2xl shadow-sky-950/35", icon: "bg-white/20 text-white border-white/25", badge: "text-white", chip: "bg-sky-700/70 border-sky-200/30 text-white" },
  { card: "border-emerald-300/40 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 shadow-2xl shadow-emerald-950/35", icon: "bg-white/20 text-white border-white/25", badge: "text-white", chip: "bg-emerald-700/70 border-emerald-200/30 text-white" },
  { card: "border-amber-300/40 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 shadow-2xl shadow-orange-950/35", icon: "bg-white/20 text-white border-white/25", badge: "text-white", chip: "bg-amber-700/70 border-amber-200/30 text-white" },
  { card: "border-violet-300/40 bg-gradient-to-br from-violet-500 via-fuchsia-600 to-indigo-700 shadow-2xl shadow-violet-950/35", icon: "bg-white/20 text-white border-white/25", badge: "text-white", chip: "bg-violet-700/70 border-violet-200/30 text-white" },
];

function EmprendimientosPage({ emprendimientos, search, setSearch, onNewBusiness, onChangeAccountStatus }) {
  const [selected, setSelected] = useState(null);
  const totalActivos = emprendimientos.filter((e) => accountStatusLabel(e) === "Activo").length;
  const suspendidos = emprendimientos.filter((e) => accountStatusLabel(e) === "Suspendido").length;
  const pendientes = emprendimientos.filter((e) => e.estadoPago === "Pendiente").length;
  const eliminados = emprendimientos.filter((e) => accountStatusLabel(e) === "Eliminado").length;

  function changeStatus(event, empId, status) {
    event.stopPropagation();
    const nextStatus = accountStatusLabel({ estado: status });
    const today = todayISO();
    onChangeAccountStatus(empId, status);
    setSelected((current) => {
      if (current?.id !== empId) return current;
      if (nextStatus === "Suspendido") return { ...current, estado: "Suspendido", portalVisible: false, fechaSuspension: current.fechaSuspension || today, fechaEliminacion: null };
      if (nextStatus === "Eliminado") return { ...current, estado: "Eliminado", portalVisible: false, fechaEliminacion: today };
      return { ...current, estado: "Activo", portalVisible: true, fechaSuspension: null, fechaEliminacion: null };
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Emprendimientos"
        subtitle="Negocios reales de cada usuario. Acá vinculamos responsable, rubro, actividad, plan, pago y vencimiento."
        buttonText="Nuevo emprendimiento"
        onButtonClick={onNewBusiness}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard icon={<Building2 />} label="Emprendimientos" value={emprendimientos.length} className={statColorStyles.sky.card} iconClassName={statColorStyles.sky.icon} />
        <StatCard icon={<CheckCircle2 />} label="Activos" value={totalActivos} className={statColorStyles.emerald.card} iconClassName={statColorStyles.emerald.icon} />
        <StatCard icon={<AlertTriangle />} label="Suspendidos" value={suspendidos} className={statColorStyles.amber.card} iconClassName={statColorStyles.amber.icon} />
        <StatCard icon={<CreditCard />} label="Pagos pendientes" value={pendientes} className={statColorStyles.violet.card} iconClassName={statColorStyles.violet.icon} />
        <StatCard icon={<Lock />} label="Eliminados" value={eliminados} className={statColorStyles.rose.card} iconClassName={statColorStyles.rose.icon} />
      </div>

      <Card>
        <CardContent className="p-5 overflow-x-auto">
          <TableToolbar title="Listado de emprendimientos" search={search} setSearch={setSearch} placeholder="Buscar por nombre, usuario, rubro o actividad..." />
          <table className="w-full text-sm min-w-[1180px]">
            <TableHead headers={["ID", "Emprendimiento", "Usuario", "Rubro", "Plan / Pago", "Vencimiento", "Cuenta", "Portal", "Suspendido", "Acciones"]} />
            <tbody>
              {emprendimientos.map((e) => (
                <tr key={e.id} onClick={() => setSelected(e)} className="border-b border-slate-800 hover:bg-blue-500/5 cursor-pointer transition">
                  <td className="py-3 pr-4 text-sky-300 font-bold whitespace-nowrap">{e.id}</td>
                  <td className="py-3 pr-4 min-w-48">
                    <p className="font-bold text-white">{e.nombre}</p>
                    <p className="text-xs text-slate-400">{e.actividad || "Sin actividad"} - Alta: {e.fechaAlta || "Pendiente"}</p>
                  </td>
                  <td className="py-3 pr-4 text-slate-200 whitespace-nowrap">{e.owner}</td>
                  <td className="py-3 pr-4"><Badge>{e.rubro}</Badge></td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-col gap-1 items-start">
                      <Badge>{e.plan}</Badge>
                      <StatusBadge label={e.estadoPago || "Pendiente"} tone={e.estadoPago === "Pagado" ? "success" : e.estadoPago === "Bonificado" ? "warning" : "danger"} />
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-center whitespace-nowrap">{e.vencimiento}</td>
                  <td className="py-3 pr-4"><StatusBadge label={accountStatusLabel(e)} tone={accountStatusTone(e)} /></td>
                  <td className="py-3 pr-4"><StatusBadge label={e.portalVisible === false ? "Oculto" : "Visible"} tone={e.portalVisible === false ? "danger" : "success"} /></td>
                  <td className="py-3 pr-4 text-slate-100 whitespace-nowrap">{accountStatusLabel(e) === "Suspendido" ? `${getSuspendedDays(e)} dias` : "-"}</td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-2">
                      {accountStatusLabel(e) !== "Suspendido" && accountStatusLabel(e) !== "Eliminado" && (
                        <Button type="button" onClick={(event) => changeStatus(event, e.id, "Suspendido")} className="bg-amber-500 text-white px-3 py-2 text-xs">Suspender</Button>
                      )}
                      {accountStatusLabel(e) === "Suspendido" && (
                        <Button type="button" onClick={(event) => changeStatus(event, e.id, "Activo")} className="bg-emerald-600 text-white px-3 py-2 text-xs">Reactivar</Button>
                      )}
                      {accountStatusLabel(e) !== "Eliminado" && (
                        <Button type="button" onClick={(event) => changeStatus(event, e.id, "Eliminado")} className="bg-red-600 text-white px-3 py-2 text-xs">Eliminar</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {selected && (
        <ModalShell eyebrow="Ficha de emprendimiento" title={selected.nombre} onClose={() => setSelected(null)}>
          <div className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InfoItem label="ID" value={selected.id} />
              <InfoItem label="Usuario / responsable" value={selected.owner} />
              <InfoItem label="Rubro" value={selected.rubro} highlight />
              <InfoItem label="Actividad" value={selected.actividad || "Sin actividad"} />
              <InfoItem label="Plan contratado" value={selected.plan} highlight />
              <InfoItem label="Estado de pago" value={selected.estadoPago || "Pendiente"} />
              <InfoItem label="Fecha de alta" value={selected.fechaAlta || "Pendiente"} />
              <InfoItem label="Fecha de vencimiento" value={selected.vencimiento} />
              <InfoItem label="Estado de cuenta" value={accountStatusLabel(selected)} highlight />
              <InfoItem label="Portal publico" value={selected.portalVisible === false ? "Oculto" : "Visible"} />
              <InfoItem label="Fecha de suspension" value={selected.fechaSuspension ? isoToEsDate(selected.fechaSuspension) : "Sin suspension"} />
              <InfoItem label="Dias suspendido" value={accountStatusLabel(selected) === "Suspendido" ? getSuspendedDays(selected) : 0} />
              <InfoItem label="WhatsApp" value={selected.whatsapp || "Sin cargar"} />
              <InfoItem label="Instagram" value={selected.instagram || "Sin cargar"} />
            </div>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-white mb-3">Módulos activos por rubro</h3>
                <div className="flex flex-wrap gap-2">{selected.modulos.map((m) => <Badge key={m}>{m}</Badge>)}</div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Button onClick={() => setSelected(null)} className="bg-slate-800 text-white">Cerrar</Button>
              {accountStatusLabel(selected) !== "Suspendido" && accountStatusLabel(selected) !== "Eliminado" && (
                <Button onClick={(event) => changeStatus(event, selected.id, "Suspendido")} className="bg-amber-500 text-white">Suspender</Button>
              )}
              {accountStatusLabel(selected) === "Suspendido" && (
                <Button onClick={(event) => changeStatus(event, selected.id, "Activo")} className="bg-emerald-600 text-white">Reactivar</Button>
              )}
              {accountStatusLabel(selected) !== "Eliminado" && (
                <Button onClick={(event) => changeStatus(event, selected.id, "Eliminado")} className="bg-red-600 text-white">Eliminar</Button>
              )}
            </div>
          </div>
        </ModalShell>
      )}
    </div>
  );
}

function SuspendidosPage({ emprendimientos, onChangeAccountStatus }) {
  const suspendidos = emprendimientos.filter((emp) => accountStatusLabel(emp) === "Suspendido");
  const aviso30 = suspendidos.filter((emp) => getSuspendedDays(emp) >= 30).length;
  const aviso60 = suspendidos.filter((emp) => getSuspendedDays(emp) >= 60).length;
  const aviso85 = suspendidos.filter((emp) => getSuspendedDays(emp) >= 85).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Suspendidos" subtitle="Control manual de cuentas suspendidas, dias de resguardo y acciones antes de los 90 dias." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<AlertTriangle />} label="Suspendidos" value={suspendidos.length} className={statColorStyles.amber.card} iconClassName={statColorStyles.amber.icon} />
        <StatCard icon={<Clock />} label="Aviso dia 30" value={aviso30} className={statColorStyles.sky.card} iconClassName={statColorStyles.sky.icon} />
        <StatCard icon={<CalendarClock />} label="Aviso dia 60" value={aviso60} className={statColorStyles.violet.card} iconClassName={statColorStyles.violet.icon} />
        <StatCard icon={<Lock />} label="Ultimo aviso" value={aviso85} className={statColorStyles.rose.card} iconClassName={statColorStyles.rose.icon} />
      </div>

      <Card>
        <CardContent className="p-5 overflow-x-auto">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-white">Cuentas en resguardo</h2>
            <p className="text-sm text-slate-300 mt-1">Día 30 primer aviso, día 60 segundo aviso, día 85 último aviso, día 90 eliminación manual.</p>
          </div>
          {suspendidos.length ? (
            <table className="w-full text-sm min-w-[980px]">
              <TableHead headers={["Emprendimiento", "Usuario", "Fecha suspension", "Dias", "Aviso", "Portal", "Acciones"]} />
              <tbody>
                {suspendidos.map((emp) => {
                  const warning = suspensionWarning(emp);
                  return (
                    <tr key={emp.id} className="border-b border-slate-800">
                      <td className="py-4 pr-4">
                        <p className="font-black text-white">{emp.nombre}</p>
                        <p className="text-xs text-slate-300">{emp.id} - {emp.plan}</p>
                      </td>
                      <td className="py-4 pr-4 text-slate-100">{emp.owner || "Sin usuario"}</td>
                      <td className="py-4 pr-4 text-slate-100">{emp.fechaSuspension ? isoToEsDate(emp.fechaSuspension) : "Sin fecha"}</td>
                      <td className="py-4 pr-4 text-slate-100 font-black">{getSuspendedDays(emp)} dias</td>
                      <td className="py-4 pr-4">
                        <div className="space-y-1">
                          <StatusBadge label={warning.label} tone={warning.tone} />
                          <p className="text-xs text-slate-300">{warning.detail}</p>
                        </div>
                      </td>
                      <td className="py-4 pr-4"><StatusBadge label="Oculto" tone="danger" /></td>
                      <td className="py-4 pr-4">
                        <div className="flex flex-wrap gap-2">
                          <Button type="button" onClick={() => onChangeAccountStatus(emp.id, "Activo")} className="bg-emerald-600 text-white px-3 py-2 text-xs">Reactivar</Button>
                          <Button type="button" onClick={() => onChangeAccountStatus(emp.id, "Eliminado")} className="bg-red-600 text-white px-3 py-2 text-xs">Eliminar</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="rounded-3xl border border-emerald-300/30 bg-emerald-500/10 p-6 text-center">
              <CheckCircle2 className="mx-auto w-10 h-10 text-emerald-300" />
              <p className="text-lg font-black text-white mt-3">No hay cuentas suspendidas</p>
              <p className="text-sm text-slate-300 mt-1">Cuando suspendas una cuenta desde Emprendimientos, va a aparecer aca.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function HistorialAdminPage({ historial }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Historial" subtitle="Registro interno de acciones administrativas sobre cuentas, planes y portales." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<ClipboardList />} label="Acciones" value={historial.length} className={statColorStyles.sky.card} iconClassName={statColorStyles.sky.icon} />
        <StatCard icon={<AlertTriangle />} label="Suspensiones" value={historial.filter((item) => item.accion === "cuenta_suspendida").length} className={statColorStyles.amber.card} iconClassName={statColorStyles.amber.icon} />
        <StatCard icon={<CheckCircle2 />} label="Reactivaciones" value={historial.filter((item) => item.accion === "cuenta_reactivada").length} className={statColorStyles.emerald.card} iconClassName={statColorStyles.emerald.icon} />
      </div>
      <Card>
        <CardContent className="p-5 overflow-x-auto">
          {historial.length ? (
            <table className="w-full text-sm min-w-[880px]">
              <TableHead headers={["Fecha", "Admin", "Emprendimiento", "Accion", "Detalle"]} />
              <tbody>
                {historial.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800">
                    <td className="py-4 pr-4 text-slate-100 whitespace-nowrap">{item.fecha}</td>
                    <td className="py-4 pr-4 text-slate-100">{item.admin}</td>
                    <td className="py-4 pr-4">
                      <p className="font-bold text-white">{item.emprendimiento}</p>
                      <p className="text-xs text-slate-300">{item.emprendimientoId}</p>
                    </td>
                    <td className="py-4 pr-4"><Badge>{item.accion}</Badge></td>
                    <td className="py-4 pr-4 text-slate-100">{item.detalle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="rounded-3xl border border-blue-300/20 bg-blue-500/10 p-6 text-center">
              <ClipboardList className="mx-auto w-10 h-10 text-sky-300" />
              <p className="text-lg font-black text-white mt-3">Todavia no hay acciones registradas</p>
              <p className="text-sm text-slate-300 mt-1">Suspender, reactivar o eliminar una cuenta va a crear el primer registro.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ConfiguracionAdminPage({ commissionSettings, onUpdateCommissionSettings, demoUrl }) {
  const [localCommission, setLocalCommission] = useState({
    porcentaje: commissionSettings.porcentaje,
    limiteMensual: commissionSettings.limiteMensual,
  });

  useEffect(() => {
    setLocalCommission({
      porcentaje: commissionSettings.porcentaje,
      limiteMensual: commissionSettings.limiteMensual,
    });
  }, [commissionSettings.porcentaje, commissionSettings.limiteMensual]);

  function saveCommissionSettings() {
    onUpdateCommissionSettings({
      porcentaje: Number(localCommission.porcentaje || 0),
      limiteMensual: Number(localCommission.limiteMensual || 0),
    });
  }

  async function copyDemoUrl() {
    try {
      await navigator.clipboard.writeText(demoUrl);
    } catch {
      // Clipboard can fail on insecure origins; the visible URL remains available.
    }
  }

  function printDemoQr() {
    if (typeof window !== "undefined") window.print();
  }

  const accountRules = [
    ["Activo", "Puede entrar, editar, publicar y mostrar portal."],
    ["Suspendido", "Puede iniciar sesion, ve aviso, no puede modificar y el portal queda oculto."],
    ["Eliminado", "No tiene acceso operativo. En Supabase se borraran datos definitivos segun decision administrativa."],
    ["Resguardo", "La cuenta suspendida conserva datos hasta 90 dias."],
    ["Avisos", "Dia 30 primer aviso, dia 60 segundo aviso, dia 85 ultimo aviso, dia 90 eliminacion manual."],
  ];
  const portalRules = [
    ["Productos/fotos", `Maximo ${PORTAL_PUBLICATION_LIMIT} publicaciones por portal.`],
    ["Logo", `Maximo ${formatBytes(PORTAL_LOGO_MAX_UPLOAD_BYTES)}. Compresion automatica a ${formatBytes(PORTAL_LOGO_TARGET_BYTES)} aprox.`],
    ["Banner", `Maximo ${formatBytes(PORTAL_BANNER_MAX_UPLOAD_BYTES)}. Compresion automatica a ${formatBytes(PORTAL_BANNER_TARGET_BYTES)} aprox.`],
    ["Foto producto", `Maximo ${formatBytes(PORTAL_IMAGE_MAX_UPLOAD_BYTES)}. Compresion automatica a ${formatBytes(PORTAL_IMAGE_TARGET_BYTES)} aprox.`],
    ["Cache", "El portal usa cache local para reducir lecturas mientras seguimos en prototipo."],
  ];
  const commercialRules = [
    ["Comision portal", `${commissionSettings.porcentaje}% por venta concretada desde portal.`],
    ["Limite mensual", money(commissionSettings.limiteMensual)],
    ["Cobro", "Manual por ahora. El registro se acumula para revisar al renovar el mes."],
    ["Aviso al usuario", "Cuando cambia la comision, el emprendedor ve un modal informativo al ingresar."],
  ];
  const financeRules = [
    ["Pagado", "Suma como ingreso confirmado y alimenta Dashboard/Finanzas."],
    ["Pendiente", "No suma ingreso todavia, pero queda como cuenta por cobrar."],
    ["Bonificado", "Habilita el plan sin sumar ingreso. Sirve para demos, acuerdos o casos especiales."],
    ["Horas de trabajo", "Mas adelante se cargan manualmente para conocer costo interno y ganancia real."],
  ];
  const testChecklist = [
    {
      title: "Demo Reposteria",
      icon: <Users />,
      rows: [
        ["Login", "Entrar como emprendedor demo."],
        ["Productos", "Cargar y editar publicaciones."],
        ["Imagenes", "Probar logo, banner y fotos comprimidas."],
      ],
    },
    {
      title: "Portal publico",
      icon: <Globe />,
      rows: [
        ["Vista previa", "Abrir link publico y verificar visibilidad."],
        ["Consulta", "Enviar consulta con WhatsApp."],
        ["Metricas", "Confirmar visitas y consultas en Estadisticas."],
      ],
    },
    {
      title: "Control admin",
      icon: <ShieldCheck />,
      rows: [
        ["Suspender", "Bloquea panel y oculta portal."],
        ["Reactivar", "Recupera panel, productos y portal."],
        ["Eliminar", "Marca cuenta eliminada manualmente."],
      ],
    },
    {
      title: "Datos para Supabase",
      icon: <ClipboardList />,
      rows: [
        ["Historial", "Registrar acciones administrativas."],
        ["Comisiones", "Confirmar venta y comision pendiente."],
        ["Cache", "Validar portal sin duplicar lecturas."],
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Configuracion" subtitle="Reglas operativas actuales del administrador. Esto deja claro como se comporta el sistema antes de pasarlo a Supabase." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<ShieldCheck />} label="Estados" value="3" className={statColorStyles.emerald.card} iconClassName={statColorStyles.emerald.icon} />
        <StatCard icon={<Clock />} label="Resguardo" value="90 dias" className={statColorStyles.amber.card} iconClassName={statColorStyles.amber.icon} />
        <StatCard icon={<Package />} label="Limite portal" value={PORTAL_PUBLICATION_LIMIT} className={statColorStyles.sky.card} iconClassName={statColorStyles.sky.icon} />
        <StatCard icon={<DollarSign />} label="Comision" value={`${commissionSettings.porcentaje}%`} className={statColorStyles.violet.card} iconClassName={statColorStyles.violet.icon} />
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5 items-start">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">QR de captacion</p>
                <h2 className="text-xl font-black text-white mt-1">Demo para emprendedores</h2>
                <p className="text-sm text-slate-300 mt-2">Este link abre una pantalla publica donde la persona elige rubro y entra a una demo de 3 horas con datos precargados.</p>
              </div>
              <div className="rounded-2xl border border-blue-500/20 bg-slate-950 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-sky-300">Link demo</p>
                <p className="text-sm text-slate-100 mt-2 break-all">{demoUrl}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="button" onClick={copyDemoUrl} className="bg-blue-500 text-black">
                  <Copy className="w-4 h-4 mr-2" /> Copiar link
                </Button>
                <Button type="button" onClick={printDemoQr} className="bg-slate-800 text-white border border-white/10">
                  <Printer className="w-4 h-4 mr-2" /> Imprimir QR
                </Button>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-5 text-center text-slate-950 shadow-xl">
              <img src={getQrImageUrl(demoUrl)} alt="QR demo C&R Emprende" className="mx-auto h-52 w-52 object-contain" />
              <p className="mt-3 text-sm font-black">Escaneá y probá C&R Emprende</p>
              <p className="text-xs text-slate-600 mt-1">Demo guiada por rubro · 3 horas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <RulesCard title="Estados de cuenta" icon={<Users />} rows={accountRules} />
        <RulesCard title="Portal publico" icon={<Globe />} rows={portalRules} />
        <RulesCard title="Reglas comerciales" icon={<DollarSign />} rows={commercialRules} />
        <RulesCard title="Reglas financieras" icon={<CreditCard />} rows={financeRules} />
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-black text-white">Checklist de pruebas</h2>
              <p className="text-sm text-slate-300 mt-1">Flujo recomendado antes de pasar estructura y datos a Supabase.</p>
            </div>
            <Badge>Pre-Supabase</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {testChecklist.map((section) => <RulesCard key={section.title} title={section.title} icon={section.icon} rows={section.rows} />)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div>
            <h2 className="text-xl font-black text-white">Comision del portal</h2>
            <p className="text-sm text-slate-300 mt-1">Esta regla impacta en el calculo de ventas por portal y avisa al emprendedor al ingresar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField icon={<DollarSign />} label="Porcentaje de comision" type="number" min="0" step="0.1" value={localCommission.porcentaje} onChange={(e) => setLocalCommission({ ...localCommission, porcentaje: e.target.value })} />
            <InputField icon={<ShieldCheck />} label="Limite mensual por emprendimiento" type="number" min="0" value={localCommission.limiteMensual} onChange={(e) => setLocalCommission({ ...localCommission, limiteMensual: e.target.value })} />
          </div>
          <Button type="button" onClick={saveCommissionSettings} className="bg-blue-500 text-black">Actualizar comision</Button>
          <p className="text-xs text-slate-400">Al actualizar, cada emprendedor vera un aviso al entrar hasta marcarlo como entendido.</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-xl font-bold text-white">Pendiente para Supabase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <ArchitectureRow icon={<ClipboardList />} title="Tablas" text="emprendedores, acciones_administrativas, publicaciones, consultas, estadisticas_portal y comisiones_portal." />
            <ArchitectureRow icon={<ShieldCheck />} title="Reglas" text="El backend debe derivar la visibilidad del portal desde el estado de cuenta, sin boton manual separado." />
            <ArchitectureRow icon={<Clock />} title="Automatizacion" text="Cron o tarea programada para avisos dia 30/60/85 y eliminacion al dia 90 si se aprueba automatizar." />
            <ArchitectureRow icon={<Eye />} title="Metricas" text="Guardar visitas, consultas, clicks y productos vistos con fecha y dispositivo desde el inicio." />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RulesCard({ title, icon, rows }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">{React.cloneElement(icon, { className: "w-5 h-5" })}</div>
          <h2 className="text-base font-black text-white leading-tight">{title}</h2>
        </div>
        <div className="space-y-2">
          {rows.map(([label, text]) => (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
              <p className="text-xs font-black text-sky-300 uppercase tracking-wide">{label}</p>
              <p className="text-xs text-slate-100 mt-1 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PortalesStatsSection({ emprendimientos, publicaciones, consultasPortal, portalViews }) {
  const [copied, setCopied] = useState("");
  const rows = emprendimientos.map((emp) => {
    const status = accountStatusLabel(emp);
    const activePublications = publicaciones.filter((item) => item.emprendimientoId === emp.id && item.estado === "Visible").length;
    const totalPublications = publicaciones.filter((item) => item.emprendimientoId === emp.id).length;
    const consultas = consultasPortal.filter((item) => item.emprendimientoId === emp.id).length;
    const visible = status === "Activo";
    return { ...emp, status, visible, activePublications, totalPublications, consultas, views: Number(portalViews[emp.id] || 0) };
  });

  function portalLink(empId) {
    if (typeof window === "undefined") return `?portal=${empId}`;
    return `${window.location.origin}${window.location.pathname}?portal=${empId}`;
  }

  async function copyPortalLink(empId) {
    const link = portalLink(empId);
    try {
      await navigator.clipboard.writeText(link);
      setCopied(`Link copiado: ${empId}`);
    } catch {
      setCopied(link);
    }
  }

  return (
    <div className="space-y-6">
      {copied && <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-200">{copied}</div>}

      <Card>
        <CardContent className="p-5 overflow-x-auto">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-white">Portales por emprendedor</h2>
            <p className="text-sm text-slate-300 mt-1">La visibilidad es automatica: cuenta activa muestra portal, suspendida o eliminada lo oculta.</p>
          </div>
          <table className="w-full text-sm min-w-[1080px]">
            <TableHead headers={["Emprendimiento", "Cuenta", "Portal", "Publicaciones", "Consultas", "Visitas", "Link"]} />
            <tbody>
              {rows.map((emp) => (
                <tr key={emp.id} className="border-b border-slate-800">
                  <td className="py-4 pr-4">
                    <p className="font-black text-white">{emp.nombre}</p>
                    <p className="text-xs text-slate-300">{emp.id} - {emp.rubro}</p>
                  </td>
                  <td className="py-4 pr-4"><StatusBadge label={emp.status} tone={accountStatusTone(emp)} /></td>
                  <td className="py-4 pr-4"><StatusBadge label={emp.visible ? "Visible" : "Oculto"} tone={emp.visible ? "success" : "danger"} /></td>
                  <td className="py-4 pr-4 text-slate-100">{emp.activePublications}/{emp.totalPublications}</td>
                  <td className="py-4 pr-4 text-slate-100 font-black">{emp.consultas}</td>
                  <td className="py-4 pr-4 text-slate-100 font-black">{emp.views}</td>
                  <td className="py-4 pr-4">
                    <Button type="button" onClick={() => copyPortalLink(emp.id)} className="bg-blue-600 text-white px-3 py-2 text-xs">
                      <Copy className="w-3.5 h-3.5 mr-1" /> Copiar link
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
}

function EstadisticasAdminPage({ emprendimientos, publicaciones, consultasPortal, portalViews, portalCommissions }) {
  const rows = emprendimientos.map((emp) => {
    const empPublicaciones = publicaciones.filter((item) => item.emprendimientoId === emp.id);
    const empConsultas = consultasPortal.filter((item) => item.emprendimientoId === emp.id);
    const empCommissions = portalCommissions.filter((item) => item.emprendimientoId === emp.id);
    const visitas = Number(portalViews[emp.id] || 0);
    const consultas = empConsultas.length;
    const publicacionesVisibles = empPublicaciones.filter((item) => item.estado === "Visible").length;
    const ventasPortal = empCommissions.length;
    const conversion = visitas > 0 ? Math.round((consultas / visitas) * 100) : 0;
    const ventaPotencial = empCommissions.reduce((acc, item) => acc + Number(item.venta || 0), 0);
    return { ...emp, visitas, consultas, publicacionesVisibles, ventasPortal, conversion, ventaPotencial };
  });
  const totalVisitas = rows.reduce((acc, item) => acc + item.visitas, 0);
  const totalConsultas = rows.reduce((acc, item) => acc + item.consultas, 0);
  const totalPublicacionesVisibles = rows.reduce((acc, item) => acc + item.publicacionesVisibles, 0);
  const totalVentasPortal = rows.reduce((acc, item) => acc + item.ventasPortal, 0);
  const labels = rows.map((item) => item.nombre.split(" ")[0] || item.id);

  return (
    <div className="space-y-6">
      <PageHeader title="Estadísticas" subtitle="Lectura general de actividad en portales, consultas y conversiones por emprendedor." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<Eye />} label="Visitas totales" value={totalVisitas} className={statColorStyles.sky.card} iconClassName={statColorStyles.sky.icon} />
        <StatCard icon={<MessageCircle />} label="Consultas" value={totalConsultas} className={statColorStyles.amber.card} iconClassName={statColorStyles.amber.icon} />
        <StatCard icon={<Package />} label="Publicaciones visibles" value={totalPublicacionesVisibles} className={statColorStyles.emerald.card} iconClassName={statColorStyles.emerald.icon} />
        <StatCard icon={<ShoppingBag />} label="Ventas portal" value={totalVentasPortal} className={statColorStyles.violet.card} iconClassName={statColorStyles.violet.icon} />
      </div>

      <MiniLineChart
        title="Actividad por emprendedor"
        subtitle="Comparativo actual de visitas, consultas y publicaciones visibles."
        labels={labels}
        series={[
          { label: "Visitas", values: rows.map((item) => item.visitas), color: "#2563eb", point: "#1d4ed8" },
          { label: "Consultas", values: rows.map((item) => item.consultas), color: "#f59e0b", point: "#d97706" },
          { label: "Publicaciones", values: rows.map((item) => item.publicacionesVisibles), color: "#059669", point: "#047857" },
        ]}
      />

      <Card>
        <CardContent className="p-5 overflow-x-auto">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-white">Detalle por emprendedor</h2>
            <p className="text-sm text-slate-300 mt-1">Estos datos salen del prototipo actual. Más adelante se guardan por fecha, dispositivo y producto visto.</p>
          </div>
          <table className="w-full text-sm min-w-[1080px]">
            <TableHead headers={["Emprendimiento", "Estado", "Visitas", "Consultas", "Conversión", "Publicaciones", "Ventas portal", "Venta potencial"]} />
            <tbody>
              {rows.map((emp) => (
                <tr key={emp.id} className="border-b border-slate-800">
                  <td className="py-4 pr-4">
                    <p className="font-black text-white">{emp.nombre}</p>
                    <p className="text-xs text-slate-300">{emp.id} - {emp.rubro}</p>
                  </td>
                  <td className="py-4 pr-4"><StatusBadge label={accountStatusLabel(emp)} tone={accountStatusTone(emp)} /></td>
                  <td className="py-4 pr-4 text-slate-100 font-black">{emp.visitas}</td>
                  <td className="py-4 pr-4 text-slate-100 font-black">{emp.consultas}</td>
                  <td className="py-4 pr-4"><StatusBadge label={`${emp.conversion}%`} tone={emp.conversion > 0 ? "success" : "info"} /></td>
                  <td className="py-4 pr-4 text-slate-100">{emp.publicacionesVisibles}</td>
                  <td className="py-4 pr-4 text-slate-100">{emp.ventasPortal}</td>
                  <td className="py-4 pr-4 text-slate-100 font-black">{money(emp.ventaPotencial)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <PortalesStatsSection emprendimientos={emprendimientos} publicaciones={publicaciones} consultasPortal={consultasPortal} portalViews={portalViews} />
    </div>
  );
}

function RubrosPage({ rubros }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Rubros" subtitle="Los rubros definen cómo trabaja cada emprendimiento: actividades, nombre del módulo de insumos y módulos activos." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<Boxes />} label="Rubros activos" value={rubros.length} className={statColorStyles.sky.card} iconClassName={statColorStyles.sky.icon} />
        <StatCard icon={<ClipboardList />} label="Actividades base" value={rubros.reduce((acc, r) => acc + (r.actividades?.length || 0), 0)} className={statColorStyles.emerald.card} iconClassName={statColorStyles.emerald.icon} />
        <StatCard icon={<Package />} label="Módulos conectados" value="Por rubro" className={statColorStyles.amber.card} iconClassName={statColorStyles.amber.icon} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {rubros.map((r, index) => {
          const palette = rubroCardPalettes[index % rubroCardPalettes.length];
          return (
          <ColorCard key={r.id} className={`${palette.card} hover:-translate-y-1 transition duration-300`}>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className={`mt-1 flex h-12 w-12 items-center justify-center rounded-2xl border ${palette.icon}`}>
                    <Boxes className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`text-xs font-black uppercase tracking-wide ${palette.badge}`}>{r.id}</p>
                    <h2 className="text-2xl font-bold text-white mt-1">{r.nombre}</h2>
                    <p className="text-sm text-slate-200 mt-2">{r.enfoque}</p>
                  </div>
                </div>
                <div className={`rounded-2xl border p-3 text-center min-w-28 ${palette.icon}`}>
                  <p className="text-xs text-slate-300">Módulo</p>
                  <p className="font-bold text-white">{r.etiquetaInsumos}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-slate-950/30 p-4 shadow-inner shadow-black/20 backdrop-blur-sm">
                <p className="text-xs text-white/80 font-black uppercase tracking-wide mb-3">Actividades / subrubros</p>
                <div className="flex flex-wrap gap-2">{(r.actividades || []).map((a) => <span key={a} className={`rounded-full border px-3 py-1 text-xs font-bold ${palette.chip}`}>{a}</span>)}</div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-slate-950/30 p-4 shadow-inner shadow-black/20 backdrop-blur-sm">
                <p className="text-xs text-white/80 font-black uppercase tracking-wide mb-3">Ejemplos</p>
                <p className="text-sm leading-relaxed text-white/90">{r.ejemplos}</p>
              </div>

              <div className="rounded-3xl border border-white/15 bg-slate-950/30 p-4 shadow-inner shadow-black/20 backdrop-blur-sm">
                <p className="text-xs text-white/80 font-black uppercase tracking-wide mb-3">Módulos sugeridos</p>
                <div className="flex flex-wrap gap-2">{r.modulos.map((m) => <span key={m} className={`rounded-full border px-3 py-1 text-xs font-bold ${palette.chip}`}>{m}</span>)}</div>
              </div>
            </CardContent>
          </ColorCard>
          );
        })}
      </div>
    </div>
  );
}

function RubrosManagerPage({ rubros, modules, onChange }) {
  const emptyRubro = {
    nombre: "",
    enfoque: "",
    etiquetaInsumos: "Insumos",
    actividades: [],
    ejemplos: "",
    modulos: ["Dashboard", "Productos", "Clientes", "Finanzas", "Configuración"],
  };
  const [expandedRubroId, setExpandedRubroId] = useState(null);
  const [newActivity, setNewActivity] = useState({});
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [newRubro, setNewRubro] = useState(emptyRubro);

  function rubroIdFromName(name) {
    const base = (name || "nuevo")
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 10) || "NUEVO";
    return `RUB-${base}`;
  }

  function updateRubro(rubroId, changes) {
    onChange((prev) => prev.map((rubro) => rubro.id === rubroId ? { ...rubro, ...changes } : rubro));
  }

  function addActivity(rubroId) {
    const value = (newActivity[rubroId] || "").trim();
    if (!value) return;
    onChange((prev) => prev.map((rubro) => rubro.id === rubroId ? { ...rubro, actividades: [...(rubro.actividades || []), value] } : rubro));
    setNewActivity((prev) => ({ ...prev, [rubroId]: "" }));
  }

  function removeActivity(rubroId, activity) {
    onChange((prev) => prev.map((rubro) => rubro.id === rubroId ? { ...rubro, actividades: (rubro.actividades || []).filter((item) => item !== activity) } : rubro));
  }

  function toggleModule(rubroId, moduleName) {
    onChange((prev) =>
      prev.map((rubro) => {
        if (rubro.id !== rubroId) return rubro;
        const current = rubro.modulos || [];
        const modulos = current.includes(moduleName) ? current.filter((item) => item !== moduleName) : [...current, moduleName];
        return { ...rubro, modulos };
      })
    );
  }

  function toggleNewModule(moduleName) {
    setNewRubro((prev) => {
      const current = prev.modulos || [];
      const modulos = current.includes(moduleName) ? current.filter((item) => item !== moduleName) : [...current, moduleName];
      return { ...prev, modulos };
    });
  }

  function addNewRubro() {
    const nombre = newRubro.nombre.trim();
    if (!nombre) return;
    const next = {
      ...newRubro,
      id: rubroIdFromName(nombre),
      nombre,
      enfoque: newRubro.enfoque.trim() || "Nuevo rubro configurable.",
      actividades: (newRubro.actividades || []).filter(Boolean),
      ejemplos: newRubro.ejemplos.trim() || "Ejemplos pendientes de cargar.",
      modulos: newRubro.modulos?.length ? newRubro.modulos : emptyRubro.modulos,
    };
    onChange((prev) => [next, ...prev]);
    setExpandedRubroId(next.id);
    setNewRubro(emptyRubro);
    setIsNewOpen(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Rubros" subtitle="Los rubros definen cómo trabaja cada emprendimiento: actividades, subrubros y módulos activos." buttonText="Nuevo rubro" onButtonClick={() => setIsNewOpen(true)} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<Boxes />} label="Rubros activos" value={rubros.length} className={statColorStyles.sky.card} iconClassName={statColorStyles.sky.icon} />
        <StatCard icon={<ClipboardList />} label="Actividades base" value={rubros.reduce((acc, r) => acc + (r.actividades?.length || 0), 0)} className={statColorStyles.emerald.card} iconClassName={statColorStyles.emerald.icon} />
        <StatCard icon={<Package />} label="Módulos conectados" value="Editables" className={statColorStyles.amber.card} iconClassName={statColorStyles.amber.icon} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {rubros.map((r, index) => {
          const palette = rubroCardPalettes[index % rubroCardPalettes.length];
          const isExpanded = expandedRubroId === r.id;
          return (
            <ColorCard key={r.id} className={`${palette.card} transition duration-300 ${isExpanded ? "order-first xl:col-span-2" : "hover:-translate-y-1"}`}>
              <CardContent className={`${isExpanded ? "p-6 md:p-7" : "p-5"} space-y-4`}>
                <button type="button" onClick={() => setExpandedRubroId(isExpanded ? null : r.id)} className="w-full text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className={`mt-1 flex h-12 w-12 items-center justify-center rounded-2xl border ${palette.icon}`}>
                        <Boxes className="w-6 h-6" />
                      </div>
                      <div>
                        <p className={`text-xs font-black uppercase tracking-wide ${palette.badge}`}>{r.id}</p>
                        <h2 className="text-2xl font-bold text-white mt-1">{r.nombre}</h2>
                        <p className="text-sm text-slate-200 mt-2">{r.enfoque}</p>
                      </div>
                    </div>
                    <div className={`rounded-2xl border p-3 text-center min-w-28 ${palette.icon}`}>
                      <p className="text-xs text-slate-300">Módulo</p>
                      <p className="font-bold text-white">{r.etiquetaInsumos}</p>
                    </div>
                  </div>
                </button>

                <div className="rounded-3xl border border-white/15 bg-slate-950/30 p-4 shadow-inner shadow-black/20 backdrop-blur-sm">
                  <p className="text-xs text-white/80 font-black uppercase tracking-wide mb-3">Actividades / subrubros</p>
                  <div className="flex flex-wrap gap-2">{(r.actividades || []).map((a) => <span key={a} className={`rounded-full border px-3 py-1 text-xs font-bold ${palette.chip}`}>{a}</span>)}</div>
                </div>

                <div className="rounded-3xl border border-white/15 bg-slate-950/30 p-4 shadow-inner shadow-black/20 backdrop-blur-sm">
                  <p className="text-xs text-white/80 font-black uppercase tracking-wide mb-3">Módulos sugeridos</p>
                <div className="flex flex-wrap gap-2">{(r.modulos || []).map((m) => <span key={m} className={`rounded-full border px-3 py-1 text-xs font-bold ${palette.chip}`}>{m}</span>)}</div>
                </div>

                {isExpanded && (
                  <div className="space-y-4 rounded-3xl border border-white/15 bg-slate-950/50 p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Nombre del rubro" value={r.nombre} onChange={(e) => updateRubro(r.id, { nombre: e.target.value })} />
                      <InputField label="Etiqueta de insumos" value={r.etiquetaInsumos} onChange={(e) => updateRubro(r.id, { etiquetaInsumos: e.target.value })} />
                      <InputField label="Enfoque" value={r.enfoque} onChange={(e) => updateRubro(r.id, { enfoque: e.target.value })} />
                      <InputField label="Ejemplos" value={r.ejemplos} onChange={(e) => updateRubro(r.id, { ejemplos: e.target.value })} />
                    </div>

                    <div>
                      <p className="text-xs text-sky-300 font-black uppercase tracking-wide mb-3">Agregar actividad / subrubro</p>
                      <div className="flex flex-col md:flex-row gap-2">
                        <InputField label="Nueva actividad" value={newActivity[r.id] || ""} onChange={(e) => setNewActivity((prev) => ({ ...prev, [r.id]: e.target.value }))} placeholder="Ej: Sublimación" />
                        <Button type="button" onClick={() => addActivity(r.id)} className="bg-blue-500 text-black md:self-end">Agregar</Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {(r.actividades || []).map((activity) => (
                          <button key={activity} type="button" onClick={() => removeActivity(r.id, activity)} className="rounded-full bg-blue-500/10 border border-blue-400/20 px-3 py-1 text-xs font-bold text-sky-200 hover:bg-red-500/15 hover:text-red-200">
                            {activity} x
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-sky-300 font-black uppercase tracking-wide mb-3">Módulos activos</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {modules.map((moduleName) => (
                          <label key={moduleName} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm font-bold text-slate-100">
                            <input type="checkbox" checked={(r.modulos || []).includes(moduleName)} onChange={() => toggleModule(r.id, moduleName)} className="h-4 w-4 rounded border-slate-600 bg-slate-900" />
                            {moduleName}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </ColorCard>
          );
        })}
      </div>

      {isNewOpen && (
        <ModalShell eyebrow="Nuevo rubro" title="Crear rubro" onClose={() => setIsNewOpen(false)}>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Nombre" value={newRubro.nombre} onChange={(e) => setNewRubro((prev) => ({ ...prev, nombre: e.target.value }))} placeholder="Ej: Servicios digitales" />
              <InputField label="Etiqueta de insumos" value={newRubro.etiquetaInsumos} onChange={(e) => setNewRubro((prev) => ({ ...prev, etiquetaInsumos: e.target.value }))} placeholder="Ej: Recursos" />
              <InputField label="Enfoque" value={newRubro.enfoque} onChange={(e) => setNewRubro((prev) => ({ ...prev, enfoque: e.target.value }))} placeholder="Breve descripción del rubro" />
              <InputField label="Ejemplos" value={newRubro.ejemplos} onChange={(e) => setNewRubro((prev) => ({ ...prev, ejemplos: e.target.value }))} placeholder="Ej: diseño, redes, impresiones" />
            </div>
            <InputField label="Actividades iniciales separadas por coma" value={(newRubro.actividades || []).join(", ")} onChange={(e) => setNewRubro((prev) => ({ ...prev, actividades: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) }))} placeholder="Ej: Diseño, Redes sociales, Branding" />
            <div>
              <p className="text-xs text-sky-300 font-black uppercase tracking-wide mb-3">Módulos activos</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {modules.map((moduleName) => (
                  <label key={moduleName} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-sm font-bold text-slate-100">
                    <input type="checkbox" checked={(newRubro.modulos || []).includes(moduleName)} onChange={() => toggleNewModule(moduleName)} className="h-4 w-4 rounded border-slate-600 bg-slate-900" />
                    {moduleName}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="button" onClick={() => setIsNewOpen(false)} className="w-full bg-slate-800 text-white">Cancelar</Button>
              <Button type="button" onClick={addNewRubro} className="w-full bg-blue-500 text-black">Crear rubro</Button>
            </div>
          </div>
        </ModalShell>
      )}
    </div>
  );
}

function ModulosPage({ modules, rubros }) {
  const [expandedModule, setExpandedModule] = useState("Dashboard");

  const moduleDetails = {
    "Dashboard": {
      icon: <LayoutDashboard />,
      resumen: "Vista principal para entender de un vistazo cómo está funcionando el negocio.",
      contiene: ["Ingresos del mes", "Pagos pendientes", "Usuarios activos", "Vencimientos", "Alertas importantes", "Gráficos de crecimiento"],
      conecta: ["Finanzas", "Suscripciones", "Usuarios", "Emprendimientos", "Reportes"],
      mejora: "Más adelante va a tomar datos reales de pagos, planes, clientes activos y movimientos financieros.",
    },
    "Productos": {
      icon: <ShoppingBag />,
      resumen: "Base de productos o servicios que vende cada emprendimiento.",
      contiene: ["Nombre", "Categoría", "Costo", "Precio de venta", "Stock", "Estado", "Imagen o referencia"],
      conecta: ["Pedidos", "Presupuestos", "Finanzas", "Reportes"],
      mejora: "El producto podrá crearse desde una receta, desde inventario o cargarse manualmente.",
    },
    "Inventario": {
      icon: <Boxes />,
      resumen: "Control de stock de productos terminados, mercadería o unidades disponibles.",
      contiene: ["Stock actual", "Stock mínimo", "Entradas", "Salidas", "Alertas", "Movimientos"],
      conecta: ["Productos", "Pedidos", "Producción / Recetas", "Reportes"],
      mejora: "Cuando se venda o se produzca, el stock se actualizará automáticamente.",
    },
    "Insumos": {
      icon: <Package />,
      resumen: "Base de materia prima, insumos o mercadería según el rubro del emprendimiento.",
      contiene: ["Unidad de compra", "Cantidad comprada", "Precio de compra", "Unidad de uso", "Costo unitario", "Proveedor"],
      conecta: ["Proveedores", "Producción / Recetas", "Presupuestos", "Finanzas"],
      mejora: "En gastronomía se verá como Materia prima; en gráfica como Insumos; en reventa como Mercadería.",
    },
    "Proveedores": {
      icon: <Globe />,
      resumen: "Agenda de proveedores para saber dónde se compra, a qué precio y con qué contacto.",
      contiene: ["Nombre", "Teléfono", "Rubro", "Productos que provee", "Última compra", "Notas"],
      conecta: ["Insumos", "Finanzas", "Reportes"],
      mejora: "Permitirá comparar precios y detectar qué proveedor conviene más.",
    },
    "Producción / Recetas": {
      icon: <ClipboardList />,
      resumen: "Armado de recetas, fórmulas o producción conectada con costos reales.",
      contiene: ["Insumos usados", "Cantidad por unidad", "Costo total", "Rinde", "Costo por unidad", "Precio sugerido"],
      conecta: ["Insumos", "Productos", "Presupuestos", "Finanzas"],
      mejora: "Ejemplo: si cambia el precio del huevo o azúcar, la receta actualiza el costo del producto.",
    },
    "Clientes": {
      icon: <Users />,
      resumen: "Base de datos de clientes del emprendimiento para ventas, pedidos y seguimiento.",
      contiene: ["Nombre", "Teléfono", "Dirección", "Historial de compras", "Notas", "Estado"],
      conecta: ["Pedidos", "Presupuestos", "WhatsApp", "Reportes"],
      mejora: "Servirá para saber quién compra, qué compró y cuándo volver a contactarlo.",
    },
    "Presupuestos": {
      icon: <CreditCard />,
      resumen: "Herramienta para calcular y enviar presupuestos con costo, margen y precio final.",
      contiene: ["Cliente", "Productos", "Insumos", "Mano de obra", "Extras", "Margen", "Total"],
      conecta: ["Clientes", "Productos", "Insumos", "Producción / Recetas", "WhatsApp", "Finanzas"],
      mejora: "El presupuesto podrá convertirse en pedido y luego en ingreso cuando se cobre.",
    },
    "Pedidos": {
      icon: <ClipboardList />,
      resumen: "Seguimiento de trabajos, ventas o encargos desde que entran hasta que se entregan.",
      contiene: ["Cliente", "Detalle", "Estado", "Seña", "Saldo", "Fecha de entrega", "Notas"],
      conecta: ["Clientes", "Presupuestos", "Finanzas", "WhatsApp"],
      mejora: "Permitirá ver pendientes, entregados, cobrados y trabajos atrasados.",
    },
    "Finanzas": {
      icon: <DollarSign />,
      resumen: "Control de ingresos, gastos, ganancias y pagos vinculados al negocio.",
      contiene: ["Ingresos", "Gastos", "Costos", "Ganancia", "Pendientes", "Bonificados", "Movimientos"],
      conecta: ["Dashboard", "Pedidos", "Presupuestos", "Suscripciones", "Reportes"],
      mejora: "Cuando un pago figure como pagado, se va a reflejar en finanzas y dashboard.",
    },
    "Reportes": {
      icon: <Search />,
      resumen: "Resumen visual para tomar decisiones y ver qué funciona mejor.",
      contiene: ["Productos más vendidos", "Mejores clientes", "Costos principales", "Ganancia mensual", "Stock crítico"],
      conecta: ["Dashboard", "Productos", "Clientes", "Finanzas"],
      mejora: "Ayudará a detectar oportunidades, pérdidas y mejoras de precio.",
    },
    "WhatsApp": {
      icon: <MessageCircle />,
      resumen: "Comunicación rápida con clientes usando mensajes listos para copiar o enviar.",
      contiene: ["Mensajes de presupuesto", "Recordatorios", "Cambio de contraseña", "Pedido listo", "Pago pendiente"],
      conecta: ["Clientes", "Pedidos", "Presupuestos", "Usuarios"],
      mejora: "Primero será copiar mensaje; después podemos integrar envíos o enlaces automáticos.",
    },
    "Configuración": {
      icon: <Settings />,
      resumen: "Personalización del panel y datos propios de cada emprendimiento.",
      contiene: ["Logo", "Nombre", "Color", "WhatsApp", "Instagram", "Datos comerciales", "Soporte remoto"],
      conecta: ["Emprendimientos", "Usuarios", "Planes", "Soporte remoto"],
      mejora: "Hace que cada cliente sienta que el panel es propio, sin perder la base C&R.",
    },
  };

  const paletteList = [
    "border-sky-300/40 bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-700 shadow-sky-950/35",
    "border-emerald-300/40 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 shadow-emerald-950/35",
    "border-amber-300/40 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 shadow-orange-950/35",
    "border-violet-300/40 bg-gradient-to-br from-violet-500 via-fuchsia-600 to-indigo-700 shadow-violet-950/35",
    "border-rose-300/40 bg-gradient-to-br from-rose-500 via-pink-600 to-red-700 shadow-rose-950/35",
    "border-cyan-300/40 bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 shadow-cyan-950/35",
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Módulos"
        subtitle="Base funcional de C&R Emprende: qué hace cada módulo, qué contiene y con qué partes se conecta."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<Settings />} label="Módulos base" value={modules.length} className={statColorStyles.sky.card} iconClassName={statColorStyles.sky.icon} />
        <StatCard icon={<Boxes />} label="Rubros vinculados" value={rubros.length} className={statColorStyles.emerald.card} iconClassName={statColorStyles.emerald.icon} />
        <StatCard icon={<RefreshCw />} label="Conexiones" value="Entre módulos" className={statColorStyles.violet.card} iconClassName={statColorStyles.violet.icon} />
      </div>

      <div className="rounded-3xl border border-blue-500/20 bg-slate-950/60 p-5">
        <h2 className="text-xl font-bold text-white mb-2">Cómo leer esta sección</h2>
        <p className="text-sm text-slate-200">
          Esta pantalla funciona como nuestra guía interna del producto. Cada tarjeta resume un módulo. Al tocarla se despliega la explicación completa sin abrir otra ventana, para ver qué datos maneja y cómo se conecta con el resto del sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {modules.map((moduleName, index) => {
          const detail = moduleDetails[moduleName] || {
            icon: <Settings />,
            resumen: "Módulo configurable dentro de la plataforma.",
            contiene: ["Datos principales", "Estados", "Acciones", "Historial"],
            conecta: ["Dashboard", "Reportes"],
            mejora: "Se irá completando a medida que avancemos módulo por módulo.",
          };
          const isExpanded = expandedModule === moduleName;
          const color = paletteList[index % paletteList.length];

          return (
            <button
              key={moduleName}
              type="button"
              onClick={() => setExpandedModule(isExpanded ? null : moduleName)}
              className={`group text-left rounded-3xl border bg-gradient-to-br p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1 ${color}`}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-white/20 bg-white/15 p-3 text-white shrink-0">
                  {React.cloneElement(detail.icon, { className: "w-7 h-7" })}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-black text-white">{moduleName}</h3>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white/90">
                      {isExpanded ? "Cerrar" : "Ver detalle"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-100 mt-2 leading-relaxed">{detail.resumen}</p>
                </div>
              </div>

              <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
                <div className="overflow-hidden">
                  <div className="rounded-3xl border border-white/15 bg-slate-950/35 p-5 space-y-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-white/70 mb-2">Qué contiene</p>
                      <div className="flex flex-wrap gap-2">
                        {detail.contiene.map((item) => <span key={item} className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">{item}</span>)}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-white/70 mb-2">Se conecta con</p>
                      <div className="flex flex-wrap gap-2">
                        {detail.conecta.map((item) => <span key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white">{item}</span>)}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-white/70 mb-1">Nota para desarrollo</p>
                      <p className="text-sm text-white leading-relaxed">{detail.mejora}</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <ColorCard className="border-blue-400/30 bg-gradient-to-br from-blue-500/25 via-sky-700/20 to-slate-950 shadow-xl shadow-blue-950/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl border border-white/20 bg-white/15 p-3 text-white"><RefreshCw className="w-7 h-7" /></div>
            <div>
              <h2 className="text-2xl font-black text-white">Conexión principal entre módulos</h2>
              <p className="text-slate-100 mt-2 leading-relaxed">
                La lógica fuerte de C&R Emprende es que los módulos no queden aislados: Insumos calcula costos, Producción / Recetas usa esos costos, Productos toma el resultado, Presupuestos arma el precio final, Pedidos confirma el trabajo y Finanzas registra el ingreso o gasto.
              </p>
            </div>
          </div>
        </CardContent>
      </ColorCard>
    </div>
  );
}
function PlanesPage({ planes }) {
  const [localPlanes, setLocalPlanes] = useState(planes);
  const [expandedPlan, setExpandedPlan] = useState(null);

  const planIcons = {
    Básico: <Package className="w-8 h-8" />,
    Pro: <ShieldCheck className="w-8 h-8" />,
    Elite: <KeyRound className="w-8 h-8" />,
  };

  const expansionClasses = {
    Básico: "xl:absolute xl:left-0 xl:top-0 xl:w-[calc(300%+2.5rem)] xl:origin-top-left",
    Pro: "xl:absolute xl:left-1/2 xl:top-0 xl:w-[calc(300%+2.5rem)] xl:-translate-x-1/2 xl:origin-top",
    Elite: "xl:absolute xl:right-0 xl:top-0 xl:w-[calc(300%+2.5rem)] xl:origin-top-right",
  };

  function updatePrecio(planId, precio) {
    setLocalPlanes((prev) => prev.map((plan) => plan.id === planId ? { ...plan, precio } : plan));
  }

  function togglePlan(planId) {
    setExpandedPlan((current) => current === planId ? null : planId);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Planes"
        subtitle="Definimos qué recibe cada cliente, cuánto paga y qué nivel de acompañamiento le damos desde C&R."
      />

      <ColorCard
        className="relative overflow-hidden border-blue-400/30 bg-slate-950 shadow-xl shadow-blue-950/30"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(2,6,23,.92), rgba(14,116,144,.68), rgba(2,6,23,.88)), url('/fondo-saas.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-cyan-400/10 pointer-events-none" />
        <CardContent className="relative p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-sky-300 font-black">Base comercial</p>
              <h2 className="text-2xl font-black text-white mt-2">Los módulos base se mantienen</h2>
              <p className="text-slate-200 mt-2 max-w-4xl">
                La diferencia entre Básico, Pro y Elite no es dejar al cliente sin herramientas importantes. La diferencia está en cantidad de usuarios, prioridad, configuración, acompañamiento y soporte remoto autorizado.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-center">
              <p className="text-xs text-slate-200 font-bold">Planes activos</p>
              <p className="text-3xl font-black text-white">{localPlanes.length}</p>
            </div>
          </div>
        </CardContent>
      </ColorCard>

      <div className={`relative grid grid-cols-1 xl:grid-cols-3 gap-5 transition-all duration-500 ${expandedPlan ? "xl:pb-[600px]" : "xl:pb-0"}`}>
        {localPlanes.map((plan) => {
          const isOpen = expandedPlan === plan.id;
          const isDimmed = expandedPlan && !isOpen;
          const expandedClass = expansionClasses[plan.nombre] || "xl:absolute xl:left-0 xl:top-0 xl:w-[calc(300%+2.5rem)] xl:origin-top-left";

          return (
            <div key={plan.id} className={`relative min-h-[360px] transition-all duration-500 ${isOpen ? "z-30" : "z-10"} ${isDimmed ? "xl:opacity-35 xl:scale-[0.97]" : "opacity-100"}`}>
              <ColorCard className={`h-full border-white/15 bg-gradient-to-br ${plan.color} shadow-2xl shadow-blue-950/25 transition-all duration-500 ease-out ${isOpen ? `${expandedClass} xl:min-h-[900px] ring-2 ring-white/40 scale-100` : "relative scale-100"}`}>
                <CardContent className="p-5 md:p-6">
                  <button type="button" onClick={() => togglePlan(plan.id)} className="w-full text-left">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-3xl border border-white/25 bg-white/20 p-4 text-white shadow-lg shadow-slate-950/20">
                          {planIcons[plan.nombre] || <CreditCard className="w-8 h-8" />}
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.25em] text-white/75">{plan.id}</p>
                          <h2 className="text-3xl font-black text-white mt-1">{plan.nombre}</h2>
                          <p className="text-sm text-white/85 mt-2 leading-relaxed">{plan.resumen}</p>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-white/20 border border-white/20 px-3 py-2 text-xs font-black text-white whitespace-nowrap">
                        {isOpen ? "Ocultar" : "Ver detalle"}
                      </div>
                    </div>
                  </button>

                  <div className="mt-5 rounded-3xl border border-white/15 bg-slate-950/25 p-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-white/75">Precio configurable</label>
                    <div className="mt-2 flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-white/80" />
                      <input
                        value={plan.precio}
                        onChange={(e) => updatePrecio(plan.id, e.target.value)}
                        className="w-full rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-2xl font-black text-white outline-none placeholder:text-white/50"
                      />
                    </div>
                    <p className="text-xs text-white/75 mt-2">Después este valor se conecta con suscripciones, pagos, dashboard y finanzas.</p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/15 border border-white/15 p-3">
                      <p className="text-xs text-white/70 font-bold">Usuarios</p>
                      <p className="text-xl font-black text-white">{plan.usuarios}</p>
                    </div>
                    <div className="rounded-2xl bg-white/15 border border-white/15 p-3">
                      <p className="text-xs text-white/70 font-bold">Soporte remoto</p>
                      <p className="text-sm font-black text-white">{plan.accesoAdmin ? "Incluido" : "No incluido"}</p>
                    </div>
                  </div>

                  <div className={`grid transition-all duration-700 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
                    <div className="overflow-hidden">
                      <div className="rounded-[2rem] border border-white/20 bg-slate-950/35 p-5 md:p-6 space-y-5 backdrop-blur">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-white/70">Detalle completo del plan</p>
                            <h3 className="text-3xl font-black text-white mt-2">Plan {plan.nombre}</h3>
                            <p className="text-sm text-white/85 mt-2 max-w-4xl leading-relaxed">{plan.idealPara}</p>
                          </div>
                          <button type="button" onClick={() => togglePlan(plan.id)} className="rounded-2xl border border-white/20 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-white hover:bg-white/25 transition">
                            Ocultar detalle
                          </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <PlanDetailList title="Qué contiene" items={plan.contiene} icon={<CheckCircle2 className="w-4 h-4" />} />
                          <PlanDetailList title="Periodos de cobro" items={(plan.periodos || ["Mensual", "Trimestral", "Semestral", "Anual"]).map((periodo) => `${periodo}: se puede usar para alta o renovación del cliente.`)} icon={<CalendarClock className="w-4 h-4" />} />
                          <PlanDetailList title="Qué le aporta al usuario" items={plan.beneficios} icon={<ShieldCheck className="w-4 h-4" />} />
                          <PlanDetailList title="Condiciones internas" items={plan.limites} icon={<AlertTriangle className="w-4 h-4" />} />
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Nota para C&R</p>
                          <p className="text-sm text-white mt-2 leading-relaxed">{plan.notaInterna}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </ColorCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlanDetailList({ title, items, icon }) {
  return (
    <div>
      <h3 className="text-lg font-black text-white">{title}</h3>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/90">
            <span className="mt-0.5 text-white">{icon}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuscripcionesPage({ emprendimientos, planes, historialComercial = [], commissionSettings, portalCommissions = [] }) {
  const horasTrabajo = [
    { fecha: "18/06/2026", tarea: "Ajustes visuales del panel admin", horas: 2.5, valorHora: 4500, responsable: "C&R" },
    { fecha: "18/06/2026", tarea: "Configuración y soporte de deploy", horas: 1.5, valorHora: 4500, responsable: "C&R + IA" },
    { fecha: "17/06/2026", tarea: "Definición de módulos y planes", horas: 2, valorHora: 4500, responsable: "C&R" },
  ];

  const getPlan = (name) => planes.find((p) => p.nombre === name) || planes[0];

  const rows = emprendimientos.map((e) => ({
    ...e,
    planData: getPlan(e.plan),
    monto: parsePrice(getPlan(e.plan)?.precio || "$0"),
    periodo: e.periodo || "Mensual",
    estadoPago: e.estadoPago || "Pendiente",
  }));

  const ingresosConfirmados = rows.filter((e) => e.estadoPago === "Pagado").reduce((acc, e) => acc + e.monto, 0);
  const ingresosPendientes = rows.filter((e) => e.estadoPago === "Pendiente").reduce((acc, e) => acc + e.monto, 0);
  const bonificados = rows.filter((e) => e.estadoPago === "Bonificado").length;
  const costoHoras = horasTrabajo.reduce((acc, h) => acc + h.horas * h.valorHora, 0);
  const gananciaEstimada = ingresosConfirmados - costoHoras;
  const totalVentasPortal = portalCommissions.reduce((acc, item) => acc + Number(item.venta || 0), 0);
  const totalComisionesPortal = portalCommissions.reduce((acc, item) => acc + Number(item.comision || 0), 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Finanzas" subtitle="Control interno de ingresos por planes, pagos pendientes, bonificados y horas de trabajo de C&R." />

      <HeroBanner
        title="Finanzas internas de C&R Emprende"
        subtitle="Acá vemos cuánto ingresa por planes, qué clientes están pendientes, qué clientes están bonificados y cuánto tiempo de trabajo estamos invirtiendo en soporte, mejoras y acompañamiento."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard icon={<DollarSign />} label="Ingresos pagados" value={money(ingresosConfirmados)} className="border-emerald-400/25 bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-950" />
        <StatCard icon={<CalendarClock />} label="Pendientes" value={money(ingresosPendientes)} className="border-amber-400/25 bg-gradient-to-br from-amber-400 via-orange-500 to-slate-950" />
        <StatCard icon={<ShieldCheck />} label="Bonificados" value={bonificados} className="border-violet-400/25 bg-gradient-to-br from-violet-500 via-fuchsia-600 to-slate-950" />
        <StatCard icon={<Clock />} label="Horas C&R" value={`${horasTrabajo.reduce((acc, h) => acc + h.horas, 0)} h`} className="border-sky-400/25 bg-gradient-to-br from-sky-500 via-blue-600 to-slate-950" />
        <StatCard icon={<CheckCircle2 />} label="Ganancia estimada" value={money(gananciaEstimada)} className="border-lime-400/25 bg-gradient-to-br from-lime-500 via-green-600 to-slate-950" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[.8fr_1.2fr] gap-5">
        <Card>
          <CardContent className="p-5 space-y-4">
            <div>
              <h2 className="text-xl font-black text-white">Comision vigente</h2>
              <p className="text-sm text-slate-300 mt-1">La configuracion se modifica desde Configuracion.</p>
            </div>
            <InfoItem label="Porcentaje" value={`${commissionSettings.porcentaje}%`} highlight />
            <InfoItem label="Limite mensual" value={money(commissionSettings.limiteMensual)} />
            <p className="text-xs text-slate-400">Este bloque queda aca solo como referencia financiera.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-white">Ventas por portal</h2>
                <p className="text-sm text-slate-300 mt-1">Registro manual de ventas concretadas desde exhibición.</p>
              </div>
              <div className="flex gap-2">
                <Badge>{money(totalVentasPortal)} ventas</Badge>
                <Badge>{money(totalComisionesPortal)} comisión</Badge>
              </div>
            </div>
            {portalCommissions.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <TableHead headers={["Fecha", "Emprendimiento", "Contacto", "Publicación", "Venta", "%", "Comisión", "Estado"]} />
                  <tbody>
                    {portalCommissions.map((item) => {
                      const emp = emprendimientos.find((e) => e.id === item.emprendimientoId);
                      return (
                        <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-900/60 transition">
                          <td className="py-4 pr-4 text-slate-100 whitespace-nowrap">{item.fecha}</td>
                          <td className="py-4 pr-4 font-bold text-white">{emp?.nombre || item.emprendimientoId}</td>
                          <td className="py-4 pr-4 text-slate-100">{item.usuario}</td>
                          <td className="py-4 pr-4 text-slate-100">{item.publicacionTitulo}</td>
                          <td className="py-4 pr-4 text-emerald-300 font-black">{money(item.venta)}</td>
                          <td className="py-4 pr-4 text-slate-100">{item.porcentaje}%</td>
                          <td className="py-4 pr-4 text-amber-300 font-black">{money(item.comision)}</td>
                          <td className="py-4 pr-4"><StatusBadge label={item.estado} tone="warning" /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">Todavía no hay ventas registradas desde portales.</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5 overflow-x-auto">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-black text-white">Ingresos por planes</h2>
              <p className="text-sm text-slate-300">Cada alta o renovación puede ser mensual, trimestral, semestral o anual.</p>
            </div>
            <Badge>Base para Dashboard y Finanzas</Badge>
          </div>
          <table className="w-full text-sm">
            <TableHead headers={["Emprendimiento", "Dueño", "Plan", "Periodo", "Monto", "Pago", "Vencimiento"]} />
            <tbody>
              {rows.map((e) => (
                <tr key={e.id} className="border-b border-slate-800 hover:bg-slate-900/60 transition">
                  <td className="py-4 pr-4 font-bold text-white">{e.nombre}<p className="text-xs text-sky-300">{e.id}</p></td>
                  <td className="py-4 pr-4 text-slate-100">{e.owner}</td>
                  <td className="py-4 pr-4"><Badge>{e.plan}</Badge></td>
                  <td className="py-4 pr-4 text-slate-100">{e.periodo}</td>
                  <td className="py-4 pr-4 text-emerald-300 font-black">{money(e.monto)}</td>
                  <td className="py-4 pr-4"><StatusBadge label={e.estadoPago} tone={financePaymentTone(e.estadoPago)} /></td>
                  <td className="py-4 pr-4 text-center">{e.vencimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-black text-white">Historial de seguimiento comercial</h2>
              <p className="text-sm text-slate-300">Registro de acciones tomadas desde las alertas: pagos pendientes, usuarios sin emprendimiento y cierres manuales.</p>
            </div>
            <Badge>{historialComercial.length} movimientos</Badge>
          </div>
          {historialComercial.length ? (
            <table className="w-full min-w-[960px] text-sm">
              <TableHead headers={["Fecha", "Usuario", "Tipo", "Acción", "Estado", "Responsable", "Nota interna"]} />
              <tbody>
                {historialComercial.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-900/60 transition">
                    <td className="py-4 pr-4 text-slate-100 whitespace-nowrap">{item.fecha}</td>
                    <td className="py-4 pr-4 font-bold text-white whitespace-nowrap">{item.usuario}</td>
                    <td className="py-4 pr-4"><Badge>{item.tipo}</Badge></td>
                    <td className="py-4 pr-4 text-slate-100">{item.accion}</td>
                    <td className="py-4 pr-4"><StatusBadge label={item.estado} tone={item.estado === "Atendido" ? "success" : item.estado === "Cerrado" ? "warning" : "danger"} /></td>
                    <td className="py-4 pr-4 text-sky-300 font-bold whitespace-nowrap">{item.responsable}</td>
                    <td className="py-4 pr-4 text-slate-300">{item.nota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
              Todavía no hay movimientos. Cuando copies un mensaje, marques una alerta como atendida o la desactives desde Dashboard, va a aparecer acá.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-xl font-black text-white mb-2">Horas de trabajo C&R</h2>
            <p className="text-sm text-slate-300 mb-4">Esto nos ayuda a medir cuánto tiempo lleva soporte, configuración, mejoras y acompañamiento.</p>
            <div className="space-y-3">
              {horasTrabajo.map((h, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="font-bold text-white">{h.tarea}</p>
                    <p className="text-xs text-slate-300">{h.fecha} · {h.responsable}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sky-300">{h.horas} h</p>
                    <p className="text-xs text-slate-300">{money(h.horas * h.valorHora)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hidden">
          <CardContent className="p-5">
            <h2 className="hidden text-xl font-black text-white mb-2">Regla financiera</h2>
            <div className="space-y-3 text-sm text-slate-200">
              <ArchitectureRow icon={<CheckCircle2 />} title="Pagado" text="Suma como ingreso confirmado y alimenta Dashboard/Finanzas." />
              <ArchitectureRow icon={<CalendarClock />} title="Pendiente" text="No suma ingreso todavía, pero queda como cuenta por cobrar." />
              <ArchitectureRow icon={<ShieldCheck />} title="Bonificado" text="Habilita el plan sin sumar ingreso. Sirve para demos, acuerdos o casos especiales." />
              <ArchitectureRow icon={<Clock />} title="Horas de trabajo" text="Más adelante se cargan manualmente para conocer costo interno y ganancia real." />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
function SoporteAdminPage({ emprendimientos }) {
  const habilitados = emprendimientos.filter((e) => e.soporteRemoto?.habilitado);
  const pendientes = emprendimientos.filter((e) => !e.soporteRemoto?.habilitado && e.plan === "Elite");

  function openSupportPanel(emp) {
    const url = `${window.location.origin}${window.location.pathname}?soporte_emp=${encodeURIComponent(emp.id)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-6">
      <HeroBanner
        title="Soporte remoto C&R"
        subtitle="Entrá al panel del emprendedor solo cuando exista autorización temporal. El acceso se abre en una pestaña nueva para no mezclar tu panel admin con el panel del cliente."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ColorStatCard icon={<ShieldCheck />} label="Accesos activos" value={habilitados.length} color="from-emerald-500 via-teal-600 to-slate-900" />
        <ColorStatCard icon={<AlertTriangle />} label="Solicitudes" value={pendientes.length} color="from-amber-400 via-orange-500 to-slate-900" />
        <ColorStatCard icon={<CalendarClock />} label="Tiempo típico" value="15 min" color="from-sky-500 via-blue-600 to-slate-900" />
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-black text-white">Accesos autorizados</h2>
              <p className="text-sm text-slate-300 mt-1">Cada entrada abre una pestaña nueva con el panel completo del emprendedor en modo soporte.</p>
            </div>
            <Badge>Regla: siempre con permiso temporal</Badge>
          </div>

          <div className="space-y-3">
            {habilitados.map((e) => (
              <div key={e.id} className="rounded-3xl bg-slate-950 border border-emerald-500/20 p-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center text-emerald-300">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-black text-white text-lg">{e.nombre}</p>
                    <p className="text-xs text-slate-300 mt-1">{e.id} · {e.owner} · {e.plan}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <StatusBadge label="Autorizado" tone="success" />
                      <StatusBadge label={`Tiempo: ${e.soporteRemoto.vence}`} tone="warning" />
                      <StatusBadge label="Nueva pestaña" tone="info" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={() => openSupportPanel(e)} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-3 rounded-2xl font-black">
                    <LogIn className="w-4 h-4 mr-2" /> Entrar al panel
                  </Button>
                </div>
              </div>
            ))}

            {habilitados.length === 0 && (
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 text-center">
                <p className="font-bold text-white">No hay accesos activos</p>
                <p className="text-sm text-slate-300 mt-1">Cuando un emprendedor habilite soporte remoto, aparecerá acá.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h2 className="text-xl font-black text-white mb-4">Cómo lo verá el cliente</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-sm text-slate-200">
            <ArchitectureRow icon={<ShieldCheck />} title="Cliente autoriza" text="El emprendedor habilita acceso por 15 min, 30 min, 1 hora o 24 horas." />
            <ArchitectureRow icon={<Clock />} title="C&R entra con temporizador" text="Tu pestaña muestra modo soporte y tiempo autorizado para no perder control." />
            <ArchitectureRow icon={<Eye />} title="Cliente ve estado" text="En su panel aparece un aviso de soporte autorizado/activo. Luego con Supabase lo hacemos en tiempo real." />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SupportSessionBanner({ emp }) {
  return (
    <div className="rounded-[2rem] border border-emerald-400/30 bg-gradient-to-r from-emerald-500 via-teal-600 to-slate-900 p-5 shadow-2xl shadow-emerald-950/30">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-100">Modo soporte C&R activo</p>
            <h2 className="text-2xl font-black text-white mt-1">Estás dentro del panel de {emp.nombre}</h2>
            <p className="text-sm text-emerald-50/90 mt-1">Acceso temporal autorizado por el cliente. Las modificaciones futuras quedarán registradas en historial.</p>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-950/35 border border-white/15 px-5 py-4 text-right">
          <p className="text-xs text-emerald-100 font-bold uppercase tracking-wide">Tiempo autorizado</p>
          <p className="text-2xl font-black text-white">{emp.soporteRemoto?.vence || "Activo"}</p>
        </div>
      </div>
    </div>
  );
}

function ClientSupportActiveBanner({ emp }) {
  return (
    <div className="rounded-[2rem] border border-amber-400/30 bg-gradient-to-r from-amber-400 via-orange-500 to-slate-900 p-5 shadow-2xl shadow-orange-950/25">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-black text-white">Soporte C&R autorizado</p>
            <p className="text-sm text-amber-50/90">C&R puede ingresar temporalmente a tu panel para ayudarte.</p>
          </div>
        </div>
        <StatusBadge label={`Tiempo: ${emp.soporteRemoto?.vence || "Activo"}`} tone="warning" />
      </div>
    </div>
  );
}



function ClienteDashboard({ emp, adminView, onBack, setActivePage }) {
  const [tourStep, setTourStep] = useState(null);
  const productos = productosDemo.filter((p) => p.emprendimientoId === emp.id);
  const clientes = clientesDemo.filter((c) => c.emprendimientoId === emp.id);
  const tourSteps = [
    {
      key: "productos",
      title: "Productos",
      text: "Acá vas a cargar lo que vendés: productos terminados, precio de venta, costo y stock disponible. Inventario queda integrado acá.",
      target: "Productos",
      action: "productos",
    },
    {
      key: "ventas",
      title: "Ventas del mes",
      text: "Este bloque resume cuánto facturaste en el mes. Más adelante se alimenta solo con pedidos, presupuestos aceptados y pagos cargados.",
      target: "Ventas mes",
      action: "finanzas",
    },
    {
      key: "clientes",
      title: "Clientes",
      text: "Acá queda tu base de clientes: nombre, teléfono, compras realizadas, seguimiento y próximos pedidos.",
      target: "Clientes",
      action: "clientes",
    },
    {
      key: "ganancia",
      title: "Ganancia",
      text: "Te muestra una estimación de ganancia después de restar costos de productos, insumos y gastos cargados.",
      target: "Ganancia",
      action: "finanzas",
    },
  ];
  const currentTour = tourStep !== null ? tourSteps[tourStep] : null;

  return (
    <div className="space-y-6">
      {adminView && <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-200 hover:text-sky-300"><ArrowLeft className="w-4 h-4" /> Volver a soporte</button>}
      <HeroBanner title={`Bienvenido, ${emp.owner} 👋`} subtitle={`Gestioná ${emp.nombre} desde un solo lugar: productos, stock, insumos, recetas, costos, presupuestos, pedidos y mensajes con C&R.`} />
      <PageHeader title={emp.nombre} subtitle={`Panel del emprendimiento · ${emp.id} · ${emp.rubro}`} secondaryButtonText="Ver guía rápida" secondaryOnClick={() => setTourStep(0)} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardActionCard icon={<Package />} label="Productos" value={productos.length} description="Productos finales y stock" className="from-fuchsia-500 via-pink-500 to-rose-500 border-pink-200/30 shadow-pink-950/30" onClick={() => setActivePage?.("productos")} />
        <DashboardActionCard icon={<ShoppingBag />} label="Ventas mes" value="$128.000" description="Ir a finanzas" className="from-emerald-400 via-teal-500 to-cyan-500 border-emerald-200/30 shadow-emerald-950/30" onClick={() => setActivePage?.("finanzas")} />
        <DashboardActionCard icon={<Users />} label="Clientes" value={clientes.length} description="Abrir base de clientes" className="from-sky-400 via-blue-500 to-indigo-600 border-sky-200/30 shadow-blue-950/30" onClick={() => setActivePage?.("clientes")} />
        <DashboardActionCard icon={<DollarSign />} label="Ganancia" value="$52.000" description="Ver resumen financiero" className="from-amber-300 via-orange-500 to-red-500 border-amber-200/30 shadow-orange-950/30" onClick={() => setActivePage?.("finanzas")} />
      </div>

      {currentTour && (
        <div className="relative rounded-[2rem] border border-sky-300/30 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-800 p-5 shadow-2xl shadow-blue-950/40 overflow-hidden">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-100">Guía rápida · paso {tourStep + 1} de {tourSteps.length}</p>
              <h2 className="text-2xl font-black text-white mt-2">{currentTour.title}</h2>
              <p className="text-sm text-sky-50 mt-2 max-w-3xl">{currentTour.text}</p>
              <p className="text-xs text-white/70 mt-3">La guía está señalando la tarjeta: <b>{currentTour.target}</b>.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setActivePage?.(currentTour.action)} className="bg-white text-blue-900 hover:bg-sky-50">Abrir módulo</Button>
              {tourStep > 0 && <Button onClick={() => setTourStep(tourStep - 1)} className="bg-white/15 text-white border border-white/20">Anterior</Button>}
              {tourStep < tourSteps.length - 1 ? (
                <Button onClick={() => setTourStep(tourStep + 1)} className="bg-slate-950/35 text-white border border-white/20">Siguiente</Button>
              ) : (
                <Button onClick={() => setTourStep(null)} className="bg-emerald-400 text-emerald-950">Finalizar</Button>
              )}
            </div>
          </div>
        </div>
      )}

      <ClientSalesChart />

      <Card>
        <CardContent className="p-5">
          <h2 className="text-xl font-bold mb-2">Resumen del mes</h2>
          <p className="text-sm text-slate-300 mb-4">Vista rápida para entender cómo viene el negocio. Luego se conectará con ventas, pedidos, presupuestos y finanzas reales.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <MiniInfoBlock title="Mejor mes" value="Junio" text="$128.000 en ventas cargadas" />
            <MiniInfoBlock title="Mayor movimiento" value="Productos" text={`${productos.length} productos activos en el panel`} />
            <MiniInfoBlock title="Seguimiento" value="Clientes" text={`${clientes.length} clientes registrados hasta ahora`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ClientSalesChart() {
  const meses = [
    { mes: "Ene", ventas: 52 },
    { mes: "Feb", ventas: 68 },
    { mes: "Mar", ventas: 74 },
    { mes: "Abr", ventas: 91 },
    { mes: "May", ventas: 105 },
    { mes: "Jun", ventas: 128 },
  ];

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-black text-white">Ventas por mes</h2>
            <p className="text-sm text-slate-300">Gráfico visual de ejemplo. Después toma datos reales de Finanzas y Pedidos.</p>
          </div>
          <StatusBadge label="Demo visual" tone="info" />
        </div>
        <div className="h-64 rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5 flex items-end gap-3">
          {meses.map((item) => (
            <div key={item.mes} className="flex-1 flex flex-col items-center gap-3">
              <div className="w-full rounded-t-2xl bg-gradient-to-t from-sky-500 via-blue-500 to-cyan-300 shadow-lg shadow-blue-950/30" style={{ height: `${item.ventas * 1.35}px` }} />
              <div className="text-center">
                <p className="text-xs font-black text-white">{item.mes}</p>
                <p className="text-[10px] text-slate-400">${item.ventas}k</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MiniInfoBlock({ title, value, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
      <p className="text-xs font-black uppercase tracking-wide text-slate-400">{title}</p>
      <p className="text-2xl font-black text-white mt-1">{value}</p>
      <p className="text-sm text-slate-300 mt-1">{text}</p>
    </div>
  );
}

function ClienteProductos({ emp }) {
  const recetas = recetasDemo.filter((r) => r.emprendimientoId === emp.id);
  const getRecipeUnits = (recipeName = "") => {
    const match = recipeName.match(/x\s*(\d+)/i);
    return match ? Number(match[1]) : 1;
  };
  const getRecipeUnitCost = (recipeId) => {
    const receta = recetas.find((r) => r.id === recipeId);
    if (!receta) return 0;
    return Math.round(Number(receta.costo || 0) / getRecipeUnits(receta.nombre));
  };
  const getRecipeNameFromProduct = (productName = "") => {
    const lower = productName.toLowerCase();
    const receta = recetas.find((r) => lower.includes(r.nombre.toLowerCase().replace(/x\s*\d+/i, "").trim().split(" ")[0] || ""));
    return receta?.nombre || "Receta vinculada";
  };

  const baseProductos = productosDemo.filter((p) => p.emprendimientoId === emp.id).map((p) => ({
    ...p,
    alertaStock: p.estado.includes("Bajo") ? 10 : 5,
    costoDesdeReceta: true,
    recetaNombre: getRecipeNameFromProduct(p.nombre),
  }));
  const [productos, setProductos] = useState(baseProductos);
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    stock: "",
    recetaId: "",
    venta: "",
    alertaStock: "10",
  });

  const getProductStatus = (stock, alerta) => {
    const stockNumber = Number(stock || 0);
    const alertNumber = Number(alerta || 0);
    if (stockNumber <= 0) return "Sin stock";
    if (stockNumber <= alertNumber) return "Bajo stock";
    return "Activo";
  };

  const selectedRecipe = recetas.find((r) => r.id === newProduct.recetaId);
  const selectedRecipeUnitCost = selectedRecipe ? getRecipeUnitCost(selectedRecipe.id) : 0;

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const stockNumber = Number(newProduct.stock || 0);
    const alertaNumber = Number(newProduct.alertaStock || 0);
    const created = {
      id: `PROD-${Date.now()}`,
      emprendimientoId: emp.id,
      nombre: newProduct.nombre.trim() || selectedRecipe?.nombre?.replace(/x\s*\d+/i, "").trim() || "Producto nuevo",
      stock: stockNumber,
      costo: selectedRecipeUnitCost,
      costoDesdeReceta: Boolean(selectedRecipe),
      recetaId: selectedRecipe?.id || null,
      recetaNombre: selectedRecipe?.nombre || "Pendiente de receta",
      venta: Number(newProduct.venta || 0),
      alertaStock: alertaNumber,
      estado: getProductStatus(stockNumber, alertaNumber),
    };
    setProductos((prev) => [created, ...prev]);
    setNewProduct({ nombre: "", stock: "", recetaId: "", venta: "", alertaStock: "10" });
    setShowNewProduct(false);
  };

  const bajoStock = productos.filter((p) => getProductStatus(p.stock, p.alertaStock).includes("Bajo") || getProductStatus(p.stock, p.alertaStock).includes("Sin")).length;
  const stockTotal = productos.reduce((a, p) => a + Number(p.stock || 0), 0);
  const gananciaEstimada = productos.reduce((a, p) => a + Math.max(0, Number(p.venta || 0) - Number(p.costo || 0)) * Number(p.stock || 0), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Productos"
        subtitle="Productos finales y stock listo para vender. El costo no se carga manualmente: se toma desde Producción / Recetas."
        primaryButtonText="+ Producto"
        primaryOnClick={() => setShowNewProduct(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ColorStatCard icon={<Package />} label="Productos" value={productos.length} color="from-fuchsia-500 via-pink-500 to-rose-500" />
        <ColorStatCard icon={<Boxes />} label="Stock total" value={stockTotal} color="from-sky-400 via-blue-500 to-indigo-600" />
        <ColorStatCard icon={<AlertTriangle />} label="Alertas stock" value={bajoStock} color="from-amber-300 via-orange-500 to-red-500" />
        <ColorStatCard icon={<DollarSign />} label="Ganancia estimada" value={money(gananciaEstimada)} color="from-emerald-400 via-teal-500 to-cyan-500" />
      </div>

      <Card>
        <CardContent className="p-5 overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-black text-white">Listado de productos</h2>
              <p className="text-sm text-slate-300">El estado se calcula solo por stock. El costo viene desde la receta vinculada y después alimenta Finanzas.</p>
            </div>
            <Button onClick={() => setShowNewProduct(true)} className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 text-white shadow-lg shadow-pink-950/30">
              <Plus className="w-4 h-4 mr-2" /> Agregar producto
            </Button>
          </div>
          <table className="w-full text-sm">
            <TableHead headers={["Producto", "Stock", "Alerta", "Costo receta", "Venta", "Ganancia estimada", "Estado"]} />
            <tbody>
              {productos.map((p) => {
                const estado = getProductStatus(p.stock, p.alertaStock);
                const ganancia = Math.max(0, Number(p.venta || 0) - Number(p.costo || 0)) * Number(p.stock || 0);
                return (
                  <tr key={p.id} className="border-b border-slate-800 hover:bg-white/[0.03] transition">
                    <td className="py-4 pr-4">
                      <p className="font-bold text-white">{p.nombre}</p>
                      <p className="text-xs text-slate-400 mt-1">{p.recetaNombre || "Pendiente de receta"}</p>
                    </td>
                    <td className="py-4 pr-4 text-slate-100">{p.stock}</td>
                    <td className="py-4 pr-4 text-slate-100">{p.alertaStock}</td>
                    <td className="py-4 pr-4 text-slate-100">{p.costo ? money(p.costo) : <Badge>Pendiente receta</Badge>}</td>
                    <td className="py-4 pr-4 text-slate-100">{money(p.venta)}</td>
                    <td className="py-4 pr-4 text-emerald-200 font-bold">{money(ganancia)}</td>
                    <td className="py-4 pr-4"><StatusBadge label={estado} tone={estado === "Activo" ? "success" : estado === "Bajo stock" ? "warning" : "danger"} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {showNewProduct && (
        <ModalShell eyebrow="Productos" title="Agregar producto" onClose={() => setShowNewProduct(false)}>
          <form onSubmit={handleCreateProduct} className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField icon={<Package />} label="Nombre del producto" value={newProduct.nombre} onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })} placeholder="Ej: Jabón lavanda" required />
              <InputField icon={<Boxes />} label="Stock actual" type="number" min="0" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} placeholder="Ej: 32" required />
              <div>
                <label className="text-sm font-bold text-slate-200 mb-2 block">Receta vinculada para tomar costo</label>
                <select value={newProduct.recetaId} onChange={(e) => setNewProduct({ ...newProduct, recetaId: e.target.value })} className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400">
                  <option value="">Pendiente de receta</option>
                  {recetas.map((receta) => <option key={receta.id} value={receta.id}>{receta.nombre}</option>)}
                </select>
              </div>
              <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-4 flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-950/30">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">Costo desde receta</p>
                  <p className="text-sm text-slate-200">{selectedRecipe ? `${money(selectedRecipeUnitCost)} por unidad` : "Primero cargá o vinculá una receta para traer el costo."}</p>
                </div>
              </div>
              <InputField icon={<CreditCard />} label="Precio de venta" type="number" min="0" value={newProduct.venta} onChange={(e) => setNewProduct({ ...newProduct, venta: e.target.value })} placeholder="Ej: 1800" required />
              <InputField icon={<AlertTriangle />} label="Alerta de stock mínimo" type="number" min="0" value={newProduct.alertaStock} onChange={(e) => setNewProduct({ ...newProduct, alertaStock: e.target.value })} placeholder="Ej: 10" required />
            </div>
            <div className="rounded-2xl bg-blue-950/35 border border-sky-400/20 p-4 text-sm text-sky-50">
              El costo no se escribe manualmente en Productos. Sale de <b>Producción / Recetas</b>. Con costo, precio de venta y stock, Finanzas puede calcular una ganancia estimada.
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button type="button" onClick={() => setShowNewProduct(false)} className="bg-slate-800 text-white border border-white/10">Cancelar</Button>
              <Button type="submit" className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 text-white shadow-lg shadow-pink-950/30">Guardar producto</Button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
}
function ClienteInsumos({ emp }) {
  const baseInsumos = insumosDemo
    .filter((i) => i.emprendimientoId === emp.id)
    .map((i) => ({
      ...i,
      precioCompra: i.costo,
      cantidadCompra: i.unidad === "kg" ? 1 : i.unidad === "100ml" ? 100 : 1,
      unidadCompra: i.unidad === "kg" ? "kg" : i.unidad === "100ml" ? "ml" : "unidad",
      proveedor: i.proveedor || "Sin proveedor",
    }));

  const [insumos, setInsumos] = useState(baseInsumos);
  const [showNewInsumo, setShowNewInsumo] = useState(false);
  const [newInsumo, setNewInsumo] = useState({
    nombre: "",
    precioCompra: "",
    cantidadCompra: "",
    unidadCompra: "kg",
    proveedor: "",
  });

  const getUnidadReceta = (unidadCompra) => {
    if (unidadCompra === "kg" || unidadCompra === "g") return "g";
    if (unidadCompra === "litro" || unidadCompra === "ml") return "ml";
    return "unidad";
  };

  const getCantidadBase = (cantidadCompra, unidadCompra) => {
    const cantidad = Number(cantidadCompra) || 0;
    if (unidadCompra === "kg") return cantidad * 1000;
    if (unidadCompra === "litro") return cantidad * 1000;
    return cantidad;
  };

  const getCostoUnitario = (item) => {
    const base = getCantidadBase(item.cantidadCompra, item.unidadCompra);
    if (!base) return 0;
    return Math.round((Number(item.precioCompra || item.costo || 0) / base) * 100) / 100;
  };

  const formatCompra = (item) => {
    const unidadTexto = item.unidadCompra === "litro" ? "litros" : item.unidadCompra;
    return `${item.cantidadCompra || 0} ${unidadTexto}`;
  };

  const handleCreateInsumo = (event) => {
    event.preventDefault();
    const item = {
      id: `INS-${Date.now()}`,
      emprendimientoId: emp.id,
      nombre: newInsumo.nombre,
      precioCompra: Number(newInsumo.precioCompra) || 0,
      costo: Number(newInsumo.precioCompra) || 0,
      cantidadCompra: Number(newInsumo.cantidadCompra) || 0,
      unidadCompra: newInsumo.unidadCompra,
      unidad: `${newInsumo.cantidadCompra} ${newInsumo.unidadCompra}`,
      proveedor: newInsumo.proveedor || "Pendiente proveedor",
    };
    setInsumos((prev) => [item, ...prev]);
    setNewInsumo({ nombre: "", precioCompra: "", cantidadCompra: "", unidadCompra: "kg", proveedor: "" });
    setShowNewInsumo(false);
  };

  const totalCompra = insumos.reduce((acc, i) => acc + Number(i.precioCompra || i.costo || 0), 0);
  const proveedores = new Set(insumos.map((i) => i.proveedor)).size;
  const promedioUnitario = insumos.length ? insumos.reduce((acc, i) => acc + getCostoUnitario(i), 0) / insumos.length : 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Insumos" subtitle="Cargá materia prima, materiales o insumos y calculá el costo por gramo, mililitro o unidad para usarlo en recetas." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ColorStatCard icon={<Boxes />} label="Insumos cargados" value={insumos.length} color="from-emerald-400 via-teal-500 to-cyan-500" />
        <ColorStatCard icon={<DollarSign />} label="Compra total" value={money(totalCompra)} color="from-violet-500 via-purple-500 to-fuchsia-500" />
        <ColorStatCard icon={<Building2 />} label="Proveedores" value={proveedores} color="from-amber-300 via-orange-500 to-red-500" />
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">Lista de insumos</h3>
              <p className="text-sm text-slate-300 mt-1">El precio unitario se calcula automáticamente y después lo toma Producción / Recetas.</p>
            </div>
            <Button onClick={() => setShowNewInsumo(true)} className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white shadow-lg shadow-cyan-950/30">
              <Plus className="w-4 h-4 mr-2" /> Nuevo insumo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-4">
              <p className="text-xs text-slate-400 font-black uppercase tracking-wide">Unidad para recetas</p>
              <p className="text-sm text-slate-100 mt-1">Kilos → gramos / Litros → mililitros / Unidad → unidad.</p>
            </div>
            <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-4">
              <p className="text-xs text-slate-400 font-black uppercase tracking-wide">Cálculo</p>
              <p className="text-sm text-slate-100 mt-1">Precio compra ÷ cantidad base = costo unitario.</p>
            </div>
            <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-4">
              <p className="text-xs text-slate-400 font-black uppercase tracking-wide">Promedio unitario</p>
              <p className="text-sm text-slate-100 mt-1">{money(promedioUnitario)} estimado entre insumos.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead headers={["Insumo", "Precio compra", "Compra", "Uso receta", "Costo unitario", "Proveedor"]} />
              <tbody>
                {insumos.map((item) => {
                  const unidadReceta = getUnidadReceta(item.unidadCompra);
                  return (
                    <tr key={item.id} className="border-b border-slate-800">
                      <td className="py-4 pr-4 text-white font-bold">{item.nombre}</td>
                      <td className="py-4 pr-4 text-slate-100">{money(item.precioCompra || item.costo)}</td>
                      <td className="py-4 pr-4 text-slate-100">{formatCompra(item)}</td>
                      <td className="py-4 pr-4 text-slate-100">{unidadReceta}</td>
                      <td className="py-4 pr-4 text-emerald-300 font-black">{money(getCostoUnitario(item))} / {unidadReceta}</td>
                      <td className="py-4 pr-4 text-slate-100">{item.proveedor}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showNewInsumo && (
        <ModalShell eyebrow="Insumos" title="Agregar nuevo insumo" onClose={() => setShowNewInsumo(false)}>
          <form onSubmit={handleCreateInsumo} className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField icon={<Boxes />} label="Nombre del insumo" value={newInsumo.nombre} onChange={(e) => setNewInsumo({ ...newInsumo, nombre: e.target.value })} placeholder="Ej: Glicerina, harina, esencia" required />
              <InputField icon={<DollarSign />} label="Precio de compra" type="number" min="0" value={newInsumo.precioCompra} onChange={(e) => setNewInsumo({ ...newInsumo, precioCompra: e.target.value })} placeholder="Ej: 6200" required />
              <InputField icon={<ClipboardList />} label="Cantidad comprada" type="number" min="0" step="0.01" value={newInsumo.cantidadCompra} onChange={(e) => setNewInsumo({ ...newInsumo, cantidadCompra: e.target.value })} placeholder="Ej: 1, 20, 30" required />
              <div>
                <label className="text-sm font-bold text-slate-200 mb-2 block">Unidad de compra</label>
                <select value={newInsumo.unidadCompra} onChange={(e) => setNewInsumo({ ...newInsumo, unidadCompra: e.target.value })} className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400">
                  <option value="kg">Kilo / kg</option>
                  <option value="g">Gramos / g</option>
                  <option value="litro">Litro / l</option>
                  <option value="ml">Mililitros / ml</option>
                  <option value="unidad">Unidad</option>
                </select>
              </div>
              <InputField icon={<Building2 />} label="Proveedor" value={newInsumo.proveedor} onChange={(e) => setNewInsumo({ ...newInsumo, proveedor: e.target.value })} placeholder="Ej: Distribuidora Sur" />
              <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-4 flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-950/30">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">Costo para receta</p>
                  <p className="text-sm text-slate-200">
                    {newInsumo.precioCompra && newInsumo.cantidadCompra
                      ? `${money(getCostoUnitario(newInsumo))} / ${getUnidadReceta(newInsumo.unidadCompra)}`
                      : "Se calcula automático."}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-blue-950/35 border border-sky-400/20 p-4 text-sm text-sky-50">
              Este costo unitario es el que va a usar <b>Producción / Recetas</b>. Ejemplo: si comprás 1 kg, el sistema lo pasa a 1000 g y calcula cuánto cuesta cada gramo.
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button type="button" onClick={() => setShowNewInsumo(false)} className="bg-slate-800 text-white border border-white/10">Cancelar</Button>
              <Button type="submit" className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white shadow-lg shadow-cyan-950/30">Guardar insumo</Button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
}
function ClienteRecetas({ emp }) {
  const insumos = insumosDemo.filter((i) => i.emprendimientoId === emp.id);
  const getInsumoUnitInfo = (insumo) => {
    const rawUnit = String(insumo?.unidad || "unidad").toLowerCase().replace(/\s/g, "");
    const amount = Number(rawUnit.match(/[\d.,]+/)?.[0]?.replace(",", ".") || 1);
    if (rawUnit.includes("kg")) return { unidadUso: "g", divisor: amount * 1000, label: `${amount} kg` };
    if (rawUnit.includes("gram") || rawUnit === "g") return { unidadUso: "g", divisor: amount, label: `${amount} g` };
    if (rawUnit.includes("litro") || rawUnit === "l") return { unidadUso: "ml", divisor: amount * 1000, label: `${amount} l` };
    if (rawUnit.includes("ml")) return { unidadUso: "ml", divisor: amount, label: `${amount} ml` };
    return { unidadUso: "unidad", divisor: amount, label: `${amount} unidad` };
  };
  const getUnitCost = (insumo) => {
    const info = getInsumoUnitInfo(insumo);
    return Number(insumo?.costo || 0) / Math.max(Number(info.divisor || 1), 1);
  };
  const buildInitialItems = (recipeName) => {
    if (emp.id === "EMP-001") {
      if (recipeName.toLowerCase().includes("lavanda")) {
        return [
          { id: "RI-LAV-1", insumoId: "INS-1", cantidad: 1000 },
          { id: "RI-LAV-2", insumoId: "INS-2", cantidad: 55 },
          { id: "RI-LAV-3", insumoId: "INS-4", cantidad: 18 },
          { id: "RI-LAV-4", insumoId: "INS-5", cantidad: 8 },
          { id: "RI-LAV-5", insumoId: "INS-24", cantidad: 4 },
        ];
      }
      return [
        { id: "RI-1", insumoId: "INS-1", cantidad: recipeName.toLowerCase().includes("lavanda") ? 1000 : 800 },
        { id: "RI-2", insumoId: "INS-2", cantidad: recipeName.toLowerCase().includes("lavanda") ? 60 : 40 },
      ];
    }
    return [{ id: "RI-1", insumoId: insumos[0]?.id || "", cantidad: 300 }];
  };
  const initialRecipes = recetasDemo
    .filter((r) => r.emprendimientoId === emp.id)
    .map((r) => ({
      ...r,
      margen: 50,
      items: r.items || buildInitialItems(r.nombre),
    }));
  const [recetas, setRecetas] = useState(initialRecipes);
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [showNewRecipe, setShowNewRecipe] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    nombre: "",
    margen: 50,
    items: [{ id: `TMP-${Date.now()}`, insumoId: insumos[0]?.id || "", cantidad: "" }],
  });

  const getRecipeItemCost = (item) => {
    const insumo = insumos.find((i) => i.id === item.insumoId);
    if (!insumo) return 0;
    return getUnitCost(insumo) * Number(item.cantidad || 0);
  };
  const getRecipeCost = (recipe) => Math.round((recipe.items || []).reduce((acc, item) => acc + getRecipeItemCost(item), 0));
  const calcularVenta = (costo, margen) => Math.round(Number(costo || 0) / (1 - Number(margen || 0) / 100));
  const selectedRecipe = recetas.find((r) => r.id === expandedRecipeId);

  function updateRecipeItem(recipeId, itemId, field, value) {
    setRecetas((prev) => prev.map((recipe) => {
      if (recipe.id !== recipeId) return recipe;
      return {
        ...recipe,
        items: (recipe.items || []).map((item) => item.id === itemId ? { ...item, [field]: value } : item),
      };
    }));
  }

  function updateRecipeMargin(recipeId, value) {
    setRecetas((prev) => prev.map((recipe) => recipe.id === recipeId ? { ...recipe, margen: Number(value) } : recipe));
  }

  function addItemToRecipe(recipeId) {
    setRecetas((prev) => prev.map((recipe) => {
      if (recipe.id !== recipeId) return recipe;
      return {
        ...recipe,
        items: [...(recipe.items || []), { id: `RI-${Date.now()}`, insumoId: insumos[0]?.id || "", cantidad: 0 }],
      };
    }));
  }

  function addNewRecipeItem() {
    setNewRecipe((prev) => ({
      ...prev,
      items: [...prev.items, { id: `TMP-${Date.now()}`, insumoId: insumos[0]?.id || "", cantidad: "" }],
    }));
  }

  function updateNewRecipeItem(itemId, field, value) {
    setNewRecipe((prev) => ({
      ...prev,
      items: prev.items.map((item) => item.id === itemId ? { ...item, [field]: value } : item),
    }));
  }

  function handleCreateRecipe(e) {
    e.preventDefault();
    if (!newRecipe.nombre.trim()) return;
    const cleanItems = newRecipe.items.filter((item) => item.insumoId && Number(item.cantidad || 0) > 0);
    const created = {
      id: `REC-${Date.now()}`,
      emprendimientoId: emp.id,
      nombre: newRecipe.nombre.trim(),
      margen: Number(newRecipe.margen || 50),
      items: cleanItems.length ? cleanItems : [{ id: `RI-${Date.now()}`, insumoId: insumos[0]?.id || "", cantidad: 0 }],
    };
    setRecetas((prev) => [created, ...prev]);
    setExpandedRecipeId(created.id);
    setShowNewRecipe(false);
    setNewRecipe({ nombre: "", margen: 50, items: [{ id: `TMP-${Date.now()}`, insumoId: insumos[0]?.id || "", cantidad: "" }] });
  }

  const totalCost = recetas.reduce((acc, recipe) => acc + getRecipeCost(recipe), 0);
  const totalSuggested = recetas.reduce((acc, recipe) => acc + calcularVenta(getRecipeCost(recipe), recipe.margen), 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Producción / Recetas" subtitle="Armá recetas con insumos, cantidades y costos automáticos para definir precios de venta reales." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ColorStatCard icon={<ClipboardList />} label="Recetas" value={recetas.length} color="from-sky-400 via-blue-500 to-indigo-600" />
        <ColorStatCard icon={<DollarSign />} label="Costo total" value={money(totalCost)} color="from-fuchsia-500 via-pink-500 to-rose-500" />
        <ColorStatCard icon={<CheckCircle2 />} label="Venta sugerida" value={money(totalSuggested)} color="from-emerald-400 via-teal-500 to-cyan-500" />
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white">Recetas vinculadas a insumos</h2>
              <p className="text-sm text-slate-300 mt-1">Cada receta toma el costo unitario desde Insumos. Al cambiar cantidades o margen, se recalcula el costo y precio sugerido.</p>
            </div>
            <Button onClick={() => setShowNewRecipe(true)} className="gap-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white shadow-lg shadow-cyan-950/30"><Plus className="w-4 h-4" /> Nueva receta</Button>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-4">
            <p className="text-sm text-sky-100 font-bold">Precio sugerido = costo de receta ÷ (1 - margen)</p>
            <p className="text-xs text-slate-300 mt-2">La receta trae el precio de cada insumo según su unidad: gramos, mililitros o unidades.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead headers={["Receta", "Costo receta", "Margen", "Precio sugerido", "Detalle"]} />
            <tbody>
              {recetas.map((recipe) => {
                const cost = getRecipeCost(recipe);
                const isExpanded = expandedRecipeId === recipe.id;
                return (
                  <React.Fragment key={recipe.id}>
                    <tr onClick={() => setExpandedRecipeId(isExpanded ? null : recipe.id)} className="border-b border-slate-800 cursor-pointer hover:bg-white/5 transition">
                      <td className="py-4 pr-4 text-white font-black">
                        {recipe.nombre}
                        <p className="text-xs text-slate-400 font-semibold mt-1">Click para {isExpanded ? "plegar" : "ver receta"}</p>
                      </td>
                      <td className="py-4 pr-4 text-slate-100">{money(cost)}</td>
                      <td className="py-4 pr-4 text-slate-100">{recipe.margen}%</td>
                      <td className="py-4 pr-4 text-emerald-200 font-black">{money(calcularVenta(cost, recipe.margen))}</td>
                      <td className="py-4 pr-4"><Badge>{isExpanded ? "Abierta" : "Ver"}</Badge></td>
                    </tr>
                    {isExpanded && (
                      <tr className="border-b border-slate-800">
                        <td colSpan="5" className="py-4">
                          <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-5 shadow-inner shadow-slate-950/50 space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                              <div>
                                <h3 className="text-lg font-black text-white">Detalle de {recipe.nombre}</h3>
                                <p className="text-sm text-slate-300">Editá cantidades, margen o agregá insumos. Luego tocá el tilde para confirmar.</p>
                              </div>
                              <div className="flex gap-2">
                                {editingRecipeId === recipe.id ? (
                                  <Button onClick={(e) => { e.stopPropagation(); setEditingRecipeId(null); }} className="px-3 py-2 rounded-xl bg-emerald-500 text-white"><CheckCircle2 className="w-4 h-4" /></Button>
                                ) : (
                                  <Button onClick={(e) => { e.stopPropagation(); setEditingRecipeId(recipe.id); }} className="px-3 py-2 rounded-xl bg-violet-500 text-white"><Pencil className="w-4 h-4" /></Button>
                                )}
                                <Button onClick={(e) => { e.stopPropagation(); setExpandedRecipeId(null); setEditingRecipeId(null); }} className="px-3 py-2 rounded-xl bg-slate-800 text-white">Plegar</Button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                                <p className="text-xs text-slate-400 font-black uppercase tracking-wide">Costo receta</p>
                                <p className="text-2xl font-black text-white mt-1">{money(cost)}</p>
                              </div>
                              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                                <p className="text-xs text-slate-400 font-black uppercase tracking-wide">Margen</p>
                                {editingRecipeId === recipe.id ? (
                                  <input type="number" value={recipe.margen} onChange={(e) => updateRecipeMargin(recipe.id, e.target.value)} className="mt-2 w-full rounded-xl bg-slate-900 border border-white/10 px-3 py-2 text-white" />
                                ) : <p className="text-2xl font-black text-white mt-1">{recipe.margen}%</p>}
                              </div>
                              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                                <p className="text-xs text-slate-400 font-black uppercase tracking-wide">Precio sugerido</p>
                                <p className="text-2xl font-black text-emerald-200 mt-1">{money(calcularVenta(cost, recipe.margen))}</p>
                              </div>
                            </div>

                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <TableHead headers={["Insumo", "Unidad", "Cantidad usada", "Costo unitario", "Subtotal"]} />
                                <tbody>
                                  {(recipe.items || []).map((item) => {
                                    const insumo = insumos.find((i) => i.id === item.insumoId);
                                    const info = getInsumoUnitInfo(insumo);
                                    return (
                                      <tr key={item.id} className="border-b border-slate-800">
                                        <td className="py-3 pr-3 text-slate-100">
                                          {editingRecipeId === recipe.id ? (
                                            <select value={item.insumoId} onChange={(e) => updateRecipeItem(recipe.id, item.id, "insumoId", e.target.value)} className="w-full rounded-xl bg-slate-900 border border-white/10 px-3 py-2 text-white">
                                              {insumos.map((i) => <option key={i.id} value={i.id}>{i.nombre}</option>)}
                                            </select>
                                          ) : insumo?.nombre || "Sin insumo"}
                                        </td>
                                        <td className="py-3 pr-3 text-slate-300">{info.unidadUso}</td>
                                        <td className="py-3 pr-3 text-slate-100">
                                          {editingRecipeId === recipe.id ? (
                                            <input type="number" value={item.cantidad} onChange={(e) => updateRecipeItem(recipe.id, item.id, "cantidad", e.target.value)} className="w-28 rounded-xl bg-slate-900 border border-white/10 px-3 py-2 text-white" />
                                          ) : `${item.cantidad} ${info.unidadUso}`}
                                        </td>
                                        <td className="py-3 pr-3 text-slate-300">{money(getUnitCost(insumo))} / {info.unidadUso}</td>
                                        <td className="py-3 pr-3 text-white font-bold">{money(getRecipeItemCost(item))}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            {editingRecipeId === recipe.id && <Button onClick={(e) => { e.stopPropagation(); addItemToRecipe(recipe.id); }} className="gap-2 bg-slate-800 text-white border border-white/10"><Plus className="w-4 h-4" /> Agregar insumo</Button>}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {showNewRecipe && (
        <ModalShell eyebrow="Producción" title="Nueva receta" onClose={() => setShowNewRecipe(false)}>
          <form onSubmit={handleCreateRecipe} className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Nombre de la receta" value={newRecipe.nombre} onChange={(e) => setNewRecipe({ ...newRecipe, nombre: e.target.value })} placeholder="Ej: Jabón lavanda" />
              <InputField label="Margen deseado (%)" type="number" value={newRecipe.margen} onChange={(e) => setNewRecipe({ ...newRecipe, margen: e.target.value })} placeholder="50" />
            </div>
            <div className="rounded-3xl bg-slate-950/60 border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-white font-black">Insumos de la receta</h3>
                  <p className="text-sm text-slate-300">Elegí el insumo y cargá la cantidad usada. El costo se calcula solo.</p>
                </div>
                <Button type="button" onClick={addNewRecipeItem} className="gap-2 bg-slate-800 text-white border border-white/10"><Plus className="w-4 h-4" /> Agregar</Button>
              </div>
              {newRecipe.items.map((item) => {
                const insumo = insumos.find((i) => i.id === item.insumoId);
                const info = getInsumoUnitInfo(insumo);
                const subtotal = getUnitCost(insumo) * Number(item.cantidad || 0);
                return (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl bg-white/5 border border-white/10 p-3">
                    <select value={item.insumoId} onChange={(e) => updateNewRecipeItem(item.id, "insumoId", e.target.value)} className="rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400">
                      {insumos.map((i) => <option key={i.id} value={i.id}>{i.nombre}</option>)}
                    </select>
                    <InputField label={`Cantidad en ${info.unidadUso}`} type="number" value={item.cantidad} onChange={(e) => updateNewRecipeItem(item.id, "cantidad", e.target.value)} placeholder="100" />
                    <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-3">
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Costo unitario</p>
                      <p className="text-sm text-slate-100 mt-1">{money(getUnitCost(insumo))} / {info.unidadUso}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-3">
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Subtotal</p>
                      <p className="text-sm text-emerald-200 font-black mt-1">{money(subtotal)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl bg-sky-500/10 border border-sky-300/20 p-4">
              <p className="text-sm text-sky-100 font-bold">Al guardar, la receta queda disponible para vincularla después con Productos y calcular el costo del producto final.</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" onClick={() => setShowNewRecipe(false)} className="bg-slate-800 text-white border border-white/10">Cancelar</Button>
              <Button type="submit" className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white shadow-lg shadow-cyan-950/30">Guardar receta</Button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
}

function ClienteExhibicion({ emp, publicaciones, consultas, portalConfig, portalViews, portalCacheInfo, commissionSettings, portalCommissions, setPublicaciones, onUpdateConsulta, onUpdatePortalConfig, onRegisterSale }) {
  const [showNewPublication, setShowNewPublication] = useState(false);
  const [newPublication, setNewPublication] = useState({ titulo: "", descripcion: "", precio: "", categoria: "", estado: "Visible", imagen: "", imageMeta: null });
  const [imageProcessing, setImageProcessing] = useState(false);
  const [imageMessage, setImageMessage] = useState("");
  const [imageError, setImageError] = useState("");
  const [bannerProcessing, setBannerProcessing] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");
  const [bannerError, setBannerError] = useState("");
  const [saleModal, setSaleModal] = useState(null);
  const [saleAmount, setSaleAmount] = useState("");
  const portalUrl = typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}?portal=${encodeURIComponent(emp.id)}` : `?portal=${emp.id}`;
  const visibles = publicaciones.filter((item) => item.estado === "Visible").length;
  const nuevas = consultas.filter((consulta) => consulta.estado === "Nueva").length;
  const concretadas = consultas.filter((consulta) => consulta.estado === "Venta concretada").length;
  const comisionPendiente = portalCommissions.filter((item) => item.estado === "Pendiente").reduce((acc, item) => acc + Number(item.comision || 0), 0);

  async function copyPortalLink() {
    try {
      await navigator.clipboard.writeText(portalUrl);
    } catch {
      // Clipboard can fail on insecure origins; the visible URL remains available.
    }
  }

  async function handleImageFile(file) {
    if (!file) return;
    setImageError("");
    setImageMessage("");
    setImageProcessing(true);
    try {
      const optimized = await compressPortalImage(file);
      setNewPublication((prev) => ({
        ...prev,
        imagen: optimized.dataUrl,
        imageMeta: {
          originalBytes: optimized.originalBytes,
          finalBytes: optimized.finalBytes,
          width: optimized.width,
          height: optimized.height,
        },
      }));
      setImageMessage(`Imagen optimizada: ${formatBytes(optimized.originalBytes)} -> ${formatBytes(optimized.finalBytes)}.`);
    } catch (error) {
      setNewPublication((prev) => ({ ...prev, imagen: "", imageMeta: null }));
      setImageError(error?.message || "No se pudo procesar la imagen.");
    } finally {
      setImageProcessing(false);
    }
  }

  async function handleBannerFile(file) {
    if (!file) return;
    setBannerError("");
    setBannerMessage("");
    setBannerProcessing(true);
    try {
      const optimized = await compressPortalBanner(file);
      onUpdatePortalConfig(emp.id, {
        bannerImage: optimized.dataUrl,
        bannerMeta: {
          originalBytes: optimized.originalBytes,
          finalBytes: optimized.finalBytes,
          width: optimized.width,
          height: optimized.height,
        },
      });
      setBannerMessage(`Banner optimizado: ${formatBytes(optimized.originalBytes)} -> ${formatBytes(optimized.finalBytes)}.`);
    } catch (error) {
      setBannerError(error?.message || "No se pudo procesar el banner.");
    } finally {
      setBannerProcessing(false);
    }
  }

  function createPublication(event) {
    event.preventDefault();
    if (imageProcessing) return;
    if (publicaciones.length >= PORTAL_PUBLICATION_LIMIT) {
      setImageError(`El portal permite hasta ${PORTAL_PUBLICATION_LIMIT} publicaciones.`);
      return;
    }
    if (!newPublication.titulo.trim()) return;
    const created = {
      id: `PUB-${Date.now()}`,
      emprendimientoId: emp.id,
      titulo: newPublication.titulo.trim(),
      descripcion: newPublication.descripcion.trim(),
      precio: Number(newPublication.precio || 0),
      categoria: newPublication.categoria.trim() || "General",
      estado: newPublication.estado,
      imagen: newPublication.imagen,
      imageMeta: newPublication.imageMeta,
    };
    setPublicaciones((prev) => [created, ...prev]);
    setNewPublication({ titulo: "", descripcion: "", precio: "", categoria: "", estado: "Visible", imagen: "", imageMeta: null });
    setImageMessage("");
    setImageError("");
    setShowNewPublication(false);
  }

  function togglePublication(publicationId) {
    setPublicaciones((prev) => prev.map((item) => item.id === publicationId ? { ...item, estado: item.estado === "Visible" ? "Oculto" : "Visible" } : item));
  }

  function openWhatsApp(consulta) {
    const phone = normalizePhoneForWhatsApp(consulta.whatsapp);
    const text = `Hola ${consulta.nombre}, te respondo por tu consulta sobre "${consulta.publicacionTitulo}".`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    onUpdateConsulta(consulta.id, { estado: "Respondida" });
  }

  function confirmSale(event) {
    event.preventDefault();
    if (!saleModal || !Number(saleAmount || 0)) return;
    onRegisterSale(saleModal.id, Number(saleAmount));
    setSaleModal(null);
    setSaleAmount("");
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Exhibición" subtitle="Portal público para mostrar productos, recibir consultas y convertir interesados en clientes potenciales." buttonText="Nueva publicación" onButtonClick={() => setShowNewPublication(true)} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ColorStatCard icon={<Eye />} label="Publicaciones" value={`${publicaciones.length}/${PORTAL_PUBLICATION_LIMIT}`} color="from-sky-400 via-blue-500 to-indigo-600" />
        <ColorStatCard icon={<CheckCircle2 />} label="Visibles" value={visibles} color="from-emerald-400 via-teal-500 to-cyan-500" />
        <ColorStatCard icon={<MessageCircle />} label="Consultas nuevas" value={nuevas} color="from-amber-300 via-orange-500 to-red-500" />
        <ColorStatCard icon={<Eye />} label="Vistas portal" value={portalViews} color="from-violet-500 via-purple-500 to-fuchsia-500" />
      </div>

      <Card>
        <CardContent className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white">Link público del portal</h2>
            <p className="text-sm text-slate-300 mt-1 break-all">{portalUrl}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="button" onClick={copyPortalLink} className="bg-blue-500 text-black"><Copy className="w-4 h-4 mr-2" />Copiar link</Button>
            <a href={portalUrl} target="_blank" rel="noreferrer">
              <Button type="button" className="w-full bg-slate-800 text-white"><Eye className="w-4 h-4 mr-2" />Ver portal</Button>
            </a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white">Comisiones del portal</h2>
            <p className="text-sm text-slate-300 mt-1">Comisión vigente: {commissionSettings.porcentaje}% por venta concretada. Límite mensual: {money(commissionSettings.limiteMensual)}.</p>
          </div>
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-right">
            <p className="text-xs font-black uppercase tracking-wide text-amber-200">Pendiente</p>
            <p className="text-2xl font-black text-white">{money(comisionPendiente)}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-[.9fr_.7fr] gap-5">
        <Card>
          <CardContent className="p-5 space-y-4">
            <div>
              <h2 className="text-xl font-black text-white">Configuración del portal</h2>
              <p className="text-sm text-slate-300 mt-1">Texto y color visible para cualquier persona que abra el link público.</p>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-200 mb-2 block">Descripción pública</label>
              <textarea value={portalConfig.descripcion} onChange={(e) => onUpdatePortalConfig(emp.id, { descripcion: e.target.value })} className="w-full min-h-[100px] rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400" />
            </div>
            <SelectField label="Color del portal" value={portalConfig.color} onChange={(e) => onUpdatePortalConfig(emp.id, { color: e.target.value })} options={["cyan", "violet", "emerald", "amber", "rose"]} labels={{ cyan: "Cyan / azul", violet: "Violeta", emerald: "Verde", amber: "Dorado", rose: "Rosa" }} />
            <div className="rounded-2xl border border-slate-300 bg-slate-50 p-4">
              <label className="text-sm font-bold text-slate-700 mb-2 block">Banner del portal</label>
              <input type="file" accept="image/*" onChange={(e) => handleBannerFile(e.target.files?.[0])} className="w-full rounded-xl bg-white border border-slate-300 px-3 py-3 text-slate-900" />
              <p className="mt-2 text-xs text-slate-500">Maximo permitido: {formatBytes(PORTAL_BANNER_MAX_UPLOAD_BYTES)}. Se comprime automaticamente antes de guardar.</p>
              {bannerProcessing && <p className="mt-2 text-xs font-bold text-sky-700">Optimizando banner...</p>}
              {bannerMessage && <p className="mt-2 text-xs font-bold text-emerald-700">{bannerMessage}</p>}
              {bannerError && <p className="mt-2 text-xs font-bold text-red-600">{bannerError}</p>}
              {portalConfig.bannerImage && <Button type="button" onClick={() => onUpdatePortalConfig(emp.id, { bannerImage: "", bannerMeta: null })} className="mt-3 bg-slate-800 text-white px-3 py-2 text-xs">Quitar banner</Button>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 space-y-4">
            <h2 className="text-xl font-black text-white">Movimiento del portal</h2>
            <div className="grid grid-cols-2 gap-3">
              <DetailBox icon={<Eye />} label="Vistas" value={portalViews} />
              <DetailBox icon={<CheckCircle2 />} label="Ventas" value={concretadas} />
            </div>
            <p className="text-sm text-slate-300">Las ventas concretadas quedan marcadas en consultas. La comisión la agregamos en la siguiente etapa.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_.9fr] gap-5">
        <Card>
          <CardContent className="p-5 space-y-4">
            <h2 className="text-xl font-black text-white">Publicaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {publicaciones.map((item) => (
                <ExhibicionCard key={item.id} item={item} onToggle={() => togglePublication(item.id)} />
              ))}
              {!publicaciones.length && <p className="text-sm text-slate-300">Todavía no hay publicaciones.</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-4">
            <h2 className="text-xl font-black text-white">Consultas del portal</h2>
            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
              {consultas.map((consulta) => (
                <div key={consulta.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-white">{consulta.nombre}</p>
                      <p className="text-xs text-sky-300">{consulta.fecha} · {consulta.publicacionTitulo}</p>
                    </div>
                    <StatusBadge label={consulta.estado} tone={consulta.estado === "Nueva" ? "danger" : consulta.estado === "Potencial" ? "warning" : "success"} />
                  </div>
                  <p className="text-sm text-slate-100 mt-3">{consulta.mensaje}</p>
                  <p className="text-sm text-emerald-300 font-bold mt-2">WhatsApp: {consulta.whatsapp}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button type="button" onClick={() => openWhatsApp(consulta)} className="bg-green-500 text-black px-3 py-2 text-xs"><MessageCircle className="w-3 h-3 mr-1" />Responder</Button>
                    <Button type="button" onClick={() => onUpdateConsulta(consulta.id, { estado: "Potencial" })} className="bg-violet-500/20 text-violet-100 border border-violet-300/20 px-3 py-2 text-xs">Convertir en potencial</Button>
                    <Button type="button" onClick={() => { setSaleModal(consulta); setSaleAmount(""); }} className="bg-emerald-500/20 text-emerald-100 border border-emerald-300/20 px-3 py-2 text-xs">Venta concretada</Button>
                    <Button type="button" onClick={() => onUpdateConsulta(consulta.id, { estado: "Cerrada" })} className="bg-slate-800 text-white px-3 py-2 text-xs">Cerrar</Button>
                  </div>
                </div>
              ))}
              {!consultas.length && <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">Las consultas enviadas desde el portal van a aparecer acá.</div>}
            </div>
          </CardContent>
        </Card>
      </div>

      {showNewPublication && (
        <ModalShell eyebrow="Exhibición" title="Nueva publicación" onClose={() => setShowNewPublication(false)}>
          <form onSubmit={createPublication} className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField icon={<ShoppingBag />} label="Título" value={newPublication.titulo} onChange={(e) => setNewPublication({ ...newPublication, titulo: e.target.value })} placeholder="Ej: Box regalo personalizado" required />
              <InputField icon={<DollarSign />} label="Precio opcional" type="number" min="0" value={newPublication.precio} onChange={(e) => setNewPublication({ ...newPublication, precio: e.target.value })} placeholder="Ej: 12000" />
              <InputField icon={<Boxes />} label="Categoría" value={newPublication.categoria} onChange={(e) => setNewPublication({ ...newPublication, categoria: e.target.value })} placeholder="Ej: Regalos" />
              <SelectField label="Estado" value={newPublication.estado} onChange={(e) => setNewPublication({ ...newPublication, estado: e.target.value })} options={["Visible", "Oculto"]} />
              <InputField icon={<Globe />} label="URL de imagen" value={newPublication.imagen} onChange={(e) => { setImageError(""); setImageMessage(""); setNewPublication({ ...newPublication, imagen: e.target.value, imageMeta: null }); }} placeholder="https://..." />
              <div>
                <label className="text-sm font-bold text-slate-200 mb-2 block">Subir foto local</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageFile(e.target.files?.[0])} className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-3 text-white" />
                <p className="mt-2 text-xs text-slate-400">Maximo permitido: {formatBytes(PORTAL_IMAGE_MAX_UPLOAD_BYTES)}. La app intenta dejarla cerca de {formatBytes(PORTAL_IMAGE_TARGET_BYTES)}.</p>
                {imageProcessing && <p className="mt-2 text-xs font-bold text-sky-300">Optimizando imagen...</p>}
                {imageMessage && <p className="mt-2 text-xs font-bold text-emerald-300">{imageMessage}</p>}
                {imageError && <p className="mt-2 text-xs font-bold text-red-300">{imageError}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-200 mb-2 block">Descripción</label>
                <textarea value={newPublication.descripcion} onChange={(e) => setNewPublication({ ...newPublication, descripcion: e.target.value })} placeholder="Detalle comercial de la publicación" className="w-full min-h-[120px] rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" onClick={() => setShowNewPublication(false)} className="bg-slate-800 text-white">Cancelar</Button>
              <Button type="submit" disabled={imageProcessing} className="bg-blue-500 text-black">{imageProcessing ? "Optimizando..." : "Publicar"}</Button>
            </div>
          </form>
        </ModalShell>
      )}

      {saleModal && (
        <ModalShell eyebrow="Venta por portal" title={saleModal.publicacionTitulo} onClose={() => setSaleModal(null)}>
          <form onSubmit={confirmSale} className="p-5 space-y-4">
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-slate-100">
              Cargá el monto vendido. El sistema calcula la comisión vigente y respeta el límite mensual configurado por C&R.
            </div>
            <InputField icon={<DollarSign />} label="Monto vendido" type="number" min="0" value={saleAmount} onChange={(e) => setSaleAmount(e.target.value)} placeholder="Ej: 15000" required />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <InfoItem label="Comisión" value={`${commissionSettings.porcentaje}%`} />
              <InfoItem label="Límite mensual" value={money(commissionSettings.limiteMensual)} />
              <InfoItem label="Estimado" value={money(Math.round(Number(saleAmount || 0) * (Number(commissionSettings.porcentaje || 0) / 100)))} highlight />
            </div>
            <div className="flex gap-3">
              <Button type="button" onClick={() => setSaleModal(null)} className="w-full bg-slate-800 text-white">Cancelar</Button>
              <Button type="submit" className="w-full bg-emerald-500 text-black">Registrar venta</Button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
}

function ExhibicionCard({ item, onToggle }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70">
      <PublicacionImage item={item} />
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-sky-300">{item.categoria}</p>
            <h3 className="text-lg font-black text-white">{item.titulo}</h3>
          </div>
          <StatusBadge label={item.estado} tone={item.estado === "Visible" ? "success" : "warning"} />
        </div>
        <p className="text-sm text-slate-300">{item.descripcion}</p>
        <div className="flex items-center justify-between gap-3">
          <p className="text-emerald-300 font-black">{item.precio ? money(item.precio) : "Consultar"}</p>
          <Button type="button" onClick={onToggle} className="bg-slate-800 text-white px-3 py-2 text-xs">{item.estado === "Visible" ? "Ocultar" : "Mostrar"}</Button>
        </div>
      </div>
    </div>
  );
}

function PublicacionImage({ item }) {
  if (item.imagen) {
    return <img src={item.imagen} alt={item.titulo} className="h-56 w-full object-cover" />;
  }
  return (
    <div className="h-56 w-full bg-gradient-to-br from-sky-500 via-violet-500 to-emerald-400 flex items-center justify-center">
      <Package className="w-14 h-14 text-white/90" />
    </div>
  );
}

function ClienteClientes({ emp, potenciales = [] }) {
  const baseClientes = clientesDemo.filter((c) => c.emprendimientoId === emp.id).map((c) => ({
    ...c,
    email: c.email || "",
    direccion: c.direccion || "",
    notas: c.notas || "Cliente cargado para presupuestos, pedidos y WhatsApp.",
    totalComprado: c.totalComprado || c.compras * 8500,
    ultimaActividad: c.ultimaCompra ? `Último pedido: ${c.ultimaCompra}` : "Sin movimientos",
  }));
  const clientesPotenciales = potenciales.map((consulta) => ({
    id: `POT-${consulta.id}`,
    emprendimientoId: emp.id,
    nombre: consulta.nombre,
    telefono: consulta.whatsapp,
    email: "",
    direccion: "",
    notas: `Cliente potencial desde portal. Interés: ${consulta.publicacionTitulo}. Consulta: ${consulta.mensaje}`,
    compras: 0,
    ultimaCompra: "Sin compras todavía",
    estado: "Potencial",
    ultimaActividad: `Consulta portal: ${consulta.publicacionTitulo}`,
    totalComprado: 0,
  }));
  const [clientes, setClientes] = useState([...clientesPotenciales, ...baseClientes]);
  const [showNewClient, setShowNewClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({ nombre: "", telefono: "", email: "", direccion: "", notas: "" });

  useEffect(() => {
    setClientes((prev) => {
      const existingIds = new Set(prev.map((cliente) => cliente.id));
      const nuevos = clientesPotenciales.filter((cliente) => !existingIds.has(cliente.id));
      return nuevos.length ? [...nuevos, ...prev] : prev;
    });
  }, [potenciales]);

  function handleCreateClient(event) {
    event.preventDefault();
    const cliente = {
      id: `CLI-${Date.now()}`,
      emprendimientoId: emp.id,
      nombre: newClient.nombre,
      telefono: newClient.telefono,
      email: newClient.email,
      direccion: newClient.direccion,
      notas: newClient.notas || "Sin notas",
      compras: 0,
      ultimaCompra: "Sin compras todavía",
      ultimaActividad: "Cliente creado",
      totalComprado: 0,
    };
    setClientes((prev) => [cliente, ...prev]);
    setNewClient({ nombre: "", telefono: "", email: "", direccion: "", notas: "" });
    setShowNewClient(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Clientes" subtitle="Agenda simple para presupuestos, pedidos y mensajes por WhatsApp." />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ColorStatCard icon={<Users />} label="Clientes" value={clientes.length} color="from-violet-500 via-purple-500 to-fuchsia-500" />
        <ColorStatCard icon={<CreditCard />} label="Presupuestos" value={clientes.reduce((a,c)=>a+(c.compras || 0),0)} color="from-sky-400 via-blue-500 to-indigo-600" />
        <ColorStatCard icon={<ShoppingBag />} label="Pedidos" value={clientes.filter((c)=>c.compras > 0).length} color="from-emerald-400 via-teal-500 to-cyan-500" />
        <ColorStatCard icon={<MessageCircle />} label="WhatsApp" value={clientes.filter((c)=>c.telefono).length} color="from-amber-300 via-orange-500 to-red-500" />
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">Base de clientes</h3>
              <p className="text-sm text-slate-300 mt-1">Guardá los datos mínimos para cotizar, tomar pedidos y enviar avisos.</p>
            </div>
            <Button onClick={() => setShowNewClient(true)} className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-950/30 rounded-2xl">
              <Plus className="w-4 h-4 mr-2" /> Nuevo cliente
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead headers={["Cliente", "WhatsApp", "Presupuestos/Pedidos", "Última actividad", "Total comprado", "Acciones"]} />
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="border-b border-slate-800 hover:bg-white/5 transition">
                    <td className="py-4 pr-4">
                      <button onClick={() => setSelectedClient(cliente)} className="text-left">
                        <p className="font-black text-white">{cliente.nombre}</p>
                        <p className="text-xs text-slate-400">{cliente.email || "Sin email"}</p>
                      </button>
                    </td>
                    <td className="py-4 pr-4 text-slate-100">{cliente.telefono}</td>
                    <td className="py-4 pr-4 text-slate-100">{cliente.compras || 0}</td>
                    <td className="py-4 pr-4 text-slate-100">{cliente.ultimaActividad || cliente.ultimaCompra}</td>
                    <td className="py-4 pr-4 text-emerald-200 font-black">{money(cliente.totalComprado || 0)}</td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={() => setSelectedClient(cliente)} className="bg-sky-500/20 text-sky-100 border border-sky-300/20 px-3 py-2 text-xs">Ver ficha</Button>
                        <Button className="bg-emerald-500/20 text-emerald-100 border border-emerald-300/20 px-3 py-2 text-xs">Presupuesto</Button>
                        <Button className="bg-green-500/20 text-green-100 border border-green-300/20 px-3 py-2 text-xs">WhatsApp</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showNewClient && (
        <ModalShell eyebrow="Clientes" title="Nuevo cliente" onClose={() => setShowNewClient(false)}>
          <form onSubmit={handleCreateClient} className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField icon={<Users />} label="Nombre del cliente" value={newClient.nombre} onChange={(e) => setNewClient({ ...newClient, nombre: e.target.value })} placeholder="Ej: María López" required />
              <InputField icon={<Phone />} label="WhatsApp" value={newClient.telefono} onChange={(e) => setNewClient({ ...newClient, telefono: e.target.value })} placeholder="Ej: 2974 111222" required />
              <InputField icon={<Mail />} label="Email opcional" value={newClient.email} onChange={(e) => setNewClient({ ...newClient, email: e.target.value })} placeholder="cliente@email.com" />
              <InputField icon={<Globe />} label="Dirección opcional" value={newClient.direccion} onChange={(e) => setNewClient({ ...newClient, direccion: e.target.value })} placeholder="Barrio, calle o referencia" />
              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-200 mb-2 block">Notas</label>
                <textarea value={newClient.notas} onChange={(e) => setNewClient({ ...newClient, notas: e.target.value })} placeholder="Ej: prefiere retirar por la tarde, compra para regalos, pidió catálogo" className="w-full min-h-[110px] rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400" />
              </div>
            </div>
            <div className="rounded-2xl bg-blue-950/35 border border-sky-400/20 p-4 text-sm text-sky-50">
              Este cliente después se usa para presupuestos, pedidos y mensajes de WhatsApp. Las compras y totales se calculan automáticamente.
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" onClick={() => setShowNewClient(false)} className="bg-slate-800 text-white border border-white/10">Cancelar</Button>
              <Button type="submit" className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-950/30">Guardar cliente</Button>
            </div>
          </form>
        </ModalShell>
      )}

      {selectedClient && (
        <ModalShell eyebrow="Ficha del cliente" title={selectedClient.nombre} onClose={() => setSelectedClient(null)}>
          <div className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DetailBox icon={<Phone />} label="WhatsApp" value={selectedClient.telefono || "Sin teléfono"} />
              <DetailBox icon={<CreditCard />} label="Presupuestos/Pedidos" value={selectedClient.compras || 0} />
              <DetailBox icon={<DollarSign />} label="Total comprado" value={money(selectedClient.totalComprado || 0)} />
            </div>
            <div className="rounded-3xl bg-slate-950/60 border border-white/10 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-slate-400">Notas</p>
              <p className="text-slate-100 mt-2">{selectedClient.notas || "Sin notas"}</p>
            </div>
            <div className="rounded-3xl bg-blue-950/35 border border-sky-400/20 p-5">
              <p className="font-black text-white">Próximo paso</p>
              <p className="text-sm text-slate-300 mt-1">Desde esta ficha después vamos a poder crear presupuesto, crear pedido, ver historial y preparar WhatsApp.</p>
            </div>
          </div>
        </ModalShell>
      )}
    </div>
  );
}

function ClienteInventario({ emp }) {
  const productos = productosDemo.filter((p) => p.emprendimientoId === emp.id);
  const rows = productos.map((p) => [p.nombre, p.stock, p.estado, money(p.costo), money(p.venta)]);
  return <DataPage title="Inventario" subtitle="Control general de stock disponible, bajo stock y productos listos para vender." headers={["Producto", "Stock", "Estado", "Costo", "Venta"]} rows={rows} stats={[
    { icon: <Boxes />, label: "Stock total", value: productos.reduce((a,p)=>a+p.stock,0), color: "from-sky-400 via-blue-500 to-indigo-600" },
    { icon: <AlertTriangle />, label: "Bajo stock", value: productos.filter((p)=>p.estado.includes("Bajo")).length, color: "from-amber-300 via-orange-500 to-red-500" },
    { icon: <Package />, label: "Productos", value: productos.length, color: "from-fuchsia-500 via-pink-500 to-rose-500" },
  ]} />;
}

function ClienteProveedores({ emp }) {
  const insumos = insumosDemo.filter((i) => i.emprendimientoId === emp.id);
  const baseProveedores = Array.from(new Set(insumos.map((i) => i.proveedor || "Sin proveedor"))).map((proveedor, index) => ({
    id: `PROV-${index + 1}`,
    nombre: proveedor,
    contacto: index === 0 ? "2974 000111" : "Pendiente contacto",
    rubro: "Insumos / Materia prima",
    estado: "Activo",
    notas: "Proveedor cargado desde insumos existentes.",
  }));

  const [proveedores, setProveedores] = useState(baseProveedores);
  const [showNewProveedor, setShowNewProveedor] = useState(false);
  const [newProveedor, setNewProveedor] = useState({
    nombre: "",
    contacto: "",
    rubro: "",
    estado: "Activo",
    notas: "",
  });

  const countInsumosProveedor = (nombre) => insumos.filter((i) => (i.proveedor || "Sin proveedor") === nombre).length;
  const activos = proveedores.filter((p) => p.estado === "Activo").length;
  const pausados = proveedores.filter((p) => p.estado === "Pausado").length;

  const handleCreateProveedor = (event) => {
    event.preventDefault();
    const item = {
      id: `PROV-${Date.now()}`,
      nombre: newProveedor.nombre,
      contacto: newProveedor.contacto || "Pendiente contacto",
      rubro: newProveedor.rubro || "Sin rubro definido",
      estado: newProveedor.estado,
      notas: newProveedor.notas || "Sin notas",
    };
    setProveedores((prev) => [item, ...prev]);
    setNewProveedor({ nombre: "", contacto: "", rubro: "", estado: "Activo", notas: "" });
    setShowNewProveedor(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Proveedores" subtitle="Base de proveedores para controlar dónde comprás cada insumo, materia prima o material de trabajo." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ColorStatCard icon={<Building2 />} label="Proveedores" value={proveedores.length} color="from-violet-500 via-purple-500 to-fuchsia-500" />
        <ColorStatCard icon={<CheckCircle2 />} label="Activos" value={activos} color="from-emerald-400 via-teal-500 to-cyan-500" />
        <ColorStatCard icon={<AlertTriangle />} label="Pausados" value={pausados} color="from-amber-300 via-orange-500 to-red-500" />
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">Lista de proveedores</h3>
              <p className="text-sm text-slate-300 mt-1">Los insumos vinculados se calculan automáticamente según el proveedor cargado en cada insumo.</p>
            </div>
            <Button onClick={() => setShowNewProveedor(true)} className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-950/30">
              <Plus className="w-4 h-4 mr-2" /> Nuevo proveedor
            </Button>
          </div>

          <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-4 text-sm text-slate-200">
            Primero cargás el proveedor acá. Después, cuando cargás un insumo, elegís ese proveedor y el sistema cuenta automáticamente cuántos insumos tiene vinculados.
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead headers={["Proveedor", "Contacto", "Rubro", "Insumos vinculados", "Estado", "Notas"]} />
              <tbody>
                {proveedores.map((p) => (
                  <tr key={p.id} className="border-b border-slate-800">
                    <td className="py-4 pr-4 text-white font-bold">{p.nombre}</td>
                    <td className="py-4 pr-4 text-slate-100">{p.contacto}</td>
                    <td className="py-4 pr-4 text-slate-100">{p.rubro}</td>
                    <td className="py-4 pr-4 text-cyan-300 font-black">{countInsumosProveedor(p.nombre)}</td>
                    <td className="py-4 pr-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${p.estado === "Activo" ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30" : "bg-amber-500/20 text-amber-200 border border-amber-400/30"}`}>
                        {p.estado}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-slate-100 max-w-[260px]">{p.notas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showNewProveedor && (
        <ModalShell eyebrow="Proveedores" title="Agregar nuevo proveedor" onClose={() => setShowNewProveedor(false)}>
          <form onSubmit={handleCreateProveedor} className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField icon={<Building2 />} label="Nombre del proveedor" value={newProveedor.nombre} onChange={(e) => setNewProveedor({ ...newProveedor, nombre: e.target.value })} placeholder="Ej: Distribuidora Sur" required />
              <InputField icon={<Phone />} label="Contacto / WhatsApp" value={newProveedor.contacto} onChange={(e) => setNewProveedor({ ...newProveedor, contacto: e.target.value })} placeholder="Ej: 2974 000111" />
              <InputField icon={<ClipboardList />} label="Rubro o tipo de proveedor" value={newProveedor.rubro} onChange={(e) => setNewProveedor({ ...newProveedor, rubro: e.target.value })} placeholder="Ej: Materia prima, envases, gráfica" />
              <div>
                <label className="text-sm font-bold text-slate-200 mb-2 block">Estado</label>
                <select value={newProveedor.estado} onChange={(e) => setNewProveedor({ ...newProveedor, estado: e.target.value })} className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400">
                  <option value="Activo">Activo</option>
                  <option value="Pausado">Pausado</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-200 mb-2 block">Notas internas</label>
                <textarea value={newProveedor.notas} onChange={(e) => setNewProveedor({ ...newProveedor, notas: e.target.value })} placeholder="Ej: buen precio en glicerina, demora 48 hs, pedir por WhatsApp" className="w-full min-h-[110px] rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400" />
              </div>
            </div>
            <div className="rounded-2xl bg-blue-950/35 border border-sky-400/20 p-4 text-sm text-sky-50">
              Los insumos vinculados no se cargan manualmente acá. Se calculan solos cuando un insumo usa este proveedor.
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button type="button" onClick={() => setShowNewProveedor(false)} className="bg-slate-800 text-white border border-white/10">Cancelar</Button>
              <Button type="submit" className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-950/30">Guardar proveedor</Button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
}
function ClientePresupuestos({ emp }) {
  const productos = productosDemo.filter((p) => p.emprendimientoId === emp.id);
  const clientes = clientesDemo.filter((c) => c.emprendimientoId === emp.id);
  const initialPresupuestos = [
    { id: "PRE-001", clienteId: clientes[0]?.id, cliente: clientes[0]?.nombre || "Cliente nuevo", estado: "Borrador", descuento: 10, items: productos.slice(0, 2).map((p) => ({ productoId: p.id, nombre: p.nombre, cantidad: 1, precio: p.venta })), fecha: "18/06/2026" },
  ];
  const [presupuestos, setPresupuestos] = useState(initialPresupuestos);
  const [showNewBudget, setShowNewBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({ clienteId: clientes[0]?.id || "", descuento: 0, items: [{ productoId: productos[0]?.id || "", cantidad: 1 }] });

  const budgetTotal = (budget) => {
    const subtotal = budget.items.reduce((acc, item) => acc + Number(item.precio || 0) * Number(item.cantidad || 0), 0);
    return Math.round(subtotal * (1 - Number(budget.descuento || 0) / 100));
  };
  const newSubtotal = newBudget.items.reduce((acc, item) => {
    const producto = productos.find((p) => p.id === item.productoId);
    return acc + Number(producto?.venta || 0) * Number(item.cantidad || 0);
  }, 0);
  const newTotal = Math.round(newSubtotal * (1 - Number(newBudget.descuento || 0) / 100));

  function updateBudgetItem(index, field, value) {
    setNewBudget((prev) => ({ ...prev, items: prev.items.map((item, i) => i === index ? { ...item, [field]: value } : item) }));
  }

  function addBudgetItem() {
    setNewBudget((prev) => ({ ...prev, items: [...prev.items, { productoId: productos[0]?.id || "", cantidad: 1 }] }));
  }

  function handleCreateBudget(event) {
    event.preventDefault();
    const cliente = clientes.find((c) => c.id === newBudget.clienteId);
    const items = newBudget.items.map((item) => {
      const producto = productos.find((p) => p.id === item.productoId);
      return { productoId: item.productoId, nombre: producto?.nombre || "Producto", cantidad: Number(item.cantidad || 1), precio: Number(producto?.venta || 0) };
    });
    setPresupuestos((prev) => [{ id: `PRE-${Date.now()}`, clienteId: newBudget.clienteId, cliente: cliente?.nombre || "Cliente", estado: "Borrador", descuento: Number(newBudget.descuento || 0), items, fecha: isoToEsDate(todayISO()) }, ...prev]);
    setNewBudget({ clienteId: clientes[0]?.id || "", descuento: 0, items: [{ productoId: productos[0]?.id || "", cantidad: 1 }] });
    setShowNewBudget(false);
  }

  async function copyBudgetWhatsApp(budget) {
    const text = `Hola ${budget.cliente}, te paso el presupuesto de ${emp.nombre}: ${budget.items.map((i) => `${i.nombre} x${i.cantidad}`).join(", ")}. Total: ${money(budgetTotal(budget))}`;
    try { await navigator.clipboard.writeText(text); alert("Mensaje de presupuesto copiado para WhatsApp"); } catch { alert(text); }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Presupuestos / Cotizador" subtitle="Armá presupuestos eligiendo cliente, productos, cantidades y descuento." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ColorStatCard icon={<CreditCard />} label="Presupuestos" value={presupuestos.length} color="from-sky-400 via-blue-500 to-indigo-600" />
        <ColorStatCard icon={<CheckCircle2 />} label="Aceptados" value={presupuestos.filter((p)=>p.estado === "Aceptado").length} color="from-emerald-400 via-teal-500 to-cyan-500" />
        <ColorStatCard icon={<Clock />} label="Borradores" value={presupuestos.filter((p)=>p.estado === "Borrador").length} color="from-violet-500 via-purple-500 to-fuchsia-500" />
        <ColorStatCard icon={<MessageCircle />} label="WhatsApp" value="Listo" color="from-amber-300 via-orange-500 to-red-500" />
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">Presupuestos creados</h3>
              <p className="text-sm text-slate-300 mt-1">Cuando el cliente acepta, después lo convertimos en pedido.</p>
            </div>
            <Button onClick={() => setShowNewBudget(true)} className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-950/30 rounded-2xl">
              <Plus className="w-4 h-4 mr-2" /> Nuevo presupuesto
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead headers={["ID", "Cliente", "Productos", "Descuento", "Total", "Estado", "Acciones"]} />
              <tbody>
                {presupuestos.map((p) => (
                  <tr key={p.id} className="border-b border-slate-800">
                    <td className="py-4 pr-4 text-slate-300 font-bold">{p.id}</td>
                    <td className="py-4 pr-4 text-white font-black">{p.cliente}</td>
                    <td className="py-4 pr-4 text-slate-100">{p.items.map((i)=>`${i.nombre} x${i.cantidad}`).join(" · ")}</td>
                    <td className="py-4 pr-4 text-slate-100">{p.descuento}%</td>
                    <td className="py-4 pr-4 text-emerald-200 font-black">{money(budgetTotal(p))}</td>
                    <td className="py-4 pr-4"><span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-100 border border-blue-300/20">{p.estado}</span></td>
                    <td className="py-4 pr-4"><Button onClick={() => copyBudgetWhatsApp(p)} className="bg-green-500/20 text-green-100 border border-green-300/20 px-3 py-2 text-xs"><MessageCircle className="w-3 h-3 mr-1" /> WhatsApp</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showNewBudget && (
        <ModalShell eyebrow="Cotizador" title="Nuevo presupuesto" onClose={() => setShowNewBudget(false)}>
          <form onSubmit={handleCreateBudget} className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-200 mb-2 block">Cliente</label>
                <select value={newBudget.clienteId} onChange={(e) => setNewBudget({ ...newBudget, clienteId: e.target.value })} className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400">
                  {clientes.map((c) => <option key={c.id} value={c.id}>{c.nombre} · {c.telefono}</option>)}
                </select>
              </div>
              <InputField icon={<DollarSign />} label="Descuento %" type="number" value={newBudget.descuento} onChange={(e) => setNewBudget({ ...newBudget, descuento: e.target.value })} placeholder="0" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black text-white">Productos del presupuesto</h4>
                <Button type="button" onClick={addBudgetItem} className="bg-slate-800 text-white border border-white/10"><Plus className="w-4 h-4 mr-2" /> Agregar producto</Button>
              </div>
              {newBudget.items.map((item, index) => {
                const producto = productos.find((p) => p.id === item.productoId);
                const subtotal = Number(producto?.venta || 0) * Number(item.cantidad || 0);
                return (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl bg-white/5 border border-white/10 p-3">
                    <select value={item.productoId} onChange={(e) => updateBudgetItem(index, "productoId", e.target.value)} className="rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400 md:col-span-2">
                      {productos.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                    </select>
                    <InputField label="Cantidad" type="number" value={item.cantidad} onChange={(e) => updateBudgetItem(index, "cantidad", e.target.value)} />
                    <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-3">
                      <p className="text-xs font-black uppercase text-slate-400">Subtotal</p>
                      <p className="text-emerald-200 font-black mt-1">{money(subtotal)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl bg-emerald-500/15 border border-emerald-300/20 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-black text-white">Total presupuesto</p>
                <p className="text-sm text-emerald-100">Subtotal {money(newSubtotal)} · Descuento {newBudget.descuento || 0}%</p>
              </div>
              <p className="text-3xl font-black text-white">{money(newTotal)}</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" onClick={() => setShowNewBudget(false)} className="bg-slate-800 text-white border border-white/10">Cancelar</Button>
              <Button type="submit" className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-950/30">Guardar presupuesto</Button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
}

function ClientePedidos({ emp }) {
  const productos = productosDemo.filter((p) => p.emprendimientoId === emp.id);
  const clientes = clientesDemo.filter((c) => c.emprendimientoId === emp.id);
  const [pedidos, setPedidos] = useState([
    { id: "PED-001", clienteId: clientes[0]?.id, cliente: clientes[0]?.nombre || "Cliente nuevo", estado: "En preparación", fechaEntrega: "Viernes 21/06", items: productos.slice(0,1).map((p)=>({ productoId:p.id, nombre:p.nombre, cantidad:2, precio:p.venta })), notas: "Retira por la tarde" },
    { id: "PED-002", clienteId: clientes[1]?.id, cliente: clientes[1]?.nombre || "Cliente frecuente", estado: "Entregado", fechaEntrega: "Entregado", items: productos.slice(1,2).map((p)=>({ productoId:p.id, nombre:p.nombre, cantidad:1, precio:p.venta })), notas: "Pedido entregado" },
  ]);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({ clienteId: clientes[0]?.id || "", estado: "Pendiente confirmar", fechaEntrega: todayISO(), notas: "", items: [{ productoId: productos[0]?.id || "", cantidad: 1 }] });

  const orderTotal = (order) => order.items.reduce((acc, item) => acc + Number(item.precio || 0) * Number(item.cantidad || 0), 0);
  const newOrderTotal = newOrder.items.reduce((acc, item) => {
    const producto = productos.find((p) => p.id === item.productoId);
    return acc + Number(producto?.venta || 0) * Number(item.cantidad || 0);
  }, 0);

  function updateOrderStatus(id, estado) {
    setPedidos((prev) => prev.map((p) => p.id === id ? { ...p, estado } : p));
  }
  function updateOrderItem(index, field, value) {
    setNewOrder((prev) => ({ ...prev, items: prev.items.map((item, i) => i === index ? { ...item, [field]: value } : item) }));
  }
  function addOrderItem() {
    setNewOrder((prev) => ({ ...prev, items: [...prev.items, { productoId: productos[0]?.id || "", cantidad: 1 }] }));
  }
  function handleCreateOrder(event) {
    event.preventDefault();
    const cliente = clientes.find((c) => c.id === newOrder.clienteId);
    const items = newOrder.items.map((item) => {
      const producto = productos.find((p) => p.id === item.productoId);
      return { productoId: item.productoId, nombre: producto?.nombre || "Producto", cantidad: Number(item.cantidad || 1), precio: Number(producto?.venta || 0) };
    });
    setPedidos((prev) => [{ id: `PED-${Date.now()}`, clienteId: newOrder.clienteId, cliente: cliente?.nombre || "Cliente", estado: newOrder.estado, fechaEntrega: isoToEsDate(newOrder.fechaEntrega), items, notas: newOrder.notas || "Sin notas" }, ...prev]);
    setNewOrder({ clienteId: clientes[0]?.id || "", estado: "Pendiente confirmar", fechaEntrega: todayISO(), notas: "", items: [{ productoId: productos[0]?.id || "", cantidad: 1 }] });
    setShowNewOrder(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Pedidos" subtitle="Cargá cada pedido, fecha de entrega y estado para saber qué preparar." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ColorStatCard icon={<ShoppingBag />} label="Pedidos" value={pedidos.length} color="from-fuchsia-500 via-pink-500 to-rose-500" />
        <ColorStatCard icon={<Clock />} label="En proceso" value={pedidos.filter((p)=>p.estado !== "Entregado" && p.estado !== "Cancelado").length} color="from-violet-500 via-purple-500 to-fuchsia-500" />
        <ColorStatCard icon={<CheckCircle2 />} label="Entregados" value={pedidos.filter((p)=>p.estado === "Entregado").length} color="from-emerald-400 via-teal-500 to-cyan-500" />
        <ColorStatCard icon={<DollarSign />} label="Total" value={money(pedidos.reduce((a,p)=>a+orderTotal(p),0))} color="from-amber-300 via-orange-500 to-red-500" />
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">Lista de pedidos</h3>
              <p className="text-sm text-slate-300 mt-1">Cada pedido tiene cliente, productos, fecha de entrega y estado.</p>
            </div>
            <Button onClick={() => setShowNewOrder(true)} className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 text-white shadow-lg shadow-pink-950/30 rounded-2xl">
              <Plus className="w-4 h-4 mr-2" /> Nuevo pedido
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead headers={["ID", "Cliente", "Productos", "Estado", "Fecha entrega", "Monto", "Notas"]} />
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="border-b border-slate-800">
                    <td className="py-4 pr-4 text-slate-300 font-bold">{pedido.id}</td>
                    <td className="py-4 pr-4 text-white font-black">{pedido.cliente}</td>
                    <td className="py-4 pr-4 text-slate-100">{pedido.items.map((i)=>`${i.nombre} x${i.cantidad}`).join(" · ")}</td>
                    <td className="py-4 pr-4">
                      <select value={pedido.estado} onChange={(e) => updateOrderStatus(pedido.id, e.target.value)} className="rounded-xl bg-slate-950/70 border border-white/10 px-3 py-2 text-white outline-none focus:border-sky-400">
                        <option>Pendiente confirmar</option>
                        <option>En preparación</option>
                        <option>Listo para entregar</option>
                        <option>Entregado</option>
                        <option>Cancelado</option>
                      </select>
                    </td>
                    <td className="py-4 pr-4 text-slate-100">{pedido.fechaEntrega}</td>
                    <td className="py-4 pr-4 text-emerald-200 font-black">{money(orderTotal(pedido))}</td>
                    <td className="py-4 pr-4 text-slate-100 max-w-[240px]">{pedido.notas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showNewOrder && (
        <ModalShell eyebrow="Pedidos" title="Nuevo pedido" onClose={() => setShowNewOrder(false)}>
          <form onSubmit={handleCreateOrder} className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-200 mb-2 block">Cliente</label>
                <select value={newOrder.clienteId} onChange={(e) => setNewOrder({ ...newOrder, clienteId: e.target.value })} className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400">
                  {clientes.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-200 mb-2 block">Estado inicial</label>
                <select value={newOrder.estado} onChange={(e) => setNewOrder({ ...newOrder, estado: e.target.value })} className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400">
                  <option>Pendiente confirmar</option>
                  <option>En preparación</option>
                  <option>Listo para entregar</option>
                </select>
              </div>
              <InputField icon={<CalendarClock />} label="Fecha de entrega" type="date" value={newOrder.fechaEntrega} onChange={(e) => setNewOrder({ ...newOrder, fechaEntrega: e.target.value })} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black text-white">Productos del pedido</h4>
                <Button type="button" onClick={addOrderItem} className="bg-slate-800 text-white border border-white/10"><Plus className="w-4 h-4 mr-2" /> Agregar producto</Button>
              </div>
              {newOrder.items.map((item, index) => {
                const producto = productos.find((p) => p.id === item.productoId);
                const subtotal = Number(producto?.venta || 0) * Number(item.cantidad || 0);
                return (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl bg-white/5 border border-white/10 p-3">
                    <select value={item.productoId} onChange={(e) => updateOrderItem(index, "productoId", e.target.value)} className="rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400 md:col-span-2">
                      {productos.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                    </select>
                    <InputField label="Cantidad" type="number" value={item.cantidad} onChange={(e) => updateOrderItem(index, "cantidad", e.target.value)} />
                    <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-3">
                      <p className="text-xs font-black uppercase text-slate-400">Subtotal</p>
                      <p className="text-emerald-200 font-black mt-1">{money(subtotal)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <label className="text-sm font-bold text-slate-200 mb-2 block">Notas del pedido</label>
              <textarea value={newOrder.notas} onChange={(e) => setNewOrder({ ...newOrder, notas: e.target.value })} placeholder="Ej: entregar el viernes por la tarde, paga al retirar" className="w-full min-h-[90px] rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400" />
            </div>

            <div className="rounded-3xl bg-emerald-500/15 border border-emerald-300/20 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-black text-white">Total pedido</p>
                <p className="text-sm text-emerald-100">Este monto después alimenta Finanzas cuando se confirme o entregue.</p>
              </div>
              <p className="text-3xl font-black text-white">{money(newOrderTotal)}</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" onClick={() => setShowNewOrder(false)} className="bg-slate-800 text-white border border-white/10">Cancelar</Button>
              <Button type="submit" className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 text-white shadow-lg shadow-pink-950/30">Guardar pedido</Button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
}


function ClienteReportes({ emp }) {
  const productos = productosDemo.filter((p) => p.emprendimientoId === emp.id);
  const pedidosMes = [
    { periodo: "Ene", ventas: 12, producto: "Jabón lavanda", monto: 58000 },
    { periodo: "Feb", ventas: 18, producto: "Jabón lavanda", monto: 87000 },
    { periodo: "Mar", ventas: 15, producto: "Pack regalo", monto: 96000 },
    { periodo: "Abr", ventas: 24, producto: "Pack regalo", monto: 148000 },
  ];
  const historial = pedidosMes.map((m) => [m.periodo, m.ventas, m.producto, money(m.monto)]);
  const productoMasVendido = pedidosMes.reduce((a, b) => (b.ventas > a.ventas ? b : a), pedidosMes[0]);

  return (
    <div className="space-y-6">
      <PageHeader title="Reportes" subtitle="Tablas simples para revisar historial, productos que más salen y ritmo de pedidos." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ColorStatCard icon={<Package />} label="Producto fuerte" value={productoMasVendido.producto} color="from-fuchsia-500 via-pink-500 to-rose-500" />
        <ColorStatCard icon={<ShoppingBag />} label="Pedidos analizados" value={pedidosMes.reduce((a, m) => a + m.ventas, 0)} color="from-sky-400 via-blue-500 to-indigo-600" />
        <ColorStatCard icon={<DollarSign />} label="Movimiento estimado" value={money(pedidosMes.reduce((a, m) => a + m.monto, 0))} color="from-emerald-400 via-teal-500 to-cyan-500" />
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div>
            <h2 className="text-xl font-black text-white">Historial de ventas y pedidos</h2>
            <p className="text-sm text-slate-300 mt-1">Reportes se deja en formato tabla para lectura rápida, sin gráficos por ahora.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead headers={["Mes", "Pedidos", "Producto más vendido", "Monto estimado"]} />
              <tbody>{historial.map((row, i)=><tr key={i} className="border-b border-slate-800">{row.map((c,j)=><td key={j} className="py-4 pr-4 text-slate-100">{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-4">
          <h2 className="text-xl font-black text-white">Productos cargados para análisis</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead headers={["Producto", "Stock", "Precio venta", "Costo receta", "Lectura"]} />
              <tbody>{productos.map((p)=><tr key={p.id} className="border-b border-slate-800"><td className="py-4 pr-4 text-white font-black">{p.nombre}</td><td className="py-4 pr-4 text-slate-100">{p.stock}</td><td className="py-4 pr-4 text-emerald-200 font-bold">{money(p.venta)}</td><td className="py-4 pr-4 text-slate-100">{money(p.costo)}</td><td className="py-4 pr-4 text-slate-300">Base para saber qué conviene vender más.</td></tr>)}</tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MiniLineChart({ title, subtitle, values, labels, series }) {
  const chartSeries = series || [{ label: title, values, color: "#2563eb", point: "#1d4ed8" }];
  const max = Math.max(...chartSeries.flatMap((item) => item.values), 1);
  const getPoint = (v, i, length) => {
    const x = 8 + (i * 84) / Math.max(length - 1, 1);
    const y = 78 - (v / max) * 58;
    return { x, y };
  };
  const getLine = (item) => item.values.map((v, i) => {
    const point = getPoint(v, i, item.values.length);
    return `${point.x},${point.y}`;
  }).join(" ");
  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-black text-white">{title}</h3>
          <p className="text-sm text-slate-300 mt-1">{subtitle}</p>
        </div>
        <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-4">
          {series && (
            <div className="mb-3 flex flex-wrap gap-2">
              {chartSeries.map((item) => (
                <span key={item.label} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-black text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.label}
                </span>
              ))}
            </div>
          )}
          <svg viewBox="0 0 100 86" className="w-full h-56 overflow-visible">
            {[20, 40, 60, 80].map((y) => <line key={y} x1="4" x2="96" y1={y} y2={y} stroke="rgba(100,116,139,.24)" strokeWidth="0.4" />)}
            {chartSeries.map((item) => (
              <polyline key={item.label} points={getLine(item)} fill="none" stroke={item.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            ))}
            {chartSeries.map((item) => item.values.map((v, i) => {
              const point = getPoint(v, i, item.values.length);
              return <circle key={`${item.label}-${i}`} cx={point.x} cy={point.y} r="2.8" fill={item.point || item.color} stroke="#ffffff" strokeWidth="1.1" />;
            }))}
            {(labels || []).map((label, i) => {
              const x = 8 + (i * 84) / Math.max(labels.length - 1, 1);
              return <text key={label} x={x} y="84" textAnchor="middle" className="fill-slate-500 text-[4px] font-black">{label}</text>;
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

function ClienteWhatsApp({ emp }) {
  const productos = productosDemo.filter((p) => p.emprendimientoId === emp.id);
  const clientes = clientesDemo.filter((c) => c.emprendimientoId === emp.id);
  const [selectedClienteId, setSelectedClienteId] = useState(clientes[0]?.id || "");
  const [selectedProductoId, setSelectedProductoId] = useState(productos[0]?.id || "");
  const [cantidad, setCantidad] = useState(1);
  const cliente = clientes.find((c) => c.id === selectedClienteId) || clientes[0];
  const producto = productos.find((p) => p.id === selectedProductoId) || productos[0];
  const total = Number(producto?.venta || 0) * Number(cantidad || 0);
  const defaultMessage = `Hola ${cliente?.nombre || ""}, te paso el presupuesto de ${emp.nombre}: ${producto?.nombre || "producto"} x${cantidad}. Total: ${money(total)}. Quedo atento/a a tu confirmación.`;
  const [customMessage, setCustomMessage] = useState(defaultMessage);

  function refreshMessage() {
    setCustomMessage(defaultMessage);
  }

  async function copyMessage() {
    try { await navigator.clipboard.writeText(customMessage); alert("Mensaje copiado para WhatsApp"); } catch { alert(customMessage); }
  }

  function openWhatsApp() {
    const phone = (cliente?.telefono || "").replace(/\D/g, "");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(customMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-6">
      <PageHeader title="WhatsApp" subtitle="Plantillas vinculadas a presupuestos para copiar o abrir en WhatsApp Web/Business." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ColorStatCard icon={<MessageCircle />} label="Uso principal" value="Presupuestos" color="from-emerald-400 via-teal-500 to-cyan-500" />
        <ColorStatCard icon={<Users />} label="Clientes" value={clientes.length} color="from-sky-400 via-blue-500 to-indigo-600" />
        <ColorStatCard icon={<Send />} label="Envío" value="Manual" color="from-amber-300 via-orange-500 to-red-500" />
      </div>

      <Card>
        <CardContent className="p-5 space-y-5">
          <div>
            <h2 className="text-xl font-black text-white">Preparar mensaje de presupuesto</h2>
            <p className="text-sm text-slate-300 mt-1">Elegí cliente y producto. Luego editás el mensaje, lo copiás o abrís WhatsApp.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-bold text-slate-200 mb-2 block">Cliente</label>
              <select value={selectedClienteId} onChange={(e)=>setSelectedClienteId(e.target.value)} className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400">
                {clientes.map((c)=><option key={c.id} value={c.id}>{c.nombre} · {c.telefono}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-200 mb-2 block">Producto / presupuesto</label>
              <select value={selectedProductoId} onChange={(e)=>setSelectedProductoId(e.target.value)} className="w-full rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400">
                {productos.map((p)=><option key={p.id} value={p.id}>{p.nombre} · {money(p.venta)}</option>)}
              </select>
            </div>
            <InputField icon={<Package />} label="Cantidad" type="number" value={cantidad} onChange={(e)=>setCantidad(e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <label className="text-sm font-bold text-slate-200 block">Mensaje editable</label>
              <Button onClick={refreshMessage} className="bg-slate-800 text-white border border-white/10 px-3 py-2 text-xs">Actualizar plantilla</Button>
            </div>
            <textarea value={customMessage} onChange={(e)=>setCustomMessage(e.target.value)} className="w-full min-h-[150px] rounded-2xl bg-slate-950/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-sky-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button onClick={copyMessage} className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white py-5"><Copy className="w-4 h-4 mr-2" /> Copiar mensaje</Button>
            <Button onClick={openWhatsApp} className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white py-5"><MessageCircle className="w-4 h-4 mr-2" /> Abrir WhatsApp</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ClienteFinanzas({ emp }) {
  const productos = productosDemo.filter((p) => p.emprendimientoId === emp.id);
  const ingresosPotenciales = productos.reduce((a, p) => a + Number(p.venta || 0) * Number(p.stock || 0), 0);
  const costosPotenciales = productos.reduce((a, p) => a + Number(p.costo || 0) * Number(p.stock || 0), 0);
  const gananciaEstimada = ingresosPotenciales - costosPotenciales;
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  const ventasLine = [42000, 68000, 76000, 118000, 132000, Math.max(ingresosPotenciales, 150000)];
  const costosLine = [18000, 29000, 34000, 52000, 61000, Math.max(costosPotenciales, 70000)];
  const rows = productos.map((p) => [
    p.nombre,
    p.stock,
    money(p.costo),
    money(p.venta),
    money(Math.max(0, Number(p.venta || 0) - Number(p.costo || 0)) * Number(p.stock || 0)),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader title="Finanzas" subtitle="Ventas potenciales, costos de recetas y ganancia estimada según stock y precio de venta." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ColorStatCard icon={<DollarSign />} label="Venta potencial" value={money(ingresosPotenciales)} color="from-emerald-400 via-teal-500 to-cyan-500" />
        <ColorStatCard icon={<AlertTriangle />} label="Costo desde recetas" value={money(costosPotenciales)} color="from-amber-300 via-orange-500 to-red-500" />
        <ColorStatCard icon={<CheckCircle2 />} label="Ganancia estimada" value={money(gananciaEstimada)} color="from-violet-500 via-purple-500 to-fuchsia-500" />
      </div>
      <MiniLineChart title="Ventas potenciales vs costos consumidos" subtitle="Comparativo estimado para ver margen y crecimiento en un solo gráfico." labels={months} series={[{ label: "Ventas", values: ventasLine, color: "#2563eb", point: "#1d4ed8" }, { label: "Costos", values: costosLine, color: "#f97316", point: "#ea580c" }]} />
      <div className="hidden">
        <MiniLineChart title="Ventas potenciales" subtitle="Línea estimada de crecimiento según productos, precios y stock." values={ventasLine} labels={months} />
        <MiniLineChart title="Costos consumidos" subtitle="Comparativo estimado de costos tomados desde recetas." values={costosLine} labels={months} />
      </div>
      <Card>
        <CardContent className="p-5 space-y-4">
          <div>
            <h2 className="text-xl font-black text-white">Cálculo estimado</h2>
            <p className="text-sm text-slate-300 mt-1">Este cálculo todavía no es venta real: estima cuánto se podría ganar si se vende el stock cargado al precio definido.</p>
          </div>
          <div className="rounded-2xl bg-slate-950/60 border border-emerald-400/20 p-4">
            <p className="text-sm text-emerald-100 font-bold">Ganancia estimada = (precio de venta - costo de receta) × stock disponible</p>
            <p className="text-xs text-slate-300 mt-2">Cuando conectemos Supabase, Finanzas va a separar venta real, pendiente, costos y ganancia confirmada.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead headers={["Producto", "Stock", "Costo receta", "Venta", "Ganancia estimada"]} />
              <tbody>{rows.map((row,i)=><tr key={i} className="border-b border-slate-800">{row.map((c,j)=><td key={j} className="py-4 pr-4 text-slate-100">{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ClienteConfiguracion({ emp, updateEmp, plan }) {
  const [local, setLocal] = useState({ ...emp, apariencia: emp.apariencia || "claro", paleta: emp.paleta || "vivos" });
  const [logoProcessing, setLogoProcessing] = useState(false);
  const [logoMessage, setLogoMessage] = useState("");
  const [logoError, setLogoError] = useState("");
  function change(field, value) { setLocal((prev) => ({ ...prev, [field]: value })); }
  function toggleSupport(minutes) { setLocal((prev) => ({ ...prev, soporteRemoto: { habilitado: !prev.soporteRemoto.habilitado, vence: minutes } })); }
  async function handleLogoFile(file) {
    if (!file) return;
    setLogoError("");
    setLogoMessage("");
    setLogoProcessing(true);
    try {
      const optimized = await compressPortalLogo(file);
      setLocal((prev) => ({
        ...prev,
        logo: optimized.dataUrl,
        logoMeta: {
          originalBytes: optimized.originalBytes,
          finalBytes: optimized.finalBytes,
          width: optimized.width,
          height: optimized.height,
        },
      }));
      setLogoMessage(`Logo optimizado: ${formatBytes(optimized.originalBytes)} -> ${formatBytes(optimized.finalBytes)}.`);
    } catch (error) {
      setLogoError(error?.message || "No se pudo procesar el logo.");
    } finally {
      setLogoProcessing(false);
    }
  }
  const paletteOptions = [
    { id: "vivos", title: "Colores vivos", desc: "Tarjetas brillantes con alto impacto visual.", colors: ["bg-emerald-400", "bg-sky-400", "bg-fuchsia-500", "bg-orange-400"] },
    { id: "pasteles", title: "Colores pasteles", desc: "Más suave para emprendimientos delicados o artesanales.", colors: ["bg-pink-300", "bg-sky-200", "bg-emerald-200", "bg-violet-300"] },
    { id: "premium", title: "Azul premium", desc: "Más institucional, con azul, violeta y dorado.", colors: ["bg-blue-500", "bg-violet-500", "bg-amber-300", "bg-cyan-400"] },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Configuración" subtitle="Personalización del panel, datos comerciales, logo, colores y soporte remoto." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5 space-y-4">
            <h2 className="text-xl font-bold">Datos del emprendimiento</h2>
            <InputField label="Nombre" value={local.nombre} onChange={(e) => change("nombre", e.target.value)} icon={<Building2 />} />
            <InputField label="WhatsApp" value={local.whatsapp} onChange={(e) => change("whatsapp", e.target.value)} icon={<Phone />} />
            <InputField label="Instagram" value={local.instagram} onChange={(e) => change("instagram", e.target.value)} icon={<Globe />} />
            <InputField label="Logo / iniciales o URL de imagen" value={local.logo} onChange={(e) => change("logo", e.target.value)} icon={<Palette />} />
            <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-4">
              <label className="text-sm font-bold text-slate-200 mb-2 block">Subir logo desde computadora o celular</label>
              <input type="file" accept="image/*" onChange={(e)=>handleLogoFile(e.target.files?.[0])} className="block w-full text-sm text-slate-200 file:mr-4 file:rounded-xl file:border-0 file:bg-sky-500 file:px-4 file:py-2 file:font-bold file:text-white" />
              <p className="text-xs text-slate-400 mt-2">Maximo permitido: {formatBytes(PORTAL_LOGO_MAX_UPLOAD_BYTES)}. Se comprime automaticamente y reemplaza las iniciales del panel y del portal.</p>
              {logoProcessing && <p className="mt-2 text-xs font-bold text-sky-700">Optimizando logo...</p>}
              {logoMessage && <p className="mt-2 text-xs font-bold text-emerald-700">{logoMessage}</p>}
              {logoError && <p className="mt-2 text-xs font-bold text-red-600">{logoError}</p>}
            </div>
            <Button onClick={() => updateEmp(local)} className="w-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white py-6 rounded-2xl">Guardar configuración</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-5">
            <h2 className="text-xl font-bold">Apariencia del panel</h2>
            <div className="grid grid-cols-2 gap-3">
              {["oscuro", "claro"].map((mode)=>(
                <button key={mode} onClick={()=>change("apariencia", mode)} className={`rounded-3xl border p-4 text-left transition ${local.apariencia === mode ? "border-sky-300 bg-sky-500/20" : "border-white/10 bg-slate-950/50"}`}>
                  <p className="text-white font-black capitalize">Modo {mode}</p>
                  <p className="text-xs text-slate-300 mt-1">{mode === "oscuro" ? "Panel actual, fondo tecnológico." : "Base clara para quien prefiere menos oscuridad."}</p>
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wide text-slate-300">Paleta de colores</h3>
              {paletteOptions.map((pal)=>(
                <button key={pal.id} onClick={()=>change("paleta", pal.id)} className={`w-full rounded-3xl border p-4 text-left transition ${local.paleta === pal.id ? "border-emerald-300 bg-emerald-500/15" : "border-white/10 bg-slate-950/50"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-white font-black">{pal.title}</p>
                      <p className="text-xs text-slate-300 mt-1">{pal.desc}</p>
                    </div>
                    <div className="flex gap-1">{pal.colors.map((c,i)=><span key={i} className={`w-5 h-5 rounded-full ${c}`} />)}</div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="text-xl font-bold">Soporte remoto</h2>
              {plan?.accesoAdmin ? <StatusBadge label={local.soporteRemoto.habilitado ? `Habilitado · ${local.soporteRemoto.vence}` : "Deshabilitado"} tone={local.soporteRemoto.habilitado ? "success" : "danger"} /> : <StatusBadge label="No incluido en tu plan" tone="warning" />}
            </div>
            <p className="text-sm text-slate-200 mb-4">Disponible para plan Elite. Por seguridad siempre queda deshabilitado hasta que vos lo habilites por tiempo limitado.</p>
            {plan?.accesoAdmin ? <div className="space-y-3"><StatusBadge label={local.soporteRemoto.habilitado ? `Habilitado · ${local.soporteRemoto.vence}` : "Deshabilitado"} tone={local.soporteRemoto.habilitado ? "success" : "danger"} /><div className="grid grid-cols-2 gap-2">{["15 min", "30 min", "1 hora", "24 horas"].map((m) => <Button key={m} onClick={() => toggleSupport(m)} className="bg-slate-800 text-white">{m}</Button>)}</div><Button onClick={() => updateEmp(local)} className="w-full bg-blue-500 text-black">Guardar acceso</Button></div> : <StatusBadge label="No incluido en tu plan" tone="warning" />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DetailBox({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-blue-500/15 bg-slate-950/70 p-4">
      <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wide">
        {React.cloneElement(icon, { className: "w-4 h-4" })}
        {label}
      </div>
      <p className="text-white font-bold mt-2 break-words">{value}</p>
    </div>
  );
}


function HeroBanner({ title, subtitle }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-blue-500/25 bg-slate-950 p-6 md:p-8 shadow-2xl shadow-blue-950/30" style={{ backgroundImage: "linear-gradient(90deg, rgba(2,6,23,.92), rgba(2,6,23,.62), rgba(2,6,23,.88)), url('/fondo-saas.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="relative z-10 max-w-3xl">
        <p className="text-xs text-sky-300 font-bold uppercase tracking-[0.25em]">Plataforma de gestión</p>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-3 leading-tight">{title}</h2>
        <p className="text-slate-200 mt-3 text-base md:text-lg leading-relaxed">{subtitle}</p>
      </div>
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-12 left-1/2 h-44 w-44 rounded-full bg-sky-400/10 blur-3xl" />
    </div>
  );
}

function WelcomeModal({ emp, onClose, onMessages }) {
  return (
    <ModalShell eyebrow="Bienvenido a C&R Emprende" title={`Hola, ${emp.owner}`} onClose={onClose}>
      <div className="p-5 space-y-5">
        <div className="rounded-[1.75rem] border border-blue-500/20 p-5" style={{ backgroundImage: "linear-gradient(90deg, rgba(2,6,23,.92), rgba(2,6,23,.72)), url('/fondo-saas.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <p className="text-slate-100 leading-relaxed">
            Esta plataforma fue creada para ayudarte a ordenar tu emprendimiento, controlar stock, insumos, costos, clientes, ventas y presupuestos desde un solo lugar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ArchitectureRow icon={<Package />} title="Gestioná productos" text="Controlá lo que vendés, precios, stock y estado." />
          <ArchitectureRow icon={<Boxes />} title="Ordená insumos" text="Registrá materia prima, costos y proveedores." />
          <ArchitectureRow icon={<ClipboardList />} title="Calculá presupuestos" text="Usá costos reales para vender mejor." />
          <ArchitectureRow icon={<Mail />} title="Mensajes con administrador" text="Consultanos desde la plataforma, sin chat en vivo." />
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <Button onClick={onClose} className="w-full bg-blue-500 text-black py-4">Comenzar</Button>
          <Button onClick={onMessages} className="w-full bg-slate-800 text-white py-4">Enviar mensaje a C&R</Button>
        </div>
      </div>
    </ModalShell>
  );
}

function DemoExpiredModal({ user, onClose }) {
  const supportPhone = "2974292907";
  const message = `Hola, mi demo en C&R Emprende ha finalizado y necesito ayuda para seguir con el acceso.`;
  const whatsappUrl = `https://wa.me/${supportPhone}?text=${encodeURIComponent(message)}`;

  return (
    <ModalShell eyebrow="Demo finalizado" title="Tu periodo de prueba terminó" onClose={onClose}>
      <div className="p-5 space-y-5">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-slate-100">
            El demo de <b>{user.nombre}</b> finalizó el <b>{formatDateTime(user.demoExpiraOn)}</b>. Para seguir usando la plataforma, contactá a los desarrolladores y coordiná el próximo paso.
          </p>
        </div>
        <div className="rounded-2xl border border-blue-500/20 bg-slate-950/80 p-4 text-sm text-slate-300">
          <p className="font-bold text-white">Sugerencia</p>
          <p className="mt-2">Si necesitás ayuda o querés que te conectemos con el equipo, escribinos por WhatsApp y te asesoramos para continuar.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onClose} className="w-full bg-slate-800 text-white">Cerrar</Button>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-full">
            <Button className="w-full bg-green-500 text-black">Contactar por WhatsApp</Button>
          </a>
        </div>
      </div>
    </ModalShell>
  );
}

function MensajesAdminPage({ mensajes, emprendimientos, onReply }) {
  const [selected, setSelected] = useState(null);
  const [replyText, setReplyText] = useState("");
  const nuevos = mensajes.filter((m) => m.estado === "Nuevo").length;
  const respondidos = mensajes.filter((m) => m.estado === "Respondido").length;
  const abiertos = mensajes.filter((m) => m.estado !== "Respondido").length;

  function openReply(mensaje) {
    setSelected(mensaje);
    setReplyText(mensaje.respuesta || "");
  }

  function submitReply(e) {
    e.preventDefault();
    if (!selected || !replyText.trim()) return;
    onReply(selected.id, replyText.trim());
    setSelected(null);
    setReplyText("");
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Bandeja de mensajes" subtitle="Mensajes internos entre C&R y cada emprendimiento. Cada respuesta queda vinculada por ID al usuario y al emprendimiento correcto." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<Mail />} label="Mensajes recibidos" value={mensajes.length} className="border-sky-400/25 bg-gradient-to-br from-sky-500 via-blue-600 to-slate-950" />
        <StatCard icon={<AlertTriangle />} label="Pendientes" value={nuevos} className="border-amber-400/25 bg-gradient-to-br from-amber-400 via-orange-500 to-slate-950" />
        <StatCard icon={<CheckCircle2 />} label="Respondidos" value={respondidos} className="border-emerald-400/25 bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-950" />
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-blue-500/25 bg-slate-950 p-6 shadow-2xl shadow-blue-950/30" style={{ backgroundImage: "linear-gradient(90deg, rgba(2,6,23,.94), rgba(14,116,144,.55), rgba(2,6,23,.90)), url('/fondo-saas.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-800 font-black">Enrutamiento interno</p>
            <h2 className="text-2xl font-black text-white mt-2">Admin C&R ↔ Usuario / Emprendimiento</h2>
            <p className="text-sm text-slate-100 mt-2 max-w-3xl">Cada mensaje queda asociado a un emprendimiento, un usuario y el admin que responde. Más adelante en Supabase esto se guarda por ID para que ninguna respuesta llegue a otro cliente.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-blue-600 border border-blue-700 p-3 text-white"><p className="text-2xl font-black text-white">{abiertos}</p><p className="text-[11px] font-black uppercase tracking-wide text-white">abiertos</p></div>
            <div className="rounded-2xl bg-cyan-600 border border-cyan-700 p-3 text-white"><p className="text-2xl font-black text-white">ID</p><p className="text-[11px] font-black uppercase tracking-wide text-white">ruteado</p></div>
            <div className="rounded-2xl bg-emerald-600 border border-emerald-700 p-3 text-white"><p className="text-2xl font-black text-white">C&R</p><p className="text-[11px] font-black uppercase tracking-wide text-white">responde</p></div>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-white">Mensajes recibidos</h2>
            <StatusBadge label="No es chat en vivo" tone="warning" />
          </div>
          {mensajes.map((m) => {
            const emp = emprendimientos.find((e) => e.id === m.emprendimientoId);
            return (
              <div key={m.id} className="rounded-2xl bg-slate-950 border border-blue-500/20 p-4 hover:border-sky-300/50 transition">
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-sky-300 font-bold uppercase tracking-wide">{m.id} · {m.categoria} · {m.emprendimientoId}</p>
                    <h3 className="text-lg font-bold text-white mt-1">{m.asunto}</h3>
                    <p className="text-sm text-slate-300 mt-1">{emp?.nombre || m.emprendimientoId} · enviado por {m.de}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge label={m.estado} tone={m.estado === "Nuevo" ? "warning" : "success"} />
                    <Button onClick={() => openReply(m)} className="bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 px-3 py-2 text-xs rounded-xl">
                      <Send className="w-3.5 h-3.5 mr-1" /> {m.estado === "Respondido" ? "Ver / responder" : "Responder"}
                    </Button>
                  </div>
                </div>
                <p className="text-slate-100 mt-3">{m.mensaje}</p>
                {m.respuesta && (
                  <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <p className="text-xs uppercase tracking-wide text-emerald-300 font-black">Respuesta C&R · {m.fechaRespuesta}</p>
                    <p className="text-sm text-slate-100 mt-2">{m.respuesta}</p>
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-3">Recibido: {m.fecha}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {selected && (
        <ModalShell eyebrow="Responder mensaje" title={selected.asunto} onClose={() => setSelected(null)}>
          <form onSubmit={submitReply} className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <InfoItem label="Mensaje ID" value={selected.id} />
              <InfoItem label="Emprendimiento ID" value={selected.emprendimientoId} />
              <InfoItem label="Admin ID" value={selected.adminId || "ADMIN-CR-001"} />
            </div>
            <div className="rounded-2xl border border-blue-500/20 bg-slate-950 p-4">
              <p className="text-xs text-sky-300 font-black uppercase tracking-wide">Mensaje recibido</p>
              <p className="text-sm text-slate-200 mt-2">{selected.mensaje}</p>
            </div>
            <div>
              <label className="block text-sm text-sky-300 font-semibold mb-2">Respuesta para el usuario</label>
              <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Escribí la respuesta que verá el emprendedor en su mensajería..." className="w-full min-h-40 rounded-xl bg-slate-950 border border-slate-700 outline-none focus:border-sky-300 p-3 text-white" />
              <p className="text-xs text-slate-400 mt-2">La respuesta queda vinculada a {selected.emprendimientoId}. En Supabase se guardará por usuario_id, emprendimiento_id y admin_id.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="flex-1 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 py-4"><Send className="w-4 h-4 mr-2" /> Enviar respuesta</Button>
              <Button type="button" onClick={() => setSelected(null)} className="bg-slate-800 text-white py-4">Cancelar</Button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
}

function ClienteMensajesPage({ emp, mensajes, onSend }) {
  const [form, setForm] = useState({ categoria: "Consulta", asunto: "", mensaje: "" });
  function submit(e) {
    e.preventDefault();
    if (!form.asunto || !form.mensaje) return;
    onSend({ emprendimientoId: emp.id, de: emp.owner, categoria: form.categoria, asunto: form.asunto, mensaje: form.mensaje });
    setForm({ categoria: "Consulta", asunto: "", mensaje: "" });
  }
  return (
    <div className="space-y-6">
      <PageHeader title="Mensajes con administrador" subtitle="Comunicate con C&R desde la plataforma. No es chat en vivo: enviás un mensaje y queda registro." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-xl font-bold text-white mb-4">Nuevo mensaje</h2>
            <form onSubmit={submit} className="space-y-4">
              <SelectField label="Tipo de mensaje" value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} options={["Consulta", "Problema técnico", "Sugerencia", "Solicitud de mejora", "Capacitación", "Otro"]} />
              <InputField icon={<Mail />} label="Asunto" value={form.asunto} onChange={(e) => setForm({ ...form, asunto: e.target.value })} placeholder="Ej: Necesito ayuda con un presupuesto" />
              <div>
                <label className="block text-sm text-sky-300 font-semibold mb-2">Mensaje</label>
                <textarea value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} placeholder="Contanos qué necesitás..." className="w-full min-h-36 rounded-xl bg-slate-950 border border-slate-700 outline-none focus:border-sky-300 p-3 text-white" />
              </div>
              <Button type="submit" className="w-full bg-blue-500 text-black py-4"><Send className="w-4 h-4 mr-2" /> Enviar mensaje</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 space-y-3">
            <h2 className="text-xl font-bold text-white">Historial</h2>
            {mensajes.length === 0 ? <p className="text-sm text-slate-200">Todavía no enviaste mensajes.</p> : mensajes.map((m) => (
              <div key={m.id} className="rounded-2xl bg-slate-950 border border-blue-500/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-sky-300 font-bold uppercase tracking-wide">{m.categoria}</p>
                    <p className="font-bold text-white mt-1">{m.asunto}</p>
                  </div>
                  <StatusBadge label={m.estado} tone={m.estado === "Nuevo" ? "warning" : "success"} />
                </div>
                <p className="text-sm text-slate-200 mt-2">{m.mensaje}</p>
                {m.respuesta && (
                  <div className="mt-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3">
                    <p className="text-xs text-emerald-300 font-black uppercase tracking-wide">Respuesta C&R · {m.fechaRespuesta}</p>
                    <p className="text-sm text-slate-100 mt-1">{m.respuesta}</p>
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-2">{m.fecha}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BusinessWizard({ rubros, planes, onClose, onCreate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nombre: "",
    rubroId: rubros[0].id,
    actividad: rubros[0]?.actividades?.[0] || "",
    plan: "Básico",
    periodicidad: "Mensual",
    estadoPago: "Pendiente",
    owner: "",
    vencimiento: todayISO(),
    whatsapp: "",
    instagram: "",
    logo: "",
    color: "Dorado",
  });
  const rubro = rubros.find((r) => r.id === form.rubroId) || rubros[0];
  const planSeleccionado = planes.find((p) => p.nombre === form.plan) || planes[0];

  function change(field, value) {
    setForm((prev) => {
      if (field === "rubroId") {
        const nuevoRubro = rubros.find((r) => r.id === value) || rubros[0];
        return { ...prev, rubroId: value, actividad: nuevoRubro?.actividades?.[0] || "" };
      }
      return { ...prev, [field]: value };
    });
  }

  function create() {
    onCreate({
      id: `EMP-${Date.now().toString().slice(-4)}`,
      nombre: form.nombre || "Nuevo emprendimiento",
      rubroId: rubro.id,
      rubro: rubro.nombre,
      actividad: form.actividad || "Sin actividad",
      plan: form.plan,
      periodo: form.periodicidad,
      estadoPago: form.estadoPago,
      fechaAlta: new Date().toLocaleDateString("es-AR"),
      estado: "Activo",
      portalVisible: true,
      fechaSuspension: null,
      fechaEliminacion: null,
      vencimiento: isoToEsDate(form.vencimiento),
      owner: form.owner || "Sin dueño",
      color: form.color,
      logo: form.logo || (form.nombre || "NE").slice(0,2).toUpperCase(),
      whatsapp: form.whatsapp,
      instagram: form.instagram,
      modulos: rubro.modulos,
      soporteRemoto: { habilitado: false, vence: null },
    });
  }

  return (
    <ModalShell eyebrow="Alta guiada" title="Nuevo emprendimiento" onClose={onClose}>
      <div className="p-5 space-y-5">
        <div className="grid grid-cols-4 gap-2">{["Datos", "Rubro", "Plan", "Confirmar"].map((s,i)=><div key={s} className={`rounded-xl px-3 py-2 text-xs font-bold text-center ${step===i+1?"bg-blue-500 text-black":"bg-slate-950 text-slate-100 border border-slate-800"}`}>{i+1}. {s}</div>)}</div>

        {step===1 && (
          <div className="space-y-4">
            <InputField icon={<Building2 />} label="Nombre del emprendimiento" value={form.nombre} onChange={(e)=>change("nombre", e.target.value)} placeholder="Ej: Buba Cook" />
            <InputField icon={<Users />} label="Dueño / responsable" value={form.owner} onChange={(e)=>change("owner", e.target.value)} placeholder="Nombre y apellido" />
            <InputField icon={<Phone />} label="WhatsApp" value={form.whatsapp} onChange={(e)=>change("whatsapp", e.target.value)} placeholder="Ej: 2974 000000" />
            <InputField icon={<Globe />} label="Instagram / red social" value={form.instagram} onChange={(e)=>change("instagram", e.target.value)} placeholder="Ej: @bubacook" />
          </div>
        )}

        {step===2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rubros.map((r)=><button key={r.id} onClick={()=>change("rubroId", r.id)} className={`text-left rounded-2xl border p-4 ${form.rubroId===r.id?"border-blue-500 bg-blue-500/10":"border-slate-800 bg-slate-950"}`}><p className="font-bold text-white">{r.nombre}</p><p className="text-xs text-slate-200 mt-1">{r.enfoque || r.ejemplos}</p><p className="text-xs text-sky-300 font-bold mt-2">Módulo: {r.etiquetaInsumos || "Insumos"}</p></button>)}
            </div>
            <SelectField label="Actividad / subrubro" value={form.actividad} onChange={(e)=>change("actividad", e.target.value)} options={rubro.actividades || []} />
            <div className="rounded-2xl bg-slate-950 border border-blue-500/20 p-4">
              <p className="text-sm text-slate-200">Este dato nos sirve para adaptar el flujo. Ejemplo: Gastronomía puede usar <b>Materia prima</b> y recetas; Imprenta puede usar <b>Insumos</b> y presupuestos rápidos.</p>
            </div>
          </div>
        )}

        {step===3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">{planes.map((p)=><button key={p.id} onClick={()=>change("plan", p.nombre)} className={`text-left rounded-2xl border p-4 ${form.plan===p.nombre?"border-blue-500 bg-blue-500/10":"border-slate-800 bg-slate-950"}`}><p className="font-bold text-white">{p.nombre}</p><p className="text-sky-300 text-2xl font-bold">{p.precio}</p><p className="text-xs text-slate-200 mt-2">{p.soporte}</p></button>)}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SelectField label="Estado de pago" value={form.estadoPago} onChange={(e)=>change("estadoPago", e.target.value)} options={["Pagado", "Pendiente", "Bonificado"]} />
              <InputField icon={<CalendarClock />} label="Fecha de vencimiento" type="date" value={form.vencimiento} onChange={(e)=>change("vencimiento", e.target.value)} />
            </div>
            <div className="rounded-2xl bg-slate-950 border border-blue-500/20 p-4">
              <p className="text-sm text-slate-200">Plan seleccionado: <b>{form.plan}</b> · Valor de referencia: <b className="text-sky-300">{planSeleccionado?.precio}</b>. Si está pagado, después lo vamos a tomar como ingreso en finanzas.</p>
            </div>
          </div>
        )}

        {step===4 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoItem label="Emprendimiento" value={form.nombre || "Pendiente"} />
            <InfoItem label="Dueño" value={form.owner || "Pendiente"} />
            <InfoItem label="Rubro" value={rubro.nombre} highlight />
            <InfoItem label="Actividad" value={form.actividad || "Pendiente"} />
            <InfoItem label="Plan" value={form.plan} highlight />
            <InfoItem label="Estado de pago" value={form.estadoPago} />
            <InfoItem label="Vencimiento" value={isoToEsDate(form.vencimiento)} />
            <InfoItem label="Módulos" value={rubro.modulos.length} />
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={onClose} className="w-full bg-slate-800 text-white">Cancelar</Button>
          {step>1&&<Button onClick={()=>setStep(step-1)} className="w-full bg-slate-800 text-white">Atrás</Button>}
          {step<4?<Button onClick={()=>setStep(step+1)} className="w-full bg-blue-500 text-black">Siguiente</Button>:<Button onClick={create} className="w-full bg-blue-500 text-black">Crear</Button>}
        </div>
      </div>
    </ModalShell>
  );
}
function UsuarioModal({ rubros, planes, onClose, onCreate }) {
  const fechaAlta = new Date().toLocaleDateString("es-AR");
  const [f, setF] = useState({
    nombre: "",
    telefono: "",
    rubroId: rubros[0]?.id || "",
    plan: "Básico",
    periodicidad: "Mensual",
    estadoPago: "Pendiente",
    usuario: "demo@cremprende.com",
    password: "123456",
    vencimiento: todayISO(),
    esDemo: false,
    demoDuracionMinutos: 5,
  });
  const [manualUser, setManualUser] = useState(false);
  const [error, setError] = useState("");

  const rubroSeleccionado = rubros.find((r) => r.id === f.rubroId) || rubros[0];
  const planSeleccionado = planes.find((p) => p.nombre === f.plan) || planes[0];

  function change(field, value) {
    setError("");
    if (field === "nombre") {
      setF((prev) => ({
        ...prev,
        nombre: value,
        usuario: manualUser ? prev.usuario : accessUserFromName(value),
      }));
      return;
    }
    if (field === "usuario") {
      setManualUser(true);
    }
    setF((prev) => ({ ...prev, [field]: value }));
  }

  function create(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    if (!f.nombre.trim()) {
      setError("Ingresá nombre y apellido del usuario.");
      return;
    }
    if (!f.telefono.trim()) {
      setError("Ingresá un número de teléfono.");
      return;
    }
    if (!f.usuario.trim()) {
      setError("Ingresá un usuario de acceso.");
      return;
    }
    if ((f.password || "").trim().length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }
    const demoMinutes = Number(f.demoDuracionMinutos) || 5;
    if (f.esDemo && demoMinutes <= 0) {
      setError("Ingresá una duración válida para el demo.");
      return;
    }
    const demoDurationLabel = demoDurationOptions.find((option) => option.value === demoMinutes)?.label || `${demoMinutes} minutos`;
    const demoExpiresOn = f.esDemo ? addMinutesFromNow(demoMinutes) : null;

    onCreate({
      id: `USR-${Date.now().toString().slice(-4)}`,
      nombre: f.nombre.trim(),
      telefono: f.telefono.trim(),
      email: f.usuario.trim(),
      rol: "Dueño",
      rubro: rubroSeleccionado?.nombre || "Sin rubro",
      plan: f.esDemo ? "Demo" : f.plan,
      periodicidad: f.periodicidad,
      estadoPago: f.esDemo ? "Bonificado" : f.estadoPago,
      fechaAlta,
      montoPlan: f.esDemo ? "$0" : planSeleccionado?.precio || "$0",
      emprendimientoIds: [],
      estado: "Activo",
      demo: f.esDemo,
      demoDuracionMinutos: f.esDemo ? demoMinutes : undefined,
      demoDuracionLabel: f.esDemo ? demoDurationLabel : undefined,
      demoExpiraOn: f.esDemo ? demoExpiresOn : undefined,
      password: f.password.trim(),
      renovadoHasta: f.esDemo ? formatDateTime(demoExpiresOn) : isoToEsDate(f.vencimiento),
      cambiosPassword: 0,
      renovaciones: 0,
    });
  }

  return (
    <ModalShell eyebrow="Alta de usuario" title="Nuevo usuario" onClose={onClose}>
      <div className="p-5 space-y-5">
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
          <p className="text-sm text-slate-100">
            El emprendimiento no se carga acá: lo va a generar el usuario después. Acá dejamos registrado rubro, plan, pago, acceso y vencimiento.
          </p>
          <p className="text-xs text-slate-300 mt-2">Fecha de alta automática: <b className="text-sky-300">{fechaAlta}</b></p>
        </div>

        {error && <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-sm font-bold text-red-300">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField icon={<Users />} label="Nombre y apellido" value={f.nombre} onChange={(e) => change("nombre", e.target.value)} placeholder="Ej: Juan Pérez" />
          <InputField icon={<Phone />} label="Teléfono" value={f.telefono} onChange={(e) => change("telefono", e.target.value)} placeholder="Ej: 2974 123456" />
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 col-span-1 md:col-span-2">
            <label className="flex items-center gap-3 text-sm font-bold text-slate-100">
              <input type="checkbox" checked={f.esDemo} onChange={(e) => change("esDemo", e.target.checked)} className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-400 focus:ring-sky-300" />
              Crear usuario demo
            </label>
            <p className="text-xs text-slate-400 mt-2">Si activás demo, el acceso vence automáticamente tras el tiempo elegido y aparecerá un aviso para contactar a los desarrolladores.</p>
            {f.esDemo && (
              <SelectField label="Duración de demo" value={f.demoDuracionMinutos} onChange={(e) => change("demoDuracionMinutos", Number(e.target.value))} options={demoDurationOptions.map((option) => option.value)} labels={Object.fromEntries(demoDurationOptions.map((option) => [option.value, option.label]))} />
            )}
          </div>
          <SelectField label="Rubro" value={f.rubroId} onChange={(e) => change("rubroId", e.target.value)} options={rubros.map((r) => r.id)} labels={Object.fromEntries(rubros.map((r) => [r.id, r.nombre]))} />
          <SelectField label="Plan contratado" value={f.plan} onChange={(e) => change("plan", e.target.value)} options={["Básico", "Pro", "Elite"]} />
          <SelectField label="Periodo de contratación" value={f.periodicidad} onChange={(e) => change("periodicidad", e.target.value)} options={["Mensual", "Trimestral", "Semestral", "Anual"]} />
          <SelectField label="Estado de pago" value={f.estadoPago} onChange={(e) => change("estadoPago", e.target.value)} options={["Pagado", "Pendiente", "Bonificado"]} />
          <InputField icon={<CalendarClock />} label="Fecha de vencimiento" type="date" value={f.vencimiento} onChange={(e) => change("vencimiento", e.target.value)} />
          <InputField icon={<Globe />} label="Usuario de acceso" value={f.usuario} onChange={(e) => change("usuario", e.target.value)} placeholder="demo@cremprende.com" />
          <InputField icon={<KeyRound />} label="Contraseña temporal" value={f.password} onChange={(e) => change("password", e.target.value)} placeholder="Mínimo 6 caracteres" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <InfoItem label="Plan" value={`${f.esDemo ? "Demo" : f.plan} · ${f.esDemo ? "$0" : planSeleccionado?.precio || "$0"}`} highlight />
                <InfoItem label="Periodo" value={f.periodicidad} />
                <InfoItem label="Pago" value={f.esDemo ? "Bonificado" : f.estadoPago} />
        </div>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
          <b>Importante:</b> si marcás “Pagado”, después ese monto se va a tomar como ingreso para Dashboard y Finanzas. “Pendiente” queda latente y “Bonificado” habilita el plan sin sumar ingreso.
        </div>

        <div className="flex gap-3">
          <Button type="button" onClick={onClose} className="w-full bg-slate-800 text-white">Cancelar</Button>
          <Button type="button" onClick={create} className="w-full bg-blue-500 text-black">Crear usuario</Button>
        </div>
      </div>
    </ModalShell>
  );
}

function DataPage({ title, subtitle, headers, rows, stats = [] }) { return <div className="space-y-6"><PageHeader title={title} subtitle={subtitle} />{stats.length > 0 && <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{stats.map((item) => <ColorStatCard key={item.label} icon={item.icon} label={item.label} value={item.value} color={item.color} />)}</div>}<Card><CardContent className="p-5 overflow-x-auto"><table className="w-full text-sm"><TableHead headers={headers} /><tbody>{rows.map((row,i)=><tr key={i} className="border-b border-slate-800">{row.map((c,j)=><td key={j} className="py-4 pr-4 text-slate-100">{c}</td>)}</tr>)}</tbody></table></CardContent></Card></div> }
function PageHeader({ title, subtitle, buttonText, onButtonClick, secondaryButtonText, secondaryOnClick }) { return <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div><h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1><p className="text-slate-200 mt-2">{subtitle}</p></div><div className="flex gap-2">{secondaryButtonText&&<Button onClick={secondaryOnClick} className="bg-slate-800 text-white">{secondaryButtonText}</Button>}{buttonText&&<Button onClick={onButtonClick} className="bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 shadow-lg shadow-blue-950/30 hover:from-sky-300 hover:to-blue-400"><Users className="w-4 h-4 mr-2" />{buttonText}</Button>}</div></div> }
function SidebarButton({ active, icon, label, onClick }) { return <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold transition ${active ? "bg-blue-500 text-black" : "text-slate-100 hover:bg-slate-900"}`}>{React.cloneElement(icon,{className:"w-5 h-5 flex-shrink-0"})}<span className="truncate">{label}</span></button> }
function Card({ children, className="" }) { return <div className={`premium-card rounded-3xl ${className}`}>{children}</div> }
function ColorCard({ children, className="" }) { return <div className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl ${className}`}>{children}</div> }
function CardContent({ children, className="" }) { return <div className={className}>{children}</div> }

function DashboardActionCard({ icon, label, value, description, className, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-[1.75rem] border bg-gradient-to-br p-5 text-left shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-blue-950/50 ${className}`}
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl transition group-hover:bg-white/20" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] opacity-90">{label}</p>
          <p className="mt-3 text-4xl font-black text-white">{value}</p>
          <p className="mt-2 text-sm text-slate-100/90">{description}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-lg transition group-hover:scale-110">
          {React.cloneElement(icon, { className: "w-7 h-7" })}
        </div>
      </div>
      <div className="relative z-10 mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/80">
        Abrir módulo
        <span className="transition group-hover:translate-x-1">→</span>
      </div>
    </button>
  );
}


function ColorStatCard({ icon, label, value, color }) {
  return (
    <div className={`rounded-[1.75rem] bg-gradient-to-br ${color} p-5 shadow-2xl shadow-slate-950/25 border border-white/10 text-white overflow-hidden relative`}>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white/80 font-bold">{label}</p>
          <p className="text-3xl font-black mt-2">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center">
          {React.cloneElement(icon, { className: "w-6 h-6 text-white" })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, className = "border-blue-500/25 bg-gradient-to-br from-blue-500/25 via-sky-600/15 to-slate-950", iconClassName = "bg-white/15 text-white border-white/20" }) {
  return (
    <ColorCard className={`${className} min-h-[132px] transition duration-300 hover:-translate-y-0.5`}>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <CardContent className="relative z-10 h-full min-h-[132px] p-5 flex items-center justify-between">
        <div>
          <p className="text-white/85 text-sm font-black uppercase tracking-wide">{label}</p>
          <p className="text-3xl font-black mt-1 text-white">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${iconClassName}`}>{React.cloneElement(icon,{className:"w-6 h-6"})}</div>
      </CardContent>
    </ColorCard>
  );
}
function InfoItem({ label, value, highlight }) { return <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 mt-3"><p className="text-xs text-sky-300 font-bold uppercase tracking-wide mb-1">{label}</p><p className={`font-bold ${highlight ? "text-sky-300" : "text-white"}`}>{value}</p></div> }
function ArchitectureRow({ icon, title, text }) { return <div className="flex gap-3 rounded-2xl bg-slate-950 border border-slate-800 p-3"><div className="text-sky-300 mt-0.5">{React.cloneElement(icon,{className:"w-5 h-5"})}</div><div><p className="font-bold text-white">{title}</p><p className="text-xs text-slate-100 mt-1">{text}</p></div></div> }
function InputField({ icon, label, ...props }) { return <div><label className="block text-sm text-sky-300 font-semibold mb-2">{label}</label><div className="relative"><div className="absolute left-3 top-3.5 text-slate-100">{icon ? React.cloneElement(icon,{className:"w-4 h-4"}) : null}</div><input {...props} className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-950 border border-slate-700 outline-none focus:border-sky-300" /></div></div> }
function SelectField({ label, options, labels={}, ...props }) { return <div><label className="block text-sm text-sky-300 font-semibold mb-2">{label}</label><select {...props} className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-3 outline-none focus:border-sky-300">{options.map(o=><option key={o} value={o}>{labels[o] || o}</option>)}</select></div> }
function UserTableHead({ icon, label, center }) {
  return (
    <th className={`py-3 pr-3 whitespace-nowrap ${center ? "text-center" : ""}`}>
      <span className={`inline-flex items-center gap-2 ${center ? "justify-center" : ""}`}>{React.cloneElement(icon, { className: "w-4 h-4" })}{label}</span>
    </th>
  );
}
function TableHead({ headers }) { return <thead><tr className="text-left text-sky-300 border-b border-blue-500/20 bg-slate-950/60">{headers.map(h=><th key={h} className="py-3 pr-4">{h}</th>)}</tr></thead> }
function TableToolbar({ title, search, setSearch, placeholder }) { return <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5"><h2 className="text-xl font-bold text-white">{title}</h2><div className="relative"><Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-100" /><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={placeholder} className="pl-9 pr-3 py-3 rounded-xl bg-slate-950 border border-slate-700 outline-none focus:border-sky-300 text-sm" /></div></div> }
function Badge({ children }) { return <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-300 text-xs font-bold">{children}</span> }
function DueBadge({ status, date }) {
  const styles = {
    "Al día": "bg-emerald-400/15 text-emerald-300 border border-emerald-400/20",
    "Por vencer": "bg-amber-400/15 text-amber-300 border border-amber-400/20",
    Vencido: "bg-red-400/15 text-red-300 border border-red-400/20",
    "Sin fecha": "bg-slate-500/15 text-slate-300 border border-slate-500/20",
  };
  return (
    <div className="space-y-1 whitespace-nowrap">
      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${styles[status] || styles["Sin fecha"]}`}>{status}</span>
      <p className="text-xs text-slate-100">{date}</p>
    </div>
  );
}

function financePaymentTone(status) {
  if (status === "Pagado") return "success";
  if (status === "Bonificado") return "warning";
  return "danger";
}

function StatusBadge({ label, tone }) { const styles={success:"bg-emerald-600 text-white border border-emerald-700",danger:"bg-red-600 text-white border border-red-700",warning:"bg-blue-600 text-white border border-blue-700",info:"bg-violet-600 text-white border border-violet-700"}; return <span className={`px-3 py-1 rounded-full text-xs font-black ${styles[tone]||styles.warning}`}>{label}</span> }
function ModalShell({ eyebrow, title, onClose, children }) { return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"><div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-blue-500/30 shadow-2xl shadow-blue-600/10"><div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900 z-10"><div><p className="text-sm text-sky-300 font-bold uppercase tracking-wide">{eyebrow}</p><h2 className="text-2xl font-bold text-white">{title}</h2></div><Button onClick={onClose} className="bg-slate-800 text-white"><X className="w-4 h-4" /></Button></div>{children}</div></div> }
function Button({ children, className="", ...props }) { return <button {...props} className={`premium-button inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold transition duration-200 hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 ${className}`}>{children}</button> }
function parsePrice(value) {
  return Number(String(value || "0").replace(/[^0-9]/g, "")) || 0;
}
function money(n) { return `$${Number(n).toLocaleString("es-AR")}`; }

export default App;
