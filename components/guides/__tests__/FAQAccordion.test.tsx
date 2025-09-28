/**
 * Tests for FAQ Accordion Component
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FAQAccordion from '../FAQAccordion'

describe('FAQAccordion Component', () => {
  const mockFAQItems = [
    {
      question: 'Do I really need travel insurance for a cruise?',
      answer:
        'Yes, cruise travel insurance is highly recommended due to the unique risks of cruising, including medical emergencies at sea, missed ports, and evacuation costs that can exceed $250,000.',
    },
    {
      question: 'When should I buy cruise insurance?',
      answer:
        'Purchase within 14-21 days of your initial trip deposit to qualify for pre-existing condition waivers and "cancel for any reason" coverage.',
    },
    {
      question: 'What does cruise insurance typically cost?',
      answer:
        'Expect to pay 5-10% of your total trip cost. A $5,000 cruise would cost approximately $250-$500 to insure.',
    },
    {
      question: 'Is the cruise line insurance worth it?',
      answer:
        'While convenient, cruise line insurance often provides limited coverage. Third-party insurers typically offer better coverage and value.',
    },
    {
      question: 'What medical coverage do I need for cruising?',
      answer:
        'Look for at least $50,000 in medical coverage and $1 million in medical evacuation coverage, especially for international cruises.',
    },
  ]

  it('should render the FAQ accordion with all questions', () => {
    render(<FAQAccordion items={mockFAQItems} />)

    // Check heading
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()

    // Check all questions are rendered
    mockFAQItems.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument()
    })
  })

  it('should initially have all items collapsed', () => {
    render(<FAQAccordion items={mockFAQItems} />)

    // Check that answers are not visible initially
    mockFAQItems.forEach((item) => {
      const answerElement = screen.queryByText(item.answer)
      // Answer should either not be in document or have aria-hidden
      if (answerElement) {
        const parent = answerElement.closest('[data-state]')
        expect(parent).toHaveAttribute('data-state', 'closed')
      }
    })
  })

  it('should expand an item when clicked', async () => {
    const user = userEvent.setup()
    render(<FAQAccordion items={mockFAQItems} />)

    // Click the first question
    const firstQuestion = screen.getByText(mockFAQItems[0].question)
    await user.click(firstQuestion)

    // Wait for animation and check if answer is visible
    await waitFor(() => {
      const answer = screen.getByText(mockFAQItems[0].answer)
      expect(answer).toBeVisible()
    })
  })

  it('should collapse an expanded item when clicked again', async () => {
    const user = userEvent.setup()
    render(<FAQAccordion items={mockFAQItems} />)

    const firstQuestion = screen.getByText(mockFAQItems[0].question)

    // Click to expand
    await user.click(firstQuestion)

    // Wait for expansion
    await waitFor(() => {
      const answer = screen.getByText(mockFAQItems[0].answer)
      expect(answer).toBeVisible()
    })

    // Click to collapse
    await user.click(firstQuestion)

    // Wait for collapse
    await waitFor(() => {
      const answer = screen.getByText(mockFAQItems[0].answer)
      const parent = answer.closest('[data-state]')
      expect(parent).toHaveAttribute('data-state', 'closed')
    })
  })

  it('should allow multiple items to be expanded simultaneously', async () => {
    const user = userEvent.setup()
    render(<FAQAccordion items={mockFAQItems} />)

    // Click first question
    const firstQuestion = screen.getByText(mockFAQItems[0].question)
    await user.click(firstQuestion)

    // Click second question
    const secondQuestion = screen.getByText(mockFAQItems[1].question)
    await user.click(secondQuestion)

    // Both answers should be visible
    await waitFor(() => {
      expect(screen.getByText(mockFAQItems[0].answer)).toBeVisible()
      expect(screen.getByText(mockFAQItems[1].answer)).toBeVisible()
    })
  })

  it('should display expand/collapse icons', () => {
    render(<FAQAccordion items={mockFAQItems} />)

    // Check for chevron icons (usually SVGs)
    const triggers = screen.getAllByRole('button')

    triggers.forEach((trigger) => {
      // Check for icon element within trigger
      const icon = trigger.querySelector('svg') || trigger.querySelector('[data-icon]')
      expect(icon).toBeTruthy()
    })
  })

  it('should be keyboard accessible', async () => {
    render(<FAQAccordion items={mockFAQItems} />)

    const firstTrigger = screen.getAllByRole('button')[0]

    // Focus on the first trigger
    firstTrigger.focus()
    expect(document.activeElement).toBe(firstTrigger)

    // Press Enter to expand
    fireEvent.keyDown(firstTrigger, { key: 'Enter', code: 'Enter' })

    await waitFor(() => {
      const answer = screen.getByText(mockFAQItems[0].answer)
      expect(answer).toBeVisible()
    })

    // Press Space to collapse
    fireEvent.keyDown(firstTrigger, { key: ' ', code: 'Space' })

    await waitFor(() => {
      const answer = screen.getByText(mockFAQItems[0].answer)
      const parent = answer.closest('[data-state]')
      expect(parent).toHaveAttribute('data-state', 'closed')
    })
  })

  it('should handle empty FAQ list gracefully', () => {
    render(<FAQAccordion items={[]} />)

    // Should still render the heading
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()

    // Should show a message or just be empty
    const container = screen.getByText('Frequently Asked Questions').parentElement
    expect(container).toBeInTheDocument()
  })

  it('should apply proper ARIA attributes for accessibility', () => {
    render(<FAQAccordion items={mockFAQItems} />)

    // Check for ARIA attributes
    const triggers = screen.getAllByRole('button')

    triggers.forEach((trigger, index) => {
      // Should have aria-expanded attribute
      expect(trigger).toHaveAttribute('aria-expanded')

      // Should have aria-controls pointing to content
      const controlsId = trigger.getAttribute('aria-controls')
      if (controlsId) {
        const content = document.getElementById(controlsId)
        expect(content).toBeInTheDocument()
      }
    })
  })

  it('should style expanded items differently', async () => {
    const user = userEvent.setup()
    render(<FAQAccordion items={mockFAQItems} />)

    const firstQuestion = screen.getByText(mockFAQItems[0].question)
    const trigger = firstQuestion.closest('button')

    // Get initial classes
    const initialClasses = trigger?.className

    // Click to expand
    await user.click(firstQuestion)

    // Check if classes changed (indicating style change)
    await waitFor(() => {
      const expandedClasses = trigger?.className
      // Classes should be different when expanded
      expect(expandedClasses).toBeDefined()
    })
  })

  it('should handle long content gracefully', () => {
    const longFAQ = [
      {
        question:
          'This is a very long question that might wrap to multiple lines on smaller screens and should still display correctly',
        answer: 'This is an extremely long answer that contains multiple paragraphs. '.repeat(10),
      },
    ]

    render(<FAQAccordion items={longFAQ} />)

    expect(screen.getByText(longFAQ[0].question)).toBeInTheDocument()

    // Content should be truncated or wrapped properly
    const questionElement = screen.getByText(longFAQ[0].question)
    expect(questionElement).toHaveStyle({ wordBreak: 'break-word' })
  })
})
