# expo-project-template
A template for 3-in-one Web, iOS, Android app development via Expo.
@babel/helper-create-regexp-features-plugin
rxjs
## Getting Started

```sh
$ cd expo-project-template
$ npm install
$ npm start
```

This will kick off the react-native metro server and initiate expo to launch a webserver.  You can also access the app via the Expo app on your mobile device.

```sh
expo login -u username -p password
```

### Global Directories
- `Components`: `./src/components`,
- `Screens`: `./src/screens`,
- `Features`: `./src/features`,
- `Utils`: `./src/utils`,
- `With`: `./src/with`

All global directories start with a Capital letter contrasting popular folder naming techniques in order to differentiate that they are an absolute value.  Each global directory has a specific purpose.

#### Features
Enables you to seperate individual features into their own folders in order seperate unrelated code from each other.  Features will typically be utilized by `Screens` in order to render your apps functionality.  I chose to develop this way because I believe that feature focussed development is the most efficient and logical way to structure an app.

#### Screens
Is a folder utilized to seperate the views of your app from each other and to give you the capability to build each screen a user may interact with independently. String together a combination of `Features` and `Components` in order to render beautiful UI's for your user.

#### Components
`Components` is the directory used to manage stateless/prop driven Components that will be utilized by the other areas of your app.  Whether importing from `Features`, `Screens`, and possible even `Components` itself, this directory will help you keep your working paths short and concise when reading through your code.

#### Utils
`Utils` is the focus to add functions that your app utilizes that does not relate directly to the UI or render.  Whether its calculating an equation or requesting data from an API, seperating your data fetching into its own section has proven to help isolate issues in my experience.

#### With
`With` is a folder exlusively for Higher Order Components. I get a lot of use out of HOC while developing in React Native, I have even included 3 that I use in almost all of my apps `withTheme`, `withUser` & `withPlaceholder`

Feel free to raise issues and provide feedback, if you have any questions message me directly on reddit https://www.reddit.com/u/mager1794