import { Button } from './components/ui/button'
import { Wallet } from 'lucide-react'
import TweetInput from './components/TweetInput'
import Tweet from './components/Tweet'
import { BrowserProvider, Contract } from 'ethers'
import { ABI, ADDRESS } from './constant/twitter'
import { useContractStore } from './store/contractStore'
import { useTweetStore } from './store/tweetStore'

const App = () => {
  const { setContract, setProvider, setSigner, contract } = useContractStore()
  const { setTweets, tweets } = useTweetStore()

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Wallet not found")
      return
    }

    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new Contract(ADDRESS, ABI, signer)
    const tweets = await contract.getAllTweat()

    setSigner(signer)
    setProvider(provider)
    setContract(contract)
    setTweets(tweets)
  }

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full h-full p-8 flex flex-col items-center gap-4 md:max-w-2xl'>
        <div className='flex w-full justify-between'>
          <h1 className='text-2xl font-bold'>Decentralize Tweet</h1>
          {!contract && (
            <Button size={'lg'} onClick={connectWallet}>
              <Wallet />
              Connect Wallet
            </Button>
          )}
        </div>
        <TweetInput />
        {contract && [...tweets]
          .sort((a, b) => Number(b[2]) - Number(a[2]))
          .map((tweet) => (
            <Tweet address={tweet[0]} tweet={tweet[1]} createdAt={tweet[2]} key={tweet[2] + tweet[0]} />
          ))}
      </div>
    </div>
  )
}

export default App