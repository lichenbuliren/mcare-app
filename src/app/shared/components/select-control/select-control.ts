export class SelectControl {
  id: string;
  label: string;

  constructor(obj?: any) {
    this.id = obj.id || '';
    this.label = obj.label || '';
  }
}
