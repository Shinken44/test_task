import {SpinResult, UserQuestInterface} from "./Interfaces";

class CoreController {
    quests: UserQuestInterface[];
    constructor() {
        this.quests = this.getQuests();
    } 

    public spin(): boolean {
        
        const spinResult = this.getSpinResult();
         
        console.log(spinResult.matrix.join());
        if (this.findComboRow(spinResult.matrix, 2)) {
            console.log("WIN!");
        }
        else {
            console.log("LOSE!");
        }
        
        let questsCompleted: boolean = true;
        for (let i in this.quests) {
            this.checkQuest(this.quests[i], spinResult);
            questsCompleted = questsCompleted && this.quests[i].isCompleted;
        }
        return questsCompleted;
    }

    private getQuests(): UserQuestInterface[] {
        return [
            {
                id: 1,
                userId: 1,
                questType: 'do_spin',
                questValue: 12,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            },
            {
                id: 1,
                userId: 1,
                questType: 'spent_money',
                questValue: 2000,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            },
            {
                id: 1,
                userId: 1,
                questType: 'combo_row',
                questValue: 2,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            },
            {
                id: 1,
                userId: 1,
                questType: 'get_symbol',
                questValue: 1,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            }
        ]
    }

    private getSpinResult(): SpinResult {
        return {
            matrix: [1, 3, 7, 2, 3, 5, 6, 3, 4, 7, 2, 71, 9, 9, 4],
            spentMoney: 1000,
        }
    }

    private convertMatrix(matrix: number[]): number[] {
        let outMatrix: number[] = [];
        let copyElementsCount: number = 0;
        let rowNumber: number = 0;
        let colNumber: number = 0;
        while (copyElementsCount < matrix.length) {
            outMatrix.push(matrix[colNumber*3 + rowNumber]);
            colNumber++;
            copyElementsCount++;

            if (colNumber*3 + rowNumber >= matrix.length) {
                rowNumber++;
                colNumber = 0;
            }
        }

        return outMatrix;
    } 

    private findComboRow(matrix: number[], comboNum): boolean {
        let outMatrix = this.convertMatrix(matrix);
        let comboCount: number = 1;
        let prevElement: number;
        for (let i = 0; i <= outMatrix.length-1; i++) {
            if (i%5 === 0) {
                prevElement = -1;
            }

            if (outMatrix[i] === prevElement) {
                comboCount++;
            }
            else {
                comboCount = 1;
            }

            if (comboCount >= comboNum) {
                return true
            }
            prevElement = outMatrix[i];
        }
        return false
    }

    private checkQuest(quest: UserQuestInterface, res: SpinResult) {
        switch (quest.questType) {
            case 'do_spin':
                quest.userQuestValue++
                if (!quest.isCompleted && quest.userQuestValue >= quest.questValue) {
                    quest.isCompleted = true;
                    quest.dateCompleted = new Date();
                    console.log(`do_spin complete! (${quest.dateCompleted})`);
                }
                break;
            case 'spent_money':
                quest.userQuestValue = quest.userQuestValue + res.spentMoney;
                if (!quest.isCompleted && quest.userQuestValue >= quest.questValue) {
                    quest.isCompleted = true;
                    quest.dateCompleted = new Date();
                    console.log(`spent_money complete! (${quest.dateCompleted})`);
                }
                break;
            case 'combo_row':
                if (this.findComboRow(res.matrix, 3)) {
                    quest.userQuestValue++
                }
                if (!quest.isCompleted && quest.userQuestValue >= quest.questValue) {
                    quest.isCompleted = true;
                    quest.dateCompleted = new Date();
                    console.log(`combo_row complete! (${quest.dateCompleted})`);
                }
                break;
            case 'get_symbol':
                if (res.matrix.includes(71)) {
                    quest.userQuestValue++
                }
                if (!quest.isCompleted && quest.userQuestValue >= quest.questValue) {
                    quest.isCompleted = true;
                    quest.dateCompleted = new Date();
                    console.log(`get_symbol complete! (${quest.dateCompleted})`);
                }    
                break;
        }
    }
}

export {CoreController};