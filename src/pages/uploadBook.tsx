import API, { graphqlOperation } from '@aws-amplify/api';
import { Controller, useForm } from 'react-hook-form';
import { Form, Grid, Segment } from 'semantic-ui-react';
import React, { memo, useState } from 'react';

import { Book } from '../reduxSlices/bookSlice';
import { S3Image } from 'aws-amplify-react';
import awsConfig from '../aws-exports';
import { createBook } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = awsConfig;

const bookFormList = [
  {
    label: 'isbn',
    type: 'text',
  },
  {
    label: 'title',
    type: 'text',
  },
  {
    label: 'price',
    type: 'number',
  },
  {
    label: 'author',
    type: 'text',
  },
  {
    label: 'publisher',
    type: 'text',
  },
  {
    label: 'release',
    type: 'text',
  },
  {
    label: 'description',
    type: 'text',
  },
];

async function fetchCreateBook(key: string, formValues: Record<string, Book>) {
  const fileForUpload = {
    bucket,
    key,
    region,
  };
  if (Object.keys(formValues).length) {
    console.log(formValues);
    const createBookInput = {
      ...formValues,
      img: fileForUpload,
    };

    try {
      await API.graphql(
        graphqlOperation(createBook, { input: createBookInput }),
      );
      console.log('createBook successful!');
    } catch (err) {
      console.error('createBook err', err);
    }
  }
}

function fileToKey(data: File, formValues: Record<string, Book>) {
  const { name } = data;
  const key = `${uuidv4()}${name}`;
  fetchCreateBook(key, formValues);
  return key;
}

const UploadBook = () => {
  const [formValues, setFormValues] = useState<Record<string, Book>>();
  const { control, handleSubmit, reset } = useForm();
  const onSubmit = (data: Record<string, Book>) => {
    console.log(data);
    setFormValues(data);
    reset();
  };
  return (
    <Segment textAlign="center" raised>
      <Grid centered padded columns="one">
        <Grid.Column>
          {!!formValues && (
            <S3Image
              picker
              fileToKey={(file: File) => fileToKey(file, formValues)}
            />
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            {bookFormList.map(bookForm => (
              <Controller
                key={bookForm.label}
                as={Form.Input}
                {...bookForm}
                name={bookForm.label}
                control={control}
              />
            ))}
            <Form.Button type="submit">Submit</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default memo(UploadBook);
