import { useRef } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useHref, useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import './App.css'
import { RawNoteData, Tag, NoteData } from './App'
import React from 'react'
import { v4 as uuidV4 } from 'uuid'

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = '',
  markdown = '',
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)

  const [selectedTags, setSelectedTags] = React.useState<Tag[]>(tags)
  const navigate = useNavigate()
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })
    navigate('..')
  }

  return (
    <div style={{ padding: '0 140px' }}>
      <h1 style={{ margin: '0px auto', padding: ' 60px 0px' }}>New Note</h1>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId='title'>
                <Form.Label>Tilte</Form.Label>
                <Form.Control ref={titleRef} required defaultValue={title} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='tags'>
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  isMulti
                  onCreateOption={(label) => {
                    const newTag = { id: uuidV4(), label }
                    onAddTag(newTag)
                    setSelectedTags((prev) => [...prev, newTag])
                  }}
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
          <Form.Group controlId='markdown'>
            <Form.Label>Body</Form.Label>
            <Form.Control
              as='textarea'
              ref={markdownRef}
              required
              rows={8}
              defaultValue={markdown}
            />
          </Form.Group>
          <Stack direction='horizontal' gap={2} className='justify-content-end'>
            <Button type='submit' variant='primary'>
              Save
            </Button>
            <Link to='..'>
              <Button type='submit' variant='outline-secondary'>
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </div>
  )
}

export default NoteForm
function useState(): [any, any] {
  throw new Error('Function not implemented.')
}
