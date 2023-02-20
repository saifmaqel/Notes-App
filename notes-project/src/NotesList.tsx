import ReactSelect from 'react-select'
import styles from './NoteList.module.css'
import { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from 'react-bootstrap'
import { Link, useHref, useNavigate } from 'react-router-dom'
import './App.css'
import { RawNoteData, Tag, NoteData, Note } from './App'
import React from 'react'
import { v4 as uuidV4 } from 'uuid'
type NoteListProp = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
}
type SimplifiedNote = {
  id: string
  title: string
  tags: Tag[]
}
export function NotesList({ availableTags, notes }: NoteListProp) {
  console.log('notes', notes)

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])
  return (
    <div style={{ padding: ' 50px 100px', margin: '0 auto' }}>
      <Row style={{ margin: '0px auto 100px auto' }}>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal' style={{ alignContent: 'end' }}>
            <Link to='/new'>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button variant='outline-secondary'>Edit</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Tilte</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                onChange={(tags) => {
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.id }
                  })
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, id: tag.id }
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, id: tag.id }
                })}
              />
            </Form.Group>
          </Col>{' '}
        </Row>
      </Form>
      <div>
        <Row
          xs={1}
          sm={2}
          lg={3}
          xl={4}
          className='g-3'
          style={{ margin: '40px auto' }}
        >
          {filteredNotes.map((note) => (
            <Col>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  console.log('tags', tags)

  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset ${styles.card}`}>
      <Card.Body style={{}}>
        <Stack
          gap={2}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '15vh',
          }}
        >
          <Card.Title>{title}</Card.Title>

          {tags.length > 0 && (
            <Stack
              gap={1}
              direction='horizontal'
              style={{ justifyContent: 'center', flexWrap: 'wrap' }}
            >
              {tags.map((tag) => {
                return <Badge key={tag.id}>{tag.label}</Badge>
              })}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}
