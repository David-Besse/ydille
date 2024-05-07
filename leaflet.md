# Using Leaflet (v1.9.4) in Next.js (v14.1) with React-Lealfet (v4.2.1)

Solution found on Stackoverflow :

[Leaflet](https://stackoverflow.com/questions/77978480/react-leaflet-4-with-nextjs-14-working-setup)

and here on Medium:

[Leaflet](https://andresprieto-25116.medium.com/how-to-use-react-leaflet-in-nextjs-with-typescript-surviving-it-21a3379d4d18)

## For typescript user:

- Create a new directory in nodes_modules/@types
  
- Name it "leaflet-defaulticon-compatibility".

- Create a new file named "index.d.ts".

Add this line :

```text
declare module 'leaflet-defaulticon-compatibility';
```

Now you can import without errors in your file.tsx :

```ts
import "leaflet-defaulticon-compatibility";
```
