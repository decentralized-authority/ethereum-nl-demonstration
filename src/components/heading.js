import { Row } from './ui/row';
import ethLogo from '../images/eth.png';

export const Heading = () => {
  return (
    <Row className={'text-center'}>
      <img style={{width: 80, height: 80}} className={'mt-2 mb-2'} src={ethLogo} alt={'ETH logo'} />
      <p>Welcome to our ETH validator application!</p>
    </Row>
  );
};
