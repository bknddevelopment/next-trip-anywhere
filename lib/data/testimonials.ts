export interface Testimonial {
  id: string
  name: string
  location: string
  tripType: string
  tripDate: string
  rating: number
  title: string
  content: string
  avatar?: string
  verified?: boolean
  savings?: string
}

export const sampleTestimonials: Testimonial[] = []