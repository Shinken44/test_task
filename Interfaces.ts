export interface SpinResult {
    matrix: number[],
    spentMoney: number;
}

export interface UserQuestInterface {
    id: number;
    userId: number;
    questType: string;
    questValue: number;
    userQuestValue: number;
    isCompleted: boolean;
    dateCompleted: Date;
}
