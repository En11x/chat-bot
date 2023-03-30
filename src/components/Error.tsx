import { Errors } from 'src/types'

interface ErrorProps {
  error: Errors
}

export default ({ error }: ErrorProps) => {
  return (
    <div className='my-4 px-4 py-3 border border-red/50 bg-red/10'>
      {error.code && <div className='text-red mb-1'>{error.code}</div>}
      <div className='text-red op-70 text-sm'>{error.message}</div>
    </div>
  )
}
