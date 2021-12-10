import { Row } from './ui/row';
import { Card } from './ui/card';
import { FileInput, Select, TextInput } from './ui/forms';
import { Button } from './ui/buttons';
import { useState } from 'react';

export const CreateNodeForm = ({ setNodeData }) => {

  const [ peerPort, setPeerPort ] = useState(ipcRenderer.sendSync('GET_DEFAULT_PEER_PORT'));
  const [ rpcPort, setRPCPort ] = useState(ipcRenderer.sendSync('GET_DEFAULT_RPC_PORT'));
  const [ rootDir, setRootDir ] = useState('');
  const [ networks ] = useState(ipcRenderer.sendSync('GET_NETWORKS'));
  const [ network, setNetwork ] = useState(networks[0]);

  const onPeerPortChange = e => {
    e.preventDefault();
    setPeerPort(e.target.value.trim());
  };
  const onRPCPortChange = e => {
    e.preventDefault();
    setRPCPort(e.target.value.trim());
  };
  const onNetworkChange = e => {
    e.preventDefault();
    setNetwork(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if(!rootDir)
      return;
    const nodeData = await ipcRenderer.invoke('CREATE_NODE', {
      peerPort,
      rpcPort,
      network,
      rootDir,
    });
    setNodeData(nodeData);
    localStorage.setItem('NODE_DATA', JSON.stringify(nodeData));
  };

  return (
    <Row>
      <form onSubmit={onSubmit}>
        <Card>
          <TextInput label={'Peer Port:'} onChange={onPeerPortChange} value={peerPort} />
          <TextInput label={'RPC Port:'} onChange={onRPCPortChange} value={rpcPort} />
          <Select label={'Network:'} options={networks} onChange={onNetworkChange} value={network} />
          <FileInput label={'Data Directory:'} onChange={setRootDir} value={rootDir} />
          <Button type={'submit'}>Create Local Node</Button>
        </Card>
      </form>
    </Row>
  );
};
