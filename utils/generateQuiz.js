"use client"

import { useSession } from "next-auth/react"
import { getArtistsData } from "./getArtistsData"
import { getTracksData } from "./getTracksData"


class Question {

    constructor(username, type, range, data){
        
        this.username = username
        this.type = type
        this.range = range
        this.data = data


        switch (this.range) {
            case "long_term":
                this.rangeString = "year"
                break;
            case "medium_term":
                this.rangeString = "6 months"
                break;
            case "short_term":
                this.rangeString = "month"
                break;
        }


        this.num1 = Math.floor(Math.random() * 50);

        // make num2 a num within +-15 of num1, and not equal to num1
        do {
        this.num2 = this.num1 + Math.floor(Math.random() * 30) - 10;
        this.num2 = Math.max(0, Math.min(49, this.num2));
        } while (this.num2 === this.num1);

        
        this.option1 = data[this.num1]?.name
        this.option2 = data[this.num2]?.name
        
        this.answer = this.num1 > this.num2 ? 1 : 2

        console.log(this.option1, this.option2, this.num1, this.num2)

    }
    
    getQuestion(){
        return `Which of the following ${this.type} has been listened to more by ${this.username} in the last ${this.rangeString}?`
    }
    getOptionsArray(){
        return [this.option1, this.option2]
    }
    checkAnswer(answer){
        return answer === this.answer
    }
}


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
    
    const dataList = await fetchData()
    
    const generateQuestions = (questionsList) => {
        
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
    await generateQuestions(questionsList)
    return await questionsList
    

    
}
