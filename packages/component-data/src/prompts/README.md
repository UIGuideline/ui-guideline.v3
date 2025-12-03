Paso 1:

- 1-extract-component-raw-data.md
  Pasandole la URL de la libreria UI, y pansandole el slug del componente, este te extrae la data
  del componente desde la URL.

Paso 2:

- 2-consolidate-component-data.md
  Cuando ya tengas toda la raw data de cada UI Library, ya puedes correr este prompt,
  solo le pasas el slug del componente, y el termina generando el archivo ui-guideline.yml
  que es la data consolidada del componente.

Paso 3:

- 3-extract-code-anatomy-from-raw-data.md
  Pasandole el slug del componente, este tomara todos los bloques "code" de cada raw data y generara un archivo code-anatomy.yml

Paso 4:

- 4-extract-props-from-consolidated-data.md
  Pasandole el slug del componente, este extraera todas las props del componente padre y
  de sus hijos, y creara un archivo props.yml
