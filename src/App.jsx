import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  DollarSign,
  Eye,
  EyeOff,
  Globe,
  KeyRound,
  LayoutDashboard,
  LogIn,
  LogOut,
  MessageCircle,
  Package,
  Palette,
  Phone,
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
  "Inventario",
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
    ejemplos: "sahumerios, tejidos, velas, manualidades, fragancias",
    modulos: ["Dashboard", "Productos", "Inventario", "Insumos", "Proveedores", "Clientes", "Presupuestos", "Pedidos", "Finanzas", "WhatsApp", "Configuración"],
  },
  {
    id: "RUB-GAS",
    nombre: "Gastronomía / Repostería",
    ejemplos: "tortas, alfajores, comida casera, panificados",
    modulos: ["Dashboard", "Productos", "Inventario", "Insumos", "Proveedores", "Producción / Recetas", "Clientes", "Presupuestos", "Pedidos", "Finanzas", "WhatsApp", "Configuración"],
  },
  {
    id: "RUB-IMP",
    nombre: "Impresiones / Gráfica",
    ejemplos: "stickers, tarjetas, folletos, sublimados",
    modulos: ["Dashboard", "Productos", "Inventario", "Insumos", "Proveedores", "Clientes", "Presupuestos", "Pedidos", "Finanzas", "Reportes", "WhatsApp", "Configuración"],
  },
  {
    id: "RUB-USADOS",
    nombre: "Venta de usados / Ropa",
    ejemplos: "ropa usada, medias, accesorios, feria americana",
    modulos: ["Dashboard", "Productos", "Inventario", "Clientes", "Pedidos", "Finanzas", "Reportes", "WhatsApp", "Configuración"],
  },
];

const planesIniciales = [
  { id: "PLAN-BAS", nombre: "Básico", precio: "$15.000", soporte: "Explicación inicial + uso autónomo", usuarios: 1, accesoAdmin: false },
  { id: "PLAN-PRO", nombre: "Pro", precio: "$25.000", soporte: "Ayuda y configuraciones simples", usuarios: 2, accesoAdmin: false },
  { id: "PLAN-ELITE", nombre: "Elite", precio: "$40.000", soporte: "Acompañamiento y soporte remoto", usuarios: 5, accesoAdmin: true },
];

const emprendimientosIniciales = [
  {
    id: "EMP-001",
    nombre: "Jabones de Rodrigo",
    rubroId: "RUB-ART",
    rubro: "Artesanías",
    plan: "Elite",
    estado: "Activo",
    vencimiento: "30/06/2026",
    owner: "Rodrigo Jabones",
    color: "Dorado",
    logo: "JR",
    whatsapp: "2974 292907",
    instagram: "@jabonesrodrigo",
    modulos: ["Dashboard", "Productos", "Inventario", "Insumos", "Proveedores", "Producción / Recetas", "Clientes", "Presupuestos", "Pedidos", "Finanzas", "WhatsApp", "Configuración"],
    soporteRemoto: { habilitado: true, vence: "15 min" },
  },
  {
    id: "EMP-002",
    nombre: "Dulces de Ana",
    rubroId: "RUB-GAS",
    rubro: "Gastronomía / Repostería",
    plan: "Pro",
    estado: "Activo",
    vencimiento: "18/07/2026",
    owner: "Ana Repostería",
    color: "Rosa pastel",
    logo: "DA",
    whatsapp: "2974 000111",
    instagram: "@dulcesdeana",
    modulos: ["Dashboard", "Productos", "Inventario", "Insumos", "Producción / Recetas", "Clientes", "Presupuestos", "Finanzas", "WhatsApp", "Configuración"],
    soporteRemoto: { habilitado: false, vence: null },
  },
];

const usuariosIniciales = [
  { id: "USR-001", nombre: "Rodrigo Jabones", email: "rodrigo@demo.com", rol: "Dueño", emprendimientoIds: ["EMP-001"], estado: "Activo", password: "123456" },
  { id: "USR-002", nombre: "Ana Repostería", email: "ana@demo.com", rol: "Dueño", emprendimientoIds: ["EMP-002"], estado: "Activo", password: "123456" },
  { id: "USR-003", nombre: "Ayudante Feria", email: "ayuda@demo.com", rol: "Operador", emprendimientoIds: ["EMP-001", "EMP-002"], estado: "Activo", password: "123456" },
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginRole, setLoginRole] = useState("Super Admin");
  const [activePage, setActivePage] = useState("dashboard");
  const [emprendimientos, setEmprendimientos] = useState(emprendimientosIniciales);
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [rubros] = useState(rubrosIniciales);
  const [planes] = useState(planesIniciales);
  const [selectedEmpId, setSelectedEmpId] = useState("EMP-001");
  const [search, setSearch] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isBusinessWizardOpen, setIsBusinessWizardOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const selectedEmp = emprendimientos.find((e) => e.id === selectedEmpId) || emprendimientos[0];
  const isAdmin = loginRole === "Super Admin";

  const filteredEmprendimientos = useMemo(() => {
    const term = search.toLowerCase();
    return emprendimientos.filter((e) => [e.id, e.nombre, e.rubro, e.owner, e.plan, e.estado].join(" ").toLowerCase().includes(term));
  }, [emprendimientos, search]);

  function handleLogin(e) {
    e.preventDefault();
    setIsLoggedIn(true);
    setActivePage(loginRole === "Super Admin" ? "dashboard" : "mi-panel");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setActivePage("dashboard");
  }

  function updateEmprendimientoSettings(updated) {
    setEmprendimientos((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  }

  if (!isLoggedIn) {
    return <LoginScreen role={loginRole} setRole={setLoginRole} onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen text-white flex bg-slate-950">
      <aside className="hidden md:flex w-72 glass-panel border-r border-blue-500/20 p-5 flex-col sticky top-0 h-screen">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white p-2 shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <img src="/logo-cr.png" alt="C&R Soluciones Digitales" className="max-h-full max-w-full object-contain" />
            </div>
            <div>
              <p className="text-xs text-sky-300 font-bold uppercase tracking-wide">C&R Soluciones Digitales</p>
              <h1 className="text-2xl font-bold mt-0.5">C&R Emprende</h1>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-3">Plataforma de gestión para emprendedores</p>
        </div>
        <nav className="space-y-2">
          {isAdmin ? (
            <>
              <SidebarButton active={activePage === "dashboard"} icon={<LayoutDashboard />} label="Dashboard" onClick={() => setActivePage("dashboard")} />
              <SidebarButton active={activePage === "usuarios"} icon={<Users />} label="Usuarios" onClick={() => setActivePage("usuarios")} />
              <SidebarButton active={activePage === "emprendimientos"} icon={<Building2 />} label="Emprendimientos" onClick={() => setActivePage("emprendimientos")} />
              <SidebarButton active={activePage === "rubros"} icon={<Boxes />} label="Rubros" onClick={() => setActivePage("rubros")} />
              <SidebarButton active={activePage === "modulos"} icon={<Settings />} label="Módulos" onClick={() => setActivePage("modulos")} />
              <SidebarButton active={activePage === "planes"} icon={<CreditCard />} label="Planes" onClick={() => setActivePage("planes")} />
              <SidebarButton active={activePage === "suscripciones"} icon={<DollarSign />} label="Suscripciones" onClick={() => setActivePage("suscripciones")} />
              <SidebarButton active={activePage === "soporte"} icon={<ShieldCheck />} label="Soporte remoto" onClick={() => setActivePage("soporte")} />
            </>
          ) : (
            <>
              <SidebarButton active={activePage === "mi-panel"} icon={<LayoutDashboard />} label="Mi panel" onClick={() => setActivePage("mi-panel")} />
              <SidebarButton active={activePage === "productos"} icon={<Package />} label="Productos" onClick={() => setActivePage("productos")} />
              <SidebarButton active={activePage === "insumos"} icon={<Boxes />} label="Insumos" onClick={() => setActivePage("insumos")} />
              <SidebarButton active={activePage === "recetas"} icon={<ClipboardList />} label="Producción / Recetas" onClick={() => setActivePage("recetas")} />
              <SidebarButton active={activePage === "finanzas"} icon={<DollarSign />} label="Finanzas" onClick={() => setActivePage("finanzas")} />
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
        <div className="max-w-7xl mx-auto space-y-6">
          {isAdmin && activePage === "dashboard" && <AdminDashboard emprendimientos={emprendimientos} usuarios={usuarios} planes={planes} onNewBusiness={() => setIsBusinessWizardOpen(true)} onNewUser={() => setIsUserModalOpen(true)} />}
          {isAdmin && activePage === "usuarios" && <UsuariosPage usuarios={usuarios} emprendimientos={emprendimientos} showPasswords={showPasswords} setShowPasswords={setShowPasswords} onNewUser={() => setIsUserModalOpen(true)} />}
          {isAdmin && activePage === "emprendimientos" && <EmprendimientosPage emprendimientos={filteredEmprendimientos} search={search} setSearch={setSearch} onNewBusiness={() => setIsBusinessWizardOpen(true)} setSelectedEmpId={setSelectedEmpId} setActivePage={setActivePage} />}
          {isAdmin && activePage === "rubros" && <RubrosPage rubros={rubros} />}
          {isAdmin && activePage === "modulos" && <ModulosPage modules={modulesBase} rubros={rubros} />}
          {isAdmin && activePage === "planes" && <PlanesPage planes={planes} />}
          {isAdmin && activePage === "suscripciones" && <SuscripcionesPage emprendimientos={emprendimientos} planes={planes} />}
          {isAdmin && activePage === "soporte" && <SoporteAdminPage emprendimientos={emprendimientos} setSelectedEmpId={setSelectedEmpId} setActivePage={setActivePage} />}

          {!isAdmin && activePage === "mi-panel" && <ClienteDashboard emp={selectedEmp} />}
          {!isAdmin && activePage === "productos" && <ClienteProductos emp={selectedEmp} />}
          {!isAdmin && activePage === "insumos" && <ClienteInsumos emp={selectedEmp} />}
          {!isAdmin && activePage === "recetas" && <ClienteRecetas emp={selectedEmp} />}
          {!isAdmin && activePage === "finanzas" && <ClienteFinanzas emp={selectedEmp} />}
          {!isAdmin && activePage === "configuracion" && <ClienteConfiguracion emp={selectedEmp} updateEmp={updateEmprendimientoSettings} plan={planes.find((p) => p.nombre === selectedEmp.plan)} />}

          {isAdmin && activePage === "vista-cliente" && <ClienteDashboard emp={selectedEmp} adminView onBack={() => setActivePage("soporte")} />}
        </div>
      </main>

      {isBusinessWizardOpen && <BusinessWizard rubros={rubros} planes={planes} modules={modulesBase} onClose={() => setIsBusinessWizardOpen(false)} onCreate={(nuevo) => { setEmprendimientos((prev) => [nuevo, ...prev]); setIsBusinessWizardOpen(false); setActivePage("emprendimientos"); }} />}
      {isUserModalOpen && <UsuarioModal emprendimientos={emprendimientos} onClose={() => setIsUserModalOpen(false)} onCreate={(nuevo) => { setUsuarios((prev) => [nuevo, ...prev]); setIsUserModalOpen(false); }} />}
    </div>
  );
}

function LoginScreen({ role, setRole, onLogin }) {
  const roles = ["Super Admin", "Dueño", "Administrador", "Operador", "Vendedor"];
  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-[2rem] overflow-hidden glass-panel">
        <div className="p-8 md:p-10 bg-gradient-to-br from-slate-950 via-black to-slate-900">
          <p className="text-sm text-sky-300 font-bold uppercase tracking-wide">C&R Soluciones Digitales</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">Plataforma de gestión para emprendimientos</h1>
          <p className="text-slate-200 mt-4 leading-relaxed">Una sola plataforma, muchos emprendimientos. Cada usuario entra con su ID y ve solo la información de su propio proyecto.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            <InfoItem label="Tenant ID" value="EMP-001" highlight />
            <InfoItem label="Rubros" value="Ferias, comida, artesanías" />
            <InfoItem label="Datos aislados" value="Por emprendimiento" />
            <InfoItem label="Soporte" value="Acceso autorizado" />
          </div>
        </div>
        <form onSubmit={onLogin} className="p-8 md:p-10 bg-slate-900/90 space-y-5">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-sky-300 flex items-center justify-center mb-4"><LogIn className="w-7 h-7" /></div>
            <h2 className="text-3xl font-bold text-white">Ingresar</h2>
            <p className="text-slate-200 mt-2">Elegí un rol para probar el prototipo.</p>
          </div>
          <InputField icon={<Users />} label="Usuario" placeholder="admin@crdesarrollo.com" />
          <InputField icon={<KeyRound />} label="Contraseña" type="password" placeholder="••••••••" />
          <div>
            <label className="block text-sm text-sky-300 font-semibold mb-2">Rol de acceso</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {roles.map((item) => <button key={item} type="button" onClick={() => setRole(item)} className={`rounded-xl border px-3 py-3 text-sm text-left font-bold transition ${role === item ? "border-blue-500 bg-blue-500 text-black" : "border-slate-700 bg-slate-950 text-slate-100 hover:border-blue-500/50"}`}>{item}</button>)}
            </div>
          </div>
          <Button type="submit" className="w-full rounded-2xl bg-blue-500 text-black hover:bg-sky-300 py-6 font-bold">Entrar como {role}</Button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({ emprendimientos, usuarios, planes, onNewBusiness, onNewUser }) {
  const elite = emprendimientos.filter((e) => e.plan === "Elite").length;
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard administrador" subtitle="Tu centro de control para usuarios, rubros, planes y soporte." buttonText="Nuevo emprendimiento" onButtonClick={onNewBusiness} secondaryButtonText="Nuevo usuario" secondaryOnClick={onNewUser} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<Building2 />} label="Emprendimientos" value={emprendimientos.length} />
        <StatCard icon={<Users />} label="Usuarios" value={usuarios.length} />
        <StatCard icon={<CreditCard />} label="Planes" value={planes.length} />
        <StatCard icon={<ShieldCheck />} label="Elite" value={elite} />
      </div>
      <Card><CardContent className="p-5"><h2 className="text-xl font-bold text-white mb-4">Regla de datos</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-3"><ArchitectureRow icon={<Building2 />} title="Emprendimiento ID" text="Cada proyecto tiene su ID: EMP-001, EMP-002, etc." /><ArchitectureRow icon={<Boxes />} title="Datos vinculados" text="Productos, insumos, clientes y finanzas guardan emprendimiento_id." /><ArchitectureRow icon={<ShieldCheck />} title="Aislamiento" text="Cada usuario ve solo los datos de los emprendimientos asignados." /></div></CardContent></Card>
    </div>
  );
}

function UsuariosPage({ usuarios, emprendimientos, showPasswords, setShowPasswords, onNewUser }) {
  return <div className="space-y-6"><PageHeader title="Usuarios" subtitle="Usuarios habilitados para usar la plataforma." buttonText="Nuevo usuario" onButtonClick={onNewUser} /><Card><CardContent className="p-5 overflow-x-auto"><div className="flex justify-between mb-4"><h2 className="text-xl font-bold">Usuarios creados</h2><Button onClick={() => setShowPasswords((p) => !p)} className="rounded-xl bg-slate-800 text-white">{showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</Button></div><table className="w-full text-sm"><TableHead headers={["Usuario", "Email", "Rol", "Emprendimientos", "Contraseña", "Estado"]} /><tbody>{usuarios.map((u) => <tr key={u.id} className="border-b border-slate-800"><td className="py-4 pr-4 font-bold text-white">{u.nombre}<p className="text-xs text-sky-300">{u.id}</p></td><td className="py-4 pr-4">{u.email}</td><td className="py-4 pr-4"><Badge>{u.rol}</Badge></td><td className="py-4 pr-4">{u.emprendimientoIds.map((id) => emprendimientos.find((e) => e.id === id)?.nombre || id).join(", ")}</td><td className="py-4 pr-4 font-mono">{showPasswords ? u.password : "••••••"}</td><td className="py-4 pr-4"><StatusBadge label={u.estado} tone="success" /></td></tr>)}</tbody></table></CardContent></Card></div>;
}

function EmprendimientosPage({ emprendimientos, search, setSearch, onNewBusiness, setSelectedEmpId, setActivePage }) {
  return <div className="space-y-6"><PageHeader title="Emprendimientos" subtitle="Cada emprendimiento tiene su ID y sus datos aislados." buttonText="Nuevo emprendimiento" onButtonClick={onNewBusiness} /><Card><CardContent className="p-5 overflow-x-auto"><TableToolbar title="Listado" search={search} setSearch={setSearch} placeholder="Buscar por ID, rubro, dueño..." /><table className="w-full text-sm"><TableHead headers={["ID", "Emprendimiento", "Rubro", "Plan", "Vence", "Estado", "Acción"]} /><tbody>{emprendimientos.map((e) => <tr key={e.id} className="border-b border-slate-800"><td className="py-4 pr-4 text-sky-300 font-bold">{e.id}</td><td className="py-4 pr-4"><p className="font-bold text-white">{e.nombre}</p><p className="text-xs text-slate-300">{e.owner}</p></td><td className="py-4 pr-4">{e.rubro}</td><td className="py-4 pr-4"><Badge>{e.plan}</Badge></td><td className="py-4 pr-4">{e.vencimiento}</td><td className="py-4 pr-4"><StatusBadge label={e.estado} tone="success" /></td><td className="py-4 pr-4"><Button onClick={() => { setSelectedEmpId(e.id); setActivePage("vista-cliente"); }} className="rounded-xl bg-blue-500 text-black">Ver panel</Button></td></tr>)}</tbody></table></CardContent></Card></div>;
}

function RubrosPage({ rubros }) { return <div className="space-y-6"><PageHeader title="Rubros" subtitle="Rubros generales donde se agrupan emprendimientos locales." /><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{rubros.map((r) => <Card key={r.id}><CardContent className="p-5"><p className="text-xs text-sky-300 font-bold">{r.id}</p><h2 className="text-xl font-bold text-white mt-1">{r.nombre}</h2><p className="text-sm text-slate-200 mt-2">{r.ejemplos}</p><div className="flex flex-wrap gap-2 mt-4">{r.modulos.map((m) => <Badge key={m}>{m}</Badge>)}</div></CardContent></Card>)}</div></div>; }
function ModulosPage({ modules, rubros }) { return <div className="space-y-6"><PageHeader title="Módulos" subtitle="Módulos universales e interconectados entre sí." /><div className="grid grid-cols-1 md:grid-cols-4 gap-4">{modules.map((m) => <Card key={m}><CardContent className="p-5"><Settings className="w-6 h-6 text-sky-300 mb-3" /><h3 className="font-bold text-white">{m}</h3><p className="text-xs text-slate-200 mt-2">Disponible para configurar por rubro/emprendimiento.</p></CardContent></Card>)}</div><Card><CardContent className="p-5"><h2 className="text-xl font-bold mb-3">Conexión entre módulos</h2><p className="text-slate-200">Ejemplo: Producción / Recetas toma precios de Insumos, calcula costos, propone precio de venta y envía el resultado a Presupuestos y Finanzas.</p></CardContent></Card></div>; }
function PlanesPage({ planes }) { return <div className="space-y-6"><PageHeader title="Planes" subtitle="Los planes no quitan módulos; cambian el nivel de ayuda y acompañamiento." /><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{planes.map((p) => <Card key={p.id}><CardContent className="p-5"><p className="text-xs text-sky-300 font-bold">{p.id}</p><h2 className="text-2xl font-bold text-white">{p.nombre}</h2><p className="text-3xl font-bold text-sky-300 mt-3">{p.precio}</p><p className="text-sm text-slate-200 mt-3">{p.soporte}</p><InfoItem label="Usuarios incluidos" value={p.usuarios} /><InfoItem label="Acceso admin" value={p.accesoAdmin ? "Disponible" : "No incluido"} highlight={p.accesoAdmin} /></CardContent></Card>)}</div></div>; }
function SuscripcionesPage({ emprendimientos, planes }) { return <div className="space-y-6"><PageHeader title="Suscripciones" subtitle="Control mensual de planes, vencimientos y estado comercial." /><Card><CardContent className="p-5 overflow-x-auto"><table className="w-full text-sm"><TableHead headers={["Emprendimiento", "Plan", "Precio", "Vencimiento", "Estado"]} /><tbody>{emprendimientos.map((e) => <tr key={e.id} className="border-b border-slate-800"><td className="py-4 pr-4 font-bold text-white">{e.nombre}<p className="text-xs text-sky-300">{e.id}</p></td><td className="py-4 pr-4"><Badge>{e.plan}</Badge></td><td className="py-4 pr-4 text-sky-300 font-bold">{planes.find((p) => p.nombre === e.plan)?.precio}</td><td className="py-4 pr-4">{e.vencimiento}</td><td className="py-4 pr-4"><StatusBadge label={e.estado} tone="success" /></td></tr>)}</tbody></table></CardContent></Card></div>; }
function SoporteAdminPage({ emprendimientos, setSelectedEmpId, setActivePage }) { const habilitados = emprendimientos.filter((e) => e.soporteRemoto.habilitado); return <div className="space-y-6"><PageHeader title="Soporte remoto" subtitle="Solo entrás al panel del cliente si te habilita acceso temporal." /><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><StatCard icon={<ShieldCheck />} label="Accesos activos" value={habilitados.length} /><StatCard icon={<AlertTriangle />} label="Solicitudes" value="0" /><StatCard icon={<CalendarClock />} label="Tiempo típico" value="15 min" /></div><Card><CardContent className="p-5"><h2 className="text-xl font-bold mb-4">Accesos autorizados</h2>{habilitados.map((e) => <div key={e.id} className="rounded-2xl bg-slate-950 border border-blue-500/20 p-4 flex justify-between items-center mb-3"><div><p className="font-bold text-white">{e.nombre}</p><p className="text-xs text-slate-200">{e.id} · vence en {e.soporteRemoto.vence}</p></div><Button onClick={() => { setSelectedEmpId(e.id); setActivePage("vista-cliente"); }} className="bg-blue-500 text-black">Entrar</Button></div>)}</CardContent></Card></div>; }

function ClienteDashboard({ emp, adminView, onBack }) {
  const productos = productosDemo.filter((p) => p.emprendimientoId === emp.id);
  return <div className="space-y-6">{adminView && <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-200 hover:text-sky-300"><ArrowLeft className="w-4 h-4" /> Volver a soporte</button>}<PageHeader title={emp.nombre} subtitle={`Panel del emprendimiento · ${emp.id} · ${emp.rubro}`} /><div className="grid grid-cols-1 md:grid-cols-4 gap-4"><StatCard icon={<Package />} label="Productos" value={productos.length} /><StatCard icon={<ShoppingBag />} label="Ventas mes" value="$128.000" /><StatCard icon={<Users />} label="Clientes" value="18" /><StatCard icon={<DollarSign />} label="Ganancia" value="$52.000" /></div><Card><CardContent className="p-5"><h2 className="text-xl font-bold mb-3">Módulos activos</h2><div className="flex flex-wrap gap-2">{emp.modulos.map((m) => <Badge key={m}>{m}</Badge>)}</div></CardContent></Card></div>;
}
function ClienteProductos({ emp }) { const rows = productosDemo.filter((p) => p.emprendimientoId === emp.id).map((p) => [p.nombre, p.stock, money(p.costo), money(p.venta), p.estado]); return <DataPage title="Productos" subtitle="Productos terminados del emprendimiento." headers={["Producto", "Stock", "Costo", "Venta", "Estado"]} rows={rows} />; }
function ClienteInsumos({ emp }) { const rows = insumosDemo.filter((i) => i.emprendimientoId === emp.id).map((i) => [i.nombre, money(i.costo), i.unidad, i.proveedor]); return <DataPage title="Insumos" subtitle="Insumos o materia prima para producir y calcular costos." headers={["Insumo", "Costo", "Unidad", "Proveedor"]} rows={rows} />; }
function ClienteRecetas({ emp }) { const rows = recetasDemo.filter((r) => r.emprendimientoId === emp.id).map((r) => [r.nombre, r.insumos, money(r.costo), money(r.sugerido)]); return <DataPage title="Producción / Recetas" subtitle="Recetas conectadas con insumos para calcular costos y precios." headers={["Receta", "Insumos", "Costo", "Precio sugerido"]} rows={rows} />; }
function ClienteFinanzas({ emp }) { return <div className="space-y-6"><PageHeader title="Finanzas" subtitle="Ingresos, gastos y ganancia del emprendimiento." /><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><StatCard icon={<DollarSign />} label="Ingresos" value="$128.000" /><StatCard icon={<AlertTriangle />} label="Costos" value="$76.000" /><StatCard icon={<CheckCircle2 />} label="Ganancia" value="$52.000" /></div></div>; }
function ClienteConfiguracion({ emp, updateEmp, plan }) {
  const [local, setLocal] = useState(emp);
  function change(field, value) { setLocal((prev) => ({ ...prev, [field]: value })); }
  function toggleSupport(minutes) { setLocal((prev) => ({ ...prev, soporteRemoto: { habilitado: !prev.soporteRemoto.habilitado, vence: minutes } })); }
  return <div className="space-y-6"><PageHeader title="Configuración" subtitle="Personalización del panel, datos comerciales y soporte remoto." /><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><Card><CardContent className="p-5 space-y-4"><h2 className="text-xl font-bold">Datos del emprendimiento</h2><InputField label="Nombre" value={local.nombre} onChange={(e) => change("nombre", e.target.value)} icon={<Building2 />} /><InputField label="WhatsApp" value={local.whatsapp} onChange={(e) => change("whatsapp", e.target.value)} icon={<Phone />} /><InputField label="Instagram" value={local.instagram} onChange={(e) => change("instagram", e.target.value)} icon={<Globe />} /><InputField label="Logo / iniciales" value={local.logo} onChange={(e) => change("logo", e.target.value)} icon={<Palette />} /><InputField label="Color principal" value={local.color} onChange={(e) => change("color", e.target.value)} icon={<Palette />} /><Button onClick={() => updateEmp(local)} className="w-full bg-blue-500 text-black py-6">Guardar configuración</Button></CardContent></Card><Card><CardContent className="p-5"><h2 className="text-xl font-bold mb-4">Soporte remoto</h2><p className="text-sm text-slate-200 mb-4">Disponible para plan Elite. El administrador solo puede entrar si vos lo habilitás por tiempo limitado.</p>{plan?.accesoAdmin ? <div className="space-y-3"><StatusBadge label={local.soporteRemoto.habilitado ? `Habilitado · ${local.soporteRemoto.vence}` : "Deshabilitado"} tone={local.soporteRemoto.habilitado ? "success" : "danger"} /><div className="grid grid-cols-2 gap-2">{["15 min", "30 min", "1 hora", "24 horas"].map((m) => <Button key={m} onClick={() => toggleSupport(m)} className="bg-slate-800 text-white">{m}</Button>)}</div><Button onClick={() => updateEmp(local)} className="w-full bg-blue-500 text-black">Guardar acceso</Button></div> : <StatusBadge label="No incluido en tu plan" tone="warning" />}</CardContent></Card></div></div>;
}

function BusinessWizard({ rubros, planes, onClose, onCreate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nombre: "", rubroId: rubros[0].id, plan: "Básico", owner: "", vencimiento: "", whatsapp: "", instagram: "", logo: "", color: "Dorado" });
  const rubro = rubros.find((r) => r.id === form.rubroId) || rubros[0];
  function change(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }
  function create() { onCreate({ id: `EMP-${Date.now().toString().slice(-4)}`, nombre: form.nombre || "Nuevo emprendimiento", rubroId: rubro.id, rubro: rubro.nombre, plan: form.plan, estado: "Activo", vencimiento: form.vencimiento || new Date().toLocaleDateString("es-AR"), owner: form.owner || "Sin dueño", color: form.color, logo: form.logo || form.nombre.slice(0,2).toUpperCase(), whatsapp: form.whatsapp, instagram: form.instagram, modulos: rubro.modulos, soporteRemoto: { habilitado: false, vence: null } }); }
  return <ModalShell eyebrow="Alta guiada" title="Nuevo emprendimiento" onClose={onClose}><div className="p-5 space-y-5"><div className="grid grid-cols-4 gap-2">{["Datos", "Rubro", "Plan", "Confirmar"].map((s,i)=><div key={s} className={`rounded-xl px-3 py-2 text-xs font-bold text-center ${step===i+1?"bg-blue-500 text-black":"bg-slate-950 text-slate-100 border border-slate-800"}`}>{i+1}. {s}</div>)}</div>{step===1 && <div className="space-y-4"><InputField icon={<Building2 />} label="Nombre del emprendimiento" value={form.nombre} onChange={(e)=>change("nombre", e.target.value)} /><InputField icon={<Users />} label="Dueño / responsable" value={form.owner} onChange={(e)=>change("owner", e.target.value)} /><InputField icon={<Phone />} label="WhatsApp" value={form.whatsapp} onChange={(e)=>change("whatsapp", e.target.value)} /><InputField icon={<CalendarClock />} label="Vencimiento" type="date" value={form.vencimiento} onChange={(e)=>change("vencimiento", e.target.value)} /></div>}{step===2 && <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{rubros.map((r)=><button key={r.id} onClick={()=>change("rubroId", r.id)} className={`text-left rounded-2xl border p-4 ${form.rubroId===r.id?"border-blue-500 bg-blue-500/10":"border-slate-800 bg-slate-950"}`}><p className="font-bold text-white">{r.nombre}</p><p className="text-xs text-slate-200 mt-1">{r.ejemplos}</p></button>)}</div>}{step===3 && <div className="grid grid-cols-1 md:grid-cols-3 gap-3">{planes.map((p)=><button key={p.id} onClick={()=>change("plan", p.nombre)} className={`text-left rounded-2xl border p-4 ${form.plan===p.nombre?"border-blue-500 bg-blue-500/10":"border-slate-800 bg-slate-950"}`}><p className="font-bold text-white">{p.nombre}</p><p className="text-sky-300 text-2xl font-bold">{p.precio}</p><p className="text-xs text-slate-200 mt-2">{p.soporte}</p></button>)}</div>}{step===4 && <div className="grid grid-cols-1 md:grid-cols-2 gap-3"><InfoItem label="Nombre" value={form.nombre || "Pendiente"} /><InfoItem label="Rubro" value={rubro.nombre} /><InfoItem label="Plan" value={form.plan} highlight /><InfoItem label="Módulos" value={rubro.modulos.length} /><InfoItem label="Dueño" value={form.owner || "Pendiente"} /><InfoItem label="Soporte admin" value={planes.find(p=>p.nombre===form.plan)?.accesoAdmin ? "Disponible" : "No incluido"} /></div>}<div className="flex gap-3"><Button onClick={onClose} className="w-full bg-slate-800 text-white">Cancelar</Button>{step>1&&<Button onClick={()=>setStep(step-1)} className="w-full bg-slate-800 text-white">Atrás</Button>}{step<4?<Button onClick={()=>setStep(step+1)} className="w-full bg-blue-500 text-black">Siguiente</Button>:<Button onClick={create} className="w-full bg-blue-500 text-black">Crear</Button>}</div></div></ModalShell>;
}
function UsuarioModal({ emprendimientos, onClose, onCreate }) { const [f,setF]=useState({nombre:"", email:"", rol:"Dueño", emp: emprendimientos[0]?.id || "", password:"123456"}); function create(){onCreate({id:`USR-${Date.now().toString().slice(-4)}`, nombre:f.nombre||"Nuevo usuario", email:f.email, rol:f.rol, emprendimientoIds:[f.emp], estado:"Activo", password:f.password});} return <ModalShell eyebrow="Alta de usuario" title="Nuevo usuario" onClose={onClose}><div className="p-5 space-y-4"><InputField icon={<Users />} label="Nombre" value={f.nombre} onChange={(e)=>setF({...f,nombre:e.target.value})}/><InputField icon={<Globe />} label="Email" value={f.email} onChange={(e)=>setF({...f,email:e.target.value})}/><InputField icon={<KeyRound />} label="Contraseña temporal" value={f.password} onChange={(e)=>setF({...f,password:e.target.value})}/><SelectField label="Rol" value={f.rol} onChange={(e)=>setF({...f,rol:e.target.value})} options={["Dueño","Administrador","Operador","Vendedor"]}/><SelectField label="Emprendimiento" value={f.emp} onChange={(e)=>setF({...f,emp:e.target.value})} options={emprendimientos.map(e=>e.id)} labels={Object.fromEntries(emprendimientos.map(e=>[e.id, `${e.nombre} · ${e.id}`]))}/><div className="flex gap-3"><Button onClick={onClose} className="w-full bg-slate-800 text-white">Cancelar</Button><Button onClick={create} className="w-full bg-blue-500 text-black">Crear usuario</Button></div></div></ModalShell> }

function DataPage({ title, subtitle, headers, rows }) { return <div className="space-y-6"><PageHeader title={title} subtitle={subtitle} /><Card><CardContent className="p-5 overflow-x-auto"><table className="w-full text-sm"><TableHead headers={headers} /><tbody>{rows.map((row,i)=><tr key={i} className="border-b border-slate-800">{row.map((c,j)=><td key={j} className="py-4 pr-4 text-slate-100">{c}</td>)}</tr>)}</tbody></table></CardContent></Card></div> }
function PageHeader({ title, subtitle, buttonText, onButtonClick, secondaryButtonText, secondaryOnClick }) { return <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div><p className="text-sm text-sky-300 font-bold uppercase tracking-wide">C&R Emprende</p><h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1><p className="text-slate-200 mt-2">{subtitle}</p></div><div className="flex gap-2">{secondaryButtonText&&<Button onClick={secondaryOnClick} className="bg-slate-800 text-white">{secondaryButtonText}</Button>}{buttonText&&<Button onClick={onButtonClick} className="bg-blue-500 text-black"><Users className="w-4 h-4 mr-2" />{buttonText}</Button>}</div></div> }
function SidebarButton({ active, icon, label, onClick }) { return <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition ${active ? "bg-blue-500 text-black" : "text-slate-100 hover:bg-slate-900"}`}>{React.cloneElement(icon,{className:"w-5 h-5"})}{label}</button> }
function Card({ children, className="" }) { return <div className={`premium-card rounded-3xl ${className}`}>{children}</div> }
function CardContent({ children, className="" }) { return <div className={className}>{children}</div> }
function StatCard({ icon, label, value }) { return <Card><CardContent className="p-5 flex items-center justify-between"><div><p className="text-sky-300 text-sm font-bold uppercase tracking-wide">{label}</p><p className="text-3xl font-bold mt-1 text-white">{value}</p></div><div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-sky-300 flex items-center justify-center">{React.cloneElement(icon,{className:"w-6 h-6"})}</div></CardContent></Card> }
function InfoItem({ label, value, highlight }) { return <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 mt-3"><p className="text-xs text-sky-300 font-bold uppercase tracking-wide mb-1">{label}</p><p className={`font-bold ${highlight ? "text-sky-300" : "text-white"}`}>{value}</p></div> }
function ArchitectureRow({ icon, title, text }) { return <div className="flex gap-3 rounded-2xl bg-slate-950 border border-slate-800 p-3"><div className="text-sky-300 mt-0.5">{React.cloneElement(icon,{className:"w-5 h-5"})}</div><div><p className="font-bold text-white">{title}</p><p className="text-xs text-slate-100 mt-1">{text}</p></div></div> }
function InputField({ icon, label, ...props }) { return <div><label className="block text-sm text-sky-300 font-semibold mb-2">{label}</label><div className="relative"><div className="absolute left-3 top-3.5 text-slate-100">{icon ? React.cloneElement(icon,{className:"w-4 h-4"}) : null}</div><input {...props} className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-950 border border-slate-700 outline-none focus:border-sky-300" /></div></div> }
function SelectField({ label, options, labels={}, ...props }) { return <div><label className="block text-sm text-sky-300 font-semibold mb-2">{label}</label><select {...props} className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-3 outline-none focus:border-sky-300">{options.map(o=><option key={o} value={o}>{labels[o] || o}</option>)}</select></div> }
function TableHead({ headers }) { return <thead><tr className="text-left text-sky-300 border-b border-blue-500/20 bg-slate-950/60">{headers.map(h=><th key={h} className="py-3 pr-4">{h}</th>)}</tr></thead> }
function TableToolbar({ title, search, setSearch, placeholder }) { return <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5"><h2 className="text-xl font-bold text-white">{title}</h2><div className="relative"><Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-100" /><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={placeholder} className="pl-9 pr-3 py-3 rounded-xl bg-slate-950 border border-slate-700 outline-none focus:border-sky-300 text-sm" /></div></div> }
function Badge({ children }) { return <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-300 text-xs font-bold">{children}</span> }
function StatusBadge({ label, tone }) { const styles={success:"bg-emerald-400/15 text-emerald-300",danger:"bg-red-400/15 text-red-300",warning:"bg-blue-500/15 text-sky-300"}; return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[tone]||styles.warning}`}>{label}</span> }
function ModalShell({ eyebrow, title, onClose, children }) { return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"><div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-blue-500/30 shadow-2xl shadow-blue-600/10"><div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900 z-10"><div><p className="text-sm text-sky-300 font-bold uppercase tracking-wide">{eyebrow}</p><h2 className="text-2xl font-bold text-white">{title}</h2></div><Button onClick={onClose} className="bg-slate-800 text-white"><X className="w-4 h-4" /></Button></div>{children}</div></div> }
function Button({ children, className="", ...props }) { return <button {...props} className={`premium-button inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold transition duration-200 hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 ${className}`}>{children}</button> }
function money(n) { return `$${Number(n).toLocaleString("es-AR")}`; }

export default App;
