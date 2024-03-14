# Solución al [Reto Tempopod de Web Reactiva](https://github.com/webreactiva-devs/reto-tempopod)

## Modo de empleo

```
node tempopod.js 45 https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/webreactiva.xml
```

### Feed vacío

```
node tempopod.js 45 https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/empty.xml 
```

### No hay episodios de esa duración

```
node tempopod.js 3 https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/webreactiva.xml
```

### Tag <itunes:duration> en formato MM:SS

```
node tempopod.js 45 https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/duration-in-minutes-and-seconds.xml
```

### Tag <itunes:duration> no existe

```
node tempopod.js 45 https://raw.githubusercontent.com/webreactiva-devs/reto-tempopod/main/feed/episodes-whithout-duration.xml
```

---

![DALL·E 2024-02-29 10 59 36 - Una escena de pixel art que muestre un podcast en grabación, con micrófonos, auriculares y una mesa  En la esquina superior derecha, un reloj grande m](https://github.com/webreactiva-devs/reto-tempopod/assets/1122071/74ada8c1-9793-4832-bc80-84815b5d5f55)