import Config from './interface';
import production from './production';

const testing: Config = {
    ...production
};

export default testing;
