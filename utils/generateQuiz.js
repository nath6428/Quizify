"use client"

import { useSession } from "next-auth/react"
import { getArtistsData } from "./getArtistsData"
import { getTracksData } from "./getTracksData"
import { Question } from "./questionClass"


export const generateQuiz = async (username) => {

    const questionsList = []

    const fetchData = async () => {
        
        try {
            
            const longTermArtists = (await getArtistsData('long_term')).items;
            const mediumTermArtists = (await getArtistsData('medium_term')).items;
            const shortTermArtists = (await getArtistsData('short_term')).items;
            
            const longTermTracks = (await getTracksData('long_term')).items;
            const mediumTermTracks = (await getTracksData('medium_term')).items;
            const shortTermTracks = (await getTracksData('short_term')).items;
    
            return await { longTermArtists, mediumTermArtists, shortTermArtists, longTermTracks, mediumTermTracks, shortTermTracks }
        } catch (error) {
            console.log(error)
        }

    }
    
    
    const generateQuestions = (questionsList, dataList) => {
        
        for(let i = 0; i < 10; i++){
            const category = Math.floor(Math.random() * 6)
            let type, range, categoryData
            switch (category) {
                case 0:
                    type = 'artists'
                    range = 'long_term'
                    categoryData = dataList.longTermArtists
                    break;
                case 1:
                    type = 'artists'
                    range = 'medium_term'
                    categoryData = dataList.mediumTermArtists
                    break;
                case 2:
                    type = 'artists'
                    range = 'short_term'
                    categoryData = dataList.shortTermArtists
                    break;
                case 3:
                    type = 'tracks'
                    range = 'long_term'
                    categoryData = dataList.longTermTracks
                    break;
                    case 4:
                    type = 'tracks'
                    range = 'medium_term'
                    categoryData = dataList.mediumTermTracks
                    break;
                case 5:
                    type = 'tracks'
                    range = 'short_term'
                    categoryData = dataList.shortTermTracks
                    break;
                    default:
                        break;
            
            }
            questionsList[i] = new Question(username, type, range, categoryData)
        
        }
        
        }
        
    const dataList = await fetchData()
    await console.log(dataList)
    await generateQuestions(questionsList, dataList)
    return await questionsList
    

    
}
