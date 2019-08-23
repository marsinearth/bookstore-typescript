import React from 'react';
import Book from '../components/book';
import LearningReact from '../assets/images/learningReact.jpg';
import LearningReactNative from '../assets/images/learningReactNative.jpg';
import ReactUpAndLearning from '../assets/images/reactUpandLearning.jpg';

const bookList = [
  {
    title: 'learning React',
    img: LearningReact
  },
  {
    title: 'learning React Native',
    img: LearningReactNative
  },
  {
    title: 'React up and learning',
    img: ReactUpAndLearning
  }
];

export default function Home() {
  return (
    <div className="App">
      <h1>Book Store</h1>
      <section style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <p>샘플 북스토어</p>
        <div className="booklist">
          {bookList.map(({ title, img }) => (
            <Book
              key={title}
              title={title}
              img={img}
            />
          ))}
        </div>
      </section>
    </div>
  );
}