import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { useContractStore } from '@/store/contractStore'
import { FormEvent, useEffect, useState } from 'react'
import { useTweetStore } from '@/store/tweetStore'

const TweetInput = () => {
    const { contract } = useContractStore()
    const { addTweet } = useTweetStore()
    const [tweet, setTweet] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)
            if (!contract) return
            if (tweet.trim() === "") return

            const tx = await contract.createTweat(tweet)
            await tx.wait()

            setTweet("")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!contract) return

        contract.on("tweatCreated", (uploader, content, timestamp) => {
            addTweet([uploader, content, timestamp])
        })

        return () => {
            contract.removeAllListeners("tweatCreated");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract])

    return (
        <Card className='w-full p-5'>
            <form className='space-y-6' onSubmit={handleSubmit}>
                <h2 className='font-semibold text-lg'>What's happening?</h2>
                <Input placeholder='Share your thoughts....' disabled={!contract} onChange={(e) => setTweet(e.target.value)} value={tweet} />
                <div className='w-full flex justify-end'>
                    <Button size={'lg'} disabled={!contract || loading}>
                        <Send />
                        Send
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default TweetInput