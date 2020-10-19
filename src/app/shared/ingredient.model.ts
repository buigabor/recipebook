export class Ingredient {
  state: string;
  constructor(
    public name: string,
    public amount: number,
    public stateDeletion?: string
  ) {}
}
