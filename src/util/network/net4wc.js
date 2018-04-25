import Config from '../config/index';
import BaseNetwork,{GET,POST,PUT,DELETE} from './netbase'


export const Network = {};

Network.base = (path, method, params,silence,contentType) => {
    return BaseNetwork.network(Config.ServerURL,path, method, params,silence,contentType)
};

Network.get = (path, params,silence) => {
    return Network.base(path, GET, params,silence);
};

Network.post = (path, params,silence,contentType) => {
    return Network.base(path, POST, params,silence,contentType);
};

Network.del = (path, params,silence) => {
    return Network.base(path, DELETE, params,silence);
};

Network.put = (path, params,silence) => {
    return Network.base(path, PUT, params,silence);
};




export default Network;

