import LearningReact from '../images/learningReact.jpg'
import LearningReactNative from '../images/learningReactNative.jpg'
import ReactUpAndLearning from '../images/reactUpAndLearning.jpg'

export type TBook = {
  isbn: string
  title: string
  price: number
  img: string
  author?: string
  publisher?: string
  release?: string
  description?: string
}

export default [
  {
    isbn: '9781491954614',
    img: LearningReact,
    title: 'Learning React',
    author: 'Eve Porcello, Alex Banks',
    publisher: "O'Reilly Media, Inc.",
    release: 'May 2017',
    description:
      'If you want to learn how to build efficient user interfaces with React, this is your book. Authors Alex Banks and Eve Porcello show you how to create UIs with this small JavaScript library that can deftly display data changes on large-scale, data-driven websites without page reloads. Along the way, you’ll learn how to work with functional programming and the latest ECMAScript features.\r\nDeveloped by Facebook, and used by companies including Netflix, Walmart, and The New York Times for large parts of their web interfaces, React is quickly growing in use. By learning how to build React components with this hands-on guide, you’ll fully understand how useful React can be in your organization.\r\n',
    price: 10000,
  },
  {
    isbn: '9781491929049',
    img: LearningReactNative,
    title: 'Learning React Native',
    author: 'Bonnie Eisenman',
    publisher: "O'Reilly Media, Inc.",
    release: 'November 2017',
    description:
      'Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that render natively. The second edition of this hands-on guide shows you how to build applications that target iOS, Android, and other mobile platforms instead of browsers—apps that can access platform features such as the camera, user location, and local storage.\r\nThrough code examples and step-by-step instructions, web developers and frontend engineers familiar with React will learn how to build and style interfaces, use mobile components, and debug and deploy apps. You’ll learn how to extend React Native using third-party libraries or your own Java and Objective-C libraries.\r\n',
    price: 20000,
  },
  {
    isbn: '9781491931820',
    img: ReactUpAndLearning,
    title: 'React: Up & Learning',
    author: 'Stoyan Stefanov',
    publisher: "O'Reilly Media, Inc.",
    release: 'July 2016',
    description:
      'Hit the ground running with React, the open-source technology from Facebook for building rich web applications fast. With this practical guide, Yahoo! web developer Stoyan Stefanov teaches you how to build components—React’s basic building blocks—and organize them into maintainable, large-scale apps. If you’re familiar with basic JavaScript syntax, you’re ready to get started.\r\nOnce you understand how React works, you’ll build a complete custom Whinepad app that helps users rate wines and keep notes. You’ll quickly learn why some developers consider React the key to the web app development puzzle.\r\n',
    price: 25000,
  },
] as TBook[]
