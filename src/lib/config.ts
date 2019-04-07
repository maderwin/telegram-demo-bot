import * as assert from 'assert';
import configs from '../../configs';
import {environment} from './environment';

assert(configs.has(environment), `There is no configuration for environment ${environment}`);
export default configs.get(environment)!;
