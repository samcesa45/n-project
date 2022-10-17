import reverseStr from '../utils/for_testing'

const reverse = reverseStr.reverseStr

test('reverse of a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})


test('reverse of react', () => {
  const result = reverse('react')

  expect(result).toBe('tcaer')
})

test('reverse of reveler', () => {
  const result = reverse('releveler')

  expect(result).toBe('releveler')
})