/* eslint-disable class-methods-use-this */
import L from "../../common/logger";

const currentId = 0;
interface Example {
  id: number;
  name: string;
}

const examples: Example[] = [
  { id: 1, name: "example 0" },
  { id: 2, name: "example 1" },
];

export class ExamplesService {
  all(): Promise<Example[]> {
    L.info(examples, "fetch all examples");
    return Promise.resolve(examples);
  }

  byId(id: number): Promise<Example> {
    L.info(`fetch example with id ${id}`);
    return this.all().then((r) => r[id]);
  }

  create(name: string): Promise<Example> {
    L.info(`create example with name ${name}`);
    const example: Example = {
      id: currentId + 1,
      name,
    };
    examples.push(example);
    return Promise.resolve(example);
  }
}

export default new ExamplesService();
