/**
 * Tina field components. Each wraps a plain picker (./pickers) with
 * wrapFieldsWithMeta so the field keeps Tina's label + description.
 */
import React from 'react'
import { wrapFieldsWithMeta, type TinaField } from 'tinacms'
import { EmojiPicker, GradientPicker, IconPicker, TonePicker } from './pickers'
import { LibraryManager, type LibraryKind } from './LibraryManager'
import type { IconCategory } from '../../lib/icons'
import type { Tone } from '../../lib/design-tokens'

interface Input {
  input: { value: string; onChange: (value: string) => void }
}

/**
 * The `ui.component` type a string field accepts. wrapFieldsWithMeta's return
 * type is looser than the schema's (it also expects `form`, which Tina passes
 * at runtime), so every wrapped component is cast to this once, here.
 */
type AnyStringComponent = NonNullable<Extract<TinaField, { type: 'string' }>['ui']>['component']
/** The single-value (non-list) variant: its input.value is a string, not string[]. */
type SingleValue<T> = T extends (props: infer P) => unknown ? (P extends { input: { value: string } } ? T : never) : never
type StringFieldComponent = SingleValue<AnyStringComponent>
const asField = (c: unknown) => c as StringFieldComponent

export function iconPickerField(categories?: IconCategory[]) {
  return asField(wrapFieldsWithMeta<object, object>(({ input }) => {
    const { value, onChange } = (input as unknown as Input['input'])
    return <IconPicker value={value || ''} onChange={onChange} categories={categories} />
  }))
}

export function tonePickerField(tones: Tone[]) {
  return asField(wrapFieldsWithMeta<object, object>(({ input }) => {
    const { value, onChange } = (input as unknown as Input['input'])
    return <TonePicker value={value || ''} onChange={onChange} tones={tones} />
  }))
}

export const GradientPickerField = asField(wrapFieldsWithMeta<object, object>(({ input }) => {
  const { value, onChange } = (input as unknown as Input['input'])
  return <GradientPicker value={value || ''} onChange={onChange} />
}))

export const EmojiPickerField = asField(wrapFieldsWithMeta<object, object>(({ input }) => {
  const { value, onChange } = (input as unknown as Input['input'])
  return <EmojiPicker value={value || ''} onChange={onChange} />
}))

export function libraryManagerField(kind: LibraryKind) {
  return asField(wrapFieldsWithMeta<object, object>(() => <LibraryManager kind={kind} />))
}
