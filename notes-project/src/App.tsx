import { useMemo, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container'
import { NewNote } from './NewNote'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidV4 } from 'uuid'
import { NotesList } from './NotesList'
import { NoteLayout } from './NoteLayout'
import { Note } from './Note'
import { EditNote } from './EditNote'
export type Note = {
  id: string
} & NoteData

type RawNote = {
  id: string
} & RawNoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}
export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}
export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: note.tagIds.filter((tag) => note.tagIds.includes(tag)),
      }
    })
  }, [notes, tags])

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ]
    })
  }
  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagsIds: tags.map((tag) => tag.id),
          }
        }
        return note
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id)
    })
  }
  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag])
  }
  return (
    <div style={{ backgroundColor: '#f6f6f6' }}>
      <Container
        style={{
          margin: '0px auto',
          width: '80vw',
          height: '100vh',
        }}
      >
        <Routes>
          <Route
            path='/'
            element={<NotesList notes={notesWithTags} availableTags={tags} />}
          />
          <Route
            path='/new'
            element={
              <NewNote
                onSubmit={onCreateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
          <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
            <Route index element={<Note deleteNote={onDeleteNote} />}></Route>
            <Route
              path='/:id/edit'
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                  onAddTag={addTag}
                  availableTags={tags}
                />
              }
            ></Route>
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
