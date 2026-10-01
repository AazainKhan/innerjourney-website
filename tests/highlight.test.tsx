// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import HighlightedText from '@/components/HighlightedText'
import { joinHighlight, splitHighlight } from '@/lib/highlight'

describe('splitHighlight', () => {
  it('splits a trailing highlight', () => {
    expect(splitHighlight('Mindset Coaching that gets results', 'gets results')).toEqual({
      before: 'Mindset Coaching that ',
      highlight: 'gets results',
      after: '',
    })
  })

  it('splits a highlight in the middle', () => {
    expect(splitHighlight('Resources for Your Inner Journey today', 'Inner Journey')).toEqual({
      before: 'Resources for Your ',
      highlight: 'Inner Journey',
      after: ' today',
    })
  })

  it('uses the last occurrence of a repeated word', () => {
    const parts = splitHighlight('Coaching the coaching way', 'coaching')
    expect(parts.before).toBe('Coaching the ')
  })

  it('matches case-insensitively when there is no exact match', () => {
    expect(splitHighlight('Imagine…', 'imagine').highlight).toBe('Imagine')
  })

  it('renders plain text when the highlight is missing or not in the text', () => {
    expect(splitHighlight('Ready to find out?', '')).toEqual({ before: 'Ready to find out?', highlight: '', after: '' })
    expect(splitHighlight('Ready to find out?', 'nope').highlight).toBe('')
  })

  it('joins legacy prefix + highlight pairs with one space', () => {
    expect(joinHighlight('Clarity: your', 'missing piece')).toBe('Clarity: your missing piece')
    expect(joinHighlight('', 'Imagine')).toBe('Imagine')
  })
})

describe('<HighlightedText>', () => {
  it('colours only the highlighted words', () => {
    const { container } = render(
      <h2>
        <HighlightedText text="A Compassionate Coaching Experience" highlight="Experience" highlightClassName="text-carrot" />
      </h2>,
    )
    expect(container.textContent).toBe('A Compassionate Coaching Experience')
    expect(container.querySelector('span.text-carrot')?.textContent).toBe('Experience')
  })

  it('puts banner highlights on their own line', () => {
    const { container } = render(
      <p>
        <HighlightedText text="You're done — it's time." highlight="it's time." breakBefore />
      </p>,
    )
    expect(container.querySelector('br')).not.toBeNull()
    expect(container.textContent).toBe("You're done —it's time.")
  })
})
