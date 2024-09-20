import { useState } from 'react'

export const useStatus = () => {
  const [apiState, setApiState] = useState<ApiState>({
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  })

  const onLoading = () => {
    setApiState({
      isLoading: true,
      isError: false,
      isSuccess: false,
      message: '',
    })
  }

  const onSuccess = (message?: string) => {
    setApiState({
      isLoading: false,
      isError: false,
      isSuccess: true,
      message: message ?? '',
    })
  }

  const onError = (message: string) => {
    setApiState({
      isLoading: false,
      isError: true,
      isSuccess: false,
      message: message,
    })
  }

  const resetStatus = () => {
    setApiState({
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    })
  }

  return { apiState, onLoading, onSuccess, onError, resetStatus }
}
