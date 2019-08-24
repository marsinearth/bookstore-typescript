import React from 'react';
import { Container, Card, Header } from 'semantic-ui-react';
import Book from '../components/book';
import LearningReact from '../assets/images/learningReact.jpg';
import LearningReactNative from '../assets/images/learningReactNative.jpg';
import ReactUpAndLearning from '../assets/images/reactUpandLearning.jpg';

type TBook = {
  title: string,
  img: string
}

const bookList: TBook[] = [
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
    <Container fluid>
      <Header as='h1'>Book Store</Header>
      <p>샘플 북스토어</p>
      <Card.Group stackable>
        {bookList.map(({ title, img }) => (
          <Book
            key={title}
            title={title}
            img={img}
          />
        ))}
      </Card.Group>
    </Container>
  );
}