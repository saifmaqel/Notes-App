import { Button, Col, Row, Stack } from 'react-bootstrap'
import { useNote } from './NoteLayout'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
type NoteProps = {
  deleteNote: (id: string) => void
}
export function Note({ deleteNote }: NoteProps) {
  const note = useNote()
  const navigate = useNavigate()
  return (
    <>
      <Row style={{ alignItems: 'center', padding: '50px 0' }}>
        <Col>
          <h1>{note.title}</h1>
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal' style={{ alignContent: 'end' }}>
            <Link to={`/${note.id}/edit`}>
              <Button variant='primary'>Edit</Button>
            </Link>
            <Button
              variant='outline-danger'
              onClick={() => {
                console.log('saif')

                deleteNote(note.id)
                navigate('/')
              }}
            >
              Delete
            </Button>
            <Link to={`/`}>
              <Button variant='outline-secondary'>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  )
}
