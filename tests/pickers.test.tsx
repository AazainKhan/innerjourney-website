// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { EmojiPicker, GradientPicker, IconPicker, TonePicker } from '@/tina/fields/pickers'
import { LibraryList, editHref, newHref } from '@/tina/fields/LibraryManager'

vi.mock('tinacms', () => ({ useCMS: () => ({ api: {} }) }))

afterEach(cleanup)

describe('IconPicker', () => {
  it('shows the current icon by name and picks a new one', () => {
    const onChange = vi.fn()
    render(<IconPicker value="fa-brain" onChange={onChange} />)
    expect(screen.getByText('Brain / mind')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Change icon' }))
    fireEvent.click(screen.getByRole('option', { name: 'Seedling / growth' }))
    expect(onChange).toHaveBeenCalledWith('fa-seedling')
  })

  it('filters by search and can limit categories', () => {
    render(<IconPicker value="" onChange={() => {}} categories={['Social']} />)
    expect(screen.queryByRole('option', { name: 'Brain / mind' })).toBeNull()
    fireEvent.change(screen.getByLabelText('Search icons'), { target: { value: 'insta' } })
    expect(screen.getAllByRole('option').map((o) => o.getAttribute('aria-label'))).toEqual(['Instagram'])
  })

  it('can remove the icon', () => {
    const onChange = vi.fn()
    render(<IconPicker value="fa-star" onChange={onChange} defaultOpen />)
    fireEvent.click(screen.getByRole('button', { name: 'Remove icon' }))
    expect(onChange).toHaveBeenCalledWith('')
  })
})

describe('TonePicker', () => {
  it('offers the given tones with swatches from the palette and marks the current one', () => {
    const onChange = vi.fn()
    render(<TonePicker value="border-azure" onChange={onChange} tones={['primary', 'accent']} palette={{ primaryColor: '#f00', accentColor: '#00f' }} />)
    const radios = screen.getAllByRole('radio')
    expect(radios.map((r) => r.getAttribute('aria-checked'))).toEqual(['false', 'true'])
    fireEvent.click(radios[0])
    expect(onChange).toHaveBeenCalledWith('primary')
  })
})

describe('GradientPicker', () => {
  it('picks a preset by name', () => {
    const onChange = vi.fn()
    render(<GradientPicker value="from-blue-500 to-blue-600" onChange={onChange} />)
    expect(screen.getByRole('radio', { name: 'Blue' }).getAttribute('aria-checked')).toBe('true')
    fireEvent.click(screen.getByRole('radio', { name: 'Purple' }))
    expect(onChange).toHaveBeenCalledWith('purple')
  })
})

describe('EmojiPicker', () => {
  it('picks from the grid or takes a typed emoji', () => {
    const onChange = vi.fn()
    render(<EmojiPicker value="" onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Use 🌱' }))
    expect(onChange).toHaveBeenLastCalledWith('🌱')
    fireEvent.change(screen.getByLabelText(/type \/ paste any emoji/i), { target: { value: '🦄' } })
    expect(onChange).toHaveBeenLastCalledWith('🦄')
  })
})

describe('LibraryList', () => {
  it('lists newest first with Featured and status badges and edit links', () => {
    render(
      <LibraryList
        kind="post"
        items={[
          { title: 'Old', filename: 'old', publishedAt: '2020-01-01', status: 'Published' },
          { title: 'New', filename: 'new', publishedAt: '2025-01-01', status: 'Draft', featured: true },
        ]}
      />,
    )
    const edits = screen.getAllByRole('link', { name: 'Edit' })
    expect(edits.map((a) => a.getAttribute('href'))).toEqual(['#/~/blog/new', '#/~/blog/old'])
    expect(screen.getByText('★ Featured')).toBeTruthy()
    expect(screen.getByText('Draft')).toBeTruthy()
    expect(screen.getByRole('link', { name: /New blog post/ }).getAttribute('href')).toBe('#/collections/new/post')
  })

  it('opens episodes on the Resources preview', () => {
    expect(editHref('podcast', 'ep-1')).toBe('#/~/preview/podcasts/ep-1.md')
    expect(newHref('podcast')).toBe('#/collections/new/podcast')
  })
})
