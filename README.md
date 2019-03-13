### ts-parcel-as-lib-builder

Demonstration for functionality of Parce to create js library

#### setup

```bash
yarn
```

#### demo

```bash
yarn build --global FOUR # build as `FOUR` into `dist` dir

# Launch Local Server at project root
# For exmaple,
# python -m http.server

```

Please note that `index.html` and `dist/index.js` are completely isolated from `src/` files, which are targetted by Parcel.
In `index.html`, you can use your code as `FOUR` in this case.
