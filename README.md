# En Ruta

> **Tus envíos, siempre en ruta.**
> Sitio web de En Ruta, plataforma boliviana de envíos interdepartamentales con seguimiento.

Landing de producto hecha con **Vite + React**. Sin librerías de animación ni de mapas: todo el movimiento es CSS, SVG nativo (`animateMotion`) e `IntersectionObserver`. El bundle completo pesa ~80 kB gzip.

## Inicio rápido

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # genera dist/
pnpm preview    # sirve dist/ localmente
```

Requiere Node 20+ y pnpm.

## Qué incluye

| Sección | Detalle |
|---|---|
| Navbar | Se vuelve sólida con el scroll, menú hamburguesa en móvil y CTA siempre visible |
| Hero | Mapa de Bolivia con ruta, vehículo en movimiento y tarjeta de tracking con parallax al cursor |
| Problema | Escena ilustrada y transición hacia “En Ruta cambia eso” |
| Cómo funciona | 4 pasos unidos por una línea de recorrido que se dibuja |
| Seguimiento | Buscador (código demo `ENR-28491`). En pantallas grandes la sección se fija y **al hacer scroll avanza el envío** (camión, línea de tiempo y estado) |
| Personas / Negocios / Red / Transportistas | Mockups hechos en HTML/CSS |
| Validación | Contadores con count-up y testimonio |
| Cobertura | Mapa de Bolivia por departamentos, con Cochabamba como origen |
| CTA final + Footer | Fondo oscuro con ruta atravesando la sección |

Transiciones globales: escenas con vehículos guiadas por el scroll (`Rides.jsx`, `Vehicles.jsx`): furgoneta en el hero, moto, auto, bus y furgoneta final,  pantalla de entrada, barra de progreso de scroll, revelado palabra por palabra en títulos, desenfoque → nitidez al entrar, secciones oscuras que se deslizan sobre la anterior, brillo en botones y `prefers-reduced-motion` respetado.

## Estructura

```
src/
├─ App.jsx          # composición de secciones, intro, progreso de scroll, parallax (--sy)
├─ sections.jsx     # todas las secciones de la página
├─ BoliviaMap.jsx   # mapa SVG: departamentos, ciudades, rutas y vehículos
├─ boliviaGeo.js    # límites departamentales ya simplificados y proyectados
├─ Rides.jsx        # escenas de scroll: HeroVan, Rider (sigue una ruta SVG), StepsLine
├─ Vehicles.jsx     # furgoneta, moto, auto y bus en SVG con ruedas que giran
├─ ui.jsx           # Reveal, Words, Count, Icon, Logo, useInView
└─ index.css        # estilos y animaciones (variables en :root)
public/logo.png     # logotipo (fondo transparente)
```

## Personalizar

- **Colores y radios:** variables en `:root` de `src/index.css` (`--o` es el naranja de marca).
- **Textos:** están en `src/sections.jsx`, uno por componente.
- **Mapa:** `BoliviaMap` recibe `routes`, `solid` (ruta activa), `cities`, `progress` (0–1, deja el vehículo detenido en ese punto) y `view` (viewBox para hacer zoom). Para agregar una ciudad, añádela a `CITIES` con su `[lon, lat]`.
- **Proyección:** `proj()` en `BoliviaMap.jsx` debe coincidir con la usada al generar `boliviaGeo.js`:
  `x = (lon + 69.7) × 31.7`, `y = (−9.6 − lat) × 33`.
- **Datos del mapa:** [geoBoundaries](https://www.geoboundaries.org) ADM1 de Bolivia (dominio público), simplificados con Ramer–Douglas–Peucker.

## Pendiente

- El formulario “Enviar un paquete” es un modal **sin backend** (solo muestra confirmación). Conectarlo a una API o a WhatsApp Business.
- “Iniciar sesión” y redes sociales apuntan a `#`.
- La tabla de pedidos, los horarios y el código `ENR-28491` son datos de muestra.
- Sustituir las ilustraciones por fotografías reales de Bolivia y transporte.

© 2026 En Ruta. Todos los derechos reservados.
