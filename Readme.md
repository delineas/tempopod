# Solución al [Reto Tempopod de Web Reactiva](https://github.com/webreactiva-devs/reto-tempopod)

> Comento las decisiones de diseño y código tomadas [aquí](https://github.com/delineas/tempopod/issues/1).

## Instalación

- Clonar el repostiorio
- `npm install`

## Modo de empleo

```
node main.js 45 https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/webreactiva.xml
```

### Feed vacío

```
node main.js 45 https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/empty.xml 
```

### No hay episodios de esa duración

```
node main.js 3 https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/webreactiva.xml
```

### Tag <itunes:duration> en formato MM:SS

```
node main.js 45 https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/duration-in-minutes-and-seconds.xml
```

### Tag <itunes:duration> no existe

```
node main.js 45 https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/episodes-whithout-duration.xml
```

## Tests

`npm run test`

Code Coverage: `npx vitest run --coverage`


---

![DALL·E 2024-02-29 10 59 36 - Una escena de pixel art que muestre un podcast en grabación, con micrófonos, auriculares y una mesa  En la esquina superior derecha, un reloj grande m](https://github.com/webreactiva-devs/reto-tempopod/assets/1122071/74ada8c1-9793-4832-bc80-84815b5d5f55)
