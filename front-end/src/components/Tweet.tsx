import { Card } from './ui/card'

const Tweet = ({ address, tweet, createdAt }: { address: string, tweet: string, createdAt: string }) => {
    return (
        <Card className='w-full p-5'>
            <div className='flex items-center gap-4'>
                <div className='w-10 h-10 rounded-full overflow-hidden'>
                    <img src='avatar.png' className='w-10 h-10'/>
                </div>
                <h3 className='w-52 truncate font-medium sm:w-full'>{address}</h3>
            </div>
            <p>{tweet}</p>
            <p className='w-full text-end text-slate-500 text-sm'>{new Date(Number(createdAt) * 1000).toLocaleString()}</p>
        </Card>
    )
}

export default Tweet