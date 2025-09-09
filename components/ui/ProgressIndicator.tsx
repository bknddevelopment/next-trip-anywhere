'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export interface Step {
  id: string
  title: string
  description?: string
}

interface ProgressIndicatorProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export default function ProgressIndicator({ steps, currentStep, className = '' }: ProgressIndicatorProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    ${isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                      ? 'bg-primary-500 text-white ring-4 ring-primary-100' 
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    stepNumber
                  )}
                </motion.div>
                
                {isCurrent && (
                  <motion.div
                    className="absolute -inset-2 rounded-full border-2 border-primary-300"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </div>
              
              {/* Step Content */}
              <div className="ml-3 flex-1">
                <p className={`text-sm font-medium ${isCurrent ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                  {step.title}
                </p>
                {step.description && (
                  <p className={`text-xs ${isCurrent ? 'text-primary-500' : 'text-gray-400'}`}>
                    {step.description}
                  </p>
                )}
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="mx-4 flex-1 h-0.5 bg-gray-200 relative">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: '0%' }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Step Counter */}
      <div className="text-center mt-3">
        <span className="text-sm text-gray-600">
          Step {currentStep} of {steps.length}
        </span>
      </div>
    </div>
  )
}