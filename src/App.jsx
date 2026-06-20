import React, { useMemo, useState } from "react";
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
    modulos: ["Dashboard", "Productos", "Insumos", "Proveedores", "Clientes", "Presupuestos", "Pedidos", "Finanzas", "WhatsApp", "Configuración"],
  },
  {
    id: "RUB-GAS",
    nombre: "Gastronomía / Repostería",
    enfoque: "Producción con recetas, materia prima y costos por unidad.",
    etiquetaInsumos: "Materia prima",
    actividades: ["Alfajores", "Tortas", "Viandas", "Cumpleaños", "Panificados"],
    ejemplos: "tortas, alfajores, comida casera, panificados",
    modulos: ["Dashboard", "Productos", "Insumos", "Proveedores", "Producción / Recetas", "Clientes", "Presupuestos", "Pedidos", "Finanzas", "WhatsApp", "Configuración"],
  },
  {
    id: "RUB-IMP",
    nombre: "Impresiones / Gráfica",
    enfoque: "Trabajos por pedido, insumos gráficos y presupuestos rápidos.",
    etiquetaInsumos: "Insumos",
    actividades: ["Fotocopias", "Sublimación", "Stickers", "Tarjetas", "Cumpleaños personalizados"],
    ejemplos: "stickers, tarjetas, folletos, sublimados, fotocopias",
    modulos: ["Dashboard", "Productos", "Insumos", "Proveedores", "Clientes", "Presupuestos", "Pedidos", "Finanzas", "Reportes", "WhatsApp", "Configuración"],
  },
  {
    id: "RUB-USADOS",
    nombre: "Indumentaria / Reventa",
    enfoque: "Compra y venta de productos con control de stock y margen.",
    etiquetaInsumos: "Mercadería",
    actividades: ["Ropa usada", "Ropa infantil", "Accesorios", "Feria americana", "Calzado"],
    ejemplos: "ropa usada, medias, accesorios, feria americana",
    modulos: ["Dashboard", "Productos", "Clientes", "Pedidos", "Finanzas", "Reportes", "WhatsApp", "Configuración"],
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
    vencimiento: "18/07/2026",
    owner: "Ana Repostería",
    color: "Rosa pastel",
    logo: "DA",
    whatsapp: "2974 000111",
    instagram: "@dulcesdeana",
    modulos: ["Dashboard", "Productos", "Insumos", "Producción / Recetas", "Clientes", "Presupuestos", "Finanzas", "WhatsApp", "Configuración"],
    soporteRemoto: { habilitado: false, vence: null },
  },
];

const usuariosIniciales = [
  { id: "USR-001", nombre: "Rodrigo Jabones", telefono: "2974 292907", email: "rodrigo@cremprende.com", rol: "Dueño", rubro: "Artesanías", plan: "Elite", estadoPago: "Pagado", fechaAlta: "01/06/2026", emprendimientoIds: ["EMP-001"], estado: "Activo", password: "123456", renovadoHasta: "30/06/2026", cambiosPassword: 1, renovaciones: 0 },
  { id: "USR-002", nombre: "Ana Repostería", telefono: "2974 000111", email: "ana@cremprende.com", rol: "Dueño", rubro: "Gastronomía / Repostería", plan: "Pro", estadoPago: "Pendiente", fechaAlta: "18/06/2026", emprendimientoIds: ["EMP-002"], estado: "Activo", password: "123456", renovadoHasta: "18/07/2026", cambiosPassword: 0, renovaciones: 0 },
  { id: "USR-003", nombre: "Ayudante Feria", telefono: "2974 222333", email: "ayuda@cremprende.com", rol: "Operador", rubro: "Artesanías", plan: "Básico", estadoPago: "Bonificado", fechaAlta: "10/06/2026", emprendimientoIds: ["EMP-001", "EMP-002"], estado: "Activo", password: "123456", renovadoHasta: "30/06/2026", cambiosPassword: 0, renovaciones: 0 },
];

const productosDemo = [
  { id: "PROD-1", emprendimientoId: "EMP-001", nombre: "Jabón lavanda", stock: 32, costo: 950, venta: 1800, estado: "Activo" },
  { id: "PROD-2", emprendimientoId: "EMP-001", nombre: "Pack regalo x3", stock: 9, costo: 2450, venta: 4500, estado: "Bajo stock" },
  { id: "PROD-3", emprendimientoId: "EMP-002", nombre: "Alfajor chocolate", stock: 45, costo: 420, venta: 800, estado: "Activo" },
];

const insumosDemo = [
  { id: "INS-1", emprendimientoId: "EMP-001", nombre: "Glicerina", costo: 6200, unidad: "kg", proveedor: "Distribuidora Sur" },
  { id: "INS-2", emprendimientoId: "EMP-001", nombre: "Fragancia lavanda", costo: 3500, unidad: "100ml", proveedor: "Esencias Patagónicas" },
  { id: "INS-3", emprendimientoId: "EMP-002", nombre: "Harina", costo: 1200, unidad: "kg", proveedor: "Mayorista local" },
];

const recetasDemo = [
  { id: "REC-1", emprendimientoId: "EMP-001", nombre: "Jabón lavanda x10", insumos: "Glicerina + fragancia + molde", costo: 9500, sugerido: 18000 },
  { id: "REC-2", emprendimientoId: "EMP-002", nombre: "Alfajor x12", insumos: "Harina + dulce + chocolate", costo: 5200, sugerido: 9600 },
];

const clientesDemo = [
  { id: "CLI-1", emprendimientoId: "EMP-001", nombre: "María López", telefono: "2974 111222", compras: 4, ultimaCompra: "Pack regalo x3", estado: "Activo" },
  { id: "CLI-2", emprendimientoId: "EMP-001", nombre: "Comisión Feria", telefono: "2974 333444", compras: 2, ultimaCompra: "Jabón lavanda", estado: "Seguimiento" },
  { id: "CLI-3", emprendimientoId: "EMP-002", nombre: "Lucía Pérez", telefono: "2974 555666", compras: 6, ultimaCompra: "Alfajor chocolate", estado: "Activo" },
];


function parseEsDate(dateText) {
  if (!dateText || typeof dateText !== "string") return null;
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

function accessUserFromName(name) {
  const base = (name || "demo")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 18) || "demo";
  return `${base}@cremprende.com`;
}

function App() {
  const supportParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const supportEmpIdFromUrl = supportParams?.get("soporte_emp") || null;
  const isSupportSession = Boolean(supportEmpIdFromUrl);

  const [isLoggedIn, setIsLoggedIn] = useState(isSupportSession);
  const [loginRole, setLoginRole] = useState(isSupportSession ? "Soporte C&R" : "Super Admin");
  const [loginEmail, setLoginEmail] = useState(isSupportSession ? "soporte@crsoluciones.com" : "admin@crsoluciones.com");
  const [activePage, setActivePage] = useState(isSupportSession ? "mi-panel" : "dashboard");
  const [emprendimientos, setEmprendimientos] = useState(emprendimientosIniciales);
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [rubros] = useState(rubrosIniciales);
  const [planes] = useState(planesIniciales);
  const [selectedEmpId, setSelectedEmpId] = useState(supportEmpIdFromUrl || "EMP-001");
  const [search, setSearch] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isBusinessWizardOpen, setIsBusinessWizardOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [mensajes, setMensajes] = useState([
    { id: "MSG-001", emprendimientoId: "EMP-001", usuarioId: "USR-001", adminId: "ADMIN-CR-001", de: "Rodrigo Jabones", asunto: "Consulta sobre presupuestos", categoria: "Consulta", mensaje: "Hola, quería saber si podemos agregar una opción para guardar presupuestos frecuentes.", estado: "Nuevo", fecha: "Hoy 10:20", respuesta: "", fechaRespuesta: "" },
    { id: "MSG-002", emprendimientoId: "EMP-002", usuarioId: "USR-002", adminId: "ADMIN-CR-001", de: "Ana Repostería", asunto: "Ayuda con recetas", categoria: "Ayuda", mensaje: "Necesito revisar cómo cargar los costos de una receta nueva.", estado: "Respondido", fecha: "Ayer 18:05", respuesta: "Sí, Ana. Entrá en Producción / Recetas y cargá primero la materia prima. Después armamos la receta con cantidades para calcular costo por unidad.", fechaRespuesta: "Ayer 18:42", respondidoPor: "C&R Soporte" },
  ]);

  const selectedEmp = emprendimientos.find((e) => e.id === selectedEmpId) || emprendimientos[0];
  const isAdmin = loginRole === "Super Admin";

  const filteredEmprendimientos = useMemo(() => {
    const term = search.toLowerCase();
    return emprendimientos.filter((e) => [e.id, e.nombre, e.rubro, e.actividad, e.owner, e.plan, e.estado, e.estadoPago].join(" ").toLowerCase().includes(term));
  }, [emprendimientos, search]);

  function handleLogin(e) {
    e.preventDefault();
    const email = loginEmail.toLowerCase();
    const detectedRole = email.includes("admin") || email.includes("cr") ? "Super Admin" : "Dueño";
    setLoginRole(detectedRole);
    setIsLoggedIn(true);
    setShowWelcome(detectedRole !== "Super Admin");
    setActivePage(detectedRole === "Super Admin" ? "dashboard" : "mi-panel");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setActivePage("dashboard");
  }

  function updateEmprendimientoSettings(updated) {
    setEmprendimientos((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
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

  if (!isLoggedIn) {
    return <LoginScreen email={loginEmail} setEmail={setLoginEmail} onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen text-white flex bg-[#07111f]">
      <aside className="hidden md:flex w-72 glass-panel border-r border-blue-500/20 p-5 flex-col sticky top-0 h-screen overflow-y-auto">
        <SidebarBrand isAdmin={isAdmin} emp={selectedEmp} />
        <nav className="space-y-1.5 flex-1 pb-4">
          {isAdmin ? (
            <>
              <SidebarButton active={activePage === "dashboard"} icon={<LayoutDashboard />} label="Dashboard" onClick={() => setActivePage("dashboard")} />
              <SidebarButton active={activePage === "usuarios"} icon={<Users />} label="Usuarios" onClick={() => setActivePage("usuarios")} />
              <SidebarButton active={activePage === "emprendimientos"} icon={<Building2 />} label="Emprendimientos" onClick={() => setActivePage("emprendimientos")} />
              <SidebarButton active={activePage === "rubros"} icon={<Boxes />} label="Rubros" onClick={() => setActivePage("rubros")} />
              <SidebarButton active={activePage === "modulos"} icon={<Settings />} label="Módulos" onClick={() => setActivePage("modulos")} />
              <SidebarButton active={activePage === "planes"} icon={<CreditCard />} label="Planes" onClick={() => setActivePage("planes")} />
              <SidebarButton active={activePage === "suscripciones"} icon={<DollarSign />} label="Finanzas" onClick={() => setActivePage("suscripciones")} />
              <SidebarButton active={activePage === "soporte"} icon={<ShieldCheck />} label="Soporte remoto" onClick={() => setActivePage("soporte")} />
              <SidebarButton active={activePage === "mensajes"} icon={<Mail />} label="Mensajes" onClick={() => setActivePage("mensajes")} />
            </>
          ) : (
            <>
              <SidebarButton active={activePage === "mi-panel"} icon={<LayoutDashboard />} label="Mi panel" onClick={() => setActivePage("mi-panel")} />
              <SidebarButton active={activePage === "productos"} icon={<Package />} label="Productos" onClick={() => setActivePage("productos")} />
              <SidebarButton active={activePage === "insumos"} icon={<Boxes />} label="Insumos" onClick={() => setActivePage("insumos")} />
              <SidebarButton active={activePage === "proveedores"} icon={<Building2 />} label="Proveedores" onClick={() => setActivePage("proveedores")} />
              <SidebarButton active={activePage === "recetas"} icon={<ClipboardList />} label="Producción / Recetas" onClick={() => setActivePage("recetas")} />
              <SidebarButton active={activePage === "clientes"} icon={<Users />} label="Clientes" onClick={() => setActivePage("clientes")} />
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
          <Button onClick={handleLogout} className="w-full mt-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white">
            <LogOut className="w-4 h-4 mr-2" /> Salir
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <div className="w-full space-y-6">
          {isSupportSession && <SupportSessionBanner emp={selectedEmp} />}
          {!isAdmin && !isSupportSession && selectedEmp?.soporteRemoto?.habilitado && <ClientSupportActiveBanner emp={selectedEmp} />}

          {isAdmin && activePage === "dashboard" && <AdminDashboard emprendimientos={emprendimientos} usuarios={usuarios} rubros={rubros} planes={planes} setActivePage={setActivePage} />}
          {isAdmin && activePage === "usuarios" && <UsuariosPage usuarios={usuarios} emprendimientos={emprendimientos} onNewUser={() => setIsUserModalOpen(true)} onRenewUser={renewUser} onChangePassword={changeUserPassword} />}
          {isAdmin && activePage === "emprendimientos" && <EmprendimientosPage emprendimientos={filteredEmprendimientos} search={search} setSearch={setSearch} onNewBusiness={() => setIsBusinessWizardOpen(true)} setSelectedEmpId={setSelectedEmpId} setActivePage={setActivePage} />}
          {isAdmin && activePage === "rubros" && <RubrosPage rubros={rubros} />}
          {isAdmin && activePage === "modulos" && <ModulosPage modules={modulesBase} rubros={rubros} />}
          {isAdmin && activePage === "planes" && <PlanesPage planes={planes} />}
          {isAdmin && activePage === "suscripciones" && <SuscripcionesPage emprendimientos={emprendimientos} planes={planes} />}
          {isAdmin && activePage === "soporte" && <SoporteAdminPage emprendimientos={emprendimientos} setSelectedEmpId={setSelectedEmpId} setActivePage={setActivePage} />}
          {isAdmin && activePage === "mensajes" && <MensajesAdminPage mensajes={mensajes} emprendimientos={emprendimientos} onReply={replyMensaje} />}

          {!isAdmin && activePage === "mi-panel" && <ClienteDashboard emp={selectedEmp} setActivePage={setActivePage} />}
          {!isAdmin && activePage === "productos" && <ClienteProductos emp={selectedEmp} />}
          {!isAdmin && activePage === "insumos" && <ClienteInsumos emp={selectedEmp} />}
          {!isAdmin && activePage === "proveedores" && <ClienteProveedores emp={selectedEmp} />}
          {!isAdmin && activePage === "recetas" && <ClienteRecetas emp={selectedEmp} />}
          {!isAdmin && activePage === "clientes" && <ClienteClientes emp={selectedEmp} />}
          {!isAdmin && activePage === "presupuestos" && <ClientePresupuestos emp={selectedEmp} />}
          {!isAdmin && activePage === "pedidos" && <ClientePedidos emp={selectedEmp} />}
          {!isAdmin && activePage === "finanzas" && <ClienteFinanzas emp={selectedEmp} />}
          {!isAdmin && activePage === "reportes" && <ClienteReportes emp={selectedEmp} />}
          {!isAdmin && activePage === "whatsapp" && <ClienteWhatsApp emp={selectedEmp} />}
          {!isAdmin && activePage === "configuracion" && <ClienteConfiguracion emp={selectedEmp} updateEmp={updateEmprendimientoSettings} plan={planes.find((p) => p.nombre === selectedEmp.plan)} />}
          {!isAdmin && activePage === "mensajes" && <ClienteMensajesPage emp={selectedEmp} mensajes={mensajes.filter((m) => m.emprendimientoId === selectedEmp.id)} onSend={sendMensaje} />}

          {isAdmin && activePage === "vista-cliente" && <ClienteDashboard emp={selectedEmp} adminView onBack={() => setActivePage("soporte")} />}
        </div>
      </main>

      {showWelcome && !isAdmin && <WelcomeModal emp={selectedEmp} onClose={() => setShowWelcome(false)} onMessages={() => { setShowWelcome(false); setActivePage("mensajes"); }} />}
      {isBusinessWizardOpen && <BusinessWizard rubros={rubros} planes={planes} modules={modulesBase} onClose={() => setIsBusinessWizardOpen(false)} onCreate={(nuevo) => { setEmprendimientos((prev) => [nuevo, ...prev]); setIsBusinessWizardOpen(false); setActivePage("emprendimientos"); }} />}
      {isUserModalOpen && <UsuarioModal rubros={rubros} planes={planes} onClose={() => setIsUserModalOpen(false)} onCreate={(nuevo) => { setUsuarios((prev) => [nuevo, ...prev]); setIsUserModalOpen(false); }} />}
    </div>
  );
}

function SidebarBrand({ isAdmin, emp }) {
  const isImageLogo = !isAdmin && emp?.logo && (emp.logo.startsWith("http") || emp.logo.startsWith("/"));

  if (isAdmin) {
    return (
      <div className="mb-8 rounded-[2rem] bg-white p-5 shadow-2xl shadow-blue-600/20 border border-blue-500/10">
        <img src="/logo-cr.png" alt="C&R Soluciones Digitales" className="w-full max-h-32 object-contain" />
        <p className="text-center text-[11px] text-slate-500 font-bold uppercase tracking-[0.22em] mt-3">Soluciones Digitales</p>
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/25 p-5 text-center shadow-2xl shadow-blue-900/20">
      <div className="mx-auto h-24 w-24 rounded-[1.75rem] bg-blue-500/15 border border-blue-400/25 flex items-center justify-center overflow-hidden mb-4">
        {isImageLogo ? <img src={emp.logo} alt={emp.nombre} className="h-full w-full object-cover" /> : <span className="text-3xl font-black text-sky-300">{emp?.logo || emp?.nombre?.slice(0,2) || "E"}</span>}
      </div>
      <p className="text-lg font-black text-white leading-tight">{emp?.nombre}</p>
      <p className="text-xs text-sky-300 font-bold uppercase tracking-wide mt-2">{emp?.rubro}</p>
      <p className="text-[11px] text-slate-300 mt-2">Panel personalizado</p>
    </div>
  );
}

function LoginScreen({ email, setEmail, onLogin }) {
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
      icon: <MessageCircle />,
      label: "Soporte C&R",
      value: "Mensajes internos y ayuda guiada",
      className: "from-emerald-400 via-teal-500 to-cyan-500 shadow-emerald-950/40",
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
        <div className="p-7 md:p-10 bg-gradient-to-br from-slate-950/92 via-black/72 to-slate-900/72">
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-md rounded-[2rem] bg-white/95 px-7 py-6 shadow-2xl shadow-blue-600/25 border border-white/40">
              <img src="/logo-cr.png" alt="C&R Soluciones Digitales" className="w-full h-32 object-contain" />
            </div>
          </div>

          <div className="mt-8 max-w-2xl">
            <p className="text-sm text-sky-300 font-black uppercase tracking-[0.24em]">C&R Emprende</p>
            <h1 className="text-4xl md:text-5xl font-black mt-4 leading-tight">Gestión simple para emprendedores reales</h1>
            <p className="text-slate-100 mt-4 leading-relaxed text-base md:text-lg">Una plataforma para ordenar stock, insumos, costos, clientes, presupuestos, finanzas y mensajes con C&R desde un solo lugar.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {loginBenefits.map((item) => (
              <div key={item.label} className={`rounded-[1.6rem] bg-gradient-to-br ${item.className} p-4 min-h-[132px] border border-white/20 shadow-xl text-white transition-transform hover:-translate-y-1`}>
                <div className="w-12 h-12 rounded-2xl bg-white/18 border border-white/25 flex items-center justify-center mb-4">
                  {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">{item.label}</p>
                <p className="text-base font-semibold mt-2 leading-snug text-white/95">{item.value}</p>
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
              <p className="text-slate-100 mt-2 leading-relaxed">C&R Emprende te ayuda a ordenar tu gestión, conocer tus costos y vender con más claridad desde un solo panel.</p>
            </div>
            <p className="text-slate-200 mt-4">Usá tu usuario y contraseña. Luego Supabase detectará automáticamente tu rol y tu emprendimiento.</p>
          </div>
          <InputField icon={<Users />} label="Usuario" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@crsoluciones.com" />
          <InputField icon={<KeyRound />} label="Contraseña" type="password" placeholder="••••••••" />
          <div className="rounded-2xl border border-sky-300/20 bg-sky-500/10 p-4 shadow-inner shadow-sky-950/30">
            <p className="text-sm text-slate-100">Modo prototipo: si el usuario contiene <b>admin</b> o <b>cr</b>, entra como administrador. Cualquier otro usuario entra como emprendedor.</p>
          </div>
          <Button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 text-slate-950 hover:scale-[1.01] py-6 font-black shadow-xl shadow-sky-950/30">Ingresar</Button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({ emprendimientos, usuarios, rubros, planes, setActivePage }) {
  const elite = emprendimientos.filter((e) => e.plan === "Elite").length;
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
      label: "Planes Elite",
      value: elite,
      icon: <ShieldCheck />,
      page: "planes",
      description: "Planes y soporte avanzado",
      className: "from-amber-400 via-orange-500 to-rose-600 border-amber-300/40 text-white shadow-orange-950/35",
    },
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
      <Card><CardContent className="p-5"><h2 className="text-xl font-bold text-white mb-4">Regla de datos</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-3"><ArchitectureRow icon={<Building2 />} title="Emprendimiento ID" text="Cada proyecto tiene su ID: EMP-001, EMP-002, etc." /><ArchitectureRow icon={<Boxes />} title="Datos vinculados" text="Productos, insumos, clientes y finanzas guardan emprendimiento_id." /><ArchitectureRow icon={<ShieldCheck />} title="Aislamiento" text="Cada usuario ve solo los datos de los emprendimientos asignados." /></div></CardContent></Card>
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
                    <td className="py-2.5 pr-3"><Badge>{u.plan || "Básico"}</Badge></td>
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
                          className="rounded-md bg-cyan-500/15 text-cyan-200 border border-cyan-400/25 hover:bg-cyan-500/25 !p-1"
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
                      <DueBadge status={getDueStatus(u.renovadoHasta)} date={u.renovadoHasta || "Sin fecha"} />
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                        {[1, 3, 6, 12].map((months) => (
                          <Button
                            key={months}
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setRenewal({ user: u, months }); }}
                            className="rounded-md bg-emerald-500/15 text-emerald-200 border border-emerald-400/25 hover:bg-emerald-500/25 !px-1.5 !py-1 text-[10px] leading-none font-black min-w-[30px]"
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
                <DetailBox icon={<DollarSign />} label="Estado de pago" value={selectedUser.estadoPago || "Pendiente"} />
                <DetailBox icon={<CalendarClock />} label="Fecha vencimiento" value={selectedUser.renovadoHasta || "Sin fecha"} />
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
  { card: "border-sky-300/40 bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-700 shadow-2xl shadow-sky-950/35", icon: "bg-white/20 text-white border-white/25", badge: "text-white" },
  { card: "border-emerald-300/40 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 shadow-2xl shadow-emerald-950/35", icon: "bg-white/20 text-white border-white/25", badge: "text-white" },
  { card: "border-amber-300/40 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 shadow-2xl shadow-orange-950/35", icon: "bg-white/20 text-white border-white/25", badge: "text-white" },
  { card: "border-violet-300/40 bg-gradient-to-br from-violet-500 via-fuchsia-600 to-indigo-700 shadow-2xl shadow-violet-950/35", icon: "bg-white/20 text-white border-white/25", badge: "text-white" },
];

function EmprendimientosPage({ emprendimientos, search, setSearch, onNewBusiness, setSelectedEmpId, setActivePage }) {
  const [selected, setSelected] = useState(null);
  const totalActivos = emprendimientos.filter((e) => e.estado === "Activo").length;
  const pendientes = emprendimientos.filter((e) => e.estadoPago === "Pendiente").length;
  const bonificados = emprendimientos.filter((e) => e.estadoPago === "Bonificado").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Emprendimientos"
        subtitle="Negocios reales de cada usuario. Acá vinculamos dueño, rubro, actividad, plan, pago y vencimiento."
        buttonText="Nuevo emprendimiento"
        onButtonClick={onNewBusiness}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<Building2 />} label="Emprendimientos" value={emprendimientos.length} className={statColorStyles.sky.card} iconClassName={statColorStyles.sky.icon} />
        <StatCard icon={<CheckCircle2 />} label="Activos" value={totalActivos} className={statColorStyles.emerald.card} iconClassName={statColorStyles.emerald.icon} />
        <StatCard icon={<CreditCard />} label="Pagos pendientes" value={pendientes} className={statColorStyles.amber.card} iconClassName={statColorStyles.amber.icon} />
        <StatCard icon={<ClipboardList />} label="Bonificados" value={bonificados} className={statColorStyles.violet.card} iconClassName={statColorStyles.violet.icon} />
      </div>

      <Card>
        <CardContent className="p-5 overflow-x-auto">
          <TableToolbar title="Listado de emprendimientos" search={search} setSearch={setSearch} placeholder="Buscar por nombre, dueño, rubro o actividad..." />
          <table className="w-full text-sm min-w-[980px]">
            <TableHead headers={["ID", "Emprendimiento", "Dueño", "Rubro", "Actividad", "Plan / Pago", "Vencimiento", "Estado", "Acción"]} />
            <tbody>
              {emprendimientos.map((e) => (
                <tr key={e.id} onClick={() => setSelected(e)} className="border-b border-slate-800 hover:bg-blue-500/5 cursor-pointer transition">
                  <td className="py-3 pr-4 text-sky-300 font-bold whitespace-nowrap">{e.id}</td>
                  <td className="py-3 pr-4 min-w-48">
                    <p className="font-bold text-white">{e.nombre}</p>
                    <p className="text-xs text-slate-400">Alta: {e.fechaAlta || "Pendiente"}</p>
                  </td>
                  <td className="py-3 pr-4 text-slate-200 whitespace-nowrap">{e.owner}</td>
                  <td className="py-3 pr-4"><Badge>{e.rubro}</Badge></td>
                  <td className="py-3 pr-4 text-slate-200">{e.actividad || "Sin actividad"}</td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-col gap-1 items-start">
                      <Badge>{e.plan}</Badge>
                      <StatusBadge label={e.estadoPago || "Pendiente"} tone={e.estadoPago === "Pagado" ? "success" : e.estadoPago === "Bonificado" ? "warning" : "danger"} />
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-center whitespace-nowrap">{e.vencimiento}</td>
                  <td className="py-3 pr-4"><StatusBadge label={e.estado} tone="success" /></td>
                  <td className="py-3 pr-4" onClick={(ev) => ev.stopPropagation()}>
                    <Button onClick={() => { setSelectedEmpId(e.id); setActivePage("vista-cliente"); }} className="rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 px-3 py-2 text-xs shadow-lg shadow-blue-950/30 hover:from-sky-300 hover:to-blue-400">Ver panel</Button>
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
              <InfoItem label="Dueño / responsable" value={selected.owner} />
              <InfoItem label="Rubro" value={selected.rubro} highlight />
              <InfoItem label="Actividad" value={selected.actividad || "Sin actividad"} />
              <InfoItem label="Plan contratado" value={selected.plan} highlight />
              <InfoItem label="Estado de pago" value={selected.estadoPago || "Pendiente"} />
              <InfoItem label="Fecha de alta" value={selected.fechaAlta || "Pendiente"} />
              <InfoItem label="Fecha de vencimiento" value={selected.vencimiento} />
              <InfoItem label="WhatsApp" value={selected.whatsapp || "Sin cargar"} />
              <InfoItem label="Instagram" value={selected.instagram || "Sin cargar"} />
            </div>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-white mb-3">Módulos activos por rubro</h3>
                <div className="flex flex-wrap gap-2">{selected.modulos.map((m) => <Badge key={m}>{m}</Badge>)}</div>
              </CardContent>
            </Card>
            <div className="flex gap-3">
              <Button onClick={() => setSelected(null)} className="w-full bg-slate-800 text-white">Cerrar</Button>
              <Button onClick={() => { setSelectedEmpId(selected.id); setActivePage("vista-cliente"); setSelected(null); }} className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 shadow-lg shadow-blue-950/30">Entrar al panel</Button>
            </div>
          </div>
        </ModalShell>
      )}
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
                <div className="flex flex-wrap gap-2">{(r.actividades || []).map((a) => <Badge key={a}>{a}</Badge>)}</div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-slate-950/30 p-4 shadow-inner shadow-black/20 backdrop-blur-sm">
                <p className="text-xs text-white/80 font-black uppercase tracking-wide mb-3">Ejemplos</p>
                <p className="text-sm leading-relaxed text-white/90">{r.ejemplos}</p>
              </div>

              <div className="rounded-3xl border border-white/15 bg-slate-950/30 p-4 shadow-inner shadow-black/20 backdrop-blur-sm">
                <p className="text-xs text-white/80 font-black uppercase tracking-wide mb-3">Módulos sugeridos</p>
                <div className="flex flex-wrap gap-2">{r.modulos.map((m) => <Badge key={m}>{m}</Badge>)}</div>
              </div>
            </CardContent>
          </ColorCard>
          );
        })}
      </div>
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

function SuscripcionesPage({ emprendimientos, planes }) {
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
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

        <Card>
          <CardContent className="p-5">
            <h2 className="text-xl font-black text-white mb-2">Regla financiera</h2>
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
      items: buildInitialItems(r.nombre),
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
          <div className="rounded-2xl bg-slate-950/60 border border-sky-400/20 p-4">
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
function ClienteClientes({ emp }) {
  const baseClientes = clientesDemo.filter((c) => c.emprendimientoId === emp.id).map((c) => ({
    ...c,
    email: c.email || "",
    direccion: c.direccion || "",
    notas: c.notas || "Cliente cargado para presupuestos, pedidos y WhatsApp.",
    totalComprado: c.totalComprado || c.compras * 8500,
    ultimaActividad: c.ultimaCompra ? `Último pedido: ${c.ultimaCompra}` : "Sin movimientos",
  }));
  const [clientes, setClientes] = useState(baseClientes);
  const [showNewClient, setShowNewClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({ nombre: "", telefono: "", email: "", direccion: "", notas: "" });

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

function MiniLineChart({ title, subtitle, values, labels }) {
  const max = Math.max(...values, 1);
  const points = values.map((v, i) => {
    const x = 8 + (i * 84) / Math.max(values.length - 1, 1);
    const y = 78 - (v / max) * 58;
    return `${x},${y}`;
  }).join(" ");
  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-black text-white">{title}</h3>
          <p className="text-sm text-slate-300 mt-1">{subtitle}</p>
        </div>
        <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-4">
          <svg viewBox="0 0 100 86" className="w-full h-56 overflow-visible">
            <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" className="text-sky-300 drop-shadow" strokeLinecap="round" strokeLinejoin="round" />
            {values.map((v, i) => {
              const x = 8 + (i * 84) / Math.max(values.length - 1, 1);
              const y = 78 - (v / max) * 58;
              return <g key={i}><circle cx={x} cy={y} r="2.7" className="fill-white" /><text x={x} y="84" textAnchor="middle" className="fill-slate-400 text-[4px] font-bold">{labels[i]}</text></g>;
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
  const [local, setLocal] = useState({ ...emp, apariencia: emp.apariencia || "oscuro", paleta: emp.paleta || "vivos" });
  function change(field, value) { setLocal((prev) => ({ ...prev, [field]: value })); }
  function toggleSupport(minutes) { setLocal((prev) => ({ ...prev, soporteRemoto: { habilitado: !prev.soporteRemoto.habilitado, vence: minutes } })); }
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
              <input type="file" accept="image/*" onChange={(e)=>change("logoFile", e.target.files?.[0]?.name || "")} className="block w-full text-sm text-slate-200 file:mr-4 file:rounded-xl file:border-0 file:bg-sky-500 file:px-4 file:py-2 file:font-bold file:text-white" />
              <p className="text-xs text-slate-400 mt-2">Ahora guardamos la referencia visual. Con Supabase Storage vamos a guardar la imagen real.</p>
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
            <h2 className="text-xl font-bold mb-4">Soporte remoto</h2>
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
            <p className="text-xs uppercase tracking-[0.3em] text-sky-200 font-black">Enrutamiento interno</p>
            <h2 className="text-2xl font-black text-white mt-2">Admin C&R ↔ Usuario / Emprendimiento</h2>
            <p className="text-sm text-slate-100 mt-2 max-w-3xl">Cada mensaje queda asociado a un emprendimiento, un usuario y el admin que responde. Más adelante en Supabase esto se guarda por ID para que ninguna respuesta llegue a otro cliente.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-white/10 border border-white/15 p-3"><p className="text-2xl font-black">{abiertos}</p><p className="text-[11px] text-sky-100">abiertos</p></div>
            <div className="rounded-2xl bg-white/10 border border-white/15 p-3"><p className="text-2xl font-black">ID</p><p className="text-[11px] text-sky-100">ruteado</p></div>
            <div className="rounded-2xl bg-white/10 border border-white/15 p-3"><p className="text-2xl font-black">C&R</p><p className="text-[11px] text-sky-100">responde</p></div>
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

  function create() {
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

    onCreate({
      id: `USR-${Date.now().toString().slice(-4)}`,
      nombre: f.nombre.trim(),
      telefono: f.telefono.trim(),
      email: f.usuario.trim(),
      rol: "Dueño",
      rubro: rubroSeleccionado?.nombre || "Sin rubro",
      plan: f.plan,
      periodicidad: f.periodicidad,
      estadoPago: f.estadoPago,
      fechaAlta,
      montoPlan: planSeleccionado?.precio || "$0",
      emprendimientoIds: [],
      estado: "Activo",
      password: f.password.trim(),
      renovadoHasta: isoToEsDate(f.vencimiento),
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
          <SelectField label="Rubro" value={f.rubroId} onChange={(e) => change("rubroId", e.target.value)} options={rubros.map((r) => r.id)} labels={Object.fromEntries(rubros.map((r) => [r.id, r.nombre]))} />
          <SelectField label="Plan contratado" value={f.plan} onChange={(e) => change("plan", e.target.value)} options={["Básico", "Pro", "Elite"]} />
          <SelectField label="Periodo de contratación" value={f.periodicidad} onChange={(e) => change("periodicidad", e.target.value)} options={["Mensual", "Trimestral", "Semestral", "Anual"]} />
          <SelectField label="Estado de pago" value={f.estadoPago} onChange={(e) => change("estadoPago", e.target.value)} options={["Pagado", "Pendiente", "Bonificado"]} />
          <InputField icon={<CalendarClock />} label="Fecha de vencimiento" type="date" value={f.vencimiento} onChange={(e) => change("vencimiento", e.target.value)} />
          <InputField icon={<Globe />} label="Usuario de acceso" value={f.usuario} onChange={(e) => change("usuario", e.target.value)} placeholder="demo@cremprende.com" />
          <InputField icon={<KeyRound />} label="Contraseña temporal" value={f.password} onChange={(e) => change("password", e.target.value)} placeholder="Mínimo 6 caracteres" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoItem label="Plan" value={`${f.plan} · ${planSeleccionado?.precio || "$0"}`} highlight />
          <InfoItem label="Periodo" value={f.periodicidad} />
          <InfoItem label="Pago" value={f.estadoPago} />
          <InfoItem label="Rubro" value={rubroSeleccionado?.nombre || "Sin rubro"} />
        </div>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
          <b>Importante:</b> si marcás “Pagado”, después ese monto se va a tomar como ingreso para Dashboard y Finanzas. “Pendiente” queda latente y “Bonificado” habilita el plan sin sumar ingreso.
        </div>

        <div className="flex gap-3">
          <Button onClick={onClose} className="w-full bg-slate-800 text-white">Cancelar</Button>
          <Button onClick={create} className="w-full bg-blue-500 text-black">Crear usuario</Button>
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
      className={`group relative overflow-hidden rounded-[1.75rem] border bg-gradient-to-br p-5 text-left shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-blue-950/50 ${className}`}
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
      <div className="relative z-10 mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/80">
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
    <ColorCard className={`${className} transition duration-300 hover:-translate-y-0.5`}>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <CardContent className="relative z-10 p-5 flex items-center justify-between">
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

function StatusBadge({ label, tone }) { const styles={success:"bg-emerald-400/15 text-emerald-300",danger:"bg-red-400/15 text-red-300",warning:"bg-blue-500/15 text-sky-300"}; return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[tone]||styles.warning}`}>{label}</span> }
function ModalShell({ eyebrow, title, onClose, children }) { return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"><div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-blue-500/30 shadow-2xl shadow-blue-600/10"><div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900 z-10"><div><p className="text-sm text-sky-300 font-bold uppercase tracking-wide">{eyebrow}</p><h2 className="text-2xl font-bold text-white">{title}</h2></div><Button onClick={onClose} className="bg-slate-800 text-white"><X className="w-4 h-4" /></Button></div>{children}</div></div> }
function Button({ children, className="", ...props }) { return <button {...props} className={`premium-button inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold transition duration-200 hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 ${className}`}>{children}</button> }
function parsePrice(value) {
  return Number(String(value || "0").replace(/[^0-9]/g, "")) || 0;
}
function money(n) { return `$${Number(n).toLocaleString("es-AR")}`; }

export default App;
