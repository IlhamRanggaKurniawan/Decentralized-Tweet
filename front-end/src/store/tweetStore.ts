import { create } from "zustand";

type Tweet = string[]

type TweetStore = {
    tweets: Tweet[],
    addTweet: (tweet: Tweet) => void;
    setTweets: (tweets: Tweet[]) => void;
}

export const useTweetStore = create<TweetStore>((set) => ({
    tweets: [],
    addTweet: (tweet) => set((state) => ({
        tweets: [tweet, ...state.tweets]
    })),
    setTweets: (tweets) => set({ tweets })
}))