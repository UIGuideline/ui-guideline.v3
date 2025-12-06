# Flujo de Trabajo para Generación de Datos de Componentes

Este directorio contiene los prompts maestros ("Agentes") para ejecutar el pipeline de generación de datos de ui-guideline. Sigue este orden estrictamente para garantizar la consistencia.

## Paso 1: Extracción de Datos Crudos
**Prompt:** `1-extract-component-raw-data.md`
- **Entrada:** URL de la documentación de la librería UI y el slug del componente.
- **Acción:** Scrapea y estructura la información base (props y anatomía) de una librería específica.
- **Salida:** `packages/component-data/src/raw-data/components/[component]/[library].yml`

## Paso 2: Consolidación de Datos (The Gold Standard)
**Prompt:** `2-consolidate-component-data.md`
- **Entrada:** Nombre del componente (lee todos los archivos raw-data generados en el paso 1).
- **Acción:** Analiza las 10 librerías, aplica reglas de mayoría y valor, y genera una definición unificada del componente.
- **Salida:** `packages/component-data/src/consolidated-data/components/[component]/ui-guideline.yml`

## Paso 3: Anatomía de Código Comparativa
**Prompt:** `3-extract-code-anatomy-from-raw-data.md`
- **Entrada:** Nombre del componente (lee todos los raw-data).
- **Acción:** Extrae solamente los bloques de código `<code>` de cada librería para mostrar comparaciones lado a lado.
- **Salida:** `apps/web/src/content/components/[component]/code-anatomy.yml`

## Paso 4: Inyección de la Guía Oficial
**Prompt:** `4-inject-consolidated-code-anatomy-from-consolidated-data.md`
- **Entrada:** `ui-guideline.yml` (Consolidated Data) y `code-anatomy.yml`.
- **Acción:** Toma el bloque de código "oficial" consolidado y lo inserta como la primera entrada (`slug: ui-guideline`) en el archivo de anatomía.
- **Salida:** Actualiza `apps/web/src/content/components/[component]/code-anatomy.yml`

## Paso 5: Extracción de Props para Web
**Prompt:** `5-extract-props-from-consolidated-data.md`
- **Entrada:** `ui-guideline.yml`.
- **Acción:** Genera la tabla de props que se visualizará en la documentación web, parseando tipos y manteniendo descripciones.
- **Salida:** `apps/web/src/content/components/[component]/code-props.yml`

## Paso 6: Extracción de Props para Figma
**Prompt:** `6-extract-figma-props-from-consolidated-data.md`
- **Entrada:** `ui-guideline.yml`.
- **Acción:** Filtra props relevantes para diseño (`context: both/figma`) y traduce los tipos de código a tipos de Figma (Variant, Boolean, InstanceSwap).
- **Salida:** `apps/web/src/content/components/[component]/figma-props.yml`

## Paso 7: Generación de Anatomía Visual (Imagen)
**Prompt:** `7-generate-visual-anatomy.md`
- **Entrada:** `figma-props.yml` y Código de composición.
- **Acción:** Genera una ilustración técnica (imagen) mapeando las partes visuales del componente.
- **Salida:** Imagen (Artifact) o Definición de imagen.

## Paso 8: Generación de Design Layers (Estructura Figma)
**Prompt:** `8-create-design-layers.md`
- **Entrada:** `code-anatomy.yml` (estructura) y `figma-props.yml` (tipos).
- **Acción:** Crea un árbol jerárquico que simula el panel de "Layers" de Figma, describiendo cómo construir el componente visualmente.
- **Salida:** `apps/web/src/content/components/[component]/design-layers.yml`
