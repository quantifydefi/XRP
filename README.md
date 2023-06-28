# EVM-FINANCE-UI Server

## Project Description
EVM-FINANCE-UI Server contains variety of components, pages, layouts, plugins, etc using Nuxt JS and Vue Frameworks.
It provides a structured approach to developing Vue applications and comes with a set of built-in features and conventions that make development efficient and enjoyable. 
Here are the key components of a EVM-FINANCE-UI  project:
1. Pages: EVM-FINANCE-UI  follows a file-based routing approach, where each Vue component file in the pages directory corresponds to a route in your application. These components define the layout and content of each page in your application.
2. Layouts: Layouts are reusable Vue components that define the overall structure of your application's pages. You can have multiple layouts, and each page can specify which layout it should use. Layouts allow you to define common elements like headers, footers, or sidebars that should be present across multiple pages.
3. Components: Supports the use of reusable components, just like regular Vue.js projects. You can create components in the components directory and use them in your pages or layouts to encapsulate and reuse UI elements or functionality.
4. Plugins: Allow you to extend the functionality of your application. They can be used to integrate third-party libraries, add global functionality, or set up custom configurations. Plugins are defined in the plugins directory and can be easily included in your Nuxt.js project.
5. Store: Includes Vuex, a state management pattern and library for Vue.js applications. The store directory allows you to define Vuex modules to manage and share data across your application. It provides a centralized store that can be accessed from any component or page.
6. Configuration: The project includes a nuxt.config.js file where you can configure various aspects of your application. This file allows you to customize build settings, define environment variables, configure modules, and set up other project-specific options.

These components work together to provide a structured and efficient development experience in EVM-FINANCE-UI. By leveraging its conventions and built-in features, you can quickly build powerful Vue.js applications with server-side rendering and static generation capabilities.

## XRP Components functionality and description

**XRP Explorer** component located at ```pages/xrp-explorer/index.vue``` its a very simple Vue component that has a child component **XRPGrid**  ```/components/XRPGrid.vue```

**XRPGrid** component renders grid and includes logic for all data manipulation. It uses composable ```composables/useXrpScrerener.ts```  that responsible  for fetching live data from  ``` https://staging-graph.evmx.io``` graphQL server.
It Starts by fetching data from GraphQL server using ```useQuery``` composable from ``` nuxt/applollo``` module for graphQL

``` javascript
 const { onResult } = useQuery(BlocksXrpGQL, () => ({ network: 'ripple' }), {
    fetchPolicy: 'no-cache',
    pollInterval: 60000,
  })

  onResult((queryResult) => {
    blocks.value = queryResult.data?.blocks ?? []
    loading.value = queryResult.loading
    currentTime.value = new Date().getTime() / 1000
  })
```
Also Listening to a new XRP ledgers using websocket and updating ledgers (blocks)

```javascript
 const { result: liveBlock } = useSubscription(BlocksStreamGQL, () => ({ network: 'ripple' }), {
    fetchPolicy: 'no-cache',
  })

watch(liveBlock, (val: any) => {
  const newData: BlockObserver[] = val?.block ?? []
  addNewRecords(newData)
})
```

**XRP Ledger Summary** component located at ```pages/xrp-explorer/ledger/_id.vue```. It displays basic ledger and each transaction  information 
This component starts with fetching Ledger data for single ledger from back end server

```javascript
const route = useRoute()
const ledgerIndex = computed(() => route.value.params?.id ?? 0)
const {result} = useQuery(BlockGQL, () => ({network: 'ripple', blockNumber: ledgerIndex.value}), {
    fetchPolicy: 'no-cache',
})
```

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn run start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
