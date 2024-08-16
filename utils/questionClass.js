
export class Question {

    constructor(username, type, range, data){
        
        this.username = username
        this.type = type
        this.range = range

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

        
        this.option1 = data[this.num1]
        this.option2 = data[this.num2]
        
        this.answer = this.num1 < this.num2 ? 0 : 1

    }

    getQuestion(){
        return `Which of the following ${this.type} has been listened to more by ${this.username} in the last ${this.rangeString}?`
    }
    getOptionsArray(){
        return [this.option1?.name, this.option2?.name]
    }
    checkAnswer(answer){
        return answer === this.answer
    }
}