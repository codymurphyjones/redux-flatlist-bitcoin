# redux-flatlist-bitcoin project
A project created by Cody Jones for Pei, Inc Job Interview Process
## Getting Started 

If you want to check the app out prior to loading it and running it on your system, there is a web app version located at [BTC Currency Conversion App](https://btcconversionapp-pei.now.sh/)

It is a simple to use app.  You have your watcher area at the bottom, you can add currencies to your watcher list to scroll through them at your will.  

Your selected currency is visible at the top, the default starting currency is BTC

In order to select a new currency, click the search icon on the right side and type, the auto complete guide will help you select your next  currency.

In order to add a currency to your watch list, simply click the + sign on the left side.  It will add the currently selected currency to your watchers.



```sh
$ cd expo-project-template
$ npm install
$ npm start
```

This will kick off the react-native metro server and enable expo to connect to test the app.

Additionally

```sh
npm start:web
```

Will run the web version of this project.


Do not forget to login to expo so that you can see the app on your project dashboard on the mobile app.

```sh
expo login -u username -p password
```

### Global Directories
- `Components`: `./src/components`,
- `Screens`: `./src/screens`,
- `Features`: `./src/features`,
- `Utils`: `./src/utils`,

All global directories start with a Capital letter contrasting popular folder naming techniques in order to differentiate that they are an absolute value.  Each global directory has a specific purpose.

#### Features
Enables you to seperate individual features into their own folders in order seperate unrelated code from each other.  Features will typically be utilized by `Screens` in order to render your apps functionality.  I chose to develop this way because I believe that feature focussed development is the most efficient and logical way to structure an app.

#### Components
`Components` is the directory used to manage stateless/prop driven Components that will be utilized by the other areas of the app.  Whether importing from `Features`, `Screens`, and possibly even `Components` itself, this directory will help you keep the working paths short and concise when reading through the code.

#### Utils
`Utils` is the focus to add functions that your app utilizes that does not relate directly to the UI or render,or state management.  Whether its calculating an equation or requesting data from an API, seperating your data fetching into its own section has proven to help isolate issues in my experience.


##### Events

All ASYNC events are combined with their non-ASYNC equivalent to set up the watchers and effects for redux saga.  The other two are actions for my reducer that did not specifically require asynchronous flow.

ASYNC_LOAD_CURRENCIES
LOAD_CURRENCIES

ADD_WATCHER
ASYNC_ADD_WATCHER

GET_CURRENCY_PRICE
ASYNC_GET_CURRENCY_PRICE


SELECT_CURRENCY
REMOVE_WATCHER
