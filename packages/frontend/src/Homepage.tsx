import ConnectButton from './Components/ConnectButton';
import Claim from './Components/Claim';

function HomePage() {
  return (
    <main className='main-container'>
      <div className="button-container">
        <ConnectButton />
      </div>
      <h2>Today aidle</h2>
      <img src="image.png" alt="Today aidle" width="70%"/>
      <Claim/>
    </main>
  );
};

export default HomePage;
