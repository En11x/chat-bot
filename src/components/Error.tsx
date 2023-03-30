import { Errors } from 'src/types'
import IconRefresh from '../components/icons/Refresh'

interface ErrorProps {
  error: Errors
  onRetry?: () => void
}

export default ({ error, onRetry }: ErrorProps) => {
  return (
    <div className='my-4 px-4 py-3 border border-red/50 bg-red/10'>
      {error.code && <div className='text-red mb-1'>{error.code}</div>}
      <div className='text-red op-70 text-sm'>{error.message}</div>
      {onRetry && (
        <div className='f-i-e px-3 mb-2'>
          <div onClick={onRetry} className='retry-btn border-red/50 text-red'>
            <IconRefresh />
            <span>Retry</span>
          </div>
        </div>
      )}
    </div>
  )
}
