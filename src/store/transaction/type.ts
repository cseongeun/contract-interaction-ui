export class TransactionDTO {
  name: string;
  inputs: any;
  outputs: any;
  type: any;
  args: any;
  label: string;

  constructor(params: {
    name: string;
    inputs: any;
    outputs: any;
    type: any;
    args: any[];
  }) {
    this.name = params.name;
    this.inputs = params.inputs;
    this.outputs = params.outputs;
    this.type = params.type;
    this.args = params.args;

    this.label =
      params.inputs.length > 0 && params.args.length > 0
        ? `${params.name}(${params.args.join(', ')})`
        : `${params.name}()`;
  }
}
