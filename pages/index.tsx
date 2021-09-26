import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import Button from '../components/Button'
import { Field, Form } from '../components/Form'

export default function Home() {
  const { loading, error, data } = useQuery(gql`
    query PatternsQuery {
      patterns {
        id
        name
        score
        instrument
      }
    }
  `)

  if (error) return error.message
  if (loading) return 'loading'

  const handleSubmit = () => {}

  return (
    <div className="p-5">
      {data?.patterns.map((p: any) => (
        <div key={p.id} className="border border-gray p-4 bg-gray-100 my-3">
          {p.name}: {p.score}
        </div>
      ))}

      <Form
        initialValues={{ pattern: '' }}
        onSubmit={handleSubmit}
        className="border shadow-lg p-5"
      >
        {() => (
          <>
            <Field type="text" placeholder="Enter here" name="name" inline />
            <Field type="text" placeholder="Enter here" name="score" inline />
            <Button className="ml-1">Submit</Button>
          </>
        )}
      </Form>
    </div>
  )
}
