import { Profile } from './profile'

export type PatientModel = {
  id: string
  name: string
  email: string
  phone: string
  whatsapp: string
  occupation: string
  indication: string
  acceptMessage: boolean
  startTreatment: Date
  endTreatment: Date
  createdAt: Date
  updatedAt: Date
  profile: Profile
}
