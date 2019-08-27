import LearningReact from '../images/learningReact.jpg';
import LearningReactNative from '../images/learningReactNative.jpg';
import ReactUpAndLearning from '../images/reactUpAndLearning.jpg';

export type TBook = {
  bookId: number,
  title: string,
  price: number,
  img: string
}

export default [
  {
    bookId: 1,
    img: LearningReact,
    title: 'learning React',
    price: 10000
  },
  {
    bookId: 2,
    img: LearningReactNative,
    title: 'learning React Native',
    price: 20000
  },
  {
    bookId: 3,
    img: ReactUpAndLearning,
    title: 'React up and learning',
    price: 25000
  }
] as TBook[]
