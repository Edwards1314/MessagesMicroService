export class Person{
    private Name: string;
    private Age: number;
    private Family: string[];
    constructor(name: string, age: number, family: string[]){
        this.Name = name; 
        this.Age = age;
        this.Family = family;
    }
}